import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Translate } from '../components/Translation'
import { useUser, useLocale, useMode } from '../context'
import Link from 'next/link';

const Home: NextPage = () => {
  const { locale, changeLocale } = useLocale()
  const { swapMode } = useMode()
  const { login, logout, user } = useUser()

  const onChangeLocale = () => {
    changeLocale(locale === 'en' ? 'es' : 'en')
  }

  return (
    <>
      <Head>
        <title>Profepedia</title>
        <meta name="description" content="Encuentra el mejor profesor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-12 gap-2 min-h-full justify-center relative">
        <div className="border border-red-500 col-span-12 lg:col-span-5">
          <Link href="/docente/792">
            <a>
              Hello
            </a>
          </Link>
        </div>
        <div className="border border-blue-500 col-span-12 lg:col-span-7">
          World
        </div>
      </main>
    </>
  )
}

export default Home
