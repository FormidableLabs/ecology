/* global XMLHttpRequest:false window:false */
import React from "react";

export default class ExportGist extends React.Component {
  postGist() {
    const {containerElement} = this.props;

    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 201) {
        const response = JSON.parse(request.responseText);
        window.open(response.html_url, "_blank");
      }
    };
    const content = containerElement.getElementsByClassName("ecologyCode")[0];
    request.open("POST", "https://api.github.com/gists");
    const data = {
      public: true,
      files: {
        "ecology_code.js": {
          "content": content.innerText
        }
      }
    };

    request.send(JSON.stringify(data));
  }
  render() {
    return (
      <button
        className="gist-export-button"
        onClick={this.postGist.bind(this)}>
        Export to Gist
      </button>
    );
  }
}

ExportGist.propTypes = {
  containerElement: React.PropTypes.object
};
