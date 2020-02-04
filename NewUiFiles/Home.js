import React, { Component } from "react";
import Popup from "reactjs-popup"
import { Button } from "@material-ui/core";
import { Table } from "@material-ui/core";
import { Grid, Typography, Paper } from "@material-ui/core";
import { TableRow, TableHead, TableCell } from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar } from "@material-ui/core";
import Icon from '@material-ui/core/Icon';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { createMuiTheme } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import orange from '@material-ui/core/colors/purple';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import "./Home.css";
import { borders } from '@material-ui/system';

const theme = createMuiTheme({
  tableCell: {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: '40pt',
    fontWeight: 'fontWeightBold',
  },
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
      <ThemeProvider theme={theme}>
        <h1 align="center">Block 5 Shifts</h1>
        <Grid container spacing={2}>
          <Grid item xs>
            <p>Monday: {moment().isoWeekday(1).format('MM/DD')}</p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">2-4</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2>Current Preferences Entered By Tutors:</h2>
                      <p>List of shifts here from database (user: discipline)</p>
                      <h2>Add Preferred Shift</h2>
                      <p><Button startIcon={<AddCircleIcon/>}>Add Preference</Button></p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">4-6</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 4-6 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">6-8</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 6-8 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">8-10</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 8-10 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
          </Grid>
          <Grid item xs>
            <p>Tuesday: {moment().isoWeekday(2).format('MM/DD')}</p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">2-4</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 2-4 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">4-6</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 4-6 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">6-8</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 6-8 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">8-10</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 8-10 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
          </Grid>
          <Grid item xs>
            <p>Wednesday: {moment().isoWeekday(3).format('MM/DD')}</p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">2-4</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 2-4 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">4-6</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 4-6 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">6-8</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 6-8 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">8-10</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 8-10 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
          </Grid>
          <Grid item xs>
            <p>Thursday: {moment().isoWeekday(4).format('MM/DD')}</p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">2-4</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 2-4 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">4-6</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 4-6 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">6-8</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 6-8 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">8-10</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 8-10 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
          </Grid>
          <Grid item xs>
            <p>Friday: {moment().isoWeekday(5).format('MM/DD')}</p>
          </Grid>
          <Grid item xs>
            <p>Saturday: {moment().isoWeekday(6).format('MM/DD')}</p>
          </Grid>
          <Grid item xs>
            <p>Sunday: {moment().isoWeekday(7).format('MM/DD')}</p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">2-4</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 2-4 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">4-6</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 4-6 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">6-8</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 6-8 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">8-10</Button>} modal={true}>
                  {close => (
                    <div>
                      <h2 id="shifttitle">Scheduled Shifts</h2>
                      <p id="shiftpopup">Put Monday 8-10 shifts from database
                        with tutors and their disiplines here.
                      </p>
                    </div>
                  )}
                </Popup>
            </Grid>
          </Grid>
        </Grid>
        </ThemeProvider>
      </div>
    );
  }
}

export default Home;
