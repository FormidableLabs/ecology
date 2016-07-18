import React from "react";
import Playground from "component-playground";
import ExportGist from "./export-gist";

export default class PlaygroundContainer extends React.Component {
  render() {
    const {scope, source, noRender, playgroundtheme, exportGist} = this.props;
    return (
      <div className="Interactive">
        {exportGist ? <ExportGist source={source} /> : null}
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
  exportGist: React.PropTypes.bool
};
