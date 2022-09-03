import '../styles/globals.css'
import '../styles/cursor.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import { useEffect } from 'react';
import { UserProvider } from '../context/UserContext'
import { ModeProvider, useMode } from '../context/ModeContext'
import { LocaleProvider } from '../context/LocaleContext'
import DefaultLayout from '../layouts/default'
import { Toast, TopMessage } from '../components/Notifications'
import { disableReactDevTools } from '../utils/disableReactDevTools'
import { ModalProvider, ProfessorProvider, SearchProvider } from '../context'
import { Modal } from './../components/Modals';

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
              <ProfessorProvider>
                <SearchProvider>
                  <Toast/>
                  <Modal/>
                  <TopMessage/>
                  <DefaultLayout>
                    <Component {...pageProps}/>
                  </DefaultLayout>
                </SearchProvider>
              </ProfessorProvider>
            </ModalProvider>
          </LocaleProvider>
        </ModeProvider>
      </UserProvider>
    </>
  )
}

export default (MyApp)
