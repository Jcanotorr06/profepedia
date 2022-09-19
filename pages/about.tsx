import { NextPage } from "next"
import Head from "next/head"
import { Translate } from "../components/Translation"
import { useIntl } from 'react-intl';
import Image from "next/image";
import Logo from '../public/logo.svg'

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
      <main className="w-full min-h-full flex flex-col gap-5">
        <h1 className="text-3xl font-medium"><Translate label="about_title" values={{bold: <b>Profepedia</b>}}/></h1>
        <article className="flex flex-col lg:flex-row justify-center items-center surface p-6 rounded-md shadow-md">
          <div className="flex-1 flex justify-center">
            <Image src={Logo} layout="intrinsic" alt="profepedia logo" title="Profepedia"/>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-medium"><Translate label="about_subtitle_1" values={{bold: <b>Profepedia</b>}}/></h2>
            <p><Translate label="about_description" values={{bold: <b>Profepedia</b>}}/></p>
          </div>
        </article>
      </main>
    </>
  )
}

export default About