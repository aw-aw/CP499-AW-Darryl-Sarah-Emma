import React, { Component } from "react";
import { Button, Box } from "@material-ui/core";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import HomeTutor from "./HomeTutor";
import PreferencesTutor from "./PreferencesTutor";
import ProfileTutor from "./ProfileTutor";
import Logo from "./logo.png";
import Image from "react-image-resizer";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#DAA520',
    },
    secondary: {
      main: '#000000',
      constrastText: '#111',
    },
    constrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: 'Optima',
  }
});

class MainTutor extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div style={{display: "flex"}}>
            <Button style={{marginRight: "auto"}} color="secondary" variant="contained" href="https://www.coloradocollege.edu/offices/qrc/" target="_blank">Colorado College QRC Page</Button>
          </div>
          <p></p>
          <div style={{display: "flex"}}>
            <h1 id="sitetitle">QRC Scheduler</h1>
            <Image style={{marginLeft: "auto"}} src={Logo} height={125} width={125}/>
          </div>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/preferences">Preferences</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
          </ul>
          <div className="content">
             <Route exact path="/" component={HomeTutor}/>
	           <Route path="/preferences" component={PreferencesTutor}/>
	           <Route path="/profile" component={ProfileTutor}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default MainTutor;
