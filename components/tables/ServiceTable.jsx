import React from "react";
import Link from "next/link";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
// core components
import Table from "../../src/components/Table/Table.jsx";
import Card from "../../src/components/Card/Card.jsx";
import CardHeader from "../../src/components/Card/CardHeader.jsx";
import CardBody from "../../src/components/Card/CardBody.jsx";
import AlertDialog from "../Alerts/AlertDialog";

import { deleteService } from "../../actions/index";
import { Router } from "../../routes";

const styles = theme => ({
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
  },
  tableButton: {
    color: theme.palette.secondary.main
  }
});

class ServiceTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      open: false,
      idToDelete: null
    };

    const { classes, servicies } = props;

    servicies.forEach((item, i) => {
      this.state.tableData.push([
        i,
        item.name,
        item.voluntaryName ? item.voluntaryName : "No especificado",
        item.periodicity ? item.periodicity : "No especificado",
        item.place ? item.place : "No especificado",
        <Link href={`/editar-servicio/${item._id}`}>
          <Button size="small" className={classes.tableButton}>
            Modificar
          </Button>
        </Link>,
        <Button
          size="small"
          className={classes.tableButton}
          onClick={() => this.handleClickOpen(item._id)}
        >
          Eliminar
        </Button>
      ]);
    });
    this.handleClose = this.handleClose.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
  }

  handleClickOpen = id => {
    this.setState({ open: true, idToDelete: id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAccept = () => {
    const id = this.state.idToDelete;
    if (id !== null) {
      this.deleteService(id);
    }
  };

  deleteService(serviceId) {
    deleteService(serviceId)
      .then(() => {
        Router.push("/registrar-servicios");
      })
      .catch(err => console.error(err));
  }

  render() {
    const { classes } = this.props;
    const { tableData, open } = this.state;
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Servicios</h4>
          <p className={classes.cardCategoryWhite}>Servicios registrados</p>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={[
              "ID",
              "SERVICIO",
              "RESPONSABLE",
              "PERIODICIDAD",
              "LUGAR",
              "",
              ""
            ]}
            tableData={tableData}
          />
        </CardBody>
        <AlertDialog
          id="eliminar-servicio"
          title="Eliminar Servicio"
          description="¿Desea eliminar este servicio? Al hacerlo se eliminará el servicio del registro y de todos los usuarios aderidos a este servicio"
          open={open}
          handleClose={this.handleClose}
          handleAccept={this.handleAccept}
        />
      </Card>
    );
  }
}

export default withStyles(styles)(ServiceTable);
