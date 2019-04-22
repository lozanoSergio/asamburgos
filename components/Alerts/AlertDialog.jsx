import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AlertDialog = ({ id, title, description, open, handleClose, handleAccept }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby={title}
    aria-describedby={description}
  >
    <DialogTitle id={id}>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id={`${id}-description`}>
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancelar
      </Button>
      <Button onClick={handleAccept} color="primary">
        Aceptar
      </Button>
    </DialogActions>
  </Dialog>
);

export default AlertDialog;
