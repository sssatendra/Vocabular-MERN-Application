import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./Cards";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import "./style.css";
import { IconButton } from "@material-ui/core";
import { setItems } from "../../Redux/actions/itemsAction";

function ItemListing() {
  // const [selected, setSelected] = useState();
  const [input, setInput] = useState("");
  const items = useSelector((state) => state.allItems.items);
  const dispatch = useDispatch();

  const fetchList = async () => {
    const res = await axios
      .get("https://vocabulary-task.herokuapp.com/v2/wordList")
      .then((res) => dispatch(setItems(res.data)))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchList();
  }, []);

  // console.log(selected);

  return (
    <div>
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
      <div className="list__items">
        {items
          .slice(0)
          .reverse()
          .filter((item) => {
            if (input === "") {
              return item;
            } else if (item.word.toLowerCase().includes(input.toLowerCase())) {
              return item;
            }
          })
          .map((item, key) => (
            <Cards key={item._id} word={item.word} meaning={item.definitions} />
          ))}
      </div>
    </div>
  );
}

export default ItemListing;
