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
      public: true,
      files: {
        "ecology_code.js": {
          "content": this.props.source
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
          <button className="gist-link-button">
            <a className="gist-link"
              style={{textDecoration: "none", color: "inherit"}}
              target="_blank"
              href={this.state.response}>
              go there!
            </a>
          </button>
          :
          <button
            className="gist-export-button"
            onClick={this.postGist.bind(this)}>
            export to gist
          </button>
        }
      </span>
    );
  }
}

ExportGist.propTypes = {
  source: React.PropTypes.string
};

