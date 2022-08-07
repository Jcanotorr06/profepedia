import { NextPage } from "next"
import { Loading } from "../components/Navigation";
import { useProfessor, useSearch } from "../context"
import Head from 'next/head';
import { useIntl } from 'react-intl';
import Link from "next/link";
import { formatGroup, formatNombre, toTitleCase } from "../utils/utils";
import { TextButton } from "../components/Buttons";
import Load from 'react-loading'
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { SearchPage, SearchResults } from "../components/Pages";


const Search:NextPage = () => {
    const { query, loading, success, searchResult, amount, loadMore, loadingMore, handleSearch } = useSearch()
    const { handleSelection } = useProfessor()
    const router = useRouter()
    const intl = useIntl()

    useEffect(() => {
      if(!query && router.query.prof && typeof router.query.prof === "string" && /^[A-Za-z]+$/.test(router.query.prof)) {
        handleSearch(router.query.prof)
      }
    }, [router, query, handleSearch])

    // REDIRECT TO HOME SEARCH PAGE IF INVALID QUERY IS PASSED TO SEARCH
    useEffect(() => {
      if(Object.keys(router.query).length > 0 && !router.query.prof) {
        router.replace("/search")
      }
    }, [router])

    return (
      <>
        {query ? 
          <>
            <Head>
              <title>{intl.formatMessage({id: 'search_results', defaultMessage: `Resultados de Busqueda: ${query}`}, {query: query})} | Profepedia</title>
              <meta name="description" content="Encuentra el mejor profesor" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <SearchResults/>
          </>
          :
          <>
            <Head>
              <title>{intl.formatMessage({id: 'search_page', defaultMessage: "Busqueda"})} | Profepedia</title>
              <meta name="description" content="Encuentra el mejor profesor" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <SearchPage/>
          </>
        }
      </>
    )
  }
  
  export default Search