import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440,
    minHeight: 440
  }
}));

export default function ContactsTable({ data }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = [
    { id: "Name", label: "Name", minWidth: 50 },
    { id: "buttons", label: "Buttons", minWidth: 50 }
  ];

 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = () => {
    console.log("object");
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell key={row.id}>
                      <Chip
                        variant="outlined"
                        onClick={handleView}
                        color="primary"
                        label={`${row.first_name} ${row.last_name}`}
                        avatar={
                          <Avatar>{`${row.first_name.substring(
                            0,
                            1
                          )}${row.last_name.substring(0, 1)}`}</Avatar>
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Fab
                        color="primary"
                        aria-label="edit"
                        size="small"
                        className={classes.fab}
                      >
                        <EditIcon />
                      </Fab>
                      <Fab
                        color="secondary"
                        aria-label="edit"
                        size="small"
                        className={classes.fab}
                      >
                        <DeleteOutlineIcon />
                      </Fab>
                    </TableCell>
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
  );
}
