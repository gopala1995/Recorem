import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

const Dash = () => {
  const classes = useStyles();
  const [userData, setUserdata] = React.useState([]);

  React.useEffect(() => {
    const data = Cookies.get("user");
    setUserdata(data && JSON.parse(data));
  }, []);

  const logout = () => {
    Cookies.remove("user");
    window.location.reload();
  };
  if (!userData?.isAuth) {
    return <Redirect to="/" />;
  } else {
    return (
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h6" className={classes.logo}>
            Hi {userData?.name}
          </Typography>
          <div className={classes.navlinks}>
            <button onClick={() => logout()}>Logout</button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
};
export default Dash;
