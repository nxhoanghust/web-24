import React from "react";
//import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import registerPage from "./pages/registerPage";
import signInPage from "./pages/signInPage";
import homePage from "./pages/homePage";
import homePageTest from "./pages/homePageTest";
import updateProfile from "./pages/updateProfile";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/register" exact={true} component={registerPage} />
        <Route path="/signIn" exact={true} component={signInPage} />
        <Route path="/" exact={true} component={homePageTest} />
        <Route path="/profile" exact={true} component={homePageTest} />
        <Route path="/update-profile" component={updateProfile} />
      </BrowserRouter>
    );
  }
}

export default App;
