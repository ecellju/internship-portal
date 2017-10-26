import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const App = () => (
  <MuiThemeProvider>
    <div style={{ width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            Internship Portal
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  </MuiThemeProvider>
);

export default App;
