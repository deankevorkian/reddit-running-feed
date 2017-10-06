import React from 'react';

import { Panel, Glyphicon } from 'react-bootstrap';

import Post from '../core/reddit/Post';

type State = {

};

type Props = {
  submission : Post;
};

export default class SubmissionComponent extends React.Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div key={this.props.submission.submissionId}>
        <Panel header={this.props.submission.author} bsStyle="primary">
          <Glyphicon glyph="arrow-up">{this.props.submission.upvotes}</Glyphicon>
          <Glyphicon glyph="arrow-down">{this.props.submission.downvotes}</Glyphicon>
          <a href={this.props.submission.url}>
            <img src={this.props.submission.thumbnailUrl !== 'default' && this.props.submission.thumbnailUrl !== 'self' ? this.props.submission.thumbnailUrl: ""} alt={this.props.submission.title}></img>{this.props.submission.title}
          </a>
        </Panel>
      </div>
    );
  }
}
