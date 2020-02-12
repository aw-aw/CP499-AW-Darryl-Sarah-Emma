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
    this.setState({ hasError: false });
    if (!this.state.selected) {
      this.setState({ hasError: true });
    }
    else { 
      $.post("post", {input: `INSERT INTO preferredshifts (shift,username,discipline) VALUES ('${this.props.short_shift}','${window.user_name}','${this.state.selected}')`, category:"button"});
    }
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
                  <Request type="get_pref_shifts" sent={"SELECT * FROM preferredshifts WHERE shift = \'" + short_shift + "\';"}/>
                </div>
                <Grid item xs>
                  <FormControl align="center" style={{minWidth: 200}} error={hasError}> 
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

class PreferencesAdmin extends Component{
  state={current_block:null};
  componentDidMount(){
    $.post("post",{input:"SELECT currentBlock FROM currentBlock WHERE id=1",category:"get_next_block"},function(data){this.setState({current_block:data});}.bind(this));
  } 
   render() {
     const { current_block }=this.state;
    return (
     <div>
      <ThemeProvider theme={theme}>
        <h1 align="center">Discipline Framework</h1>
        <h3 align="center">Key:</h3>
         <Grid container style={{height:200}} spacing={2} justify="center">
           <Grid item style={{height:25}} xs>
             <h5 align="left">Ch = Chemistry</h5>
             <p style={{height:0}}><b>Sunday</b></p>
             <Grid container borderRadius="borderRadius" spacing={0} direction="column" justify="center">
               <Grid item style={{height:25}} xs>
                <p>2-4: Ch M E</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                <p>4-6: Ch CS E M P</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                <p>6-8: Ch CS M</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                <p>8-10: Ch CS E M P</p>
               </Grid>
             </Grid>
           </Grid>
           <Grid item style={{height:25}} xs>
             <h5 align="left">CS = Computer Science</h5>
             <p style={{height:0}}><b>Monday</b></p>
             <Grid container direction="column" spacing={0} justify="center">
               <Grid item style={{height:25}} xs>
                 <p>2-4: M</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                 <p>4-6: Ch CS P</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                 <p>6-8: Ch E M</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                 <p>8-10: Ch CS E M P</p>
               </Grid>
             </Grid>
           </Grid>
           <Grid item style={{height:25}} xs>
             <h5 align="left">E = Economics</h5>
             <p style={{height:0}}><b>Tuesday</b></p>
             <Grid container direction="column" spacing={0} justify="center">
               <Grid item style={{height:25}} xs>
                 <p>2-4: M</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                 <p>4-6: Ch CS E M P</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                 <p>6-8: Ch M P</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                 <p>8-10: Ch CS E P</p>
               </Grid>
             </Grid>
           </Grid>
           <Grid item style={{height:25}} xs justify="center">
             <h5 align="left">M = Mathematics</h5>
             <p style={{height:0}}><b>Wednesday</b></p>
             <Grid container direction="column" spacing={0} justify="center">
               <Grid item style={{height:25}} xs>
                 <p>2-4: M</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                 <p>4-6: Ch CS E M P</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                 <p>6-8: Ch CS M</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                 <p>8-10: Ch CS E M P</p>
               </Grid>
             </Grid>
           </Grid>
           <Grid item style={{height:25}} xs>
             <h5 align="left">P = Physics</h5> 
             <p style={{height:0}}><b>Thursday</b></p>
             <Grid container direction="column" spacing={0} justify="center">
               <Grid item style={{height:25}} xs>
                 <p>2-4: M</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                 <p>4-6: Ch CS E M P</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                 <p>6-8: Ch CS E M</p>
               </Grid>
               <Grid item style={{height:25}} xs>
                 <p>8-10: Ch CS E M P</p>
               </Grid>
             </Grid>
           </Grid>
         </Grid>
        <h1 align="center">Block {this.state.current_block} Preferred Shifts</h1>
        <Grid container spacing={2} justify="center">
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
        </Grid>
      </ThemeProvider>
    </div>
    );
  }
}

export default PreferencesAdmin;
