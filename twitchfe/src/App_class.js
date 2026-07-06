import logo from "./logo.svg";
import "./App.css";
import React from "react";

let intervalID = "";
class Child extends React.Component {
  componentDidMount() {
    // intervalID = setInterval(() => {
    //   console.log("interval");
    // }, 1000);
    console.log("child did mount");
  }
  componentWillUnmount() {
    clearInterval(intervalID);
    console.log("child will unmount");
  }
  render() {
    return <div>Child Component</div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("app constructor");
  }

  componentDidMount() {
    console.log("app did mount");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("app did update prevProps", prevProps);
    console.log("app did update prevState", prevState);
    console.log("app did update");
  }

  state = {
    showChild: true,
  };

  handleClick = () => {
    this.setState({
      showChild: !this.state.showChild,
    });
  };

  render() {
    console.log("app render");
    return (
      <>
        <button onClick={this.handleClick}>toggle child</button>
        {this.state.showChild && <Child />}
      </>
    );
  }
}

export default App;

// function Child(props) {
//   console.log("props", props);
//   return (
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   );
// }
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <Child propa="a" propb={1} />
//       </header>
//     </div>
//   );
// }

// import logo from "./logo.svg";
// import "./App.css";
// import React from "react";

// class App extends React.Component {
//   state = {
//     count: 0,
//     x: 5,
//   };

//   handleClick = () => {
//     this.setState({
//       count: this.state.count + 1,
//     });
//   };

//   render() {
//     return (
//       <>
//         <div>{this.state.count}</div>
//         <button onClick={this.handleClick}>plus one</button>
//       </>
//     );
//   }
// }

// export default App;
