import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Card from "../../src/components/Card/Card.jsx";
import CardHeader from "../../src/components/Card/CardHeader.jsx";
import CardBody from "../../src/components/Card/CardBody.jsx";
import CardFooter from "../../src/components/Card/CardFooter.jsx";
import GridItem from "../../src/components/Grid/GridItem";
import GridContainer from "../../src/components/Grid/GridContainer.jsx";
import { withStyles } from "@material-ui/core/styles";
import CustomInput from "../../src/components/CustomInput/CustomInput.jsx";
import Button from "../../src/components/CustomButtons/Button.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import Location from "@material-ui/icons/LocationOn";
import Clock from "@material-ui/icons/CalendarToday";
import InputDate from "./form-fields/InputDate";
import teal from "@material-ui/core/colors/teal";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    opacity: "0.7",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "6px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  button: {
    margingTop: "28px"
  },
  iconStyle: {
    color: "rgba(0, 0, 0, 0.54)"
  }
};

const validateInputs = values => {
  let errors = {};

  Object.entries(values).forEach(([key, value]) => {
    if (!values[key] && key !== "endDate") {
      errors[key] = `Field ${key} is required!`;
    }
  });

  const startDate = moment(values.startDate);
  const endDate = moment(values.endDate);

  if (startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = "End Date cannot be before start date!";
  }

  return errors;
};

function ServiceForm(props) {
  const { classes, initialValues, onSubmit } = props;
  return (
    <Card>
      <Formik
        initialValues={initialValues}
        validate={validateInputs}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Registro de servicios</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Field
                    labelText="Nombre del servicio"
                    name="name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    component={CustomInput}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Field
                    labelText="Persona responsable"
                    name="voluntaryName"
                    id="voluntaryName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    component={CustomInput}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Field
                    labelText="Periodicidad"
                    name="periodicity"
                    id="periodicity"
                    formControlProps={{
                      fullWidth: false
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Clock className={classes.iconStyle} />
                      </InputAdornment>
                    }
                    component={CustomInput}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Field
                    labelText="Lugar del servicio"
                    name="place"
                    id="place"
                    formControlProps={{
                      fullWidth: false
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Location className={classes.iconStyle} />
                      </InputAdornment>
                    }
                    component={CustomInput}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Field
                    labelText="Fecha de inicio"
                    name="startDate"
                    id="endTime"
                    color={teal}
                    formControlProps={{
                      fullWidth: true
                    }}
                    component={InputDate}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Field
                    labelText="Fecha de finalización"
                    name="endDate"
                    id="endTime"
                    color={teal}
                    formControlProps={{
                      fullWidth: true
                    }}
                    component={InputDate}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button type="submit" color={"primary"} disabled={isSubmitting}>
                Crear Servicio
              </Button>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default withStyles(styles)(ServiceForm);
