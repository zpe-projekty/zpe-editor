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
  create: () => (/* binding */ create),
  "default": () => (/* binding */ main)
});

;// ./packages/duct-tape/build/index.js
var e={};function s(e){return!("object"!=typeof e||null===e||Array.isArray(e)||e instanceof RegExp||e instanceof Date)}function t(e){return e instanceof Function}function i(e){return void 0!==e}function r(e,s){return"object"==typeof e&&Object.hasOwn(e,s)}function n(e,i){return s(e)&&t(e[i])}function o(e){return void 0===e||""===e||null===e||0===e}function l(e){return!0===e||"true"===e||"yes"===e||"on"===e||"t"===e||1===e||"1"===e}function h(e){return!1===e||"false"===e||"no"===e||"off"===e||"f"===e||0===e||"0"===e}function a(e,...t){if(!t.length)return e;const i=t.shift();if(s(e)&&s(i))for(const t in i)s(i[t])?(e[t]||Object.assign(e,{[t]:{}}),a(e[t],i[t])):Object.assign(e,{[t]:i[t]});return a(e,...t)}e.d=(s,t)=>{for(var i in t)e.o(t,i)&&!e.o(s,i)&&Object.defineProperty(s,i,{enumerable:!0,get:t[i]})},e.o=(e,s)=>Object.prototype.hasOwnProperty.call(e,s);class c{_disposed;_disposables=new Map;constructor(){this._disposed=!1}dispose(){if(!this._disposed)try{const e=Array.from(this._disposables.entries()).reverse();for(const[,s]of e)try{s()}catch(e){console.error(e)}this._disposables.clear()}finally{this._disposed=!0}}get disposed(){return this._disposed}register(e){return this._disposables.has(e)?(console.warn(`Cannot register ${e?.constructor?.name??e}. This object is already registered.`),e):(s(e)?n(e,"dispose")?this._disposables.set(e,()=>e.dispose()):n(e,"destroy")?this._disposables.set(e,()=>e.destroy()):n(e,"remove")?this._disposables.set(e,()=>e.remove()):console.warn(`The object ${e?.constructor?.name??e} has an unknown release function!`):t(e)?this._disposables.set(e,e):console.warn(`Cannot register ${e}. This object does not have a release function!`),e)}unregister(e){this._disposables.has(e)?this._disposables.delete(e):console.warn("Object ${o} doesn't exist in register.")}}class u extends c{_emitterHandles;constructor(){super(),this._emitterHandles={}}dispose(){this.disposed||(this._emitterHandles={},super.dispose())}on(e,s,t=this){return this._addCallback(e,s,t,!1),()=>this.off(e,s,t)}once(e,s,t=this){return this._addCallback(e,s,t,!0),()=>this.off(e,s,t)}off(e,s,t=this){const i=this._emitterHandles[e];if(i){let e=i.length;for(;--e>=0;)i[e].callback===s&&i[e].scope===t&&i.splice(e,1)}}emit(e,s){const t=this._emitterHandles[e];if(t)for(const i of t)i.callback.call(i.scope,s),i.once&&this.off(e,i.callback,i.scope)}_addCallback(e,s,t,i){let r=this._emitterHandles[e];r||(r=this._emitterHandles[e]=[]),r.push({callback:s,scope:t,once:i})}}const d=u;class b extends d{equal(e){let s;s=e instanceof Function?e:s=>s===e;const t=new v(this,s);return t.on("afterUnsubscribe",()=>{0===t.subscribersLength&&t.dispose()}),t}notEqual(e){let s;s="string"==typeof e?s=>s!==e:s=>!e(s);const t=new v(this,s);return t.on("afterUnsubscribe",()=>{0===t.subscribersLength&&t.dispose()}),t}format(e){const s=new v(this,e);return s.on("afterUnsubscribe",()=>{0===s.subscribersLength&&s.dispose()}),s}mapBoolean(e,s){const t=new v(this,t=>!0===t?e:!1===t?s:void 0);return t.on("afterUnsubscribe",()=>{0===t.subscribersLength&&t.dispose()}),t}not(){const e=new v(this,e=>!e);return e.on("afterUnsubscribe",()=>{0===e.subscribersLength&&e.dispose()}),e}and(e){const s=new m(this,e,(e,s)=>!!e&&!!s);return s.on("afterUnsubscribe",()=>{0===s.subscribersLength&&s.dispose()}),s}or(e){const s=new m(this,e,(e,s)=>!!e||!!s);return s.on("afterUnsubscribe",()=>{0===s.subscribersLength&&s.dispose()}),s}}function p(e){return e instanceof b}class f extends b{listeners=[];value;initValue;prev;constructor(e){super(),this.value=e,this.initValue=e,this.prev=void 0}dispose(){this.disposed||(this.listeners.splice(0,this.listeners.length),super.dispose())}subscribe(e,s=this){const t={callback:e,scope:s};return this.listeners.push(t),this.deliveryValueToSubscriber(t,this.value,this.prev),()=>{this.listeners.splice(this.listeners.indexOf(t),1),this.emit("afterUnsubscribe",this)}}set(e){const s="function"==typeof e?e(this.get(),this.initValue):e;this.prev=this.get(),this.value!==s&&(Array.isArray(this.value)?this.value=[...s]:"object"==typeof this.value?this.value=a(this.value,s):this.value=s,this.deliveryValue(this.value,this.prev))}reinitAndSet(e){"object"==typeof e?this.set({...this.initValue,...e}):this.set(e)}get(){return Array.isArray(this.value)?[...this.value]:"object"==typeof this.value?a({},this.value):this.value}toString(){return void 0===this.value||null===this.value?"undefined":this.value.toString()}deliveryValue(e,s){for(const t of this.listeners)this.deliveryValueToSubscriber(t,e,s)}deliveryValueToSubscriber(e,s,t){e.callback.call(e.scope,s,t)}}class v extends b{listeners=[];watch;prev;value;transform;constructor(e,s){super(),this.watch=e,this.transform=s,this.value=this.transform(this.watch.get()),this.register(this.watch.subscribe(e=>{const s=this.transform(e);this.value!==s&&(this.prev=this.value,this.value=s,this.deliverValue(this.value,this.prev))}))}subscribe(e,s=this){const t={callback:e,scope:s};return this.listeners.push(t),this.deliverValueToSubscriber(t,this.value,this.prev),()=>{this.listeners.splice(this.listeners.indexOf(t),1),this.emit("afterUnsubscribe",void 0)}}get(){return this.value}toString(){return this.watch.toString()}get subscribersLength(){return this.listeners.length}deliverValue(e,s){for(const t of this.listeners)this.deliverValueToSubscriber(t,e,s)}deliverValueToSubscriber(e,s,t){e.callback.call(e.scope,s,t)}}class m extends b{listeners=[];watch1;watch2;prev;value;transform;constructor(e,s,t){super(),this.watch1=e,this.watch2=s,this.transform=t,this.value=this.transform(this.watch1.get(),this.watch2.get()),this.register(this.watch1.subscribe(e=>{const s=this.transform(e,this.watch2.get());this.value!==s&&(this.prev=this.value,this.value=s,this.deliverValue(this.value,this.prev))})),this.register(this.watch2.subscribe(e=>{const s=this.transform(this.watch1.get(),e);this.value!==s&&(this.prev=this.value,this.value=s,this.deliverValue(this.value,this.prev))}))}subscribe(e,s=this){const t={callback:e,scope:s};return this.listeners.push(t),this.deliverValueToSubscriber(t,this.value,this.prev),()=>{this.listeners.splice(this.listeners.indexOf(t),1),this.emit("afterUnsubscribe",void 0)}}get(){return this.value}toString(){return this.watch1.toString()+this.watch2.toString()}get subscribersLength(){return this.listeners.length}deliverValue(e,s){for(const t of this.listeners)this.deliverValueToSubscriber(t,e,s)}deliverValueToSubscriber(e,s,t){e.callback.call(e.scope,s,t)}dispose(){this.disposed||(this.listeners.splice(0,this.listeners.length),super.dispose())}}function g(e,s){const t=new _(e);return s instanceof c&&s.register(t),t}class _ extends c{_element;constructor(e){super();const s=e.split(":");if(1===s.length)this._element=document.createElement(e);else{if(2!==s.length)throw new Error("Invalid selector");{const e=s[0],t=s[1];this._element=document.createElementNS(e,t)}}}attr(e,s){return s instanceof b?this.register(s.subscribe(s=>{this._element.setAttribute(e,String(s))})):this._element.setAttribute(e,String(s)),this}property(e,s){return void 0===s?this._element[e]:(s instanceof b?this.register(s.subscribe(s=>{this._element[e]=s})):this._element[e]=s,this)}style(e,s){return s instanceof b?this.register(s.subscribe(s=>{this._element.style[e]=s})):this._element.style[e]=s,this}class(e,s=!0){return s instanceof b?this.register(s.subscribe(s=>{s?Array.isArray(e)?this._element.classList.add(...e):this._element.classList.add(e):Array.isArray(e)?this._element.classList.remove(...e):this._element.classList.remove(e)})):s?Array.isArray(e)?this._element.classList.add(...e):this._element.classList.add(e):Array.isArray(e)?this._element.classList.remove(...e):this._element.classList.remove(e),this}on(e,s,t){return this._element.addEventListener(e,s,t),this.register(()=>{this._element.removeEventListener(e,s,t)}),this}off(e,s,t){return this._element.removeEventListener(e,s,t),this}text(e){if(e instanceof b){const s=document.createTextNode("");this._element.appendChild(s),this.register(e.subscribe(e=>{s.textContent=String(e)}))}else this._element.innerText=String(e);return this}html(e){return this._element.innerHTML=e,this}append(...e){for(const s of e)this._element.appendChild(s.element);return this}mount(e){return e instanceof _?e._element.appendChild(this._element):e.appendChild(this._element),this}get element(){return this._element}}
;// ./src/widgets/widget.ts

class Widget extends _ {
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
        this._input = new _("input")
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
        const labelNode = new _("label")
            .text(label)
            .style("display", "block")
            .style("marginBottom", "4px");
        this._messageNode = new _("div")
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
        this.append(this._itemsContainer = g("div", this)
            .class("items-container"));
        this.build();
    }
    build() {
        if (this._schema.item === undefined) {
            return;
        }
        this._data.forEach((data, index) => {
            const item = g("div").class("array-item");
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
            this._input = g("select", this)
                .style("display", "block")
                .style("marginBottom", "8px")
                .on("change", () => {
                this._data[key] = this._input.property("value");
            });
            for (const [enumKey, enumLabel] of Object.entries(schema.enum)) {
                const option = g("option", this._input)
                    .attr("value", enumKey)
                    .text(enumLabel);
                if (this._data[key] === enumKey) {
                    option.attr("selected", "selected");
                }
                this._input.append(option);
            }
        }
        else {
            this._input = g("input", this)
                .attr("type", "text")
                .style("display", "block")
                .style("marginBottom", "8px")
                .property("value", this._data[key] || "")
                .on("input", () => {
                this._data[key] = this._input.property("value");
                this._editor.saveState();
            });
        }
        const labelNode = g("label", this)
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
        this._checkbox = new _("input")
            .attr("type", "checkbox")
            .style("marginRight", "8px")
            .property("checked", !!this._data[key])
            .on("input", () => {
            this._data[key] = this._checkbox.property("checked");
            this._editor.saveState();
        });
        const labelNode = new _("label")
            .style("cursor", "pointer")
            .append(this._checkbox)
            .append(new _("span").text(label));
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
        this._ref = new _("div")
            .style("display", "block")
            .style("marginBottom", "8px");
        const labelNode = new _("label")
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
    _active = new f(false);
    constructor(editor, key, schema, data) {
        super(editor);
        this._schema = schema;
        this._data = data;
        this.class("object-component");
        this.append(this._title = g("a", this)
            .class("title")
            .class("active", this._active)
            // .text(this._data.label || key)
            .on("click", () => {
            this._active.set(!this._active.get());
        })
            .append(g("i", this)
            .class("dropdown")
            .class("icon"), g("h3", this)
            .text(this._schema.label || key)), this._content = g("div", this)
            .class("content")
            .class("active", this._active));
        this.build();
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


class Editor extends c {
    _container;
    _data = {};
    _api;
    _types = {};
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
                this.register(new ObjectWidget(this, "Root", propertiesSchema, this._data).mount(this._container));
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
function create() {
    let _api = null;
    let _data = {};
    let _running = false;
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
            if (_running) {
                console.warn("setState called while editor is already running. This may lead to inconsistent state.");
                return;
            }
            if (editor) {
                _data = stateData;
                editor.run(_data);
                _running = true;
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
/* harmony default export */ const main = (create);
// let _data = {
//     extraValue: 42,
//     message: "Hello, Editor!"
// };
// let _api = null;
// let _input = null;
// return function () {
//     return {
//         init: function (api, options) {
//             _api = api;
//             _api.addEditorTab("tab01", "Edycja");
//         },
//         destroy: function () {},
//         initTab(tab, container, api) {
//             // Initialize the tab content
//             console.log("Initializing tab:", tab);
//             if (tab == "tab01") {
//                 _input = document.createElement("input");
//                 _input.type = "text";
//                 _input.value = _data.message;
//                 _input.addEventListener("input", () => {
//                     _data.message = _input.value;
//                 });
//                 _input.addEventListener("change", () => {
//                     _api.triggerStateSave().then(() => {
//                         console.log("State saved from editor tab.");
//                     });
//                 });
//                 container.appendChild(_input);
//             }
//         },
//         destroyTab(tab, container) {
//             // Clean up the tab content
//             console.log("Destroying tab:", tab);
//             if (tab == "tab01" && _input) {
//                 container.removeChild(_input);
//                 _input = null;
//             }
//         },
//         setState(stateData) {
//             console.log("Setting state in editor:", stateData);
//             _data = { ..._data, ...stateData };
//         },
//         getState() {
//             console.log("Getting state from editor");
//             return _data;
//         }
//     };
// };

/******/ 	return __webpack_exports__;
/******/ })()
;
});;