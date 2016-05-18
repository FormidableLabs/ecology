import React from "react";
import ReactDOM from "react-dom";
import marked from "marked";
import Playground from "component-playground";
import ExportGist from "./ExportGist";

let hasDropdown = false;

class Overview extends React.Component {
  componentDidMount() {
    this.renderPlaygrounds();
  }
  findPlayground(className) {
    return ReactDOM.findDOMNode(this.refs.overview).getElementsByClassName(className);
  }
  findDropDownSubstring(line) {
    return line.indexOf('```playground') > -1 && line.indexOf('_dropdown=') > -1;
  }
  modifySource(codeSource, scope, markdown) {
    if (hasDropdown) {
      const variableName = markdown.match(/(_dropdown=).*/i)[0].split('=')[1];
      if (scope.hasOwnProperty(variableName)) {
        console.log(scope[variableName]);
      }
    }
    return codeSource;
  }
  getPlaygroundComponent(noRender, codeSource) {
    const {playgroundtheme, scope, noExport, markdown} = this.props;
    const source = this.modifySource(codeSource, scope, markdown);
    
    return (
      <div className="Interactive">
        <Playground
          codeText={source}
          scope={scope}
          noRender={noRender}
          theme={playgroundtheme ? playgroundtheme : "monokai"}/>
        {noExport ? "" : <ExportGist markdown={markdown} scope={scope} />}
      </div>
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
    hasDropdown = this.props.markdown.split('\n').some(this.findDropDownSubstring);
    let filteredMarkdown;
    console.log(hasDropdown)
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
