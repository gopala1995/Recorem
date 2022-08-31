import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./styles.css";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    marginLeft: "50px",
    "& > *": {
      width: theme.spacing(45),
      height: theme.spacing(100),
    },
  },
}));

export const Card = () => {
  const classes = useStyles();

  let [Username, setUsername] = useState("");
  let [Password, setPassword] = useState("");
  let [DataStore, setDataStore] = useState([]);
  let [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    console.log(Username, Password);
    if (Username && Password) {
      let data = {
        username: Username,
        password: Password,
      };
      fetch(`http://localhost:7000/login`, {
        method: "POST",
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 200) {
          // setConfirm(response);
          // setError(false);
          let data = {
            isAuth: true,
            name: Username,
          };
          console.log(response);
          Cookies.set("user", JSON.stringify(data));
          window.location.reload();
        } else {
          setError("User is Exist Try Signup First");
        }
      });
    } else {
      setError("Fill All Values");
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={15}>
        <div className="form_container">
          <h1> Login </h1>
          <form onSubmit={(e) => submit(e)}>
            <TextField
              className="input"
              id="standard-password-input"
              label="Username"
              type="text"
              autoComplete="current-password"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              className="input input_2"
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <Button type="submit" variant="contained" color="secondary">
              Login
            </Button>
            <br />
            <br />
            {error && error}
          </form>
          <br />
          <br />
        </div>
        {/* <div className="ListContainer">
          {DataStore.map((ArrData) => {
            const { Username, Password } = ArrData;
            return (
              <>
                <div className="ListStyle">
                  <p> {Username} </p>
                  <p> {Password} </p>
                </div>
              </>
            );
          })}
        </div> */}
        <br />
        <br />
        <Link to="/signup">
          <Button variant="contained" color="primary">
            Sign UP
          </Button>
        </Link>
      </Paper>
    </div>
  );
};
