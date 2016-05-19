import React from "react";
import ReactDOM from "react-dom";
import marked from "marked";
import Playground from "component-playground";
import ExportGist from "./ExportGist";
import Dropdown from "./Dropdown";

let hasDropdown = false;

class Container extends React.Component {
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
    const {scope, noRender, playgroundtheme, optionList, noExport, markdown} = this.props;
    return (
      <div className="Interactive">
        <Playground
          codeText={this.state.source}
          scope={scope}
          noRender={noRender}
          theme={playgroundtheme ? playgroundtheme : "monokai"}/>
        {noExport ? "" : <ExportGist markdown={markdown} scope={scope} />}
        {hasDropdown ? <Dropdown data={optionList} update={this.updateSelection.bind(this)}/> : ""}
      </div>
    );
  }
}

Container.propTypes = {
  markdown: React.PropTypes.string,
  source: React.PropTypes.string,
  noRender: React.PropTypes.bool,
  optionList: React.PropTypes.array,
  playgroundtheme: React.PropTypes.string,
  scope: React.PropTypes.object,
  noExport: React.PropTypes.bool
};


class Overview extends React.Component {
  componentDidMount() {
    this.renderPlaygrounds();
  }
  findPlayground(className) {
    return ReactDOM.findDOMNode(this.refs.overview).getElementsByClassName(className);
  }
  modifySource(codeSource, dropdownObject, variableName) {
    if (variableName && dropdownObject) {
      dropdownObject._selected = dropdownObject._selected ?
        dropdownObject._selected :
        Object.keys(dropdownObject)[0];

      return codeSource.replace(variableName, dropdownObject._selected);
    }
    return codeSource;
  }
  getPlaygroundComponent(noRender, source) {
    const {markdown} = this.props;
    let optionList = hasDropdown ?
      markdown.match(/(_dropdown=).*/i)[0]
        .split("=")[1]
        .replace(/[\][]/g, "")
        .split(",")
      : [];
    optionList = optionList.map((name) => name.trim());
    const props = {optionList, noRender, source, ...this.props};
    return (
      <Container {...props} />
    );
  }
  renderPlaygrounds() {
    const playgrounds = Array.prototype.slice.call(this.findPlayground("lang-playground"), 0);
    for (const p in playgrounds) {
      if (playgrounds.hasOwnProperty(p)) {
        const source = playgrounds[p].textContent;
        ReactDOM.render(
          this.getPlaygroundComponent(true, source),
          playgrounds[p].parentNode
        );
      }
    }
    const playgroundsNoRender =
      Array.prototype.slice.call(this.findPlayground("lang-playground_norender"), 0);
    for (const p in playgroundsNoRender) {
      if (playgroundsNoRender.hasOwnProperty(p)) {
        const source = playgroundsNoRender[p].textContent;
        ReactDOM.render(
          this.getPlaygroundComponent(false, source),
          playgroundsNoRender[p].parentNode
        );
      }
    }
  }
  render() {
    const findSubStr = (line) => {
      return line.indexOf("```playground") > -1 && line.indexOf("_dropdown=") > -1;
    };

    hasDropdown = this.props.markdown.split("\n").some(findSubStr);
    let filteredMarkdown;
    if (hasDropdown) {
      filteredMarkdown = this.props.markdown.replace(/_dropdown=(.*)/i, "");
    }
    const markdown = marked(filteredMarkdown ? filteredMarkdown : this.props.markdown);
    return (
      <div ref="overview" dangerouslySetInnerHTML={{__html: markdown}}>
      </div>
    );
  }
}

export default Overview;

Overview.propTypes = {
  markdown: React.PropTypes.string,
  playgroundtheme: React.PropTypes.string,
  scope: React.PropTypes.object,
  noExport: React.PropTypes.bool
};
