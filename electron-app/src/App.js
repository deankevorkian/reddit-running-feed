/* @flow */

import React, {Component} from 'react';
import reddit from './reddit.png';
import './App.css';

import type { AppState } from './core/state/state';

import SubredditService from './core/reddit/SubredditService';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBarComponent from './core/navbar/NavBarComponent';
import FrontpageComponent from './frontpage/FrontpageComponent';
import SubredditComponent from './subreddit/SubredditComponent'

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

class App extends Component<void, void, AppState> {

  state: AppState;
  agentFactory: SubredditService;

  constructor() {
    super();
    this.state = {
      subredditsScrollSpot: new Map(),
      visitedSubsContent: new Map(),
      subreddits: []/*["programming", "me_irl", "meirl"]*/,
      agent: null
    };
  }

  componentDidMount() {
    this.agentFactory = new SubredditService();
    this.agentFactory.getAgent().then(newAgent => this.setState(({
      agent: newAgent
    }))).then(() => {
      this.state.agent.getSubscriptions({/*limit: 50*/ show: "all"}).then(subs => {
        this.setState({subreddits: subs.map(sub => {
          return sub.display_name
        })});
      })
    });
  }

  render() {
    return (
      <Router>
        <div>
          <img src={reddit} className="App-logo" alt="logo" />
          <h2>Reddit Running Feed</h2>

          <NavBarComponent subreddits={this.state.subreddits} />

          <hr/>

          {this.state.subreddits.map(subReddit => {
            return (
              <PropsRoute key={subReddit} exact path={"/" + subReddit} component={SubredditComponent} subreddit={subReddit} agent={this.state.agent} />
            );
          })}
        </div>
      </Router>
    );
  }
}

export default App;
