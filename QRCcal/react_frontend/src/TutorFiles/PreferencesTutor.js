import React, { Component } from "react";
import Popup from "reactjs-popup"
import { Button } from "@material-ui/core";
import { Table } from "@material-ui/core";
import { Grid, Typography, Paper } from "@material-ui/core";
import { TableRow, TableHead, TableCell } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import orange from '@material-ui/core/colors/purple';
import moment from "moment";
import "../Home.css";
import SaveIcon from '@material-ui/icons/Save';
import { borders } from '@material-ui/system';
import { FormControl } from '@material-ui/core';
import { NativeSelect } from '@material-ui/core';
import { Select, MenuItem, InputLabel, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

const theme2 = createMuiTheme({
  palette: {
    primary: {
      main: '#FF0000'
    },
  },
})

class ShiftPopUp extends Component{
  state = {
    selected: null,
    hasError: false,
    isActive: true,
    isAdd: true,
    all_disciplines: null,
  };

  handleChange(value) {
    this.setState({ selected: value });
  }
  componentDidMount(){
    $.post("post", {input:"SELECT discipline FROM discipline WHERE username = '"+ window.user_name + "';", category:"disciplines_dropdown"}, function(data){this.setState({all_disciplines: data});}.bind(this));  
  }
  handleClick() { 
      $.post("post", {input: `INSERT INTO preferredshifts (shift,username) VALUES ('${this.props.short_shift}','${window.user_name}')`, category:"button"});
  }
  handleClick2() {
     $.post("post", {input: `DELETE FROM preferredshifts WHERE username='${window.user_name}' AND shift='${this.props.short_shift}'`, category:"button"});
  }
  handleClick3() {
     $.post("post", {input: `INSERT INTO BusyShifts (shift, username) VALUES ('${this.props.short_shift}','${window.user_name}')`, category:"button"});
  }
  handleClick4() {
     $.post("post", {input: `DELETE FROM BusyShifts WHERE username='${window.user_name}' AND shift='${this.props.short_shift}'`, category:"button"});
  }
 render(){
   const { classes } = this.props;
   const { selected, hasError, isActive } = this.state;
   var short_shift = this.props.short_shift;
   var split_disciplines;
   var array = [];
   if (this.state.all_disciplines !== null){
     split_disciplines = this.state.all_disciplines.split(" ");
     for (var i = 0; i < split_disciplines.length - 1; i++) {
       const item = <MenuItem value={split_disciplines[i]}>{split_disciplines[i]}</MenuItem>;
       array.push(item);
     }
     if (this.state.isActive){
       return(
        <Grid item xs>
          <div align="center">
          <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">{this.props.button}</Button>} modal={true}>
            {close => (
              <div>
                <div>
                  <h2>Current Preferences Entered By Tutors:</h2>
                  <h3>{this.props.shift}</h3>
                  <Request type="get_pref_shifts" sent={"SELECT * FROM preferredshifts WHERE shift = \'" + short_shift + "\';"}/>
                </div>
                <Grid item xs>
                  <FormControl align="center" style={{minWidth: 200}} error={hasError}>
                    <Button onClick={() => {this.handleClick(); close(); }} size="medium" color="primary" variant="filled" startIcon={<SaveIcon />}>Add Preference</Button>
                    <Button onClick={() => {this.handleClick2(); close(); }} size="medium" color="primary" variant="filled" startIcon={<SaveIcon />}>Remove Preference</Button>
                    <Button onClick={() => {this.handleClick3(); close(); }} size="medium" color="primary" variant="filled" startIcon={<SaveIcon />}>Busy</Button> 
                    <Button onClick={() => {this.handleClick4(); close(); }} size="medium" color="primary" variant="filled" startIcon={<SaveIcon />}>No Longer Busy</Button>   
                  </FormControl>
                </Grid>
              </div>
            )}
          </Popup>
          </div>
        </Grid>)
      }
      return (<div></div>)
    }
  return(<div></div>)
  }
}

class PreferencesTutor extends Component{
  state={current_block:null};
  componentDidMount(){
    $.post("post",{input:"SELECT currentBlock FROM currentBlock WHERE id=1",category:"get_next_block"},function(data){this.setState({current_block:data});}.bind(this));
  } 
   render() {
     const { current_block }=this.state;
    return (
     <div>
      <ThemeProvider theme={theme}>
        <h1 align="center">Block {this.state.current_block} Preferred Shifts</h1>
        <h3 align="center">Shift Key:</h3>
        <h4 align="center">Ch = Chemistry / CS = Computer Science / E = Economics / M = Mathematics / P = Physics</h4>
        <Grid container spacing={2} justify="center">
           <Grid item xs>
            <p id="ptop">Shift Times</p>
            <p>2:00pm-4:00pm</p>
            <p id="pspacing">4:00pm-6:00pm</p>
            <p id="pspacing">6:00pm-8:00pm</p>
            <p id="pspacing">8:00pm-10:00pm</p>
          </Grid>
          <Grid item xs>
            <p>Sunday: {moment().isoWeekday(0).format('MM/DD')}</p>
            <ShiftPopUp shift="Sunday (2-4)" short_shift="SUN2" button="Ch M E"/>
            <p></p>
            <ShiftPopUp shift="Sunday (4-6)" short_shift="SUN4" button="Ch CS E M P"/>
            <p></p>
            <ShiftPopUp shift="Sunday (6-8)" short_shift="SUN6" button="Ch CS M"/>
            <p></p>
            <ShiftPopUp shift="Sunday (8-10)" short_shift="SUN8" button="Ch CS E M P"/>
          </Grid>
          <Grid item xs>
            <p>Monday: {moment().isoWeekday(1).format('MM/DD')}</p>
            <ShiftPopUp shift="Monday (2-4)" short_shift="MON2" button="M"/>
            <p></p>
            <ShiftPopUp shift="Monday (4-6)" short_shift="MON4" button="Ch CS P"/>
            <p></p>
            <ShiftPopUp shift="Monday (6-8)" short_shift="MON6" button="Ch E M"/>
            <p></p>
            <ShiftPopUp shift="Monday (8-10)" short_shift="MON8" button="Ch CS E M P"/>
          </Grid>
          <Grid item xs>
            <p>Tuesday: {moment().isoWeekday(2).format('MM/DD')}</p>
            <ShiftPopUp shift="Tuesday (2-4)" short_shift="TUES2"button="M"/>
            <p></p>
            <ShiftPopUp shift="Tuesday (4-6)" short_shift="TUES4" button="Ch CS E M P"/>
            <p></p>
            <ShiftPopUp shift="Tuesday (6-8)" short_shift="TUES6" button="CH M P"/>
            <p></p>
            <ShiftPopUp shift="Tuesday (8-10)" short_shift="TUES8" button="Ch CS E M P"/>
          </Grid>
          <Grid item xs>
            <p>Wednesday: {moment().isoWeekday(3).format('MM/DD')}</p>
            <ShiftPopUp shift="Wednesday (2-4)" short_shift="WED2" button="M"/>
            <p></p>
            <ShiftPopUp shift="Wednesday (4-6)" short_shift="WED4" button="Ch CS E M P"/>
            <p></p>
            <ShiftPopUp shift="Wednesday (6-8)" short_shift="WED6" button="Ch CS M"/>
            <p></p>
            <ShiftPopUp shift="Wednesday(8-10)" short_shift="WED8" button="Ch CS E M P"/>
          </Grid>
          <Grid item xs>
            <p>Thursday: {moment().isoWeekday(4).format('MM/DD')}</p>
            <ShiftPopUp shift="Thursday (2-4)" short_shift="THURS2" button="M"/>
            <p></p>
            <ShiftPopUp shift="Thursday (4-6)" short_shift="THURS4" button="Ch CS E M P"/>
            <p></p>
            <ShiftPopUp shift="Thursday (6-8)" short_shift="THURS6" button="Ch CS E M P"/>
            <p></p>
            <ShiftPopUp shift="Thursday (8-10)" short_shift="THURS8" button="8-10"/>
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
         <h4 align="center">Listed on the buttons for each shift are the disciplines that can be filled.</h4>
         <h4 align="center">Click on a button to see the preferences of other tutors for Block {this.state.current_block}.</h4>
      </ThemeProvider>
    </div>
    );
  }
}

export default PreferencesTutor;
