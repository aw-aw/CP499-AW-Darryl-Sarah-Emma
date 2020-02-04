import React, { Component } from "react";
import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar } from "@material-ui/core";
import { Button, Box } from "@material-ui/core";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import Preferences from "./Preferences";
import Profile from "./Profile";

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <p>
            <Button color="secondary"><Avatar><SettingsIcon /></Avatar></Button>
            <Button color="secondary" variant="contained" href="https://www.coloradocollege.edu/offices/qrc/" target="_blank">Colorado College QRC Page</Button>
          </p>
          <h1 id="sitetitle">QRCcal</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/preferences">Preferences</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
          </ul>
          <div className="content">
             <Route exact path="/" component={Home}/>
	           <Route path="/preferences" component={Preferences}/>
	           <Route path="/profile" component={Profile}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
