// https://rawgit.com/FormidableLabs/victory-pie/master/README.md

import React from "react";
import marked from "marked";

class Ecology extends React.Component {
  render() {
  let markdown = marked(this.props.markdown);
    return (
      <div dangerouslySetInnerHTML={{__html: markdown}}>
      </div>
    )
  }
}


export default Ecology;