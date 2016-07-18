import React from "react";
import API from "./api";
import Overview from "./overview";

export default class Ecology extends React.Component {
  renderAPI() {
    return (
      <div className="Documentation">
        <API source={this.props.source}/>
      </div>
    );
  }
  render() {
    return (
      <div className="Ecology">
        <div className="Overview">
          <Overview
            copyToClipboard={this.props.copyToClipboard}
            customRenderers={this.props.customRenderers}
            exportGist={this.props.exportGist}
            markdown={this.props.overview}
            playgroundtheme={this.props.playgroundtheme}
            scope={this.props.scope}
          />
        </div>
        {this.props.source ? this.renderAPI() : null}
      </div>
    );
  }
}

Ecology.defaultProps = {
  exportGist: false,
  copyToClipboard: false,
  customRenderers: null
};

Ecology.propTypes = {
  copyToClipboard: React.PropTypes.bool,
  customRenderers: React.PropTypes.object,
  exportGist: React.PropTypes.bool,
  overview: React.PropTypes.string.isRequired,
  playgroundtheme: React.PropTypes.string,
  scope: React.PropTypes.object,
  source: React.PropTypes.object
};
