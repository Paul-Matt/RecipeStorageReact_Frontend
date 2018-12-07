import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import Login from './components/Login';
import Recipelist from './components/Recipelist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
          <Typography variant="h5" color="primary">
          RecipeList
          </Typography>
          </ Toolbar>
        </AppBar>
        <Login />
      </div>
    );
  }
}

export default App;
