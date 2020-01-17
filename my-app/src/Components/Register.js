import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  point: {
    cursor: 'pointer'
  },
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
      password: ""
    }
  });
  const [confirmPassword, setconfirmPassword] = useState("");
  const [validationPass, setvalidationPass] = useState(null);
  const [switchTogle, setSwitchTogle] = useState({
    open: false,
    toggleRedir: false
  });

  // SWITCH

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSwitchTogle({
      ...switchTogle,
      open: false
    });
  };

  const successRegister = () => {
    if (switchTogle.toggleRedir) {
      setTimeout(() => {
        setRedirect(true);
      }, 3000);
    }
  };
  // ENDSWITCH

  const register = e => {
    e.preventDefault();
    if (validationPass) {
      axios({
        method: "post",
        url: `http://localhost:3003/api/users`,
        data: state.data
      })
        .then(data => {
          console.log(data);
          setSwitchTogle({
            open: true,
            toggleRedir: true
          });
        })
        .catch(err => console.log(err));
    }
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

  const validatePassFn = e => {
    const { password } = state.data;
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
  };

  const onChangeCps = e => {
    setconfirmPassword(e.target.value);
  };

  const redir = () => {
    setRedirect(true);
  };

  return (
    <React.Fragment>
    {switchTogle.open ? <LinearProgress /> : null}
      <Container maxWidth="xs">
        <CssBaseline />
        {redirectRegister()}
        {successRegister()}
        
        <div className={classes.paper}>
          <h1>Register</h1>
          <form className={classes.form} onSubmit={register}>
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
              defaultValue={confirmPassword}
              onChange={e => {
                validatePassFn(e);
                onChangeCps(e);
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
                <Link onClick={redir} variant="body2" className={classes.point}>
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>

            <Snackbar
              className="snackSuccess"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              open={switchTogle.open}
              autoHideDuration={6000}
              onClose={handleClose}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={
                <span id="message-id">
                  <CheckCircleIcon /> Creating Account...
                </span>
              }
              action={[
                <IconButton
                  key="close"
                  aria-label="close"
                  color="inherit"
                  // className={classes.close}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}
