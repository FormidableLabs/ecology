import React from "react";

const makeArray = (obj) =>
  Object.keys(obj).map((key) =>
    Object.assign({name: key}, obj[key]));

const renderType = ({name, value}) => {
  switch (name) {
    case "union": {
      return value.map((val) => val.name).join(', ');
    }
    case "enum": {
      return value.map((val) => val.value).join(', ');
    }
    case "instanceOf": {
      return value
    }
    case "arrayOf": {
      return `Array<${value.name}>`;
    }
    case "shape": {
      return `{${Object.keys(value).map((val) => val + ': ' + renderType(value[val])).join(', ')}}`;
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
      <table>
        <thead>
          <tr>
            <th>Props</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {propMap.map((prop, index) => {
            return (
              <tr key={index}>
                <td>
                  <span className="prop__name">
                    {prop.name}
                  </span>
                  <span className="prop__type">
                    {renderType({...prop.type})}
                  </span>
                  {prop.required && <span className="prop__required">required</span>}
                </td>
                <td>
                  {'description' in prop ?
                  <span className="prop__description">
                    {prop.description.split("@examples")[0]}
                  </span> : null}
                  {'description' in prop && prop.description.indexOf("@examples") !== -1 ?
                    <span className="prop__examples">
                      <span className="prop__examples-title">Examples: </span>
                      <span className="prop__examples-value">{prop.description.split("@examples")[1]}</span>
                    </span>  :
                    null}
                  {'defaultValue' in prop ?
                    <span className="prop__default">
                      <span className="prop__default-title">Default Value: </span>
                      <span className="prop__default-value">{prop.defaultValue.value}</span>
                    </span> :
                    null}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  }
}
