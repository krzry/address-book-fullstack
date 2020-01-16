import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

//ICONS
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@material-ui/icons/Person";
import CallIcon from "@material-ui/icons/Call";
import WorkIcon from "@material-ui/icons/Work";
import HomeIcon from "@material-ui/icons/Home";
import EmailIcon from "@material-ui/icons/Email";
import FlagIcon from "@material-ui/icons/Flag";
import LocationCityIcon from "@material-ui/icons/LocationCity";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function ViewDialog({ data }) {
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

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"View Contact"}</DialogTitle>
        <form>
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
                    InputProps={{
                      readOnly: true,
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
                    InputProps={{
                      readOnly: true,
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
                    defaultValue={data.mobile_phone}
                    InputProps={{
                      readOnly: true,
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
                    defaultValue={data.home_phone}
                    InputProps={{
                      readOnly: true,
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
                    defaultValue={data.work_phone}
                    InputProps={{
                      readOnly: true,
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
                    InputProps={{
                      readOnly: true,
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
                    InputProps={{
                      readOnly: true,
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
                    InputProps={{
                      readOnly: true,
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
                    InputProps={{
                      readOnly: true,
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
                    defaultValue={data.postal_code}
                    InputProps={{
                      readOnly: true,
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
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Chip
        variant="outlined"
        onClick={handleClickOpen}
        color="primary"
        label={data.first_name}
        avatar={<Avatar>{data.first_name.substring(0, 1)}</Avatar>}
      />
    </div>
  );
}
