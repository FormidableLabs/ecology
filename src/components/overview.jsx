import React from "react";
import ReactDOM from "react-dom";
import marked from "marked";
import Playground from "component-playground";

class Overview extends React.Component {
  componentDidMount() {
    this.renderPlaygrounds();
  }
  findPlayground(className) {
    return ReactDOM.findDOMNode(this.refs.overview).getElementsByClassName(className);
  }
  renderPlaygrounds() {
    const playgrounds = Array.prototype.slice.call(this.findPlayground("lang-playground"), 0);
    for (const p in playgrounds) {
      if (playgrounds.hasOwnProperty(p)) {
        const source = playgrounds[p].textContent;
        ReactDOM.render(
          <div className="Interactive">
            <Playground
              codeText={source}
              scope={this.props.scope}
              noRender={true}
              theme={this.props.playgroundtheme ? this.props.playgroundtheme : "monokai"}/>
          </div>,
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
          <div className="Interactive">
            <Playground
              codeText={source}
              scope={this.props.scope}
              noRender={false}
              theme={this.props.playgroundtheme ? this.props.playgroundtheme : "monokai"}/>
          </div>,
          playgroundsNoRender[p].parentNode
        );
      }
    }
  }
  renderMarkdown() {
    const { rendererOverrides, markdown } = this.props;
    let renderedMarkdown = marked(markdown);

    if(rendererOverrides) {
      for(const r in rendererOverrides) {
        const renderer = new marked.Renderer();
        console.log(marked(markdown, { renderer: r }));
      }
    }

    return renderedMarkdown;
  }
  render() {

    return (
      <div ref="overview" dangerouslySetInnerHTML={{__html: this.renderMarkdown()}}>
      </div>
    );
  }
}

export default Overview;

Overview.defaultProps = {
  rendererOverrides: [{
    link: function(text, level, something) {
      console.log(text, level, something)

      return text;
    }
  }],
};

Overview.propTypes = {
  markdown: React.PropTypes.string,
  playgroundtheme: React.PropTypes.string,
  rendererOverrides: React.PropTypes.array,
  scope: React.PropTypes.object,
};
