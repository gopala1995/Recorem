import logo from "./logo.svg";
import "./App.css";
import { SignUpPage } from "./components/SignUpPage";
import { Card } from "./components/Card.jsx";
import React from "react";
import Cookies from "js-cookie";
import { Route, Switch } from "react-router-dom";
import Dash from "./components/Dash";
import { Link, Redirect } from "react-router-dom";

function App() {
  const [userData, setUserdata] = React.useState([]);

  React.useEffect(() => {
    const data = Cookies.get("user");
    setUserdata(data && JSON.parse(data));
  }, []);
  if (userData?.isAuth) {
    return <Dash />;
  } else {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Card />} />
          <Route path="/signup" render={() => <SignUpPage />} />
          <Route path="/dash" render={() => <Dash />} />
        </Switch>
      </div>
    );
  }
}

export default App;
