import React from "react";
import ReactDOM from "react-dom";
import marked from "marked";
import PlaygroundContainer from "./playground-container";

class Overview extends React.Component {
  componentDidMount() {
    this.renderPlaygrounds();
  }
  findPlayground(className) {
    return ReactDOM.findDOMNode(this.refs.overview).getElementsByClassName(className);
  }
  findDropdownVariables(index, noRender) {
    const {markdown} = this.props;
    const playgroundArray = markdown.match(/(```playground).*/gi);
    const filteredArray = playgroundArray
      .filter((line) => {
        const i = line.toLowerCase().indexOf("_norender") > -1;
        return noRender ? !i : i;
      });
    const matches = filteredArray[index].match(/(_dropdown=).*/gi);
    const options = matches && matches.length ?
      matches[0]
        .split("=")[1]
        .replace(/[\][]/g, "")
        .split(",")
      : [];

    return options.map((name) => name.trim());
  }
  mountContainer(source, index, noRender) {
    const optionList = this.findDropdownVariables(index, noRender);
    const props = {optionList, noRender, source, ...this.props};
    return (
      <PlaygroundContainer {...props} />
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
          this.mountContainer(source, index++, true),
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
          this.mountContainer(source, index++, false),
          playgroundsNoRender[p].parentNode
        );
      }
    }
  }
  render() {
    const filteredMarkdown = this.props.markdown.replace(/_dropdown=(.*)/gi, "");
    const markdown = marked(filteredMarkdown);
    return (
      <div ref="overview" dangerouslySetInnerHTML={{__html: markdown}}>
      </div>
    );
  }
}

export default Overview;

Overview.propTypes = {
  markdown: React.PropTypes.string
};
