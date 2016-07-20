import React from "react";
import Playground from "component-playground";
import ExportGist from "./export-gist";
import CopyToClipboard from "./copy-to-clipboard";

export default class PlaygroundContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
    this.setMessage = this.setMessage.bind(this);
  }

  setMessage(string) {
    this.setState({ message: string });
  }

  renderToolbar() {
    const { source, exportGist, copyToClipboard } = this.props;
    if (exportGist || copyToClipboard) {
      return (
        <div className="Toolbar">
          {exportGist ? <ExportGist source={source} setMessage={this.setMessage} /> : null}
          {copyToClipboard ? <CopyToClipboard source={source} /> : null}
          {this.state.message.length > 0 ?
            <span className="Toolbar-Message">{this.state.message}</span>
            : null}
        </div>
      );
    }
    return null;
  }

  render() {
    const { scope, source, noRender, playgroundtheme } = this.props;
    return (
      <div className="Interactive">
        {this.renderToolbar()}
        <Playground
          codeText={source}
          scope={scope}
          noRender={noRender}
          theme={playgroundtheme ? playgroundtheme : "monokai"}/>
      </div>
    );
  }
}

PlaygroundContainer.propTypes = {
  source: React.PropTypes.string,
  noRender: React.PropTypes.bool,
  playgroundtheme: React.PropTypes.string,
  scope: React.PropTypes.object,
  exportGist: React.PropTypes.bool,
  copyToClipboard: React.PropTypes.bool
};
