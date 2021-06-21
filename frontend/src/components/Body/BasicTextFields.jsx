import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import "./style.css";
import { IconButton } from "@material-ui/core";

export default function BasicTextFields() {
  const [input, setInput] = useState();
  console.log(input);
  return (
    <>
      <form id="form__input">
        <TextField
          id="standard-basic"
          label="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <>
          <IconButton>
            <SearchSharpIcon style={{ color: "black" }} />
          </IconButton>
        </>
      </form>
    </>
  );
}
