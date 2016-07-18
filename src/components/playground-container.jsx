import React from "react";
import Playground from "component-playground";
import ExportGist from "./export-gist";

export default class PlaygroundContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {source: props.source};
  }
  render() {
    const {parent, scope, noRender, playgroundtheme, exportGist} = this.props;
    return (
      <div className="Interactive">
        {exportGist ? <ExportGist containerElement={parent} /> : ""}
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
  exportGist: React.PropTypes.bool
};
