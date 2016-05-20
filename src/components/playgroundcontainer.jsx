import React from "react";
import Playground from "component-playground";
import ExportGist from "./exportgist";

export default class PlaygroundContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {source: props.source};
  }
  render() {
    const {scope, noRender, playgroundtheme, exportGist} = this.props;
    return (
      <div className="Interactive">
        <Playground
          codeText={this.state.source}
          scope={scope}
          noRender={noRender}
          theme={playgroundtheme ? playgroundtheme : "monokai"}/>
        {exportGist ? <ExportGist source={this.state.source} /> : ""}
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

