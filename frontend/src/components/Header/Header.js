import React, { useState } from "react";
import "./Header.css";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
import { IconButton } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
// importing Modal from material ui
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import createHistory from 'history/createBrowserHistory'
import SimpleBackdrop from "./SimpleBackdrop";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function Header() {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = createHistory();

  // states to manage the input data 
  const [word, setWord] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // trigger function on form submit
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    //    Sending the Input data to backend 
    const url = "http://localhost:8000/YOUR_API_ROUTE"
    const data = await axios.post(url, { data: word })
      .then((res) => {
        console.log(res)

      }).catch(err => console.log(err));

    // Clear input state
    setWord('');
    setLoading(false);
    handleClose();
    history.go(0);
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setWord(e.target.value)
  }

  const body = (
    <div className={classes.paper} >
      <h4>Add to Dictionary</h4>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} >
        <TextField id="standard-basic" label="New Word" value={word} onChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
      </form>
    </div>
  );

  return (
    <>
      {
        loading ? (
          <SimpleBackdrop />
        ) : (<>
          <div className="header">
            <div className="logo">
              <h1>Vocabulary App</h1>
            </div>
            <div className="menu__right">
              <div className="home">
                <IconButton>
                  <HomeIcon />
                  <p>Home</p>
                </IconButton>
              </div>
              <div className="new__word" onClick={handleOpen}>
                <IconButton>
                  <AddCircleSharpIcon />
                  <p>New Word</p>
                </IconButton>
              </div>
            </div>
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 1000,
            }}
          >
            {body}
          </Modal>
        </>
        )
      }

    </>
  );
}

export default Header;
