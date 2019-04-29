import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
// core components
import GridItem from "../../src/components/Grid/GridItem.jsx";
import GridContainer from "../../src/components/Grid/GridContainer.jsx";
import Table from "../../src/components/Table/Table.jsx";
import Card from "../../src/components/Card/Card.jsx";
import CardHeader from "../../src/components/Card/CardHeader.jsx";
import CardBody from "../../src/components/Card/CardBody.jsx";
import Link from "next/link";
import Search from "@material-ui/icons/Search";
import CustomInput from "../../src/components/CustomInput/CustomInput.jsx";
import ProfileModal from "../modals/ProfileModal";
import { createFilter } from "react-search-input";

const styles = theme => ({
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  search: {
    "& > div": {
      marginTop: "0"
    },
    [theme.breakpoints.down("sm")]: {
      float: "none !important",
      paddingTop: "1px",
      paddingBottom: "1px",
      padding: "0!important",
      width: "60%",
      marginTop: "40px",
      "& input": {
        color: "#FFF"
      }
    },
    "& input": {
      color: "#FFF"
    }
  },
  headerWrap: {},
  searchWrapper: {
    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available",
      margin: "10px 0px 0",
      float: "left"
    },
    display: "inline-block",
    float: "right"
  },
  margin: {
    zIndex: "4",
    margin: "0"
  },
  searchIcon: {
    position: "relative",
    top: "6px"
  },
  tableButton: {
    color: theme.palette.secondary.main
  }
});

const KEYS_TO_FILTERS = [
  "type",
  "firstName",
  "surName1",
  "surName2",
  "email",
  "numberPhone",
  "fee.subFee"
];

class ProfileTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      open: false,
      profileData: {},
      tableData: [],
      page: 0,
      rowsPerPage: 25
    };

  }

  searchUpdated(term) {
    this.setState({ searchTerm: term.target.value });
  }

  handleOpen = item => {
    this.setState({ open: true, profileData: item });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, profiles } = this.props;
    const { open, profileData, searchTerm, page, rowsPerPage } = this.state;

    let tableData = [];

    const filteredData = profiles.filter(
      createFilter(searchTerm, KEYS_TO_FILTERS)
    );

    filteredData.forEach((item, i) => {
      tableData.push([
        item.type,
        item.firstName,
        (item.surName1 + " " + item.surName2) || "No especificado",
        item.email || "No especificado",
        item.numberPhone || "No especificado",
        item.fee && item.fee.subFee || "Sin cuota",
        <Button
          size="small"
          onClick={() => this.handleOpen(item)}
          className={classes.tableButton}
        >
          Ver
        </Button>,
        <Link href={`/editar-perfil/${item._id}`}>
          <Button size="small" className={classes.tableButton}>
            Editar
          </Button>
        </Link>
      ]);
    });

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <h4 className={classes.cardTitleWhite}>Tabla de datos</h4>
                  <p className={classes.cardCategoryWhite}>
                    Datos de los participantes, voluntarios y socios
                  </p>
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                  <div className={classes.searchWrapper}>
                    <CustomInput
                      formControlProps={{
                        className: classes.margin + " " + classes.search
                      }}
                      inputProps={{
                        placeholder: "Buscar",
                        inputProps: {
                          "aria-label": "Buscar"
                        }
                      }}
                      onChange={e => this.searchUpdated(e)}
                    />
                    <Search className={classes.searchIcon} />
                  </div>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  "Tipo",
                  "Nombre",
                  "Apellidos",
                  "Email",
                  "Telefono",
                  "Cuota",
                  "",
                  ""
                ]}
                tableData={tableData}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
              <ProfileModal
                handleOpen={open}
                handleClose={this.handleClose}
                profileData={profileData}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(ProfileTable);
