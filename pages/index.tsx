import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Translate } from '../components/Translation'
import { useUser, useLocale, useMode } from '../context'

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

      <main className="">
        <i className='bi bi-linkedin'/>
        <Translate label="hello"/>
        <button onClick={() =>onChangeLocale()} className="button-primary">Change Language</button>
        <button onClick={() => swapMode()}>
          <i className='bi bi-sun-fill' />
        </button>
        <div className='p-4'>
          <button onClick={() => !user ? login('josephct06@gmail.com'): logout()}>
            {
              !user ?'login':'logout'
            }
          </button>
        </div>
      </main>
    </>
  )
}

export default Home
