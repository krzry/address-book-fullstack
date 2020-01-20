import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import green from "@material-ui/core/colors/green";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import indigo from "@material-ui/core/colors/indigo";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

//ICONS
import InputAdornment from "@material-ui/core/InputAdornment";
import GroupIcon from "@material-ui/icons/Group";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

const useStyles = makeStyles(theme => ({
  title: {
    backgroundColor: indigo[500],
    color: "white"
  },
  floating: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: green[500]
  },
  normal: {
    backgroundColor: green[500]
  },
  root: {
    flexGrow: 1
  }
}));

export default function AddContactDialog({ fetchGroups, matches }) {
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
      group_name: ""
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

  const addGroup = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:3003/api/groups`,
      data: state.data
    })
      .then(data => {
        setOpen(false);
        fetchGroups();
        setState({
          data: {
            userId: id,
            group_name: ""
          }
        });
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
        <DialogTitle id="responsive-dialog-title" className={classes.title}>
          {"Add New Group"}
        </DialogTitle>
        <form onSubmit={addGroup}>
          <DialogContent>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Group Name"
                    name="group_name"
                    autoFocus
                    defaultValue={state.data.group_name}
                    onChange={e => handleChange(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GroupIcon />
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
      <Tooltip title="Add new group" aria-label="add">
        <Fab
          color="primary"
          className={matches ? classes.normal : classes.floating}
          onClick={handleClickOpen}
        >
          <GroupAddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}
