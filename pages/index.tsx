import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Translate } from '../components/Translation'
import { useUser, useLocale, useMode } from '../context'
import Link from 'next/link';

//Import Images
import Business from '../public/landing/business.svg'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profepedia</title>
        <meta name="description" content="Encuentra el mejor profesor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-12 gap-2 w-full min-h-full justify-center relative surface">
        <div className="border border-red-500 col-span-12 lg:col-span-5">
          <Link href="/docente/792">
            <a>
              Docente 792
            </a>
          </Link>
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
