import React, { Component } from 'react';
import logo from './logo.svg';
import reddit from './reddit.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={reddit} className="App-logo" alt="logo" />
          <h2>Reddit Running Feed</h2>
        </div>
        <p className="App-intro">
          {/* To get started, edit <code>src/App.js</code> and save to reload. */}
        </p>
      </div>
    );
  }
}

export default App;
