/* @flow */

import React, {Component} from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';
import { Post } from '../core/reddit/Post';
import SubredditService from '../core/reddit/SubredditService';
import './SubredditComponent.css';

type Props = {
  subreddit: string
};
type State = {
  posts: Post[],
  agent: any
};

export default class SubbredditComponent extends Component<void, Props, State> {
  state: State;
  agentFactory: SubredditService;

  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
      agent: null
    };
  }

  componentDidUpdate(prevProps : Props, prevState : State) {
    if (prevState.agent == null) {
      this.getPosts();
    }
  }

  componentDidMount() {
    this.agentFactory = new SubredditService();
    this.agentFactory.getAgent().then(newAgent => this.setState(({
      agent: newAgent
    })));
  }

  getPosts() {
    this.state.agent.getHot(this.props.subreddit).then(submissions => {
      this.setState(({
        posts: submissions.map(submission => {
          return {
            submissionId: submission.id,
            author: submission.author.name,
            title: submission.title,
            upvotes: submission.ups,
            downvotes: submission.downs,
            gold: submission.gilded,
            thumbnailUrl: submission.thumbnail,
            thumbnailHeight: submission.thumbnail_height,
            thumbnailWidth: submission.thumbnail_width,
            url: submission.url
          }
        })
      }));

      console.log(submissions);
    });
  }

  render() {
    return (
      <div>
        {this.state.posts.map((post) => {
          return (
            <div key={post.submissionId}>
              <Panel header={post.author} bsStyle="primary">
                <Glyphicon glyph="arrow-up">{post.upvotes}</Glyphicon>
                <Glyphicon glyph="arrow-down">{post.downvotes}</Glyphicon>
                <a href={post.url}>
                  <img src={post.thumbnailUrl} alt={post.title}></img>{post.title}
                </a>
              </Panel>
            </div>
          )
        })}
      </div>
    );
  }
}
