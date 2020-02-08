import React from 'react'
import App, {Container} from 'next/app'
import Page from './Page'

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component } = this.props
    return (
        <Container>
            <Page>
                <Component />
            </Page>
        </Container>
    )
  }
}

export default MyApp
