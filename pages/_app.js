import React from "react";
import App, { Container } from "next/app";
import auth0 from "../services/auth0";
import Head from "next/head";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import getPageContext from "../helpers/getPageContext";

import "../src/assets/css/material-dashboard-react.css?v=1.6.0";

export default class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    console.log(ctx)
    const user = process.browser
      ? await auth0.clientAuth()
      : await auth0.serverAuth(ctx.req);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const isAdmin = user && user[process.env.NAMESPACE + "/role"] === "admin";
    const auth = { user, isAuthenticated: !!user, isAdmin };

    return { pageProps, auth };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, auth } = this.props;
    return (
      <Container>
        <Head>
          <title>Asam Burgos</title>
        </Head>
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <CssBaseline />
            <Component
              pageContext={this.pageContext}
              auth={auth}
              {...pageProps}
            />
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}
