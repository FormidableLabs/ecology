"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _api = require("./api");

var _api2 = _interopRequireDefault(_api);

var _overview = require("./overview");

var _overview2 = _interopRequireDefault(_overview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ecology = function (_React$Component) {
  _inherits(Ecology, _React$Component);

  function Ecology() {
    _classCallCheck(this, Ecology);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Ecology).apply(this, arguments));
  }

  _createClass(Ecology, [{
    key: "renderAPI",
    value: function renderAPI(source) {
      if (source) {
        return _react2.default.createElement(
          "div",
          { className: "Documentation" },
          _react2.default.createElement(_api2.default, { source: this.props.source })
        );
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "Ecology" },
        _react2.default.createElement(
          "div",
          { className: "Overview" },
          _react2.default.createElement(_overview2.default, {
            markdown: this.props.overview,
            scope: this.props.scope,
            playgroundtheme: this.props.playgroundtheme })
        ),
        this.renderAPI(this.props.source)
      );
    }
  }]);

  return Ecology;
}(_react2.default.Component);

exports.default = Ecology;


Ecology.propTypes = {
  overview: _react2.default.PropTypes.string,
  playgroundtheme: _react2.default.PropTypes.string,
  source: _react2.default.PropTypes.object,
  scope: _react2.default.PropTypes.object
};