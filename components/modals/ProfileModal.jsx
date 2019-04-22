import React from "react";
import PropTypes from 'prop-types';
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import ProfileCard from "../cards/ProfileCard";

const styles = theme => ({
  paper: {
    position: "absolute",
    //width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

function getModalStyle() {
    const top = 50;
    const left = 55;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

function ProfileModal(props) {
  const { classes, handleOpen, handleClose, profileData } = props;

  return (
    <Modal
      aria-labelledby="Perfil detallado el usuario"
      open={handleOpen}
      onClose={handleClose}
    >
      <div style={getModalStyle()} className={classes.paper}>
        <ProfileCard handleClose={handleClose} profileData={profileData} />
      </div>
    </Modal>
  );
}

ProfileModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles) (ProfileModal);
