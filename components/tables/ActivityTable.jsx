import React from "react";
import Link from "next/link";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

// core components
import Table from "../../src/components/Table/Table.jsx";
import Card from "../../src/components/Card/Card.jsx";
import CardHeader from "../../src/components/Card/CardHeader.jsx";
import CardBody from "../../src/components/Card/CardBody.jsx";
import AlertDialog from "../Alerts/AlertDialog";

import { deleteActivity } from "../../actions/index";
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

function weekDays(days) {
  let letters = [];
  if (days.monday) {
    letters.push(["L"]);
  }
  if (days.tuesday) {
    letters.push(["M"]);
  }
  if (days.wednesday) {
    letters.push(["X"]);
  }
  if (days.thursday) {
    letters.push(["J"]);
  }
  if (days.friday) {
    letters.push(["V"]);
  }
  if (days.saturday) {
    letters.push(["S"]);
  }
  if (days.sunday) {
    letters.push(["D"]);
  }

  let string = letters.join(", ");

  if (string == "") {
    string = "No especificado";
  }

  return string;
}

class ActivityTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      open: false,
      idToDelete: null
    };

    const { classes, activities } = props;

    activities.forEach((item, i) => {
      this.state.tableData.push([
        i,
        item.name,
        item.voluntaryName ? item.voluntaryName : "No especificado",
        weekDays({
          monday: item.monday,
          tuesday: item.tuesday,
          wednesday: item.wednesday,
          thursday: item.thursday,
          friday: item.friday,
          saturday: item.saturday,
          sunday: item.sunday
        }),
        item.place ? item.place : "No especificado",
        item.startTime
          ? moment(item.startTime).format("hh:mm A")
          : "No especificado",
        item.endTime
          ? moment(item.endTime).format("hh:mm A")
          : "No especificado",
        <Link href={`/editar-actividad/${item._id}`}>
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
      this.deleteActivity(id);
    }
  };

  deleteActivity(activityId) {
    deleteActivity(activityId)
      .then(() => {
        Router.push("/registrar-actividades");
      })
      .catch(err => console.error(err));
  }

  render() {
    const { classes } = this.props;
    const { tableData, open } = this.state;
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Actividades</h4>
          <p className={classes.cardCategoryWhite}>Actividades registradas</p>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={[
              "ID",
              "NOMBRE",
              "VOLUNTARIO",
              "DÍA/S",
              "LUGAR",
              "INICIO",
              "FINALIZACIÓN",
              "",
              ""
            ]}
            tableData={tableData}
          />
        </CardBody>
        <AlertDialog
          id="eliminar-actividad"
          title="Eliminar Actividad"
          description="¿Desea eliminar esta actividad? Al hacerlo se eliminará la actividad del registro y de todos los usuarios aderidos a esta actividad"
          open={open}
          handleClose={this.handleClose}
          handleAccept={this.handleAccept}
        />
      </Card>
    );
  }
}

export default withStyles(styles)(ActivityTable);
