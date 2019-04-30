import React from "react";
import Link from "next/link";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../src/components/Grid/GridContainer";
import GridItem from "../src/components/Grid/GridItem";
import { withRouter } from "next/router";

const style = {};

class ErrorPage extends React.Component {
  static propTypes() {
    return {
      errorCode: React.PropTypes.number.isRequired,
      url: React.PropTypes.string.isRequired
    };
  }

  static getInitialProps({ res, xhr }) {
    const errorCode = res ? res.statusCode : xhr ? xhr.status : null;
    return { errorCode };
  }

  render() {
    var response;
    switch (this.props.errorCode) {
      case 200:
      case 404:
      case 422:
        response = (
          <div>
            <GridContainer>
              <GridItem>
                <h1>Página No Encontrada</h1>
                <p>
                  La página a la que está intentando acceder no existe. Haz click
                  <Link href="/">
                    <a>  aquí </a>
                  </Link>
                  para regresar a la página principal.
                </p>
              </GridItem>
            </GridContainer>
          </div>
        );
        break;
      case 500:
        response = (
          <div>
            <GridContainer>
              <h1>Internal Server Error</h1>
              <p>An internal server error occurred.</p>
            </GridContainer>
          </div>
        );
        break;
      default:
        response = (
          <div>
            <GridContainer>
              <GridItem>
                <h1>HTTP {this.props.errorCode} Error</h1>
                <p>
                  An <strong>HTTP {this.props.errorCode}</strong> error occurred
                  while trying to access{" "}
                  <strong>{this.props.router.pathname}</strong>
                </p>
              </GridItem>
            </GridContainer>
          </div>
        );
    }

    return response;
  }
}

export default withRouter(ErrorPage);
