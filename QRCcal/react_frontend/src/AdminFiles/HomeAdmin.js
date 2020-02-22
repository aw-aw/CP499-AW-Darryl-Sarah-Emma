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
    username_add: null,
    username_remove: null,
    selected: null,
    hasError: false,
    add_user_popup: null,
    all_users: null,
    all_users2: null,
    shift: null
  };
  handleChange(value, shift) {
    this.setState({ username_add: value });
  }
  handleChange3(value) {
    this.setState({ username_remove: value });
  }
  componentDidMount() {
    $.post("post", {input: "SELECT username FROM users WHERE isAdmin=0", category:"get_username"}, function(data){this.setState({all_users: data});}.bind(this));
  }
  handleClick(shift) {
    $.post("post", {input: `INSERT INTO assignedshifts (shift, username, discipline) VALUES ('${this.props.short_shift}', '${this.state.username_add}', '${this.state.discipline}')`, category: "add_user"}, function(data){this.setState({add_user_popup: data});}.bind(this));
  }
  handleClick2() {
    $.post("post", {input: `DELETE FROM assignedshifts WHERE username='${this.state.username_remove}' AND shift='${this.props.short_shift}'`, category: "add_user"}, function(data){this.setState({add_user_popup: data});}.bind(this));
  }
  handleClick(shift) {
    this.setState({ shift: shift });
    $.post("post", {input: "SELECT username FROM assignedshifts WHERE username='${this.state.shift}'", category:"get_username"}, function(data){this.setState({all_users2: data});}.bind(this));
  }
  render(){
  const { all_users, selected, username_add, username_remove, hasError, add_user_popup, all_users2 } = this.state;
  var short_shift = this.props.short_shift;
  var split_users;
  var array = [];
  if (this.state.all_users !== null) {
    split_users = this.state.all_users.split(" ")
    for(var i = 0; i < split_users.length - 1; i++) {
      const item = <MenuItem value={split_users[i]}>{split_users[i]}</MenuItem>;
      array.push(item)
    }
  }
  var split_users2;
  var array2 = [];
  if (this.state.all_users2 !== null) {
    split_users2 = this.state.all_users2.split(" ")
    for(var k = 0; k < split_users2.length - 1; k++) {
      const item = <MenuItem value={split_users2[k]}>{split_users2[k]}</MenuItem>;
      array2.push(item)
    }
  }
  return(
  <Grid item xs>
      <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">{this.props.button}</Button>} modal={true}>
        {close => (
        <div align="center">
          <h2 id="shifttitle" align="center">Scheduled Shifts</h2>
          <h3 align="center">{this.props.shift}</h3>
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
                          <Select value={username_add} onChange={event => this.handleChange(event.target.value)}>
                            {array}
                          </Select>
                        </FormControl>
                     </Grid>
                    </div>
                   </Grid>
                 </Grid>
                 <Grid container spacing={12}>
                   <Grid item xs={12}>
                     <p></p>
                      <Popup onOpen={() => this.handleClick()} trigger={<Button size="large" color="primary" variant="outlined" startIcon={<SaveIcon />}>Add</Button>}>
                        {close => (
                          <p>{add_user_popup}</p>
                        )}
                      </Popup>
                    <p></p>
                  </Grid>
                </Grid>
             </div>
           )}
           </Popup>
           <Popup trigger={<Button onClick={() => {this.handleClick3({short_shift});}} size="large" color="primary" variant="outlined">Remove Shift</Button>} modal={true}>
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
                          <Select value={username_remove} onChange={event => this.handleChange3(event.target.value)}>
                            {array}
                          </Select>
                        </FormControl>
                     </Grid>
                    </div>
                  </Grid>
                  <Grid container spacing={12}>
                  <Grid item xs={12}>
                    <p></p>
                    <Popup onOpen={() => this.handleClick2()} trigger={<Button size="large" color="primary" variant="outlined" startIcon={<SaveIcon />}>Remove</Button>}>
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
            <ShiftPopUp shift="Sunday (2-4)" button ="Ch M E" short_shift="SUN2"/>
            <br />
            <ShiftPopUp shift="Sunday (4-6)" button="Ch CS E M P" short_shift="SUN4"/>
            <br />
            <ShiftPopUp shift="Sunday (6-8)" button ="Ch CS M" short_shift="SUN6"/>
            <br />
            <ShiftPopUp shift="Sunday (8-10)" button="Ch CS E M P" short_shift="SUN8"/>
          </Grid>
           <Grid item xs>
            <p>Monday: {moment().isoWeekday(1).format('MM/DD')}</p>
            <ShiftPopUp shift="Monday (2-4)" button="M" short_shift="MON2"/>
            <br />
            <ShiftPopUp shift="Monday (4-6)" button ="Ch CS P" short_shift="MON4"/>
            <br />
            <ShiftPopUp shift="Monday (6-8)" button="Ch E M" short_shift="MON6"/>
            <br />
            <ShiftPopUp shift="Monday (8-10)" button="Ch CS E M P" short_shift="MON8"/>
          </Grid>
          <Grid item xs>
            <p>Tuesday: {moment().isoWeekday(2).format('MM/DD')}</p>
            <ShiftPopUp shift="Tuesday (2-4)" button="M" short_shift="TUES2"/>
            <br />
            <ShiftPopUp shift="Tuesday (4-6)" button="Ch CS E M P" short_shift="TUES4"/>
            <br />
            <ShiftPopUp shift="Tussday(6-8)" button="Ch M P" short_shift="TUES6"/>
            <br />
            <ShiftPopUp shift="Tuesday (8-10)" button="Ch CS E P" short_shift="TUES8"/>
          </Grid>
          <Grid item xs>
            <p>Wednesday: {moment().isoWeekday(3).format('MM/DD')}</p>
            <ShiftPopUp shift="Wednesday (2-4)" button="M" short_shift="WED2"/>
            <br />
            <ShiftPopUp shift="Wednesday (4-6)" button ="CS E M P" short_shift="WED4"/>
            <br />
            <ShiftPopUp shift="Wednesday (6-8)" button ="Ch CS M" short_shift="WED6"/>
            <br />
            <ShiftPopUp shift="Wednesday (8-10)" button ="Ch CS E M P" short_shift="WED8"/>
          </Grid>
          <Grid item xs>
            <p>Thursday: {moment().isoWeekday(4).format('MM/DD')}</p>
            <ShiftPopUp shift="Thursday (2-4)" button ="M" short_shift="THURS2"/>
            <br />
            <ShiftPopUp shift="Thursday (4-6)" button = "Ch CS E M P" short_shift="THURS4"/>
            <br />
            <ShiftPopUp shift="Thursday (6-8)" button ="Ch CS E M" short_shift="THURS6"/>
            <br />
            <ShiftPopUp shift="Thursday (8-10)" button = "Ch CS E M P" short_shift="THURS8"/>
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
