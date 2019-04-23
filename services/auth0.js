import auth0 from "auth0-js";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";

import { getCookieFromReq } from "../helpers/utils";

const options = {
  language: "es"
};

const CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const BASE_URL = process.env.BASE_URL;

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "abcode.eu.auth0.com",
      clientID: CLIENT_ID,
      redirectUri: `${BASE_URL}/callback`,
      responseType: "token id_token",
      options
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject(err);
        } else {
          reject()
        }
      });
    });
  }

  setSession(authResult) {
    Cookies.set("jwt", authResult.idToken);
  }

  logout() {
    Cookies.remove("jwt");

    this.auth0.logout({
      returnTo: BASE_URL,
      clientID: CLIENT_ID
    });
  }

  async login(values) {
    return new Promise((resolve, reject) => {
      this.auth0.login(
        {
          realm: "Username-Password-Authentication",
          username: values.email,
          password: values.password,
          options
        },
        function(err, authResult) {
          // Auth tokens in the result or an error
          if (err) {
            return reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  
  async getJWKS() {
    const res = await axios.get(
      "https://abcode.eu.auth0.com/.well-known/jwks.json"
    );
    const jwks = res.data;
    return jwks;
  }

  async verifyToken(token) {
    if (token) {
      const decodedToken = jwt.decode(token, {
        complete: true
      });

      if (!decodedToken) {
        return undefined;
      }

      const jwks = await this.getJWKS();
      const jwk = jwks.keys[0];
      //Build certificate
      let cert = jwk.x5c[0];
      cert = cert.match(/.{1,64}/g).join("\n");
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

      if (jwk.kid === decodedToken.header.kid) {
        try {
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;

          return verifiedToken && new Date().getTime() < expiresAt
            ? verifiedToken
            : undefined;
        } catch (err) {
          return undefined;
        }
      }
    }
  }

  async clientAuth() {
    const token = Cookies.getJSON("jwt");
    const verifiedToken = await this.verifyToken(token);
    return verifiedToken;
  }

  async serverAuth(req) {
    if (req.headers.cookie) {
      const token = getCookieFromReq(req, "jwt");
      const verifiedToken = await this.verifyToken(token);

      return verifiedToken;
    }
    return undefined;
  }
}

const auth0Client = new Auth0();

export default auth0Client;
