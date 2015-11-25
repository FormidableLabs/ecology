import React from "react";

const makeArray = (obj) =>
  Object.keys(obj).map((key) =>
    Object.assign({name: key}, obj[key]));

const renderType = ({name, value}) => {
  switch (name) {
  case "union": {
    return value.map((val) => val.name).join(", ");
  }
  case "enum": {
    return value.map((val) => val.value).join(", ");
  }
  case "instanceOf": {
    return value;
  }
  case "arrayOf": {
    return `Array<${renderType(value)}>`;
  }
  case "shape": {
    return `{${Object.keys(value).map((val) => val + ": " + renderType(value[val])).join(", ")}}`;
  }
  default: {
    return name;
  }
  }
};

export default class API extends React.Component {
  render() {
    const docObj = this.props.source;
    const propMap = makeArray(docObj.props);
    return (
      <table className="Props">
        <thead>
          <tr>
            <th>Props</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {propMap.map((prop, index) => {
            return (
              <tr key={index} className="Prop">
                <td>
                  <span className="Prop-name">
                    {prop.name}
                  </span>
                  <span className="Prop-type">
                    {renderType({...prop.type})}
                  </span>
                  {prop.required && <span className="Prop-required">required</span>}
                </td>
                <td>
                  {"description" in prop ?
                  <span className="Prop-description">
                    {prop.description.split("@examples")[0]}
                  </span> : null}
                  {"description" in prop && prop.description.indexOf("@examples") !== -1 ?
                    <span className="Prop-examples">
                      <span className="Prop-examples-title">Examples: </span>
                      <span className="Prop-examples-value">
                        {prop.description.split("@examples")[1]}
                      </span>
                    </span> :
                    null}
                  {"defaultValue" in prop ?
                    <span className="Prop-default">
                      <span className="Prop-default-title">Default Value: </span>
                      <span className="Prop-default-value">{prop.defaultValue.value}</span>
                    </span> :
                    null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

API.propTypes = {
  source: React.PropTypes.object
};
