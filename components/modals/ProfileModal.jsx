import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";

import ProfileCard from "../cards/ProfileCard";

const styles = theme => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

function ProfileModal(props) {
  const { handleOpen, handleClose, profileData } = props;

  return (
    <Dialog
      aria-labelledby="Perfil detallado el usuario"
      open={handleOpen}
      onClose={handleClose}
      scroll="paper"
    >
      <DialogContent>
        <ProfileCard handleClose={handleClose} profileData={profileData} />
      </DialogContent>
    </Dialog>
  );
}

ProfileModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileModal);
