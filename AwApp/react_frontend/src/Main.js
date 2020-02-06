import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import {
  Route,
  NavLink,
  BrowserRouter,
  Redirect
} from "react-router-dom";
import Home from "./Home";
import Preferences from "./Preferences";
import Profile from "./Profile";

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Button color="secondary"><Avatar>Hi</Avatar></Button>
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
	    <Redirect from="/grabShifts" to="/" component={Home}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
