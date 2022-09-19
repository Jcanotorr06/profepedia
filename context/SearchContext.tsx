import { createContext, ReactNode, useContext, useState, useEffect } from "react"
import { useRouter } from 'next/router';
import { supabase } from './../utils/supabaseClient';
import { searchResult, searchSuggestion } from "../types/searchResult";
import { PostgrestError } from "@supabase/supabase-js";


type searchContext = {
    query: string,
    previousQuery: string,
    searchResult: searchResult[],
    amount: number,
    loading: boolean,
    success: boolean,
    failure: boolean,
    handleSearch: (query:string) => void,
    loadMore: () => void,
    loadingMore: boolean,
    searchSuggestions: searchSuggestion[],
    getSearchSuggestions: (q:string) => Promise<boolean>
}

type SearchSuggestionResult = {
    data: searchSuggestion[],
    error: PostgrestError | null
}

const searchContextDefault:searchContext = {
    query: '',
    previousQuery: '',
    searchResult: [],
    amount: 0,
    loading: false,
    success: false,
    failure: false,
    handleSearch: (query:string) => {},
    loadMore: () => {},
    loadingMore: false,

    searchSuggestions: [],
    getSearchSuggestions: (q:string) => new Promise<boolean>(resolve => resolve(true)),
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
    const [amount, setAmount] = useState<number>(0)
    const [loadingMore, setLoadingMore] = useState<boolean>(false)
    const [searchSuggestions, setSearchSuggestions] = useState<searchSuggestion[]>([])
    const router = useRouter()

    const search = async (q:string, limit: number, rangeStart:number, rangeEnd:number) => {
        /* setLoading(true) */
        /* const { data, error } = await supabase.rpc("busqueda_docentes_full", {nom: q, lim: 10, offst: 0}) */
        const { data, error, count } = await supabase.from("resultado_busqueda_v2").select("*", {count: "exact"}).textSearch("nombre", q, {type: "websearch"}).limit(limit).range(rangeStart,rangeEnd)
        if(error){
            console.log(error)
            return false
        }
        console.log(data, count)
        return {
            data,
            count
        }
    }

    const getSearchSuggestions = async(q:string) => {
        return new Promise<boolean>(async resolve => {
            const { data, error } = await supabase.rpc("search_docente_limited", {"name": q}) as SearchSuggestionResult
            if(data && !error){
                setSearchSuggestions(data)
                resolve(true)
                return
            }else{
                setSearchSuggestions([])
                resolve(false)
                return
            }
        })
    }

    const loadMore = async () => {
        setLoadingMore(true)
        let res = await search(query, 10, searchResult.length, searchResult.length+9)
        if(res) {
            let data = res.data
            setSearchResult(sr => [...sr, ...data])
            setSuccess(true)
            setFailure(false)
            setLoadingMore(false)
        }else{
            setSearchResult(sr => sr)
            setSuccess(false)
            setFailure(true)
            setLoading(false)
        }
    }

    const handleSearch = async (q:string) => {
        if(q === query) {
            console.log('SAME QUERY', q)
            console.log('PREVIOUS RESPONSE', searchResult)
        }else{
            setLoading(true)
            setPreviousQuery(query)
            setQuery(q)
            let res = await search(q, 10, 0, 9)
            if(res) {
                setSearchResult(res.data)
                setAmount(res.count ?? 0)
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
        amount,
        loading,
        success,
        failure,
        handleSearch,
        loadMore,
        loadingMore,

        searchSuggestions,
        getSearchSuggestions
    }

    return (
        <>
            <SearchContext.Provider value={value}>
                {children}
            </SearchContext.Provider>
        </>
    )
}