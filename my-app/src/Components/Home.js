import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";



import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import FullDialog from './HomeComps/FullDialog'

const useStyles = makeStyles(theme => ({
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  },
  rootButton: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "right",
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

 

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [redirect, setRedirect] = useState(false);
  const logoutFn = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentID");
    setRedirect(true);
    setAnchorEl(null);
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
  const [initial, setInitial] = useState({ first: "", last: "" });
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
          const firs = data.data.firstname;
          const las = data.data.lastname;
          const first = firs.substring(0, 1);
          const last = las.substring(0, 1);
          setInitial({ first: first, last: last });
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

          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Avatar className={classes.orange}>
              {initial.first}
              {initial.last}
            </Avatar>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled>
              Logged in as {profileData.firstname} {profileData.lastname}
            </MenuItem>
            <MenuItem onClick={() => logoutFn()}>Logout</MenuItem>
          </Menu>
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
      <FullDialog  />
      
    </React.Fragment>
  );
}
