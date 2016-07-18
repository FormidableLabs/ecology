/* global XMLHttpRequest:false window:false */
/* eslint-disable no-alert */
import React from "react";

export default class ExportGist extends React.Component {
  parseJSON(responseText) {
    try {
      this.props.setMessage("");
      return JSON.parse(responseText);
    } catch (e) {
      this.props.setMessage("Unable to create Gist");
    }
    return null;
  }

  postGist() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 201) {
        const response = this.parseJSON(request.responseText);
        window.open(response.html_url, "_blank");
      } else if (request.status >= 400) {
        this.props.setMessage("Error connecting to Github");
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
    return (
      <button
        className="gist-export-button"
        onClick={() => this.postGist()}
      >
        Export to Gist
      </button>
    );
  }
}

ExportGist.propTypes = {
  source: React.PropTypes.string.isRequired,
  setMessage: React.PropTypes.func.isRequired
};
