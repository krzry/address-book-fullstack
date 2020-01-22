import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import axios from "axios";

import GroupContactsTable from "./GroupContactsTable";

const useStyles = makeStyles(theme => ({
  title: {
    backgroundColor: teal[500],
    color: "white"
  },
  view: {
    backgroundColor: teal[500],
    color: "white",
    marginRight: theme.spacing(1)
  }
}));

export default function ViewGroupContacts({ groupData, matches }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const [data, setData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    fetchGroupContacts()
  };

  const handleClose = () => {
    setOpen(false);
  };


  const fetchGroupContacts = () =>{
    axios({
      method: "get",
      url: `http://localhost:3003/api/groupcontacts/${groupData.id}`
    })
      .then(data => {
        setData(data.data);
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Fab
        color="secondary"
        aria-label="edit"
        size="small"
        onClick={handleClickOpen}
        className={classes.view}
      >
        <VisibilityIcon />
      </Fab>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle id="responsive-dialog-title" className={classes.title}>
          {`${groupData.group_name}`}
        </DialogTitle>
        <DialogContent>
          {/* GROUP CONTACTS TABLE */}
          <GroupContactsTable data={data} matches={matches} fetchGroupContacts={fetchGroupContacts} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
