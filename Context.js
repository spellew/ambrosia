import React, { Component } from 'react';

const Context = React.createContext();
export default Context.Consumer;

export class Provider extends Component {
  constructor() {
    super();

    this.state = {
      toggleDrawer: null,
      setToggleDrawer: (toggleDrawer) => this.setState({ toggleDrawer: toggleDrawer }),
    }
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}