import React from "react";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import moment from "moment";
import "moment/locale/es";
import MomentUtils from "@date-io/moment";

import {
  primaryColor,
  grayColor,
  defaultFont
} from "../../../src/assets/jss/material-dashboard-react";

import customInputStyle from "../../../src/assets/jss/material-dashboard-react/components/customInputStyle.jsx";

moment.locale("es");

const InputDate = ({
  classes,
  formControlProps,
  labelText,
  color,
  openTo,
  views,
  field,
  form,
  ...other
}) => {
  const currentError = form.errors[field.name];
  const theme = createMuiTheme({
    typography: {
      useNextVariants: true
    },
    palette: {
      primary: {
        main: color[400]
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
            borderColor: primaryColor[0]
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
          <DatePicker
            keyboard
            margin="normal"
            disableFuture
            openTo={openTo}
            format="DD/MM/YYYY"
            name={field.name}
            value={field.value}
            views={views}
            label={labelText}
            helperText={currentError}
            error={Boolean(currentError)}
            onError={(_, error) => form.setFieldError(field.name, error)}
            onChange={date => form.setFieldValue(field.name, date, true)}
            mask={value =>
              // handle clearing outside if value can be changed outside of the component
              value
                ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                : []
            }
            disableOpenOnEnter
            animateYearScrolling={false}
            {...other}
          />
        </FormControl>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

InputDate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(customInputStyle)(InputDate);
