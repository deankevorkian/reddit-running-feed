/* @flow */

import React from 'react';
import {NavItem, Nav, Tab} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import MediaQuery from 'react-responsive';

import './NavBarComponent.css';

type Props = {
 subreddits: string[]
};
type State = {
  key: number
};

export default class NavBarComponent extends React.Component<Props, State> {
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
    let items = this.props.subreddits.map((sub, index) => {
      return (
        <LinkContainer key={sub} exact={true} to={"/" + sub}>
          <NavItem eventKey={index + 1}>{sub}</NavItem>
        </LinkContainer>
      );
    });

    return (
      // <Nav bsStyle="pills" activeKey={this.state.key} onSelect={() => this.handleSelect}>
      //
      //   {this.props.subreddits.map((sub, index) => {
      //     return (
      //       <LinkContainer key={sub} exact={true} to={"/" + sub}>
      //         <NavItem eventKey={index + 1}>{sub}</NavItem>
      //       </LinkContainer>
      //     );
      //   })}
      // </Nav>
    <div>
      <MediaQuery maxWidth={990}>
        <Nav bsStyle="pills" activeKey={this.state.key} onSelect={() => this.handleSelect} className="horizontal-menu">
          {items}
        </Nav>
      </MediaQuery>

      <MediaQuery minWidth={991}>
        <Nav className="vertical-menu" stacked bsStyle="pills" activeKey={this.state.key} onSelect={() => this.handleSelect}>
          {items}
        </Nav>
      </MediaQuery>
    </div>
    );
  }
}
