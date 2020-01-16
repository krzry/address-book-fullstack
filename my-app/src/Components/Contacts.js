import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AddContactDialog from "./HomeComps/AddContactDialog"
import ContactsTable from "./HomeComps/ContactsTable";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  drawer: {
    display: "flex",
    alignItems: "center"
  },
  navBar: {
    display: "flex",
    justifyContent: "space-between"
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "right",
    color: theme.palette.text.secondary
  },
  header: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

export default function Groups({data, fetch, sortFirst, sortLast}) {
  const classes = useStyles();
  
  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12} className={classes.navBar}>
            <h1>
              <PeopleAltIcon /> Contacts
            </h1>
            {/* ADD CONTACTS DIALOG */}
            <AddContactDialog fetch={fetch} />
            {/* ADD CONTACTS */}
          </Grid>

          <Grid item xs={12}>
            {/* CONTACTS TABLE */}
            <ContactsTable data={data} fetch={fetch} sortFirst={sortFirst} sortLast={sortLast}/>
            {/* END TABLE */}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
