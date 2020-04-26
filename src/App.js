import React from 'react';
import './App.css';
import Dashboard from './components/dashboard';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignIn from './components/login'
import {FirebaseContext} from './components/Firebase'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { useState } from 'react';
import ProjectBuilder from './components/projectBuilder';
import ReactGA from 'react-ga';
ReactGA.initialize('Your Unique ID');


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

  const [user, setUser] = useState("")

  function onSignIn(e){
    setUser(e)
  }

  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <FirebaseContext.Consumer>
              {firebase => <SignIn onSignIn={onSignIn} firebase={firebase}/>}
            </FirebaseContext.Consumer>
          </Route>
          <Route path="/dashboard" render={() => {
            if (!user){
              return (<Redirect to="/" />)
            }else{
              return(
                <FirebaseContext.Consumer>
                  {firebase => <Dashboard user={user} firebase={firebase}/>}
                </FirebaseContext.Consumer>
              )
            }
          }}>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
