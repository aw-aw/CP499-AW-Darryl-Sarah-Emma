import React, { Component } from "react";
import Popup from "reactjs-popup"
import { Button } from "@material-ui/core";
import { Table } from "@material-ui/core";
import { Grid, Typography, Paper } from "@material-ui/core";
import { TableRow, TableHead, TableCell } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { createMuiTheme } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import orange from '@material-ui/core/colors/purple';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import "../Home.css";
import { borders } from '@material-ui/system';
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
  render(){
  var short_shift=this.props.short_shift;
  return(
  <Grid item xs>
      <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">{this.props.button}</Button>} modal={true}>
        {close => (
        <div>
          <h2 id="shifttitle" align="center">Scheduled Shifts</h2>
          <h3 align="center">{this.props.shift}</h3>
	  <Request type="get_pref_shifts" sent= {"SELECT * FROM assignedshifts WHERE shift= \'" + short_shift + "\';"}/>
        </div>
	)}
      </Popup>
  </Grid>)
  }
}

class HomeTutor extends Component {
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
            <ShiftPopUp shift="Sunday (2-4)" button="Ch M E" short_shift="SUN2"/>
            <p></p>
            <ShiftPopUp shift="Sunday (4-6)" button="Ch CS E M P" short_shift="SUN4"/>
            <p></p>
            <ShiftPopUp shift="Sunday (6-8)" button="Ch CS M" short_shift="SUN6"/>
            <p></p>
            <ShiftPopUp shift="Sunday (8-10)" button="Ch CS E M P" short_shift="SUN8"/>
          </Grid>
           <Grid item xs>
            <p>Monday: {moment().isoWeekday(1).format('MM/DD')}</p>
            <ShiftPopUp shift="Monday (2-4)" button="M" short_shift="MON2"/>
            <p></p>
            <ShiftPopUp shift="Monday (4-6)" button="Ch CS P" short_shift="MON4"/>
            <p></p>
            <ShiftPopUp shift="Monday (6-8)" button="Ch E M" short_shift="MON6"/>
            <p></p>
            <ShiftPopUp shift="Monday (8-10)" button="Ch CS E M P" short_shift="MON8"/>
          </Grid>
          <Grid item xs>
            <p>Tuesday: {moment().isoWeekday(2).format('MM/DD')}</p>
            <ShiftPopUp shift="Tuesday (2-4)" button="M" short_shift="TUES2"/>
            <p></p>
            <ShiftPopUp shift="Tuesday (4-6)" button="Ch CS E M P" short_shift="TUES4"/>
            <p></p>
            <ShiftPopUp shift="Tuesday (6-8)" button="Ch M P" short_shift="TUES6"/>
            <p></p>
            <ShiftPopUp shift="Tuesday (8-10)" button="Ch CS E P" short_shift="TUES8"/>
          </Grid>
          <Grid item xs>
            <p>Wednesday: {moment().isoWeekday(3).format('MM/DD')}</p>
            <ShiftPopUp shift="Wednesday (2-4)" button="M" short_shift="WED2"/>
            <p></p>
            <ShiftPopUp shift="Wednesday (4-6)" button="CS E M P" short_shift="WED4"/>
            <p></p>
            <ShiftPopUp shift="Wednesday (6-8)" button="Ch CS M" short_shift="WED6"/>
            <p></p>
            <ShiftPopUp shift="Wednesday (8-10)" button="Ch CS E M P" short_shift="WED8"/>
          </Grid>
          <Grid item xs>
            <p>Thursday: {moment().isoWeekday(4).format('MM/DD')}</p>
            <ShiftPopUp shift="Thursday (2-4)" button="M" short_shift="THURS2"/>
            <p></p>
            <ShiftPopUp shift="Thursday (4-6)" button="Ch CS E M P" short_shift="THURS4"/>
            <p></p>
            <ShiftPopUp shift="Thursday (6-8)" button="Ch CS E M" short_shift="THURS6"/>
            <p></p>
            <ShiftPopUp shift="Thursday (8-10)" button="Ch CS E M P" short_shift="THURS8"/>
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

export default HomeTutor;
