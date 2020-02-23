import React, { Component } from "react";
import Popup from "reactjs-popup"
import { Button, Grid } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import moment from "moment";
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
  typography: {
    fontFamily: 'Optima',
  }
});

class ShiftPopUp extends Component{
  state = {
    hasError: false
  };
 render(){
   const { hasError } = this.state;
   var short_shift = this.props.short_shift;
   return(
    <Grid item xs>
      <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">{this.props.button}</Button>} modal={true}>
        {close => (
          <div align="center">
            <h2>Current Preferences Entered By Tutors:</h2>
            <h3>{this.props.shift}</h3>
            <Request type="get_pref_shifts" sent={"SELECT * FROM preferredshifts WHERE shift = \'" + short_shift + "\';"}/>
          </div>
        )}
      </Popup>
    </Grid>
  )}
}

class PreferencesAdmin extends Component{
  state = { current_block: null };
  componentDidMount(){
    $.post("post",{input:"SELECT currentBlock FROM currentBlock WHERE id=1",category:"get_next_block"},function(data){this.setState({current_block:data});}.bind(this));
  } 
   render() {
    const { current_block } = this.state
    return (
     <div>
      <ThemeProvider theme={theme}>
        <h1 align="center">Block {this.state.current_block} Preferred Shifts</h1>
        <h3 align="center">Shift Key:</h3>
        <h4 align="center">Ch = Chemistry / CS = Computer Science / E = Economics / M = Mathematics / P = Physics</h4>
        <Grid container spacing={2} justify="center" style={{overflow: 'auto'}}>
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
            <br />
            <ShiftPopUp shift="Sunday (4-6)" short_shift="SUN4" button="Ch CS E M P"/>
            <br />
            <ShiftPopUp shift="Sunday (6-8)" short_shift="SUN6" button="Ch CS M"/>
            <br />
            <ShiftPopUp shift="Sunday (8-10)" short_shift="SUN8" button="Ch CS E M P"/>
          </Grid>
          <Grid item xs>
            <p>Monday: {moment().isoWeekday(1).format('MM/DD')}</p>
            <ShiftPopUp shift="Monday (2-4)" short_shift="MON2" button="M"/>
            <br />
            <ShiftPopUp shift="Monday (4-6)" short_shift="MON4" button="Ch CS P"/>
            <br />
            <ShiftPopUp shift="Monday (6-8)" short_shift="MON6" button="Ch E M"/>
            <br />
            <ShiftPopUp shift="Monday (8-10)" short_shift="MON8" button="Ch CS E M P"/>
          </Grid>
          <Grid item xs>
            <p>Tuesday: {moment().isoWeekday(2).format('MM/DD')}</p>
            <ShiftPopUp shift="Tuesday (2-4)" short_shift="TUES2"button="M"/>
            <br />
            <ShiftPopUp shift="Tuesday (4-6)" short_shift="TUES4" button="Ch CS E M P"/>
            <br />
            <ShiftPopUp shift="Tuesday (6-8)" short_shift="TUES6" button="Ch M P"/>
            <br />
            <ShiftPopUp shift="Tuesday (8-10)" short_shift="TUES8" button="Ch CS E P"/>
          </Grid>
          <Grid item xs>
            <p>Wednesday: {moment().isoWeekday(3).format('MM/DD')}</p>
            <ShiftPopUp shift="Wednesday (2-4)" short_shift="WED2" button="M"/>
            <br />
            <ShiftPopUp shift="Wednesday (4-6)" short_shift="WED4" button="Ch CS E M P"/>
            <br />
            <ShiftPopUp shift="Wednesday (6-8)" short_shift="WED6" button="Ch CS M"/>
            <br />
            <ShiftPopUp shift="Wednesday (8-10)" short_shift="WED8" button="Ch CS E M P"/>
          </Grid>
          <Grid item xs>
            <p>Thursday: {moment().isoWeekday(4).format('MM/DD')}</p>
            <ShiftPopUp shift="Thursday (2-4)" short_shift="THURS2" button="M"/>
            <br />
            <ShiftPopUp shift="Thursday (4-6)" short_shift="THURS4" button="Ch CS E M P"/>
            <br />
            <ShiftPopUp shift="Thursday (8-8)" short_shift="THURS6" button="Ch CS E M"/>
            <br />
            <ShiftPopUp shift="Thursday (8-10)" short_shift="THURS8" button="Ch CS E M P"/>
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
        <h4 align="center">Click on a button to see the preferences entered by tutors for Block {this.state.current_block}.</h4>
      </ThemeProvider>
    </div>
    );
  }
}

export default PreferencesAdmin;
