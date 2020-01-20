import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";

import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// COMPONENTS
import Drawer from "./HomeComps/Drawer";
import Groups from "./Groups";
import Contacts from "./Contacts";
import jwt from "jwt-decode";

const useStyles = makeStyles(theme => ({
  drawer: {
    display: "flex",
    alignItems: "center"
  },
  navBar: {
    display: "flex",
    justifyContent: "space-between"
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

  // USE MEDIAQUERY
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  //   var decoded = jwt(localStorage.getItem("accessToken"));
  // console.log(decoded);

  const [toggle, setToggle] = useState(false);

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
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
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
    fetch();
    fetchGroups();
  }, [history]);

  const sortFirst = () => {
    fetch();
  };

  const sortLast = () => {
    fetchDesc();
  };

  const fetch = () => {
    const id = localStorage.getItem("currentID");
    axios({
      method: "get",
      url: `http://localhost:3003/api/users/${id}/contacts/asc`
    })
      .then(data => {
        if (data.status === 200) {
          setData(data.data);
          setTempData(data.data);
        } else {
          console.log("error");
        }
      })

      .catch(err => {
        console.log(err);
      });
  };

  const fetchDesc = () => {
    const id = localStorage.getItem("currentID");
    axios({
      method: "get",
      url: `http://localhost:3003/api/users/${id}/contacts/desc`
    })
      .then(data => {
        if (data.status === 200) {
          setData(data.data);
          setTempData(data.data);
        } else {
          console.log("error");
        }
      })

      .catch(err => {
        console.log(err);
      });
  };

  const [groupData, setGroupData] = useState([]);
  const [tempGroupData, setTempGroupData] = useState([]);
  const fetchGroups = () => {
    const id = localStorage.getItem("currentID");
    axios({
      method: "get",
      url: `http://localhost:3003/api/users/${id}/groups/asc`
    })
      .then(data => {
        if (data.status === 200) {
          setGroupData(data.data);
          setTempGroupData(data.data);
        } else {
          console.log("error");
        }
      })

      .catch(err => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {renderRedirect()}
      <AppBar position="relative">
        <Toolbar className={classes.header}>
          <div className={classes.drawer}>
            <Drawer setToggle={setToggle} fetch={fetch} />
            <Typography variant="h6" color="inherit" noWrap>
              Address Book
            </Typography>
          </div>

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
          {toggle ? (
            <Groups tempGroupData={tempGroupData} fetchGroups={fetchGroups} matches={matches} groupData={groupData} />
          ) : (
            <Contacts
              data={data}
              fetch={fetch}
              sortFirst={sortFirst}
              sortLast={sortLast}
              setData={setData}
              tempData={tempData}
              setTempData={setTempData}
              matches={matches}
            />
          )}
        </div>
      </main>
    </React.Fragment>
  );
}
