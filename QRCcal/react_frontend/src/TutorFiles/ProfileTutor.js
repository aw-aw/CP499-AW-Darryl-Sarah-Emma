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
      <Grid item xs zeroMinWidth>
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
    isActive: true
  };
  handleChange(value) {
    this.setState({ selected: value });
 }
 handleClick() {
    $.post("post", {input: `UPDATE users SET desiredShifts='${this.state.selected}' WHERE username='${this.props.user_name}'`, category:"button"});
  }
  render() {
    const { classes } = this.props;
    const { selected } = this.state;
    var user_name = this.props.user_name;
    const list = [<MenuItem value={0}>0</MenuItem>,
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
        <FormControl align="center" style={{minWidth: 200}}>
          <Request type="get_max_shifts" sent={`SELECT desiredShifts FROM users WHERE username='${this.props.user_name}'`}/>
          <Select value={selected} onChange={event => this.handleChange(event.target.value)}>
            {list}
          </Select>
          </FormControl>
          <Grid item xs> 
            <p></p>
            <Button onClick={() => this.handleClick()} size="medium" color="primary" variant="filled" startIcon={<SaveIcon />}>save</Button>
          </Grid>
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

class ShiftsThisBlock extends React.Component {
  render() {
    var user_name = this.props.user_name;
    return (
      <Grid item xs wrap="noWrap">
        <h3>Hours This Block</h3>
        <Request type="get_last_shifts" sent={"SELECT * FROM assignedshifts WHERE username=\'" + user_name + "\';"}/>
      </Grid>
    )
  }
}

class CurrentShifts extends React.Component {
  state={current_block:null};
  componentDidMount(){
    $.post("post",{input:"SELECT currentBlock FROM currentBlock WHERE id=1",category:"get_current_block"},function(data){this.setState({current_block:data});}.bind(this));
  } 
  render() {
   const { current_block } = this.state;
   var user_name = this.props.user_name;
    return (
      <Grid item xs zeroMinWidth>
       <div>
          <h3>My Current Shifts Block {this.state.current_block}</h3>
          <Request type="get_assigned_shifts" sent={"SELECT * FROM assignedshifts WHERE username=\'" + user_name + "\';"}/>
        </div>
      </Grid>
    )
  }
}

class PreferredShifts extends React.Component {
  state={current_block:null};
  componentDidMount(){
    $.post("post",{input:"SELECT currentBlock FROM currentBlock WHERE id=1",category:"get_next_block"},function(data){this.setState({current_block:data});}.bind(this));
  } 
  render() {
    var user_name = this.props.user_name;
    const { current_block } = this.state;
    return (
      <Grid item xs zeroMinWidth>
	<div>
          <h3>My Preferred Shifts Block {this.state.current_block}</h3>
	  <Request type="get_pref_shifts" sent={"SELECT * FROM preferredshifts WHERE username=\'" + user_name + "\';"}/>
        </div>
      </Grid>
    )
  }
}

class BusyShifts extends React.Component {
  state={current_block:null};
  componentDidMount(){
    $.post("post",{input:"SELECT currentBlock FROM currentBlock WHERE id=1",category:"get_next_block"},function(data){this.setState({current_block:data});}.bind(this));
  } 
  render() {
    const { current_block } = this.state;
    var user_name = this.props.user_name;
    return (
      <Grid item xs zeroMinWidth>
        <div>
          <h3>My Busy Shifts Block {this.state.current_block}</h3>
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
            <ShiftsThisBlock user_name={window.user_name} />
          </Grid>
          <Grid container spacing={3} justify="center">
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
