import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Translate } from '../components/Translation'
import { useUser, useLocale, useMode, useSearch } from '../context'
import Link from 'next/link';

//Import Images
import Business from '../public/landing/business.svg'
import { toast } from 'react-toastify'
import Load from 'react-loading';
import { IconButton } from '../components/Buttons'
import { GradeBar, GradeGraph } from '../components/GradeGraph'
import { Grade } from '../types/grade'
import { ChangeEvent, useEffect, useState } from 'react'
import { ErrorHandler } from '../components/ErrorHandler'
import { formatNombre } from '../utils/utils'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const { searchSuggestions, getSearchSuggestions, handleSearch } = useSearch()
  const router = useRouter()
  
  const [query, setQuery] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false)

  const handleSearchChange = async (e:ChangeEvent<HTMLInputElement>) => {
    let { value, validity:{ valid } } = e.currentTarget
    let payload = value.trim()
    setQuery(payload)
    setIsValid(valid)
    console.log('VALID: ',valid)
    console.log('LENGTH: ', payload.length)
    if(valid && payload.length >= 4 && payload.length <= 20){
      console.log('QUERY: ', payload)
      setLoadingSuggestions(true)
      await getSearchSuggestions(payload).then(res => {
        if(!res){
          toast.error("There was an error")
        }
        setLoadingSuggestions(false)
      })
    }
  }

  const handleSubmit = () => {
    if(query.length > 0 && isValid){
      handleSearch(query)
    }
  }

  useEffect(() => {
    if(searchSuggestions.length > 0){
      console.log(searchSuggestions)
    }
  }, [searchSuggestions])

  return (
    <>
      <Head>
        <title>Profepedia</title>
        <meta name="description" content="Encuentra el mejor profesor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-full">
        <section className="w-full bg-faded rounded-2xl border-2 border-black border-dashed search-shadow px-10 py-14 md:px-24 md:py-20 lg:py-40 lg:px-44 xl:px-64 xl:py-44 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-11">
            <div className="text-center ">
                <h1 className="font-black text-5xl">
                  Encuentra tu Profesor Y Comparte tú Opinion
                </h1>
                <p className="font-light muted font-monospace text-sm mt-3">
                  Cuentanos acerca de tus experiencias con los profesores y ayuda a otros estudiantes a tomar la mejor desicion.
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
                  className="rounded-full py-4 px-12 flex-grow w-full md:w-auto shadow-md" 
                  placeholder='Ingresa el nombre de tu profesor' />
                <button className="btn btn-circle btn-error shadow" onClick={() => handleSubmit()} disabled={query.length === 0}><i className="bi bi-search text-white "/></button>
                {query.length >= 4 &&
                  <article className="absolute surface shadow-md top-full mt-1 w-11/12 flex-grow rounded-lg flex flex-col max-h-36 overflow-y-scroll" role="search_results">
                    {loadingSuggestions ? 
                      <div className="px-6 py-4 flex items-center justify-center muted">
                        <span>Loading</span> <Load type="spin" width="10px" height="10px"/>
                      </div>
                      : searchSuggestions.length === 0 ?
                      <div className="px-6 py-4 flex items-center justify-center">
                        <h1>No results were found</h1>
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
      </main>
    </>
  )
}

export default Home
