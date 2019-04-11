import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Card from "../../src/components/Card/Card.jsx";
import CardHeader from "../../src/components/Card/CardHeader.jsx";
import CardBody from "../../src/components/Card/CardBody.jsx";
import CardFooter from "../../src/components/Card/CardFooter.jsx";
import { withStyles } from "@material-ui/core/styles";
import CustomInput from "../../src/components/CustomInput/CustomInput.jsx";
import Button from "../../src/components/CustomButtons/Button.jsx";
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
              {/* <p className={classes.cardCategoryWhite}>
                Completa el formulario para añadir nuevos servicios.
              </p> */}
            </CardHeader>
            <CardBody>
              <Field
                labelText="Nombre del servicio"
                name="name"
                id="name"
                color={teal}
                formControlProps={{
                  fullWidth: true
                }}
                component={CustomInput}
              />
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
