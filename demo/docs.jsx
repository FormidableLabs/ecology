/*global document:false*/
import React from "react";
import ReactDOM from "react-dom";
import Ecology from "../src/index";
import * as docgen from "react-docgen";
import SampleClass from "./sample";

import "./styles.styl";

const option1 = "hello";
const option2 = "greetings";
const option3 = "goodbye";
const option4 = "dat";
const option5 = "be";
const option6 = "cool";


class Docs extends React.Component {
  render() {
    return (
      <div className="demo">
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!./sample"))}
          scope={{
            React,
            ReactDOM,
            SampleClass,
            option1,
            option2,
            option3,
            option4,
            option5,
            option6
          }}
          playgroundtheme="blackboard"/>
      </div>
    );
  }
}

ReactDOM.render(<Docs/>, document.getElementById("content"));
