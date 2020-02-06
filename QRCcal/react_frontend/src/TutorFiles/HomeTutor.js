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
import "./Home.css";
import { borders } from '@material-ui/system';

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

class ShiftPopUp extends Component{
  render(){
  return(
  <Grid item xs>
      <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">{this.props.button}</Button>} modal={true}>
        {close => (
          <div>
            <h2 id="shifttitle">Scheduled Shifts</h2>
            <p id="shiftpopup"> database info
            </p>
          </div>
        )}
      </Popup>
  </Grid>)
  }
}

class HomeTutor extends Component {
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
            <p>Monday: {moment().isoWeekday(1).format('MM/DD')}</p>
            <ShiftPopUp button="2-4"/>
            <p></p>
            <ShiftPopUp button ="4-6"/>
            <p></p>
            <ShiftPopUp button="6-8"/>
            <p></p>
            <ShiftPopUp button="8-10"/>
          </Grid>
          <Grid item xs>
            <p>Tuesday: {moment().isoWeekday(2).format('MM/DD')}</p>
            <ShiftPopUp button="2-4"/>
            <p></p>
            <ShiftPopUp button="4-6"/>
            <p></p>
            <ShiftPopUp button="6-8"/>
            <p></p>
            <ShiftPopUp button="8-10"/>
          </Grid>
          <Grid item xs>
            <p>Wednesday: {moment().isoWeekday(3).format('MM/DD')}</p>
            <ShiftPopUp button="2-4"/>
            <p></p>
            <ShiftPopUp button ="4-6"/>
            <p></p>
            <ShiftPopUp button ="6-8"/>
            <p></p>
            <ShiftPopUp button ="8-10"/>
          </Grid>
          <Grid item xs>
            <p>Thursday: {moment().isoWeekday(4).format('MM/DD')}</p>
            <ShiftPopUp button ="2-4"/>
            <p></p>
            <ShiftPopUp button = "4-6"/>
            <p></p>
            <ShiftPopUp button ="6-8"/>
            <p></p>
            <ShiftPopUp button = "8-10"/>
          </Grid>
          <Grid item xs>
            <p>Friday: {moment().isoWeekday(5).format('MM/DD')}</p>
          </Grid>
          <Grid item xs>
            <p>Saturday: {moment().isoWeekday(6).format('MM/DD')}</p>
          </Grid>
          <Grid item xs>
            <p>Sunday: {moment().isoWeekday(7).format('MM/DD')}</p>
            <ShiftPopUp button ="2-4"/>
            <p></p>
            <ShiftPopUp button="4-6"/>
            <p></p>
            <ShiftPopUp button ="6-8"/>
            <p></p>
            <ShiftPopUp button="8-10"/>
          </Grid>
        </Grid>
        </ThemeProvider>
      </div>
    );
  }
}

export default HomeTutor;
