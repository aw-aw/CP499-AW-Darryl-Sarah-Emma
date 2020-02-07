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
import { FormControl } from '@material-ui/core';
import { NativeSelect } from '@material-ui/core';
import { MenuItem, Select, InputLabel, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as $ from 'jquery'
import { Request } from '../Request.js'

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
  render() {
    const { classes } = this.props;
    const { selected, hasError } = this.state;
    return (
      <Grid item xs>
        <h3 align="center">Max Shifts</h3>
        <FormControl style={{minWidth: 200}} error={hasError}>
          <InputLabel>Discipline</InputLabel>
          <Select value={selected} onChange={event => this.handleChange(event.target.value)}>
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={13}>13</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={17}>17</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={19}>19</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
          <Button onClick={() => this.handleClick()} size="medium" color="primary" variant="filled" startIcon={<SaveIcon />}>save</Button>
        </FormControl>
      </Grid>
    )
  }
}

class LA extends React.Component {
  render() {
    return (
      <Grid item xs>
        <h3 align="center">LA Last Block</h3>
        <p align="center">database</p>
      </Grid>
    )
  }
}

class ShiftsLastBlock extends React.Component {
  render() {
    return(
      <Grid item xs>
        <h3 align="center">Shifts Last Block</h3>
        <p align="center">database</p>
      </Grid>
    )
  }
}

class CurrentShifts extends React.Component {
  render() {
    return (
      <Grid item xs style={{backgroundColor: '#FFFFFF', color: 'black', borderColor: 'primary', borderRadius: 16}}>
        <h3 align="center">My Current Shifts Block 5</h3>
        <p align="center">database</p>
      </Grid>
    )
  }
}

class PreferredShifts extends React.Component {
  render() {
    return (
      <Grid item xs>
        <h3 align="center">My Preferred Shifts Block(database block #)</h3>
        <p align="center">database</p>
      </Grid>
    )
  }
}

class ProfileTutor extends Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
        <h1 align="center">(Name) Profile</h1>
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

export default ProfileTutor;
