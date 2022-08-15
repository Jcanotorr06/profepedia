import { NextPage } from "next"
import Head from "next/head"
import { Loading } from "../../../components/Navigation"
import { useLocale, useProfessor } from "../../../context"
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState, FormEvent } from 'react';
import { formatGroup, formatNombre, isNumeric } from "../../../utils/utils";
import { IconButton, TextButton } from "../../../components/Buttons";
import { useIntl } from 'react-intl';
import { Translate } from "../../../components/Translation";
import { toast } from "react-toastify";
import { Grade } from "../../../types/grade";
import { GradeGraph } from "../../../components/GradeGraph";
import Load from 'react-loading';
import moment from 'moment'


const Docente:NextPage = () => {
  const { 
    getData, selection, loading, data, 
    ratingBreakdown, reviewCount, reviews,
    loadMore, loadingMore, sortReviews 
  } = useProfessor()
  const router = useRouter()
  const intl = useIntl()
  const { locale } = useLocale()

  const [id, setId] = useState<number|null>(null)
  const [_loading, setLoading] = useState<boolean>(true)
  const [grades, setGrades] = useState<Grade[]>([])
  const [orderBy, setOrderBy] = useState<string>('popular')

  const titles:any = {
    5: 'awesome',
    4: 'good',
    3: 'regular',
    2: 'bad',
    1: 'horrible'
  }

  useEffect(() => {
    if(router.query.id && typeof router.query.id === 'string' && isNumeric(router.query.id)){
      console.log(isNumeric(router.query.id), router.query.id, typeof router.query.id)
      setId(parseInt(router.query.id))
    }
  }, [router.query.id])

  useEffect(() => {
    if(id && !data && !loading){
      console.log(id)
      getData(id)
    }
  }, [id, data, loading])

  useEffect(() => {
    setGrades(ratingBreakdown.map(breakdown => ({
      grade: breakdown.rating,
      ratio: reviewCount > 0 ? breakdown.count / reviewCount : 0,
      title: titles[breakdown.rating],
      count: breakdown.count
    })))
  }, [ratingBreakdown, reviewCount])
  useEffect(() => {
    console.log('GRADES: ',grades)
  }, [grades])

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  })

  const handleOrderBy = (event: FormEvent<HTMLSelectElement>) => {
    setOrderBy(event.currentTarget.value)
    sortReviews(orderBy)
  }

  return (
    <>
      <Head>
        <title>{intl.formatMessage({id: "professor_title", defaultMessage: "Profesor(a) {name}"}, {name: data ? formatNombre(data.nombre) : ''})}</title>
      </Head>
      <Loading className="h-screen w-screen" active={loading||_loading}>
          <main className="w-full min-h-full flex flex-col gap-6 px-4 md:px-2 lg:px-24">
            <section className="flex flex-col md:flex-row gap-4 col-span-12 surface drop-shadow rounded-md justify-center">
              <article className="flex flex-col grow-1 p-4 gap-2">
                <div className="flex col-span-full">
                  <div className="flex flex-col items-center">
                    <h1 className="text-6xl font-black">{data && data.rating.toFixed(1)}</h1>
                  </div>
                  <div className="flex items-center">
                    <sup className="text-sm font-bold muted">/5</sup>
                  </div>
                </div>
                <div className="flex col-span-full mt-1 mb-2">
                  <span className="text-xs"><Translate label="general_rating" values={{cant: data?.cant_rating}}/></span>
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
                      <h3>
                        {data && data.cant_rating > 0 ? `${((data.cant_wouldTakeAgain/data.cant_rating)*100).toFixed(0)}%` : '0%'}
                      </h3>
                    </div>
                    <div className="text-center text-xs">
                      <Translate label="would_take_again"/>
                    </div>  
                  </div>
                  <div className="grow flex flex-col items-center justify-center text-center">
                    <div className="text-center text-3xl font-black">
                      <h3>
                        {data && data.dificultad.toFixed(1)}
                      </h3>
                    </div>
                    <div className="text-center text-xs">
                      <Translate label="difficulty" />
                    </div>  
                  </div>
                </div>
                <div className="flex gap-3 w-full">
                  <div className="w-full">
                    <TextButton 
                      handleClick={() => {}} 
                      text="rate_professor" 
                      className="px-4 py-3 font-bold button-primary rounded-full w-full" 
                      rippleClassName="rounded-full w-full"/>
                  </div>
                </div>
              </article>
              <article className="flex flex-col grow-1 col-span-6 p-2 justify-center">
                <div>
                  <Translate label="ratings_breakdown" className="text-xl font-bold"/>
                </div>
                <div className="p-3">
                  <GradeGraph grades={grades}/>
                </div>
              </article>
            </section>
            <section className="flex flex-col gap-3 col-span-12 p-2">
              {reviews.length === 0 ? 
                <div className="text-center text-3xl p-4">
                  <Translate label="no_reviews"/>
                </div>
                :
                <>
                  <div className="border-b border-gray-300 flex">
                      <div className="font-bold border-b border-black px-2 select-none"><Translate label="review_count" values={{count: reviewCount}}/></div>
                  </div>
                  <div>
                    <select name="order" id="" value={orderBy} className="px-6 py-2 surface rounded shadow" onChange={handleOrderBy}>
                      <option value="popular" selected><Translate label="popular"/></option>
                      <option value="date"><Translate label="date"/></option>
                    </select>
                  </div>
                  {reviews.map((review) =>(
                    <article className="surface px-4 py-4 rounded-md shadow flex gap-3" key={review.id}>
                      <div className="flex flex-col">

                      </div>
                      <div className="flex flex-col flex-grow gap-3">
                        <div className="flex gap-3 items-center text-sm">
                          <div className="font-black text-base"><h2>{review.asignatura}</h2></div>
                          <div className={`px-3 py-1 font-bold text-xs rounded ${review.rating === 0 ? 'bg-gray-300' : review.rating < 3 ? 'bg-red-300' : review.rating < 4 ? 'bg-yellow-300' : 'bg-green-400'}`}>
                            <Translate label={`score_${titles[review.rating]}`}/>
                          </div>
                          <div className="flex-grow text-right">
                            <span>
                              {moment(review.created_at).locale(locale).format('MMMM Do, YYYY')}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-3 text-sm">
                          <div><Translate label="is_credit"/><Translate label={review.isCredit ? 'yes':'no'} className="font-bold"/></div>
                          <div><Translate label="attendance_mandatory"/><Translate label={review.attendanceMandatory ? 'mandatory':'optional'} className="font-bold"/></div>
                          <div><Translate label="would_take_again_tag"/><Translate label={review.isCredit ? 'yes':'no'} className="font-bold"/></div>
                          <div><Translate label="grade"/><span className="font-bold">{review.nota}</span></div>
                          <div><Translate label="use_textbooks"/><Translate label={review.isCredit ? 'yes':'no'} className="font-bold"/></div>
                        </div>
                        <div className="my-1">
                          <p>{review.review}</p>
                        </div>
                        {(review.tag1 || review.tag2 || review.tag3 )&& (
                          <div className="flex gap-3 text-sm">
                            {review.tag1 && <Translate label={review.tag1} className="px-3 py-1 rounded-full ground font-bold shadow"/>}
                            {review.tag2 && <Translate label={review.tag2} className="px-3 py-1 rounded-full ground font-bold shadow"/>}
                            {review.tag3 && <Translate label={review.tag3} className="px-3 py-1 rounded-full ground font-bold shadow"/>}
                          </div>                        
                        )}
                        <div className="flex gap-3 my-3">
                          <div className="flex gap-4 font-semibold">
                            <span>
                              <IconButton icon="bi-hand-thumbs-up"/> {review.likes}
                            </span>
                            <span>
                              <IconButton icon="bi-hand-thumbs-down"/> {review.dislikes}
                            </span>
                          </div>
                          <div className="flex flex-grow text-right">
                            <span className="ml-auto mr-2 text-lg font-bold">
                              <IconButton icon="bi-flag" className="px-1 rounded-full"/>
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                  {
                      loadingMore && 
                      <div className="flex justify-center my-4">
                        <Load color="#000" type="bubbles"/>
                      </div>
                  }
                  {reviews.length < reviewCount && id && (
                    <div className="flex justify-center my-4">
                    <TextButton
                        text="load_more"
                        className="button-primary py-3 px-8 font-bold text-lg rounded-lg"
                        rippleClassName="rounded-lg"
                        handleClick={() => loadMore(id)}
                    />
                    </div>
                  )}
                </>
              }
            </section>
          </main>
      </Loading>
    </>
  )
}

export default Docente