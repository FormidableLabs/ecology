import React from "react";
import Playground from "component-playground";
import ExportGist from "./export-gist";

export default class PlaygroundContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    this.setMessage = this.setMessage.bind(this);
  }

  setMessage(string) {
    this.setState({ message: string });
  }

  renderToolbar() {
    const { source, exportGist } = this.props;
    return (
      <div className="Toolbar">
        {exportGist ? <ExportGist source={source} setMessage={this.setMessage} /> : null}
        {this.state.message.length > 0 ?
          <span className="Toolbar-Message">{this.state.message}</span>
          : null}
      </div>
    );
  }

  render() {
    const {scope, source, noRender, playgroundtheme, exportGist} = this.props;
    return (
      <div className="Interactive">
        {exportGist ? this.renderToolbar() : null}
        <Playground
          codeText={source}
          scope={scope}
          noRender={noRender}
          theme={playgroundtheme ? playgroundtheme : "monokai"}/>
      </div>
    );
  }
}

PlaygroundContainer.propTypes = {
  source: React.PropTypes.string,
  noRender: React.PropTypes.bool,
  playgroundtheme: React.PropTypes.string,
  scope: React.PropTypes.object,
  exportGist: React.PropTypes.bool
};
