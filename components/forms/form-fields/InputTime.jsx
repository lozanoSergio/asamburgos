import React from "react";
import { MuiPickersUtilsProvider, TimePicker } from "material-ui-pickers";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MomentUtils from "@date-io/moment";
import customInputStyle from "../../../src/assets/jss/material-dashboard-react/components/customInputStyle.jsx";

import {
  primaryColor,
  grayColor,
  defaultFont
} from "../../../src/assets/jss/material-dashboard-react";

function InputTime({
  classes,
  field,
  form,
  labelText,
  formControlProps,
  ...other
}) {
  const currentError = form.errors[field.name];
  const theme = createMuiTheme({
    typography: {
      useNextVariants: true
    },
    palette: {
      primary: {
        main: primaryColor[0]
      }
    },
    overrides: {
      MuiInputBase: {
        root: {
          marginTop: "0px !important",
          "&:hover:not($disabled):before,&:before": {
            borderColor: grayColor[4] + " !important",
            borderWidth: "1px !important"
          },
          "&:after": {
            borderColor: primaryColor[0] + "!important"
          }
        }
      },
      MuiInputLabel: {
        root: {
          marginTop: "-16px !important",
          ...defaultFont,
          color: grayColor[3] + " !important",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "1.42857"
        }
      }
    }
  });
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <FormControl
          {...formControlProps}
          className={formControlProps.className + " " + classes.formControl}
        >
          <TimePicker
            keyboard
            label={labelText}
            mask={[/\d/, /\d/, ":", /\d/, /\d/, " ", /a|p/i, "M"]}
            placeholder="08:00 AM"
            name={field.name}
            value={field.value}
            helperText={currentError}
            error={Boolean(currentError)}
            onError={(_, error) => form.setFieldError(field.name, error)}
            onChange={time => form.setFieldValue(field.name, time, true)}
            disableOpenOnEnter
            {...other}
          />
        </FormControl>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default withStyles(customInputStyle)(InputTime);
