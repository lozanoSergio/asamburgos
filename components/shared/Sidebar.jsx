import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { withRouter } from "next/router";
import routes from "../../routes";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Divider from '@material-ui/core/Divider';
import PowerOff from "@material-ui/icons/PowerSettingsNew";
import Button from "@material-ui/core/Button";

import auth0 from "../../services/auth0";

import sidebarStyle from "../../src/assets/jss/material-dashboard-react/components/sidebarStyle";

const Sidebar = ({ ...props }) => {
  const { classes, color, logo, customRoutes, router } = props;

  var brand = (
    <div className={classes.logo}>
      <a href="/" className={classNames(classes.logoLink)}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
      </a>
    </div>
  );

  const activeRoute = route => {
    route === undefined
      ? false
      : routes.findAndGetUrls(route, props.params).urls.as === router.asPath;
  };

  var links = (
    <List className={classes.list}>
      {customRoutes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop.path)
        });

        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        return (
          <Link href={prop.path} key={key}>
            <a className={activePro + classes.item + "active"}>
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive
                    })}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive
                    })}
                  />
                )}
                <ListItemText
                  primary={props.rtlActive ? prop.rtlName : prop.name}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: props.rtlActive
                  })}
                  disableTypography={true}
                />
              </ListItem>
            </a>
          </Link>
        );
      })}
      <Divider className={classes.divider} variant="middle" />
      <ListItem className={classes.itemLink}>
      <Button onClick={auth0.logout} className={classNames(classes.itemBtnText, classes.whiteFont)}><PowerOff className={classes.itemIcon} />Cerrar Sesión</Button>
      </ListItem>
    </List>
  );

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          <div className={classes.background} />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          <div className={classes.background} />
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(sidebarStyle)(Sidebar));
