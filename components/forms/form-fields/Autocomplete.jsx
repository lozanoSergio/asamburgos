import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

import {
  primaryColor,
  secondaryColor,
  infoColor,
  grayColor,
  defaultFont
} from "../../../src/assets/jss/material-dashboard-react";

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
          underline: classes.underlineUnderline
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.name}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.name}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

class DownshiftMultiple extends React.Component {
  constructor(props) {
    super(props);
    const { initialValues } = this.props;

    let itemLabels = [];

    initialValues && initialValues.map(value => itemLabels.push(value.name));

    this.state = {
      inputValue: "",
      selectedItem: itemLabels ? itemLabels : [],
      chipTorender: initialValues ? initialValues : []
    };
  }

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1)
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedItem, chipTorender } = this.state;
    const { suggestions } = this.props;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
      suggestions.filter(suggestion => {
        if (suggestion.name === item) {
          chipTorender = [...chipTorender, suggestion]
        }
      });
    }

    this.setState({
      inputValue: "",
      selectedItem,
      chipTorender
    });

    this.props.handleAutocomplete(chipTorender);
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      const chipTorender = [...state.chipTorender];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      chipTorender.splice(chipTorender.indexOf(item), 1)
      this.props.handleAutocomplete(chipTorender);
      return { selectedItem, chipTorender };
    });
  };

  getSuggestions(value) {
    const suggestions = this.props.suggestions;
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : suggestions.filter(suggestion => {
          const keep =
            count < 5 &&
            suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }

  render() {
    const { classes, id, placeholder, disabled, labelText } = this.props;
    const { inputValue, selectedItem, chipTorender } = this.state;

    return (
      <Downshift
        id={id}
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedItem}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: chipTorender.map(item => (
                  <Link href={`/editar-actividad/${item.id}`} key={item.id}>
                    <Chip
                      clickable
                      tabIndex={-1}
                      label={item.name}
                      className={classes.chip}
                      onDelete={this.handleDelete(item)}
                    />
                  </Link>
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                placeholder: placeholder,
                disabled: disabled
              }),
              label: labelText
            })}
            {isOpen && !disabled ? (
              <Paper className={classes.paper} square>
                {this.getSuggestions(inputValue2).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.name }),
                    highlightedIndex,
                    selectedItem: selectedItem2
                  })
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 16
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  }
});

function Autocomplete(props) {
  const {
    classes,
    id,
    suggestions,
    placeholder,
    disabled,
    handleAutocomplete,
    initialValues,
    color,
    labelText
  } = props;

  let updatedColor;

  updatedColor =
    color === "primary"
      ? primaryColor[0]
      : color === "secondary"
      ? secondaryColor[0]
      : color === "info"
      ? infoColor[0]
      : primaryColor[0];

  const theme = createMuiTheme({
    typography: {
      useNextVariants: true
    },
    palette: {
      primary: {
        main: updatedColor
      }
    },
    overrides: {
      MuiInputBase: {
        root: {
          marginTop: "0px !important",
          "&:hover:before,&:before": {
            borderColor: grayColor[4] + " !important",
            borderWidth: "1px !important"
          },
          "&:after": {
            borderColor: updatedColor + " !important"
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
      <div className={classes.root}>
        <DownshiftMultiple
          classes={classes}
          suggestions={suggestions}
          placeholder={placeholder}
          initialValues={initialValues}
          id={id}
          disabled={disabled}
          labelText={labelText}
          handleAutocomplete={handleAutocomplete}
        />
      </div>
    </MuiThemeProvider>
  );
}

Autocomplete.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Autocomplete);
