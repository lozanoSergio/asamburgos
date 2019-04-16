import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Table from "../../src/components/Table/Table.jsx";
import Card from "../../src/components/Card/Card.jsx";
import CardHeader from "../../src/components/Card/CardHeader.jsx";
import CardBody from "../../src/components/Card/CardBody.jsx";
import Link from "next/link";
import moment from "moment";

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

function weekDays(days) {
  
  let letters = [];
  if (days.monday) {
    letters.push(["L"])
  }
  if (days.tuesday) {
    letters.push(["M"])
  }
  if (days.wednesday) {
    letters.push(["Mi"])
  }
  if (days.thursday) {
    letters.push(["J"])
  }
  if (days.friday) {
    letters.push(["V"])
  }
  if (days.saturday) {
    letters.push(["S"])
  }
  if (days.sunday) {
    letters.push(["D"])
  }

  let string = letters.join(', ')

  if (string == "") {
    string = "No especificado"
  }
  
  return string;
}

function ActivityTable(props) {
  const { classes, activities } = props;

  let tableData = [];

  activities.forEach((item, i) => {
    tableData.push([
      i,
      item.activityName,
      item.voluntaryName,
      weekDays({"monday": item.monday, "tuesday": item.tuesday, "wednesday": item.wednesday, "thursday": item.thursday, "friday": item.friday, "saturday": item.saturday, "sunday": item.sunday}),
      item.place ? item.place : "No especificado",
      item.startTime
        ? moment(item.startTime).format("hh:mm A")
        : "No especificado",
      item.endTime ? moment(item.endTime).format("hh:mm A") : "No especificado",
      <Link href={"/nuevo-alta"}>
        <a>Modificar</a>
      </Link>,
      <Link href={"/nuevo-alta"}>
        <a>Eliminar</a>
      </Link>
    ]);
  });

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Actividades</h4>
        <p className={classes.cardCategoryWhite}>Actividades registradas</p>
      </CardHeader>
      <CardBody>
        <Table
          tableHeaderColor="primary"
          tableHead={["ID", "NOMBRE", "VOLUNTARIO", "DÍA/S", "LUGAR", "INICIO", "FINALIZACIÓN", "MODIFICAR", "ELIMINAR"]}
          tableData={tableData}
        />
      </CardBody>
    </Card>
  );
}

export default withStyles(styles)(ActivityTable);
