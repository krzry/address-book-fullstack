import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import teal from "@material-ui/core/colors/teal";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";

//COMPONENT
import EditDialog from "./EditDialog";
import AddToGroupDialog from "./AddToGroupDialog";

const useStyles = makeStyles(theme => ({
  deletetitle: {
    backgroundColor: red[500],
    color: "white"
  },
  flip: {
    display: "flex",
    justifyContent: "space-between"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2, 2, 2),
    backgroundColor: teal[500],
    color: "white"
  },
  root: {
    flexGrow: 1
  }
}));

export default function ViewDialog({ data, fetch, matches, groupData }) {
  const classes = useStyles();
  const [openView, setOpenView] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpenView(true);
  };

  const handleClose = () => {
    setOpenView(false);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = () => {
    axios({
      method: "delete",
      url: `http://localhost:3003/api/contacts/${data.id}`
    })
      .then(data => {
        fetch();
        setOpenDialog(false);
      })

      .catch(err => {
        console.log(err);
      });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [details, setDetails] = useState(data);
  const fetchDetails = () => {
    axios({
      method: "get",
      url: `http://localhost:3003/api/contacts/${data.id}`
    })
      .then(data => {
        let tempData = {
          id: data.data[0].id,
          userId: data.data[0].userId,
          first_name: data.data[0].first_name,
          last_name: data.data[0].last_name,
          home_phone: data.data[0].home_phone,
          mobile_phone: data.data[0].mobile_phone,
          work_phone: data.data[0].work_phone,
          email: data.data[0].email,
          city: data.data[0].city,
          state_or_province: data.data[0].state_or_province,
          postal_code: data.data[0].postal_code,
          country: data.data[0].country
        };
        setDetails(tempData);
      })

      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openView}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className={classes.title}>
          <Typography variant="button" display="block" gutterBottom>
            View Contact
          </Typography>
          <div className={classes.flip}>
            {!matches ? (
              <AddToGroupDialog groupData={groupData} data={data} />
            ) : null}
            {!matches ? (
              <EditDialog
                data={data}
                fetch={fetch}
                setOpenView={setOpenView}
                fetchDetails={fetchDetails}
              />
            ) : null}
          </div>
        </div>
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
                    value={details.first_name}
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
                    value={details.last_name}
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
                    value={details.mobile_phone}
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
                    value={details.home_phone}
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
                    value={details.work_phone}
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
                    value={details.email}
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
                    value={details.country}
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
                    value={details.state_or_province}
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
                    value={details.city}
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
                    value={details.postal_code}
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
        onDelete={!matches ? handleOpenDialog : null}
        color="primary"
        label={`${data.first_name} ${data.last_name}`}
        avatar={<Avatar>{data.first_name.substring(0, 1)}</Avatar>}
      />

      {/* DELETE DIALOG */}
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className={classes.deletetitle}
        >
          {`Are you sure you want to delete ${data.first_name} ${data.last_name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting this contact will also remove them in their respective
            groups.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
