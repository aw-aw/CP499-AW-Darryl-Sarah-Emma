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
	  <div>
            <h2 id="shifttitle">Scheduled Shifts</h2>
            <Request type="get_pref_shifts" sent= {"SELECT * FROM assignedshifts WHERE shift= \'" + short_shift + "\';"}/>
          </div>
        </div>
	)}
      </Popup>
  </Grid>)
  }
}

class HomeNormal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
      <ThemeProvider theme={theme}>
        <h1 align="center">Block 5 Shifts (Tutor)</h1>
        <Grid container spacing={2}>
          <Grid item xs>
            <p>Sunday: {moment().isoWeekday(7).format('MM/DD')}</p>
            <ShiftPopUp button ="2-4" short_shift="SUN2"/>
            <p></p>
            <ShiftPopUp button="4-6" short_shift="SUN4"/>
            <p></p>
            <ShiftPopUp button ="6-8" short_shift="SUN6"/>
            <p></p>
            <ShiftPopUp button="8-10" short_shift="SUN8"/>
          </Grid>
          <Grid item xs>
            <p>Monday: {moment().isoWeekday(1).format('MM/DD')}</p>
            <ShiftPopUp button="2-4" short_shift="MON2"/>
            <p></p>
            <ShiftPopUp button ="4-6" short_shift="MON4"/>
            <p></p>
            <ShiftPopUp button="6-8" short_shift="MON6"/>
            <p></p>
            <ShiftPopUp button="8-10" short_shift="MON8"/>
          </Grid>
          <Grid item xs>
            <p>Tuesday: {moment().isoWeekday(2).format('MM/DD')}</p>
            <ShiftPopUp button="2-4" short_shift="TUES2"/>
            <p></p>
            <ShiftPopUp button="4-6" short_shift="TUES4"/>
            <p></p>
            <ShiftPopUp button="6-8" short_shift="TUES6"/>
            <p></p>
            <ShiftPopUp button="8-10" short_shift="TUES8"/>
          </Grid>
          <Grid item xs>
            <p>Wednesday: {moment().isoWeekday(3).format('MM/DD')}</p>
            <ShiftPopUp button="2-4" short_shift="WED2"/>
            <p></p>
            <ShiftPopUp button ="4-6" short_shift="WED4"/>
            <p></p>
            <ShiftPopUp button ="6-8" short_shift="WED6"/>
            <p></p>
            <ShiftPopUp button ="8-10" short_shift="WED8"/>
          </Grid>
          <Grid item xs>
            <p>Thursday: {moment().isoWeekday(4).format('MM/DD')}</p>
            <ShiftPopUp button ="2-4" short_shift="THURS2"/>
            <p></p>
            <ShiftPopUp button = "4-6" short_shift="THURS4"/>
            <p></p>
            <ShiftPopUp button ="6-8" short_shift="THURS6"/>
            <p></p>
            <ShiftPopUp button = "8-10" short_shift="THURS8"/>
          </Grid>
          <Grid item xs>
            <p>Friday: {moment().isoWeekday(5).format('MM/DD')}</p>
          </Grid>
          <Grid item xs>
            <p>Saturday: {moment().isoWeekday(6).format('MM/DD')}</p>
          </Grid>
        </Grid>
        </ThemeProvider>
      </div>
    );
  }
}

export default HomeNormal;
