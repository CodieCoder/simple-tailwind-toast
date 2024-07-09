function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var uuid = require('uuid');

var SIMPLE_TOASTER_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
};

var initialValues = {
  toasts: []
};
var toastContextStore = React.createContext(initialValues);
var toastContextDispatch = React.createContext(function () {
  return initialValues;
});
var useSimpleToast = function useSimpleToast() {
  var dispatch = React.useContext(toastContextDispatch);
  var toast = {
    add: function add(toast) {
      dispatch({
        type: SIMPLE_TOASTER_ACTIONS.ADD,
        payload: toast
      });
    },
    remove: function remove(id) {
      if (id) return;
      dispatch({
        type: SIMPLE_TOASTER_ACTIONS.REMOVE,
        payload: id
      });
    }
  };
  return {
    store: React.useContext(toastContextStore),
    toast: toast
  };
};

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = React__default.createContext && /*#__PURE__*/React__default.createContext(DefaultContext);

var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
  return tree && tree.map(function (node, i) {
    return /*#__PURE__*/React__default.createElement(node.tag, _objectSpread({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  return function (props) {
    return /*#__PURE__*/React__default.createElement(IconBase, _extends({
      attr: _objectSpread({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function elem(conf) {
    var attr = props.attr,
      size = props.size,
      title = props.title,
      svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /*#__PURE__*/React__default.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /*#__PURE__*/React__default.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? /*#__PURE__*/React__default.createElement(IconContext.Consumer, null, function (conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}

function FiX(props) {
  return GenIcon({
    "tag": "svg",
    "attr": {
      "viewBox": "0 0 24 24",
      "fill": "none",
      "stroke": "currentColor",
      "strokeWidth": "2",
      "strokeLinecap": "round",
      "strokeLinejoin": "round"
    },
    "child": [{
      "tag": "line",
      "attr": {
        "x1": "18",
        "y1": "6",
        "x2": "6",
        "y2": "18"
      },
      "child": []
    }, {
      "tag": "line",
      "attr": {
        "x1": "6",
        "y1": "6",
        "x2": "18",
        "y2": "18"
      },
      "child": []
    }]
  })(props);
}

var Toast = function Toast(_ref) {
  var toast = _ref.toast;
  var _React$useState = React__default.useState(''),
    className = _React$useState[0],
    setClassName = _React$useState[1];
  var _useSimpleToast = useSimpleToast(),
    dispatch = _useSimpleToast.toast;
  var removeToast = function removeToast() {
    setClassName('hideToast');
    setTimeout(function () {
      dispatch.remove(toast.id);
    }, 200);
  };
  React__default.useEffect(function () {
    setTimeout(function () {
      removeToast();
    }, (toast === null || toast === void 0 ? void 0 : toast.duration) || 5 * 1000);
  }, []);
  return React__default.createElement("div", {
    key: toast.id,
    className: "simple-toast type-" + toast.content.type + " " + className
  }, React__default.createElement("div", {
    className: 'left'
  }, React__default.createElement("div", {
    className: 'toast-title'
  }, toast.content.title), React__default.createElement("div", {
    className: 'toast-description'
  }, toast.content.description)), React__default.createElement("div", {
    className: 'right'
  }, React__default.createElement(FiX, {
    onClick: removeToast,
    style: {
      cursor: 'pointer'
    }
  })));
};

var SimpleToaster = function SimpleToaster() {
  var _store$toasts;
  var _useSimpleToast = useSimpleToast(),
    store = _useSimpleToast.store;
  return React__default.createElement("div", {
    className: 'simple-toaster'
  }, store === null || store === void 0 ? void 0 : (_store$toasts = store.toasts) === null || _store$toasts === void 0 ? void 0 : _store$toasts.map(function (toast) {
    return React__default.createElement(Toast, {
      toast: toast,
      key: toast.id
    });
  }));
};

function _extends$1() {
  return _extends$1 = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$1.apply(null, arguments);
}

var toastReducer = function toastReducer(state, _ref) {
  var _state$toasts, _state$toasts2;
  var type = _ref.type,
    payload = _ref.payload;
  var toast = {
    id: uuid.v4(),
    content: {},
    duration: 5
  };
  var tmp;
  switch (type) {
    case SIMPLE_TOASTER_ACTIONS.ADD:
      toast = _extends$1({}, toast, payload);
      return _extends$1({}, state, {
        toasts: [].concat((_state$toasts = state.toasts) != null ? _state$toasts : [], [toast])
      });
    case SIMPLE_TOASTER_ACTIONS.REMOVE:
      if ((_state$toasts2 = state.toasts) !== null && _state$toasts2 !== void 0 && _state$toasts2.length) {
        var _state$toasts3;
        tmp = (_state$toasts3 = state.toasts) === null || _state$toasts3 === void 0 ? void 0 : _state$toasts3.filter(function (toast) {
          return toast.id !== payload;
        });
        return _extends$1({}, state, {
          toasts: tmp
        });
      } else {
        return state;
      }
    default:
      return state;
  }
};

var SimpleToastProvider = function SimpleToastProvider(_ref) {
  var children = _ref.children;
  var _useReducer = React.useReducer(toastReducer, initialValues),
    state = _useReducer[0],
    dispatch = _useReducer[1];
  return React__default.createElement(toastContextStore.Provider, {
    value: state
  }, React__default.createElement(toastContextDispatch.Provider, {
    value: dispatch
  }, children));
};

var simpleToaster = {
  SimpleToaster: SimpleToaster,
  SimpleToastProvider: SimpleToastProvider,
  useSimpleToast: useSimpleToast
};

module.exports = simpleToaster;
//# sourceMappingURL=index.js.map
