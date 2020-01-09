import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    justifyItems: "center"
  },
  form: {
    width: "100%"
  },
  marginTaas: {
    marginTop: theme.spacing(3)
  }
}));

export default function Register() {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [state, setState] = useState({
    data: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPassword: ""
    }
  });
  const [validationPass, setvalidationPass] = useState(null);

  const validatePassFn = e => {
    const { password, confirmPassword } = state.data;
    if (confirmPassword.length > 1 || password.length > 1) {
      if (e.target.value !== password && e.target.value !== confirmPassword) {
        setvalidationPass(false);
      } else {
        setvalidationPass(true);
      }
    }
  };

  const handleChange = e => {
    setState({
      data: {
        ...state.data,
        [e.target.name]: e.target.value
      }
    });

    console.log(state);
  };

  const redirectRegister = () => {
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
    }
  };

  const redir = () => {
    setRedirect(true);
  };

  return (
    <React.Fragment>
      <Container maxWidth="xs">
        <CssBaseline />
        {redirectRegister()}
        <div className={classes.paper}>
          <h1>Register</h1>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="First Name"
              name="firstname"
              autoFocus
              defaultValue={state.firstname}
              onChange={e => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Last Name"
              name="lastname"
              defaultValue={state.lastname}
              onChange={e => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="new-password"
              defaultValue={state.username}
              onChange={e => handleChange(e)}
            />
            <TextField
              color={validationPass ? "primary" : "secondary"}
              helperText={validationPass ? null : "Password does not match"}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              defaultValue={state.password}
              onChange={e => {
                validatePassFn(e);
                handleChange(e);
              }}
            />
            <TextField
              color={validationPass ? "primary" : "secondary"}
              helperText={validationPass ? null : "Password does not match"}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              defaultValue={state.confirmPassword}
              onChange={e => {
                validatePassFn(e);
                handleChange(e);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.marginTaas}
              fullWidth
              type="submit"
            >
              Register
            </Button>
            <Grid container className={classes.marginTaas}>
              <Grid item>
                <Link onClick={redir} variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}
