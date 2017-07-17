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
  agentFactory: SubredditService;
  agent: snoowrap;

  constructor(props: Props) {
    super(props);
    this.state = {
      posts: []
    };
    this.agentFactory = new SubredditService();
  }

  componentWillUpdate(nextProps: Props, nextState: State) {

  }

  componentDidMount() {
    this.agentFactory.getAgent().then(newAgent => {
        this.agent = newAgent;
        this.getPosts();
      });
  }

  getPosts() {
    this.agent.getHot(this.props.subreddit).then(submissions => {
      submissions.map(submission => {
        return {
          author: submission.author.name,
          title: submission.title,
          content: 'this is a placeholder for actual content lmfao',
          upvotes: submission.ups,
          downvotes: submission.downs,
          gold: submission.gilded
        }
      })
      console.log(submissions);
    });
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
