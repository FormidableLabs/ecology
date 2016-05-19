import React from "react";
import ReactDOM from "react-dom";
import marked from "marked";
import Playground from "component-playground";
import ExportGist from "./exportgist";
import Dropdown from "./dropdown";

const findSubStr = (codeString) => {
  return codeString.split("\n").some((line) => {
    return ["```playground", "_dropdown="]
      .every((substring) => line.toLowerCase().indexOf(substring) > -1);
  });
};

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
        {findSubStr(markdown) ?
          <Dropdown
            data={optionList}
            update={this.updateSelection.bind(this)}/>
          : ""}
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
  getPlaygroundComponent(noRender, source, index) {
    const {markdown} = this.props;
    const matches = markdown.match((noRender ? /(_norender_dropdown=).*/gi : /(_dropdown=).*/gi));
    let optionList = matches.length ?
      matches[index]
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
    let index;
    const playgrounds = Array.prototype.slice.call(this.findPlayground("lang-playground"), 0);
    index = 0;
    for (const p in playgrounds) {
      if (playgrounds.hasOwnProperty(p)) {
        const source = playgrounds[p].textContent;
        ReactDOM.render(
          this.getPlaygroundComponent(true, source, index++),
          playgrounds[p].parentNode
        );
      }
    }
    const playgroundsNoRender =
      Array.prototype.slice.call(this.findPlayground("lang-playground_norender"), 0);
    index = 0;
    for (const p in playgroundsNoRender) {
      if (playgroundsNoRender.hasOwnProperty(p)) {
        const source = playgroundsNoRender[p].textContent;
        ReactDOM.render(
          this.getPlaygroundComponent(false, source, index++),
          playgroundsNoRender[p].parentNode
        );
      }
    }
  }
  render() {
    const hasDropdown = findSubStr(this.props.markdown);
    let filteredMarkdown;
    if (hasDropdown) {
      filteredMarkdown = this.props.markdown.replace(/_dropdown=(.*)/gi, "");
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
