/* @flow */

import React, {Component} from 'react';
import { Post } from '../core/reddit/Post';
import SubredditService from '../core/reddit/SubredditService';
import snoowrap from 'snoowrap';

type Props = {
  subreddit: string
};
type State = {
  posts: Post[]
};

export default class SubbredditComponent extends Component<void, Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    let subredditName: string = this.props.subreddit;
    let service = new SubredditService();

    /*let relPosts = service.GetPosts(subredditName);
    this.setState(({
      posts: relPosts
    }));*/
  }

  render() {
    return (
      <div>
        {this.state.posts.map((post) => {
          return (
            <h1>{post.author + ", " + post.content}</h1>
          )
        })}
      </div>
    );
  }
}
