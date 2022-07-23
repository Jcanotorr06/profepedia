import '../styles/globals.css'
import '../styles/cursor.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { UserProvider } from '../context/UserContext'
import { ModeProvider, useMode } from '../context/ModeContext'
import { LocaleProvider } from '../context/LocaleContext'
import DefaultLayout from '../layouts/default'
import { TopMessage } from '../components/Notifications'
import { useEffect } from 'react';
import { disableReactDevTools } from '../utils/disableReactDevTools'
import { ModalProvider, SearchProvider } from '../context'
import { useModal } from './../context/ModalContext';
import NextNProgress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }: AppProps) {
  
  useEffect(() => {
    /* if(process.env.NODE_ENV === 'production') {
      disableReactDevTools()
      console.log = () =>{}
      console.error = () =>{}
      console.warn = () =>{}
      console.info = () =>{}
    } */
  }, [])

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
            <ModalProvider>
              <NextNProgress height={6} color="#6C4BDA"/>
              <TopMessage/>
              <SearchProvider>
                <DefaultLayout>
                  <Component {...pageProps}/>
                </DefaultLayout>
              </SearchProvider>
            </ModalProvider>
          </LocaleProvider>
        </ModeProvider>
      </UserProvider>
    </>
  )
}

export default (MyApp)
