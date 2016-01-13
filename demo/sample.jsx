import React from "react";

/**
 * Component Descriptions
 */
class SampleClass extends React.Component {
  render() {
    return (
      <div className="Edit">
        <h2>SampleClass Component</h2>
        <p>Name: {this.props.name}</p>
        <p>Count: {this.props.count}</p>
        <p>Indexes: {this.props.indexes}</p>
        <p>Type: {this.props.multiTypeValue}</p>
      </div>
    );
  }
}

class Test extends React.Component {
  render() {
    return null;
  }
}

SampleClass.propTypes = {
  /**
   * A name for this component
   * @examples "Glorious name", "Dull name"
   */
  name: React.PropTypes.string,
  /**
   * Count
   * @examples 1, 99, 10011
   */
  count: React.PropTypes.number,
  /**
   * Indexes
   * @examples [0], [2, 5]
   */
  indexes: React.PropTypes.arrayOf(React.PropTypes.number),
  /**
   * Injected component
   * @examples <Test/>
   */
  injectedComponent: React.PropTypes.instanceOf(Test),
  /**
   * Multi-type value
   */
  multiTypeValue: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

SampleClass.defaultProps = {
  name: "Test Name",
  count: 99,
  indexes: [1, 2, 3],
  multiTypeValue: "I can be a string"
};

export default SampleClass;
