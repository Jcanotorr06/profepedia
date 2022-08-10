import { PostgrestError } from "@supabase/supabase-js";
import Router from "next/router";
import { createContext, ReactNode, useContext, useState } from "react"
import { profesorProfile } from "../types/profesorProfile"
import { rating } from "../types/rating";
import { searchResult } from "../types/searchResult"
import { supabase } from './../utils/supabaseClient';

type professorContext = {
    id: number | null,
    selection: searchResult|null,
    loading: boolean,
    success: boolean,
    failure: boolean,
    data: profesorProfile | null,
    reviews: rating[],
    getData: (id: number, professor?:searchResult, refresh?:boolean) => Promise<boolean>,
    handleSelection: (selection:any) => void,
}

type profesorSelect = {
    data: profesorProfile[],
    error: PostgrestError | null
}

const professorContextDefault:professorContext = {
    id: null,
    selection: null,
    loading: false,
    success: false,
    failure: false,
    data: null,
    reviews: [],
    getData: (id) => {
        return new Promise<boolean>((resolve) => {resolve(true)})
    },
    handleSelection: () => {}
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

    const getReviews = async (professorId:number, refresh?:boolean) => {
        console.log("GETTIGN REVIEWS")
        return new Promise<boolean>(async (resolve) => {
            const { data:_reviews, error } = await supabase.rpc('reviews_docente', {_id_docente: professorId})
            console.log('REVIEWS: ',_reviews, error)
            if(!error && _reviews){
                setReviews(_reviews)
                resolve(true)
                return
            }else{
                resolve(false)
                return
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
            const rev = await getReviews(professorId, refresh)
            if(rev){
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
        success,
        failure,
        data,
        reviews,
        getData,
        handleSelection
    }

    return (
        <>
            <ProfessorContext.Provider value={value}>
                {children}
            </ProfessorContext.Provider>
        </>
    )
}