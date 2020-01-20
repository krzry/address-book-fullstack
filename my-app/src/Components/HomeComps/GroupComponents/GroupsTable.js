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
import ImportExportIcon from "@material-ui/icons/ImportExport";
import Button from "@material-ui/core/Button";

// COMPONENTS
import EditGroupDialog from './EditGroupDialog'

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

export default function GroupsTable({ fetchGroups, tempGroupData, matches }) {
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

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell id="first_name" style={{ minWidth: 50 }}>
                Group Name
              </TableCell>
              {!matches ? null : (
                <TableCell id="buttons" style={{ minWidth: 50 }}>
                  Buttons
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tempGroupData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell key={row.id}>
                      <div className={classes.view}>
                        {/* VIEW DIALOG */}
                        {row.group_name}
                        {/* END DIALOG */}
                      </div>
                    </TableCell>
                    {!matches ? null : (
                      <TableCell>
                        <div className={classes.buttons}>
                          {/* EDIT DIALOG */}
                          <EditGroupDialog data={row} fetchGroups={fetchGroups} />
                          {/* END EDIT DIALOG */}

                          {/* DELETE DIALOG */}

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
        count={tempGroupData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
