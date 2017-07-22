/* @flow */

import React from 'react';
import {NavItem, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

type Props = {
 subreddits: string[]
};
type State = {
  key: number
};

export default class NavBarComponent extends React.Component<void, Props, State> {
  state : State;

  constructor(props: Props) {
    super(props);
    this.state = {
      key: 1
    };
  }

  handleSelect(selectedKey: number) {
    this.setState(({key: selectedKey}));
    console.log(selectedKey + " this lol");
  }

  render() {
    return (
      <Nav bsStyle="pills" activeKey={this.state.key} onSelect={() => this.handleSelect}>

        {this.props.subreddits.map((sub, index) => {
          return (
            <LinkContainer key={sub} exact={true} to={"/" + sub}>
              <NavItem eventKey={index + 1}>{sub}</NavItem>
            </LinkContainer>
          );
        })}

        <LinkContainer exact={true} to="/">
          <NavItem eventKey={1}>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/about">
          <NavItem eventKey={2}>About</NavItem>
        </LinkContainer>
        <LinkContainer to="/topics">
          <NavItem eventKey={3}>Topics</NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}
