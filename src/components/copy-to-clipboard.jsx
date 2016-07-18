/* eslint-disable max-len */
import React from "react";
import ReactDOM from "react-dom";
import Clipboard from "clipboard";

export default class CopyToClipboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.clipboard = new Clipboard(ReactDOM.findDOMNode(this.refs.copyToClipboard));
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    const { containerElement } = this.props;
    return (
      <button
        ref="copyToClipboard"
        className="copy-to-clipboard-button"
        data-clipboard-text={containerElement.getElementsByClassName("ecologyCode")[0].innerText}
      >
        Copy to Clipboard
      </button>
    );
  }
}

CopyToClipboard.propTypes = {
  containerElement: React.PropTypes.object
};
