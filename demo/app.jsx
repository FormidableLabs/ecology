/*global document:false*/
import React from "react";
import {Ecology, Overview} from "../src/index";
import SampleComponent from "!!raw!../src/sample";

class App extends React.Component {
  render() {
    return (
      <div className="demo">
        <Overview markdown={"### Hello world I'm a heading"}/>
        <Ecology target={SampleComponent} />
        <Playground/>
      </div>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
