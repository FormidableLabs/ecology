import React from "react";
import marked from "marked";
import Playground from "component-playground";

class Overview extends React.Component {
  componentDidMount() {
    this.renderPlaygrounds();
  }
  renderPlaygrounds() {
    let playgrounds = React.findDOMNode(this.refs.overview).getElementsByClassName('lang-playground');
    for (let p in playgrounds) {
      if (playgrounds.hasOwnProperty(p)) {
        let source = playgrounds[p].innerText;
        React.render(
          <Playground codeText={source} scope={this.props.scope} noRender={true}/>,
          playgrounds[p].parentNode
        );
      }
    }
    let playgroundsNoRender = React.findDOMNode(this.refs.overview).getElementsByClassName('lang-playground_norender');
    for (let p in playgroundsNoRender) {
      if (playgroundsNoRender.hasOwnProperty(p)) {
        let source = playgroundsNoRender[p].innerText;
        React.render(
          <Playground codeText={source} scope={this.props.scope} noRender={false}/>,
          playgroundsNoRender[p].parentNode
        );
      }
    }
  }
  render() {
  let markdown = marked(this.props.markdown);
    return (
      <div ref="overview" dangerouslySetInnerHTML={{__html: markdown}}>
      </div>
    )
  }
}


export default Overview;