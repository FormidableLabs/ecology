import React from "react";

class Option extends React.Component {
  render() {
    return (<option>{this.props.name}</option>);
  }
}

Option.propTypes = {
  name: React.PropTypes.string
};

export default class Dropdown extends React.Component {
  render() {
    return (
      <select onChange={this.props.update}>
        {this.props.data.map((name, i) => {
          return (
            <Option
              name={name}
              key={i}
            />
          );
        })}
      </select>
    );
  }
}

Dropdown.propTypes = {
  data: React.PropTypes.array,
  update: React.PropTypes.func
};
