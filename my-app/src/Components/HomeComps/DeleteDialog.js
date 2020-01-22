import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import axios from "axios";
import red from "@material-ui/core/colors/red";

const useStyles = makeStyles(theme => ({
  title: {
    backgroundColor: red[500],
    color: "white"
  },
  fab: {
    marginLeft: theme.spacing(1)
  },
  root: {
    flexGrow: 1
  }
}));

export default function DeleteDialog({ fetch, data }) {
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

  const handleDelete = () => {
    axios({
      method: "delete",
      url: `http://localhost:3003/api/contacts/${data.id}`
    })
      .then(data => {
        fetch();
        setOpen(false);
      })

      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Fab
        color="secondary"
        aria-label="edit"
        size="small"
        className={classes.fab}
        onClick={handleClickOpen}
      >
        <DeleteOutlineIcon />
      </Fab>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className={classes.title}>
          {`Are you sure you want to delete ${data.first_name} ${data.last_name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Deleting this contact will also remove them in their respective groups.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
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
