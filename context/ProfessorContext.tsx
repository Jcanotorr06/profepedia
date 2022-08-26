import { PostgrestError } from "@supabase/supabase-js";
import Router from "next/router";
import { createContext, ReactNode, useContext, useState } from "react"
import { profesorProfile } from "../types/profesorProfile"
import { likedDisliked, rating, rating_breakdown } from "../types/rating";
import { searchResult } from "../types/searchResult"
import { supabase } from './../utils/supabaseClient';
import moment from 'moment';

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
            if(!error && _reviews && count){
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
                setReviews(rev => rev.sort((a,b) => moment(a.created_at).diff(moment(b.created_at))))
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
            else if(data && data.id === professorId){
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
            if(rev && breakdown){
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
        sendReport
    }

    return (
        <>
            <ProfessorContext.Provider value={value}>
                {children}
            </ProfessorContext.Provider>
        </>
    )
}