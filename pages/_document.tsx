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
              href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap"
              rel="stylesheet"
            />
            <meta name="theme-color" content="#fff" />
            <meta name="description" content="Profepedia. Help other students by rating and reviewing your professors" />
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