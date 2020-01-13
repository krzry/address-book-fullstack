import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  header: {
    display: "flex",
    justifyContent: "space-between"
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  }
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();

  const [redirect, setRedirect] = useState(false);
  const logoutFn = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentID");
    setRedirect(true);
  };
  const renderRedirect = () => {
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

  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/");
    } else {
      history.push("/home");

      const id = localStorage.getItem("currentID");
      axios({
        method: "get",
        url: `http://localhost:3003/api/users/${id}/profile`
      })
        .then(data => {
          setProfileData(data.data);
        })

        .catch(err => {
          console.log(err);
        });
    }
  }, [history]);

  return (
    <React.Fragment>
      <CssBaseline />
      {renderRedirect()}
      <AppBar position="relative">
        <Toolbar className={classes.header}>
          <Typography variant="h6" color="inherit" noWrap>
            Address Book
          </Typography>
          <Typography variant="h6" color="inherit" noWrap>
            Hi {profileData.firstname}!
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            onClick={() => logoutFn()}
          >
            Logout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="xl">
            <div className={classes.root}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>xs=12 sm=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>xs=12 sm=6</Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Paper className={classes.paper}>xs=12 sm=6</Paper>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}
