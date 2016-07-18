import React from "react";

export default class CopyToClipboard extends React.Component {
  copyToClipboard() {
    const {containerElement} = this.props;
  }

  render() {
    return (
      <button
        className="copy-to-clipboard-button"
        onClick={this.copyToClipboard.bind(this)}>
        Copy To Clipboard
      </button>
    );
  }
}

ExportGist.propTypes = {
  containerElement: React.PropTypes.object
};
