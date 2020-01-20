import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AddContactDialog from "./HomeComps/AddContactDialog";
import ContactsTable from "./HomeComps/ContactsTable";
import { deepOrange } from "@material-ui/core/colors";
import SearchContact from "./HomeComps/SearchContact";
import TextFieldSearch from "./HomeComps/TextFieldSearch";
import ContactsIcon from '@material-ui/icons/Contacts';

const useStyles = makeStyles(theme => ({
  spacing: {
    marginLeft: theme.spacing(1)
  },
  navButtons: {
    display: "flex",
    justifyContent: "flex-end"
  },
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

export default function Groups({
  data,
  fetch,
  sortFirst,
  sortLast,
  setData,
  tempData,
  setTempData,
  matches,
  groupData
}) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <div className={classes.navBar}>
              <h1>
                <ContactsIcon /> Contacts
              </h1>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={classes.navButtons}>
              {matches ? (
                <SearchContact
                  setData={setData}
                  data={data}
                  setTempData={setTempData}
                  matches={matches}
                />
              ) : null}

              <AddContactDialog fetch={fetch} matches={matches} />
            </div>
          </Grid>

          {matches ? null : (
            <Grid item xs={12} >
              <TextFieldSearch
                data={data}
                setTempData={setTempData}
                matches={matches}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            {/* CONTACTS TABLE */}
            <ContactsTable
              fetch={fetch}
              sortFirst={sortFirst}
              sortLast={sortLast}
              tempData={tempData}
              matches={matches}
              setTempData={setTempData}
              groupData={groupData}
            />
            {/* END TABLE */}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
