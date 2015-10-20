import React from "react";
import marked from "marked";
import Playground from "component-playground";

class Overview extends React.Component {
  componentDidMount() {
    this.renderPlaygrounds();
  }
  renderPlaygrounds() {
    const playgrounds = Array.prototype.slice.call(React.findDOMNode(this.refs.overview).getElementsByClassName("lang-playground"), 0);
    for (const p in playgrounds) {
      if (playgrounds.hasOwnProperty(p)) {
        const source = playgrounds[p].innerText;
        React.render(
          <div className="Interactive">
            <Playground codeText={source} scope={this.props.scope} noRender={true}/>
          </div>,
          playgrounds[p].parentNode
        );
      }
    }
    const playgroundsNoRender = Array.prototype.slice.call(React.findDOMNode(this.refs.overview).getElementsByClassName("lang-playground_norender"), 0);
    for (const p in playgroundsNoRender) {
      if (playgroundsNoRender.hasOwnProperty(p)) {
        const source = playgroundsNoRender[p].innerText;
        React.render(
          <div className="Interactive">
            <Playground codeText={source} scope={this.props.scope} noRender={false}/>
          </div>,
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
  markdown: React.PropTypes.string,
  scope: React.PropTypes.object
};
