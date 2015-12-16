/*global document:false*/
import React from "react";
import ReactDOM from "react-dom";
import Ecology from "../src/index";

import "./styles.styl";

class App extends React.Component {
  render() {
    return (
      <div className="demo">
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={require("json!./sample.json")}
          scope={{React, ReactDOM, SampleClass: require("./sample")}}
          playgroundtheme="blackboard"/>
      </div>
    );
  }
}

const content = document.getElementById("content");

ReactDOM.render(<App/>, content);
