import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";

import DeleteGroupContactDialog from "./DeleteGroupContactDialog";

const useStyles = makeStyles(theme => ({
  view: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  buttons: {
    display: "flex"
  },
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 600,
    minHeight: 600
  }
}));

export default function GroupContactsTable({
  data,
  matches,
  fetchGroupContacts
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const handleDelete = selData => {
    setOpen(true);
    setSelected(selData);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [selected, setSelected] = useState([]);
  const handleAgree = () => {
    axios({
      method: "delete",
      url: `http://localhost:3003/api/groupcontacts/${selected.id}`
    })
      .then(data => {
        handleClose();
        fetchGroupContacts();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell id="name" style={{ minWidth: 50 }}>
                  Name
                </TableCell>
                <TableCell id="mobile_phone" style={{ minWidth: 50 }}>
                  Mobile Phone
                </TableCell>
                {!matches ? null : (
                  <TableCell id="buttons" style={{ minWidth: 50 }}>
                    Buttons
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell key={row.id}>
                        <div className={classes.view}>
                          {/* VIEW DIALOG */}
                          <Chip
                            icon={<FaceIcon />}
                            label={`${row.first_name} ${row.last_name}`}
                            onDelete={!matches ? () => handleDelete(row) : null}
                            color="primary"
                            variant="outlined"
                          />
                          {/* END DIALOG */}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip label={row.mobile_phone} variant="outlined" />
                      </TableCell>
                      {!matches ? null : (
                        <TableCell>
                          <div className={classes.buttons}>
                            {/* DELETE DIALOG */}
                            <DeleteGroupContactDialog
                              data={row}
                              fetchGroupContacts={fetchGroupContacts}
                            />
                            {/* END DELETE DIALOG */}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {/* DELETE DIALOG */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`Are you sure you want to delete ${selected.first_name} ${selected.last_name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>You can't revert the changes.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
