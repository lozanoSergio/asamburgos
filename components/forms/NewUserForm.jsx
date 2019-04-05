import React from "react";
import classNames from "classnames";
import { Formik, Form, Field, ErrorMessage } from "formik";
// @material-ui/core components
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
// core components
import GridItem from "../../src/components/Grid/GridItem";
import GridContainer from "../../src/components/Grid/GridContainer.jsx";
import CustomInput from "../../src/components/CustomInput/CustomInput.jsx";
import Button from "../../src/components/CustomButtons/Button.jsx";
import Card from "../../src/components/Card/Card.jsx";
import CardHeader from "../../src/components/Card/CardHeader.jsx";
import CardBody from "../../src/components/Card/CardBody.jsx";
import CardFooter from "../../src/components/Card/CardFooter.jsx";

import InputDate from "./form-fields/InputDate";
import InputCreditCard from "./form-fields/InputCreditCard";
import InputNumber from "./form-fields/InputNumber";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    float: "right",
    minHeight: "auto",
    marginBottom: "3px",
    marginTop: "0px"
  },
  cardCategoryWhite: {
    opacity: "0.7",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    marginTop: "6px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  select: {
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
  },
  lightWhite: {
    color: "rgba(255,255,255,.62)"
  },
  darkWhite: {
    color: "#FFFFFF"
  },
  lightBlack: {
    color: "rgba(0,0,0,.62)"
  },
  darkBlack: {
    color: "#000"
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
  darkSelect: {
    color: "#000",
    borderBottom: "1px solid rgba(0,0,0,.4)",
    "&:before": {
      borderBottom: "1px solid black"
    },
    "&:hover": {
      borderBottom: "1px solid black",
      transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
    },
    "&:after": {
      borderBottom: "2px solid black"
    },
    "&:focus": {
      borderBottom: "1px solid black"
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
  const {
    classes,
    onSubmit,
    handleChange,
    selectValue,
    color,
    inputColor
  } = props;

  const theme = createMuiTheme({
    typography: {
      useNextVariants: true
    },
    palette: {
      primary: inputColor
    }
  });

  const typoLightColors = classNames({
    [classes.lightBlack]: color && color === "secondary",
    [classes.lightWhite]: true
  });

  const typoDarkColors = classNames({
    [classes.darkBlack]: color && color === "secondary",
    [classes.darkWhite]: true
  });

  const selectColor = classNames({
    [classes.darkSelect]: color && color === "secondary",
    [classes.whiteSelect]: true
  });

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color={color}>
              <GridContainer>
                <GridItem xs={8} sm={8} md={8}>
                  <h4 className={classes.cardTitleWhite}>Editar Perfil</h4>
                  <p className={classes.cardCategoryWhite}>
                    Completar el perfil
                  </p>
                </GridItem>
                <GridItem xs={4} sm={4} md={4}>
                  <MuiThemeProvider theme={theme}>
                    <FormControl className={classes.formControl}>
                      <Select
                        id="userType"
                        className={classes.select}
                        value={selectValue}
                        onChange={handleChange("type")}
                        inputProps={{
                          classes: {
                            root: selectColor,
                            select: selectColor,
                            icon: typoDarkColors
                          }
                        }}
                      >
                        {userTypes.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText classes={{ root: typoLightColors }}>
                        Seleciona el tipo de perfil
                      </FormHelperText>
                    </FormControl>
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
                  <GridContainer></GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        labelText="Nombre"
                        id="firstName"
                        color={color}
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
                        color={color}
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
                        color={color}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={CustomInput}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer />
                  <GridContainer />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        labelText="Email"
                        id="email"
                        color={color}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={CustomInput}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        labelText="Fecha de Nacimiento"
                        id="birthDate"
                        color={inputColor}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={InputDate}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        labelText="Dirección"
                        id="street"
                        color={color}
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
                        color={color}
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
                        color={color}
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
                        color={color}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={CustomInput}
                      />
                    </GridItem>
                  </GridContainer>
                  {selectValue === "user" && 
                  <div>
                  <GridContainer>
                    <GridItem>
                    <h4 style={{color:"#9e9e9e", marginBottom:"0", paddingTop: "16px"}}>Persona de contacto:</h4>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        labelText="Nombre"
                        id="parentName"
                        color={color}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={CustomInput}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        labelText="Apellido 1"
                        id="parentSurname1"
                        color={color}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={CustomInput}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        labelText="Apellido 2"
                        id="parentSurname2"
                        color={color}
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
                        labelText="Telefono de contacto"
                        id="contactPhone"
                        color={color}
                        formControlProps={{
                          fullWidth: true
                        }}
                        component={CustomInput}
                      />
                    </GridItem>
                  </GridContainer>
                      </div> }
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Notas"
                        id="notes"
                        color={color}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 3
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </Form>
              </Formik>
            </CardBody>
            <CardFooter>
              <Button color={color}>Actualizar Perfil</Button>
            </CardFooter>
          </Card>
        </GridItem>
        {selectValue === "user" && (
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color={color}>
                <h4 className={classes.cardTitleWhite}>Cuota</h4>
                <p className={classes.cardCategoryWhite}>
                  Cuota del participante
                </p>
              </CardHeader>
              <CardBody>
                <Formik>
                  <Form>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <Field
                          labelText="Cuota Adaptada"
                          id="installments"
                          color={color}
                          component={InputNumber}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <Field
                          labelText="Nº de cuenta"
                          id="accountNumber"
                          color={color}
                          component={InputCreditCard}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={8}>
                        <Field
                          labelText="Fecha de alta"
                          id="startDate"
                          color={inputColor}
                          formControlProps={{
                            fullWidth: true
                          }}
                          component={InputDate}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={8}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={true}
                              //onChange={this.handleChange("checkedB")}
                              value="checkedB"
                              color="primary"
                            />
                          }
                          label="Finalizar Cuota"
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={8}>
                        <Field
                          labelText="Fecha de baja"
                          id="endDate"
                          color={inputColor}
                          formControlProps={{
                            fullWidth: true
                          }}
                          component={InputDate}
                        />
                      </GridItem>
                    </GridContainer>
                  </Form>
                </Formik>
              </CardBody>
              <CardFooter>
                <Button color={color}>Actualizar Cuota</Button>
              </CardFooter>
            </Card>
          </GridItem>
        )}
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(NewUserForm);
