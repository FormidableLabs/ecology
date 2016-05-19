import React from "react";
import ReactDOM from "react-dom";
import marked from "marked";
import PlaygroundContainer from "./playgroundcontainer";

class Overview extends React.Component {
  componentDidMount() {
    this.renderPlaygrounds();
  }
  findPlayground(className) {
    return ReactDOM.findDOMNode(this.refs.overview).getElementsByClassName(className);
  }
  mountPlaygroundComponent(noRender, source, index) {
    const {markdown} = this.props;
    const playgroundArray = markdown.match(/(```playground).*/gi);
    const filteredArray = playgroundArray
      .filter((line) => {
        const i = line.toLowerCase().indexOf("_norender") > -1;
        return noRender ? !i : i;
      });
    const matches = filteredArray[index].match(/(_dropdown=).*/gi);
    let optionList = matches && matches.length ?
      matches[0]
        .split("=")[1]
        .replace(/[\][]/g, "")
        .split(",")
      : [];
    optionList = optionList.map((name) => name.trim());
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
          this.mountPlaygroundComponent(true, source, index++),
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
          this.mountPlaygroundComponent(false, source, index++),
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
