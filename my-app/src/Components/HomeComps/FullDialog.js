import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';

import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  fab: {
    float: "right",
    marginLeft: theme.spacing(1)
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function ResponsiveDialog({fetch}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const id = localStorage.getItem("currentID");
  const [state, setState] = useState({
    data: {
      userId: id,
      first_name: "",
      last_name: "",
      home_phone: "",
      mobile_phone: "",
      work_phone: "",
      email: "",
      city: "",
      state_or_province: "",
      postal_code: "",
      country: ""
    }
  });

  const handleChange = e => {
    setState({
      data: {
        ...state.data,
        [e.target.name]: e.target.value
      }
    });
    console.log(state.data);
  };

  const addContact = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:3003/api/contacts`,
      data: state.data
    })
      .then(data => {
        setOpen(false);
        fetch()
        setState({
          data: {
            userId: id,
            first_name: "",
            last_name: "",
            home_phone: "",
            mobile_phone: "",
            work_phone: "",
            email: "",
            city: "",
            state_or_province: "",
            postal_code: "",
            country: ""
          }
        })
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add New Contact"}
        </DialogTitle>
        <form onSubmit={addContact}>
          <DialogContent>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="First Name"
                    name="first_name"
                    autoFocus
                    defaultValue={state.data.first_name}
                    onChange={e => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    defaultValue={state.data.last_name}
                    onChange={e => handleChange(e)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Mobile Phone"
                    name="mobile_phone"
                    defaultValue={state.data.mobile_phone}
                    onChange={e => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Home Phone"
                    name="home_phone"
                    defaultValue={state.data.home_phone}
                    onChange={e => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Work Phone"
                    name="work_phone"
                    defaultValue={state.data.work_phone}
                    onChange={e => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="E-mail"
                    name="email"
                    type="email"
                    defaultValue={state.data.email}
                    onChange={e => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Country"
                    name="country"
                    defaultValue={state.data.country}
                    onChange={e => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="State or province"
                    name="state_or_province"
                    defaultValue={state.data.state_or_province}
                    onChange={e => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="City"
                    name="city"
                    defaultValue={state.data.city}
                    onChange={e => handleChange(e)}
                  />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Postal Code"
                    name="postal_code"
                    defaultValue={state.data.postal_code}
                    onChange={e => handleChange(e)}
                  />
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="primary" type="submit">
              Save
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Tooltip title="Add contact" aria-label="add">
        <Fab
          color="secondary"
          className={classes.fab}
          onClick={handleClickOpen}
        >
          <PersonAddIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Add group" aria-label="add">
        <Fab color="primary" className={classes.fab} onClick={handleClickOpen}>
          <GroupAddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}
