import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

// COMPONENTS
import EditGroupDialog from "./EditGroupDialog";
import ViewGroupContacts from "./ViewGroupContacts";
import DeleteGroupDialog from "./DeleteGroupDialog";

const useStyles = makeStyles(theme => ({
  buttons: {
    display: "flex",
    justifyContent: "center"
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
              <TableCell
                id="first_name"
                style={{ minWidth: 50, textAlign: "center" }}
              >
                Group Name
              </TableCell>
              <TableCell
                id="buttons"
                style={{ minWidth: 50, textAlign: "center" }}
              >
                Buttons
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tempGroupData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell key={row.id} align="center">
                      {/* VIEW DIALOG */}
                      {row.group_name}
                      {/* END DIALOG */}
                    </TableCell>
                    <TableCell>
                      <div className={classes.buttons}>
                        {/* VIEW DIALOG */}
                        <ViewGroupContacts groupData={row} matches={matches} />
                        {/* EDIT VIEW DIALOG */}

                        {/* EDIT DIALOG */}
                        <EditGroupDialog data={row} fetchGroups={fetchGroups} />
                        {/* END EDIT DIALOG */}

                        {/* DELETE DIALOG */}
                        <DeleteGroupDialog groupData={row} fetchGroups={fetchGroups} />
                        {/* END DELETE DIALOG */}
                      </div>
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
        count={tempGroupData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
