import React from "react";
import API from "./api";
import Overview from "./overview";

export default class Ecology extends React.Component {
  render() {
    return (
      <div className="Ecology">
        <div className="Overview">
          <Overview markdown={this.props.overview} scope={this.props.scope}/>
        </div>
        <div className="Documentation">
          <API source={this.props.source} playgroundtheme={this.props.playgroundtheme}/>
        </div>
      </div>
    );
  }
}

Ecology.propTypes = {
  overview: React.PropTypes.string,
  playgroundtheme: React.PropTypes.string,
  source: React.PropTypes.object,
  scope: React.PropTypes.object
};
