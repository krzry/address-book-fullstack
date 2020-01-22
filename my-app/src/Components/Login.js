import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  point:{
    cursor: 'pointer'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  width: {
    width: "100%",
    marginTop: theme.spacing(2)
  }
}));

export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [valid, setValid] = useState(null);
  const [state, setState] = useState({
    data: {
      username: "",
      password: ""
    }
  });

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/");
    } else {
      history.push("/home");
    }
  }, [history]);

  const redirRegister = () => {
    history.push("/register");
  };

  const loginFn = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:3003/api/login`,
      data: state.data
    })
      .then(data => {
        if (data.status === 200) {
          localStorage.setItem("accessToken", data.data.token);
          localStorage.setItem("currentID", data.data.id);
          window.location.href = "/home";
          setValid(null);
        } else {
          console.log("error");
        }
      })

      .catch(err => {
        console.log(err);
        setValid(true);
      });
  };

  const handleChange = e => {
    setState({
      data: {
        ...state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {valid ? (
          <Alert severity="error" className={classes.width}>
            Invalid login details!
          </Alert>
        ) : null}
        <form className={classes.form} onSubmit={loginFn} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={e => handleChange(e)}
            defaultValue={state.data.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => handleChange(e)}
            defaultValue={state.data.username}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={redirRegister} variant="body2" className={classes.point}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
