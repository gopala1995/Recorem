
import "./App.css";
import { Register } from "./components/Register.jsx";
import { SignUp } from "./components/SignUp.jsx";
import React from "react";
import Cookies from "js-cookie";
import { Route, Switch } from "react-router-dom";
import DashBoard from "./components/Dashboard.jsx";
import { Link, Redirect } from "react-router-dom";

function App() {
  const [userData, setUserdata] = React.useState([]);

  React.useEffect(() => {
    const data = Cookies.get("user");
    setUserdata(data && JSON.parse(data));
  }, []);
  // if (userData?.isAuth) {
  //   return <DashBoard/>;
  // } else {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <SignUp />} />
          <Route path="/register" render={() => <Register />} />
          <Route path="/dashboard" render={() => <DashBoard />} />
        </Switch>
      </div>
    );
  // }
}

export default App;
