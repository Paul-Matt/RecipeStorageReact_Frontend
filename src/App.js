import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Recipelist from './components/Recipelist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">RecipeList</h1>
        </header>
        <Recipelist /> 
        <Login />
      </div>
    );
  }
}

export default App;
