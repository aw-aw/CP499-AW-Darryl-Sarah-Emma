import React, { Component } from "react";
import Popup from "reactjs-popup"
import { Button, Grid } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import moment from "moment";
import SaveIcon from '@material-ui/icons/Save';
import { MenuItem, Select, InputLabel, FormHelperText, FormControl } from '@material-ui/core';
import "../Home.css";
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
   typography:{
    fontFamily:'Optima',
    }
});

class ShiftPopUp extends Component{
  state = {
    username: null,
    discipline: null,
    selected: null,
    hasError: false,
    add_user_popup: null,
    all_users: null,
    all_discipline: null
  };
  handleChange(value) {
    this.setState({ username : value });
    $.post("post", {input: "SELECT * FROM discipline WHERE username='${this.state.username}'", category:"get_discipline_list"}, function(data){this.setState({all_discipline: data});}.bind(this));
    this.forceUpdate();
  }
  handleChange2(value) {
    this.setState({ discipline: value });
  }
  componentDidMount() {
    $.post("post", {input: "SELECT username FROM users WHERE isAdmin=0", category:"get_username"}, function(data){this.setState({all_users: data});}.bind(this));
  }
  handleClick(value) {
    $.post("post", {input: `INSERT INTO assignedshifts (shift, username, discipline) VALUES ('${this.props.short_shift}', '${this.state.username}', '${this.state.discipline}')`, category: "add_user"});
  }
  handleClick2(value) {
    $.post("post", {input: `DELETE FROM assignedshifts WHERE username='${this.state.username}' AND shift='${this.props.short_shift}'`, category: "button"});
  } 
  render(){
  const { all_users, all_discipline, selected, username, discipline, hasError, add_user_popup } = this.state;
  var short_shift=this.props.short_shift;
  var split_users;
  var split_discipline;
  var array = [];
  var array2 = [];
  if (this.state.all_users !== null) {
    split_users = this.state.all_users.split(" ")
    for(var i = 0; i < split_users.length - 1; i++) {
      const item = <MenuItem value={split_users[i]}>{split_users[i]}</MenuItem>;
      array.push(item)
    }
  }
  if (this.state.all_discipline !== null) {
    split_discipline = this.state.all_discipline.split(" ")
    for(var k = 0; k < split_discipline.length - 1; k++) {
      const item2 = <MenuItem value={split_discipline[i]}>{split_discipline[i]}</MenuItem>;
      array2.push(item2)
    }
  }
  return(
  <Grid item xs>
      <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">{this.props.button}</Button>} modal={true}>
        {close => (
        <div align="center">
          <h2 id="shifttitle" align="center">Scheduled Shifts</h2>
	  <Request type="get_pref_shifts" sent= {"SELECT * FROM assignedshifts WHERE shift= \'" + short_shift + "\';"}/>
          <Popup trigger={<Button size="large" color="primary" variant="outlined">Add Shift</Button>} modal={true}>
           {close => (
              <div align="center">
                <h2>Add Shift ({this.props.short_shift})</h2>
                <Grid container spacing={12} justify="center">
                  <Grid item xs={4}>
                    <div align="center">
                     <Grid item xs>
                      <h3>Enter Username</h3>
                        <FormControl style={{minWidth: 100}}>
                          <InputLabel>Username</InputLabel>
                          <Select value={username} onChange={event => this.handleChange(event.target.value)}>
                            {array}
                          </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs>
                       <h3>Select Discipline</h3>
                         <FormControl style={{minWidth: 100}}>
                           <InputLabel>Discipline</InputLabel>
                           <Select value={discipline} onChange={event => this.handleChange2(event.target.value)}>
                             {array2}
                           </Select>
                         </FormControl>
                     </Grid>
                    </div>
                  </Grid>
                  <Grid container spacing={12}>
                  <Grid item xs={12}>
                    <p></p>
                    <Popup onOpen={() => this.handleClick()} trigger={<Button size="large" color="primary" variant="outlined" startIcon={<SaveIcon />}>save</Button>}>
                      {close => (
                        <p>{add_user_popup}</p>
                      )}
                    </Popup>
                    <p></p>
                  </Grid>
                </Grid>
                </Grid>
             </div>
           )}
           </Popup>
          <Button  size="large" color="primary" variant="outlined">Remove Shift</Button>
        </div>
	)}
      </Popup>
   </Grid>
  )}
}

class HomeAdmin extends Component {
  state={current_block:null};
  componentDidMount(){
    $.post("post",{input:"SELECT currentBlock FROM currentBlock WHERE id=1",category:"get_current_block"},function(data){this.setState({current_block:data});}.bind(this));
  }
  render() {
    const { current_block }=this.state;
    return (
      <div>
      <ThemeProvider theme={theme}>
        <h1 align="center">Block {this.state.current_block} Shifts</h1>
        <h3 align="center">Shift Key:</h3>
        <h4 align="center">Ch = Chemistry / CS = Computer Science / E = Economics / M = Mathematics / P = Physics</h4>
        <Grid container spacing={2}>
           <Grid item xs>
            <p id="ptop">Shift Times</p>
            <p>2:00pm-4:00pm</p>
            <p id="pspacing">4:00pm-6:00pm</p>
            <p id="pspacing">6:00pm-8:00pm</p>
            <p id="pspacing">8:00pm-10:00pm</p>
           </Grid>
           <Grid item xs>
            <p>Sunday: {moment().isoWeekday(0).format('MM/DD')}</p>
            <ShiftPopUp button ="Ch M E" short_shift="SUN2"/>
            <br />
            <ShiftPopUp button="Ch CS E M P" short_shift="SUN4"/>
            <br />
            <ShiftPopUp button ="Ch CS M" short_shift="SUN6"/>
            <br />
            <ShiftPopUp button="Ch CS E M P" short_shift="SUN8"/>
          </Grid>
           <Grid item xs>
            <p>Monday: {moment().isoWeekday(1).format('MM/DD')}</p>
            <ShiftPopUp button="M" short_shift="MON2"/>
            <br />
            <ShiftPopUp button ="Ch CS P" short_shift="MON4"/>
            <br />
            <ShiftPopUp button="Ch E M" short_shift="MON6"/>
            <br />
            <ShiftPopUp button="Ch CS E M P" short_shift="MON8"/>
          </Grid>
          <Grid item xs>
            <p>Tuesday: {moment().isoWeekday(2).format('MM/DD')}</p>
            <ShiftPopUp button="M" short_shift="TUES2"/>
            <br />
            <ShiftPopUp button="Ch CS E M P" short_shift="TUES4"/>
            <br />
            <ShiftPopUp button="Ch M P" short_shift="TUES6"/>
            <br />
            <ShiftPopUp button="Ch CS E P" short_shift="TUES8"/>
          </Grid>
          <Grid item xs>
            <p>Wednesday: {moment().isoWeekday(3).format('MM/DD')}</p>
            <ShiftPopUp button="M" short_shift="WED2"/>
            <br />
            <ShiftPopUp button ="CS E M P" short_shift="WED4"/>
            <br />
            <ShiftPopUp button ="Ch CS M" short_shift="WED6"/>
            <br />
            <ShiftPopUp button ="Ch CS E M P" short_shift="WED8"/>
          </Grid>
          <Grid item xs>
            <p>Thursday: {moment().isoWeekday(4).format('MM/DD')}</p>
            <ShiftPopUp button ="M" short_shift="THURS2"/>
            <br />
            <ShiftPopUp button = "Ch CS E M P" short_shift="THURS4"/>
            <br />
            <ShiftPopUp button ="Ch CS E M" short_shift="THURS6"/>
            <br />
            <ShiftPopUp button = "Ch CS E M P" short_shift="THURS8"/>
          </Grid>
          <Grid item xs>
            <p id="ptop2">Friday: {moment().isoWeekday(5).format('MM/DD')}</p>
            <p id="spacing">X</p>
            <p id="pspacing2">X</p>
            <p id="pspacing2">X</p>
            <p id="pspacing2">X</p>
          </Grid>
          <Grid item xs>
            <p id="ptop2">Saturday: {moment().isoWeekday(6).format('MM/DD')}</p>
            <p id="spacing">X</p>
            <p id="pspacing2">X</p>
            <p id="pspacing2">X</p>
            <p id="pspacing2">X</p>
          </Grid>
        </Grid>
        <h4 align="center">Click on a shift to see what tutors are working.</h4>
        </ThemeProvider>
      </div>
    );
  }
}

export default HomeAdmin;
