import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import SearchIcon from "@material-ui/icons/Search";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

// COMPONENTS
import TextFieldSearch from "./TextFieldSearch";

const useStyles = makeStyles(theme => ({
  color: {
    backgroundColor: blue[500]
  },
  spaceRight: {
    marginRight: theme.spacing(1)
  }
}));

export default function SearchContact({ data, setTempData, matches }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div>
      {open ? (
        <TextFieldSearch  data={data} setTempData={setTempData} matches={matches} />
      ) : (
        <Tooltip
          title="Search Contact"
          aria-label="add"
          className={classes.spaceRight}
          onClick={handleClick}
        >
          <Fab className={classes.color} color="primary">
            <SearchIcon />
          </Fab>
        </Tooltip>
      )}
    </div>
  );
}
