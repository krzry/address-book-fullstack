import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";


//COMPONENTS
import GroupsTable from "./HomeComps/GroupComponents/GroupsTable";
import AddGroupDialog from "./HomeComps/GroupComponents/AddGroupDialog";

const useStyles = makeStyles(theme => ({
  drawer: {
    display: "flex",
    alignItems: "center"
  },
  navBar: {
    display: "flex",
    justifyContent: "space-between"
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

export default function Groups({ tempGroupData, fetchGroups, matches }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12} className={classes.navBar}>
            <h1>
              <PeopleAltIcon /> Groups
            </h1>
            {/* ADD CONTACTS DIALOG */}
            <AddGroupDialog fetchGroups={fetchGroups} matches={matches} />
            {/* ADD CONTACTS */}
          </Grid>

          <Grid item xs={12}>
            {/* CONTACTS TABLE */}
            <GroupsTable
              tempGroupData={tempGroupData}
              fetchGroups={fetchGroups}
              matches={matches}
            />
            {/* END TABLE */}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
