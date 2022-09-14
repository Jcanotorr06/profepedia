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
import { MainSearchBox } from '../components/Sections'

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Profepedia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-full relative">
        <div className="absolute left-0 top-0 w-full h-full bg-green-gradient-1"/>
        <div className="py-4 mx-auto container flex flex-col gap-10">
          <MainSearchBox/>
          <div className="divider"/>
          <section className="flex flex-col justify-center gap-8 mb-24">
              <h6 className="font-monospace font-medium text-xl mix-blend-color-burn">
                <Translate label="how_it_works"/>
              </h6>
              <h1 className="text-4xl font-bold lg:w-1/2">
                {/* Profepedia es la primera plataforma para calificar publicamente a los profesores en Panamá */}
                <Translate label="how_it_works_description"/>
              </h1>
              <div className="flex flex-col lg:flex-row gap-12 justify-center items-center w-full">
                <article className="border-2 border-red-300 bg-surface flex-1 py-16 px-12 flex flex-col gap-6 justify-center relative">
                  <div className="absolute -top-3 -left-3 h-6 w-6 bg-surface border-red-300 border-2"/>
                  <div className="absolute -bottom-3 -left-3 h-6 w-6 bg-surface border-red-300 border-2"/>
                  <div className="absolute -bottom-3 -right-3 h-6 w-6 bg-surface border-red-300 border-2"/>
                  <div className="absolute -top-3 -right-3 h-6 w-6 bg-surface border-red-300 border-2"/>

                  <i className="bi bi-github text-3xl"/>
                  <h3 className="font-bold text-3xl">Learn through hands on lessons right through Figma</h3>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, reiciendis! Iusto molestiae doloribus eveniet quibusdam quod expedita illum similique, facere nostrum ea laudantium mollitia vel laborum omnis soluta necessitatibus magnam!</p>
                </article>
                
                <article className="border-2 border-green-300 bg-surface flex-1 py-16 px-12 flex flex-col gap-6 justify-center relative">
                  <div className="absolute -top-3 -left-3 h-6 w-6 bg-surface border-green-300 border-2"/>
                  <div className="absolute -bottom-3 -left-3 h-6 w-6 bg-surface border-green-300 border-2"/>
                  <div className="absolute -bottom-3 -right-3 h-6 w-6 bg-surface border-green-300 border-2"/>
                  <div className="absolute -top-3 -right-3 h-6 w-6 bg-surface border-green-300 border-2"/>

                  <i className="bi bi-github text-3xl"/>
                  <h3 className="font-bold text-3xl">Learn through hands on lessons right through Figma</h3>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, reiciendis! Iusto molestiae doloribus eveniet quibusdam quod expedita illum similique, facere nostrum ea laudantium mollitia vel laborum omnis soluta necessitatibus magnam!</p>
                </article>
                
                <article className="border-2 border-blue-300 bg-surface flex-1 py-16 px-12 flex flex-col gap-6 justify-center relative">
                  <div className="absolute -top-3 -left-3 h-6 w-6 bg-surface border-blue-300 border-2"/>
                  <div className="absolute -bottom-3 -left-3 h-6 w-6 bg-surface border-blue-300 border-2"/>
                  <div className="absolute -bottom-3 -right-3 h-6 w-6 bg-surface border-blue-300 border-2"/>
                  <div className="absolute -top-3 -right-3 h-6 w-6 bg-surface border-blue-300 border-2"/>

                  <i className="bi bi-github text-3xl"/>
                  <h3 className="font-bold text-3xl">Learn through hands on lessons right through Figma</h3>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, reiciendis! Iusto molestiae doloribus eveniet quibusdam quod expedita illum similique, facere nostrum ea laudantium mollitia vel laborum omnis soluta necessitatibus magnam!</p>
                </article>
              </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default Home
