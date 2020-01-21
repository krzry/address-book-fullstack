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
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  width: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
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

export default function DeleteDialog({ data }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [filteredData, setFilteredData] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);

    axios({
      method: "get",
      url: `http://localhost:3003/api/groupcontacts/user/${data.id}`
    })
      .then(data => {
        setFilteredData(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setSelected("");
    setValid(null);
  };

  const [selected, setSelected] = useState("");
  const handleChange = e => {
    setSelected(e.target.value);
  };

  const [valid, setValid] = useState(null);
  const handleSubmit = e => {
    e.preventDefault();
    if (selected === ``) {
      setValid(true);
    } else {
      axios({
        method: "POST",
        url: `http://localhost:3003/api/groups/${selected}/${data.id}`
      })
        .then(data => {
          handleClose();
        })
        .catch(err => {
          console.log(err);
        });
    }
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
        <form onSubmit={handleSubmit}>
          <DialogTitle className={classes.title} id="responsive-dialog-title">
            {`Add ${data.first_name} ${data.last_name} to: `}
          </DialogTitle>
          <DialogContent>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  {valid ? (
                    <Alert severity="error" className={classes.width}>
                      Please select a group!
                    </Alert>
                  ) : null}
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
                      {filteredData.map(row => (
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
            <Button color="primary" type="submit">
              Save
            </Button>
            <Button onClick={handleClose} autoFocus color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
