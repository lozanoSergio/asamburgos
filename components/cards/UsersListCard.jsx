import React from "react";
import Link from "next/link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../src/components/Card/Card.jsx";
import CardHeader from "../../src/components/Card/CardHeader.jsx";
import CardBody from "../../src/components/Card/CardBody.jsx";

const styles = {
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
  }
};

function UsersListCard(props) {
  const { classes, users, title, subtitle } = props;

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{title}</h4>
        <p className={classes.cardCategoryWhite}>{subtitle}</p>
      </CardHeader>
      <CardBody>
        <List component="nav">
          {users.map((user, key) => {
            return (
              <Link key={key} href={`${process.env.BASE_URL}/editar-perfil/${user._id}`}>
                <ListItem button>
                  <ListItemText primary={user.firstName} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </CardBody>
    </Card>
  );
}

export default withStyles(styles)(UsersListCard);
