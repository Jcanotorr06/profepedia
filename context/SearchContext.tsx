import { createContext, ReactNode, useContext, useState, useEffect } from "react"
import { useRouter } from 'next/router';
import { NextURL } from "next/dist/server/web/next-url";
import { supabase } from './../utils/supabaseClient';

type searchResult = {
    cant_rating: number,
    cant_wouldTakeAgain: number,
    departamento: string | null | undefined,
    dificultad: number,
    id: number,
    id_universidad: number,
    nombre: string,
    rating: number,
    unidad: string | null | undefined
}

type searchContext = {
    query: string,
    previousQuery: string,
    searchResult: searchResult[],
    loading: boolean,
    success: boolean,
    failure: boolean,
    handleSearch: (query:string) => void
}

const searchContextDefault:searchContext = {
    query: '',
    previousQuery: '',
    searchResult: [],
    loading: false,
    success: false,
    failure: false,
    handleSearch: (query:string) => {}
}

const SearchContext = createContext<searchContext>(searchContextDefault)

export function useSearch() {
    return useContext(SearchContext)
}

type Props = {
    children: ReactNode
}

export function SearchProvider({children}:Props) {
    const [query, setQuery] = useState<string>('')
    const [previousQuery, setPreviousQuery] = useState<string>('')
    const [searchResult, setSearchResult] = useState<searchResult[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [failure, setFailure] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {

    }, [query])

    const search = async (q:string) => {
        setLoading(true)
        const { data, error } = await supabase.rpc("busqueda_docentes_full", {nom: q})
        if(error){
            console.log(error)
            return false
        }
        console.log(data)
        return data
    }

    const handleSearch = async (q:string) => {
        if(q === query) {
            console.log('SAME QUERY', q)
            console.log('PREVIOUS RESPONSE', searchResult)
        }else{
            setPreviousQuery(query)
            setQuery(q)
            let res = await search(q)
            if(res) {
                setSearchResult(res)
                setSuccess(true)
                setFailure(false)
                setLoading(false)
            }else{
                setSearchResult([])
                setSuccess(false)
                setFailure(true)
                setLoading(false)
            }
        }
        router.push({
            pathname: '/search',
            query: {prof: q}
        })
    }

    const value:searchContext = {
        query,
        previousQuery,
        searchResult,
        loading,
        success,
        failure,
        handleSearch
    }

    return (
        <>
            <SearchContext.Provider value={value}>
                {children}
            </SearchContext.Provider>
        </>
    )
}