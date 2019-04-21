import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Card from "../../src/components/Card/Card.jsx";
import CardHeader from "../../src/components/Card/CardHeader.jsx";
import CardBody from "../../src/components/Card/CardBody.jsx";
import CardFooter from "../../src/components/Card/CardFooter.jsx";
import { withStyles } from "@material-ui/core/styles";
import GridItem from "../../src/components/Grid/GridItem";
import GridContainer from "../../src/components/Grid/GridContainer.jsx";
import CustomInput from "../../src/components/CustomInput/CustomInput.jsx";
import Button from "../../src/components/CustomButtons/Button.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import Location from "@material-ui/icons/LocationOn";
import InputTime from "./form-fields/InputTime.jsx";
import InputDate from "./form-fields/InputDate";
import InputWeekCheck from "./form-fields/InputWeekCheck.jsx";
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

function ActivityForm(props) {
  const { classes, initialValues, onSubmit, edit } = props;
  return (
    <Card>
      <Formik
        initialValues={initialValues}
        validate={validateInputs}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {edit ? "Actualizar actividad" : "Registro de actividades"}
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Field
                    labelText="Nombre de la actividad"
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
                <GridItem xs={12} sm={12} md={8}>
                  <p
                    style={{
                      color: "#9e9e9e",
                      marginBottom: "0",
                      paddingTop: "16px"
                    }}
                  >
                    Día de la semana:
                  </p>
                </GridItem>
                <GridItem xs={1} sm={1} md={12}>
                  <Field
                    name="monday"
                    labelText="L"
                    component={InputWeekCheck}
                  />

                  <Field
                    name="tuesday"
                    labelText="M"
                    component={InputWeekCheck}
                  />

                  <Field
                    name="wednesday"
                    labelText="M"
                    component={InputWeekCheck}
                  />

                  <Field
                    name="thursday"
                    labelText="J"
                    component={InputWeekCheck}
                  />

                  <Field
                    name="friday"
                    labelText="V"
                    component={InputWeekCheck}
                  />

                  <Field
                    name="saturday"
                    labelText="S"
                    component={InputWeekCheck}
                  />
                  <Field
                    name="sunday"
                    labelText="D"
                    component={InputWeekCheck}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Field
                    labelText="Lugar de la actividad"
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
                    labelText="Hora de inicio"
                    name="startTime"
                    id="startTime"
                    formControlProps={{
                      fullWidth: true
                    }}
                    component={InputTime}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Field
                    labelText="Hora de finalización"
                    name="endTime"
                    id="endTime"
                    formControlProps={{
                      fullWidth: true
                    }}
                    component={InputTime}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Field
                    labelText="Fecha de inicio"
                    name="startDate"
                    id="startDate"
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
                    id="endDate"
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
                {edit ? "Actualizar Actividad" : "Crear Actividad"}
              </Button>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default withStyles(styles)(ActivityForm);
