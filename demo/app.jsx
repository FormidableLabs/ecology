/*global document:false*/
import React from "react";
import {Ecology} from "../src/index";

class App extends React.Component {
  render() {
    return (
      <div className="demo">
        < Ecology />
      </div>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
