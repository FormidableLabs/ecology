import React from "react";
/* globals XMLHttpRequest:false */
const postGist = () => {
  const request = new XMLHttpRequest();

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status.toString()[0] === "2") {
      // request.responseText
    }
  };
  request.open("POST", "https://api.github.com/gists");
  const data = {
    description: "the description for this gist",
    public: true,
    files: {
      "file1.txt": {
        "content": "String file contents"
      }
    }
  };

  request.send(JSON.stringify(data));
};

export default class ExportGist extends React.Component {
  render() {
    return (
      <button onClick={postGist}>export as gist</button>
    );
  }
}
