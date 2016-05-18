import React from "react";
import ReactDOM from "react-dom";
import marked from "marked";
import Playground from "component-playground";
import ExportGist from "./ExportGist";
import Dropdown from "./Dropdown";

let hasDropdown = false;

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {source: null};
  }
  componentDidMount() {
    this.renderPlaygrounds();
  }
  findPlayground(className) {
    return ReactDOM.findDOMNode(this.refs.overview).getElementsByClassName(className);
  }
  modifySource(codeSource, dropdownObject, variableName) {
    if (variableName && dropdownObject) {
      dropdownObject._selected = dropdownObject._selected ? dropdownObject._selected : Object.keys(dropdownObject)[0];
      return codeSource.replace(variableName, `${variableName}["${dropdownObject._selected}"]`);
    }
    return codeSource;
  }
  updateSelection(data) {
    return (e) => {
      data._selected = e.target.value;
      this.renderPlaygrounds();
    };
  }
  getPlaygroundComponent(noRender, codeSource, dropdown) {
    const {playgroundtheme, scope, noExport, markdown} = this.props;
    const variableName = hasDropdown ? markdown.match(/(_dropdown=).*/i)[0].split('=')[1].trim() : null;
    const dropdownObject = scope[variableName] = Object.assign({}, scope[variableName]);
    const source = this.modifySource(codeSource, dropdownObject, variableName);
    return (
      <div className="Interactive">
        <Playground
          codeText={source}
          scope={scope}
          noRender={noRender}
          theme={playgroundtheme ? playgroundtheme : "monokai"}/>
        {noExport ? "" : <ExportGist markdown={markdown} scope={scope} />}
        {hasDropdown ? <Dropdown data={dropdownObject} update={this.updateSelection(dropdownObject).bind(this)}/> : ""}
      </div>
    );
  }
  renderPlaygrounds() {
    console.log('renenernren')
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
    const findSubStr = (line) => line.indexOf('```playground') > -1 && line.indexOf('_dropdown=') > -1;

    hasDropdown = this.props.markdown.split('\n').some(findSubStr);
    let filteredMarkdown;
    if (hasDropdown) {
      filteredMarkdown = this.props.markdown.replace(/_dropdown=(.*)/i, '');
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
