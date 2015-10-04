import React from "react";

/**
 * Component Descriptions
 */
class SampleClass extends React.Component {
  render() {
    return <div>Edit me!</div>;
  }
}

SampleClass.propTypes = {
  /**
   * Count description
   */
  count: React.PropTypes.number.isRequired,
  /**
   * Name description
   * @examples "#ff0000", "rgba(255, 0, 0, 1", "red"
   */
  name: React.PropTypes.string,
  /**
   * Indexes test
   */
  indexes: React.PropTypes.array,
  /**
   * Union test
   */
  optionalUnion: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  optionalArray: React.PropTypes.array,
  optionalBool: React.PropTypes.bool,
  optionalFunc: React.PropTypes.func,
  optionalNumber: React.PropTypes.number,
  optionalObject: React.PropTypes.object,
  optionalString: React.PropTypes.string,
  optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
  optionalNode: React.PropTypes.node,
  optionalElement: React.PropTypes.element,
  optionalMessage: React.PropTypes.instanceOf(Message),
  optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
  optionalObjectWithShape: React.PropTypes.shape({
    color: React.PropTypes.shape({
      r: React.PropTypes.number,
      g: React.PropTypes.number,
      b: React.PropTypes.number
    }),
    fontSize: React.PropTypes.number
  }),
};

SampleClass.defaultProps = {
  count: 1,
  name: "test",
  indexes: [1,2,3],
  optionalUnion: 5
};

export default SampleClass;
