import React from 'react';

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
    const dataKeys = Object.keys(this.props.data).filter(name => name !== '_selected');
    return (
      <select onChange={this.props.update} defaultValue={this.props.data._selected}>
        {dataKeys.map((name, i) => {
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
  data: React.PropTypes.object,
  update: React.PropTypes.func
};
