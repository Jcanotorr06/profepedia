import { Loading } from "../Navigation";
import { useProfessor, useSearch } from "../../context"
import Head from 'next/head';
import { useIntl } from 'react-intl';
import Link from "next/link";
import { formatGroup, formatNombre, toTitleCase } from "../../utils/utils";
import { TextButton } from "../Buttons";
import Load from 'react-loading'
import { useRouter } from 'next/router';
import { FC, useEffect } from "react";
import { Translate } from "../Translation";


const SearchResults:FC = () => {
    const { query, loading, success, searchResult, amount, loadMore, loadingMore } = useSearch()
    const { handleSelection } = useProfessor()
    const intl = useIntl()

    return (
        <>
            <Loading className="h-screen w-screen" active={loading}>
                <main className="w-full h-full">
                {success && (
                    <div className="mt-3 px-3 lg:px-0">
                        <h1 className="text-xl lg:text-2xl font-medium"><Translate label="results_for"/>: <span className="font-bold">{query}</span></h1>
                    </div>
                )}
                {searchResult.length === 0 ? (
                    <div className="my-6 text-center w-full">
                        <h1 className="text-2xl font-semibold"><Translate label="no_results"/></h1>
                    </div>
                ): (
                    <div className="my-6 flex flex-col gap-4">
                    {
                        searchResult.map((result, i) => (
                        <Link href={`/docente/${result.id}`} key={i}>
                            <a onClick={() => handleSelection(result)}>
                                <div className="surface p-4 rounded-md shadow-md flex justify-between items-center border border-transparent hover:border-black transition-colors">
                                <div className="flex w-full">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col justify-center items-center mr-4">
                                            <div className="text-xs font-bold mb-2 uppercase text-center">
                                                <Translate label="quality"/>
                                            </div>
                                            <div className={`flex items-center justify-center self-center py-3 px-4 mb-3 text-lg font-black ${result.rating === 0 ? 'bg-gray-300' : result.rating < 3 ? 'bg-red-300' : result.rating < 4 ? 'bg-yellow-300' : 'bg-green-400'}`}>
                                                <div className="score">
                                                    {result.rating.toFixed(1)}
                                                </div>
                                            </div>
                                            <div className=" text-xs text-center">
                                                {result.cant_rating} <Translate label="ratings"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                    <div className="font-bold text-sm">
                                        {formatNombre(result.nombre)}
                                    </div>
                                    <div className="font-extralight text-xs flex flex-col gap-1 my-2">
                                        <div>
                                        {result.departamento && result.departamento !== '' ? formatGroup(result.departamento) : 'Departamento No Asignado'}
                                        </div>
                                        <div>
                                        {result.unidad && result.unidad !== '' ?formatGroup(result.unidad) : 'Unidad No Asignada'}
                                        </div>
                                    </div>
                                    <div className="text-xs">
                                        <p>
                                        <span className="font-bold"><Translate label="would_take_again"/>:</span> {result.cant_rating > 0 ? `${((result.cant_wouldTakeAgain/result.cant_rating)*100).toFixed(0)}%` : '0%'} | <span className="font-bold"><Translate label="difficulty"/></span>: {result.dificultad}
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
                    {
                        loadingMore && 
                        <div className="flex justify-center my-4">
                        <Load color="#000" type="bubbles"/>
                        </div>
                    }
                    {
                        searchResult.length < amount && 
                        <div className="flex justify-center my-4">
                        <TextButton
                            text="load_more"
                            className="button-primary py-3 px-8 font-bold text-lg rounded-lg"
                            rippleClassName="rounded-lg"
                            handleClick={() => loadMore()}
                        />
                        </div>
                    }
                    
                    </div>
                )}
                </main>
            </Loading>
        </>
    )
  }
  
  export default SearchResults