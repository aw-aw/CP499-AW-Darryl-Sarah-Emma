import React, { Component } from "react";
import Popup from "reactjs-popup"
import { Button, Grid, Typography } from "@material-ui/core";
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
  typography: {
    fontFamily: 'Optima',
  }
});

class ShiftList extends Component {
  render() {
    var short_shift = this.props.short_shift;
    var shifttime = this.props.shifttime;
    return(
      <Grid item xs>
        <h3>{this.props.shifttime}</h3>
        <Typography noWrap={false}><Request type="get_shifts" sent={"SELECT * FROM assignedshifts WHERE shift= \'" + short_shift + "\';"}/></Typography>
      </Grid>
    )
  }
}

class OverviewAdmin extends Component {
  state={current_block:null};
  componentDidMount(){
    $.post("post",{input:"SELECT currentBlock FROM currentBlock WHERE id=1",category:"get_current_block"},function(data){this.setState({current_block:data});}.bind(this));
  }
  render() {
    const { current_block } = this.state;
    return(
     <div>
      <ThemeProvider theme={theme}>
        <h1 align="center">Overview of Schedule</h1>
        <Grid container spacing={12} style={{maxHeight: 300, overflow: 'auto'}} justify="space-between">
          <Grid item xs={2} zeroMinWidth>
            <h2>Monday</h2>
            <ShiftList shifttime="2-4pm" short_shift="SUN2"/>
            <ShiftList shifttime="4-6pm" short_shift="SUN4"/>
            <ShiftList shifttime="6-8pm" short_shift="SUN6"/>
            <ShiftList shifttime="8-10pm" short_shift="SUN8"/>
          </Grid>
          <Grid item xs={2} zeroMinWidth>
            <h2>Monday</h2>
            <ShiftList shifttime="2-4pm" short_shift="MON2"/>
            <ShiftList shifttime="4-6pm" short_shift="MON4"/>
            <ShiftList shifttime="6-8pm" short_shift="MON6"/>
            <ShiftList shifttime="8-10pm" short_shift="MON8"/>
          </Grid>
          <Grid item xs={2} zeroMinWidth>
            <h2>Tuesday</h2>
            <ShiftList shifttime="2-4pm" short_shift="TUES2"/>
            <ShiftList shifttime="4-6pm" short_shift="TUES4"/>
            <ShiftList shifttime="6-8pm" short_shift="TUES6"/>
            <ShiftList shifttime="8-10pm" short_shift="TUES8"/>
          </Grid>
          <Grid item xs={2} zeroMinWidth>
            <h2>Wednesday</h2>
            <ShiftList shifttime="2-4pm" short_shift="WED2"/>
            <ShiftList shifttime="4-6pm" short_shift="WED4"/>
            <ShiftList shifttime="6-8pm" short_shift="WED6"/>
            <ShiftList shifttime="8-10pm" short_shift="WED8"/>
          </Grid>
          <Grid item xs={2} zeroMinWidth>
            <h2>Thursday</h2>
            <ShiftList shifttime="2-4pm" short_shift="THURS2"/>
            <ShiftList shifttime="4-6pm" short_shift="THURS4"/>
            <ShiftList shifttime="6-8pm" short_shift="THURS6"/>
            <ShiftList shifttime="8-10pm" short_shift="THURS8"/>
          </Grid>
        </Grid>
      </ThemeProvider>
     </div>
    );
  }
}

export default OverviewAdmin;
