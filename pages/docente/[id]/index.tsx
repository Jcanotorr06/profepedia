import { NextPage } from "next"
import Head from "next/head"
import { Loading } from "../../../components/Navigation"
import { useProfessor } from "../../../context"
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { formatGroup, formatNombre } from "../../../utils/utils";
import { IconButton } from "../../../components/Buttons";
import { useIntl } from 'react-intl';
import { Translate } from "../../../components/Translation";


const Docente:NextPage = () => {
  const { getData, selection, loading, data } = useProfessor()
  const router = useRouter()
  const intl = useIntl()

  const [id, setId] = useState<number|null>(null)

/*   const handleLoad = useCallback(() => {
    const id = router.query.id ? parseInt(router.query.id as string) : 0
    console.log(id)

    getData(id)
  }, [])

  useEffect(() => {
    handleLoad()
  }, [handleLoad]) */

  useEffect(() => {
    if(router.query.id && typeof router.query.id === 'string'){
      setId(parseInt(router.query.id))
    }
  }, [router.query.id])

  useEffect(() => {
    if(id){
      console.log(id)
    }
  }, [id])

  return (
    <>
      <Head>
        <title>{intl.formatMessage({id: "professor_title", defaultMessage: "Profesor(a) {name}"}, {name: data?.nombre})}</title>
      </Head>
      <Loading className="h-screen w-screen" active={loading}>
          <main className="w-full min-h-full flex flex-col gap-6 px-4 md:px-2 lg:px-24">
            <section className="flex flex-col md:flex-row gap-4 col-span-12 surface">
              <article className="flex flex-col grow-1 border border-blue-400 p-4 gap-2">
                <div className="flex col-span-full">
                  <div className="flex flex-col items-center">
                    <h1 className="text-6xl font-black">{data && data.rating.toFixed(1)}</h1>
                  </div>
                  <div className="flex items-center">
                    <sup className="text-sm font-bold muted">/5</sup>
                  </div>
                </div>
                <div className="flex col-span-full mt-1 mb-2">
                  <span className="text-xs">{/* Rating General Basado en {data?.cant_rating} calificaciones */} <Translate label="general_rating" values={{cant: data?.cant_rating}}/></span>
                </div>
                <div className="flex col-span-full">
                  <div className="flex col-span-10 grow-1">
                    <h1 className="font-bold text-2xl">{data ? formatNombre(data.nombre) : ''}</h1>
                  </div>
                  <div className="flex col-span-1">
                    <IconButton icon="bi-bookmark"/>
                  </div>
                </div>
                <div className="col-span-full">
                  <p className="text-xs">
                    {data && data.departamento ? formatGroup(data.departamento) : ''}
                  </p>
                  <p className="text-xs">
                    {data && data.unidad ? formatGroup(data.unidad) : ''}
                  </p>
                </div>
                <div className="col-span-6 my-4 flex">
                  <div className="grow flex flex-col justify-center text-center border-r border-gray-500">
                    <div className="text-center text-3xl font-black">
                      {data && data.cant_rating > 0 ? `${((data.cant_wouldTakeAgain/data.cant_rating)*100).toFixed(0)}%` : '0%'}
                    </div>
                    <div className="text-center text-xs">
                      <Translate label="would_take_again"/>
                    </div>  
                  </div>
                  <div className="grow flex flex-col items-center justify-center text-center">
                    <div className="text-center text-3xl font-black">
                      {data && data.dificultad.toFixed(1)}
                    </div>
                    <div className="text-center text-xs">
                      <Translate label="difficulty" />
                    </div>  
                  </div>
                </div>
              </article>
              <article className="flex flex-col grow-1 border border-red-400 col-span-6">
                Ratings breakdown
              </article>
            </section>
            <section className="flex col-span-12 border border-orange-800">
              RATINGS
            </section>
          </main>
      </Loading>
    </>
  )
}

export default Docente