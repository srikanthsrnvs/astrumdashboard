import React from 'react';
import logo from './logo.svg';
import './App.css';
import PermanentDrawerLeft from './drawer';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignIn from './login'
import {FirebaseContext} from './components/Firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const THEME = createMuiTheme({
  typography: {
    "fontFamily": [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <FirebaseContext.Consumer>
              {firebase => <SignIn firebase={firebase}/>}
            </FirebaseContext.Consumer>
          </Route>
          <Route path="/dashboard">
            <PermanentDrawerLeft />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
