import React from "react";
import classNames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    float: "right",
    minHeight: "auto",
    marginBottom: "3px",
    marginTop: "0px"
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

function InputSelect({ field, ...props }) {
  const { classes, id, name, labelText, value, color, inputColor, handleChange } = props;
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

  const change = (e, setField) => {
      e.persist();
      setField
      handleChange(e)
  }


  return (
    <MuiThemeProvider theme={theme}>
      <FormControl className={classes.formControl}>
        <Select
          
          id={id}
          className={classes.select}
          onChange={e => change(e,() => setFieldValue(name, value))}
          onBlur={() => setFieldTouched(field.name)}
          value={value}
          name={name}
          inputProps={{
            classes: {
              root: selectColor,
              select: selectColor,
              icon: typoDarkColors
            }
          }}
          {...field}
        >
          {userTypes.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText classes={{ root: typoLightColors }}>
          {labelText}
        </FormHelperText>
      </FormControl>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(InputSelect);
