import React from "react";
import PropTypes from "prop-types";
//import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

import dashboardStyle from "../../src/assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "../../src/assets/img/sidebar-2.jpg";
import logo from "../../src/assets/img/reactlogo.png";

const dashboardRoutes = [
  {
    path: "/",
    name: "Panel De Control",
    icon: Dashboard
  },
  {
    path: "/nuevo-alta",
    name: "Nuevo Alta",
    icon: Person
  },
  {
    path: "/registrar-servicios",
    name: "Registrar Servicios",
    icon: "content_paste"
  },
  {
    path: "/registrar-actividad",
    name: "Registrar Actividad",
    icon: LibraryBooks
  }
];

class BaseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false
    };
  }

  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    // if (e.history.location.pathname !== e.location.pathname) {
    //   this.refs.mainPanel.scrollTop = 0;
    //   if (this.state.mobileOpen) {
    //     this.setState({ mobileOpen: false });
    //   }
    // }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  render() {
    const { classes, children, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          customRoutes={dashboardRoutes}
          logoText={"Asam Burgos"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BaseLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(BaseLayout);
