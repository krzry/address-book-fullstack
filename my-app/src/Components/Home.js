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

const useStyles = makeStyles(theme => ({
  headButtons: {
    color: "white"
  },
  miniCont: {
    display: "flex",
    justifyContent: "space-between"
  },
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
          setTempData(
            data.data.map(row => {
              return {
                id: row.id,
                userId: row.userId,
                first_name: row.first_name,
                last_name: row.last_name,
                home_phone: row.home_phone,
                mobile_phone: row.mobile_phone,
                work_phone: row.work_phone,
                email: row.email,
                city: row.city,
                state_or_province: row.state_or_province,
                postal_code: row.postal_code,
                country: row.country,
                selected: false
              };
            })
          );
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
  
  const handleContacts = () =>{
    setToggle(false)
  }

  const handleGroups = () =>{
    setToggle(true)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {renderRedirect()}
      <AppBar position="relative">
        <Toolbar className={classes.header}>
          <div className={classes.drawer}>
            {matches ? null : <Drawer setToggle={setToggle} fetch={fetch} />}

            <Typography variant="h6" color="inherit" noWrap>
              Address Book
            </Typography>
          </div>
          <div className={classes.miniCont}>
            {matches ? (
              <Button className={classes.headButtons} onClick={handleContacts}>
                Contacts
              </Button> 
              
            ) : null}
            
            {matches ? (
              <Button className={classes.headButtons} onClick={handleGroups}>
                Groups
              </Button>
            ) : null}
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
          </div>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          {toggle ? (
            <Groups
              tempGroupData={tempGroupData}
              fetchGroups={fetchGroups}
              matches={matches}
              groupData={groupData}
              tempData={tempData}
              setTempData={setTempData}
            />
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
              groupData={groupData}
            />
          )}
        </div>
      </main>
    </React.Fragment>
  );
}
