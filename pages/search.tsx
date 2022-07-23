import { NextPage } from "next"
import Loading from "react-loading"
import { useSearch } from "../context"
import Head from 'next/head';
import { useIntl } from 'react-intl';
import Link from "next/link";
import { toTitleCase } from "../utils/utils";


const Search:NextPage = () => {
    const { query, loading, success, searchResult } = useSearch()
    const intl = useIntl()
    return (
      <>
        <Head>
          <title>{intl.formatMessage({id: 'search_results', defaultMessage: `Resultados de Busqueda: ${query}`}, {query: query})} | Profepedia</title>
          <meta name="description" content="Encuentra el mejor profesor" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="w-full h-full">
          {loading && (
            <div className="h-screen w-screen absolute z-10 top-0 left-0 bg-black bg-opacity-30 flex justify-center items-center">
              <Loading type="spin" color="#fff"/>
            </div>
          )}
          {success && (
            <div className="mt-3 ">
              <h1 className="text-xl lg:text-2xl font-medium">Resultados de busqueda para: <span className="font-bold">{query}</span></h1>
            </div>
          )}
          {searchResult.length === 0 ? (
            <h1>No hay resultados</h1>
          ): (
            <div className="my-6 flex flex-col gap-4">
              {
                searchResult.map((result, i) => (
                  <Link href={`/docente/${result.id}`} key={i}>
                      <a>
                        <div className="surface p-4 rounded-md shadow-md flex justify-between items-center">
                          <div className="flex w-full">
                            <div className="flex justify-between">
                              <div className="flex flex-col justify-center items-center mr-4">
                                <div className="text-xs font-bold mb-2 uppercase text-center">
                                  Calidad
                                </div>
                                <div className={`flex items-center justify-center self-center py-3 px-4 mb-3 text-lg font-black ${result.rating === 0 ? 'bg-gray-300' : result.rating < 3 ? 'bg-red-300' : result.rating < 4 ? 'bg-yellow-300' : 'bg-green-400'}`}>
                                  <div className="score">
                                    {result.rating.toFixed(1)}
                                  </div>
                                </div>
                                <div className=" text-xs text-center">
                                  {result.cant_rating} ratings
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center">
                              <div className="font-bold text-sm">
                                {toTitleCase(`${result.nombre.split(', ')[1]} ${result.nombre.split(', ')[0].split(' ')[0]}`)}
                              </div>
                              <div className="font-extralight text-xs flex flex-col gap-1 my-2">
                                <div>
                                  {result.departamento && result.departamento !== '' ? toTitleCase(result.departamento.trimStart()) : 'Departamento No Asignado'}
                                </div>
                                <div>
                                  {result.unidad && result.unidad !== '' ? toTitleCase(result.unidad.trimStart()) : 'Unidad No Asignada'}
                                </div>
                              </div>
                              <div className="text-xs">
                                <p>
                                  <span className="font-bold">Would take again:</span> {result.cant_rating > 0 ? `${((result.cant_wouldTakeAgain/result.cant_rating)*100).toFixed(0)}%` : '0%'} | <span className="font-bold">Difficulty</span>: {result.dificultad}
                                </p>
                              </div>
                            </div>
                          </div>
                          <button className=" self-start flex">
                            <i className="bi bi-bookmark"></i>
                          </button>
                        </div>
                      </a>
                  </Link>
                ))
              }
            </div>
          )}
        </main>
      </>
    )
  }
  
  export default Search