define(() => { return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 51
(module) {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ },

/***/ 128
(module) {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ },

/***/ 464
(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(758);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(935);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.oseditor-nmzzpp1hty {
    & .dropdown.icon {
        width: 2em;
        height: 2em;
        background-color: turquoise;
        transform: rotate(-90deg);

        &::before {
            content: "▼";
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }
    }

    & .active > .dropdown.icon {
        transform: rotate(0deg);
    }

    & .content {
        border: solid 1px #00f;
    }

    & .object-component {
        border: solid 1px #f00;
        padding: 0.5em;
        display: flex;
        flex-direction: column;
        gap: 0.5em;

        & .title {
            font-weight: bold;
            cursor: pointer;
            display: flex;
            flex-direction: row;
            /* margin-left: 2em; */
            /* justify-content: space-between; */
            /* flex: 0 0 auto; */
            gap: 1em;
            align-items: center;
            justify-content: start;

            & h3 {
                margin: 0;
            }
        }

        & .content {
            display: none;
            margin-left: 2em;

            &.active {
                display: block;
            }
        }
    }
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ 591
(module) {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ },

/***/ 656
(module) {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ },

/***/ 740
(module) {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ },

/***/ 758
(module) {



module.exports = function (i) {
  return i[1];
};

/***/ },

/***/ 855
(module, __unused_webpack_exports, __webpack_require__) {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ },

/***/ 935
(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  create: () => (/* binding */ main_create),
  "default": () => (/* binding */ main)
});

;// ./packages/duct-tape/build/common.js
function isObject(value) {
    return (typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        !(value instanceof RegExp) &&
        !(value instanceof Date));
}
function isFunction(value) {
    return value instanceof Function;
}
function isDefined(value) {
    return value !== undefined;
}
function common_hasOwnProperty(value, name) {
    return typeof value === "object" && Object.hasOwn(value, name);
}
function hasOwnFunction(value, name) {
    return isObject(value) && isFunction(value[name]);
}
function isEmpty(value) {
    if (value === undefined)
        return true;
    if (value === "")
        return true;
    if (value === null)
        return true;
    if (value === 0)
        return true;
    return false;
}
function isTrue(value) {
    if (value === true)
        return true;
    if (value === "true")
        return true;
    if (value === "yes")
        return true;
    if (value === "on")
        return true;
    if (value === "t")
        return true;
    if (value === 1)
        return true;
    if (value === "1")
        return true;
    return false;
}
function isFalse(value) {
    if (value === false)
        return true;
    if (value === "false")
        return true;
    if (value === "no")
        return true;
    if (value === "off")
        return true;
    if (value === "f")
        return true;
    if (value === 0)
        return true;
    if (value === "0")
        return true;
    return false;
}
function mergeDeep(target, ...sources) {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return mergeDeep(target, ...sources);
}
//# sourceMappingURL=common.js.map
;// ./packages/duct-tape/build/disposable.js

function createDisposeFn(fn) {
    return fn;
}
class Disposable {
    _disposed;
    _disposables = new Map();
    constructor() {
        this._disposed = false;
    }
    dispose() {
        if (this._disposed)
            return;
        try {
            const disposables = Array.from(this._disposables.entries()).reverse();
            for (const [, fn] of disposables) {
                try {
                    fn();
                }
                catch (e) {
                    console.error(e);
                }
            }
            this._disposables.clear();
        }
        finally {
            this._disposed = true;
        }
    }
    get disposed() {
        return this._disposed;
    }
    register(o) {
        if (this._disposables.has(o)) {
            console.warn(`Cannot register ${o?.constructor?.name ?? o}. This object is already registered.`);
            return o;
        }
        if (isObject(o)) {
            if (hasOwnFunction(o, "dispose")) {
                this._disposables.set(o, () => o.dispose());
            }
            else if (hasOwnFunction(o, "destroy")) {
                this._disposables.set(o, () => o.destroy());
            }
            else if (hasOwnFunction(o, "remove")) {
                this._disposables.set(o, () => o.remove());
            }
            else {
                console.warn(`The object ${o?.constructor?.name ?? o} has an unknown release function!`);
            }
        }
        else if (isFunction(o)) {
            this._disposables.set(o, o);
        }
        else {
            console.warn(`Cannot register ${o}. This object does not have a release function!`);
        }
        return o;
    }
    unregister(o) {
        if (this._disposables.has(o)) {
            this._disposables.delete(o);
        }
        else {
            console.warn("Object ${o} doesn't exist in register.");
        }
    }
}
class DummyDisposable extends Disposable {
    constructor() {
        super();
    }
}
//# sourceMappingURL=disposable.js.map
;// ./packages/duct-tape/build/to.js

function toBoolean(value, defaultValue = false) {
    if (value instanceof value_Value) {
        value = value.get();
    }
    if (typeof value === "boolean") {
        return value;
    }
    else if (typeof value === "string") {
        const v = value.toLowerCase();
        if (v === "true" || v === "1" || v === "yes" || v === "on") {
            return true;
        }
        else if (v === "false" || v === "0" || v === "no" || v === "off") {
            return false;
        }
    }
    else if (typeof value === "number") {
        return value !== 0;
    }
    return defaultValue;
}
function toNumber(value, defaultValue = 0) {
    if (value instanceof Value) {
        value = value.get();
    }
    if (typeof value === "number") {
        return value;
    }
    else if (typeof value === "string") {
        const v = parseFloat(value);
        return isNaN(v) ? defaultValue : v;
    }
    else if (typeof value === "boolean") {
        return value ? 1 : 0;
    }
    return defaultValue;
}
function to_toString(value, defaultValue = "") {
    if (value instanceof Value) {
        value = value.get();
    }
    if (typeof value === "string") {
        return value;
    }
    else if (typeof value === "number" || typeof value === "boolean") {
        return value.toString();
    }
    return defaultValue;
}
//# sourceMappingURL=to.js.map
;// ./packages/duct-tape/build/value.js



function createValue(value, register) {
    return new ValueStore(value, register);
}
class value_Value extends Disposable {
    equal(test, register) {
        let transform;
        if (test instanceof Function) {
            transform = test;
        }
        else {
            transform = (v) => v === test;
        }
        const transformer = new ValueObserver(this, transform);
        if (register) {
            register.register(transformer);
        }
        return transformer;
    }
    notEqual(test, register) {
        let transform;
        if (typeof test === "string") {
            transform = (v) => v !== test;
        }
        else {
            transform = (value) => !test(value);
        }
        const transformer = new ValueObserver(this, transform);
        if (register) {
            register.register(transformer);
        }
        return transformer;
    }
    format(formatter, register) {
        const transformer = new ValueObserver(this, formatter);
        if (register) {
            register.register(transformer);
        }
        return transformer;
    }
    map(transformerFn, register) {
        const transformer = new ValueObserver(this, transformerFn);
        if (register) {
            register.register(transformer);
        }
        return transformer;
    }
    mapBoolean(trueValue, falseValue, register) {
        const transformer = new ValueObserver(this, (value) => {
            if (toBoolean(value) === true) {
                return trueValue;
            }
            else {
                return falseValue;
            }
        });
        if (register) {
            register.register(transformer);
        }
        return transformer;
    }
    not(register) {
        const transformer = new ValueObserver(this, (value) => !toBoolean(value));
        if (register) {
            register.register(transformer);
        }
        return transformer;
    }
    and(other, register) {
        const transformer = new ValueLogicObserver(this, other, (a, b) => toBoolean(a) && toBoolean(b));
        if (register) {
            register.register(transformer);
        }
        return transformer;
    }
    or(other, register) {
        const transformer = new ValueLogicObserver(this, other, (a, b) => toBoolean(a) || toBoolean(b));
        if (register) {
            register.register(transformer);
        }
        return transformer;
    }
}
function isValue(object) {
    return object instanceof value_Value;
}
class ValueStore extends value_Value {
    listeners = [];
    value;
    initValue;
    prev;
    _register;
    constructor(value, register) {
        super();
        this._register = register;
        this.value = value;
        this.initValue = value;
        this.prev = undefined;
        if (register) {
            register.register(this);
        }
    }
    dispose() {
        if (this.disposed)
            return;
        this.listeners.splice(0, this.listeners.length);
        if (this._register) {
            this._register.unregister(this);
            this._register = undefined;
        }
        super.dispose();
    }
    subscribe(callback, scope = this) {
        const handle = {
            callback,
            scope
        };
        this.listeners.push(handle);
        this.deliveryValueToSubscriber(handle, this.value, this.prev);
        return () => {
            this.listeners.splice(this.listeners.indexOf(handle), 1);
        };
    }
    set(value) {
        this.prev = this.get();
        if (this.value !== value && value !== undefined && value !== null && typeof value === typeof this.value) {
            if (Array.isArray(this.value)) {
                this.value = [...value];
            }
            else if (typeof this.value === "object") {
                this.value = mergeDeep(this.value, value);
            }
            else {
                this.value = value;
            }
            this.deliveryValue(this.value, this.prev);
        }
    }
    get() {
        if (Array.isArray(this.value)) {
            return [...this.value];
        }
        else if (typeof this.value === "object") {
            return mergeDeep({}, this.value);
        }
        return this.value;
    }
    toString() {
        return this.value === undefined || this.value === null ? "undefined" : this.value.toString();
    }
    deliveryValue(value, prev) {
        for (const handle of this.listeners) {
            this.deliveryValueToSubscriber(handle, value, prev);
        }
    }
    deliveryValueToSubscriber(handle, value, prev) {
        handle.callback.call(handle.scope, value, prev);
    }
}
class ValueObserver extends value_Value {
    listeners = [];
    watch;
    prev;
    value;
    _transform;
    _unsubscribe = null;
    constructor(watch, transform) {
        super();
        this.watch = watch;
        this._transform = transform;
        this.value = this._transform(this.watch.get());
        this._unsubscribe = this.watch.subscribe((value) => {
            const newValue = this._transform(value);
            if (this.value !== newValue) {
                this.prev = this.value;
                this.value = newValue;
                this.deliverValue(this.value, this.prev);
            }
        });
    }
    dispose() {
        if (this.disposed)
            return;
        this.watch = undefined;
        this._unsubscribe?.();
        this.listeners.splice(0, this.listeners.length);
        super.dispose();
    }
    subscribe(callback, scope = this) {
        const handle = {
            callback,
            scope
        };
        this.listeners.push(handle);
        this.deliverValueToSubscriber(handle, this.value, this.prev);
        return () => {
            this.listeners.splice(this.listeners.indexOf(handle), 1);
        };
    }
    get() {
        return this.value;
    }
    toString() {
        return this.watch?.toString() || "";
    }
    get subscribersLength() {
        return this.listeners.length;
    }
    deliverValue(value, prev) {
        for (const handle of this.listeners) {
            this.deliverValueToSubscriber(handle, value, prev);
        }
    }
    deliverValueToSubscriber(handle, value, prev) {
        handle.callback.call(handle.scope, value, prev);
    }
}
class ValueLogicObserver extends value_Value {
    listeners = [];
    watch1;
    watch2;
    prev;
    value;
    transform;
    constructor(watch1, watch2, transform) {
        super();
        this.watch1 = watch1;
        this.watch2 = watch2;
        this.transform = transform;
        this.value = this.transform(this.watch1.get(), this.watch2.get());
        watch1.subscribe((value) => {
            const newValue = this.transform(value, watch2.get());
            if (this.value !== newValue) {
                this.prev = this.value;
                this.value = newValue;
                this.deliverValue(this.value, this.prev);
            }
        });
        watch2.subscribe((value) => {
            const newValue = this.transform(watch1.get(), value);
            if (this.value !== newValue) {
                this.prev = this.value;
                this.value = newValue;
                this.deliverValue(this.value, this.prev);
            }
        });
    }
    dispose() {
        if (this.disposed)
            return;
        this.watch1 = undefined;
        this.watch2 = undefined;
        this.listeners.splice(0, this.listeners.length);
        super.dispose();
    }
    subscribe(callback, scope = this) {
        const handle = {
            callback,
            scope
        };
        this.listeners.push(handle);
        this.deliverValueToSubscriber(handle, this.value, this.prev);
        return () => {
            this.listeners.splice(this.listeners.indexOf(handle), 1);
        };
    }
    get() {
        return this.value;
    }
    toString() {
        return `${this.watch1?.toString()} ${this.watch2?.toString()}`;
    }
    get subscribersLength() {
        return this.listeners.length;
    }
    deliverValue(value, prev) {
        for (const handle of this.listeners) {
            this.deliverValueToSubscriber(handle, value, prev);
        }
    }
    deliverValueToSubscriber(handle, value, prev) {
        handle.callback.call(handle.scope, value, prev);
    }
}
//# sourceMappingURL=value.js.map
;// ./packages/duct-tape/build/dom.js


function create(selector, register) {
    const dom = DOMNode.create(selector, register);
    return dom;
}
class DOMNode extends Disposable {
    _element;
    _events = new Map();
    _register;
    static create(selector, register) {
        const dom = new DOMNode(selector, register);
        return dom;
    }
    constructor(selector, register) {
        super();
        this._register = register;
        const match = selector.split(":");
        if (match.length === 1) {
            this._element = document.createElement(selector);
        }
        else if (match.length === 2) {
            const namespace = match[0];
            const tagName = match[1];
            this._element = document.createElementNS(namespace, tagName);
        }
        else {
            throw new Error("Invalid selector");
        }
        if (this._register) {
            this._register.register(this);
        }
    }
    dispose() {
        if (this._disposed) {
            return;
        }
        this._element.remove();
        if (this._register) {
            this._register.unregister(this);
            this._register = undefined;
        }
        super.dispose();
    }
    attr(name, value) {
        if (value instanceof value_Value) {
            this.register(value.subscribe((val) => {
                this._element.setAttribute(name, String(val));
            }));
        }
        else {
            this._element.setAttribute(name, String(value));
        }
        return this;
    }
    property(name, value) {
        if (value === undefined) {
            return this._element[name];
        }
        if (value instanceof value_Value) {
            this.register(value.subscribe((val) => {
                this._element[name] = val;
            }));
        }
        else {
            this._element[name] = value;
        }
        return this;
    }
    style(name, value) {
        if (value instanceof value_Value) {
            this.register(value.subscribe((val) => {
                this._element.style[name] = val;
            }));
        }
        else {
            this._element.style[name] = value;
        }
        return this;
    }
    class(className, active = true) {
        if (active instanceof value_Value) {
            this.register(active.subscribe((val) => {
                if (val) {
                    if (Array.isArray(className)) {
                        this._element.classList.add(...className);
                    }
                    else {
                        this._element.classList.add(className);
                    }
                }
                else {
                    if (Array.isArray(className)) {
                        this._element.classList.remove(...className);
                    }
                    else {
                        this._element.classList.remove(className);
                    }
                }
            }));
        }
        else {
            if (active) {
                if (Array.isArray(className)) {
                    this._element.classList.add(...className);
                }
                else {
                    this._element.classList.add(className);
                }
            }
            else {
                if (Array.isArray(className)) {
                    this._element.classList.remove(...className);
                }
                else {
                    this._element.classList.remove(className);
                }
            }
        }
        return this;
    }
    on(eventType, listener, options) {
        for (const [, event] of this._events.entries()) {
            if (event.eventType === eventType && event.listener === listener) {
                console.warn(`The event listener for ${eventType} is already registered on this element.`);
                return this;
            }
        }
        this._element.addEventListener(eventType, listener, options);
        const dispose = createDisposeFn(() => {
            this._element.removeEventListener(eventType, listener, options);
        });
        this.register(dispose);
        this._events.set(dispose, { eventType, listener });
        return this;
    }
    off(eventType, listener, options) {
        this._element.removeEventListener(eventType, listener, options);
        for (const [dispose, event] of this._events.entries()) {
            if (event.eventType === eventType && event.listener === listener) {
                this._events.delete(dispose);
                this.unregister(dispose);
                break;
            }
        }
        return this;
    }
    datum(data) {
        if (arguments.length === 0) {
            return this._element.__datum__;
        }
        else {
            this._element.__datum__ = data;
            return this;
        }
    }
    text(content) {
        if (content instanceof value_Value) {
            const textNode = document.createTextNode("");
            this._element.appendChild(textNode);
            this.register(content.subscribe((val) => {
                textNode.textContent = String(val);
            }));
        }
        else {
            this._element.innerText = String(content);
        }
        return this;
    }
    html(content) {
        this._element.innerHTML = content;
        return this;
    }
    append(...children) {
        for (const child of children) {
            this._element.appendChild(child.element);
        }
        return this;
    }
    mount(parent) {
        if (parent instanceof DOMNode) {
            parent._element.appendChild(this._element);
        }
        else {
            parent.appendChild(this._element);
        }
        return this;
    }
    get element() {
        return this._element;
    }
}
//# sourceMappingURL=dom.js.map
;// ./packages/duct-tape/build/emitter.js

class Emitter extends Disposable {
    _emitterHandles;
    constructor() {
        super();
        this._emitterHandles = {};
    }
    dispose() {
        if (this.disposed)
            return;
        this._emitterHandles = {};
        super.dispose();
    }
    on(name, callback, scope = this) {
        this._addCallback(name, callback, scope, false);
        return () => this.off(name, callback, scope);
    }
    once(name, callback, scope = this) {
        this._addCallback(name, callback, scope, true);
        return () => this.off(name, callback, scope);
    }
    off(name, callback, scope = this) {
        const handlesByName = this._emitterHandles[name];
        if (handlesByName) {
            let i = handlesByName.length;
            while (--i >= 0) {
                if (handlesByName[i].callback === callback && handlesByName[i].scope === scope) {
                    handlesByName.splice(i, 1);
                }
            }
        }
    }
    emit(name, value) {
        const handlesByName = this._emitterHandles[name];
        if (!handlesByName) {
            return;
        }
        for (const handle of handlesByName) {
            handle.callback.call(handle.scope, value);
            if (handle.once)
                this.off(name, handle.callback, handle.scope);
        }
    }
    _addCallback(name, callback, scope, once) {
        let handlesByName = this._emitterHandles[name];
        if (!handlesByName) {
            handlesByName = this._emitterHandles[name] = [];
        }
        handlesByName.push({
            callback,
            scope,
            once
        });
    }
}
/* harmony default export */ const emitter = ((/* unused pure expression or super */ null && (Emitter)));
//# sourceMappingURL=emitter.js.map
;// ./packages/duct-tape/build/index.js






//# sourceMappingURL=index.js.map
;// ./src/widgets/widget.ts

class Widget extends DOMNode {
    _editor;
    constructor(editor) {
        super("div");
        this._editor = editor;
    }
}

;// ./src/widgets/number-widget.ts


var NumberFormat;
(function (NumberFormat) {
    NumberFormat["Integer"] = "integer";
    NumberFormat["Float"] = "float";
    NumberFormat["Number"] = "number";
})(NumberFormat || (NumberFormat = {}));
class NumberWidget extends Widget {
    _schema;
    _format = NumberFormat.Number;
    _min = -Infinity;
    _max = Infinity;
    _data;
    _input;
    _messageNode;
    constructor(editor, key, schema, data) {
        super(editor);
        this._editor = editor;
        this._schema = schema;
        this._data = data;
        this.class("number-component");
        if (schema.format === "integer") {
            this._format = NumberFormat.Integer;
        }
        else if (schema.format === "float") {
            this._format = NumberFormat.Float;
        }
        else {
            this._format = NumberFormat.Number;
        }
        this._min = schema.min !== undefined ? schema.min : -Infinity;
        this._max = schema.max !== undefined ? schema.max : Infinity;
        const label = schema.label || key;
        this._input = new DOMNode("input")
            .attr("type", "number")
            .style("display", "block")
            .style("marginBottom", "8px")
            .property("value", this._data[key] || 0)
            .on("input", () => {
            const value = this._input.property("value");
            if (value === undefined || value === "") {
                this._messageNode.text("Wartość nie może być pusta.");
                return;
            }
            let numValue;
            if (this._format === NumberFormat.Integer) {
                numValue = parseInt(value || "0", 10);
            }
            else {
                numValue = parseFloat(value || "0");
            }
            if (isNaN(numValue)) {
                this._messageNode.text("Wartość musi być liczbą.");
                return;
            }
            else if (this._format === NumberFormat.Integer && !Number.isInteger(numValue)) {
                this._messageNode.text("Wartość musi być liczbą całkowitą.");
                return;
            }
            else if (numValue < this._min) {
                this._messageNode.text(`Wartość musi być większa lub równa ${this._min}.`);
                return;
            }
            else if (numValue > this._max) {
                this._messageNode.text(`Wartość musi być mniejsza lub równa ${this._max}.`);
                return;
            }
            else {
                this._messageNode.text("");
            }
            this._data[key] = value;
            this._editor.saveState();
        });
        const labelNode = new DOMNode("label")
            .text(label)
            .style("display", "block")
            .style("marginBottom", "4px");
        this._messageNode = new DOMNode("div")
            .class("message")
            .style("color", "red")
            .style("fontSize", "12px")
            .style("marginBottom", "8px");
        this.append(labelNode, this._input, this._messageNode);
    }
}

;// ./src/widgets/array-widget.ts



class ArrayWidget extends Widget {
    _schema;
    _data;
    _itemsContainer;
    constructor(editor, key, schema, data) {
        super(editor);
        this._editor = editor;
        this._schema = schema;
        this._data = data;
        this.class("array-component");
        this.append(this._itemsContainer = create("div", this)
            .class("items-container"));
        this.build();
    }
    build() {
        if (this._schema.item === undefined) {
            return;
        }
        this._data.forEach((data, index) => {
            const item = create("div").class("array-item");
            this._itemsContainer.append(item);
            if (this._schema.item.type === "object") {
                item.append(new ObjectWidget(this._editor, `Element #${index + 1}`, this._schema.item, data));
            }
            else {
                console.warn(`Unsupported array item type: ${this._schema.item.type}`);
            }
        });
    }
}

;// ./src/widgets/string-widget.ts


class StringWidget extends Widget {
    _schema;
    _data;
    _input;
    constructor(editor, key, schema, data) {
        super(editor);
        this._schema = schema;
        this._data = data;
        this.class("string-component");
        const label = schema.label || key;
        if (schema.enum) {
            this._input = create("select", this)
                .style("display", "block")
                .style("marginBottom", "8px")
                .on("change", () => {
                this._data[key] = this._input.property("value");
            });
            for (const [enumKey, enumLabel] of Object.entries(schema.enum)) {
                const option = create("option", this._input)
                    .attr("value", enumKey)
                    .text(enumLabel);
                if (this._data[key] === enumKey) {
                    option.attr("selected", "selected");
                }
                this._input.append(option);
            }
        }
        else {
            this._input = create("input", this)
                .attr("type", "text")
                .style("display", "block")
                .style("marginBottom", "8px")
                .property("value", this._data[key] || "")
                .on("input", () => {
                this._data[key] = this._input.property("value");
                this._editor.saveState();
            });
        }
        const labelNode = create("label", this)
            .text(label)
            .style("display", "block")
            .style("marginBottom", "4px");
        this.append(labelNode);
        this.append(this._input);
    }
}

;// ./src/widgets/boolean-widget.ts


class BooleanWidget extends Widget {
    _schema;
    _data;
    _checkbox;
    constructor(editor, key, schema, data) {
        super(editor);
        this._editor = editor;
        this._schema = schema;
        this._data = data;
        this.class("boolean-component");
        const label = schema.label || key;
        this._checkbox = new DOMNode("input")
            .attr("type", "checkbox")
            .style("marginRight", "8px")
            .property("checked", !!this._data[key])
            .on("input", () => {
            this._data[key] = this._checkbox.property("checked");
            this._editor.saveState();
        });
        const labelNode = new DOMNode("label")
            .style("cursor", "pointer")
            .append(this._checkbox)
            .append(new DOMNode("span").text(label));
        this.append(labelNode);
    }
}

;// ./src/widgets/ref-widget.ts


const cache = new Map();
class RefWidget extends Widget {
    _schema;
    _data;
    _ref;
    constructor(editor, key, schema, data) {
        super(editor);
        this._schema = schema;
        this._data = data;
        this.class("string-component");
        const label = this._schema.label || key;
        this._ref = new DOMNode("div")
            .style("display", "block")
            .style("marginBottom", "8px");
        const labelNode = new DOMNode("label")
            .text(label)
            .style("display", "block")
            .style("marginBottom", "4px");
        this.append(labelNode);
        this.append(this._ref);
        this.build();
    }
    async getFileData(path) {
        return new Promise((resolve, reject) => {
            if (cache.has(path)) {
                resolve(cache.get(path));
                return;
            }
            fetch(this._editor.api.enginePath(path)).then(async (response) => {
                if (!response.ok) {
                    reject(new Error(`Failed to fetch file: ${path}`));
                    return;
                }
                const data = await response.json();
                cache.set(path, data);
                resolve(data);
            }).catch((error) => {
                console.error(`Error fetching file '${path}':`, error);
                reject(error);
            });
        });
    }
    async build() {
        return new Promise(async (resolve, reject) => {
            try {
                const rawPath = this._schema.path;
                const tokens = rawPath.match(/\${(.*?)}/g) || [];
                const path = tokens.reduce((acc, token) => {
                    const key = token.slice(2, -1);
                    const value = this._data[key] || "";
                    return acc.replace(token, value);
                }, rawPath);
                const fileData = await this.getFileData(path.split("#")[0]);
                const pointer = path.split("#")[1];
                const segments = pointer.split("/").filter(seg => seg.length > 0);
                let value = fileData;
                for (let segment of segments) {
                    if (segment.startsWith("[") && segment.endsWith("]")) {
                        if (!Array.isArray(value)) {
                            value = undefined;
                            console.warn(`Expected array but found non-array at segment: ${segment}`);
                            break;
                        }
                        segment = segment.slice(1, -1); // Remove [ and ]
                        if (segment.startsWith("{") && segment.endsWith("}")) {
                            // Array access by property
                            const conditionStr = segment.slice(1, -1); // Remove { and }
                            const conditions = conditionStr.split(",").map(s => s.trim());
                            const conditionsTokens = conditions.map(cond => {
                                const [propKey, propValueTemplate] = cond.split(":");
                                const propValueTokens = propValueTemplate.match(/\${(.*?)}/g) || [];
                                const propValue = propValueTokens.reduce((acc, token) => {
                                    const key = token.slice(2, -1);
                                    const value = this._data[key] || "";
                                    return acc.replace(token, value);
                                }, propValueTemplate);
                                return { propKey, propValue };
                            });
                            let foundItem = undefined;
                            for (const item of value) {
                                let allMatch = true;
                                for (const { propKey, propValue } of conditionsTokens) {
                                    if (item[propKey] != propValue) {
                                        allMatch = false;
                                        break;
                                    }
                                }
                                if (allMatch) {
                                    foundItem = item;
                                    break;
                                }
                            }
                            if (foundItem !== undefined) {
                                value = foundItem;
                            }
                            else {
                                value = undefined;
                                console.warn(`Array access by properties not found for segment: ${segment}`);
                                break;
                            }
                        }
                        else {
                            // Array access by index
                            const index = parseInt(segment, 10);
                            if (isNaN(index) || index < 0 || index >= value.length) {
                                value = undefined;
                                console.warn(`Invalid array index access at segment: ${segment}`);
                                break;
                            }
                            value = value[index];
                        }
                    }
                    else {
                        if (value.hasOwnProperty(segment)) {
                            value = value[segment];
                        }
                        else {
                            value = undefined;
                            console.warn(`Property '${segment}' not found in object.`);
                            break;
                        }
                    }
                }
                this._ref
                    .text(value || "");
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    }
}

;// ./src/widgets/object-widget.ts







class ObjectWidget extends Widget {
    _schema;
    _data;
    _title;
    _content;
    _active = new ValueStore(false);
    constructor(editor, key, schema, data) {
        super(editor);
        this._schema = schema;
        this._data = data;
        this.class("object-component");
        this.append(this._title = create("a", this)
            .class("title")
            .class("active", this._active)
            // .text(this._data.label || key)
            .on("click", () => {
            this._active.set(!this._active.get());
        })
            .append(create("i", this)
            .class("dropdown")
            .class("icon"), create("h3", this)
            .text(this._schema.label || key)), this._content = create("div", this)
            .class("content")
            .class("active", this._active));
        this.build();
    }
    dispose() {
        if (this._disposed)
            return;
        this._active.dispose();
        super.dispose();
    }
    build() {
        for (const [key, prop] of Object.entries(this._schema.properties)) {
            if (this._data[key] === undefined && prop.type !== "ref") {
                console.warn(`Data for key '${key}' is undefined.`);
                continue;
            }
            if (prop.private === true) {
                continue;
            }
            if (prop.type === "string") {
                this.register(new StringWidget(this._editor, key, prop, this._data).mount(this._content));
            }
            else if (prop.type === "number") {
                this.register(new NumberWidget(this._editor, key, prop, this._data).mount(this._content));
            }
            else if (prop.type === "boolean") {
                this.register(new BooleanWidget(this._editor, key, prop, this._data).mount(this._content));
            }
            else if (prop.type === "object") {
                const dataObj = this._data[key] || null;
                if (dataObj !== null && typeof dataObj === "object") {
                    this.register(new ObjectWidget(this._editor, key, prop, dataObj).mount(this._content));
                }
            }
            else if (prop.type === "array") {
                this.register(new ArrayWidget(this._editor, key, prop, this._data[key] || []).mount(this._content));
            }
            else if (prop.type === "ref") {
                this.register(new RefWidget(this._editor, key, prop, this._data).mount(this._content));
            }
        }
    }
}

;// ./src/editor.ts


class Editor extends Disposable {
    _container;
    _data = {};
    _api;
    _types = {};
    _rootWidget = null;
    constructor(container, api) {
        super();
        this._container = container;
        this._api = api;
        console.log("Editor created");
    }
    get api() {
        return this._api;
    }
    saveState() {
        this._api.triggerStateSave();
    }
    async run(data) {
        if (this._rootWidget) {
            this.unregister(this._rootWidget);
            this._rootWidget.dispose();
            this._rootWidget = null;
        }
        this._data = data;
        return new Promise((resolve) => {
            console.log("Editor running...");
            fetch(this._api.enginePath("schema.json")).then(async (response) => {
                const schema = await response.json();
                console.log("Schema loaded:", schema);
                const propertiesSchema = { type: "object", properties: schema.properties };
                if (schema.definitions) {
                    this._types = schema.definitions;
                    this.replaceDefinitions(propertiesSchema);
                }
                this._rootWidget = this.register(new ObjectWidget(this, "Root", propertiesSchema, this._data).mount(this._container));
                resolve();
            }).catch((error) => {
                console.error("Error loading schema:", error);
                resolve();
            });
        });
    }
    replaceDefinitions(schema) {
        for (const [key, prop] of Object.entries(schema.properties)) {
            if (prop.type === "string" && prop.enum && typeof prop.enum === "string" && this._types[prop.enum]) {
                schema.properties[key] = {
                    ...prop,
                    enum: this._types[prop.enum]
                };
            }
            else if (prop.type === "object") {
                this.replaceDefinitions(prop);
            }
            else if (prop.type === "array") {
                const item = prop.item;
                if (item.type === "object") {
                    this.replaceDefinitions(item);
                }
            }
        }
    }
}

// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(591);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(740);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(128);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(855);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(51);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(656);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./src/styles/styles.css
var styles = __webpack_require__(464);
;// ./src/styles/styles.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(styles/* default */.A, options);




       /* harmony default export */ const styles_styles = (styles/* default */.A && styles/* default */.A.locals ? styles/* default */.A.locals : undefined);

;// ./src/main.ts


//TODO:
// [x] Czy init jest Promise? - TAK!
// [ ] Czy setState jest wywoływany zawsze?
// [ ] Czy addEditorTab można wywołać z setState?
// [ ] Co dzieje się z defaultData jeżeli zostanie coś dodane/usunięte
function main_create() {
    let _api = null;
    let _data = {};
    let editor = null;
    return {
        init(api, options) {
            _api = api;
            _api.addEditorTab("tab_data", "Edycja");
        },
        destroy() {
            // Cleanup code here
        },
        initTab(tabId, container, api) {
            if (tabId === "tab_data") {
                console.log("Initializing tab:", tabId);
                container.classList.add("oseditor-nmzzpp1hty");
                editor = new Editor(container, api);
            }
        },
        destroyTab(tabId, container) {
            if (editor) {
                editor.dispose();
                editor = null;
            }
        },
        setState(stateData) {
            if (editor) {
                _data = stateData;
                editor.run(_data);
            }
            else {
                console.warn("Editor instance is not initialized yet.");
            }
        },
        getState() {
            return _data;
        }
    };
}
/* harmony default export */ const main = (main_create);

/******/ 	return __webpack_exports__;
/******/ })()
;
});;