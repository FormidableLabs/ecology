/* globals XMLHttpRequest:false */
import React from "react";

export default class ExportGist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {response: false};
  }
  postGist() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 201) {
        const response = JSON.parse(request.responseText);
        this.setState({response: response.html_url});
      }
    };
    request.open("POST", "https://api.github.com/gists");
    const data = {
      description: "the description for this gist",
      public: true,
      files: {
        "code.md": {
          "content": `\`\`\` \n ${this.props.source} \n \`\`\` ` 
        }
      }
    };

    request.send(JSON.stringify(data));
  }
  render() {
    const {response} = this.state;
    return (
      <span>
        {response ?
          <button>
            <a style={{textDecoration: "none"}} target="_blank" href={this.state.response}>go there!</a>
          </button>
          :
          <button onClick={this.postGist.bind(this)}>export as gist</button>
        }
      </span>
    );
  }
}

ExportGist.propTypes = {
  source: React.PropTypes.string
};


