import React, { Component } from "react";
import Popup from "reactjs-popup"
import { Button } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import orange from '@material-ui/core/colors/purple';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import "../Home.css";
import { borders } from '@material-ui/system';
import { FormControl } from '@material-ui/core';
import { NativeSelect } from '@material-ui/core';
import { MenuItem, Select, InputLabel, FormHelperText } from '@material-ui/core';
import * as $ from 'jquery'
import { Request } from '../Request.js'
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

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
  },
});

class UpdateLA extends React.Component {
  state = {
    selected: null,
    hasError: false,
    isActive: true,
    isAdd: true,
    all_users: null,
    selected_two: null,
    add_user_popup: null
  };
  handleChange(value) {
    this.setState({ selected: value });
  }
  handleChange2(value){
    this.setState({ selected_two: value });
  }
  componentDidMount() {
    $.post("post", {input: "SELECT username FROM users WHERE isAdmin=0", category:"get_username"}, function(data){this.setState({all_users: data});}.bind(this));
  }
  handleClick() {
    this.setState({ hasError: false });
    if (!this.state.selected && !this.state.selected_two) {
      this.setState({ hasError: true });
    }
    else { 
     $.post("post", {input: `UPDATE users SET isLA='${this.state.selected_two}' WHERE username='${this.state.selected}'`, category:"add_user"}, function(data){this.setState({add_user_popup: data});}.bind(this));
    }
  }
  render() {
    const { classes } = this.props;
    const { selected, selected_two, hasError, isActive, add_user_popup } = this.state;
    var split_users;
    var array = [];
    if (this.state.all_users !== null) {
      split_users = this.state.all_users.split(" ");
      for(var i = 0; i < split_users.length - 1; i++) {
        const item = <MenuItem value={split_users[i]}>{split_users[i]}</MenuItem>;
        array.push(item)
      }
    }
    const la_list= [<MenuItem value={1}>Yes</MenuItem>,
            <MenuItem value={0}>No</MenuItem>]
    if(this.state.isActive) {
      return (
        <div align="center">
        <Grid>
        <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">Update LA Status</Button>} modal={true}>
          {close => (
            <div align="center">
              <h3 align="center">Update Tutor LA Status</h3>
              <Grid container spacing={1}>
                <Grid item xs>
                  <h3>Enter Username</h3>
                    <FormControl style={{minWidth: 200}} error={hasError}>
                      <InputLabel>Username</InputLabel>
                      <Select value={selected} onChange={event => this.handleChange(event.target.value)}>
                        {array}
                      </Select>
                     </FormControl>
                   </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs>
                 <h3>LA Last Block?</h3>
                   <FormControl style={{minWidth: 200}} error={hasError}>
                     <InputLabel>Learning Assistant</InputLabel>
                      <Select value={selected_two} onChange={event => this.handleChange2(event.target.value)}>
                        {la_list}
                      </Select>
                   </FormControl>
                </Grid>
              </Grid>
             <Grid container spacing={12}>
                <Grid item xs={12}>
                  <p></p>
                  <Popup onOpen={() => this.handleClick()} trigger={<Button size="large" color="primary" variant="outlined" startIcon={<SaveIcon />}>save</Button>}>
                    {close => (
                      <p>{add_user_popup}</p>
                    )}
                  </Popup>
                  <p></p>
                </Grid>
              </Grid>
            </div>
          )}
        </Popup>
       </Grid>
       </div>
    )}
  }
}

class TutorList extends React.Component {
  render() {
    return (
      <Grid item xs style={{overflow: 'auto'}}>
        <h3 align="center">All Tutors</h3>
        <Typography noWrap><Request type="get_all_tutors" sent={"SELECT * FROM users WHERE isAdmin=0"}/></Typography>
      </Grid>
    )
  }
}

class AdminList extends React.Component {
  render() {
    return (
      <Grid item xs style={{overflow: 'auto'}}>
        <h3 align="center">All Admins</h3>
        <Typography noWrap><Request type="get_all_tutors" sent={"SELECT * FROM users WHERE isAdmin=1"}/></Typography>
      </Grid>
    )
  }
}

class ScheduleShifts extends React.Component {
  state = {
    selected: null,
    hasError: false,
    add_user_popup: null
  };
  handleChange(value) {
    this.setState({ selected: value });
  }
  handleClick(value) {
    this.setState({ hasError: false });
    if (!this.state.selected) {
      this.setState({ hasError: true });
    }
    else{
      var full_request='UPDATE currentBlock SET currentBlock=\'' + value + '\' WHERE id=\'1\''
      $.post("post", {input: full_request, category: "schedule_shifts"});
    }
  } 
  render() {
    const { classes } = this.props;
    const { selected, add_user_popup, hasError } = this.state;
    var id=this.props.getId;
    const list= [<MenuItem value={1}>Block 1</MenuItem>,
            <MenuItem value={2}>Block 2</MenuItem>,
            <MenuItem value={3}>Block 3</MenuItem>,
            <MenuItem value={4}>Block 4</MenuItem>,
            <MenuItem value={5}>Block 5</MenuItem>,
            <MenuItem value={6}>Block 6</MenuItem>,
            <MenuItem value={7}>Block 7</MenuItem>,
            <MenuItem value={8}>Block 8</MenuItem>]
    return (
      <Grid>
        <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">Schedule Shifts</Button>} modal={true}>
          {close => (
            <div align="center">
              <h3 align="center">Click "Confirm" to Schedule Shifts for Next Block</h3>
              <FormControl style={{minWidth: 200}} error={hasError}>
                <InputLabel>Current Block</InputLabel>
                <Select value={selected} onChange={event => this.handleChange(event.target.value)}>
		 {list}
                </Select>
              </FormControl>
             <Grid container spacing={12}>
                <Grid item xs={12}>
                  <p></p>
                    <Popup onOpen={() => this.handleClick(this.state.selected)} trigger={<Button size="large" color="primary" variant="outlined" startIcon={<SaveIcon />}>Confirm</Button>}>
                      {close => (
                        <p>{add_user_popup}</p>
                      )}
                    </Popup>
                  <p></p>
                </Grid>
              </Grid>
            </div>
          )}
        </Popup>
      </Grid>
    )
  }
}

class AddUser extends React.Component {
  state = {
    selected: null,
    selected_admin: null,
    username_text: null,
    fullname_text: null,
    hasError: false,
    isActive: true,
    isAdd: true,
    all_users: null,
    add_user_popup: null
  };
  handleChange(value) {
    this.setState({ username_text: value });
  }
  handleChange2(value) {
    this.setState({ fullname_text: value });
  }
  handleChange3(value) {
    this.setState({ selected: value });
  }
  handleChange4(value) {
    this.setState({ selected_admin: value });
  }
  handleClick() {
    $.post("post",  {input: `INSERT INTO users (username, isLA, isAdmin, name) VALUES ('${this.state.username_text}','${this.state.selected}','${this.state.selected_admin}','${this.state.fullname_text}')`, category:"add_user"}, function(data){this.setState({add_user_popup: data});}.bind(this)); 
  }
  render(){
    const { classes } = this.props;
    const { selected, selected_admin, hasError, isActive, username_text, fullname_text, add_user_popup } = this.state;
    const la_list= [<MenuItem value={1}>Yes</MenuItem>,
           <MenuItem value={0}>No</MenuItem>]
    const admin_tutor_list= [<MenuItem value={1}>Admin</MenuItem>,
           <MenuItem value={0}>Tutor</MenuItem>]
    if(this.state.isActive) {
     return (
       <div align="center">
       <Grid>
        <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">Add New User</Button>} modal={true}>
          {close => (
            <div align="center">
              <h2 align="center">Add New User</h2>
              <Grid container spacing={12} justify="center" style={{overflow: 'auto'}}>
                <Grid item xs={4}>
                <div align="center">
                <Grid item xs justify="center">
                  <h3>Enter Username</h3>
                    <form autoComplete="off">
                      <FormControl>
                        <InputLabel>Username</InputLabel>
                        <Input value={username_text} onChange={event => this.handleChange(event.target.value)} />
                      </FormControl>
                    </form>
                </Grid>
                <Grid item xs justify="center">
                   <h3>Enter Name</h3>
                    <form noValidate autoComplete="off">
                      <FormControl>
                        <InputLabel>Name</InputLabel>
                        <Input value={fullname_text} onChange={event => this.handleChange2(event.target.value)} />
                      </FormControl>
                    </form>
                </Grid>
                <Grid item xs justify="center">
                  <h3>LA?</h3>
                   <FormControl style={{minWidth: 100}}>
                     <InputLabel>LA</InputLabel>
                      <Select value={selected} onChange={event => this.handleChange3(event.target.value)}>
                        {la_list}
                      </Select>
                   </FormControl>
                </Grid>
                <Grid item xs justify="center">
                   <h3>Admin or Tutor</h3>
                   <FormControl style={{minWidth: 100}}>
                     <InputLabel>Admin/Tutor</InputLabel>
                      <Select value={selected_admin} onChange={event => this.handleChange4(event.target.value)}>
                        {admin_tutor_list}
                      </Select>
                   </FormControl>
                </Grid>
                </div>
                </Grid>
                <Grid container spacing={12}>
                  <Grid item xs={12}>
                    <p></p>
                    <Popup onOpen={() => this.handleClick()} trigger={<Button size="large" color="primary" variant="outlined" startIcon={<SaveIcon />}>save</Button>}>
                      {close => (
                        <p>{add_user_popup}</p>
                      )}
                    </Popup>
                    <p></p>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </Popup>
       </Grid>
      </div>
    )}
  }
}

class RemoveTutor extends React.Component {
  state = {
    selected: null,
    hasError: false,
    isActive: true,
    isAdd: true,
    all_users: null,
    add_user_popup: null
  };
  handleChange(value) {
    this.setState({ selected: value });
  }
  componentDidMount(){
    $.post("post", {input: "SELECT username FROM users", category:"get_username"}, function(data){this.setState({all_users: data});}.bind(this));
  }
  handleClick() {
    this.setState({ hasError: false });
    if (!this.state.selected) {
      this.setState({ hasError: true });
    }
    else { 
      $.post("post", {input: `$DELETE FROM BusyShifts WHERE username='${this.state.selected}'$DELETE FROM assignedshifts WHERE username='${this.state.selected}'$DELETE FROM preferredshifts WHERE username='${this.state.selected}'$DELETE FROM discipline WHERE username='${this.state.selected}'$DELETE FROM users WHERE username='${this.state.selected}'`, category:"clear_tutor"});
    }
  }
  render(){
    const { classes } = this.props;
    const { selected, add_user_popup, hasError, isActive } = this.state;
    var split_users;
    var array = [];
    if (this.state.all_users !== null) {
      split_users = this.state.all_users.split(" ");
      for(var i = 0; i < split_users.length - 1; i++) {
        const item = <MenuItem value={split_users[i]}>{split_users[i]}</MenuItem>;
        array.push(item)
      }
    }
    if(this.state.isActive) {
     return (
       <Grid>
       <div align="center">
       <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">Remove User</Button>} modal={true}>
         {close => (
           <div>
             <h2 align="center">Remove User</h2>
             <Grid container spacing={1}>
               <Grid item xs>
                 <h3>Username to Delete:</h3>
                 <FormControl style={{minWidth: 200}} error={hasError}>
                   <InputLabel>User</InputLabel>
                   <Select value={selected} onChange={event => this.handleChange(event.target.value)}>
                     {array}
                   </Select>
                 </FormControl>
               </Grid>
             </Grid>
             <Grid container spacing={12}>
                <Grid item xs={12}>
                  <p></p>
                    <Popup onOpen={() => this.handleClick()} trigger={<Button size="large" color="primary" variant="outlined" startIcon={<SaveIcon />}>Remove</Button>}>
                      {close => (
                        <p>{add_user_popup}</p>
                      )}
                    </Popup>
                  <p></p>
                </Grid>
              </Grid>
            </div>
          )}
        </Popup>
       </div>
       </Grid>
    )}
  }
}

class TutorDisciplines extends React.Component {
   state = {
    selected: null,
    hasError: false,
    isActive: true,
    isAdd: true,
    all_users: null,
    selected_two: null,
    add_user_popup: null
  };
  handleChange(value) {
    this.setState({ selected: value });
  }
  handleChange2(value){
    this.setState({ selected_two: value });
  }
  componentDidMount() {
    $.post("post", {input: "SELECT username FROM users WHERE isAdmin=0", category:"get_username"}, function(data){this.setState({all_users: data});}.bind(this));
  }
  handleClick() {
    this.setState({ hasError: false });
    if (!this.state.selected && !this.state.selected_two) {
      this.setState({ hasError: true });
    }
    else { 
     $.post("post", {input: `INSERT INTO discipline (discipline, username) VALUES ('${this.state.selected_two}','${this.state.selected}')`, category:"add_user"}, function(data){this.setState({add_user_popup: data});}.bind(this));
    }
  }
  handleClick2() {
    $.post("post", {input: `DELETE FROM discipline WHERE username='${this.state.selected}' AND discipline='${this.state.selected_two}'`, category:"add_user"}, function(data){this.setState({add_user_popup: data});}.bind(this));
  }
  render() {
    const { classes } = this.props;
    const { add_user_popup, selected, hasError, isActive, selected_two } = this.state;
    var split_users;
    var array = [];
    if (this.state.all_users !== null) {
      split_users = this.state.all_users.split(" ");
      for(var i = 0; i < split_users.length - 1; i++) {
        const item = <MenuItem value={split_users[i]}>{split_users[i]}</MenuItem>;
        array.push(item);
      }
    }
     const discipline_list=[<MenuItem value="COMPUTER_SCIENCE">Computer Science</MenuItem>,
            <MenuItem value="MATH">Math</MenuItem>,
            <MenuItem value="ECONOMICS">Economics</MenuItem>,
            <MenuItem value="PHYSICS">Physics</MenuItem>,
            <MenuItem value="CHEM">Chemistry</MenuItem>,
            <MenuItem value="M_BIOLOGY">Biology</MenuItem>,
            <MenuItem value="NEUROSCIENCE">Neuroscience</MenuItem>,
            <MenuItem value="E_SCIENCE">Environmental Science</MenuItem>,
            <MenuItem value="STATISTICS">Statistics</MenuItem>]
    if(this.state.isActive) {
      return (
        <Grid item xs>
         <div align="center">
          <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">Edit Tutor Discipline</Button>} modal={true}>
            {close => (
              <div>
                <h3 align="center">Add Disciplines for Tutor</h3>
                <Grid container spacing={2} justify="center">
                  <Grid item xs>
                    <FormControl style={{minWidth: 200}} error={hasError}>
                      <InputLabel>Username</InputLabel>
                      <Select value={selected} onChange={event => this.handleChange(event.target.value)}>
                        {array}
                      </Select>
                     </FormControl>
                   </Grid>
                   <Grid item xs>
                     <FormControl style={{minWidth: 200}} error={hasError}>
                       <InputLabel>Discipline</InputLabel>
                       <Select value={selected_two} onChange={event => this.handleChange2(event.target.value)}>
                         {discipline_list}
                       </Select>
                     </FormControl>
                   </Grid> 
                </Grid>
                <Grid container spacing={12}>
                  <Grid item xs={12}>
                    <Popup onOpen={() => this.handleClick()} trigger={<Button size="large" color="primary" variant="outlined" startIcon={<SaveIcon />}>Add</Button>}>
                      {close => (
                        <p>{add_user_popup}</p>
                      )}
                    </Popup>
                    <Popup onOpen={() => this.handleClick2()} trigger={<Button size="large" color="primary" variant="outlined" startIcon={<SaveIcon />}>Remove</Button>}>
                      {close => (
                        <p>{add_user_popup}</p>
                      )}
                    </Popup>
                  </Grid>
                </Grid>
              </div>
            )}
          </Popup>
         </div>
        </Grid>
     )}
   }
}



class ProfileAdmin extends Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
        <h1 align="center">{window.user_name} Profile</h1>
          <Grid container spacing={12} justify="space-between" style={{overflow: 'auto'}}>
            <Grid item xs={2}>
              <AddUser />
            </Grid>
            <Grid item xs={2}> 
              <RemoveTutor />
            </Grid>
            <Grid item xs={2}>
              <TutorDisciplines />
            </Grid>
            <Grid item xs={2}>
              <UpdateLA />
            </Grid>
            <Grid item xs={2}>
              <ScheduleShifts />
            </Grid>
          </Grid>
          <Grid container spacing={12} style={{maxHeight: 225, overflow: 'auto'}}>
            <Grid item xs={6}>
              <AdminList />
            </Grid>
            <Grid item xs={6}>
              <TutorList />
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    );
  }
}

export default ProfileAdmin;

