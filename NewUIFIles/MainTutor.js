import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import { Button, Box } from "@material-ui/core";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import HomeAdmin from "./HomeTutor";
import PreferencesTutor from "./PreferencesTutor";
import ProfileTutor from "./ProfileTutor";
import Logo from "./logo.png";
import Image from "react-image-resizer";

class MainTutor extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div style={{display: "flex"}}>
            <Button style={{marginRiight: "auto"}} color="secondary" variant="contained" href="https://www.coloradocollege.edu/offices/qrc/" target="_blank">Colorado College QRC Page</Button>
            <Button style={{marginLeft: "auto"}} color="secondary"><Avatar>Hi</Avatar></Button>
          </div>
          <p></p>
          <div style={{display: "flex"}}>
            <h1>QRC Scheduler</h1>
            <Image style={{marginLeft: "auto"}} src={Logo} height={125} width={125}/>
          </div>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/preferences">Preferences</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
          </ul>
          <div className="content">
             <Route exact path="/" component={HomeAdmin}/>
	           <Route path="/preferences" component={PreferencesAdmin}/>
	           <Route path="/profile" component={ProfileAdmin}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default MainTutor;
