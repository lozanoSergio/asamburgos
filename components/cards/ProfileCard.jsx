import React from "react";
import Link from "next/link";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Cake from "@material-ui/icons/Cake";
import Phone from "@material-ui/icons/Phone";
import Person from "@material-ui/icons/Person";
import LocationCity from "@material-ui/icons/LocationCity";
import AccessibleForward from "@material-ui/icons/AccessibleForward";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
// core components
import GridItem from "../../src/components/Grid/GridItem.jsx";
import GridContainer from "../../src/components/Grid/GridContainer.jsx";

import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";

import moment from "moment";

const styles = {
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
  cardTitle: {
    fontSize: "32px"
  },
  subTitle: {
    fontWeight: 400,
    lineHeight: 0.5
  },
  center: {
    // [theme.breakpoints.down("sm")]: {
    //   width: theme.spacing.unit * 25
    // },
    // //width: theme.spacing.unit * 50,
    textAlign: "center"
  },
  icon: {
    display: "inline-flex",
    verticalAlign: "middle",
    marginRight: "4px"
  },
  iconUp: {
    display: "inline-flex",
    verticalAlign: "middle",
    marginRight: "4px",
    marginTop: "-6px"
  },
  strong: {
    marginBottom: "15px !important"
  },
  closeBtn: {
    textAlign: "center",
    marginTop: "15px"
  },
  dialog: {
    display: "inline",
    float: "right",
    marginTop: "12px"
  }
};

function ProfileCard(props) {
  const { classes, handleClose, profileData } = props;

  const smallHeight = useMediaQuery("(max-height:980px)");
  const smallWidth = useMediaQuery("(max-width:980px)");

  if (smallHeight || smallWidth) {
    return (
      <div>
        <p>
          Tu dispositivo es demasiado pequeño como para reproducir este
          contenido correctamente, por favor utiliza el modo editar para
          visualizar los datos.
        </p>

        <div className={classes.dialog}>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
          <Link href={`/editar-perfil/${profileData._id}`}>
            <Button color="primary">Editar</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className={classes.center}>
        {/* <CardAvatar profile>
          <a href="#pablo" onClick={e => e.preventDefault()}>
            <img src={avatar} alt="..." />
          </a>
        </CardAvatar> */}
        <h2 className={classes.cardTitle}>
          {profileData.firstName +
            " " +
            profileData.surName1 +
            " " +
            profileData.surName2}
        </h2>
        <p className={classes.description}>{profileData.email}</p>
      </div>
      <Divider />

      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <p className={classes.description}>
            <Person className={classes.icon} />
            {profileData.type}
          </p>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <p className={classes.description}>
            <Cake className={classes.iconUp} />
            {profileData.birthDate
              ? moment(profileData.birthDate).format("DD/MM/YYYY")
              : "No especificado"}
          </p>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <p className={classes.description}>
            <LocationCity className={classes.icon} />
            {profileData.address +
              " " +
              profileData.zipCode +
              " " +
              profileData.city}
          </p>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <p className={classes.description}>
            <Phone className={classes.icon} />
            {profileData.numberPhone}
          </p>
        </GridItem>
      </GridContainer>
      {profileData.type === "Participante" && (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <p className={classes.description}>
                <AccessibleForward className={classes.icon} />
                {profileData.disabilityType + " " + profileData.disabilityLevel}
              </p>
            </GridItem>
          </GridContainer>
          <Divider className={classes.strong} />
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <p className={classes.subTitle}>Persona de contacto:</p>
            </GridItem>

            <GridItem xs={12} sm={6} md={6}>
              <p className={classes.description}>
                <Person className={classes.icon} />
                {profileData.parentName
                  ? profileData.parentName +
                    " " +
                    profileData.parentSurname1 +
                    " " +
                    profileData.parentSurname2
                  : "No especificado"}
              </p>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <p className={classes.description}>
                <Phone className={classes.icon} />
                {profileData.contactPhone
                  ? profileData.contactPhone
                  : "No especificado"}
              </p>
            </GridItem>
          </GridContainer>
          <Divider className={classes.strong} />
          {profileData.fee && (
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <p className={classes.subTitle}>Cuotas:</p>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <p className={classes.description}>
                  <AccountBalance className={classes.icon} />
                  {profileData.fee.account
                    ? profileData.fee.account
                    : "No especificado"}
                </p>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <p className={classes.description}>
                  <span className={classes.subTitle}>Participante: </span>
                  {profileData.fee.subFee
                    ? profileData.fee.subFee
                    : "Sin cuota"}
                </p>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <p className={classes.description}>
                  <span className={classes.subTitle}>Actividades: </span>
                  {profileData.fee.activityFee
                    ? profileData.fee.activityFee
                    : "Sin cuota"}
                </p>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <p className={classes.description}>
                  <span className={classes.subTitle}>Servicios: </span>
                  {profileData.fee.serviceFee
                    ? profileData.fee.serviceFee
                    : "Sin cuota"}
                </p>
              </GridItem>
            </GridContainer>
          )}
        </div>
      )}

      <Divider className={classes.strong} />
      <GridContainer>
        <GridItem>
          <p className={classes.description}>Actividades</p>
          {profileData.activities &&
            profileData.activities.map((activity, index) => {
              return (
                <Link
                  href={`/editar-actividad/${activity.id}`}
                  key={activity.id}
                >
                  <Chip
                    key={activity.id}
                    label={activity.name}
                    className={classes.chip}
                    clickable
                  />
                </Link>
              );
            })}
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem>
          <p className={classes.description}>Servicios</p>
          {profileData.services &&
            profileData.services.map((service, index) => {
              return (
                <Link href={`/editar-servicio/${service.id}`} key={service.id}>
                  <Chip
                    label={service.name}
                    className={classes.chip}
                    clickable
                  />
                </Link>
              );
            })}
        </GridItem>
      </GridContainer>

      <div className={classes.closeBtn}>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="Cerrar"
          onClick={handleClose}
        >
          Cerrar
        </Fab>
      </div>
    </div>
  );
}

export default withStyles(styles)(ProfileCard);
