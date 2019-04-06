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

function NewUserForm(props) {
  const {
    classes,
    onSubmitProfile,
    handleChange,
    selectValue,
    color,
    inputColor,
    initialProfileValues,
    initialInstallmentsValues
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
          <Formik
            initialValues={initialProfileValues}
            onSubmit={onSubmitProfile}
            validate={validateInputs}
          >
            {({ isSubmitting }) => (
              <Form>
                <Card>
                  <CardHeader color={color}>
                    <GridContainer>
                      <GridItem xs={8} sm={8} md={8}>
                        <h4 className={classes.cardTitleWhite}>
                          Editar Perfil
                        </h4>
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
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
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
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <Field
                          labelText="Nombre"
                          name="firstName"
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
                          name="surName1"
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
                          name="surName2"
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
                          name="email"
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
                          name="birthDate"
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
                          name="address"
                          id="address"
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
                          name="city"
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
                          name="zipCode"
                          id="zipCode"
                          placeholder={"09000"}
                          maskType="zipCode"
                          color={color}
                          formControlProps={{
                            fullWidth: true
                          }}
                          component={InputNumber}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <Field
                          labelText="Teléfono"
                          name="numberPhone"
                          id="numberPhone"
                          placeholder={"645-593-693"}
                          maskType="numberPhone"
                          color={color}
                          formControlProps={{
                            fullWidth: true
                          }}
                          component={InputNumber}
                        />
                      </GridItem>
                    </GridContainer>
                    {selectValue === "user" && (
                      <div>
                        <GridContainer>
                          <GridItem>
                            <h4
                              style={{
                                color: "#9e9e9e",
                                marginBottom: "0",
                                paddingTop: "16px"
                              }}
                            >
                              Persona de contacto:
                            </h4>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <Field
                              labelText="Nombre"
                              name="parentName"
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
                              name="parentSurname1"
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
                              name="parentSurname2"
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
                              name="contactPhone"
                              id="contactPhone"
                              placeholder={"645-593-693"}
                              maskType="numberPhone"
                              color={color}
                              formControlProps={{
                                fullWidth: true
                              }}
                              component={InputNumber}
                            />
                          </GridItem>
                        </GridContainer>
                      </div>
                    )}
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Notas"
                          name="notes"
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
                  </CardBody>
                  <CardFooter>
                    <Button type="submit" color={color}>
                      Actualizar Perfil
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            )}
          </Formik>
        </GridItem>
        {selectValue === "user" && (
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <Formik
                initialValues={initialInstallmentsValues}
                onSubmit={onSubmitProfile}
                validate={validateInputs}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <CardHeader color={color}>
                      <h4 className={classes.cardTitleWhite}>Cuota</h4>
                      <p className={classes.cardCategoryWhite}>
                        Cuota del participante
                      </p>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <Field
                            labelText="Cuota Adaptada"
                            name="installments"
                            id="installments"
                            placeholder={"€29,99"}
                            maskType="price"
                            color={color}
                            formControlProps={{
                              fullWidth: true
                            }}
                            component={InputNumber}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <Field
                            labelText="Nº de cuenta"
                            name="accountNumber"
                            id="accountNumber"
                            placeholder={"4242 4242 4242 4242"}
                            maskType="creditCard"
                            color={color}
                            formControlProps={{
                              fullWidth: true
                            }}
                            component={InputNumber}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={8}>
                          <Field
                            labelText="Fecha de alta"
                            name="startDate"
                            id="startDate"
                            color={inputColor}
                            formControlProps={{
                              fullWidth: false
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
                            name="endDate"
                            id="endDate"
                            color={inputColor}
                            formControlProps={{
                              fullWidth: false
                            }}
                            component={InputDate}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      <Button type="submit" color={color}>
                        Actualizar Cuota
                      </Button>
                    </CardFooter>
                  </Form>
                )}
              </Formik>
            </Card>
          </GridItem>
        )}
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(NewUserForm);
