/* eslint-disable max-len */
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
  mountContainer(source, noRender) {
    const props = {source, noRender,  ...this.props};
    return <PlaygroundContainer {...props} />;
  }
  renderPlaygrounds() {
    const playgrounds = Array.prototype.slice.call(this.findPlayground("lang-playground"), 0);
    for (const p in playgrounds) {
      if (playgrounds.hasOwnProperty(p)) {
        const source = playgrounds[p].getElementsByClassName("ecologyCode")[0].textContent;
        ReactDOM.render(
          this.mountContainer(source, true),
          playgrounds[p].parentNode
        );
      }
    }
    const playgroundsNoRender =
      Array.prototype.slice.call(this.findPlayground("lang-playground_norender"), 0);
    for (const p in playgroundsNoRender) {
      if (playgroundsNoRender.hasOwnProperty(p)) {
        const source = playgroundsNoRender[p].getElementsByClassName("ecologyCode")[0].textContent;
        ReactDOM.render(
          this.mountContainer(source, false),
          playgroundsNoRender[p].parentNode
        );
      }
    }
  }
  renderMarkdown() {
    const { customRenderers, markdown } = this.props;
    const renderer = new marked.Renderer();
    const renderers = {
      code: (code, lang) => {
        const escape = (html) => {
          return html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
        };
        // Use regular strings, es6 templates cause spaces to be inserted
        if (!lang) {
          return ("<pre><code>" + escape(code) + "</code></pre>");
        }

        if (lang === "playground" || lang === "playground_norender") {
          return ("<pre><code class='lang-" + escape(lang) + "'><span class='ecologyCode'>" + escape(code) + "</span></code></pre>");
        }

        return ("<pre><code class='lang-" + escape(lang) + "'>" + escape(code) + "</code></pre>");
      },
      ...customRenderers
    };
    Object.assign(renderer, renderers);
    return marked(markdown, { renderer });
  }
  render() {
    return (
      <div ref="overview" dangerouslySetInnerHTML={{__html: this.renderMarkdown()}} />
    );
  }
}

export default Overview;

Overview.propTypes = {
  markdown: React.PropTypes.string,
  playgroundtheme: React.PropTypes.string,
  customRenderers: React.PropTypes.object,
  scope: React.PropTypes.object
};
