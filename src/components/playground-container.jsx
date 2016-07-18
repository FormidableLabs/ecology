import React from "react";
import Playground from "component-playground";
import ExportGist from "./export-gist";
import CopyToClipboard from "./copy-to-clipboard";

export default class PlaygroundContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { source: props.source };
  }
  renderToolbar() {
    const { parent, exportGist, copyToClipboard } = this.props;
    if (exportGist || copyToClipboard) {
      return (
        <div className="Toolbar">
          {exportGist ? <ExportGist containerElement={parent} /> : null}
          {copyToClipboard ? <CopyToClipboard containerElement={parent} /> : null}
        </div>
      );
    }
    return null;
  }
  render() {
    const { scope, noRender, playgroundtheme } = this.props;
    return (
      <div className="Interactive">
        {this.renderToolbar()}
        <Playground
          codeText={this.state.source}
          scope={scope}
          noRender={noRender}
          theme={playgroundtheme ? playgroundtheme : "monokai"}/>
      </div>
    );
  }
}

PlaygroundContainer.propTypes = {
  parent: React.PropTypes.object,
  source: React.PropTypes.string,
  noRender: React.PropTypes.bool,
  playgroundtheme: React.PropTypes.string,
  scope: React.PropTypes.object,
  exportGist: React.PropTypes.bool,
  copyToClipboard: React.PropTypes.bool
};
