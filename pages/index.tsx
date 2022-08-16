import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Translate } from '../components/Translation'
import { useUser, useLocale, useMode } from '../context'
import Link from 'next/link';

//Import Images
import Business from '../public/landing/business.svg'
import { toast } from 'react-toastify'
import Load from 'react-loading';
import { IconButton } from '../components/Buttons'
import { GradeBar, GradeGraph } from '../components/GradeGraph'
import { Grade } from '../types/grade'

const Home: NextPage = () => {

  const notify = () => {
    toast.error("Ha ocurrido un error")
  }

  const grades:Grade[] = [
    {
      grade: 5,
      ratio: Math.random(),
      title: 'awesome',
      count: 4
    },
    {
      grade: 4,
      ratio: Math.random(),
      title: 'good',
      count: 6
    },
    {
      grade: 3,
      ratio: Math.random(),
      title: 'regular',
      count: 8
    },
    {
      grade: 2,
      ratio: Math.random(),
      title: 'bad',
      count: 3
    },
    {
      grade: 1,
      ratio: Math.random(),
      title: 'horrible',
      count: 3
    },
  ]
  return (
    <>
      <Head>
        <title>Profepedia</title>
        <meta name="description" content="Encuentra el mejor profesor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-12 gap-2 w-full min-h-full justify-center relative surface">
        <div className="border border-red-500 col-span-12 lg:col-span-5 p-3">
          <Link href="/docente/792">
            <a>
              Docente 792
            </a>
          </Link>
          <div>
            <button onClick={() => notify()} className="bg-blue-300 p-3">Toast</button> 
          </div>
          <div>
            <Load color='#000' type="bubbles"/>
          </div>
          <div className=''>
            {/* <div className="flex justify-between w-full rounded-full input-main input shadow-lg border">
              <input type="text" className="px-3 py-10 text-lg rounded-full w-full input_transparent" placeholder="Nombre del profesor" />
            </div> */}
              <GradeGraph grades={grades}/>
            <div className="flex flex-col gap-4">
            </div>
          </div>
        </div>
        <div className="border border-blue-500 col-span-12 lg:col-span-7 justify-center flex">
          <div className='block w-full' style={{maxWidth: '600px'}}>
            <Image src={Business} alt="business" layout="responsive" />
          </div>
        </div>
        <div className="col-span-12 border border-green-500 py-64">
          Hello
        </div>
      </main>
    </>
  )
}

export default Home
