import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import auth0Client from "../services/auth0";
import { withRouter } from "next/router";

class Callback extends React.Component {
  async componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      try {
        await auth0Client.handleAuthentication();
        this.props.router.push("/");
      } catch {
        this.props.router.push("/");
      }
    } else {
      this.props.router.push("/");
    }
  }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <LinearProgress />
        <h1 style={{marginLeft: "1em"}}>Redirigiendo...</h1>
      </div>
    );
  }
}
export default withRouter(Callback);
