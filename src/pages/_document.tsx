import Document, { Html, Head, Main, NextScript } from 'next/document'

class Doc extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@700&text=G&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Doc
