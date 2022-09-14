import Document, { Html, Head, Main, NextScript } from "next/document";


class MyDocument extends Document {
    render() {
      return (
        <Html>
          <Head>
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/icon.png"></link>
            <link 
              href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,800;1,900&display=swap"
              rel="stylesheet"  
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500&display=swap"
              rel="stylesheet"
            />
            <meta name="theme-color" content="#fff" />
            <meta name="title" content="Profepedia"/>
            <meta name="description" content="Profepedia. Help other students by rating and reviewing your professors" />
            <meta property="og:title" content="Profepedia" />
            <meta property="og:type" content="website" />
            <meta name="og:description" content="Help other students by rating and reviewing your professors"/>
            <meta property="og:image" content="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=50" />
            <meta property="og:url" content="https://profepedia.vercel.app" />
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content="@spoofy507"/>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
  }
  
  export default MyDocument;