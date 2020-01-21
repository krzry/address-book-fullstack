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

  return (
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
                        {`${row.first_name} ${row.last_name}`}
                        {/* END DIALOG */}
                      </div>
                    </TableCell>
                    <TableCell>{row.mobile_phone}</TableCell>
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
  );
}
