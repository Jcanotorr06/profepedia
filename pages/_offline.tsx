import { NextPage } from "next"
import { useIntl } from 'react-intl';
import Head from "next/head";


const OfflinePage:NextPage = () => {
    const intl = useIntl()
    return (
      <>
        <Head>
          <title>Offline | Profepedia</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="w-full h-screen overflow-hidden flex justify-center items-center">
          <div className="text-center text-lg">
            <i className="bi bi-wifi-off"/>&nbsp;
            Offline
          </div>
        </main>
      </>
    )
  }
  
  export default OfflinePage