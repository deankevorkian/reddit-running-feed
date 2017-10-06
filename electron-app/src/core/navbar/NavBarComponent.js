/* @flow */

import React from 'react';
import {NavItem, Nav, Tab} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

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


    <Nav bsStyle="pills" activeKey={this.state.key} onSelect={() => this.handleSelect} stacked>

      {this.props.subreddits.map((sub, index) => {
        return (
          <LinkContainer key={sub} exact={true} to={"/" + sub}>
            <NavItem eventKey={index + 1}>{sub}</NavItem>
          </LinkContainer>
        );
      })}
    </Nav>
    );
  }
}
