import React from "react";

/**
 * Component Descriptions
 */
class SampleClass extends React.Component {
  render() {
    return <div>Edit me!</div>;
  }
}

class Test extends React.Component {
  render() {
    return null;
  }
}

SampleClass.propTypes = {
  /**
   * Name description
   * @examples "#ff0000", "rgba(255, 0, 0, 1", "red"
   */
  name: React.PropTypes.string,
  /**
   * Indexes test
   */
  indexes: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Test)),
  /**
   * Union test
   */
  test: React.PropTypes.instanceOf(Test),
  optionalUnion: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

SampleClass.defaultProps = {
  count: 1,
  name: "test",
  indexes: [1,2,3],
  optionalUnion: 5
};

export default SampleClass;
