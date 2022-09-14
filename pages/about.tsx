import { NextPage } from "next"
import Head from "next/head"
import { Translate } from "../components/Translation"
import { useIntl } from 'react-intl';

type Question = {
  question: string,
  answer: string
}

const About:NextPage = () => {
  const intl = useIntl()
  return (
    <>
      <Head>
        <title>{intl.formatMessage({id: 'about', defaultMessage: 'Acerca de'})} | Profepedia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full min-h-full flex flex-col gap-5">

      </div>
    </>
  )
}

export default About