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
  mountContainer(noRender, source) {
    const props = {noRender, source, ...this.props};
    return (
      <PlaygroundContainer {...props} />
    );
  }
  renderPlaygrounds() {
    const playgrounds = Array.prototype.slice.call(this.findPlayground("lang-playground"), 0);
    for (const p in playgrounds) {
      if (playgrounds.hasOwnProperty(p)) {
        const source = playgrounds[p].textContent;
        ReactDOM.render(
          this.mountContainer(true, source),
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
          this.mountContainer(false, source),
          playgroundsNoRender[p].parentNode
        );
      }
    }
  }
  render() {
    const markdown = marked(this.props.markdown);
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
