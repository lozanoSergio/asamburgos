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
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import InfoIcon from "@material-ui/icons/InfoOutlined";
//@material-ui/core/colors
import teal from "@material-ui/core/colors/teal";
import purple from "@material-ui/core/colors/purple";
import cyan from "@material-ui/core/colors/cyan";
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
import Autocomplete from "./form-fields/Autocomplete";

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
  },
  infoIcon: {
    position: "relative",
    top: "5px",
    width: theme.typography.h6.fontSize,
    height: theme.typography.h6.fontSize
  },
  metadataCard: {
    marginTop: 48,
    marginBottom: 48
  }
});

const userTypes = [
  {
    value: "Participante",
    label: "Participante"
  },
  {
    value: "Voluntario",
    label: "Voluntario"
  },
  {
    value: "Socio",
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

const texts = {
  createProfile: "Crear Perfil",
  editProfile: "Editar Perfil",
  fullfilProfile: "Completar el perfil",
  editTheProfile: "Editar el perfil",
  createProfile: "Crear Perfil",
  updateProfile: "Actualizar Perfil",
  createFee: "Crear Cuota",
  updateFee: "Actualizar Cuota"
};

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: "Participante",
      color: "primary",
      inputColor: teal,
      switchCheck: false
    };

    if (props.initialProfileValues.type === "Voluntario") {
      this.state = {
        userType: props.initialProfileValues.type,
        color: "secondary",
        inputColor: purple,
        switchCheck: false
      };
    }

    if (props.initialProfileValues.type === "Socio") {
      this.state = {
        userType: props.initialProfileValues.type,
        color: "info",
        inputColor: cyan,
        switchCheck: false
      };
    }
  }

  handleSwitchToggle() {
    this.setState({
      switchCheck: !this.state.switchCheck
    });
  }

  handleSelectChange = event => {
    let color;
    let inputColor;
    let eventValue = event.target.value;
    switch (eventValue) {
      case "Participante": {
        color = "primary";
        inputColor = teal;
        break;
      }
      case "Voluntario": {
        color = "secondary";
        inputColor = purple;
        break;
      }
      case "Socio": {
        color = "info";
        inputColor = cyan;
        break;
      }
      default: {
        color = "primary";
        inputColor = teal;
        break;
      }
    }
    this.setState({
      userType: eventValue,
      color: color,
      inputColor: inputColor
    });
  };

  render() {
    const {
      classes,
      onSubmitProfile,
      initialProfileValues,
      handlerSelectType,
      initialFeeValues,
      onSubmitFee,
      onSubmitActivitiesAndServicies,
      initialActivitiesAndServiciesValues,
      newUser,
      activities,
      services,
      userActivities,
      userServices,
      handleActivityAutocomplete,
      handleServiceAutocomplete
    } = this.props;

    const { color, inputColor, userType, switchCheck } = this.state;

    let activitiesNames = [];
    let servicesNames = [];

    activities &&
      activities.map(activity => {
        activitiesNames.push({
          id: activity._id,
          name: activity.name
        });
      });

    services &&
      services.map(service => {
        servicesNames.push({
          id: service._id,
          name: service.name
        });
      });

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
          <GridItem xs={12} sm={12} md={12} lg={8} xl={8}>
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
                            {newUser ? texts.createProfile : texts.editProfile}
                          </h4>
                          <p className={classes.cardCategoryWhite}>
                            {newUser
                              ? texts.fullfilProfile
                              : texts.editTheProfile}
                          </p>
                        </GridItem>
                        <GridItem xs={4} sm={4} md={4}>
                          <MuiThemeProvider theme={theme}>
                            <FormControl className={classes.formControl}>
                              <Select
                                id="userType"
                                className={classes.select}
                                value={userType}
                                onChange={e => this.handleSelectChange(e)}
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
                              <FormHelperText
                                classes={{ root: typoLightColors }}
                              >
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
                            color={color}
                            formControlProps={{
                              fullWidth: false
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
                              fullWidth: false
                            }}
                            component={InputNumber}
                          />
                        </GridItem>
                      </GridContainer>
                      {userType === "Participante" && (
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <Field
                              labelText="Tipo de discapacidad"
                              name="disabilityType"
                              id="disabilityType"
                              color={color}
                              formControlProps={{
                                fullWidth: true
                              }}
                              component={CustomInput}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <Field
                              labelText="Grado de discapacidad"
                              name="disabilityLevel"
                              id="disabilityLevel"
                              color={color}
                              formControlProps={{
                                fullWidth: true
                              }}
                              component={CustomInput}
                            />
                          </GridItem>
                        </GridContainer>
                      )}
                      {userType === "Participante" && (
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
                                  fullWidth: false
                                }}
                                component={InputNumber}
                              />
                            </GridItem>
                          </GridContainer>
                        </div>
                      )}
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Field
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
                            component={CustomInput}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      <Button
                        type="submit"
                        color={color}
                        disabled={isSubmitting}
                        onClick={() => this.props.handlerSelectType(userType)}
                      >
                        {newUser ? texts.createProfile : texts.updateProfile}
                      </Button>
                    </CardFooter>
                  </Card>
                </Form>
              )}
            </Formik>
          </GridItem>

          <GridItem xs={12} sm={12} md={12} lg={4} xl={4}>
            {userType === "Participante" && (
              <div>
                <Card>
                  <Formik
                    initialValues={initialFeeValues}
                    onSubmit={onSubmitFee}
                    validate={validateInputs}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <CardHeader color={color}>
                          <h4 className={classes.cardTitleWhite}>Cuotas</h4>
                          <p className={classes.cardCategoryWhite}>
                            Cuotas del participante
                          </p>
                        </CardHeader>
                        <CardBody>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12} lg={12} xl={6}>
                              <Field
                                labelText="Nº de cuenta"
                                name="account"
                                id="account"
                                placeholder={"ES98 2038 5778 9830 0076 0236"}
                                maskType="creditCard"
                                color={color}
                                disabled={newUser}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                component={InputNumber}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} lg={12} xl={6}>
                              <Field
                                labelText="Cuota Socio"
                                name="subFee"
                                id="subFee"
                                placeholder={"€29,99"}
                                maskType="price"
                                color={color}
                                disabled={newUser}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                component={InputNumber}
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12} lg={12} xl={6}>
                              <Field
                                labelText="Cuota Actividad"
                                name="activityFee"
                                id="activityFee"
                                placeholder={"€29,99"}
                                maskType="price"
                                color={color}
                                disabled={newUser}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                component={InputNumber}
                              />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={12} lg={12} xl={6}>
                              <Field
                                labelText="Cuota Servicios"
                                name="serviceFee"
                                id="serviceFee"
                                placeholder={"€29,99"}
                                maskType="price"
                                color={color}
                                disabled={newUser}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                component={InputNumber}
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12} lg={12} xl={6}>
                              <Field
                                labelText="Fecha de alta"
                                name="startDate"
                                id="startDate"
                                disabled={newUser}
                                color={color}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                component={InputDate}
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12} lg={12} xl={6}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    disabled={newUser}
                                    checked={switchCheck}
                                    onChange={() => this.handleSwitchToggle()}
                                    color="primary"
                                  />
                                }
                                label="Finalizar Cuota"
                              />
                            </GridItem>
                          </GridContainer>
                          {switchCheck && (
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={8}>
                                <Field
                                  labelText="Fecha de baja"
                                  name="endDate"
                                  id="endDate"
                                  disabled={newUser}
                                  color={color}
                                  formControlProps={{
                                    fullWidth: false
                                  }}
                                  component={InputDate}
                                />
                              </GridItem>
                            </GridContainer>
                          )}
                        </CardBody>
                        <CardFooter>
                          <GridContainer>
                            <GridItem>
                              <Button
                                type="submit"
                                color={color}
                                disabled={isSubmitting || newUser}
                                onClick={() =>
                                  this.props.handlerAction(userType)
                                }
                              >
                                {newUser ? texts.createFee : texts.updateFee}
                              </Button>
                            </GridItem>
                            {newUser && (
                              <GridItem>
                                <Typography
                                  style={{ color: "#9e9e9e" }}
                                  variant="caption"
                                >
                                  <InfoIcon className={classes.infoIcon} /> Crea
                                  primero un perfil para añadir una cuota
                                </Typography>
                              </GridItem>
                            )}
                          </GridContainer>
                        </CardFooter>
                      </Form>
                    )}
                  </Formik>
                </Card>{" "}
              </div>
            )}
            <Card className={userType==="Participante" ? classes.metadataCard : null}>
              <Formik
                initialValues={initialActivitiesAndServiciesValues}
                onSubmit={onSubmitActivitiesAndServicies}
                validate={validateInputs}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <CardHeader color={color}>
                      <h4 className={classes.cardTitleWhite}>
                        Actividades y Servicios
                      </h4>
                      <p className={classes.cardCategoryWhite}>
                        Añade actividades y servicios al{" "}
                        {userType.toLowerCase()}
                      </p>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Autocomplete
                            suggestions={activitiesNames}
                            initialValues={userActivities}
                            id="activities-select"
                            placeholder="Selecciona una o varias actividades"
                            disabled={newUser}
                            labelText="Actividades"
                            color={color}
                            handleAutocomplete={handleActivityAutocomplete}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Autocomplete
                            suggestions={servicesNames}
                            initialValues={userServices}
                            id="services-select"
                            placeholder="Selecciona uno o varios servicios"
                            disabled={newUser}
                            labelText="Servicios"
                            color={color}
                            handleAutocomplete={handleServiceAutocomplete}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      <GridContainer>
                        <GridItem>
                          <Button
                            type="submit"
                            color={color}
                            disabled={isSubmitting || newUser}
                          >
                            Actualizar
                          </Button>
                        </GridItem>
                        {newUser && (
                          <GridItem>
                            <Typography
                              style={{ color: "#9e9e9e" }}
                              variant="caption"
                            >
                              <InfoIcon className={classes.infoIcon} /> Crea
                              primero un perfil para añadir actividades y
                              servicios
                            </Typography>
                          </GridItem>
                        )}
                      </GridContainer>
                    </CardFooter>
                  </Form>
                )}
              </Formik>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(UserForm);
