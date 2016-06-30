import React from "react";
import API from "./api";
import Overview from "./overview";

export default class Ecology extends React.Component {
  renderAPI(source) {
    if (source) {
      return (
        <div className="Documentation">
          <API source={this.props.source}/>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="Ecology">
        <div className="Overview">
          <Overview
            markdown={this.props.overview}
            scope={this.props.scope}
            rendererOverrides={this.props.rendererOverrides}
            playgroundtheme={this.props.playgroundtheme}/>
        </div>
        {this.renderAPI(this.props.source)}
      </div>
    );
  }
}

Ecology.propTypes = {
  overview: React.PropTypes.string,
  playgroundtheme: React.PropTypes.string,
  rendererOverrides: React.PropTypes.array,
  source: React.PropTypes.object,
  scope: React.PropTypes.object
};
