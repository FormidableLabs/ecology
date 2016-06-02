"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var makeArray = function makeArray(obj) {
  return Object.keys(obj).map(function (key) {
    return Object.assign({ name: key }, obj[key]);
  });
};

var renderType = function renderType(_ref) {
  var name = _ref.name;
  var value = _ref.value;

  switch (name) {
    case "union":
      {
        return value.map(function (val) {
          return val.name;
        }).join(", ");
      }
    case "enum":
      {
        return value.map(function (val) {
          return val.value;
        }).join(", ");
      }
    case "instanceOf":
      {
        return value;
      }
    case "arrayOf":
      {
        return "Array<" + renderType(value) + ">";
      }
    case "shape":
      {
        return "{" + Object.keys(value).map(function (val) {
          return val + ": " + renderType(value[val]);
        }).join(", ") + "}";
      }
    default:
      {
        return name;
      }
  }
};

var API = function (_React$Component) {
  _inherits(API, _React$Component);

  function API() {
    _classCallCheck(this, API);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(API).apply(this, arguments));
  }

  _createClass(API, [{
    key: "render",
    value: function render() {
      var docObj = this.props.source;
      if (!docObj.props) {
        return _react2.default.createElement(
          "em",
          null,
          "This component has no PropTypes defined."
        );
      }
      var propMap = makeArray(docObj.props);
      return _react2.default.createElement(
        "table",
        { className: "Props" },
        _react2.default.createElement(
          "thead",
          null,
          _react2.default.createElement(
            "tr",
            null,
            _react2.default.createElement(
              "th",
              null,
              "Props"
            ),
            _react2.default.createElement(
              "th",
              null,
              "Description"
            )
          )
        ),
        _react2.default.createElement(
          "tbody",
          null,
          propMap.map(function (prop, index) {
            return _react2.default.createElement(
              "tr",
              { key: index, className: "Prop" },
              _react2.default.createElement(
                "td",
                null,
                _react2.default.createElement(
                  "span",
                  { className: "Prop-name" },
                  prop.name
                ),
                _react2.default.createElement(
                  "span",
                  { className: "Prop-type" },
                  renderType(_extends({}, prop.type))
                ),
                prop.required && _react2.default.createElement(
                  "span",
                  { className: "Prop-required" },
                  "required"
                )
              ),
              _react2.default.createElement(
                "td",
                null,
                "description" in prop ? _react2.default.createElement(
                  "span",
                  { className: "Prop-description" },
                  prop.description.split("@examples")[0]
                ) : null,
                "description" in prop && prop.description.indexOf("@examples") !== -1 ? _react2.default.createElement(
                  "span",
                  { className: "Prop-examples" },
                  _react2.default.createElement(
                    "span",
                    { className: "Prop-examples-title" },
                    "Examples: "
                  ),
                  _react2.default.createElement(
                    "span",
                    { className: "Prop-examples-value" },
                    prop.description.split("@examples")[1]
                  )
                ) : null,
                "defaultValue" in prop ? _react2.default.createElement(
                  "span",
                  { className: "Prop-default" },
                  _react2.default.createElement(
                    "span",
                    { className: "Prop-default-title" },
                    "Default Value: "
                  ),
                  _react2.default.createElement(
                    "span",
                    { className: "Prop-default-value" },
                    prop.defaultValue.value
                  )
                ) : null
              )
            );
          })
        )
      );
    }
  }]);

  return API;
}(_react2.default.Component);

exports.default = API;


API.propTypes = {
  source: _react2.default.PropTypes.object
};