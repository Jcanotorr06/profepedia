/** Import types */
import { profesorProfile } from "../types/profesorProfile"
import { likedDisliked, newRating, rating, rating_breakdown } from "../types/rating";
import { course } from "../types/courses";
import { tag } from "../types/tag";
import { searchResult } from "../types/searchResult"

import moment from 'moment';
import { PostgrestError } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useState } from "react"
import { supabase } from './../utils/supabaseClient';

type professorContext = {
    id: number | null,
    selection: searchResult|null,
    loading: boolean,
    loadingMore: boolean,
    success: boolean,
    failure: boolean,
    data: profesorProfile | null,
    reviews: rating[],
    reviewCount: number,
    ratingBreakdown: rating_breakdown[],
    likedDisliked: likedDisliked[],
    getData: (id: number, professor?:searchResult, refresh?:boolean) => Promise<boolean>,
    loadMore: (professorId: number) => void,
    handleSelection: (selection:any) => void,
    sortReviews: (sortBy:string) => void,
    sendReport: (idRating: number, professorId: number) => Promise<boolean>

    courses: course[],
    tags: tag[],
    loadingReviewData: boolean,
    getReviewData: (professorId:number) => void
    sendReview: (payload:newRating, professorId:number) => Promise<boolean|string>
}

type profesorSelect = {
    data: profesorProfile[],
    error: PostgrestError | null
}

type ratingBreakdownSelect = {
    data: rating_breakdown[],
    error: PostgrestError | null
}

type likedDislikedSelect = {
    data: likedDisliked[],
    error: PostgrestError | null
}

type courseSelect = {
    data: course[],
    error: PostgrestError | null
}

type tagSelect = {
    data: tag[],
    error: PostgrestError | null
}

const professorContextDefault:professorContext = {
    id: null,
    selection: null,
    loading: false,
    loadingMore: false,
    success: false,
    failure: false,
    data: null,
    reviews: [],
    reviewCount: 0,
    ratingBreakdown: [],
    likedDisliked: [],
    getData: (id) => {
        return new Promise<boolean>((resolve) => {resolve(true)})
    },
    loadMore: (professorId) => {},
    handleSelection: () => {},
    sortReviews: (sortBy) => {},
    sendReport: (idRating, professorId) => {
        return new Promise<boolean>((resolve) => {resolve(true)})
    },

    courses: [],
    tags: [],
    loadingReviewData: false,
    getReviewData: (professorId:number) => {},
    sendReview(payload, professorId) {
        return new Promise<boolean>(resolve => {resolve(true)})
    },
}

const ProfessorContext = createContext<professorContext>(professorContextDefault)

export function useProfessor() {
    return useContext(ProfessorContext)
}

type Props = {
    children: ReactNode
}

export function ProfessorProvider({children}:Props) {
    const [id, setId] = useState<number|null>(null)
    const [selection, setSelection] = useState<searchResult|null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [failure, setFailure] = useState<boolean>(false)
    const [data, setData] = useState<profesorProfile|null>(null)
    const [reviews, setReviews] = useState<rating[]>([])
    const [reviewCount, setReviewCount] = useState<number>(0)
    const [ratingBreakdown, setRatingBreakdown] = useState<rating_breakdown[]>([])
    const [loadingMore, setLoadingMore] = useState<boolean>(false)
    const [likedDisliked, setLikedDisliked] = useState<likedDisliked[]>([])
    const [courses, setCourses] = useState<course[]>([])
    const [tags, setTags] = useState<tag[]>([])
    const [loadingReviewData, setLoadingReviewData] = useState<boolean>(false)

    const handleTest = (professor:searchResult) => {
        return new Promise<void>((resolve) => {
            setSelection(professor)
            setTimeout(() => {
                resolve()
                return
            }, 500)
        })
    }

    const handleSelection = async (professor:searchResult) => {
        await handleTest(professor)
        .then(async () => {
            console.log(selection)
            console.log("Getting Data from professor: ", professor.id, professor.nombre)
            await getData(professor.id, professor, false)
        })
    }

    const getReviews = async (professorId:number, limit:number, rangeStart:number, rangeEnd:number, refresh?:boolean) => {
        console.log("GETTIGN REVIEWS")
        return new Promise<boolean>(async (resolve) => {
            const { data:_reviews, error, count } = await supabase.from("reviews_docentes_v2").select("*", {count: 'exact'}).eq("id_docente", professorId).limit(limit).order("likes", {ascending: false}).range(rangeStart, rangeEnd)
            console.log('REVIEWS: ',_reviews, 'COUNT: ', count, 'ERROR: ', error)
            if(!error && _reviews && (count || count === 0)){
                setReviews(_reviews)
                setReviewCount(count)
                resolve(true)
                return
            }else{
                resolve(false)
                return
            }            
        })
    }

    const sortReviews = (sortBy:string) => {
        switch(sortBy){
            case 'date':
                setReviews(rev => rev.sort((a,b) => moment(b.created_at).diff(moment(a.created_at))))
                break;
            default:
                setReviews(rev => rev.sort((a,b) => a.likes-b.likes))
                break;
        }
    }

    const loadMore = async (professorId:number) => {
        setLoadingMore(true)
        const { data:_reviews, error } = await supabase.from("reviews_docentes_v2").select("*").eq("id_docente", professorId).limit(10).order("likes", {ascending: false}).range(reviews.length, reviews.length+9)
        if(_reviews && !error) {
            setReviews(sr => [...sr, ..._reviews])
            setSuccess(true)
            setFailure(false)
            setLoadingMore(false)
        }else{
            setReviews(sr => sr)
            setSuccess(false)
            setFailure(true)
            setLoading(false)
        }
    }

    const getRatingsBreakdown = async (professorId:number) => {
        console.log("Getting Ratings breakdown")
        return new Promise<boolean>(async resolve => {
            const { data, error } = await supabase.from("rating_breakdown").select("*").eq("id_docente", professorId) as ratingBreakdownSelect
            if(!error && data){
                let breakdown:rating_breakdown[] = []
                if(data.length < 5){
                    for(let i = 0; i < 5; i++){
                        let item = data.find(x => x.rating === i+1)
                        if(item){
                            breakdown.push(item)
                            continue
                        }
                        breakdown.push({
                            rating: i+1,
                            count: 0,
                            id_docente: professorId
                        })
                    }
                    breakdown.sort((a,b) => a.rating - b.rating)
                    breakdown.reverse()
                }
                console.log('RATING BREAKDOWN', breakdown)
                setRatingBreakdown(breakdown)
                resolve(true)
                return
            }else{
                resolve(false)
                return
            }
        })
    }

    const getLikedDisliked = async () => {
        const user = supabase.auth.user()
        if(user){
            const { id } = user
            const { data, error } = await supabase.from("LikeDislike_Rating").select("*").eq("id_usuario", id) as likedDislikedSelect
            if(data && !error) {
                setLikedDisliked(data)
            }
        }
    }

    const sendReport = async (id_rating:number, professorId:number) => {
        return new Promise<boolean>(async resolve => {
            const { data, error } = await supabase.from('Docente_Rating_Report').insert({id_rating})
            if(data && !error){
                await getReviews(professorId, reviews.length, 0, reviews.length-1)
                resolve(true)
            }else{
                resolve(false)
            }
        })
    }

    const getData = async (professorId: number, professor?:searchResult, refresh?:boolean) => {
        return new Promise<boolean>(async (resolve) => {
            setLoading(true)
            if(professor){
                setData({...professor})
                if(id === professorId && !refresh) {
                    console.log('SAME PROFESSOR, DO NOT REFETCH')
                }else{
                    console.log('FETCHING DATA NOW 🤑')
                    setId(professorId)
                }
            }
            else if(data && data.id === professorId && !refresh){
                console.log('SAME PROFESSOR, DO NOT REFETCH')
            }
            else{
                console.log('FETCH ALL THE DATA NOWWWWWW 🤬')
                const { data, error } = await supabase.from("resultado_busqueda_v2").select("*").eq("id", professorId) as profesorSelect
                    if(!error) {
                        setData({...data[0]})
                    }else{
                        setLoading(false)
                        resolve(false)
                        return
                    }
            }
            const rev = await getReviews(professorId, 10, 0, 9, refresh)
            const breakdown = await getRatingsBreakdown(professorId)
            const tg = tags.length > 0 ? true : await getTags()
            const crs = await getCourses(professorId)
            if(rev && breakdown && tg && crs){
                resolve(true)
                setLoading(false)
                return
            }else{
                resolve(false)
                setLoading(false)
                return
            }        
        })
    }

    const getCourses = async (professorId:number) => {
        return new Promise<boolean>(async resolve => {
            const { data, error } = await supabase.from("asignaturas_docentes").select("*").eq("id_docente", professorId) as courseSelect
            if(data && !error){
                setCourses(data)
                resolve(true)
                return
            }
            resolve(false)
            return
        })
    }

    const getTags = async () => {
        return new Promise<boolean>(async resolve => {
            const { data, error } = await supabase.from("Tags_Docentes").select("*") as tagSelect
            if(data && !error){
                setTags(data)
                resolve(true)
                return
            }
            resolve(false)
            return
        })
    }

    const getReviewData = async (professorId:number) => {
        console.log("CONEXT GETTING REVIEW DATA")
        setLoadingReviewData(true)
        const gotCourses = await getCourses(professorId)
        const gotTags = tags.length > 0 ? true : await getTags()

        if(gotCourses && gotTags){
            setLoadingReviewData(false)
        }else{
            console.log("💥💥💥There was an error💥💥💥")
        }
    }

    const moderation = async (review:string) => {
        return new Promise<boolean>(async resolve => {
            let res = await fetch('/api/moderation', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials: 'same-origin',
                body: JSON.stringify({ input: review })
            })
            let flagged = await res.json()
            console.log('Flagged: ',flagged)
            resolve(flagged)
            return
        })
    }

    const sendReview = async (payload:newRating, professorId:number) => {
        return new Promise<boolean | string>(async resolve => {
            let isFlagged = await moderation(payload.review)
            if(!isFlagged) {
                const { data, error } = await supabase.from("Rating").insert({...payload})
                if(data && !error) {
                    await getData(professorId, undefined, true)
                    resolve(true)
                    return
                }else{
                    resolve(false)
                    return
                }
            }else{
                resolve('review_flagged')
                return
            }
        })
    }

    const value:professorContext = {
        id,
        selection,
        loading,
        loadingMore,
        success,
        failure,
        data,
        reviews,
        reviewCount,
        ratingBreakdown,
        likedDisliked,
        getData,
        loadMore,
        handleSelection,
        sortReviews,
        sendReport,

        courses,
        tags,
        loadingReviewData,
        getReviewData,
        sendReview
    }

    return (
        <>
            <ProfessorContext.Provider value={value}>
                {children}
            </ProfessorContext.Provider>
        </>
    )
}