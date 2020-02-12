import React, { Component } from "react";
import Popup from "reactjs-popup"
import { Button } from "@material-ui/core";
import { Grid, Typography, Paper } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import orange from '@material-ui/core/colors/purple';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import "../Home.css";
import { borders } from '@material-ui/system';
import { FormControl } from '@material-ui/core';
import { NativeSelect } from '@material-ui/core';
import { MenuItem, Select, InputLabel, FormHelperText } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { Request } from '../Request.js'
import * as $ from 'jquery';

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

class Disciplines extends React.Component {
  render () {
  var user_name = this.props.user_name;
    return (
      <Grid item xs>
	<div>
          <h3>Disciplines</h3>
          <Request type="get_discipline_list" sent={"SELECT * FROM discipline WHERE username=\'" + user_name + "\';"}/>
        </div>
      </Grid> 
    )
  }
}

class MaxShifts extends React.Component {
  state = {
    selected: null,
    hasError: false,
    isActive: true
  };
  handleChange(value) {
    if (typeof value == "string"){
      value = 0;
    }
    this.setState({ selected: value });
 }
 handleClick(value, username) {
    this.setState({ hasError: false });
    if (!this.state.selected) {
      this.setState({ hasError: true });
    }
    else {
      var full_request = 'UPDATE users SET desiredShifts=\'' + value + '\' WHERE username=\'' + username + "\'"
      $.post("post", {input: full_request, category:"button"});
    }
  }
  render() {
    const { classes } = this.props;
    const { selected, hasError } = this.state;
    var user_name = this.props.user_name;
    const list = [<MenuItem value="Zero">0</MenuItem>,
            <MenuItem value={1}>1</MenuItem>,
            <MenuItem value={2}>2</MenuItem>,
            <MenuItem value={3}>3</MenuItem>,
            <MenuItem value={4}>4</MenuItem>,
            <MenuItem value={5}>5</MenuItem>,
            <MenuItem value={6}>6</MenuItem>,
            <MenuItem value={7}>7</MenuItem>,
            <MenuItem value={8}>8</MenuItem>,
            <MenuItem value={9}>9</MenuItem>,
            <MenuItem value={10}>10</MenuItem>]
    return (
      <Grid item xs alignItems="center">
        <h3>Max Shifts</h3>
        <FormControl align="center" style={{minWidth: 200}} error={hasError}>
          <Request type="get_max_shifts" sent={"SELECT desiredShifts FROM users WHERE username=\'" + user_name + "\';"}/>
          <Select value={selected} onChange={event => this.handleChange(event.target.value)}>
            {list}
          </Select>
          <Button onClick={() => this.handleClick(this.state.selected, window.user_name)} size="medium" color="primary" variant="filled" startIcon={<SaveIcon />}>save</Button>
        </FormControl>
      </Grid>
    )
  }
}

class LA extends React.Component {
  render() {
    var user_name = this.props.user_name;
    return (
      <Grid item xs>
        <div>
          <h3>LA Last Block</h3>
          <Request type="get_la_status" sent={"SELECT * FROM users WHERE username=\'" + user_name + "\';"}/>
        </div>
      </Grid>
    )
  }
}

class ShiftsLastBlock extends React.Component {
  render() {
    var user_name = this.props.user_name;
    return (
      <Grid item xs>
        <h3>Hours Last Block</h3>
        <Request type="get_last_shifts" sent={"SELECT * FROM assignedshifts WHERE username=\'" + user_name + "\';"}/>
      </Grid>
    )
  }
}

class CurrentShifts extends React.Component {
  render() {
   var user_name = this.props.user_name;
    return (
      <Grid item xs style={{backgroundColor: '#FFFFFF', color: 'black', borderColor: 'primary', borderRadius: 16}}>
       <div>
          <h3>My Current Shifts Block 5</h3>
          <Request type="get_assigned_shifts" sent={"SELECT * FROM assignedshifts WHERE username=\'" + user_name + "\';"}/>
        </div>
      </Grid>
    )
  }
}

class PreferredShifts extends React.Component {
  render() {
    var user_name = this.props.user_name;
    return (
      <Grid item xs>
	<div>
          <h3>My Preferred Shifts Block(database block #)</h3>
	  <Request type="get_assigned_shifts" sent={"SELECT * FROM preferredshifts WHERE username=\'" + user_name + "\';"}/>
        </div>
      </Grid>
    )
  }
}

class BusyShifts extends React.Component {
  render() {
    var user_name = this.props.user_name;
    return (
      <Grid item xs>
        <div>
          <h3>My Busy Shifts Block(database block #)</h3>
          <Request type="get_busy_shifts" sent={"SELECT * FROM BusyShifts WHERE username=\'" + user_name + "\';"}/>
        </div>
      </Grid>
    )
  }
}

class Profile extends Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
        <h1 align="center">My Profile</h1>
          <Grid container spacing={4} style={{backgroundColor: '#FFFFFF', borderColor: '#DAA520'}}>
            <Disciplines user_name={window.user_name}/>
            <MaxShifts user_name={window.user_name}/>
            <LA user_name={window.user_name}/>
            <ShiftsLastBlock user_name={window.user_name} />
          </Grid>
          <Grid container spacing={2}>
            <CurrentShifts user_name={window.user_name}/>
            <PreferredShifts user_name={window.user_name}/>
            <BusyShifts user_name={window.user_name}/>
          </Grid>
        </ThemeProvider>
      </div>
    );
  }
}

export default Profile;
