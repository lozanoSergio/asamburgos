import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Table from "../../src/components/Table/Table.jsx";
import Card from "../../src/components/Card/Card.jsx";
import CardHeader from "../../src/components/Card/CardHeader.jsx";
import CardBody from "../../src/components/Card/CardBody.jsx";
import Link from "next/link";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

function ActivityTable (props) {

    const { classes } = props;

    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Servicios</h4>
          <p className={classes.cardCategoryWhite}>
            Servicios registrados
          </p>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={["ID", "ACTIVIDAD", "EDITAR", "BORRAR"]}
            tableData={[
              [
                "1",
                "Psicologo",
                <Link href={"/nuevo-alta"}>
                  <a>Modificar</a>
                </Link>,
                <Link href={"/nuevo-alta"}>
                  <a>Eliminar</a>
                </Link>
              ],
              [
                "2",
                "Medicina General",
                <Link href={"/nuevo-alta"}>
                  <a>Modificar</a>
                </Link>,
                <Link href={"/nuevo-alta"}>
                  <a>Eliminar</a>
                </Link>
              ],
              [
                "3",
                "Asistencia Técnica",
                <Link href={"/nuevo-alta"}>
                  <a>Modificar</a>
                </Link>,
                <Link href={"/nuevo-alta"}>
                  <a>Eliminar</a>
                </Link>
              ]
            ]}
          />
        </CardBody>
      </Card>
    );
}

export default withStyles(styles)(ActivityTable);
