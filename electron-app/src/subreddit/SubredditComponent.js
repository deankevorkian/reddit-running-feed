/* @flow */

import React, {Component} from 'react';
import { Post } from '../core/reddit/Post';
import SubredditService from '../core/reddit/SubredditService';

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
    let relPosts = SubredditService.GetPosts(subredditName);
    this.setState(({
      posts: relPosts
    }));
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
