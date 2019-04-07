import React from "react";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import Phone from "@material-ui/icons/Phone";
import Card from "@material-ui/icons/CreditCard";
import Euro from "@material-ui/icons/EuroSymbol";

// core components
import customInputStyle from "../../../src/assets/jss/material-dashboard-react/components/customInputStyle.jsx";

const iconStyle = { color: "rgba(0, 0, 0, 0.54)", marginRight: "12px" };

function CreditCard(props) {
  const { id, mask, inputRef, onChange, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      onChange={onChange}
      mask={[
        /[A-Z]/i,
        /[A-Z]/i,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
    />
  );
}

function Price(props) {
  const { id, inputRef, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      prefix="€"
    />
  );
}

function ZipCode(props) {
  const { id, mask, inputRef, onChange, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      onChange={onChange}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
    />
  );
}

function NumberPhone(props) {
  const { id, mask, inputRef, onChange, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      onChange={onChange}
      mask={[/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
    />
  );
}

function InputNumber({ field, form, ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    error,
    success,
    color,
    placeholder,
    maskType
  } = props;
  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underlineSecondary]: color && color === "secondary",
    [classes.underlineInfo]: color && color === "info",
    [classes.underlinePrimary]: true
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      {maskType === "creditCard" ? (
        <Input
          classes={{
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses,
            input: classes.textUpperCase
          }}
          id={id}
          name={field.name}
          color={color}
          placeholder={placeholder}
          inputComponent={CreditCard}
          endAdornment={
            <InputAdornment position="end">
              <Card style={iconStyle} />
            </InputAdornment>
          }
          {...field}
        />
      ) : maskType === "price" ? (
        <Input
          classes={{
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses
          }}
          id={id}
          name={field.name}
          color={color}
          placeholder={placeholder}
          inputComponent={Price}
          endAdornment={
            <InputAdornment position="end">
              <Euro style={iconStyle} />
            </InputAdornment>
          }
          {...field}
        />
      ) : maskType === "zipCode" ? (
        <Input
          classes={{
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses
          }}
          id={id}
          name={field.name}
          color={color}
          placeholder={placeholder}
          inputComponent={ZipCode}
          {...field}
        />
      ) : maskType === "numberPhone" ? (
        <Input
          classes={{
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses
          }}
          id={id}
          name={field.name}
          color={color}
          placeholder={placeholder}
          inputComponent={NumberPhone}
          endAdornment={
            <InputAdornment position="end">
              <Phone style={iconStyle} />
            </InputAdornment>
          }
          {...field}
        />
      ) : null}
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

export default withStyles(customInputStyle)(InputNumber);
