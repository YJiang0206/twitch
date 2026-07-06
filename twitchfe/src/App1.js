import logo from "./logo.svg";
import "./App.css";
import React from "react";
class Child extends React.Component {
  render() {
    return <div>show child</div>;
  }
}
class App1 extends React.Component {
  //state
  state = {
    count: 0,
    colorIndex: 0,
    colors: ["red", "green", "yellow"],
    childState: false,
  };
  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  handleColor = () => {
    this.setState({
      colorIndex: (this.state.colorIndex + 1) % this.state.colors.length,
    });
  };
  handleChild = () => {
    this.setState({
      childState: !this.state.childState,
    });
  };
  render() {
    return (
      <>
        <div
          style={{
            backgroundColor: this.state.colors[this.state.colorIndex],
          }}
        >
          Hello
        </div>
        <div>{this.state.count}</div>
        <button onClick={this.handleClick}>Plus One</button>
        <button onClick={this.handleColor}>Change Background Color</button>
        <button onClick={this.handleChild}>Toggle Child</button>
        {this.state.childState && <Child />}
      </>
    );
  }
}

export default App1;
