/* @flow */

import React from 'react';
import {NavItem, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

type Props = {
 /* ... */
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
