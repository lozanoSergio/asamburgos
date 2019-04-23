import React from "react";
import LoginForm from "../forms/LoginForm";
import auth0 from "../../services/auth0";
import { switchcase } from "../../helpers/utils";

const translateError = switchcase({
  "access_denied": "Usuario o contraseña incorrectos.",
  "invalid_user_password": "Usuario o contraseña incorrectos.",
  "too_many_attempts": "Su cuenta ha sido bloqueada después de haber realizado varios intentos de inicio de sesión consecutivos. Le hemos enviado un correo electrónico con instrucciones sobre cómo desbloquearla"
})("Error del servidor. Pongase en contacto con el administrador de la página")

export default role => Component =>
  class withAuth extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        error: undefined
      };

      this.onSubmitLogin = this.onSubmitLogin.bind(this);
    }

    static async getInitialProps(args) {
      const pageProps =
        (await Component.getInitialProps) &&
        (await Component.getInitialProps(args));

      return { ...pageProps };
    }

    onSubmitLogin = (values, { setSubmitting }) => {
      setSubmitting(true);
      auth0.login(values)
        .then(res => {
          setSubmitting(false);
          this.setState({ error: undefined });
        })
        .catch(err => {
          const error = translateError(err.code);
          setSubmitting(false);
          this.setState({ error });
        });
    };

    renderProtectedPage() {
      const { isAuthenticated, user } = this.props.auth;
      const userRole = user && user[`${process.env.NAMESPACE}/role`];
      let isAuthorized = false;

      if (role) {
        if (userRole && userRole === role) {
          isAuthorized = true;
        }
      } else {
        isAuthorized = true;
      }

      if (!isAuthenticated || !isAuthorized) {
        return <LoginForm onSubmit={this.onSubmitLogin} error={this.state.error} />;
      } else {
        return <Component {...this.props} />;
      }
    }

    render() {
      return this.renderProtectedPage();
    }
  };
