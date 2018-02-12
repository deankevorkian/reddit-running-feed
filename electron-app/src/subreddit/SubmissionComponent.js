import React from 'react';

import { Panel, Glyphicon } from 'react-bootstrap';

import Post from '../core/reddit/Post';

import {Row, Col} from 'react-bootstrap';

import './SubmissionComponent.css';

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
        <Row>
          <Col sm={3} md={2} lg={1}>
            <ul className="votes-holder">
              <li><Glyphicon glyph="arrow-up" /></li>
              <li>{this.props.submission.upvotes}</li>
              <li><Glyphicon glyph="arrow-down" /></li>
            </ul>
          </Col>

          <Col sm={9} md={10} lg={11}>
            <a href={this.props.submission.url}>
              <img src={this.props.submission.thumbnailUrl !== 'default' && this.props.submission.thumbnailUrl !== 'self' ? this.props.submission.thumbnailUrl: ""}></img>
              {this.props.submission.title}
            </a>
          </Col>
        </Row>
        </Panel>
      </div>
    );
  }
}
