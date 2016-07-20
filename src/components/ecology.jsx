import React, { PropTypes } from "react";
import API from "./api";
import Overview from "./overview";

export default class Ecology extends React.Component {
  renderAPI(source) {
    if (!source) {
      return null;
    }

    return (
      <div className="Documentation">
        <API source={source}/>
      </div>
    );
  }

  render() {
    const {
      copyToClipboard,
      customRenderers,
      exportGist,
      overview,
      playgroundtheme,
      scope,
      source
    } = this.props;

    return (
      <div className="Ecology">
        <div className="Overview">
          <Overview
            copyToClipboard={copyToClipboard}
            customRenderers={customRenderers}
            exportGist={exportGist}
            markdown={overview}
            playgroundtheme={playgroundtheme}
            scope={scope}
          />
        </div>
        {this.renderAPI(source)}
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
  copyToClipboard: PropTypes.bool,
  customRenderers: PropTypes.object,
  exportGist: PropTypes.bool,
  overview: PropTypes.string.isRequired,
  playgroundtheme: PropTypes.string,
  scope: PropTypes.object,
  source: PropTypes.object
};
