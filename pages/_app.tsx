import '../styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { UserProvider } from '../context/UserContext'
import { ModeProvider, useMode } from '../context/ModeContext'
import { LocaleProvider } from '../context/LocaleContext'
import DefaultLayout from '../layouts/default'

function MyApp({ Component, pageProps }: AppProps) {
  
  const { mode } = useMode()

  return (
    <>
      <Head>
        <meta name="charset" content="UTF-8"/>
        <meta name="keywords" content="Profesor, Rating, Review, Opinion, Social, UTP, University, Universidad"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <UserProvider>
        <ModeProvider>
          <LocaleProvider>
            <DefaultLayout>
              <Component {...pageProps}/>
            </DefaultLayout>
          </LocaleProvider>
        </ModeProvider>
      </UserProvider>
    </>
  )
}

export default (MyApp)
