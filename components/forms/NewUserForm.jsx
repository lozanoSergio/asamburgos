import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// @material-ui/core components
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import green from "@material-ui/core/colors/green";
// core components
import GridItem from "../../src/components/Grid/GridItem";
import GridContainer from "../../src/components/Grid/GridContainer.jsx";
import CustomInput from "../../src/components/CustomInput/CustomInput.jsx";
import Button from "../../src/components/CustomButtons/Button.jsx";
import Card from "../../src/components/Card/Card.jsx";
import CardHeader from "../../src/components/Card/CardHeader.jsx";
import CardBody from "../../src/components/Card/CardBody.jsx";
import CardFooter from "../../src/components/Card/CardFooter.jsx";

const styles = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  select: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    float: "right"
  },
  whiteSelect: {
    color: "#FFFFFF",
    borderBottom: "1px solid rgba(255,255,255,.8)",
    "&:before": {
      borderBottom: "1px solid white"
    },
    "&:hover": {
      borderBottom: "1px solid white",
      transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
    },
    "&:after": {
      borderBottom: "2px solid white"
    },
    "&:focus": {
      borderBottom: "1px solid white"
    }
  },
  icon: {
    color: "#FFFFFF"
  },
  helpText: {
    color: "rgba(255,255,255,.62)",
    display: "inline-block",
    float: "right",
    margin: "0",
    fontSize: "14px",
    textAlign: "right"
  }
});

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: green
  }
});

const userTypes = [
  {
    value: "user",
    label: "Participante"
  },
  {
    value: "voluntary",
    label: "Voluntario"
  },
  {
    value: "partner",
    label: "Socio"
  }
];

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

const INITIAL_VALUES = {};

function NewUserForm(props) {
  const { classes, onSubmit, handleChange, selectValue, color } = props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color={color}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                  <p className={classes.cardCategoryWhite}>
                    Complete your profile
                  </p>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <MuiThemeProvider theme={theme}>
                    <Select
                      id="userType"
                      className={classes.select}
                      value={selectValue}
                      onChange={handleChange("type")}
                      inputProps={{
                        classes: {
                          root: classes.whiteSelect,
                          select: classes.whiteSelect,
                          icon: classes.icon
                        }
                      }}
                    >
                      {userTypes.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <p className={classes.helpText}>
                      Seleciona el tipo de usuario
                    </p>
                  </MuiThemeProvider>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody>
              <Formik
                initialValues={INITIAL_VALUES}
                onSubmit={onSubmit}
                validate={validateInputs}
              >
                <Form>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        labelText="Nombre"
                        id="firstName"
                        theme={green}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={CustomInput}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        labelText="Apellido 1"
                        id="surName1"
                        theme={green}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={CustomInput}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        labelText="Apellido 2"
                        id="surName2"
                        theme={green}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={CustomInput}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer />

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Field
                        labelText="Email"
                        id="email"
                        theme={green}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={CustomInput}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        labelText="Dirección"
                        id="street"
                        theme={green}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={CustomInput}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        labelText="Población"
                        id="city"
                        theme={green}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={CustomInput}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        labelText="Código Postal"
                        id="postalCode"
                        theme={green}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={CustomInput}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        labelText="Teléfono"
                        id="numberPhone"
                        theme={green}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={CustomInput}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                        id="about-me"
                        theme={green}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </Form>
              </Formik>
            </CardBody>
            <CardFooter>
              <Button color={color}>Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(NewUserForm);
