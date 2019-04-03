import React from "react";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import classNames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import customInputStyle from "../../../src/assets/jss/material-dashboard-react/components/customInputStyle.jsx";

function InputForm({ ...props }) {
  const {
    classes,
    formControlProps,
    theme,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success
  } = props;
  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });
  return (
    <MuiThemeProvider theme={theme}>
      <FormControl
        {...formControlProps}
        className={formControlProps.className + " " + classes.formControl}
      >
        <TextField className={classes.margin} label={label} id={id} />
      </FormControl>
    </MuiThemeProvider>
  );
}

export default withStyles(customInputStyle)(InputForm);
