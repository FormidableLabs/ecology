import React from "react";
import Playground from "component-playground";
import ExportGist from "./exportgist";
import Dropdown from "./dropdown";

export default class PlaygroundContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {source: props.source, selected: props.optionList[0]};
  }
  updateSelection(e) {
    const selected = this.state.selected;
    const source = this.state.source.replace(new RegExp(selected, "g"), e.target.value);
    this.setState({source, selected: e.target.value});
  }
  render() {
    const {scope, noRender, playgroundtheme, optionList, exportGist, markdown} = this.props;
    return (
      <div className="Interactive">
        <Playground
          codeText={this.state.source}
          scope={scope}
          noRender={noRender}
          theme={playgroundtheme ? playgroundtheme : "monokai"}/>
        {exportGist ? <ExportGist markdown={markdown} scope={scope} /> : ""}
        {optionList.length ?
          <Dropdown
            data={optionList}
            update={this.updateSelection.bind(this)}/>
          : ""}
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

