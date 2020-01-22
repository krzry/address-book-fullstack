import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
//ICONS
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@material-ui/icons/Person";
import CallIcon from "@material-ui/icons/Call";
import WorkIcon from "@material-ui/icons/Work";
import HomeIcon from "@material-ui/icons/Home";
import EmailIcon from "@material-ui/icons/Email";
import FlagIcon from "@material-ui/icons/Flag";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import orange from "@material-ui/core/colors/orange";

const useStyles = makeStyles(theme => ({
  fab:{
    marginLeft: theme.spacing(1),
    backgroundColor: orange[500]  
  },
  button:{
    color:'white',
    backgroundColor: orange[500]
  },
  root: {
    flexGrow: 1
  }
}));

export default function EditDialog({ fetch, data, setOpenView, fetchDetails }) {
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
      first_name: data.first_name,
      last_name: data.last_name,
      home_phone: data.home_phone,
      mobile_phone: data.mobile_phone,
      work_phone: data.work_phone,
      email: data.email,
      city: data.city,
      state_or_province: data.state_or_province,
      postal_code: data.postal_code,
      country: data.country
    }
  });

  const handleChange = e => {
    setState({
      data: {
        ...state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  const editContact = e => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:3003/api/contacts/${data.id}`,
      data: state.data
    })
      .then(data => {
        if(fetchDetails){
          fetchDetails();
        }
        setOpen(false);
        fetch();
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
        <DialogTitle id="responsive-dialog-title" className={classes.button} >{"Edit Contact"}</DialogTitle>
        <form onSubmit={editContact}>
          <DialogContent>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="First Name"
                    name="first_name"
                    autoFocus
                    defaultValue={data.first_name}
                    onChange={e => handleChange(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    defaultValue={data.last_name}
                    onChange={e => handleChange(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      )
                    }}
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
                    type="number"
                    defaultValue={data.mobile_phone}
                    onChange={e => handleChange(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CallIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Home Phone"
                    name="home_phone"
                    type="number"
                    defaultValue={data.home_phone}
                    onChange={e => handleChange(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Work Phone"
                    name="work_phone"
                    type="number"
                    defaultValue={data.work_phone}
                    onChange={e => handleChange(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WorkIcon />
                        </InputAdornment>
                      )
                    }}
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
                    defaultValue={data.email}
                    onChange={e => handleChange(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Country"
                    name="country"
                    defaultValue={data.country}
                    onChange={e => handleChange(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlagIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="State or province"
                    name="state_or_province"
                    defaultValue={data.state_or_province}
                    onChange={e => handleChange(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCityIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="City"
                    name="city"
                    defaultValue={data.city}
                    onChange={e => handleChange(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCityIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Postal Code"
                    name="postal_code"
                    type="number"
                    defaultValue={data.postal_code}
                    onChange={e => handleChange(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      )
                    }}
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
      <Fab
        color="primary"
        aria-label="edit"
        size="small"
        className={classes.fab}
        onClick={handleClickOpen}
      >
        <EditIcon />
      </Fab>
    </div>
  );
}
