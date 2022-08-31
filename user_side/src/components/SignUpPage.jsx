import React from "react";
import "./styles.css";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
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
export const SignUpPage = () => {
  const classes = useStyles();
  const [username, setUserName] = React.useState("");
  const [email, setEmai] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [cpassword, setCpassword] = React.useState("");
  const [mobile, setMobile] = React.useState("");

  const [confirm, setConfirm] = React.useState([]);
  const [error, setError] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    console.log(username, email, password, cpassword, mobile);
    let data = {
      username: username,
      email: email,
      phone: mobile,
      password: password,
    };
    console.log(data);
    if (
      password === cpassword &&
      username &&
      email &&
      password &&
      cpassword &&
      mobile
    ) {
      fetch(`http://localhost:7000/register`, {
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
          setConfirm(response);
          setError(false);
          let data = {
            isAuth: true,
            name: username,
          };
          Cookies.set("user", JSON.stringify(data));
          window.location.reload();
        } else {
          setError("User is Exist Try Some other Email");
        }
      });
    } else {
      setError("Password and Confirm Password not Matched");
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={15}>
        <div className="form_container">
          <form onSubmit={(e) => submit(e)}>
            <h1> Sign up </h1>
            <TextField
              className="input"
              id="standard-password-input"
              label="Username"
              type="text"
              autoComplete="current-password"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              className="input"
              id="standard-mobile-input"
              label="Mobile"
              type="text"
              autoComplete="current-mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <TextField
              className="input"
              id="standard-email-input"
              label="Email"
              type="email"
              autoComplete="current-email"
              value={email}
              onChange={(e) => setEmai(e.target.value)}
            />
            <TextField
              className="input"
              id="standard-password-input"
              label="Password"
              type="text"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your password"
            />
            <TextField
              className="input"
              id="standard-password-input"
              label="Confirm Password"
              type="text"
              autoComplete="current-password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              placeholder="Confirm your password"
            />
            <br />
            <br />
            <br />
            <Button type="submit" variant="contained" color="secondary">
              Signup
            </Button>
            <br />
            <br />
            <Link to="/">
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link>
          </form>

          {/* {error && error?.status !== 200 && (
          <h3 style={{ color: "red", fontFamily: "bold" }}>{error}</h3>
        )} */}
          {/* {error?.status !== 200 &&
          confirm?.status === 200 &&
          "Congrats You are now logged in"} */}
        </div>
      </Paper>
    </div>
  );
};
