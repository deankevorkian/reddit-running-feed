import React, {Component} from 'react';
import SubbredditComponent from '../subreddit/SubredditComponent';

class FrontpageComponent extends Component {
  render() {
    return(
      <SubbredditComponent subreddit="programming">

      </SubbredditComponent>
    );
  }
}

export default FrontpageComponent;
