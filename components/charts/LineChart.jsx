import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "../../src/components/Grid/GridItem.jsx";
import GridContainer from "../../src/components/Grid/GridContainer.jsx";
import Card from "../../src/components/Card/Card.jsx";
import CardHeader from "../../src/components/Card/CardHeader.jsx";
import CardBody from "../../src/components/Card/CardBody.jsx";
import { defaults, Line } from "react-chartjs-2";

import moment from "moment";

const style = {
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

function LineChart({ classes, dates }) {
  let years = [];
  let yearsCount = {};
  let dataArr = [];

  dates.filter(date => {
    let year = moment(date).format("YYYY");
    if (years.indexOf(year) === -1) {
      years.push(year);
    }
    yearsCount[year] = yearsCount[year] || 0;
    yearsCount[year]++;
  });

  years.sort();

  for (var i in yearsCount) {
    dataArr.push(yearsCount[i]);
  }

  defaults.global.animation = false;

  const data = {
    labels: years,
    datasets: [
      {
        label: "Personas Registradas",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataArr
      }
    ]
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} lg={6}>
        <Card>
          <CardHeader color="primary">
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <h4 className={classes.cardTitleWhite}>Personas registradas</h4>
                <p className={classes.cardCategoryWhite}>
                  Personas registradas 
                </p>
              </GridItem>
            </GridContainer>
          </CardHeader>
          <CardBody>
            <Line data={data} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(style)(LineChart);
