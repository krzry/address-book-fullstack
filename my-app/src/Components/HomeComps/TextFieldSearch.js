import React, {useState} from "react";
// Textfield
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  spaceRight: {
    marginRight: theme.spacing(3)
  }
}));

export default function SearchContact({ data, setTempData }) {
  const classes = useStyles();

  const [input, setInput] = useState('')

  const handleChange = e => {
    setInput(e.target.value)
    const filteredContacts = data.filter(
      el =>
        el.first_name.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1 ||
        el.last_name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );

    setTempData(filteredContacts);
  };

  return (
    <div>
      <Grid
        container
        spacing={1}
        alignItems="flex-end"
        className={classes.spaceRight}
      >
        <Grid item>
          <SearchIcon />
        </Grid>
        <Grid item>
          <TextField
            autoFocus
            id="input-with-icon-grid"
            label="Search a contact"
            onChange={e => handleChange(e)}
            fullWidth
            defaultValue={input}
          />
        </Grid>
      </Grid>
    </div>
  );
}
