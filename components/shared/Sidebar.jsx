import React from "react";
import Link from "next/link";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";


import sidebarStyle from "../../src/assets/jss/material-dashboard-react/components/sidebarStyle";



const Sidebar = ({ ...props }) => {

    const { classes, color, logo, image, logoText } = props;

    const BsNavLink = props => {
        const { route, title } = props;
        return (
          <Link href={route}>
            <a className="">{title}</a>
          </Link>
        );
      };

  var brand = (
    <div className={classes.logo}>
      <a href="/" className={classNames(classes.logoLink)}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
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
            <div className={classes.sidebarWrapper}>{/* links */}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
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
          <div className={classes.sidebarWrapper}>{/* links */}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }

export default withStyles(sidebarStyle)(Sidebar);
