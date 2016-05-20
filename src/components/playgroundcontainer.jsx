import React from "react";
import Playground from "component-playground";
import ExportGist from "./exportgist";
import Dropdown from "./dropdown";

export default class PlaygroundContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {source: props.source};
  }
  render() {
    const {scope, noRender, playgroundtheme, exportGist, markdown} = this.props;
    return (
      <div className="Interactive">
        <Playground
          codeText={this.state.source}
          scope={scope}
          noRender={noRender}
          theme={playgroundtheme ? playgroundtheme : "monokai"}/>
        {exportGist ? <ExportGist source={this.state.source} /> : ''}
      </div>
    );
  }
}

PlaygroundContainer.propTypes = {
  markdown: React.PropTypes.string,
  source: React.PropTypes.string,
  noRender: React.PropTypes.bool,
  optionList: React.PropTypes.array,
  playgroundtheme: React.PropTypes.string,
  scope: React.PropTypes.object,
  exportGist: React.PropTypes.bool
};

