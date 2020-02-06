import React, { Component } from "react";
import Popup from "reactjs-popup"
import { Button } from "@material-ui/core";
import { Table } from "@material-ui/core";
import { TableRow, TableHead, TableCell } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import orange from '@material-ui/core/colors/purple';
import moment from "moment";
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
        <h2 id="blockcalendar" align="center">Block 5 Shifts</h2>
        <Table id="calendar" padding="dense" fontWeight="fontWeightBold">
          <TableHead>
            <TableCell>M: {moment().isoWeekday(1).format('MM/DD')}</TableCell>
            <TableCell>Tu: {moment().isoWeekday(2).format('MM/DD')}</TableCell>
            <TableCell>W: {moment().isoWeekday(3).format('MM/DD')}</TableCell>
            <TableCell>Th: {moment().isoWeekday(4).format('MM/DD')}</TableCell>
            <TableCell>F/Sa: {moment().isoWeekday(5).format('MM/DD')}-{moment().isoWeekday(6).format('MM/DD')}</TableCell>
            <TableCell>Su: {moment().isoWeekday(7).format('MM/DD')}</TableCell>
          </TableHead>
          <TableRow>
            <TableCell>
              <Popup trigger={<Button color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">2-4 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Monday 2-4 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>2-4 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Tuesday 2-4 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>2-4 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Wednesday 2-4 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>2-4 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Thursday 2-4 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell></TableCell>

            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>2-4 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Sunday 2-4 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>4-8 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Monday 4-8 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>4-6 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Tuesday 4-6 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>4-8 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Wednesday 4-8 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>4-6 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Thursday 4-6 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell></TableCell>

            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>4-6 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Monday 4-6 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>6-8 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Monday 6-8 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>6-8 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Tuesday 6-8 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>6-8 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Wednesday 6-8 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>6-8 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Thursday 6-8 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell></TableCell>

            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>6-8 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Sunday 6-8 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>8-10 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Monday 8-10 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>8-10 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Tuesday 8-10 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>8-10 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Wednesday 8-10 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>8-10 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Thursday 8-10 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
            <TableCell></TableCell>

            <TableCell>
              <Popup trigger={<Button color="primary" variant="outlined" fullWidth>8-10 Shift</Button>} modal={true}>
                {close => (
                  <div>
                    <h2 id="shifttitle">Scheduled Shifts</h2>
                    <p id="shiftpopup">Put Sunday 8-10 shifts from database
                      with tutors and their disiplines here.
                    </p>
                  </div>
                )}
              </Popup>
            </TableCell>
          </TableRow>
        </Table>
        </ThemeProvider>
      </div>
    );
  }
}

export default Home;
