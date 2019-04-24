import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import PowerOff from "@material-ui/icons/PowerSettingsNew"
import Button from "../../src/components/CustomButtons/Button.jsx";

import auth0 from "../../services/auth0";

import headerStyle from "../../src/assets/jss/material-dashboard-react/components/headerStyle.jsx";

const Header = ({ ...props }) => {  
  const { classes, color, router, routes } = props;
  
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  let title = routes.find(route => {
    if (route.path === router.asPath) {
      return route.name
    }
  });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <h2 className={classes.title}>
            {title && title.name || "Asam Burgos"}
          </h2>
        </div>
        <Hidden smDown implementation="css">
        <Button  onClick={auth0.logout} color="transparent"><PowerOff className={classes.icons} />Cerrar Sesión</Button>
        </Hidden>
        <Hidden mdUp implementation="css">
            <IconButton color="inherit" aria-label="open drawer" onClick={props.handleDrawerToggle}>
                <Menu />
            </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withRouter(withStyles(headerStyle)(Header));
