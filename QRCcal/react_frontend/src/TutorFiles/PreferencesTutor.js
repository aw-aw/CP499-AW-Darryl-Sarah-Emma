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
import "./Home.css";
import SaveIcon from '@material-ui/icons/Save';
import { borders } from '@material-ui/system';
import { FormControl } from '@material-ui/core';
import { NativeSelect } from '@material-ui/core';
import { MenuItem, Select, InputLabel, FormHelperText } from '@material-ui/core';
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
    hasError: false
  };

  handleChange(value) {
    this.setState({ selected: value });
 }
 handleClick() {
    this.setState({ hasError: false });
    if (!this.state.selected) {
      this.setState({ hasError: true });
    }
  }
 render(){
   const { classes } = this.props;
   const { selected, hasError } = this.state;
   var short_shift = this.props.short_shift;
   return(
    <Grid item xs>
        <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">{this.props.button}</Button>} modal={true}>
          {close => (
            <div>
              <div>
                <h4>Current Preferences Entered By Tutors:</h4>
                <p id="retrieved"></p>
              </div>
              <Request type="preferences" sent={"SELECT * FROM preferredshifts WHERE shift = \'" + short_shift + "\';"}/>
              <h4>Add Preferred Shift {this.props.shift}</h4>
              <Grid item xs>
                <FormControl style={{minWidth: 200}} error={hasError}>
                  <InputLabel>Discipline</InputLabel>
                  <Select value={selected} onChange={event => this.handleChange(event.target.value)}>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="ComputerScience">Computer Science</MenuItem>
                    <MenuItem value="Mathematics">Mathmematics</MenuItem>
                  </Select>
                  <Button onClick={() => this.handleClick()} size="medium" color="primary" variant="filled" startIcon={<SaveIcon />}>save</Button>
                </FormControl>
              </Grid>
            </div>
          )}
        </Popup>
    </Grid>)
  }
}

class PreferencesTutor extends Component {
  render() {
    return (
      <div>
      <ThemeProvider theme={theme}>
      <h1 align="center">Block 6 Preferred Shifts for {window.user_name}(Tutor)</h1>
        <Grid container spacing={2}>
          <Grid item xs>
            <p>Monday: {moment().isoWeekday(1).format('MM/DD')}</p>
            <ShiftPopUp shift="Monday (2-4)" short_shift="MON2" button="2-4"/>
            <p></p>
            <ShiftPopUp shift="Monday (4-6)" short_shift="MON4" button="4-6"/>
            <p></p>
            <ShiftPopUp shift="Monday (6-8)" short_shift="MON6" button="6-8"/>
            <p></p>
            <ShiftPopUp shift="Monday (8-10)" short_shift="MON8" button="8-10"/>
          </Grid>
          <Grid item xs>
            <p>Tuesday: {moment().isoWeekday(2).format('MM/DD')}</p>
            <ShiftPopUp shift="Tuesday (2-4)" short_shift="TUES2"button="2-4"/>
            <p></p>
            <ShiftPopUp shift="Tuesday (4-6)" short_shift="TUES4" button="4-6"/>
            <p></p>
            <ShiftPopUp shift="Tuesday (6-8)" short_shift="TUES6" button="6-8"/>
            <p></p>
            <ShiftPopUp shift="Tuesday (8-10)" short_shift="TUES8" button="8-10"/>
          </Grid>
          <Grid item xs>
            <p>Wednesday: {moment().isoWeekday(3).format('MM/DD')}</p>
            <ShiftPopUp shift="Wednesday (2-4)" short_shift="WED2" button="2-4"/>
            <p></p>
            <ShiftPopUp shift="Wednesday (4-6)" short_shift="WED4" button="4-6"/>
            <p></p>
            <ShiftPopUp shift="Wednesday (6-8)" short_shift="WED6" button="6-8"/>
            <p></p>
            <ShiftPopUp shift="Wednesday(8-10)" short_shift="WED8" button="8-10"/>
          </Grid>
          <Grid item xs>
            <p>Thursday: {moment().isoWeekday(4).format('MM/DD')}</p>
            <ShiftPopUp shift="Thursday (2-4)" short_shift="THURS2" button="2-4"/>
            <p></p>
            <ShiftPopUp shift="Thursday (4-6)" short_shift="THURS4" button="4-6"/>
            <p></p>
            <ShiftPopUp shift="Thursday (6-8)" short_shift="THURS6" button="6-8"/>
            <p></p>
            <ShiftPopUp shift="Thursday (8-10)" short_shift="THURS8" button="8-10"/>
          </Grid>
          <Grid item xs>
            <p>Friday: {moment().isoWeekday(5).format('MM/DD')}</p>
          </Grid>
          <Grid item xs>
            <p>Saturday: {moment().isoWeekday(6).format('MM/DD')}</p>
          </Grid>
          <Grid item xs>
            <p>Sunday: {moment().isoWeekday(7).format('MM/DD')}</p>
            <ShiftPopUp shift="Sunday (2-4)" short_shift="SUN2" button="2-4"/>
            <p></p>
            <ShiftPopUp shift="Sunday (4-6)" short_shift="SUN4" button="4-6"/>
            <p></p>
            <ShiftPopUp shift="Sunday (6-8)" short_shift="SUN6" button="6-8"/>
            <p></p>
            <ShiftPopUp shift="Sunday (8-10)" short_shift="SUN8" button="8-10"/>
            </Grid>
          </Grid>
      </ThemeProvider>
    </div>
    );
  }
}

export default PreferencesTutor;
