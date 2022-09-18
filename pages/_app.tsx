import '../styles/globals.css'
import '../styles/cursor.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import NextNProgress from 'nextjs-progressbar'
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import DefaultLayout from '../layouts/default'
import { Toast, TopMessage } from '../components/Notifications'
import { disableReactDevTools } from '../utils/disableReactDevTools'
import { ModalProvider, ProfessorProvider, SearchProvider, ModeProvider, LocaleProvider, UserProvider } from '../context'
/* import { Modal } from './../components/Modals'; */
const Modal = dynamic(() => import('./../components/Modals/Modal'), {ssr: false})
function MyApp({ Component, pageProps }: AppProps) {
  
  useEffect(() => {
    if(process.env.NODE_ENV === 'production') {
      disableReactDevTools()
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="charset" content="UTF-8"/>
        <meta name="keywords" content="Profesor, Rating, Review, Opinion, Social, UTP, University, Universidad"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      {/* Google tag (gtag.js) */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-F32L3CFGJV" strategy="afterInteractive"/>
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-F32L3CFGJV');`}
      </Script>
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
