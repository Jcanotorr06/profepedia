import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Profepedia | Coming Soon</title>
        <meta name="description" content="Profepedia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Profepedia
        </h1>

        <p className={styles.description}>
          Coming Soon
        </p>
      </main>
    </div>
  )
}
