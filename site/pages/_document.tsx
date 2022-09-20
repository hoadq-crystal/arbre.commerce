import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport"
                content="width=device-width, initial-scale=1.0"/>
          <meta charSet="utf-8"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&amp;display=swap"/>
          <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;500;600;700;800;900&amp;display=swap" />
        </Head>
        <body className="loading">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
