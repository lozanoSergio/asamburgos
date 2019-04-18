import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import InputCustom from "../forms/form-fields/InputCustom";
import auth0 from "../../services/auth0";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  error: {
      color: "#ef5350"
  }
});

function LoginForm(props) {
  const { classes, onSubmit, error } = props;

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Asam-Burgos
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <Field
                type="text"
                name="email"
                label="Email Address"
                autoComplete="email"
                required
                component={InputCustom}
              />
              <Field
                type="password"
                name="password"
                label="Password"
                autoComplete="current-password"
                required
                component={InputCustom}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordar email"
              /> */}
              {error && <Typography className={classes.error}>{error}</Typography>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                className={classes.submit}
              >
                Iniciar Sesión
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </main>
  );
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
