"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _marked = require("marked");

var _marked2 = _interopRequireDefault(_marked);

var _componentPlayground = require("component-playground");

var _componentPlayground2 = _interopRequireDefault(_componentPlayground);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overview = function (_React$Component) {
  _inherits(Overview, _React$Component);

  function Overview() {
    _classCallCheck(this, Overview);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Overview).apply(this, arguments));
  }

  _createClass(Overview, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderPlaygrounds();
    }
  }, {
    key: "findPlayground",
    value: function findPlayground(className) {
      return _reactDom2.default.findDOMNode(this.refs.overview).getElementsByClassName(className);
    }
  }, {
    key: "renderPlaygrounds",
    value: function renderPlaygrounds() {
      var playgrounds = Array.prototype.slice.call(this.findPlayground("lang-playground"), 0);
      for (var p in playgrounds) {
        if (playgrounds.hasOwnProperty(p)) {
          var source = playgrounds[p].textContent;
          _reactDom2.default.render(_react2.default.createElement(
            "div",
            { className: "Interactive" },
            _react2.default.createElement(_componentPlayground2.default, {
              codeText: source,
              scope: this.props.scope,
              noRender: true,
              theme: this.props.playgroundtheme ? this.props.playgroundtheme : "monokai" })
          ), playgrounds[p].parentNode);
        }
      }
      var playgroundsNoRender = Array.prototype.slice.call(this.findPlayground("lang-playground_norender"), 0);
      for (var p in playgroundsNoRender) {
        if (playgroundsNoRender.hasOwnProperty(p)) {
          var source = playgroundsNoRender[p].textContent;
          _reactDom2.default.render(_react2.default.createElement(
            "div",
            { className: "Interactive" },
            _react2.default.createElement(_componentPlayground2.default, {
              codeText: source,
              scope: this.props.scope,
              noRender: false,
              theme: this.props.playgroundtheme ? this.props.playgroundtheme : "monokai" })
          ), playgroundsNoRender[p].parentNode);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var markdown = (0, _marked2.default)(this.props.markdown);
      return _react2.default.createElement("div", { ref: "overview", dangerouslySetInnerHTML: { __html: markdown } });
    }
  }]);

  return Overview;
}(_react2.default.Component);

exports.default = Overview;


Overview.propTypes = {
  markdown: _react2.default.PropTypes.string,
  playgroundtheme: _react2.default.PropTypes.string,
  scope: _react2.default.PropTypes.object
};