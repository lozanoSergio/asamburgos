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
import AdminNavbarLinks from "../../src/components/Navbars/AdminNavbarLinks";
import Button from "../../src/components/CustomButtons/Button.jsx";

import headerStyle from "../../src/assets/jss/material-dashboard-react/components/headerStyle.jsx";

const Header = ({ ...props }) => {
  const makeBrand = router => {
    var name;
    props.routes.map((prop, key) => {
      if (prop.layout + prop.path === router.pathname) {
        name = props.rtlActive ? prop.rtlName : prop.name;
      }
      return null;
    });
    return name;
  };
  const { classes, color, router } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand(router) || "Panel de control"}
          </Button>
        </div>
        <Hidden smDown implementation="css">
        <AdminNavbarLinks />
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
