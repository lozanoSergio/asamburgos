import React from "react";
import App, { Container } from 'next/app';
import dynamic from 'next/dynamic';

// core components
const Admin = dynamic(import("../src/layouts/Admin.jsx"), { ssr: false });
const RTL = dynamic(import("../src/layouts/RTL.jsx"), { ssr: false }) ;

import "../src/assets/css/material-dashboard-react.css?v=1.6.0";
import '../styles/main.scss';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx, asPath }) {
      let pageProps = {};
      //const user = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(ctx.req);

      if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx)
      }

      //const auth = { user, isAuthenticated: !!user };

      return { pageProps }
  }

  render (){
      const { Component, pageProps } = this.props;
      return (
          <Container>
              <Component {...pageProps} />
          </Container>
      )
  }
}