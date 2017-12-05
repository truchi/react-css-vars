'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.getDisplayName = exports.get = exports.name = exports.isFunction = exports.isObject = exports.isNull = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isNull = exports.isNull = function isNull(o) {
  return o === null;
};
var isObject = exports.isObject = function isObject(o) {
  return !isNull(o) && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
};
var isFunction = exports.isFunction = function isFunction(o) {
  return typeof o === 'function';
};

var name = exports.name = function name(str) {
  if (str.startsWith('--')) return str;

  var isUpper = str[0] === str[0].toUpperCase();
  str = str.replace(/([A-Z])/g, function (m) {
    return '-' + m.toLowerCase();
  }).toString();

  if (isUpper) {
    str = str.substr(1);
    str = str.split('');
    str[0] = str[0].toUpperCase();
    str = str.join('');
  }

  return '--' + str;
};

var get = exports.get = function get(obj) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return isFunction(obj) ? obj.apply(undefined, args) : obj;
};

var getDisplayName = exports.getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

var create = exports.create = function create(arg) {
  var _ref = typeof arg === 'string' ? {
    tag: arg,
    className: '',
    displayName: 'Wrapped'
  } : {
    tag: arg.tag || 'div',
    className: arg.className || '',
    displayName: arg.displayName || arg.className || 'Wrapped'
  },
      tag = _ref.tag,
      className = _ref.className,
      displayName = _ref.displayName;

  var component = function (_Component) {
    _inherits(component, _Component);

    function component() {
      _classCallCheck(this, component);

      return _possibleConstructorReturn(this, (component.__proto__ || Object.getPrototypeOf(component)).apply(this, arguments));
    }

    _createClass(component, [{
      key: 'render',
      value: function render() {
        var Tag = tag;

        return _react2.default.createElement(
          Tag,
          _extends({ className: className }, this.props),
          this.props.children
        );
      }
    }]);

    return component;
  }(_react.Component);

  component.displayName = displayName;

  return component;
};