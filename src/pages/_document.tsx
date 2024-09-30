import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'

export default function MyDocument(props: any) {
  return (
    <Html lang='en'>
      <Head>
        <link rel='icon' href='data:.' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap'
          rel='stylesheet'
        />
        <meta name='emotion-insertion-point' content='' />
        {props.emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// `getInitialProps` принадлежит `_document` (а не `_app`),
// это совместимо с генерацией статического контента (SSG).
MyDocument.getInitialProps = async (docContext: DocumentContext) => {
  // Порядок разрешения
  //
  // На сервере:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // На сервере в случае ошибки:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // На клиенте:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = docContext.renderPage

  docContext.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App  {...props} />
        }
    })

  const docProps = await Document.getInitialProps(docContext)

  return {
    ...docProps,
  }
}
