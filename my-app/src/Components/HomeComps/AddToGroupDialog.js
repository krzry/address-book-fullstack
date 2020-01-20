import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import indigo from "@material-ui/core/colors/indigo";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 300
  },
  title: {
    backgroundColor: indigo[500],
    color: "white"
  },
  root: {
    flexGrow: 1
  }
}));

export default function DeleteDialog({ groupData, data }) {
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

  const handleDelete = (e) => {
    e.preventDefault()
    console.log("object");
  };

  const [selected, setSelected] = useState("");
  const handleChange = e => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="edit"
        size="small"
        className={classes.fab}
        onClick={handleClickOpen}
      >
        <GroupAddIcon />
      </Fab>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form onSubmit={handleDelete}>
          <DialogTitle className={classes.title} id="responsive-dialog-title">
            {`Add ${data.first_name} ${data.last_name} to: `}
          </DialogTitle>
          <DialogContent>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    required
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Select a group
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={selected}
                      onChange={handleChange}
                      
                    >
                      {groupData.map(row => (
                        <MenuItem key={row.id} value={row.id}>
                          {row.group_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button  color="primary" autoFocus type="submit">
              Agree
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
