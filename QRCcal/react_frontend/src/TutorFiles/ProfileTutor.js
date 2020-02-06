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
  typography: {
    fontFamily: 'Optima',
  }
});

class Disciplines extends React.Component {
  render () {
    return (
      <Grid item xs>
        <h5 align="center">Disciplines</h5>
        <p align="center">Mathematics</p>
        <p align="center">Economics</p>
      </Grid>
    )
  }
}

class MaxShifts extends React.Component {
  render() {
    return (
      <Grid item xs>
        <h5 align="center">Max Shifts</h5>
        <p align="center">3</p>
      </Grid>
    )
  }
}

class LA extends React.Component {
  render() {
    return (
      <Grid item xs>
        <h5 align="center">LA Last Block</h5>
        <p align="center">Yes</p>
      </Grid>
    )
  }
}

class ShiftsLastBlock extends React.Component {
  render() {
    return(
      <Grid item xs>
        <h5 align="center">Shifts Last Block</h5>
        <p align="center">2</p>
      </Grid>
    )
  }
}

class CurrentShifts extends React.Component {
  render() {
    return (
      <Grid item xs style={{backgroundColor: '#FFFFFF', color: 'black', borderColor: 'primary', borderRadius: 16}}>
        <h4 align="center">My Current Shifts Block 5</h4>
        <p align="center">Monday, 2-4</p>
      </Grid>
    )
  }
}

class PreferredShifts extends React.Component {
  render() {
    return (
      <Grid item xs>
        <h4 align="center">My Preferred Shifts Block 6</h4>
        <p align="center">Tuesday, 6-8</p>
      </Grid>
    )
  }
}

class Profile extends Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
        <h1 align="center">Tutor Profile</h1>
          <Grid container spacing={4} style={{backgroundColor: '#FFFFFF', borderColor: '#DAA520'}}>
            <Disciplines />
            <MaxShifts />
            <LA />
            <ShiftsLastBlock />
          </Grid>
          <Grid container spacing={2}>
            <CurrentShifts />
            <PreferredShifts />
          </Grid>
        </ThemeProvider>
      </div>
    );
  }
}

export default Profile;
