import Document, { Html, Head, Main, NextScript } from "next/document";


class MyDocument extends Document {
    render() {
      return (
        <Html lang="es">
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
            <meta name="title" content="Profepedia | Califica Tus Profesores"/>
            <meta name="description" content="Con más de 7 mil profesores, Profepedia es a mejor fuente de calificaciones de profesores basada en los comentarios de los estudiantes." />
            <meta property="og:title" content="Profepedia | Califica Tus Profesores" />
            <meta property="og:type" content="website" />
            <meta name="og:description" content="Con más de 7 mil profesores, Profepedia es a mejor fuente de calificaciones de profesores basada en los comentarios de los estudiantes."/>
            <meta property="og:image" content="https://raw.githubusercontent.com/Jcanotorr06/images/main/profepedia_og_image.png" />
            <meta property="og:url" content="https://www.profepedia.xyz" />
            {/* <meta name="twitter:card" content="summary_large_image"/> */}
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