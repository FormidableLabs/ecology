/*global document:false*/
import React from "react";
import {Ecology} from "../src/index";
import SampleComponent from "!!raw!../src/sample";

class App extends React.Component {
  render() {
    return (
      <div className="demo">
        <Ecology target={SampleComponent} />
      </div>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
