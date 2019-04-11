import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Accessibility from "@material-ui/icons/AccessibilityNew"
import PowerOff from "@material-ui/icons/PowerSettingsNew"
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Dashboard from "@material-ui/icons/Dashboard";

// core components

import Button from "../CustomButtons/Button.jsx";

import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

class HeaderLinks extends React.Component {
  state = {
    open: false,
    innerWidth: 0
  };

  componentDidMount() {
    let innerWidth = window.innerWidth;
    this.setState({
      innerWidth: innerWidth
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>

        <Button  color="transparent"><PowerOff className={classes.icons} />Cerrar Sesión</Button>
        
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
