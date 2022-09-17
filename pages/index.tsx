import type { NextPage } from 'next'
import Head from 'next/head'
import { Translate } from '../components/Translation'

//Import Images
import { MainSearchBox } from '../components/Sections'

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Profepedia | Califica a Tus Profesores</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-full relative">
        <div className="absolute left-0 top-0 w-full h-full bg-green-gradient-1"/>
        <div className="py-4 px-2 md:px-0 mx-auto container flex flex-col gap-10">
          <MainSearchBox/>
          <div className="divider"/>
          <section className="flex flex-col justify-center gap-8 mb-24">
              <h6 className="font-monospace font-medium md:text-xl mix-blend-color-burn">
                <Translate label="how_it_works"/>
              </h6>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold lg:w-1/2">
                {/* Profepedia es la primera plataforma para calificar publicamente a los profesores en Panamá */}
                <Translate label="how_it_works_description"/>
              </h2>
              <div className="flex flex-col lg:flex-row gap-12 justify-center items-stretch w-full px-3 lg:px-0">
                <article className="border-2 border-red-300 bg-surface flex-1 px-6 py-10 md:py-16 md:px-12 flex flex-col gap-6 justify-center relative">
                  <div className="absolute -top-3 -left-3 h-6 w-6 bg-surface border-red-300 border-2"/>
                  <div className="absolute -bottom-3 -left-3 h-6 w-6 bg-surface border-red-300 border-2"/>
                  <div className="absolute -bottom-3 -right-3 h-6 w-6 bg-surface border-red-300 border-2"/>
                  <div className="absolute -top-3 -right-3 h-6 w-6 bg-surface border-red-300 border-2"/>

                  <i className="bi bi-person-circle text-2xl md:text-3xl text-icon"/>
                  <h3 className="font-bold text-xl md:text-3xl"><Translate label="landing_card_title_1"/></h3>
                  <p className="text-sm md:text-base"><Translate label="landing_card_paragraph_1" values={{bold: <b>Profepedia</b>}}/></p>
                </article>
                
                <article className="border-2 border-green-300 bg-surface flex-1 px-6 py-10 md:py-16 md:px-12 flex flex-col gap-6 justify-center relative">
                  <div className="absolute -top-3 -left-3 h-6 w-6 bg-surface border-green-300 border-2"/>
                  <div className="absolute -bottom-3 -left-3 h-6 w-6 bg-surface border-green-300 border-2"/>
                  <div className="absolute -bottom-3 -right-3 h-6 w-6 bg-surface border-green-300 border-2"/>
                  <div className="absolute -top-3 -right-3 h-6 w-6 bg-surface border-green-300 border-2"/>

                  <i className="bi bi-search text-2xl md:text-3xl text-icon"/>
                  <h3 className="font-bold text-xl md:text-3xl"><Translate label="landing_card_title_2"/></h3>
                  <p className="text-sm md:text-base"><Translate label="landing_card_paragraph_2"/></p>
                </article>
                
                <article className="border-2 border-blue-300 bg-surface flex-1 px-6 py-10 md:py-16 md:px-12 flex flex-col gap-6 justify-center relative">
                  <div className="absolute -top-3 -left-3 h-6 w-6 bg-surface border-blue-300 border-2"/>
                  <div className="absolute -bottom-3 -left-3 h-6 w-6 bg-surface border-blue-300 border-2"/>
                  <div className="absolute -bottom-3 -right-3 h-6 w-6 bg-surface border-blue-300 border-2"/>
                  <div className="absolute -top-3 -right-3 h-6 w-6 bg-surface border-blue-300 border-2"/>

                  <i className="bi bi-eye-slash-fill text-2xl md:text-3xl text-icon"/>
                  <h3 className="font-bold text-xl md:text-3xl"><Translate label="landing_card_title_3"/></h3>
                  <p className="text-sm md:text-base"><Translate label="landing_card_paragraph_3" values={{bold: <b>Profepedia</b>}}/></p>
                </article>
              </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default Home
