import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

let intervalID = "";
const Child = () => {
  const [count, setCount] = useState(true);
  useEffect(() => {
    return () => {
      console.log("Child will unmoount");
    };
  }, []);
  const handleIncrease = () => {
    setCount(count + 1);
  };
  return <button onClick={handleIncrease}>Child +1</button>;
};

// function rather than class
const App = () => {
  const [showChild, setShowChild] = useState(true);
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("App did mount or count has been changed");
  }, [count]);
  const handleClick = () => {
    setShowChild(!showChild);
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  return (
    <>
      <button onClick={handleClick}>toggle child</button>
      <button onClick={handleIncrease}> + 1</button>
      <div>count: {count}</div>
      {showChild && <Child />}
    </>
  );
};

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
