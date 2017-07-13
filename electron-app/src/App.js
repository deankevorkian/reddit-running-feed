/* @flow */

import React, {Component} from 'react';
import reddit from './reddit.png';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBarComponent from './core/navbar/NavBarComponent';
import FrontpageComponent from './frontpage/FrontpageComponent';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <img src={reddit} className="App-logo" alt="logo" />
          <h2>Reddit Running Feed</h2>

          <NavBarComponent />

          <hr/>

          <Route exact path="/" component={FrontpageComponent}/>
          <Route path="/about" component={FrontpageComponent}/>
          <Route path="/topics" component={FrontpageComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
