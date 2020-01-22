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
import GroupIcon from "@material-ui/icons/Group";
import orange from "@material-ui/core/colors/orange";

const useStyles = makeStyles(theme => ({
  button:{
    color:'white',
    backgroundColor: orange[500],
    marginRight: theme.spacing(1)
  },
  root: {
    flexGrow: 1
  }
}));

export default function EditDialog({ fetchGroups, data }) {
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
      group_name: data.group_name
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
      url: `http://localhost:3003/api/groups/${data.id}`,
      data: state.data
    })
      .then(data => {
        setOpen(false);
        fetchGroups();
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
        <DialogTitle id="responsive-dialog-title" className={classes.button} >{"Edit Group name"}</DialogTitle>
        <form onSubmit={editContact}>
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
                    defaultValue={data.group_name}
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
      <Fab
        color="secondary"
        aria-label="edit"
        size="small"
        className={classes.button}
        onClick={handleClickOpen}
      >
        <EditIcon />
      </Fab>
    </div>
  );
}
