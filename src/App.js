import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Recipelist from './components/Recipelist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">RecipeList</h1>
        </header>
        <Recipelist /> 
      </div>
    );
  }
}

export default App;
