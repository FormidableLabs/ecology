/* global XMLHttpRequest:false window:false */
/* eslint-disable no-alert */
import React from "react";

export default class ExportGist extends React.Component {
  parseJSON(responseText) {
    try {
      return JSON.parse(responseText);
    } catch (e) {
      window.alert("Unable to create Gist");
    }
    return null;
  }

  postGist() {
    const {containerElement} = this.props;
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 201) {
        const response = this.parseJSON(request.responseText);
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
        onClick={() => this.postGist()}>
        Export to Gist
      </button>
    );
  }
}

ExportGist.propTypes = {
  containerElement: React.PropTypes.object
};
