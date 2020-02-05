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



class PreferencesAdmin extends Component {
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
      <div>
      <ThemeProvider theme={theme}>
      <h1 align="center">Block 6 Preferred Shifts (Admin)</h1>
        <Grid container spacing={2}>
          <Grid item xs>
            <p>Monday: {moment().isoWeekday(1).format('MM/DD')}</p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">2-4</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Monday 2-4)</h4>
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
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">4-6</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Monday 4-6)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">6-8</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Monday 6-8)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">8-10</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Monday 8-10)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
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
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Tuesday 2-4)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">4-6</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Tuesday 4-6)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">6-8</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Tuesday 6-8)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">8-10</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Tuesday 8-10)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
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
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Wednesday 2-4)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">4-6</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Wednesday 4-6)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">6-8</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Wednesday 6-8)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">8-10</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Wedesnday 8-10)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
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
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Thursday 2-4)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">4-6</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Thursday 4-6)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">6-8</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Thursday 6-8)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">8-10</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Thursday 8-10)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
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
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Sunday 2-4)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">4-6</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Sunday 4-6)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">6-8</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Sunday 6-8)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
                    </div>
                  )}
                </Popup>
            </Grid>
            <p></p>
            <Grid item xs>
                <Popup trigger={<Button size="large" color="primary" borderColor="secondary.main" variant="outlined" fullWidth="true">8-10</Button>} modal={true}>
                  {close => (
                    <div>
                      <h4>Current Preferences Entered By Tutors:</h4>
                      <p>Put list of preferred shifts here: (users: discipline)</p>
                      <h4>Add Preferred Shift (Sunday 8-10)</h4>
                      <Grid item xs>
                        <FormControl style={{minWidth: 200}}>
                          <InputLabel>Discipline</InputLabel>
                          <Select color="primary" variant="outlined">
                            <MenuItem>Computer Science</MenuItem>
                            <MenuItem>Mathmematics</MenuItem>
                            <MenuItem>Physics</MenuItem>
                          </Select>
                          <FormHelperText>Required</FormHelperText>
                          <Button size="medium" color="primary" vairant="filled" startIcon={<SaveIcon />}>save</Button>
                        </FormControl>
                      </Grid>
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

export default Preferences;
