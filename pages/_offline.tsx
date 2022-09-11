import { NextPage } from "next"
import { useIntl } from 'react-intl';
import Head from "next/head";


const OfflinePage:NextPage = () => {
    const intl = useIntl()
    return (
      <>
        <Head>
          <title>Offline | Profepedia</title>
          <meta name="description" content="Conectate a internet para acceder a la pagina" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="w-screen h-screen overflow-hidden flex justify-center items-center">
          <div className="p-2 text-center">
            <h1>You&apos;re Offline</h1>
          </div>
        </main>
      </>
    )
  }
  
  export default OfflinePage