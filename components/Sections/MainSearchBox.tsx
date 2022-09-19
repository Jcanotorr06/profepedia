import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import Loading from 'react-loading'
import { toast } from 'react-toastify'
import { useSearch } from '../../context'
import { formatNombre } from '../../utils/utils'
import { Translate } from '../Translation'

const MainSearchBox = () => {
    const { handleSearch, getSearchSuggestions, searchSuggestions } = useSearch()
    const router = useRouter()

    const [query, setQuery] = useState<string>('')
    const [isValid, setIsValid] = useState<boolean>(false)
    const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false)
    const getSearchSuggestionsRef = useRef(getSearchSuggestions)
    const intl = useIntl()

    const handleSearchChange = async (e:ChangeEvent<HTMLInputElement>) => {
      let { value, validity:{ valid } } = e.currentTarget
      let payload = value.trim()
      setQuery(payload)
      setIsValid(valid)
    }

    const handleSubmit = () => {
      if(query.length > 0 && isValid){
        handleSearch(query)
      }
    }

    useEffect(() => {
      let cancelled = false
      setLoadingSuggestions(true)
      const delayDebounce = setTimeout(async () => {
        if(isValid && query.length >= 4 && query.length <= 20 && !cancelled){
        console.log('QUERY: ', query)
        await getSearchSuggestionsRef.current(query).then(res => {
          if(!res){
            toast.error("There was an error")
          }
          setLoadingSuggestions(false)
        })
      }
      }, 3000)
      
      return () => {clearTimeout(delayDebounce); cancelled=true}
    }, [query, isValid])

    useEffect(() => {
      if(searchSuggestions.length > 0){
        console.log(searchSuggestions)
      }
    }, [searchSuggestions])

    useLayoutEffect(() => {
      getSearchSuggestionsRef.current = getSearchSuggestions
    }, [getSearchSuggestions])

    return (
    <section className="w-full bg-faded rounded-2xl border-2 border-black border-dashed search-shadow px-10 py-14 md:px-24 md:py-20 lg:py-40 lg:px-44 xl:px-64 xl:py-44 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-11">
            <div className="text-center ">
                <h1 className="font-black text-3xl md:text-4xl lg:text-5xl">
                    {/* Encuentra tu Profesor Y Comparte tú Opinion */}
                    <Translate label="landing_title"/>
                </h1>
                <p className="font-light muted font-monospace text-xs md:text-sm mt-3">
                    {/* Cuentanos acerca de tus experiencias con los profesores y ayuda a otros estudiantes a tomar la mejor desicion. */}
                    <Translate label="landing_description"/>
                </p>
            </div>
            <div className="flex justify-center items-center gap-2 w-full">
                <div className="w-full flex flex-col md:flex-row items-center gap-4 relative">
                <input 
                    type="text" 
                    minLength={4} 
                    maxLength={20}
                    pattern="[a-zA-Z ]{4,20}"
                    required 
                    value={query} 
                    onChange={handleSearchChange} 
                    name="search_main" 
                    autoComplete='search_professor' 
                    className="rounded-full py-3 px-6 md:py-4 md:px-12 flex-grow w-full md:w-auto shadow-md" 
                    placeholder={intl.formatMessage({id: 'main_search_ph', defaultMessage: 'Ingresa el nombre de tu profesor'})} />
                <button className="btn btn-circle btn-error shadow" onClick={() => handleSubmit()} disabled={query.length === 0}><i className="bi bi-search text-white "/></button>
                {query.length >= 4 &&
                    <article className="absolute surface shadow-md top-full mt-1 w-11/12 flex-grow rounded-lg flex flex-col max-h-36 overflow-y-scroll" role="search_results">
                    {loadingSuggestions ? 
                        <div className="px-6 py-4 flex items-center justify-center muted">
                        <Translate label="loading"/> <Loading type="spin" width="10px" height="10px"/>
                        </div>
                        : searchSuggestions.length === 0 ?
                        <div className="px-6 py-4 flex items-center justify-center font-monospace">
                        <h1><Translate label="no_results"/></h1>
                        </div>
                        :
                        <>
                        {searchSuggestions.map((item, i) => (
                            <div onClick={() => router.push(`/docente/${item.id}`)} className="px-6 py-4 flex items-center hover:cursor-pointer hover:bg-slate-100 transition-colors" key={i}>
                            <h1>{formatNombre(item.nombre)}</h1>
                            </div>
                        ))}
                        </>
                    }
                    </article>
                }
                </div>
            </div>
            </div>
        </section>
    )
}

export default MainSearchBox