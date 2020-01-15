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
import ViewDialog from "./ViewDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  view: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
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

export default function ContactsTable({ data, fetch }) {
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
                  sort="true"
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
                      <div className={classes.view}>
                        {/* VIEW DIALOG */}
                        <ViewDialog data={row} />
                        <Chip label={row.mobile_phone} variant="outlined" />
                        {/* END DIALOG */}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes.buttons}>
                        {/* EDIT DIALOG */}
                        <EditDialog data={row} fetch={fetch} />
                        {/* END EDIT DIALOG */}

                        {/* DELETE DIALOG */}
                        <DeleteDialog data={row} />
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
