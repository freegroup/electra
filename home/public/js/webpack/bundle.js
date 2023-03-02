(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../common/public/js/AppSwitch.js":
/*!****************************************!*\
  !*** ../common/public/js/AppSwitch.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
class AppSwitch {
  constructor(permissions) {
    let appSwitchButtons = $(` 
            <label class="dropdown" >
                <span class="image-button application-waffel"  data-toggle="dropdown">
                  <img  src="../common/images/app_switch.svg" />
                </span>

                <div class="dropdown-menu" role="menu" >
                      <label class="applicationSwitchHome image-button">
                        <img src="../common/images/app_home.svg"/>
                        <div>Home<br>&nbsp;</div>
                      </label>

                      <label class="applicationSwitchSimulator image-button">
                        <img src="../common/images/app_simulator.svg"/>
                        <div>Circuit</div>
                        <div>Simulator</div>
                      </label>

                      <label class="applicationSwitchAuthor image-button" >
                        <img src="../common/images/app_lessons.svg"/>
                        <div>Lesson</div>
                        <div>Author</div>
                      </label>

                      <label class="applicationSwitchDesigner image-button" >
                        <img src="../common/images/app_designer.svg"/>
                        <div>Component</div>
                        <div>Designer</div>
                      </label>

                      <label class="applicationSwitchGallery image-button" >
                        <img src="../common/images/app_gallery.svg"/>
                        <div>Community</div>
                        <div>Gallery</div>
                      </label>

                      <label class="applicationSwitchYoutube image-button" >
                        <img src="../common/images/app_youtube.svg"/>
                        <div>Youtube</div>
                        <div>Channel</div>
                      </label>

                      <label class="applicationSwitchLegal image-button" >
                        <img src="../common/images/app_legal.svg"/>
                        <div>Terms of Use</div>
                        <div>Privacy</div>
                      </label>

                </div>   
         </span>
    `);
    $(".applicationSwitch").prepend(appSwitchButtons);
    $(".applicationSwitchYoutube").off("click").on("click", () => {
      window.open("https://www.youtube.com/@electra.academy", "youtube");
    });
    $(".applicationSwitchLegal").off("click").on("click", () => {
      window.open("../legal", "legal");
    });
    $(".applicationSwitchGallery").off("click").on("click", () => {
      window.open("../gallery", "gallery");
    });
    $(".applicationSwitchDesigner").off("click").on("click", () => {
      window.open("../designer", "designer");
    });
    $(".applicationSwitchAuthor").off("click").on("click", () => {
      window.open("../author", "author");
    });
    $(".applicationSwitchSimulator").off("click").on("click", () => {
      window.open("../simulator", "simulator");
    });
    $(".applicationSwitchHome").off("click").on("click", () => {
      window.open("../home", "home");
    });
    if (permissions.featureset.usermanagement === true) {
      $(document).on("click", ".applicationSwitchUser", () => {
        window.open("../user", "user");
      });
    } else {
      $(".applicationSwitchUser").remove();
    }
  }
}
exports["default"] = AppSwitch;

/***/ }),

/***/ "../common/public/js/LngSwitch.js":
/*!****************************************!*\
  !*** ../common/public/js/LngSwitch.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
const lngs = {
  en: {
    nativeName: 'English'
  },
  de: {
    nativeName: 'Deutsch'
  }
};
class LngSwitch {
  constructor(permissions) {
    $(".appbar").append(`
        <span class="group">
          <div class="dropdown" id="languageSwitcher" >
            <span class="image-button" data-toggle="dropdown">
              <img src="../common/images/toolbar_language.svg"/>
            </span>
            <ul class="dropdown-menu  dropdown-menu-right" role="menu" >
            </ul>
          </div>
        </span>
      `);

    // fill language switcher
    Object.keys(lngs).map(lng => {
      const name = lngs[lng].nativeName;
      $('#languageSwitcher .dropdown-menu').append(`<li data-name="${name}" data-lng="${lng}">${name}</li>`);
    });
    $('#languageSwitcher li').on("click", event => {
      const locale = $(event.currentTarget).data("lng");
      i18next.changeLanguage(locale, () => {
        this.rerender();
      });
      // we use socket to emit the language change. The backend can now update all open browser windows
      //
      socket.emit("i18n", locale);
    });

    // receive event from different browser to sync the langugage
    //
    socket.on("i18n", locale => {
      i18next.changeLanguage(locale, () => {
        this.rerender();
      });
    });
  }
  rerender() {
    $('body').localize();
  }
}
exports["default"] = LngSwitch;

/***/ }),

/***/ "../common/public/js/Userinfo.js":
/*!***************************************!*\
  !*** ../common/public/js/Userinfo.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/dist/browser/axios.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Userinfo {
  constructor(permissions) {
    if (permissions.featureset.authentication === false) {
      $(".userinfo_toggler").remove();
    } else {
      // https://console.cloud.google.com/apis/credentials
      google.accounts.id.initialize({
        client_id: "941934804792-2cosu3n1jpm05jj5551i095hppugtuo2.apps.googleusercontent.com",
        login_uri: `${window.location.protocol}//${window.location.host}/oauth/callback${window.location.pathname}`,
        ux_mode: "redirect"
      });
      _axios.default.get("../userinfo").then(response => {
        this.user = response.data;
        let icon = this.user.picture ? this.user.picture : "../common/images/toolbar_user.svg";
        let role = this.user.role === "admin" ? "(Administrator)" : "";
        $(".userinfo_toggler img").attr("src", icon);
        $(".userinfo_toggler .dropdown-menu").html(` 
              <div class="userContainer">
                <img src="${icon}"/>
                <div>${this.user.displayName}</div>
                <div>${role}</div>
              </div>
          `);
      }).catch(() => {
        $(".userinfo_toggler").each(function (i, element) {
          google.accounts.id.renderButton(element,
          // "size: medium" do not render user information into the button. But with "large", only one button is updated and not all of them
          // In this case I decide to use a consistend appearance
          {
            theme: "outline",
            size: "large",
            mode: "redirect",
            text: "signin"
          } // customization attributes
          );
        });
        //google.accounts.id.prompt(); // also display the One Tap dialog
      });
    }
  }

  getUser() {
    return this.user;
  }
}
exports["default"] = Userinfo;

/***/ }),

/***/ "../common/public/js/inlineSVG.js":
/*!****************************************!*\
  !*** ../common/public/js/inlineSVG.js ***!
  \****************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory(root)),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : (void 0).window || (void 0).global, function (root) {
  // Variables
  var inlineSVG = {},
    supports = !!document.querySelector && !!root.addEventListener,
    settings;

  // Defaults
  var defaults = {
    initClass: 'js-inlinesvg',
    svgSelector: 'img.svg:not(.loading-in-progress)'
  };

  /**
   * Stolen from underscore.js
   * @private
   * @param {Int} times
   * @param {Function} func
   */

  var after = function (times, func) {
    return function () {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  /**
   * Merge two objects together
   * @private
   * @param {Function} fn
   */
  var extend = function () {
    // Variables
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;

    // Check if a deep merge
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
      deep = arguments[0];
      i++;
    }

    // Merge the object into the extended object
    var merge = function (obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          // If deep merge and property is an object, merge properties
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            extended[prop] = extend(true, extended[prop], obj[prop]);
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };

    // Loop through each object and conduct a merge
    for (; i < length; i++) {
      var obj = arguments[i];
      merge(obj);
    }
    return extended;
  };

  // Methods

  /**
   * Grab all the SVGs that match the selector
   * @public
   */
  var getAll = function () {
    return document.querySelectorAll(settings.svgSelector);
  };

  /**
   * Inline all the SVGs in the array
   * @public
   */
  var inliner = function (cb) {
    var svgs = getAll();
    if (svgs.length === 0) {
      cb(settings.svgSelector);
      return;
    }
    var callback = after(svgs.length, cb);
    Array.prototype.forEach.call(svgs, function (svg, i) {
      svg.classList.add('loading-in-progress');
    });
    Array.prototype.forEach.call(svgs, function (svg, i) {
      // Store some attributes of the image
      var src = svg.src || svg.getAttribute('data-src'),
        attributes = svg.attributes;

      // Get the contents of the SVG
      var request = new XMLHttpRequest();
      request.open('GET', src, true);
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          // Setup a parser to convert the response to text/xml in order for it
          // to be manipulated and changed
          var parser = new DOMParser(),
            result = parser.parseFromString(request.responseText, 'text/xml'),
            inlinedSVG = result.getElementsByTagName('svg')[0];
          let titles = inlinedSVG.getElementsByTagName('title');
          while (titles[0]) titles[0].parentNode.removeChild(titles[0]);
          let descs = inlinedSVG.getElementsByTagName('desc');
          while (descs[0]) descs[0].parentNode.removeChild(descs[0]);

          // Remove some of the attributes that aren't needed
          inlinedSVG.removeAttribute('xmlns:a');
          inlinedSVG.removeAttribute('width');
          inlinedSVG.removeAttribute('height');
          inlinedSVG.removeAttribute('x');
          inlinedSVG.removeAttribute('y');
          inlinedSVG.removeAttribute('enable-background');
          inlinedSVG.removeAttribute('xmlns:xlink');
          inlinedSVG.removeAttribute('xml:space');
          inlinedSVG.removeAttribute('version');

          // Add in the attributes from the original <img> except `src` or
          // `alt`, we don't need either
          Array.prototype.slice.call(attributes).forEach(function (attribute) {
            if (attribute.name !== 'src' && attribute.name !== 'alt') {
              inlinedSVG.setAttribute(attribute.name, attribute.value);
            }
          });
          inlinedSVG.classList.remove('loading-in-progress');
          inlinedSVG.classList.add('inlined-svg');

          // Add in some accessibility quick wins
          inlinedSVG.setAttribute('role', 'img');

          // Use the `longdesc` attribute if one exists
          if (attributes.longdesc) {
            var description = document.createElementNS('http://www.w3.org/2000/svg', 'desc'),
              descriptionText = document.createTextNode(attributes.longdesc.value);
            description.appendChild(descriptionText);
            inlinedSVG.insertBefore(description, inlinedSVG.firstChild);
          }

          // Use the `alt` attribute if one exists
          if (attributes.alt) {
            inlinedSVG.setAttribute('aria-labelledby', 'title');
            var title = document.createElementNS('http://www.w3.org/2000/svg', 'title'),
              titleText = document.createTextNode(attributes.alt.value);
            title.appendChild(titleText);
            inlinedSVG.insertBefore(title, inlinedSVG.firstChild);
          }

          // Replace the image with the SVG
          svg.parentNode.replaceChild(inlinedSVG, svg);

          // Fire the callback
          callback(settings.svgSelector);
        } else {
          console.error('There was an error retrieving the source of the SVG.');
        }
      };
      request.onerror = function () {
        console.error('There was an error connecting to the origin server.');
      };
      request.send();
    });
  };

  /**
   * Initialise the inliner
   * @public
   */
  inlineSVG.init = function (options, callback) {
    // Test for support
    if (!supports) return;

    // Merge users option with defaults
    settings = {
      ...defaults,
      ...options
    };
    inliner(callback ?? function () {});
  };
  return inlineSVG;
});

/***/ }),

/***/ "../common/public/js/polyfill.js":
/*!***************************************!*\
  !*** ../common/public/js/polyfill.js ***!
  \***************************************/
/***/ (() => {

"use strict";


// We need a function to return a "float" instead of an "string" to cut off traling numbers 
// after deicmal dot.
Number.prototype.toFixedNumber = function (digits) {
  // "+" to convert back to number
  return +this.toFixed(digits);
};
let tokenMap = {
  "<strong>": "**",
  "</strong>": "**",
  "<em>": "*",
  "</em>": "*"
};
String.prototype.tuiMarkdownFix = function () {
  var re = new RegExp(Object.keys(tokenMap).join("|"), "g");
  return this.replace(re, function (matched) {
    return tokenMap[matched];
  });
};

/***/ }),

/***/ "./public/js/Application.js":
/*!**********************************!*\
  !*** ./public/js/Application.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _Userinfo = _interopRequireDefault(__webpack_require__(/*! ../../common/js/Userinfo */ "../common/public/js/Userinfo.js"));
var _AppSwitch = _interopRequireDefault(__webpack_require__(/*! ../../common/js/AppSwitch */ "../common/public/js/AppSwitch.js"));
var _LngSwitch = _interopRequireDefault(__webpack_require__(/*! ../../common/js/LngSwitch */ "../common/public/js/LngSwitch.js"));
var _partyJs = _interopRequireDefault(__webpack_require__(/*! party-js */ "./node_modules/party-js/lib/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Application {
  constructor() {}
  init(permissions) {
    return new Promise((resolve, reject) => {
      this.userinfo = new _Userinfo.default(permissions);
      this.appSwitch = new _AppSwitch.default(permissions);
      this.lngSwitch = new _LngSwitch.default(permissions);
      $(".launchArea .electra-button").one("mouseover", function () {
        _partyJs.default.confetti(this);
      });
      resolve(this);
    });
  }
}
let app = new Application();
var _default = app;
exports["default"] = _default;

/***/ }),

/***/ "./public/js/global.js":
/*!*****************************!*\
  !*** ./public/js/global.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _i18next = _interopRequireDefault(__webpack_require__(/*! i18next */ "./node_modules/i18next/dist/cjs/i18next.js"));
var _inlineSVG = _interopRequireDefault(__webpack_require__(/*! ../../common/js/inlineSVG */ "../common/public/js/inlineSVG.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const t = _i18next.default.t;
var _default = {
  inlineSVG: _inlineSVG.default,
  i18next: _i18next.default,
  t
};
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/cross-fetch/dist/browser-ponyfill.js":
/*!***********************************************************!*\
  !*** ./node_modules/cross-fetch/dist/browser-ponyfill.js ***!
  \***********************************************************/
/***/ (function(module, exports) {

var global = typeof self !== 'undefined' ? self : this;
var __self__ = (function () {
function F() {
this.fetch = false;
this.DOMException = global.DOMException
}
F.prototype = global;
return new F();
})();
(function(self) {

var irrelevant = (function (exports) {

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = self.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new exports.DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
})(__self__);
__self__.fetch.ponyfill = true;
// Remove "polyfill" property added by whatwg-fetch
delete __self__.fetch.polyfill;
// Choose between native implementation (global) or custom implementation (__self__)
// var ctx = global.fetch ? global : __self__;
var ctx = __self__; // this line disable service worker support temporarily
exports = ctx.fetch // To enable: import fetch from 'cross-fetch'
exports["default"] = ctx.fetch // For TypeScript consumers without esModuleInterop.
exports.fetch = ctx.fetch // To enable: import {fetch} from 'cross-fetch'
exports.Headers = ctx.Headers
exports.Request = ctx.Request
exports.Response = ctx.Response
module.exports = exports


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./public/less/index.less":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./public/less/index.less ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII= */ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII="), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg== */ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg=="), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  font-family: 'Roboto', sans-serif !important;\n  font-weight: 300;\n}\nbody .dropdown-menu {\n  padding: var(--menu-container-padding);\n}\nbody .dropdown-menu li {\n  text-align: left;\n  display: flex;\n  flex-direction: row;\n  height: 32px;\n  align-items: center;\n  cursor: pointer;\n  border-radius: 4px;\n  padding-left: 4px;\n  padding-right: 4px;\n}\n@keyframes spinner {\n  to {\n    transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n.spinner > * {\n  opacity: 0.08 !important;\n}\n.spinner:before {\n  content: '';\n  transform: translate(-50%, -50%);\n  position: absolute;\n  z-index: 2000;\n  top: 50%;\n  left: 50%;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  border-width: 2px;\n  border-style: solid;\n  animation: spinner 0.6s linear infinite;\n}\n.tooltip {\n  z-index: 1000000;\n}\n.userinfo_toggler .userContainer {\n  text-align: center;\n}\n.userinfo_toggler .userContainer img {\n  width: 90px;\n}\n.appbar {\n  height: 70px;\n  position: relative;\n  border: none !important;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.appbar .icon {\n  height: 40;\n}\n.appbar .title h1 {\n  font-size: 24px;\n  font-weight: 200;\n  letter-spacing: 6px;\n  margin: 0;\n}\n.appbar .title h2 {\n  font-size: 14px;\n  font-weight: 400;\n  letter-spacing: 4px;\n  margin: 0;\n}\n.appbar .spacer {\n  flex-grow: 1;\n}\n.appbar .group {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n.appbar .image-button {\n  cursor: pointer;\n}\n.list {\n  padding: var(--menu-container-padding);\n  margin: 0;\n  border: 0;\n}\n.list .list-item {\n  font-weight: 400;\n  height: 32px;\n  font-size: var(--label-font-size);\n  padding: var(--menu-container-padding);\n  border-radius: 4px;\n}\n.list .list-item:hover {\n  background-color: rgb(var(--list-item-hover-bg-color));\n}\n.list .list-item:hover .list-item-action {\n  opacity: 1;\n  transform: scale(1);\n  transition: all 0.2s ease;\n}\n.list .list-item.selected {\n  background-color: rgb(var(--list-item-selected-bg-color));\n}\n.list .list-item.selected .list-item-action {\n  opacity: 1;\n  transform: scale(1);\n  transition: all 0.2s ease;\n}\n.list .list-item .list-item-action {\n  opacity: 0;\n  transform: scale(0.5);\n  transition: all 0.2s ease;\n  font-size: 20px;\n  min-width: 25px;\n}\n.list .list-item:before {\n  background-color: rgb(var(--tint-color));\n  block-size: 16px;\n  border-radius: 3px;\n  content: \"\";\n  inline-size: 3px;\n  inset-inline-start: 0;\n  opacity: 0;\n  position: absolute;\n  transform: scaleY(0);\n  transition: transform 170ms cubic-bezier(0, 0, 0, 1);\n  margin-left: 2px;\n}\n.list .list-item.selected:before {\n  opacity: 1;\n  transform: scaleY(1);\n}\n.toolbar {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding-right: 10px;\n  height: 60;\n  padding: var(--menu-container-padding);\n}\n.toolbar * {\n  outline: none;\n}\n.toolbar .spacer {\n  flex-grow: 1;\n}\n.toolbar .group {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 100%;\n  gap: 8px;\n}\n.toolbar .group .statusIndicator {\n  margin: 20px;\n}\n.toolbar .group .statusIndicator img {\n  display: block;\n  cursor: pointer;\n  margin: auto;\n}\n.toolbar .group .statusIndicator span {\n  font-size: 0.8em;\n  text-align: center;\n  width: 100%;\n  display: inline-block;\n  white-space: nowrap;\n}\n.toolbar .group .statusIndicator .notSupported {\n  display: none;\n  font-weight: bold;\n}\n.toolbar .group .statusIndicator .connected {\n  display: block;\n}\n.toolbar .group .statusIndicator .disconnected {\n  display: none;\n}\n.toolbar .group .statusIndicator.disabled img {\n  cursor: not-allowed;\n}\n.toolbar .group .statusIndicator.disabled img:hover {\n  box-shadow: none;\n}\n.toolbar .group .statusIndicator.disabled .notSupported {\n  display: block;\n}\n.toolbar .group .statusIndicator.disabled .connected {\n  display: none;\n}\n.toolbar .group .statusIndicator.disabled .disconnected {\n  display: none;\n}\n.toolbar .group .statusIndicator.error:not(.disabled) span {\n  font-weight: bold;\n}\n.toolbar .group .statusIndicator.error:not(.disabled) .notSupported {\n  display: none;\n}\n.toolbar .group .statusIndicator.error:not(.disabled) .connected {\n  display: none;\n}\n.toolbar .group .statusIndicator.error:not(.disabled) .disconnected {\n  display: block;\n}\n.tree-leaf {\n  font-weight: var(--label-font-weight);\n  font-size: var(--label-font-size);\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  float: unset;\n  min-height: 28px;\n}\n.tree-leaf .tree-leaf-content {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  cursor: pointer;\n  transition: all 0.4s;\n  padding-left: 3px;\n  height: 25px;\n  border-radius: 4px;\n}\n.tree-leaf .tree-leaf-content.tree-child-leaves {\n  transition: all 0.4s;\n}\n.tree-leaf .tree-leaf-content:hover {\n  transition: all 0.4s;\n}\n.tree-leaf .tree-leaf-content.selected {\n  transition: all 0.4s;\n}\n.tree-leaf .tree-leaf-content .tree-leaf-text {\n  float: unset;\n}\n.tree-leaf .tree-leaf-content .tree-expando {\n  float: unset;\n  top: unset;\n  position: unset;\n  width: 16px;\n  height: 16px;\n  line-height: 14px;\n  border-radius: 4px;\n  border-width: 1px;\n}\n.tree-leaf .tree-leaf-content .tree-expando.hidden {\n  display: block !important;\n  visibility: hidden !important;\n}\n/** don't place \".section\" in the sub-tree of \".sections\" . The \".section\" is \n    used in other page elements like pdf, dialog, single page, ... as well without the\n    outer \"sections\" content\n **/\n.section {\n  margin-left: 20px;\n  margin-right: 20px;\n  cursor: pointer;\n  border-width: 1px;\n  border-style: solid;\n  padding-left: 3px;\n  position: relative;\n}\n.section.error {\n  border-width: 1px;\n  border-style: solid;\n}\n.section .fc {\n  position: absolute;\n  top: 0px;\n  bottom: 0px;\n  right: 0px;\n  width: 5px;\n}\n.section .fc .tinyFlyoverMenu {\n  opacity: 0;\n  z-index: unset;\n}\n.section[data-type='timing'],\n.section[data-type='image'] {\n  text-align: center;\n}\n.section .sectionContent {\n  /* required for flashcard */\n  perspective: 1800px;\n}\n.section .sectionContent .placeholderContainer {\n  display: flex;\n  width: fit-content;\n  padding: 15px;\n  border-radius: 8px;\n  margin: 50px;\n  margin-left: auto;\n  margin-right: auto;\n  border-style: dashed;\n  border-width: 1px;\n}\n.section .sectionContent .placeholderContainer .placeholderButtons {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  padding-left: 3vw;\n  justify-content: center;\n}\n.section .sectionContent .placeholderContainer .placeholderButtons .placeholderMenuInsertSection {\n  text-align: left;\n}\n.section .sectionContent .placeholderContainer .placeholderText h1 {\n  font-size: 14px !important;\n  font-weight: bold !important;\n  border: none !important;\n}\n.section .sectionContent .placeholderContainer .placeholderText h2 {\n  font-size: var(--label-font-size);\n  font-weight: var(--label-font-weight);\n}\n.section .sectionContent[data-type='image'] {\n  text-align: center;\n  max-width: 100%;\n}\n.section .sectionContent[data-type='image'] #editor-container {\n  display: inline-grid;\n  min-height: 200px;\n  position: relative;\n  justify-items: center;\n  width: 100%;\n}\n.section .sectionContent[data-type='image'] #editor-container .drop-message {\n  height: 100px;\n  border: 1px solid rgb(var(--border-color));\n  display: flex;\n  width: 300px;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(var(--pane-bg-color), 0.4);\n  border-radius: 8px;\n  box-shadow: var(--box-shadow-1);\n  grid-area: 1 / 1 / 2 / 2;\n  position: absolute;\n  margin-top: 2vh;\n  backdrop-filter: blur(4px);\n  font-size: var(--label-font-size);\n  font-weight: var(--label-font-weight);\n}\n.section .sectionContent[data-type='image'] #editor-container .scaleSlider {\n  position: absolute;\n  width: 100%;\n}\n.section .sectionContent[data-type='image'] #editor-container #image-preview {\n  grid-area: 1 / 1 / 2 / 2;\n  width: 100%;\n}\n.section .sectionContent[data-type='image'] #editor-container #image-preview .image-view {\n  display: inline-block;\n  position: relative;\n  margin-right: 13px;\n  margin-bottom: 13px;\n  width: 100%;\n}\n.section .sectionContent[data-type='image'] #editor-container #image-preview .image-view img {\n  max-width: 100%;\n}\n.section .sectionContent[data-type='image'] #editor-container #image-preview .overlay {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  right: 0;\n}\n.section .sectionContent[data-type='flashcard'] h1,\n.section .sectionContent[data-type='wysiwyg'] h1,\n.section .sectionContent[data-type='markdown'] h1,\n.section .sectionContent[data-type='cloze'] h1 {\n  font-weight: 400;\n  margin-bottom: 0;\n  margin-bottom: 18px;\n  margin-top: 19px;\n  border-bottom-width: 2px;\n  border-bottom-style: solid;\n  font-size: 18px;\n}\n.section .sectionContent[data-type='flashcard'] h2,\n.section .sectionContent[data-type='wysiwyg'] h2,\n.section .sectionContent[data-type='markdown'] h2,\n.section .sectionContent[data-type='cloze'] h2,\n.section .sectionContent[data-type='flashcard'] h3,\n.section .sectionContent[data-type='wysiwyg'] h3,\n.section .sectionContent[data-type='markdown'] h3,\n.section .sectionContent[data-type='cloze'] h3 {\n  font-weight: 300;\n  font-size: 18px;\n}\n.section .sectionContent[data-type='flashcard'] table,\n.section .sectionContent[data-type='wysiwyg'] table,\n.section .sectionContent[data-type='markdown'] table,\n.section .sectionContent[data-type='cloze'] table {\n  margin-left: auto !important;\n  margin-right: auto !important;\n  border: 1px solid rgb(var(--border-color));\n  border-collapse: separate;\n  border-left: 0;\n  border-radius: 4px;\n  border-spacing: 0px;\n}\n.section .sectionContent[data-type='flashcard'] table thead,\n.section .sectionContent[data-type='wysiwyg'] table thead,\n.section .sectionContent[data-type='markdown'] table thead,\n.section .sectionContent[data-type='cloze'] table thead {\n  display: table-header-group;\n  vertical-align: middle;\n  border-color: inherit;\n  border-collapse: separate;\n}\n.section .sectionContent[data-type='flashcard'] table tr,\n.section .sectionContent[data-type='wysiwyg'] table tr,\n.section .sectionContent[data-type='markdown'] table tr,\n.section .sectionContent[data-type='cloze'] table tr {\n  display: table-row;\n  vertical-align: inherit;\n  border-color: inherit;\n}\n.section .sectionContent[data-type='flashcard'] table th,\n.section .sectionContent[data-type='wysiwyg'] table th,\n.section .sectionContent[data-type='markdown'] table th,\n.section .sectionContent[data-type='cloze'] table th,\n.section .sectionContent[data-type='flashcard'] table td,\n.section .sectionContent[data-type='wysiwyg'] table td,\n.section .sectionContent[data-type='markdown'] table td,\n.section .sectionContent[data-type='cloze'] table td {\n  padding: 5px 8px 6px 8px;\n  text-align: left;\n  vertical-align: top;\n  border-left: 1px solid rgb(var(--border-color));\n}\n.section .sectionContent[data-type='flashcard'] table td,\n.section .sectionContent[data-type='wysiwyg'] table td,\n.section .sectionContent[data-type='markdown'] table td,\n.section .sectionContent[data-type='cloze'] table td {\n  border-top: 1px solid rgb(var(--border-color));\n}\n.section .sectionContent[data-type='flashcard'] table thead:first-child tr:first-child th:first-child,\n.section .sectionContent[data-type='wysiwyg'] table thead:first-child tr:first-child th:first-child,\n.section .sectionContent[data-type='markdown'] table thead:first-child tr:first-child th:first-child,\n.section .sectionContent[data-type='cloze'] table thead:first-child tr:first-child th:first-child,\n.section .sectionContent[data-type='flashcard'] table tbody:first-child tr:first-child td:first-child,\n.section .sectionContent[data-type='wysiwyg'] table tbody:first-child tr:first-child td:first-child,\n.section .sectionContent[data-type='markdown'] table tbody:first-child tr:first-child td:first-child,\n.section .sectionContent[data-type='cloze'] table tbody:first-child tr:first-child td:first-child {\n  border-radius: 4px 0 0 0;\n}\n.section .sectionContent[data-type='flashcard'] table thead:last-child tr:last-child th:first-child,\n.section .sectionContent[data-type='wysiwyg'] table thead:last-child tr:last-child th:first-child,\n.section .sectionContent[data-type='markdown'] table thead:last-child tr:last-child th:first-child,\n.section .sectionContent[data-type='cloze'] table thead:last-child tr:last-child th:first-child,\n.section .sectionContent[data-type='flashcard'] table tbody:last-child tr:last-child td:first-child,\n.section .sectionContent[data-type='wysiwyg'] table tbody:last-child tr:last-child td:first-child,\n.section .sectionContent[data-type='markdown'] table tbody:last-child tr:last-child td:first-child,\n.section .sectionContent[data-type='cloze'] table tbody:last-child tr:last-child td:first-child {\n  border-radius: 0 0 0 4px;\n}\n.section .sectionContent[data-type='flashcard'] .info,\n.section .sectionContent[data-type='wysiwyg'] .info,\n.section .sectionContent[data-type='markdown'] .info,\n.section .sectionContent[data-type='cloze'] .info {\n  border-width: 1px;\n  border-style: solid;\n  border-radius: 8px;\n  font-weight: 400;\n  letter-spacing: 2px;\n  padding: 5px;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.section .sectionContent[data-type='flashcard'] .info p,\n.section .sectionContent[data-type='wysiwyg'] .info p,\n.section .sectionContent[data-type='markdown'] .info p,\n.section .sectionContent[data-type='cloze'] .info p {\n  padding: 0;\n  margin: 0;\n}\n.section .sectionContent[data-type='brain'] {\n  text-align: center;\n  position: relative;\n  max-width: 100%;\n}\n.section .sectionContent[data-type='flashcard'] .sectionMenuFlip {\n  position: absolute;\n  left: 50%;\n  bottom: 0px;\n  border: 0px;\n  border-radius: 50%;\n  padding-top: 6px;\n  padding-bottom: 6px;\n  width: 40px;\n  height: 40px;\n}\n.section .sectionContent[data-type='flashcard'] .flip_box {\n  position: relative;\n  transition: all 0.5s ease-out;\n  transform-style: preserve-3d;\n  display: inline-grid;\n  width: 100%;\n  border-radius: 4px;\n}\n.section .sectionContent[data-type='flashcard'] .front,\n.section .sectionContent[data-type='flashcard'] .back {\n  backface-visibility: hidden;\n  grid-area: 1 / 1 / 2 / 2;\n}\n.section .sectionContent[data-type='flashcard'] .back {\n  background-color: #f3f1f1;\n  transform: rotateY(180deg);\n}\n.section .sectionContent[data-type='flashcard'] .flipped-back {\n  animation: flip 0.5s normal;\n  animation-fill-mode: forwards;\n}\n.section .sectionContent[data-type='flashcard'] .flipped-front {\n  animation: flip 0.5s reverse;\n  animation-fill-mode: forwards;\n}\n@keyframes flip {\n  0% {\n    transform: rotateY(0deg);\n  }\n  100% {\n    transform: rotateY(-180deg);\n    background-color: black;\n  }\n}\n.section .sectionContent[data-type='spacer'] {\n  position: relative;\n  text-align: center;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: center;\n  align-items: center;\n  transition: all 0.2s ease;\n  gap: 1px;\n}\n.section .sectionContent[data-type='spacer'] .electra-button {\n  opacity: 0;\n  transform: scale(0.3, 0.5);\n  transition: all 0.2s ease;\n}\n.modal-backdrop.in {\n  transition: all 0.4s linear;\n}\n.genericDialog .modal-content {\n  border-radius: 8px;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.genericDialog .modal-content .modal-header {\n  border-bottom: 0;\n  font-weight: 400;\n  box-shadow: none;\n  margin: 0px;\n  padding: 0px;\n}\n.genericDialog .modal-content .modal-header h4 {\n  padding-bottom: 4px;\n}\n.genericDialog .modal-content .modal-footer {\n  margin: 0px;\n  padding: 0px;\n  border: none;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  flex-wrap: nowrap;\n  gap: 8px;\n  margin-top: 12px;\n}\n.genericDialog .modal-content .modal-body {\n  margin: 0px;\n  padding: 0px;\n  min-height: 120px;\n  max-height: 80%;\n  overflow: auto;\n}\n.genericDialog .modal-content .modal-body .media {\n  padding: 0px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n.genericDialog .modal-content .modal-body .media .media-left img {\n  width: 120px;\n  height: 120px;\n  object-fit: contain;\n}\n.genericDialog .modal-content .modal-body .media .media-body {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.genericDialog .modal-content .modal-body .section {\n  border: 0px solid transparent !important;\n  cursor: default !important;\n}\n.genericDialog .modal-content .modal-body .list-group {\n  overflow-y: auto;\n  overflow-x: auto;\n}\n.genericDialog .modal-content .modal-body .list-group *[data-draw2d=\"true\"] {\n  font-weight: bold;\n}\n.genericDialog .modal-content .modal-body .list-group .list-group-item {\n  background-color: transparent;\n  font-weight: 300;\n}\n.genericDialog .modal-content .modal-body .list-group .list-group-item:hover {\n  text-decoration: underline;\n}\n.genericDialog .modal-content .modal-body .list-group *[data-draw2d=\"false\"][data-type=\"file\"] {\n  cursor: default;\n  text-decoration: none !important;\n}\n.electra-button {\n  height: 32px;\n  line-height: 32px;\n  min-width: 64px;\n  text-align: center;\n  outline-width: 0;\n  outline-style: none;\n  cursor: pointer;\n  border-radius: 4px;\n  display: inline-block;\n  font-weight: 400;\n  padding-left: 10px;\n  padding-right: 10px;\n  border: none;\n  font-size: 1em;\n}\n.electra-button.disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\ninput[type=text] {\n  height: 34px;\n  padding-left: 9px;\n  padding-right: 9px;\n  width: 100%;\n  outline: none;\n  border-radius: 4px;\n  box-shadow: none;\n}\ninput[type=text]:focus {\n  box-shadow: none;\n}\n.controlWithHeader {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.controlWithHeader label {\n  margin: 0px;\n}\n.inputWithButton {\n  display: flex;\n  flex-direction: row;\n}\n.inputWithButton input {\n  flex: 1 1px;\n}\n.context-menu-list {\n  margin: 0;\n  padding: 0;\n  min-width: 120px;\n  max-width: unset;\n  display: inline-block;\n  position: absolute;\n  list-style-type: none;\n  border-width: 1px;\n  border-style: solid;\n  border-left-width: 2px;\n  font-size: 15px;\n  white-space: nowrap;\n  /* vertically align inside labels */\n  /* position checkboxes and radios as icons */\n}\n.context-menu-list .context-menu-item {\n  padding: 5px 5px 5px 24px;\n  position: relative;\n  user-select: none;\n}\n.context-menu-list .context-menu-item.hover {\n  cursor: pointer;\n}\n.context-menu-list .context-menu-item > label > input,\n.context-menu-list .context-menu-item > label > textarea {\n  user-select: text;\n}\n.context-menu-list .context-menu-separator {\n  padding-bottom: 0;\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n}\n.context-menu-list .context-menu-input.hover,\n.context-menu-list .context-menu-item.disabled.hover {\n  cursor: default;\n}\n.context-menu-list .context-menu-submenu:after {\n  content: \">\";\n  position: absolute;\n  top: 0;\n  right: 3px;\n  z-index: 1;\n}\n.context-menu-list .context-menu-item.icon {\n  min-height: 18px;\n}\n.context-menu-list .context-menu-item.icon:before {\n  position: relative;\n  left: -15px;\n  font-size: 19px;\n}\n.context-menu-list .context-menu-input > label > * {\n  vertical-align: top;\n}\n.context-menu-list .context-menu-input > label > input[type=\"checkbox\"],\n.context-menu-list .context-menu-input > label > input[type=\"radio\"] {\n  margin-left: -17px;\n}\n.context-menu-list .context-menu-input > label > span {\n  margin-left: 5px;\n}\n.context-menu-list .context-menu-input > label,\n.context-menu-list .context-menu-input > label > input[type=\"text\"],\n.context-menu-list .context-menu-input > label > textarea,\n.context-menu-list .context-menu-input > label > select {\n  display: block;\n  width: 100%;\n  box-sizing: border-box;\n}\n.context-menu-list .context-menu-input > label > textarea {\n  height: 100px;\n}\n.context-menu-list .context-menu-item > .context-menu-list {\n  display: none;\n  /* re-positioned by js */\n  right: -5px;\n  top: 5px;\n}\n.context-menu-list .context-menu-item.hover > .context-menu-list {\n  display: block;\n}\n.context-menu-list .context-menu-accesskey {\n  text-decoration: underline;\n}\n.context-menu-list .context-menu-list {\n  border-color: rgb(var(--border-color));\n  background: white;\n  border-left-color: rgb(var(--tint-color));\n  box-shadow: var(--box-shadow-2);\n}\n.context-menu-list .context-menu-list .context-menu-separator {\n  border-bottom: 1px solid rgb(var(--border-color));\n}\n.context-menu-list .context-menu-list .context-menu-item.hover {\n  background-color: rgb(var(--tint-color));\n  color: white;\n}\n.context-menu-list .context-menu-list .context-menu-item.disabled {\n  color: #666;\n}\n.context-menu-list .context-menu-list .context-menu-item.disabled.hover {\n  background-color: #EEE;\n}\n.context-menu-list .context-menu-list .context-menu-item .context-menu-submenu:after {\n  color: #666;\n}\n#fileOpenDialog .list-group {\n  height: 60%;\n}\n#githubFileSaveAsDialog .filePreview {\n  max-width: 200px;\n  max-height: 200px;\n}\n#githubFileSaveAsDialog .list-group {\n  height: 250px;\n}\n#canvas_zoom {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  border-radius: 4px;\n  display: flex;\n  flex-wrap: nowrap;\n  align-items: center;\n}\n#canvas_zoom button {\n  background-color: transparent;\n  font-weight: var(--label-font-weight);\n  font-size: var(--label-font-size);\n  border-radius: 4px;\n  padding: 5px;\n  padding-left: 10px;\n  padding-right: 10px;\n  border-width: 1px;\n  border-style: solid;\n  outline: none;\n  transition: all 0.5s;\n}\n#canvas_zoom button:hover {\n  border-width: 1px;\n  border-style: solid;\n}\n.tinyFlyoverMenu {\n  border-width: 1px;\n  border-style: solid;\n  position: absolute;\n  top: -15px;\n  right: 20px;\n  border-radius: 4px;\n  z-index: 1;\n  padding: 3px;\n  display: flex;\n  flex-direction: row;\n  align-items: stretch;\n  justify-content: center;\n  gap: 8px;\n  flex-wrap: nowrap;\n}\n.section .tinyFlyoverMenu {\n  position: sticky;\n  float: right;\n  top: 10px;\n}\n#notificationToast {\n  position: absolute;\n  top: -40px;\n  left: 50%;\n  transform: translateX(-50%);\n  padding-left: 20px;\n  padding-right: 20px;\n  border-radius: 0 0 8px 8px;\n  font-weight: var(--label-font-weight);\n  font-size: var(--label-font-size);\n  z-index: 30000;\n  padding-top: 20px;\n  font-size: 16px;\n}\n.tinyScrollbar::-webkit-scrollbar {\n  width: 5px;\n}\n.tinyScrollbar::-webkit-scrollbar-track {\n  background-color: rgb(var(--border-color));\n  border-radius: 99999px;\n}\n.tinyScrollbar::-webkit-scrollbar-thumb {\n  background: #666;\n  border-radius: 99999px;\n}\n#leftTabStrip {\n  height: 100%;\n  position: absolute;\n  width: 60px;\n  padding-top: 60px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n#leftTabStrip li {\n  float: none;\n  margin: 0;\n}\n#leftTabStrip li a {\n  margin-right: 0;\n  border: 0;\n}\n#leftTabStrip > .active > a,\n#leftTabStrip > .active > a:hover,\n#leftTabStrip > .active > a:focus {\n  border: 0;\n}\n#leftTabStrip .spacer {\n  flex-grow: 1;\n}\n#leftTabStrip:after {\n  transform: rotate(-90deg) translate(-90px, -70px);\n  font-size: 55px;\n  white-space: nowrap;\n  font-weight: 200;\n  letter-spacing: 3px;\n}\n#leftTabStrip .leftTab {\n  border-radius: 0 !important;\n  width: 60px;\n  height: 60px;\n  padding: 4px;\n}\n.tab-content {\n  position: absolute;\n  left: 60px;\n  right: 0px;\n  top: 70px;\n  bottom: 0;\n}\n.tab-content .tab-pane {\n  display: none;\n  padding: 0;\n  height: 100%;\n  position: relative;\n}\n.tab-content .tab-pane.active {\n  display: flex !important;\n  flex-direction: column;\n  align-items: stretch;\n}\n.tab-content .tab-pane .workspace #canvas_config {\n  position: relative;\n  width: 40px;\n  top: 65;\n  left: 5px;\n  cursor: pointer;\n  border-width: 1px;\n  border-style: solid;\n}\n.tab-content .tab-pane .workspace #canvas_config:hover {\n  border-width: 1px !important;\n  border-style: solid !important;\n}\n.tab-content .tab-pane .workspace #canvas_config_items {\n  position: absolute;\n  top: 90;\n  left: 5px;\n  cursor: pointer;\n  padding: 10px;\n  white-space: nowrap;\n  min-width: 250px;\n}\n#editor .toolbar {\n  right: 0;\n  left: 0;\n  position: absolute;\n}\n#editor .workspace {\n  position: relative;\n  height: 100%;\n}\n#files {\n  overflow-y: scroll;\n  padding: 40px;\n}\n#files .filesTeaser {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 70px;\n}\n#files .filesTeaser .title {\n  font-weight: var(--label-font-weight);\n  font-size: 3vw;\n  white-space: nowrap;\n}\n#files .filesTeaser img,\n#files .filesTeaser svg {\n  padding-right: 40px;\n  height: 100%;\n}\n#files .deleteIcon {\n  position: absolute;\n  right: 24px;\n  top: 18px;\n  cursor: pointer;\n  font-size: 25px;\n  padding: 4px;\n  border-radius: 4px;\n}\n#files #material-tabs {\n  position: relative;\n  display: block;\n  padding: 0;\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n}\n#files #material-tabs a {\n  position: relative;\n  display: inline-block;\n  text-decoration: none;\n  padding-bottom: 8px;\n  padding-left: 20px;\n  padding-right: 20px;\n  padding-top: 5px;\n  text-transform: uppercase;\n  font-size: va(--label-font-size);\n  font-weight: var(--label-font-weight);\n  text-align: center;\n  transition: all 0.3s ease;\n  outline: none;\n}\n#files .material-tab-content #userFiles,\n#files .material-tab-content #globalFiles {\n  min-height: 600px;\n  display: flex;\n  flex-direction: column;\n}\n#files .material-tab-content #userFiles .fileOperations,\n#files .material-tab-content #globalFiles .fileOperations {\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n  padding-bottom: 8px;\n  padding-left: 16px;\n  padding-right: 16px;\n  border-top-width: 1px;\n  border-top-style: solid;\n  padding-top: 8px;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: flex-start;\n  gap: 8px;\n}\n#files .material-tab-content #userFiles .filePath,\n#files .material-tab-content #globalFiles .filePath {\n  padding-left: 16px;\n  padding-right: 16px;\n}\n#files .material-tab-content #userFiles .fileList,\n#files .material-tab-content #globalFiles .fileList {\n  padding-left: 16px;\n  padding-right: 16px;\n}\n#files .material-tab-content #userFiles .fileList .list-group-item,\n#files .material-tab-content #globalFiles .fileList .list-group-item {\n  cursor: pointer;\n}\n#files .material-tab-content #userFiles .fileList .list-group-item .thumb .thumbnail,\n#files .material-tab-content #globalFiles .fileList .list-group-item .thumb .thumbnail {\n  cursor: pointer;\n}\n#files .material-tab-content #userFiles .fileList .list-group-item .thumb .media-body,\n#files .material-tab-content #globalFiles .fileList .list-group-item .thumb .media-body {\n  padding-top: 14px;\n  padding-left: 20px;\n}\n#files .material-tab-content #userFiles .fileList .list-group-item .thumb h4,\n#files .material-tab-content #globalFiles .fileList .list-group-item .thumb h4 {\n  font-size: 18px;\n  display: inline-block;\n}\n#files .material-tab-content #userFiles .fileList .list-group-item .thumb .editIcon,\n#files .material-tab-content #globalFiles .fileList .list-group-item .thumb .editIcon {\n  padding-left: 10px;\n  font-size: 14px;\n  display: none;\n}\n#files .material-tab-content #userFiles .fileList .list-group-item .thumb:hover h4,\n#files .material-tab-content #globalFiles .fileList .list-group-item .thumb:hover h4 {\n  text-decoration: underline;\n}\n#files .material-tab-content #userFiles .fileList .list-group-item .thumb:hover .editIcon,\n#files .material-tab-content #globalFiles .fileList .list-group-item .thumb:hover .editIcon {\n  display: inline-block;\n}\n#files header {\n  position: relative;\n}\n#files .sliding-bar {\n  position: absolute;\n  z-index: 1000;\n  display: block;\n  left: 0;\n  bottom: 0;\n  transition: all 0.3s ease;\n  border-width: 0 0 3px 0;\n  border-style: solid;\n}\n#home {\n  overflow: scroll;\n}\n#home .authorPage {\n  padding: 40px !important;\n  font-size: calc(12px + 0.5vw);\n  font-weight: 400;\n}\n#home .authorPage h1 {\n  font-weight: 200;\n  font-size: calc(16px + 2.5vw);\n  white-space: nowrap;\n  margin-bottom: 10px;\n}\n#home .authorPage h2 {\n  font-size: calc(14px + 1.5vw);\n  font-weight: 200;\n}\n#home footer {\n  text-align: center;\n  margin-top: 100px;\n}\n#home footer a {\n  text-decoration: underline;\n}\n#configMenuIcon {\n  font-size: 25px;\n  cursor: pointer;\n}\n#figureConfigDialog .figureAddLabel {\n  font-size: var(--label-font-size);\n  font-weight: var(--label-font-weight);\n  cursor: pointer;\n}\n#figureConfigDialog textarea.figureAttribute,\n#figureConfigDialog textarea.lineNumbering {\n  font-family: lucida console, courier new, courier, monospace;\n  margin: 0;\n  padding: 10px 0;\n  height: 300px;\n  border-radius: 0;\n  resize: none;\n  font-size: 16px;\n  line-height: 1.2;\n  outline: none;\n  box-sizing: border-box;\n}\n#figureConfigDialog textarea.figureAttribute:focus-visible,\n#figureConfigDialog textarea.lineNumbering:focus-visible {\n  outline: none;\n}\n#figureConfigDialog textarea.figureAttribute {\n  padding-left: calc(3.5rem + 5px);\n  width: 100%;\n}\n#figureConfigDialog textarea.lineNumbering {\n  border-color: transparent;\n  overflow-y: hidden;\n  text-align: right;\n  box-shadow: none;\n  position: absolute;\n  width: 3.5rem;\n}\n.applicationSwitch .application-waffel {\n  cursor: pointer;\n}\n.applicationSwitch .application-waffel svg,\n.applicationSwitch .application-waffel img {\n  width: 60px;\n}\n.applicationSwitch .open .dropdown-menu {\n  z-index: 10000;\n  right: 0;\n  left: initial;\n  padding: var(--menu-container-padding);\n  display: grid;\n  max-width: 200px;\n  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));\n  grid-auto-rows: minmax(80px, auto);\n  grid-gap: 5px;\n}\n.applicationSwitch .dropdown-menu {\n  display: none;\n}\n.image-button {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-weight: var(--label-font-weight);\n  font-size: var(--label-font-size);\n  height: 100%;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.image-button img,\n.image-button svg {\n  margin: 5px;\n  height: 40;\n}\n.image-button div {\n  text-align: center;\n  font-size: 0.8em;\n}\n.notifyjs-bootstrap-base {\n  font-size: 12px;\n  border: none;\n  border-radius: 4px;\n  padding-left: 5px;\n  padding-right: 5px;\n}\n.notifyjs-bootstrap-info {\n  background-image: none;\n}\nbody.light {\n  --label-bold-font-weight: 600;\n  --label-font-weight: 400;\n  --label-font-size: 14px;\n  --border-color: 208, 215, 222;\n  --tint-color: 218, 26, 95;\n  --tint-color-dark: 158, 27, 52;\n  /* colors of the left hand side navigation tabbar */\n  --lefttab-font-color: 255, 255, 255;\n  --lefttab-bg-color: 218, 26, 95;\n  /* colors for listitems */\n  --menu-container-padding: 4px;\n  --list-item-selected-bg-color: 240, 240, 240;\n  --list-item-hover-bg-color: 248, 248, 248;\n  /* form elements */\n  --input-bg-color: 255, 255, 255;\n  --input-color: 0, 0, 0;\n  --input-label-color: 0, 0, 0;\n  --text-color: 0, 0, 0;\n  --box-shadow-0: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0,0,0,0.24);\n  --box-shadow-1: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0,0,0,0.23);\n  --box-shadow-2: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0,0,0,0.23);\n  --box-shadow-3: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0,0,0,0.22);\n  /* the backgrond-color for a workplace. A workplace is where a docment, content area,... is place.\n    */\n  --workplace-bg-color: 245, 248, 255;\n  /* background color of a pane, dialog, document or everything which is place inside a workplaces lke a file-selector */\n  --pane-bg-color: 255, 255, 255;\n  color: rgb(var(--text-color));\n  /* class used by draw2d if a element is drag&drop from a platette into a workspace */\n  /** don't place \".section\" in the sub-tree of \".sections\" . The \".section\" is \n        used in other page elements like pdf, dialog, single page, ...\n    **/\n}\nbody.light .electra-button {\n  background-color: rgb(var(--tint-color));\n  color: white;\n}\nbody.light .electra-button:hover {\n  filter: brightness(110%);\n}\nbody.light a {\n  color: rgb(var(--tint-color));\n}\nbody.light .shadow {\n  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.16));\n}\nbody.light .dropdown-menu {\n  border: 1px solid rgb(var(--border-color));\n  border-radius: 4px;\n  background-color: rgb(var(--pane-bg-color));\n}\nbody.light .dropdown-menu li {\n  color: rgb(var(--input-color));\n}\nbody.light .dropdown-menu li:hover {\n  background-color: rgb(var(--list-item-hover-bg-color));\n}\nbody.light input[type=text] {\n  color: rgb(var(--input-color));\n  border: 1px solid rgb(var(--border-color));\n}\nbody.light input[type=text]:focus {\n  background-color: white;\n  border-bottom: 2px solid rgb(var(--tint-color));\n}\nbody.light .notifyjs-bootstrap-base {\n  box-shadow: var(--box-shadow-1);\n}\nbody.light .notifyjs-bootstrap-info {\n  padding: var(--menu-container-padding);\n  color: rgb(var(--text-color));\n  background-color: rgb(var(--pane-bg-color));\n}\nbody.light .appbar {\n  background-color: #202b3b;\n}\nbody.light .appbar .title h1 {\n  color: white;\n}\nbody.light .appbar .title h2 {\n  color: white;\n}\nbody.light .appbar .slogan {\n  color: white;\n  letter-spacing: 0.2vw;\n}\nbody.light .appbar .icon path,\nbody.light .appbar .icon rect {\n  fill: rgb(var(--tint-color));\n  stroke: rgb(var(--tint-color));\n}\nbody.light .appbar .image-button {\n  border: 1px solid transparent;\n}\nbody.light .appbar .image-button:hover {\n  border: 1px solid white;\n}\nbody.light .appbar .image-button img,\nbody.light .appbar .image-button svg {\n  color: white;\n  border-color: transparent;\n}\nbody.light .appbar .image-button img circle[stroke],\nbody.light .appbar .image-button svg circle[stroke],\nbody.light .appbar .image-button img polyline[stroke],\nbody.light .appbar .image-button svg polyline[stroke],\nbody.light .appbar .image-button img path[stroke],\nbody.light .appbar .image-button svg path[stroke],\nbody.light .appbar .image-button img g[stroke],\nbody.light .appbar .image-button svg g[stroke] {\n  stroke: white !important;\n}\nbody.light .appbar .image-button img rect[fill],\nbody.light .appbar .image-button svg rect[fill],\nbody.light .appbar .image-button img circle[fill],\nbody.light .appbar .image-button svg circle[fill] {\n  fill: white !important;\n}\nbody.light .spinner:before {\n  border-color: rgb(var(--border-color));\n  border-top-color: rgb(var(--tint-color));\n  background-color: #fef9f9;\n}\nbody.light .confirm-dialog-btn-confirm {\n  background-color: rgb(var(--tint-color));\n}\nbody.light .context-menu-list {\n  border-color: rgb(var(--border-color));\n  background: rgb(var(--pane-bg-color));\n  border-left-color: rgb(var(--tint-color));\n  box-shadow: var(--box-shadow-1);\n}\nbody.light .context-menu-list .context-menu-separator {\n  border-bottom: 1px solid rgb(var(--border-color));\n}\nbody.light .context-menu-list .context-menu-item.hover {\n  background-color: rgb(var(--tint-color));\n  color: white;\n}\nbody.light .context-menu-list .context-menu-item.disabled {\n  color: rgba(var(--text-color), 0.5);\n}\nbody.light .context-menu-list .context-menu-item.disabled.hover {\n  background-color: #EEE;\n}\nbody.light .context-menu-list .context-menu-item .context-menu-submenu:after {\n  color: #666;\n}\nbody.light .gutter {\n  background-color: #eee;\n  background-repeat: no-repeat;\n  background-position: center;\n}\nbody.light .gutter.gutter-vertical {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\nbody.light .gutter.gutter-horizontal {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\nbody.light .tinyFlyoverMenu {\n  box-shadow: var(--box-shadow-1);\n  border-color: rgb(var(--border-color));\n  background-color: rgb(var(--pane-bg-color));\n}\nbody.light .tinyFlyoverMenu div {\n  border-color: transparent;\n}\nbody.light .tinyFlyoverMenu div:hover {\n  border-color: rgb(var(--border-color));\n}\nbody.light #leftTabStrip {\n  background-color: rgb(var(--lefttab-bg-color));\n}\nbody.light #leftTabStrip:after {\n  color: rgb(var(--lefttab-font-color));\n}\nbody.light #leftTabStrip > li.active a:hover,\nbody.light #leftTabStrip > div.active a:hover {\n  background-color: white;\n}\nbody.light #leftTabStrip > li.active a svg path[stroke],\nbody.light #leftTabStrip > div.active a svg path[stroke],\nbody.light #leftTabStrip > li.active a svg rect[stroke],\nbody.light #leftTabStrip > div.active a svg rect[stroke],\nbody.light #leftTabStrip > li.active a svg g[stroke],\nbody.light #leftTabStrip > div.active a svg g[stroke],\nbody.light #leftTabStrip > li.active a svg line[stroke],\nbody.light #leftTabStrip > div.active a svg line[stroke],\nbody.light #leftTabStrip > li.active a svg circle[stroke],\nbody.light #leftTabStrip > div.active a svg circle[stroke],\nbody.light #leftTabStrip > li.active a svg polyline[stroke],\nbody.light #leftTabStrip > div.active a svg polyline[stroke] {\n  stroke: rgb(var(--lefttab-bg-color)) !important;\n}\nbody.light #leftTabStrip > li.active a svg circle[fill],\nbody.light #leftTabStrip > div.active a svg circle[fill],\nbody.light #leftTabStrip > li.active a svg rect[fill],\nbody.light #leftTabStrip > div.active a svg rect[fill] {\n  fill: rgb(var(--lefttab-bg-color)) !important;\n}\nbody.light #leftTabStrip > li a:hover,\nbody.light #leftTabStrip > div a:hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\nbody.light #leftTabStrip > li a svg path[stroke],\nbody.light #leftTabStrip > div a svg path[stroke],\nbody.light #leftTabStrip > li a svg rect[stroke],\nbody.light #leftTabStrip > div a svg rect[stroke],\nbody.light #leftTabStrip > li a svg g[stroke],\nbody.light #leftTabStrip > div a svg g[stroke],\nbody.light #leftTabStrip > li a svg line[stroke],\nbody.light #leftTabStrip > div a svg line[stroke],\nbody.light #leftTabStrip > li a svg circle[stroke],\nbody.light #leftTabStrip > div a svg circle[stroke],\nbody.light #leftTabStrip > li a svg polyline[stroke],\nbody.light #leftTabStrip > div a svg polyline[stroke] {\n  stroke: rgb(var(--lefttab-font-color)) !important;\n}\nbody.light #leftTabStrip > li a svg circle[fill],\nbody.light #leftTabStrip > div a svg circle[fill],\nbody.light #leftTabStrip > li a svg rect[fill],\nbody.light #leftTabStrip > div a svg rect[fill] {\n  fill: rgb(var(--lefttab-font-color)) !important;\n}\nbody.light #home .authorPage h1 {\n  color: rgb(var(--tint-color));\n}\nbody.light #home .authorPage h2 {\n  color: rgb(var(--tint-color));\n}\nbody.light #home footer {\n  color: rgb(var(--tint-color));\n}\nbody.light #home footer a {\n  color: rgb(var(--tint-color));\n}\nbody.light #canvas_zoom {\n  background-color: rgb(var(--pane-bg-color));\n  border: 1px solid rgb(var(--border-color));\n  box-shadow: var(--box-shadow-0);\n}\nbody.light #canvas_zoom button {\n  background-color: transparent;\n  border-color: transparent;\n  transition: all 0.5s;\n}\nbody.light #canvas_zoom button:hover {\n  border-color: rgb(var(--tint-color));\n}\nbody.light #configMenuIcon:hover {\n  opacity: 1;\n  color: rgb(var(--tint-color));\n}\nbody.light .modal-backdrop.in {\n  opacity: 0.7;\n  background-color: black;\n}\nbody.light .genericDialog .modal-content {\n  box-shadow: var(--box-shadow-3);\n  background-color: rgb(var(--pane-bg-color));\n}\nbody.light .genericDialog .modal-content .modal-header h4 {\n  border-bottom: 1px solid rgb(var(--tint-color));\n  color: rgb(var(--tint-color));\n}\nbody.light .genericDialog .modal-content .modal-body .list-group *[data-draw2d=\"true\"] {\n  color: rgb(var(--tint-color));\n}\nbody.light .genericDialog .modal-content .modal-body .list-group .list-group-item {\n  background-color: transparent;\n}\nbody.light .genericDialog .modal-content .modal-body .list-group *[data-draw2d=\"false\"][data-type=\"file\"] {\n  color: gray;\n}\nbody.light .genericDialog .modal-content .modal-footer {\n  background-color: transparent;\n}\nbody.light .tab-pane {\n  box-shadow: -6px 0 20px -4px rgba(31, 73, 125, 0.3);\n}\nbody.light #files {\n  background-color: rgb(var(--workplace-bg-color));\n}\nbody.light #files .teaser .title {\n  color: rgb(var(--tint-color));\n}\nbody.light #files .list-group-item {\n  cursor: pointer;\n}\nbody.light #files .list-group-item .thumb h4 {\n  color: rgb(var(--tint-color));\n}\nbody.light #files .filesFinder {\n  background-color: rgb(var(--pane-bg-color));\n  border: 1px solid rgb(var(--border-color));\n  border-radius: 8px;\n  box-shadow: var(--box-shadow-1);\n}\nbody.light #files .filesFinder header #material-tabs {\n  border: none;\n}\nbody.light #files .filesFinder header #material-tabs a {\n  color: rgb(var(--input-label-color));\n}\nbody.light #files .filesFinder header #material-tabs a.active {\n  color: rgb(var(--tint-color));\n}\nbody.light #files .filesFinder header #material-tabs a:hover {\n  color: rgb(var(--tint-color));\n}\nbody.light #files .filesFinder .material-tab-content .fileOperations {\n  border-color: rgb(var(--border-color));\n}\nbody.light #files .filesFinder .sliding-bar {\n  background: transparent;\n  transition: all 0.3s ease;\n  border-color: rgb(var(--tint-color));\n}\nbody.light #figureConfigDialog textarea.figureAttribute {\n  background-color: #272822;\n  border-color: #272822;\n  color: #ffffff;\n}\nbody.light #figureConfigDialog textarea.lineNumbering {\n  background-color: #3E3D32;\n  border-color: #3E3D32;\n  color: #928869;\n}\nbody.light #notificationToast {\n  background-color: rgb(var(--tint-color));\n  color: white;\n}\nbody.light .tree .tree-leaf .tree-leaf-content .tree-expando {\n  background-color: transparent;\n  border: 1px solid rgb(var(--input-label-color));\n  color: rgb(var(--input-label-color));\n}\nbody.light .tree .tree-leaf .tree-leaf-content:hover {\n  background-color: rgb(var(--list-item-hover-bg-color));\n}\nbody.light .tree .tree-leaf .tree-leaf-content.selected {\n  background-color: rgb(var(--list-item-selected-bg-color));\n}\nbody.light .tree .tree-leaf .tree-leaf-content.selected .tree-leaf-text {\n  color: rgb(var(--tint-color));\n}\nbody.light .tree .tree-leaf .tree-leaf-content.selected .tree-expando {\n  color: rgb(var(--tint-color));\n  border-color: rgb(var(--tint-color));\n}\nbody.light .section {\n  border-color: transparent;\n}\nbody.light .section.error {\n  border-color: rgb(var(--tint-color));\n}\nbody.light .section .sectionContent {\n  /** learning content gets a special annotation on the left **/\n}\nbody.light .section .sectionContent[data-type='flashcard'] h1,\nbody.light .section .sectionContent[data-type='wysiwyg'] h1,\nbody.light .section .sectionContent[data-type='markdown'] h1,\nbody.light .section .sectionContent[data-type='cloze'] h1,\nbody.light .section .sectionContent[data-type='flashcard'] h2,\nbody.light .section .sectionContent[data-type='wysiwyg'] h2,\nbody.light .section .sectionContent[data-type='markdown'] h2,\nbody.light .section .sectionContent[data-type='cloze'] h2,\nbody.light .section .sectionContent[data-type='flashcard'] h3,\nbody.light .section .sectionContent[data-type='wysiwyg'] h3,\nbody.light .section .sectionContent[data-type='markdown'] h3,\nbody.light .section .sectionContent[data-type='cloze'] h3 {\n  color: rgb(var(--tint-color));\n}\nbody.light .section .sectionContent[data-type='flashcard'] h1,\nbody.light .section .sectionContent[data-type='wysiwyg'] h1,\nbody.light .section .sectionContent[data-type='markdown'] h1,\nbody.light .section .sectionContent[data-type='cloze'] h1 {\n  border-bottom-color: rgb(var(--tint-color));\n}\nbody.light .section .sectionContent[data-type='flashcard'] .cloze,\nbody.light .section .sectionContent[data-type='wysiwyg'] .cloze,\nbody.light .section .sectionContent[data-type='markdown'] .cloze,\nbody.light .section .sectionContent[data-type='cloze'] .cloze {\n  background-color: lightgray;\n  padding-left: 15px;\n  padding-right: 15px;\n  border-radius: 4px;\n  border-bottom: 1px dotted gray;\n}\nbody.light .section .sectionContent[data-type='flashcard'] a,\nbody.light .section .sectionContent[data-type='wysiwyg'] a,\nbody.light .section .sectionContent[data-type='markdown'] a,\nbody.light .section .sectionContent[data-type='cloze'] a {\n  color: inherit;\n  text-decoration: none;\n  background: linear-gradient(to right, rgb(var(--toolbar-bg-color)), rgb(var(--toolbar-bg-color))), linear-gradient(to right, rgb(var(--tint-color)), #ff00b4, #0064c8);\n  background-size: 100% 1px, 0 1px;\n  background-position: 100% 100%, 0 100%;\n  background-repeat: no-repeat;\n  transition: background-size 200ms;\n}\nbody.light .section .sectionContent[data-type='flashcard'] a:hover,\nbody.light .section .sectionContent[data-type='wysiwyg'] a:hover,\nbody.light .section .sectionContent[data-type='markdown'] a:hover,\nbody.light .section .sectionContent[data-type='cloze'] a:hover {\n  background-size: 0 1px, 100% 1px;\n}\nbody.light .section .sectionContent[data-type=\"flashcard\"] .sectionMenuFlip {\n  background-color: rgba(var(--tint-color), 0.2);\n  border: 1px solid white;\n}\nbody.light .section .sectionContent .placeholderContainer {\n  border-color: rgb(var(--border-color));\n}\nbody.light .section .sectionContent .placeholderContainer .placeholderText h1 {\n  color: rgb(var(--text-color));\n}\nbody.light .section .sectionContent .placeholderContainer .placeholderText h2 {\n  color: rgb(var(--text-color));\n}\nbody.light .toolbar {\n  background-color: #B2E2F2;\n}\nbody.light svg.inlined-svg {\n  color: rgb(var(--text-color));\n  border-color: transparent;\n}\nbody.light svg.inlined-svg circle[stroke],\nbody.light svg.inlined-svg rect[stroke],\nbody.light svg.inlined-svg line[stroke],\nbody.light svg.inlined-svg polygon[stroke],\nbody.light svg.inlined-svg ellipse[stroke],\nbody.light svg.inlined-svg polyline[stroke],\nbody.light svg.inlined-svg path[stroke],\nbody.light svg.inlined-svg g[stroke] {\n  stroke: rgb(var(--text-color)) !important;\n}\nbody.light svg.inlined-svg polygon[fill],\nbody.light svg.inlined-svg text[fill],\nbody.light svg.inlined-svg rect[fill],\nbody.light svg.inlined-svg circle[fill] {\n  fill: rgb(var(--text-color)) !important;\n}\nbody.light .image-button div.highlight {\n  animation: highlight 3s infinite;\n}\nbody.light .image-button.disabled {\n  opacity: 0.2;\n}\nbody.light .image-button:not(.disabled):hover {\n  box-shadow: var(--box-shadow-0);\n}\n@keyframes highlight {\n  0% {\n    color: rgb(var(--tint-color));\n    font-weight: var(--label-bold-font-weight);\n  }\n  50% {\n    color: rgba(var(--text-color), 0.4);\n    font-weight: var(--label-font-weight);\n  }\n  100% {\n    color: rgb(var(--tint-color));\n    font-weight: var(--label-bold-font-weight);\n  }\n}\n/* https://css-tricks.com/snippets/css/a-guide-to-flexbox/ */\n.layout {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  z-index: 20;\n  height: 100vh;\n  background-color: #f5f8ff;\n  color: #333;\n  border-bottom: 2px solid rgb(var(--tint-color));\n  scroll-snap-align: start;\n}\n.layout .teaserContainer {\n  flex-grow: 4;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  justify-content: start;\n  align-items: center;\n  align-content: center;\n  gap: 50px;\n}\n.layout .teaserContainer .teaser {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: start;\n  align-content: center;\n}\n.layout .teaserContainer .teaser .slogan {\n  max-width: 80%;\n  font-weight: 300;\n  line-height: 1.2;\n  font-size: calc(8px + 1vw);\n  color: black;\n  padding-left: 60px;\n}\n.layout .teaserContainer .teaser .slogan h1 {\n  font-weight: 500;\n  font-size: calc(20px + 1vw);\n  line-height: 1.2;\n  color: rgb(var(--tint-color));\n}\n.layout .teaserContainer .teaser .slogan .textblock {\n  background-color: #ffffffe0;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: var(--box-shadow-1);\n}\n.layout .teaserContainer .launchArea {\n  display: flex;\n  text-align: center;\n  justify-content: center;\n  flex-direction: row;\n  max-height: 20vh;\n  max-width: 100%;\n}\n.layout .teaserContainer .launchArea .imageContainer {\n  flex: 1;\n  flex-flow: column wrap;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  align-items: center;\n}\n.layout .teaserContainer .launchArea .imageContainer img {\n  max-height: 100%;\n}\n.layout .avatarContainer {\n  flex-grow: 0;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  align-items: flex-end;\n}\n.layout .avatarContainer .avatar {\n  text-align: center;\n  font-weight: 400;\n  font-size: 16px;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  align-content: flex-end;\n  justify-content: flex-end;\n  align-items: center;\n  height: 15vh;\n  max-height: 160px;\n}\n.layout .avatarContainer .avatar img {\n  height: 100%;\n}\n.layout .avatarContainer .arrow {\n  animation: mover 2s infinite alternate;\n  font-size: 20px;\n}\n.layout .avatarContainer .arrow i {\n  height: 20px;\n  display: inline-block;\n  border-left: 4px solid #000;\n  border-radius: 4px;\n}\n.layout .avatarContainer .arrow i.left {\n  transform: rotate(-45deg);\n}\n.layout .avatarContainer .arrow i.right {\n  transform: rotate(45deg) translate(3px, -2px);\n}\n@keyframes mover {\n  0% {\n    transform: translateY(0);\n  }\n  100% {\n    transform: translateY(-10px);\n  }\n}\n.intro {\n  background-color: white;\n  background-image: none;\n  text-align: left;\n  position: relative;\n  z-index: 20;\n  height: 100vh;\n  padding-bottom: 20px;\n  color: #333;\n}\n.intro .header {\n  font-size: calc(19px + 1vw);\n  line-height: 1.2;\n  top: 2vw;\n  padding-left: 50px;\n  color: rgb(var(--tint-color));\n  position: absolute;\n  padding-top: 30px;\n  background-color: rgba(255, 255, 255, 0.8);\n}\n.intro .header div {\n  font-size: calc(6px + 1vw);\n  font-weight: 200;\n  color: black;\n  padding-top: 30px;\n}\n.intro img {\n  width: 50%;\n  vertical-align: middle;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  left: 0;\n  right: 0;\n}\n.intro .launch_button {\n  position: absolute;\n  right: 50px;\n  bottom: 100px;\n}\n.slidedeck {\n  position: absolute;\n  height: 400vh;\n  width: 100%;\n  background-image: linear-gradient(135deg, #e13f4d, #d34657);\n}\n.slidedeck .pink_bg {\n  position: absolute;\n  top: 100vh;\n  height: 300vh;\n  width: 100%;\n  background-image: linear-gradient(153deg, #fa7e93, #f5d8d8);\n}\n.slidedeck .orange_bg {\n  position: absolute;\n  top: 100vh;\n  height: 200vh;\n  width: 100%;\n  background-image: linear-gradient(135deg, #f8ac5c, #fcbe78);\n}\n.slidedeck .blue_bg {\n  position: absolute;\n  top: 100vh;\n  height: 100vh;\n  width: 100%;\n  background-image: linear-gradient(135deg, #242533, #2a3079);\n}\n.slidedeck .section_header {\n  color: white;\n  font-size: calc(16px + 2vw);\n  text-align: center;\n  font-weight: 100;\n  padding-top: 30px;\n  position: sticky;\n  top: 20px;\n}\n.slidedeck .card {\n  position: sticky;\n  z-index: 1000;\n  width: 25%;\n  height: 50vh;\n  border-radius: 8px;\n  background-color: #fff;\n  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.25);\n  top: 0;\n}\n.slidedeck .card .text {\n  position: absolute;\n  top: -40px;\n  text-align: center;\n  color: white;\n  font-size: 24px;\n  font-weight: 100;\n  width: 100%;\n}\n.slidedeck .card .media {\n  position: absolute;\n  top: 10px;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.slidedeck .card .content {\n  position: absolute;\n  top: 80px;\n  padding: 10px;\n}\n.slidedeck .card .content .header {\n  color: rgb(var(--tint-color));\n  text-align: center;\n  margin-bottom: 10px;\n}\n.slidedeck .card .launch_button {\n  position: absolute;\n  left: 50%;\n  bottom: 10px;\n  transform: translateX(-50%);\n}\n.slidedeck .card.left {\n  left: 5%;\n  transform: translateY(50%);\n}\n.slidedeck .card.center {\n  left: 50%;\n  transform: translateY(50%) translateX(-50%);\n}\n.slidedeck .card.right {\n  left: 70%;\n  transform: translateY(50%);\n}\nbody {\n  margin: 0;\n  padding: 0;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  scroll-snap-type: y mandatory;\n}\n", "",{"version":3,"sources":["webpack://./common/less/layout/common.less","webpack://./public/less/index.less","webpack://./common/less/layout/userinfo.less","webpack://./common/less/layout/appbar.less","webpack://./common/less/layout/list.less","webpack://./common/less/layout/toolbar.less","webpack://./common/less/layout/tree.less","webpack://./common/less/layout/section.less","webpack://./common/less/layout/dialog.less","webpack://./common/less/layout/input_controls.less","webpack://./common/less/layout/contextmenu.less","webpack://./common/less/layout/file_open_dialog.less","webpack://./common/less/layout/file_saveas_dialog.less","webpack://./common/less/layout/canvas_zoom.less","webpack://./common/less/layout/tiny_flyover_menu.less","webpack://./common/less/layout/notification.less","webpack://./common/less/layout/tiny_scrollbar.less","webpack://./common/less/layout/tab_strip.less","webpack://./common/less/layout/tab_content.less","webpack://./common/less/layout/tabpane_editor.less","webpack://./common/less/layout/tabpane_files.less","webpack://./common/less/layout/author_page.less","webpack://./common/less/layout/config_dialog.less","webpack://./common/less/layout/appSwitch.less","webpack://./common/less/layout/image_button.less","webpack://./common/less/layout/notify.less","webpack://./common/less/theme_light.less","webpack://./public/less/hero.less","webpack://./public/less/intro.less","webpack://./public/less/slidedeck.less"],"names":[],"mappings":"AACA;EACI,4CAAA;EACA,gBAAA;ACAJ;ADFA;EAKQ,sCAAA;ACAR;ADLA;EAOY,gBAAA;EACA,aAAA;EACA,mBAAA;EACA,YAAA;EACA,mBAAA;EACA,eAAA;EACA,kBAAA;EACA,iBAAA;EACA,kBAAA;ACCZ;ADKA;EACI;IACI,+CAAA;ECHN;AACF;ADMA;EAEQ,wBAAA;ACLR;ADOI;EACI,WAAA;EACA,gCAAA;EACA,kBAAA;EACA,aAAA;EACA,QAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,iBAAA;EACA,mBAAA;EACA,uCAAA;ACLR;ADUA;EACI,gBAAA;ACRJ;AC1CA;EAGI,kBAAA;AD0CJ;AC7CA;EAKM,WAAA;AD2CN;AEhDA;EACI,YAAA;EACA,kBAAA;EACA,uBAAA;EACA,aAAA;EACA,mBAAA;EACA,SAAA;EACA,kBAAA;EACA,mBAAA;AFkDJ;AE1DA;EAWQ,UAAA;AFkDR;AE7DA;EAeY,eAAA;EACA,gBAAA;EACA,mBAAA;EACA,SAAA;AFiDZ;AEnEA;EAqBY,eAAA;EACA,gBAAA;EACA,mBAAA;EACA,SAAA;AFiDZ;AEzEA;EA6BQ,YAAA;AF+CR;AE5EA;EAiCQ,aAAA;EACA,mBAAA;EACA,mBAAA;AF8CR;AEjFA;EAuCQ,eAAA;AF6CR;AGpFA;EACI,sCAAA;EACA,SAAA;EACA,SAAA;AHsFJ;AGzFA;EAMM,gBAAA;EACA,YAAA;EACA,iCAAA;EACA,sCAAA;EACA,kBAAA;AHsFN;AGpFM;EACE,sDAAA;AHsFR;AGvFM;EAGI,UAAA;EACA,mBAAA;EACA,yBAAA;AHuFV;AGpFM;EACE,yDAAA;AHsFR;AGvFM;EAGI,UAAA;EACA,mBAAA;EACA,yBAAA;AHuFV;AGhHA;EA8BQ,UAAA;EACA,qBAAA;EACA,yBAAA;EACA,eAAA;EACA,eAAA;AHqFR;AGlFM;EACE,wCAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EACA,gBAAA;EACA,qBAAA;EACA,UAAA;EACA,kBAAA;EACA,oBAAA;EACA,oDAAA;EACA,gBAAA;AHoFR;AGhFQ;EACE,UAAA;EACA,oBAAA;AHkFV;AIxIA;EACE,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,QAAA;EACA,mBAAA;EACA,UAAA;EACA,sCAAA;AJ0IF;AIjJA;EAUI,aAAA;AJ0IJ;AIpJA;EAcI,YAAA;AJyIJ;AIvJA;EAkBI,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,YAAA;EACA,QAAA;AJwIJ;AI9JA;EAyBM,YAAA;AJwIN;AIjKA;EA4BQ,cAAA;EACA,eAAA;EACA,YAAA;AJwIR;AItKA;EAkCQ,gBAAA;EACA,kBAAA;EACA,WAAA;EACA,qBAAA;EACA,mBAAA;AJuIR;AI7KA;EA0CQ,aAAA;EACA,iBAAA;AJsIR;AIjLA;EA+CQ,cAAA;AJqIR;AIpLA;EAmDQ,aAAA;AJoIR;AIvLA;EAyDQ,mBAAA;AJiIR;AI/HQ;EACE,gBAAA;AJiIV;AI7LA;EAiEQ,cAAA;AJ+HR;AIhMA;EAqEQ,aAAA;AJ8HR;AInMA;EAyEQ,aAAA;AJ6HR;AItMA;EA+EQ,iBAAA;AJ0HR;AIzMA;EAmFQ,aAAA;AJyHR;AI5MA;EAuFQ,aAAA;AJwHR;AI/MA;EA2FQ,cAAA;AJuHR;AKlNA;EACI,qCAAA;EACA,iCAAA;EACA,aAAA;EACA,sBAAA;EACA,oBAAA;EACA,YAAA;EACA,gBAAA;ALoNJ;AK3NA;EAUM,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,eAAA;EACA,oBAAA;EACA,iBAAA;EACA,YAAA;EACA,kBAAA;ALoNN;AKnNM;EACE,oBAAA;ALqNR;AKnNM;EACE,oBAAA;ALqNR;AKnNM;EACE,oBAAA;ALqNR;AK9OA;EA4BQ,YAAA;ALqNR;AKjPA;EA+BQ,YAAA;EACA,UAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,kBAAA;EACA,iBAAA;ALqNR;AKpNQ;EACE,yBAAA;EACA,6BAAA;ALsNV;AACA;;;GAGG;AM/PH;EACE,iBAAA;EACA,kBAAA;EACA,eAAA;EACA,iBAAA;EACA,mBAAA;EACA,iBAAA;EACA,kBAAA;ANiQF;AM9PE;EACE,iBAAA;EACA,mBAAA;ANgQJ;AM5QA;EAgBI,kBAAA;EACA,QAAA;EACA,WAAA;EACA,UAAA;EACA,UAAA;AN+PJ;AMnRA;EAsBM,UAAA;EACA,cAAA;ANgQN;AM5PE;;EAEE,kBAAA;AN8PJ;AM3RA;EN6RE,2BAA2B;EM3PzB,mBAAA;AN6PJ;AM/RA;EAsCM,aAAA;EACA,kBAAA;EACA,aAAA;EACA,kBAAA;EACA,YAAA;EACA,iBAAA;EACA,kBAAA;EACA,oBAAA;EACA,iBAAA;AN4PN;AM1SA;EAiDQ,aAAA;EACA,sBAAA;EACA,QAAA;EACA,iBAAA;EACA,uBAAA;AN4PR;AMjTA;EAuDU,gBAAA;AN6PV;AMpTA;EA4DU,0BAAA;EACA,4BAAA;EACA,uBAAA;AN2PV;AMzTA;EAiEU,iCAAA;EACA,qCAAA;AN2PV;AMtPI;EACE,kBAAA;EACA,eAAA;ANwPN;AM1PI;EAKI,oBAAA;EACA,iBAAA;EACA,kBAAA;EACA,qBAAA;EACA,WAAA;ANwPR;AMjQI;EAWM,aAAA;EACA,0CAAA;EACA,aAAA;EACA,YAAA;EACA,mBAAA;EACA,uBAAA;EACA,iDAAA;EACA,kBAAA;EACA,+BAAA;EACA,wBAAA;EACA,kBAAA;EACA,eAAA;EACA,0BAAA;EACA,iCAAA;EACA,qCAAA;ANyPV;AMlRI;EA6BM,kBAAA;EACA,WAAA;ANwPV;AMtRI;EAiCM,wBAAA;EACA,WAAA;ANwPV;AM1RI;EAoCQ,qBAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;EACA,WAAA;ANyPZ;AMjSI;EA0CU,eAAA;AN0Pd;AMpSI;EA8CQ,kBAAA;EACA,WAAA;EACA,YAAA;EACA,MAAA;EACA,QAAA;ANyPZ;AMnPI;;;;EAKI,gBAAA;EACA,gBAAA;EACA,mBAAA;EACA,gBAAA;EACA,wBAAA;EACA,0BAAA;EACA,eAAA;ANoPR;AM/PI;;;;;;;;EAcI,gBAAA;EACA,eAAA;AN2PR;AM1QI;;;;EAmBI,4BAAA;EACA,6BAAA;EAEA,0CAAA;EACA,yBAAA;EACA,cAAA;EACA,kBAAA;EACA,mBAAA;AN4PR;AMtRI;;;;EA4BM,2BAAA;EACA,sBAAA;EACA,qBAAA;EACA,yBAAA;ANgQV;AM/RI;;;;EAkCQ,kBAAA;EACA,uBAAA;EACA,qBAAA;ANmQZ;AMvSI;;;;;;;;EAuCQ,wBAAA;EACA,gBAAA;EACA,mBAAA;EACA,+CAAA;AN0QZ;AMpTI;;;;EA6CQ,8CAAA;AN6QZ;AM1TI;;;;;;;;EAgDQ,wBAAA;ANoRZ;AMpUI;;;;;;;;EAmDQ,wBAAA;AN2RZ;AM9UI;;;;EA0DI,iBAAA;EACA,mBAAA;EACA,kBAAA;EACA,gBAAA;EACA,mBAAA;EAEA,YAAA;EACA,kBAAA;EACA,mBAAA;ANyRR;AM3VI;;;;EAoEM,UAAA;EACA,SAAA;AN6RV;AMxRI;EACE,kBAAA;EACA,kBAAA;EACA,eAAA;AN0RN;AMtRI;EAEI,kBAAA;EACA,SAAA;EACA,WAAA;EACA,WAAA;EACA,kBAAA;EACA,gBAAA;EACA,mBAAA;EACA,WAAA;EACA,YAAA;ANuRR;AMjSI;EAaI,kBAAA;EACA,6BAAA;EACA,4BAAA;EACA,oBAAA;EACA,WAAA;EACA,kBAAA;ANuRR;AMzSI;;EAuBI,2BAAA;EACA,wBAAA;ANsRR;AM9SI;EA4BI,yBAAA;EACA,0BAAA;ANqRR;AMlTI;EAiCI,2BAAA;EACA,6BAAA;ANoRR;AMtTI;EAsCI,4BAAA;EACA,6BAAA;ANmRR;AMhRM;EACE;IACE,wBAAA;ENkRR;EMhRM;IACE,2BAAA;IACA,uBAAA;ENkRR;AACF;AM9QI;EACE,kBAAA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,iBAAA;EACA,uBAAA;EACA,mBAAA;EAEA,yBAAA;EACA,QAAA;AN+QN;AMzRI;EAYI,UAAA;EACA,0BAAA;EACA,yBAAA;ANgRR;AOviBA;EACE,2BAAA;APyiBF;AOtiBA;EAEI,kBAAA;EACA,aAAA;EACA,aAAA;EACA,sBAAA;EACA,SAAA;APuiBJ;AO7iBA;EASM,gBAAA;EACA,gBAAA;EACA,gBAAA;EACA,WAAA;EACA,YAAA;APuiBN;AOpjBA;EAeQ,mBAAA;APwiBR;AOvjBA;EAoBM,WAAA;EACA,YAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,yBAAA;EACA,iBAAA;EACA,QAAA;EACA,gBAAA;APsiBN;AOlkBA;EAgCM,WAAA;EACA,YAAA;EACA,iBAAA;EACA,eAAA;EACA,cAAA;APqiBN;AOzkBA;EAuCQ,YAAA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;APqiBR;AO/kBA;EA6CY,YAAA;EACA,aAAA;EACA,mBAAA;APqiBZ;AOplBA;EAmDU,OAAA;EACA,aAAA;EACA,sBAAA;EAGA,SAAA;APkiBV;AO1lBA;EA4DQ,wCAAA;EACA,0BAAA;APiiBR;AO9lBA;EAiEQ,gBAAA;EACA,gBAAA;APgiBR;AOlmBA;EAqEU,iBAAA;APgiBV;AOrmBA;EAyEU,6BAAA;EACA,gBAAA;AP+hBV;AO7hBU;EACE,0BAAA;AP+hBZ;AO5mBA;EAkFU,eAAA;EACA,gCAAA;AP6hBV;AQpnBA;EACI,YAAA;EACA,iBAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,mBAAA;EACA,eAAA;EACA,kBAAA;EACA,qBAAA;EACA,gBAAA;EACA,kBAAA;EACA,mBAAA;EACA,YAAA;EACA,cAAA;ARsnBJ;AQrnBI;EACI,YAAA;EACA,mBAAA;ARunBR;AQlnBA;EACI,YAAA;EACA,iBAAA;EACA,kBAAA;EACA,WAAA;EACA,aAAA;EACA,kBAAA;EACA,gBAAA;ARonBJ;AQnnBI;EACI,gBAAA;ARqnBR;AQjnBA;EACI,aAAA;EACA,sBAAA;EACA,QAAA;ARmnBJ;AQtnBA;EAKQ,WAAA;ARonBR;AQ/mBA;EACI,aAAA;EACA,mBAAA;ARinBJ;AQnnBA;EAIQ,WAAA;ARknBR;ASnqBA;EACE,SAAA;EACA,UAAA;EAEA,gBAAA;EACA,gBAAA;EACA,qBAAA;EACA,kBAAA;EACA,qBAAA;EAEA,iBAAA;EACA,mBAAA;EACA,sBAAA;EACA,eAAA;EACA,mBAAA;ETmqBA,mCAAmC;EACnC,4CAA4C;AAC9C;ASnrBA;EAiBI,yBAAA;EACA,kBAAA;EACA,iBAAA;ATqqBJ;ASnqBI;EACE,eAAA;ATqqBN;AS3rBA;;EA6BQ,iBAAA;ATkqBR;AS/rBA;EAmCI,iBAAA;EACA,wBAAA;EACA,0BAAA;AT+pBJ;ASpsBA;;EA0CI,eAAA;AT8pBJ;ASxsBA;EA8CI,YAAA;EACA,kBAAA;EACA,MAAA;EACA,UAAA;EACA,UAAA;AT6pBJ;AS/sBA;EAsDI,gBAAA;AT4pBJ;ASltBA;EA0DI,kBAAA;EACA,WAAA;EACA,eAAA;AT2pBJ;ASvtBA;EAiEI,mBAAA;ATypBJ;AS1tBA;;EAuEI,kBAAA;ATupBJ;AS9tBA;EA2EI,gBAAA;ATspBJ;ASjuBA;;;;EAkFI,cAAA;EACA,WAAA;EACA,sBAAA;ATqpBJ;ASzuBA;EAwFI,aAAA;ATopBJ;AS5uBA;EA4FI,aAAA;ETmpBF,wBAAwB;ESjpBtB,WAAA;EACA,QAAA;ATmpBJ;ASlvBA;EAmGI,cAAA;ATkpBJ;ASrvBA;EAuGI,0BAAA;ATipBJ;ASxvBA;EA2GI,sCAAA;EACA,iBAAA;EACA,yCAAA;EACA,+BAAA;ATgpBJ;AS9vBA;EAiHM,iDAAA;ATgpBN;AS5oBM;EACE,wCAAA;EACA,YAAA;AT8oBR;AS3oBM;EACE,WAAA;AT6oBR;AS3oBQ;EACE,sBAAA;AT6oBV;AS3wBA;EAmIQ,WAAA;AT2oBR;AU7wBA;EAGI,WAAA;AV6wBJ;AWhxBA;EAGI,gBAAA;EACA,iBAAA;AXgxBJ;AWpxBA;EASI,aAAA;AX8wBJ;AYxxBA;EACE,eAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,aAAA;EACA,iBAAA;EACA,mBAAA;AZ0xBF;AYjyBA;EAUI,6BAAA;EACA,qCAAA;EACA,iCAAA;EACA,kBAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,iBAAA;EACA,mBAAA;EACA,aAAA;EACA,oBAAA;AZ0xBJ;AYzxBI;EACE,iBAAA;EACA,mBAAA;AZ2xBN;AajzBA;EACE,iBAAA;EACA,mBAAA;EACA,kBAAA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;EACA,UAAA;EACA,YAAA;EAEA,aAAA;EACA,mBAAA;EACA,oBAAA;EACA,uBAAA;EACA,QAAA;EACA,iBAAA;AbkzBF;Aa/yBA;EAGI,gBAAA;EACA,YAAA;EACA,SAAA;Ab+yBJ;Act0BA;EACE,kBAAA;EACA,UAAA;EACA,SAAA;EACA,2BAAA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;EACA,qCAAA;EACA,iCAAA;EACA,cAAA;EACA,iBAAA;EACA,eAAA;Adw0BF;Aep1BI;EACE,UAAA;Afs1BN;Aep1BI;EAEE,0CAAA;EACA,sBAAA;Afq1BN;Ael1BI;EACE,gBAAA;EACA,sBAAA;Afo1BN;AgBh2BA;EACI,YAAA;EACA,kBAAA;EACA,WAAA;EACA,iBAAA;EACA,gBAAA;EACA,aAAA;EACA,sBAAA;AhBk2BJ;AgBz2BA;EAUM,WAAA;EACA,SAAA;AhBk2BN;AgB72BA;EAcQ,eAAA;EACA,SAAA;AhBk2BR;AgBj3BA;;;EAsBM,SAAA;AhBg2BN;AgBt3BA;EA0BM,YAAA;AhB+1BN;AgB51BI;EACI,iDAAA;EACA,eAAA;EACA,mBAAA;EACA,gBAAA;EACA,mBAAA;AhB81BR;AgBh4BA;EAsCM,2BAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;AhB61BN;AiBr4BE;EACE,kBAAA;EACA,UAAA;EACA,UAAA;EACA,SAAA;EACA,SAAA;AjBu4BJ;AiB54BE;EAOI,aAAA;EACA,UAAA;EACA,YAAA;EACA,kBAAA;AjBw4BN;AiBt4BM;EACE,wBAAA;EACA,sBAAA;EACA,oBAAA;AjBw4BR;AiBv5BE;EAqBQ,kBAAA;EACA,WAAA;EACA,OAAA;EACA,SAAA;EACA,eAAA;EACA,iBAAA;EACA,mBAAA;AjBq4BV;AiBn4BU;EACE,4BAAA;EACA,8BAAA;AjBq4BZ;AiBp6BE;EAqCQ,kBAAA;EACA,OAAA;EACA,SAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;EACA,gBAAA;AjBk4BV;AkB76BA;EAGI,QAAA;EACA,OAAA;EACA,kBAAA;AlB66BJ;AkBl7BA;EASI,kBAAA;EACA,YAAA;AlB46BJ;AmBv7BA;EACE,kBAAA;EACA,aAAA;AnBy7BF;AmB37BA;EAKI,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,YAAA;AnBy7BJ;AmBj8BA;EAWM,qCAAA;EACA,cAAA;EACA,mBAAA;AnBy7BN;AmBt8BA;;EAgBQ,mBAAA;EACA,YAAA;AnB07BR;AmB38BA;EAsBI,kBAAA;EACA,WAAA;EACA,SAAA;EACA,eAAA;EACA,eAAA;EACA,YAAA;EACA,kBAAA;AnBw7BJ;AmBp9BA;EAgCI,kBAAA;EACA,cAAA;EACA,UAAA;EACA,wBAAA;EACA,0BAAA;AnBu7BJ;AmB39BA;EAuCM,kBAAA;EACA,qBAAA;EACA,qBAAA;EACA,mBAAA;EACA,kBAAA;EACA,mBAAA;EACA,gBAAA;EACA,yBAAA;EACA,gCAAA;EACA,qCAAA;EACA,kBAAA;EACA,yBAAA;EACA,aAAA;AnBu7BN;AmB1+BA;;EA0DM,iBAAA;EACA,aAAA;EACA,sBAAA;AnBo7BN;AmBh/BA;;EA+DQ,wBAAA;EACA,0BAAA;EACA,mBAAA;EACA,kBAAA;EACA,mBAAA;EAEA,qBAAA;EACA,uBAAA;EACA,gBAAA;EAEA,aAAA;EACA,mBAAA;EACA,iBAAA;EACA,2BAAA;EACA,QAAA;AnBm7BR;AmBhgCA;;EAiFQ,kBAAA;EACA,mBAAA;AnBm7BR;AmBrgCA;;EAsFQ,kBAAA;EACA,mBAAA;AnBm7BR;AmB1gCA;;EA0FU,eAAA;AnBo7BV;AmB9gCA;;EA8Fc,eAAA;AnBo7Bd;AmBlhCA;;EAiGc,iBAAA;EACA,kBAAA;AnBq7Bd;AmBvhCA;;EAsGc,eAAA;EACA,qBAAA;AnBq7Bd;AmB5hCA;;EA2Gc,kBAAA;EACA,eAAA;EACA,aAAA;AnBq7Bd;AmBl7BY;;EAEI,0BAAA;AnBo7BhB;AmBt7BY;;EAMI,qBAAA;AnBo7BhB;AmB1iCA;EAgII,kBAAA;AnB66BJ;AmB7iCA;EAoII,kBAAA;EACA,aAAA;EACA,cAAA;EACA,OAAA;EACA,SAAA;EACA,yBAAA;EACA,uBAAA;EACA,mBAAA;AnB46BJ;AoBvjCA;EACE,gBAAA;ApByjCF;AoB1jCA;EAII,wBAAA;EACA,6BAAA;EACA,gBAAA;ApByjCJ;AoB/jCA;EAUM,gBAAA;EACA,6BAAA;EACA,mBAAA;EACA,mBAAA;ApBwjCN;AoBrkCA;EAiBM,6BAAA;EACA,gBAAA;ApBujCN;AoBzkCA;EAuBI,kBAAA;EACA,iBAAA;ApBqjCJ;AoB7kCA;EA2BM,0BAAA;ApBqjCN;AqB/kCA;EACE,eAAA;EACA,eAAA;ArBilCF;AqB7kCA;EAEI,iCAAA;EACA,qCAAA;EACA,eAAA;ArB8kCJ;AqB1kCI;;EACE,4DAAA;EACA,SAAA;EACA,eAAA;EACA,aAAA;EACA,gBAAA;EACA,YAAA;EACA,eAAA;EACA,gBAAA;EACA,aAAA;EACA,sBAAA;ArB6kCN;AqB5kCM;;EACE,aAAA;ArB+kCR;AqB3kCI;EACE,gCAAA;EACA,WAAA;ArB6kCN;AqB1kCI;EACE,yBAAA;EACA,kBAAA;EACA,iBAAA;EACA,gBAAA;EACA,kBAAA;EACA,aAAA;ArB4kCN;AsBrnCA;EAGI,eAAA;AtBqnCJ;AsBxnCA;;EAMM,WAAA;AtBsnCN;AsB5nCA;EAYM,cAAA;EACA,QAAA;EACA,aAAA;EACA,sCAAA;EAEA,aAAA;EACA,gBAAA;EACA,0DAAA;EACA,kCAAA;EACA,aAAA;AtBknCN;AsBvoCA;EAyBI,aAAA;AtBinCJ;AuB3oCA;EACI,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,qCAAA;EACA,iCAAA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;AvB6oCJ;AuBtpCA;;EAYM,WAAA;EACA,UAAA;AvB8oCN;AuB3pCA;EAiBM,kBAAA;EACA,gBAAA;AvB6oCN;AwB/pCA;EACI,eAAA;EACA,YAAA;EACA,kBAAA;EACA,iBAAA;EACA,kBAAA;AxBiqCJ;AwB9pCA;EACI,sBAAA;AxBgqCJ;AyBzqCA;EACI,6BAAA;EACA,wBAAA;EACA,uBAAA;EAEA,6BAAA;EAEA,yBAAA;EACA,8BAAA;EzByqCF,mDAAmD;EyBtqCjD,mCAAA;EACA,+BAAA;EzBwqCF,yBAAyB;EyBrqCvB,6BAAA;EACA,4CAAA;EACA,yCAAA;EzBuqCF,kBAAkB;EyBpqChB,+BAAA;EACA,sBAAA;EACA,4BAAA;EACA,qBAAA;EAEA,yEAAA;EACA,yEAAA;EACA,2EAAA;EACA,6EAAA;EzBqqCF;KACG;EyBlqCD,mCAAA;EzBoqCF,sHAAsH;EyBjqCpH,8BAAA;EAGA,6BAAA;EzBiqCF,oFAAoF;EACpF;;MAEI;AACN;AyB3sCA;EAyCQ,wCAAA;EACA,YAAA;AzBqqCR;AyBpqCQ;EACI,wBAAA;AzBsqCZ;AyBltCA;EAiDQ,6BAAA;AzBoqCR;AyBrtCA;EAsDQ,kDAAA;AzBkqCR;AyBxtCA;EA0DQ,0CAAA;EACA,kBAAA;EACA,2CAAA;AzBiqCR;AyB7tCA;EA8DY,8BAAA;AzBkqCZ;AyBjqCY;EACI,sDAAA;AzBmqChB;AyBnuCA;EAsEQ,8BAAA;EACA,0CAAA;AzBgqCR;AyB/pCQ;EACI,uBAAA;EACA,+CAAA;AzBiqCZ;AyB3uCA;EA+EQ,+BAAA;AzB+pCR;AyB9uCA;EAmFQ,sCAAA;EACA,6BAAA;EACA,2CAAA;AzB8pCR;AyBnvCA;EAyFQ,yBAAA;AzB6pCR;AyBtvCA;EA4FgB,YAAA;AzB6pChB;AyBzvCA;EA+FgB,YAAA;AzB6pChB;AyB5vCA;EAmGY,YAAA;EACA,qBAAA;AzB4pCZ;AyBhwCA;;EAyGgB,4BAAA;EACA,8BAAA;AzB2pChB;AyBrwCA;EA+GY,6BAAA;AzBypCZ;AyBvpCY;EACI,uBAAA;AzBypChB;AyB3wCA;;EAsHgB,YAAA;EACA,yBAAA;AzBypChB;AyBhxCA;;;;;;;;EA6HoB,wBAAA;AzB6pCpB;AyB1xCA;;;;EAkIoB,sBAAA;AzB8pCpB;AyBhyCA;EAyIQ,sCAAA;EACA,wCAAA;EACA,yBAAA;AzB0pCR;AyBryCA;EA+IQ,wCAAA;AzBypCR;AyBxyCA;EAmJQ,sCAAA;EACA,qCAAA;EACA,yCAAA;EACA,+BAAA;AzBwpCR;AyB9yCA;EAyJY,iDAAA;AzBwpCZ;AyBppCY;EACI,wCAAA;EACA,YAAA;AzBspChB;AyBnpCY;EACI,mCAAA;AzBqpChB;AyBnpCgB;EACI,sBAAA;AzBqpCpB;AyB3zCA;EA2KgB,WAAA;AzBmpChB;AyB9zCA;EAkLQ,sBAAA;EACA,4BAAA;EACA,2BAAA;AzB+oCR;AyB9oCQ;EACI,yDAAA;AzBgpCZ;AyB7oCQ;EACI,yDAAA;AzB+oCZ;AyBz0CA;EA+LQ,+BAAA;EACA,sCAAA;EACA,2CAAA;AzB6oCR;AyB90CA;EAoMY,yBAAA;AzB6oCZ;AyB5oCY;EACI,sCAAA;AzB8oChB;AyBp1CA;EA6MQ,8CAAA;AzB0oCR;AyBxoCQ;EACI,qCAAA;AzB0oCZ;AyBnoCoB;;EACI,uBAAA;AzBsoCxB;AyBzoCY;;;;;;;;;;;;EAagB,+CAAA;AzB0oC5B;AyBvpCY;;;;EAkBgB,6CAAA;AzB2oC5B;AyBpoCgB;;EACI,oCAAA;AzBuoCpB;AyBt3CA;;;;;;;;;;;;EA0PwB,iDAAA;AzB0oCxB;AyBp4CA;;;;EA+PwB,+CAAA;AzB2oCxB;AyB14CA;EAyQgB,6BAAA;AzBooChB;AyB74CA;EA6QgB,6BAAA;AzBmoChB;AyBh5CA;EAkRY,6BAAA;AzBioCZ;AyBn5CA;EAqRgB,6BAAA;AzBioChB;AyBt5CA;EA2RQ,2CAAA;EACA,0CAAA;EACA,+BAAA;AzB8nCR;AyB35CA;EA+RY,6BAAA;EACA,yBAAA;EACA,oBAAA;AzB+nCZ;AyB7nCY;EACI,oCAAA;AzB+nChB;AyBznCQ;EACI,UAAA;EACA,6BAAA;AzB2nCZ;AyBv6CA;EAiTQ,YAAA;EACA,uBAAA;AzBynCR;AyB36CA;EAuTY,+BAAA;EACA,2CAAA;AzBunCZ;AyB/6CA;EA4ToB,+CAAA;EACA,6BAAA;AzBsnCpB;AyBn7CA;EAqUwB,6BAAA;AzBinCxB;AyBt7CA;EAyUwB,6BAAA;AzBgnCxB;AyBz7CA;EA6UwB,WAAA;AzB+mCxB;AyB57CA;EAmVgB,6BAAA;AzB4mChB;AyB/7CA;EAyVQ,mDAAA;AzBymCR;AyBl8CA;EA6VQ,gDAAA;AzBwmCR;AyBr8CA;EAgWgB,6BAAA;AzBwmChB;AyBx8CA;EAqWY,eAAA;AzBsmCZ;AyB38CA;EAwWoB,6BAAA;AzBsmCpB;AyB98CA;EA6WY,2CAAA;EACA,0CAAA;EACA,kBAAA;EACA,+BAAA;AzBomCZ;AyBp9CA;EAmXoB,YAAA;AzBomCpB;AyBv9CA;EAqXwB,oCAAA;AzBqmCxB;AyBpmCwB;EACI,6BAAA;AzBsmC5B;AyBpmCwB;EACI,6BAAA;AzBsmC5B;AyBh+CA;EAkYoB,sCAAA;AzBimCpB;AyBn+CA;EAuYgB,uBAAA;EACA,yBAAA;EACA,oCAAA;AzB+lChB;AyBxlCY;EACI,yBAAA;EACA,qBAAA;EACA,cAAA;AzB0lChB;AyBxlCY;EACI,yBAAA;EACA,qBAAA;EACA,cAAA;AzB0lChB;AyBl/CA;EA8ZQ,wCAAA;EACA,YAAA;AzBulCR;AyBt/CA;EAyaoB,6BAAA;EACA,+CAAA;EACA,oCAAA;AzBglCpB;AyB7kCgB;EACI,sDAAA;AzB+kCpB;AyB5kCgB;EACI,yDAAA;AzB8kCpB;AyB/kCgB;EAGQ,6BAAA;AzB+kCxB;AyBllCgB;EAMQ,6BAAA;EACA,oCAAA;AzB+kCxB;AyBxgDA;EAocQ,yBAAA;AzBukCR;AyBtkCQ;EACI,oCAAA;AzBwkCZ;AyB9gDA;EzBghDE,6DAA6D;AAC/D;AyBxkCY;;;;;;;;;;;;EAOQ,6BAAA;AzB+kCpB;AyBtlCY;;;;EAUQ,2CAAA;AzBklCpB;AyB5lCY;;;;EAaQ,2BAAA;EACA,kBAAA;EACA,mBAAA;EACA,kBAAA;EACA,8BAAA;AzBqlCpB;AyBtmCY;;;;EAoBQ,cAAA;EACA,qBAAA;EACA,sKAAA;EAYA,gCAAA;EACA,sCAAA;EACA,4BAAA;EACA,iCAAA;AzB6kCpB;AyBlnCY;;;;EAwCQ,gCAAA;AzBglCpB;AyB3kCY;EAEQ,8CAAA;EACA,uBAAA;AzB4kCpB;AyBrkDA;EA8fgB,sCAAA;AzB0kChB;AyBxkDA;EAigBoB,6BAAA;AzB0kCpB;AyB3kDA;EAogBoB,6BAAA;AzB0kCpB;AyB9kDA;EA2gBQ,yBAAA;AzBskCR;AyBjlDA;EA+gBQ,6BAAA;EACA,yBAAA;AzBqkCR;AyBrlDA;;;;;;;;EA0hBY,yCAAA;AzBqkCZ;AyB/lDA;;;;EAiiBY,uCAAA;AzBokCZ;AyB7jCY;EACI,gCAAA;AzB+jChB;AyB3jCQ;EACI,YAAA;AzB6jCZ;AyBzjCY;EACQ,+BAAA;AzB2jCpB;AyBvjCI;EACI;IACI,6BAAA;IACA,0CAAA;EzByjCV;EyBtjCM;IACI,mCAAA;IACA,qCAAA;EzBwjCV;EyBrjCM;IACI,6BAAA;IACA,0CAAA;EzBujCV;AACF;AACA,4DAA4D;A0B3nD5D;EACI,kBAAA;EACA,aAAA;EACA,sBAAA;EACA,iBAAA;EACA,8BAAA;EAEA,WAAA;EACA,aAAA;EACA,yBAAA;EACA,WAAA;EACA,+CAAA;EACA,wBAAA;A1B4nDJ;A0BxoDA;EAgBQ,YAAA;EACA,aAAA;EACA,sBAAA;EACA,iBAAA;EACA,sBAAA;EACA,mBAAA;EACA,qBAAA;EACA,SAAA;A1B2nDR;A0BlpDA;EAyBY,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,kBAAA;EACA,qBAAA;A1B4nDZ;A0BzpDA;EAgCgB,cAAA;EAaA,gBAAA;EACA,gBAAA;EACA,0BAAA;EACA,YAAA;EACA,kBAAA;A1BgnDhB;A0BjqDA;EAkCoB,gBAAA;EACA,2BAAA;EACA,gBAAA;EACA,6BAAA;A1BkoDpB;A0BvqDA;EAwCoB,2BAAA;EACA,aAAA;EACA,kBAAA;EACA,+BAAA;A1BkoDpB;A0B7qDA;EAqDY,aAAA;EACA,kBAAA;EACA,uBAAA;EACA,mBAAA;EACA,gBAAA;EACA,eAAA;A1B2nDZ;A0BrrDA;EA6DgB,OAAA;EACA,sBAAA;EAGA,aAAA;EACA,sBAAA;EACA,iBAAA;EACA,mBAAA;A1BynDhB;A0B7rDA;EAuEoB,gBAAA;A1BynDpB;A0BhsDA;EA+EQ,YAAA;EAEA,aAAA;EACA,mBAAA;EACA,iBAAA;EACA,8BAAA;EACA,qBAAA;A1BmnDR;A0BxsDA;EAuFY,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,aAAA;EACA,sBAAA;EACA,iBAAA;EACA,uBAAA;EACA,yBAAA;EACA,mBAAA;EACA,YAAA;EACA,iBAAA;A1BonDZ;A0BrtDA;EAmGgB,YAAA;A1BqnDhB;A0BxtDA;EAwGY,sCAAA;EACA,eAAA;A1BmnDZ;A0B5tDA;EA2GgB,YAAA;EACA,qBAAA;EACA,2BAAA;EACA,kBAAA;A1BonDhB;A0BnnDgB;EACI,yBAAA;A1BqnDpB;A0BlnDgB;EACI,6CAAA;A1BonDpB;A0B9mDI;EACI;IAAK,wBAAA;E1BinDX;E0BhnDM;IAAO,4BAAA;E1BmnDb;AACF;A2BlvDA;EACI,uBAAA;EACA,sBAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EACA,aAAA;EACA,oBAAA;EACA,WAAA;A3BovDJ;A2B5vDA;EAWQ,2BAAA;EACA,gBAAA;EACA,QAAA;EACA,kBAAA;EACA,6BAAA;EACA,kBAAA;EACA,iBAAA;EACA,0CAAA;A3BovDR;A2BtwDA;EAoBY,0BAAA;EACA,gBAAA;EACA,YAAA;EACA,iBAAA;A3BqvDZ;A2B5wDA;EA4BQ,UAAA;EACA,sBAAA;EACA,kBAAA;EACA,MAAA;EACA,SAAA;EACA,YAAA;EACA,OAAA;EACA,QAAA;A3BmvDR;A2BtxDA;EAuCQ,kBAAA;EACA,WAAA;EACA,aAAA;A3BkvDR;A4B3xDA;EACI,kBAAA;EACA,aAAA;EACA,WAAA;EACA,2DAAA;A5B6xDJ;A4BjyDA;EAOQ,kBAAA;EACA,UAAA;EACA,aAAA;EACA,WAAA;EACA,2DAAA;A5B6xDR;A4BxyDA;EAeQ,kBAAA;EACA,UAAA;EACA,aAAA;EACA,WAAA;EACA,2DAAA;A5B4xDR;A4B/yDA;EAuBQ,kBAAA;EACA,UAAA;EACA,aAAA;EACA,WAAA;EACA,2DAAA;A5B2xDR;A4BtzDA;EAgCQ,YAAA;EACA,2BAAA;EACA,kBAAA;EACA,gBAAA;EACA,iBAAA;EACA,gBAAA;EACA,SAAA;A5ByxDR;A4B/zDA;EA0CQ,gBAAA;EACA,aAAA;EACA,UAAA;EACA,YAAA;EACA,kBAAA;EACA,sBAAA;EACA,6CAAA;EACA,MAAA;A5BwxDR;A4Bz0DA;EAoDY,kBAAA;EACA,UAAA;EACA,kBAAA;EACA,YAAA;EACA,eAAA;EACA,gBAAA;EACA,WAAA;A5BwxDZ;A4Bl1DA;EA6DY,kBAAA;EACA,SAAA;EACA,SAAA;EACA,2BAAA;A5BwxDZ;A4Bx1DA;EAmEY,kBAAA;EACA,SAAA;EACA,aAAA;A5BwxDZ;A4B71DA;EAwEgB,6BAAA;EACA,kBAAA;EACA,mBAAA;A5BwxDhB;A4Bl2DA;EA+EY,kBAAA;EACA,SAAA;EACA,YAAA;EACA,2BAAA;A5BsxDZ;A4BnxDQ;EACI,QAAA;EACA,0BAAA;A5BqxDZ;A4BlxDQ;EACI,SAAA;EACA,2CAAA;A5BoxDZ;A4BjxDQ;EACI,SAAA;EACA,0BAAA;A5BmxDZ;AA52DA;EACI,SAAA;EACA,UAAA;EACA,kBAAA;EACA,kBAAA;EACA,6BAAA;AA82DJ","sourcesContent":["\nbody {\n    font-family: 'Roboto', sans-serif !important;\n    font-weight: 300;\n\n    .dropdown-menu {\n        padding: var(--menu-container-padding);\n        li {\n            text-align: left;\n            display: flex;\n            flex-direction: row;\n            height: 32px;\n            align-items: center;\n            cursor: pointer;\n            border-radius: 4px;\n            padding-left: 4px;\n            padding-right: 4px;\n        }\n    }\n\n}\n  \n@keyframes spinner {\n    to {\n        transform: translate(-50%, -50%) rotate(360deg);\n    }\n}\n\n.spinner {\n    >*{\n        opacity: 0.08 !important;\n    }\n    &:before {\n        content: '';\n        transform: translate(-50%, -50%) ;\n        position: absolute;\n        z-index: 2000;\n        top: 50%;\n        left: 50%;\n        width: 30px;\n        height: 30px;\n        border-radius: 50%;\n        border-width:2px;\n        border-style: solid;\n        animation: spinner .6s linear infinite;\n    }\n}\n\n\n.tooltip{\n    z-index: 1000000;\n}\n  ","@import \"../../common/less/index\";\n\n@import \"variables\";\n@import \"hero\";\n@import \"intro\";\n@import \"slidedeck\";\n\n\nbody {\n    margin: 0;\n    padding: 0;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    scroll-snap-type: y mandatory;\n}\n\n",".userinfo_toggler{\n\n  .userContainer {\n    text-align: center;\n    img {\n      width: 90px;\n    }\n  }\n}\n",".appbar {\n    height:@appbarHeight;\n    position: relative;\n    border: none !important;\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding-left:10px;\n    padding-right:10px;\n\n    .icon {\n        height: @toolbarHeight - 20;\n    }\n    .title {\n        h1 {\n            font-size: 24px;\n            font-weight: 200;\n            letter-spacing: 6px;\n            margin: 0;\n        }\n        h2 {\n            font-size: 14px;\n            font-weight: 400;\n            letter-spacing:4px;\n            margin: 0;\n        }\n    }\n\n    .spacer {\n        flex-grow: 1;\n    }\n\n    .group {\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n    }  \n    \n    .image-button{\n        cursor:pointer;\n    }\n}\n",".list {\n    padding: var(--menu-container-padding);\n    margin: 0;\n    border: 0;\n\n    .list-item {\n      font-weight: 400;\n      height: @buttonHeight;\n      font-size: var(--label-font-size);\n      padding: var(--menu-container-padding);\n      border-radius: @borderRadiusSmall;\n\n      &:hover{\n        background-color: rgb(var(--list-item-hover-bg-color));\n        .list-item-action {\n          opacity: 1; \n          transform: scale(1); \n          transition: all 0.2s ease;\n        }\n      }\n      &.selected {\n        background-color: rgb(var(--list-item-selected-bg-color));\n        .list-item-action {\n          opacity: 1; \n          transform: scale(1); \n          transition: all 0.2s ease;\n        }\n      }\n\n      .list-item-action {\n        opacity: 0; \n        transform: scale(0.5); \n        transition: all 0.2s ease;\n        font-size: 20px;\n        min-width: 25px;\n      }\n\n      &:before {\n        background-color: rgb(var(--tint-color));\n        block-size: 16px;\n        border-radius: 3px;\n        content: \"\";\n        inline-size: 3px;\n        inset-inline-start: 0;\n        opacity: 0;\n        position: absolute;\n        transform: scaleY(0);\n        transition: transform 170ms cubic-bezier(0, 0, 0, 1);\n        margin-left:2px;\n      }\n\n      &.selected {\n        &:before {\n          opacity: 1;\n          transform: scaleY(1);\n        }\n      }\n    }\n  }",".toolbar {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: @buttonSpacing;\n  padding-right: 10px;\n  height: @toolbarHeight;\n  padding: var(--menu-container-padding);\n\n  * {\n    outline: none;\n  }\n\n  .spacer {\n    flex-grow: 1;\n  }\n\n  .group {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    height:100%;\n    gap: @buttonSpacing;\n\n    .statusIndicator {\n      margin: 20px;\n\n      img {\n        display: block;\n        cursor: pointer;\n        margin: auto;\n      }\n\n      span {\n        font-size: .8em;\n        text-align: center;\n        width: 100%;\n        display: inline-block;\n        white-space: nowrap;\n      }\n\n      .notSupported {\n        display: none;\n        font-weight: bold;\n      }\n\n      .connected {\n        display: block;\n      }\n\n      .disconnected {\n        display: none;\n      }\n    }\n\n    .statusIndicator.disabled {\n      img {\n        cursor: not-allowed;\n\n        &:hover {\n          box-shadow: none;\n        }\n      }\n\n      .notSupported {\n        display: block;\n      }\n\n      .connected {\n        display: none;\n      }\n\n      .disconnected {\n        display: none;\n      }\n    }\n\n    .statusIndicator.error:not(.disabled) {\n      span {\n        font-weight: bold;\n      }\n\n      .notSupported {\n        display: none;\n      }\n\n      .connected {\n        display: none;\n      }\n\n      .disconnected {\n        display: block;\n      }\n    }\n  }\n}",".tree-leaf {\n    font-weight: var(--label-font-weight);\n    font-size: var(--label-font-size);\n    display: flex;\n    flex-direction: column;\n    align-items: stretch;\n    float: unset;\n    min-height:28px;\n\n    .tree-leaf-content{\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      cursor: pointer;\n      transition: all 0.4s;\n      padding-left:3px;\n      height: 25px;\n      border-radius: @borderRadiusSmall;\n      &.tree-child-leaves{\n        transition: all 0.4s;\n      }\n      &:hover{\n        transition: all 0.4s;\n      }\n      &.selected{\n        transition: all 0.4s;\n      }\n      .tree-leaf-text{\n        float:unset;\n      }\n      .tree-expando {\n        float: unset;\n        top: unset;\n        position: unset;\n        width: 16px;\n        height: 16px;\n        line-height: 14px;\n        border-radius: @borderRadiusSmall;\n        border-width: 1px;\n        &.hidden{\n          display: block !important;\n          visibility: hidden !important;\n        }\n      }\n    }\n}\n","/** don't place \".section\" in the sub-tree of \".sections\" . The \".section\" is \n    used in other page elements like pdf, dialog, single page, ... as well without the\n    outer \"sections\" content\n **/ \n.section {\n  margin-left:20px;\n  margin-right:20px;\n  cursor: pointer;\n  border-width:1px;\n  border-style:solid;\n  padding-left:3px;\n  position: relative;\n\n\n  &.error {\n    border-width:1px;\n    border-style:solid;\n  }\n\n  .fc{\n    position: absolute;\n    top: 0px;\n    bottom: 0px;\n    right:0px;\n    width:5px;\n    .tinyFlyoverMenu {\n      opacity: 0;\n      z-index: unset;\n    }\n  }\n\n  &[data-type='timing'],\n  &[data-type='image']{\n    text-align: center;\n  }\n\n  .sectionContent {\n    /* required for flashcard */\n    perspective: 1800px;\n\n    \n    .placeholderContainer{\n      display: flex;\n      width: fit-content;\n      padding:15px;\n      border-radius:@borderRadiusBig;\n      margin: 50px;\n      margin-left: auto;\n      margin-right: auto;\n      border-style: dashed;\n      border-width: 1px;\n\n      .placeholderButtons{\n        display: flex;\n        flex-direction: column;\n        gap: 5px;\n        padding-left: 3vw;\n        justify-content: center;\n        .placeholderMenuInsertSection{\n          text-align: left;\n        }\n      }\n      .placeholderText{\n        h1{\n          font-size:14px !important;\n          font-weight: bold !important;\n          border:none !important;\n        }\n        h2{\n          font-size: var(--label-font-size);\n          font-weight:var(--label-font-weight);\n        }\n      }\n    }\n\n    &[data-type='image']{\n      text-align: center;\n      max-width: 100%;\n\n      #editor-container {\n        display: inline-grid;\n        min-height: 200px;\n        position: relative;\n        justify-items: center;\n        width:100%;\n        .drop-message{\n          height: 100px;\n          border: 1px solid rgb(var(--border-color));\n          display: flex;\n          width: 300px;\n          align-items: center;\n          justify-content: center;\n          background-color: rgba(var(--pane-bg-color),0.4);\n          border-radius: @borderRadiusBig;\n          box-shadow: var(--box-shadow-1);\n          grid-area: 1 / 1 / 2 / 2;\n          position: absolute;\n          margin-top: 2vh;\n          backdrop-filter: blur(4px);\n          font-size: var( --label-font-size);\n          font-weight: var( --label-font-weight);\n      \n        }\n        .scaleSlider {\n          position: absolute;\n          width:100%;         \n        }\n        #image-preview {\n          grid-area: 1 / 1 / 2 / 2;\n          width:100%;\n          .image-view {\n            display: inline-block;\n            position: relative;\n            margin-right: 13px;\n            margin-bottom: 13px;\n            width:100%;\n            img {\n              max-width: 100%;\n            }\n          }\n          .overlay {\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            top: 0;\n            right: 0;\n          }\n        }\n      }\n    }\n\n    &[data-type='flashcard'],\n    &[data-type='wysiwyg'],\n    &[data-type='markdown'],\n    &[data-type='cloze']{\n      h1 {\n        font-weight: 400;\n        margin-bottom: 0;\n        margin-bottom: 18px;\n        margin-top: 19px;\n        border-bottom-width: 2px;\n        border-bottom-style: solid;\n        font-size: 18px;\n      }\n      h2, h3 {\n        font-weight: 300;\n        font-size: 18px;\n      }\n\n      table { \n        margin-left:auto !important;\n        margin-right:auto !important;\n\n        border: 1px solid rgb(var(--border-color));\n        border-collapse: separate;\n        border-left: 0;\n        border-radius: 4px;\n        border-spacing: 0px;\n        thead {\n          display: table-header-group;\n          vertical-align: middle;\n          border-color: inherit;\n          border-collapse: separate;\n        }\n        tr {\n            display: table-row;\n            vertical-align: inherit;\n            border-color: inherit;\n        }\n        th, td {\n            padding: 5px 8px 6px 8px; \n            text-align: left;\n            vertical-align: top;\n            border-left: 1px solid rgb(var(--border-color));    \n        }\n        td {\n            border-top: 1px solid rgb(var(--border-color));    \n        }\n        thead:first-child tr:first-child th:first-child, tbody:first-child tr:first-child td:first-child {\n            border-radius: 4px 0 0 0;\n        }\n        thead:last-child tr:last-child th:first-child, tbody:last-child tr:last-child td:first-child {\n            border-radius: 0 0 0 4px;\n        }\n        \n      }\n      \n\n      .info{\n        border-width:1px;\n        border-style: solid;\n        border-radius: @borderRadiusBig;\n        font-weight: 400;\n        letter-spacing: 2px;\n        padding: 5px;\n        padding: 5px;\n        padding-left: 20px;\n        padding-right: 20px;\n        p{\n          padding: 0;\n          margin:0;\n        }\n      }\n    }\n\n    &[data-type='brain']{\n      text-align:center;\n      position: relative;\n      max-width:100%;\n    }\n\n\n    &[data-type='flashcard']{\n      .sectionMenuFlip{\n        position:absolute;\n        left:50%;\n        bottom: 0px;\n        border:0px;\n        border-radius: 50%;\n        padding-top:6px;\n        padding-bottom:6px;\n        width:40px;\n        height:40px;\n      }\n      .flip_box {\n        position: relative;\n        transition: all 0.5s ease-out;\n        transform-style: preserve-3d;\n        display: inline-grid;\n        width:100%;\n        border-radius:@borderRadiusSmall;\n      }\n\n      .front,\n      .back {\n        backface-visibility: hidden;\n        grid-area: 1 / 1 / 2 / 2;\n      }\n\n      .back {\n        background-color: rgb(243, 241, 241);\n        transform: rotateY(180deg);\n      }\n\n      .flipped-back {\n        animation: flip  0.5s normal;\n        animation-fill-mode: forwards;\n      }\n\n      .flipped-front {\n        animation: flip  0.5s reverse;\n        animation-fill-mode: forwards;\n      }\n\n      @keyframes flip {\n        0% {  \n          transform: rotateY(   0deg); \n        }\n        100%   {  \n          transform: rotateY(-180deg);\n          background-color: black;\n        }\n      }\n    }\n\n    &[data-type='spacer']{\n      position: relative;\n      text-align: center;\n      display: flex;\n      flex-direction: row;\n      flex-wrap: nowrap;\n      justify-content: center;\n      align-items: center;\n\n      transition: all 0.2s ease;\n      gap: 1px;\n      .electra-button{\n        opacity: 0; \n        transform: scale(0.3,0.5);\n        transition: all 0.2s ease;\n      }\n    }\n  }\n}\n",".modal-backdrop.in{\n  transition: all .4s linear;\n}\n\n.genericDialog {\n  .modal-content{\n    border-radius:@borderRadiusBig;\n    padding: @contentToEdgePadding;\n    display: flex;\n    flex-direction: column;\n    gap: @contentAreaSpacing;\n\n    .modal-header{\n      border-bottom:0;\n      font-weight:400;\n      box-shadow:none;\n      margin:0px;\n      padding: 0px;\n      h4{\n        padding-bottom:4px;\n      }\n    }\n\n    .modal-footer {\n      margin:0px;\n      padding: 0px;\n      border: none;\n      display: flex;\n      flex-direction: row;\n      justify-content: flex-end;\n      flex-wrap: nowrap;\n      gap: @buttonSpacing;\n      margin-top: @contentAreaSpacing;\n    }\n\n    .modal-body {\n      margin:0px;\n      padding: 0px;\n      min-height:120px;\n      max-height:80%;\n      overflow:auto;\n\n      .media{\n        padding:0px;\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n        .media-left{\n          img{\n            width: 120px;\n            height: 120px;\n            object-fit: contain;\n          }\n        }\n        .media-body{\n          flex:1;\n          display: flex;\n          flex-direction: column;\n          // in the media body section wen have currently just inpt controls. Use the corect spacing\n          // between the different controll elements.\n          gap:@controlGroupSpacing;\n        }\n      }\n      .section {\n        border: 0px solid transparent !important;  \n        cursor: default !important;\n      }\n\n      .list-group {\n        overflow-y: auto;\n        overflow-x: auto;\n\n        *[data-draw2d=\"true\"] {\n          font-weight: bold;\n        }\n\n        .list-group-item {\n          background-color: transparent;\n          font-weight: 300;\n\n          &:hover {\n            text-decoration: underline;\n          }\n        }\n\n        *[data-draw2d=\"false\"][data-type=\"file\"] {\n          cursor: default;\n          text-decoration: none !important;\n\n        }\n      }\n    }\n  }\n}\n",".electra-button{\n    height: @buttonHeight;\n    line-height: @buttonHeight;\n    min-width: @buttonHeight * 2;\n    text-align: center;\n    outline-width: 0;\n    outline-style: none;\n    cursor:pointer;\n    border-radius: @borderRadiusSmall;\n    display: inline-block;\n    font-weight: 400;\n    padding-left:10px;\n    padding-right:10px;\n    border: none;\n    font-size:1em;\n    &.disabled{\n        opacity: 0.5;\n        cursor:not-allowed;\n    }\n}\n\n\ninput[type=text]{\n    height: 34px;\n    padding-left: 9px;\n    padding-right: 9px;\n    width:100%;\n    outline: none;\n    border-radius: @borderRadiusSmall;\n    box-shadow: none;\n    &:focus{\n        box-shadow: none;\n    }\n}\n\n.controlWithHeader{\n    display: flex;\n    flex-direction: column;\n    gap: @controlHeadingSpacing;\n    label{\n        margin:0px;\n    }\n\n}\n\n.inputWithButton{\n    display: flex;\n    flex-direction: row;\n    input{\n        flex:1 1px;\n    }\n}",".context-menu-list {\n  margin: 0;\n  padding: 0;\n\n  min-width: 120px;\n  max-width: unset;\n  display: inline-block;\n  position: absolute;\n  list-style-type: none;\n\n  border-width: 1px;\n  border-style: solid;\n  border-left-width: 2px;\n  font-size: 15px;\n  white-space: nowrap;\n\n  .context-menu-item {\n    padding: 5px 5px 5px 24px;\n    position: relative;\n    user-select: none;\n\n    &.hover {\n      cursor: pointer;\n    }\n\n    >label {\n\n      >input,\n      >textarea {\n        user-select: text;\n      }\n    }\n  }\n\n  .context-menu-separator {\n    padding-bottom: 0;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n  }\n\n  .context-menu-input.hover,\n  .context-menu-item.disabled.hover {\n    cursor: default;\n  }\n\n  .context-menu-submenu:after {\n    content: \">\";\n    position: absolute;\n    top: 0;\n    right: 3px;\n    z-index: 1;\n  }\n\n  .context-menu-item.icon {\n    min-height: 18px;\n  }\n\n  .context-menu-item.icon:before {\n    position: relative;\n    left: -15px;\n    font-size: 19px;\n  }\n\n  /* vertically align inside labels */\n  .context-menu-input>label>* {\n    vertical-align: top;\n  }\n\n  /* position checkboxes and radios as icons */\n  .context-menu-input>label>input[type=\"checkbox\"],\n  .context-menu-input>label>input[type=\"radio\"] {\n    margin-left: -17px;\n  }\n\n  .context-menu-input>label>span {\n    margin-left: 5px;\n  }\n\n  .context-menu-input>label,\n  .context-menu-input>label>input[type=\"text\"],\n  .context-menu-input>label>textarea,\n  .context-menu-input>label>select {\n    display: block;\n    width: 100%;\n    box-sizing: border-box;\n  }\n\n  .context-menu-input>label>textarea {\n    height: 100px;\n  }\n\n  .context-menu-item>.context-menu-list {\n    display: none;\n    /* re-positioned by js */\n    right: -5px;\n    top: 5px;\n  }\n\n  .context-menu-item.hover>.context-menu-list {\n    display: block;\n  }\n\n  .context-menu-accesskey {\n    text-decoration: underline;\n  }\n\n  .context-menu-list {\n    border-color: rgb(var(--border-color));\n    background: white;\n    border-left-color: rgb(var(--tint-color));\n    box-shadow: var(--box-shadow-2);\n\n    .context-menu-separator {\n      border-bottom: 1px solid rgb(var(--border-color));\n    }\n\n    .context-menu-item {\n      &.hover {\n        background-color:rgb(var(--tint-color));\n        color: white;\n      }\n\n      &.disabled {\n        color: #666;\n\n        &.hover {\n          background-color: #EEE;\n        }\n      }\n\n      .context-menu-submenu:after {\n        color: #666;\n      }\n    }\n  }\n}","\n#fileOpenDialog {\n\n  .list-group{\n    height:60%;\n  }\n}\n","\n#githubFileSaveAsDialog {\n\n  .filePreview{\n    max-width: 200px;\n    max-height: 200px;\n  }\n\n\n  .list-group{\n    height:250px;\n  }\n}\n","#canvas_zoom{\n  position: fixed;\n  bottom: 20px;\n  right: @rightMenuWidth + 20px;\n  border-radius:@borderRadiusSmall;\n  display: flex;\n  flex-wrap: nowrap;\n  align-items: center;\n\n  button {\n    background-color:transparent;\n    font-weight:var(--label-font-weight);\n    font-size: var(--label-font-size);\n    border-radius:@borderRadiusSmall;\n    padding:5px;\n    padding-left:10px;\n    padding-right:10px;\n    border-width:1px;\n    border-style: solid;\n    outline:none;\n    transition: all 0.5s;\n    &:hover {\n      border-width:1px;\n      border-style: solid;\n    }\n  }\n}\n","\n.tinyFlyoverMenu {\n  border-width:1px;\n  border-style: solid;\n  position:absolute;\n  top:-15px;\n  right:20px;\n  border-radius: @borderRadiusSmall;\n  z-index:1;\n  padding: 3px;\n  \n  display: flex;\n  flex-direction: row;\n  align-items: stretch;\n  justify-content: center;\n  gap: @buttonSpacing;\n  flex-wrap: nowrap;\n}\n\n.section {\n\n  .tinyFlyoverMenu {\n    position:sticky;\n    float:right;\n    top:10px;\n  }\n}\n","\n#notificationToast{\n  position: absolute;\n  top: -40px;\n  left: 50%;\n  transform: translateX(-50%);\n  padding-left: 20px;\n  padding-right: 20px;\n  border-radius: 0 0 @borderRadiusBig @borderRadiusBig;\n  font-weight: var(--label-font-weight);\n  font-size: var(--label-font-size);\n  z-index:30000;\n  padding-top:20px;\n  font-size:16px;\n}\n",".tinyScrollbar{\n    &::-webkit-scrollbar {\n      width: 5px;\n    }\n    &::-webkit-scrollbar-track\n    {\n      background-color: rgb(var(--border-color));\n      border-radius: 99999px;\n    }\n    \n    &::-webkit-scrollbar-thumb {\n      background: #666;\n      border-radius: 99999px;\n    }\n}","#leftTabStrip {\n    height: 100%;\n    position:absolute;\n    width: @tabSize;\n    padding-top: @tabSize;\n    overflow:hidden;\n    display: flex;\n    flex-direction: column;\n\n    li {\n      float: none;\n      margin: 0;\n\n      a {\n        margin-right: 0;\n        border: 0;\n      }\n    }\n\n    >.active>a, \n    >.active>a:hover, \n    >.active>a:focus {\n      border:0;\n    }\n\n    .spacer {\n      flex-grow: 1;\n    }\n  \n    &:after {\n        transform: rotate(-90deg) translate(-90px, -70px);\n        font-size: 55px;\n        white-space: nowrap;\n        font-weight: 200;\n        letter-spacing: 3px;\n    }\n  \n    .leftTab {\n      border-radius: 0 !important;\n      width:@tabSize;\n      height:@tabSize;\n      padding: 4px;\n    }\n\n}\n","\n  .tab-content {\n    position: absolute;\n    left: @tabSize;\n    right: 0px;\n    top: @appbarHeight;\n    bottom:0;\n    .tab-pane {\n      display: none;\n      padding: 0;\n      height: 100%;\n      position: relative;\n\n      &.active {\n        display: flex !important;\n        flex-direction: column;\n        align-items: stretch;\n      }\n\n      .workspace {\n\n        #canvas_config {\n          position: relative;\n          width: 40px;\n          top: @toolbarHeight + 5;\n          left: unit(@leftPaneWidth+5, px);\n          cursor: pointer;\n          border-width: 1px;\n          border-style: solid;\n\n          &:hover {\n            border-width: 1px !important;\n            border-style: solid !important;\n          }\n        }\n\n\n        #canvas_config_items {\n          position: absolute;\n          top: @toolbarHeight+30;\n          left: unit(@leftPaneWidth+5, px);;\n          cursor: pointer;\n          padding: 10px;\n          white-space: nowrap;\n          min-width: 250px;\n        }\n\n      }\n    }\n  }\n","\n#editor{\n\n  .toolbar {\n    right: 0;\n    left: @leftPaneWidth;\n    position: absolute;\n  }\n\n  .workspace {\n    position: relative;\n    height:100%;\n  }\n}\n","#files {\n  overflow-y: scroll;\n  padding: 40px;\n\n  .filesTeaser {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    height:70px;\n\n    .title {\n      font-weight: var(--label-font-weight);\n      font-size: 3vw;\n      white-space: nowrap;\n    }\n    img, svg {\n        padding-right: 40px;\n        height: 100%;\n    }\n  }\n\n  .deleteIcon {\n    position: absolute;\n    right: 24px;\n    top: 18px;\n    cursor: pointer;\n    font-size: 25px;\n    padding: 4px;\n    border-radius: @borderRadiusSmall;\n  }\n\n  #material-tabs {\n    position: relative;\n    display: block;\n    padding: 0;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n\n    a {\n      position: relative;\n      display: inline-block;\n      text-decoration: none;\n      padding-bottom: 8px;\n      padding-left: 20px;\n      padding-right: 20px;\n      padding-top: 5px;\n      text-transform: uppercase;\n      font-size: va(--label-font-size);\n      font-weight: var(--label-font-weight);\n      text-align: center;\n      transition: all 0.3s ease;\n      outline: none;\n    }\n  }\n\n  .material-tab-content {\n    #userFiles,\n    #globalFiles {\n      min-height: 600px;\n      display: flex;\n      flex-direction: column;\n\n      .fileOperations {\n        border-bottom-width: 1px;\n        border-bottom-style: solid;\n        padding-bottom: @buttonSpacing;\n        padding-left: @contentToEdgePadding;\n        padding-right: @contentToEdgePadding;\n\n        border-top-width: 1px;\n        border-top-style: solid;\n        padding-top: @buttonSpacing;\n\n        display: flex;\n        flex-direction: row;\n        flex-wrap: nowrap;\n        justify-content: flex-start;\n        gap: @buttonSpacing;\n      }\n\n      .filePath{\n        padding-left: @contentToEdgePadding;\n        padding-right: @contentToEdgePadding;\n      }\n\n      .fileList{\n        padding-left: @contentToEdgePadding;\n        padding-right: @contentToEdgePadding;\n   \n        .list-group-item {\n          cursor: pointer;\n      \n          .thumb {\n            .thumbnail {\n              cursor: pointer;\n            }\n            .media-body {\n              padding-top: 14px;\n              padding-left: 20px;\n            }\n      \n            h4 {\n              font-size: 18px;\n              display: inline-block;\n            }\n      \n            .editIcon {\n              padding-left: 10px;\n              font-size: 14px;\n              display: none;\n            }\n      \n            &:hover {\n              h4 {\n                text-decoration: underline;\n              }\n      \n              .editIcon {\n                display: inline-block;\n              }\n            }\n          }\n        }      \n      }\n    }\n  }\n\n  header {\n    position: relative;\n  }\n\n  .sliding-bar {\n    position: absolute;\n    z-index: 1000;\n    display: block;\n    left: 0;\n    bottom: 0;\n    transition: all 0.3s ease;\n    border-width: 0 0 3px 0;\n    border-style: solid;\n  }\n}","#home {\n  overflow:scroll;\n\n  .authorPage {\n    padding: 40px !important;\n    font-size: calc(12px + 0.5vw);\n    font-weight: 400;\n\n\n    h1 {\n      font-weight: 200;\n      font-size: calc(16px + 2.5vw);\n      white-space: nowrap;\n      margin-bottom: 10px;\n    }\n\n    h2 {\n      font-size: calc(14px + 1.5vw);\n      font-weight: 200;\n    }\n\n  }\n  footer {\n    text-align: center;\n    margin-top: 100px;\n\n    a {\n      text-decoration: underline;\n    }\n  }\n}\n","\n#configMenuIcon{\n  font-size: 25px;\n  cursor:pointer;\n}\n\n\n#figureConfigDialog{\n  .figureAddLabel{\n    font-size:var(--label-font-size);\n    font-weight: var(--label-font-weight);\n    cursor:pointer;\n  }\n\n  textarea {\n    &.figureAttribute, &.lineNumbering {\n      font-family: lucida console, courier new, courier, monospace;\n      margin: 0;\n      padding: 10px 0;\n      height: 300px;\n      border-radius: 0;\n      resize: none;\n      font-size: 16px;\n      line-height: 1.2;\n      outline: none;\n      box-sizing: border-box;\n      &:focus-visible {\n        outline:none;\n      }\n    }\n\n    &.figureAttribute {\n      padding-left: calc(3.5rem + 5px);\n      width:100%;\n    }\n\n    &.lineNumbering {\n      border-color: transparent;\n      overflow-y: hidden;\n      text-align: right;\n      box-shadow: none;\n      position: absolute;\n      width: 3.5rem;\n    }\n  }\n}\n","\n.applicationSwitch {\n\n  .application-waffel {\n    cursor: pointer;\n    svg,\n    img{\n      width:60px;\n    }\n  }\n\n  .open {\n    .dropdown-menu{\n      z-index: 10000;\n      right:0;\n      left: initial;\n      padding: var(--menu-container-padding);\n\n      display: grid;\n      max-width:200px;\n      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));\n      grid-auto-rows: minmax(80px, auto);\n      grid-gap: 5px;\n    }\n  }\n  .dropdown-menu{\n    display: none;\n  }\n}\n",".image-button {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    font-weight: var(--label-font-weight);\n    font-size: var(--label-font-size);\n    height:100%;\n    border-radius: @borderRadiusSmall;\n    cursor: pointer;\n    img,\n    svg {\n      margin: 5px;\n      height: @toolbarHeight - 20;\n    }\n\n    div {\n      text-align: center;\n      font-size:0.8em;\n    }\n  }",".notifyjs-bootstrap-base {\n    font-size:12px;\n    border: none;\n    border-radius: @borderRadiusSmall;\n    padding-left: 5px;\n    padding-right: 5px;\n}\n\n.notifyjs-bootstrap-info {\n    background-image: none;\n}","body.light {\n    --label-bold-font-weight: 600;\n    --label-font-weight: 400;\n    --label-font-size: 14px;\n    \n    --border-color: 208, 215, 222;\n    \n    --tint-color:       218, 26, 95;\n    --tint-color-dark:  158, 27, 52;\n\n    /* colors of the left hand side navigation tabbar */\n    --lefttab-font-color: 255, 255, 255;\n    --lefttab-bg-color:  218, 26, 95;\n\n    /* colors for listitems */\n    --menu-container-padding: 4px;\n    --list-item-selected-bg-color: 240, 240, 240;\n    --list-item-hover-bg-color: 248, 248, 248;\n\n    /* form elements */\n    --input-bg-color: 255, 255, 255;\n    --input-color: 0, 0, 0;\n    --input-label-color: 0, 0, 0;\n    --text-color: 0, 0, 0;\n\n    --box-shadow-0: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n    --box-shadow-1: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\n    --box-shadow-2: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);\n    --box-shadow-3: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n\n    /* the backgrond-color for a workplace. A workplace is where a docment, content area,... is place.\n    */\n    --workplace-bg-color: 245, 248, 255;\n\n    /* background color of a pane, dialog, document or everything which is place inside a workplaces lke a file-selector */\n    --pane-bg-color: 255, 255, 255;\n\n\n    color: rgb(var(--text-color));\n\n    .electra-button{\n        background-color: rgb(var(--tint-color));\n        color: white;\n        &:hover{\n            filter: brightness(110%);\n        }\n    }\n\n    a {\n        color: rgb(var(--tint-color));\n    }\n\n    /* class used by draw2d if a element is drag&drop from a platette into a workspace */\n    .shadow {\n        filter: drop-shadow(0 1px 3px rgba(0,0,0,0.16));\n    }\n\n    .dropdown-menu {\n        border: 1px solid rgb(var(--border-color));\n        border-radius: @borderRadiusSmall;\n        background-color: rgb(var(--pane-bg-color));\n        li {\n            color: rgb(var(--input-color));\n            &:hover{\n                background-color: rgb(var(--list-item-hover-bg-color));\n            }\n        }\n    }\n\n    input[type=text]{\n        color: rgb(var(--input-color));        \n        border: 1px solid rgb(var(--border-color));\n        &:focus {\n            background-color: white;\n            border-bottom: 2px solid rgb(var(--tint-color));\n        }\n    }\n\n    .notifyjs-bootstrap-base {\n        box-shadow: var(--box-shadow-1);\n    }\n    \n    .notifyjs-bootstrap-info {\n        padding: var(--menu-container-padding);\n        color: rgb(var(--text-color));\n        background-color: rgb(var(--pane-bg-color));\n    }\n\n    .appbar {\n        background-color:rgb(32, 43, 59);\n        .title {\n            h1 {\n                color: white;\n            }\n            h2 {\n                color: white;\n            }\n        }\n        .slogan{\n            color: white;\n            letter-spacing: 0.2vw;\n        }\n        .icon {\n            path,\n            rect {\n                fill:  rgb(var(--tint-color));\n                stroke:  rgb(var(--tint-color));\n            }\n        }\n\n        .image-button {\n            border: 1px solid transparent;\n\n            &:hover{\n                border: 1px solid white;\n            }\n            img,\n            svg {\n                color: white;\n                border-color:transparent;\n    \n                circle[stroke],\n                polyline[stroke],\n                path[stroke],\n                g[stroke] {\n                    stroke: white !important;\n                }\n    \n                rect[fill],\n                circle[fill] {\n                    fill: white !important;\n                }\n            }\n        }\n    }\n\n    .spinner:before {\n        border-color:  rgb(var(--border-color));\n        border-top-color: rgb(var(--tint-color));\n        background-color: #fef9f9;\n    }\n\n    .confirm-dialog-btn-confirm {\n        background-color: rgb(var(--tint-color));\n    }\n\n    .context-menu-list {\n        border-color: rgb(var(--border-color));\n        background: rgb(var(--pane-bg-color));\n        border-left-color: rgb(var(--tint-color));\n        box-shadow:  var(--box-shadow-1);\n\n        .context-menu-separator {\n            border-bottom: 1px solid rgb(var(--border-color));\n        }\n\n        .context-menu-item {\n            &.hover {\n                background-color: rgb(var(--tint-color));\n                color: white;\n            }\n\n            &.disabled {\n                color: rgba(var(--text-color), 0.5);\n\n                &.hover {\n                    background-color: #EEE;\n                }\n            }\n\n            .context-menu-submenu:after {\n                color: #666;\n            }\n        }\n\n    }\n\n    .gutter {\n        background-color: #eee;\n        background-repeat: no-repeat;\n        background-position: center;\n        &.gutter-vertical {\n            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');\n        }\n\n        &.gutter-horizontal {\n            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');\n        }\n    }\n\n    .tinyFlyoverMenu {\n        box-shadow:  var(--box-shadow-1);\n        border-color: rgb(var(--border-color));\n        background-color: rgb(var(--pane-bg-color));\n\n        div {\n            border-color: transparent;\n            &:hover {\n                border-color: rgb(var(--border-color));\n            }\n        }\n    }\n\n\n    #leftTabStrip {\n        background-color: rgb(var(--lefttab-bg-color)) ;\n\n        &:after {\n            color: rgb(var(--lefttab-font-color));\n        }\n\n        >li,\n        >div {\n            &.active {\n                a{\n                    &:hover {\n                        background-color: white;\n                    }\n\n                    svg {\n                        path[stroke],\n                        rect[stroke],\n                        g[stroke],\n                        line[stroke],\n                        circle[stroke],\n                        polyline[stroke] {\n                            stroke: rgb(var(--lefttab-bg-color))  !important;\n                        }\n\n                        circle[fill],\n                        rect[fill] {\n                            fill: rgb(var(--lefttab-bg-color))  !important;\n                        }\n                    }\n                }\n            }\n\n            a {\n                &:hover {\n                    background-color: rgba(0, 0, 0, 0.1);\n                }\n\n                svg {\n\n                    path[stroke],\n                    rect[stroke],\n                    g[stroke],\n                    line[stroke],\n                    circle[stroke],\n                    polyline[stroke] {\n                        stroke:rgb(var(--lefttab-font-color)) !important;\n                    }\n\n                    circle[fill],\n                    rect[fill] {\n                        fill: rgb(var(--lefttab-font-color))!important;\n                    }\n                }\n            }\n        }\n    }\n\n    #home {\n        .authorPage {\n            h1 {\n                color:rgb(var(--tint-color));\n            }\n\n            h2 {\n                color: rgb(var(--tint-color));\n            }\n        }\n\n        footer {\n            color:rgb(var(--tint-color));\n\n            a {\n                color: rgb(var(--tint-color));\n            }\n        }\n    }\n\n    #canvas_zoom {\n        background-color: rgb(var(--pane-bg-color));\n        border: 1px solid rgb(var(--border-color));\n        box-shadow: var(--box-shadow-0);\n        button {\n            background-color: transparent;\n            border-color: transparent;\n            transition: all 0.5s;\n\n            &:hover {\n                border-color:rgb(var(--tint-color));\n            }\n        }\n    }\n\n    #configMenuIcon {\n        &:hover {\n            opacity: 1;\n            color: rgb(var(--tint-color));\n        }\n    }\n\n    .modal-backdrop.in {\n        opacity: 0.7;\n        background-color: black;\n    }\n\n    .genericDialog {\n        .modal-content {\n            box-shadow:  var(--box-shadow-3);\n            background-color:rgb(var(--pane-bg-color));\n\n            .modal-header {\n                h4{\n                    border-bottom: 1px solid rgb(var(--tint-color));\n                    color: rgb(var(--tint-color));\n                }\n            }\n\n            .modal-body {\n                .list-group {\n\n                    *[data-draw2d=\"true\"] {\n                        color: rgb(var(--tint-color));\n                    }\n\n                    .list-group-item {\n                        background-color: transparent;\n                    }\n\n                    *[data-draw2d=\"false\"][data-type=\"file\"] {\n                        color: gray;\n                    }\n                }\n            }\n\n            .modal-footer {\n                background-color: transparent;\n            }\n        }\n    }\n\n    .tab-pane {\n        box-shadow: -6px 0 20px -4px rgba(31, 73, 125, 0.3);\n    }\n\n    #files {\n        background-color: rgb(var(--workplace-bg-color));\n        .teaser {\n            .title {\n                color: rgb(var(--tint-color));\n            }\n        }\n\n        .list-group-item {\n            cursor: pointer;\n            .thumb {\n                h4 {\n                    color:rgb(var(--tint-color));\n                }\n            }\n        }\n        .filesFinder {\n            background-color: rgb(var(--pane-bg-color));\n            border: 1px solid rgb(var(--border-color));\n            border-radius: @borderRadiusBig;\n            box-shadow: var(--box-shadow-1);\n            header{\n                #material-tabs {\n                    border: none;\n                    a {\n                        color: rgb(var(--input-label-color));\n                        &.active{\n                            color:rgb(var(--tint-color));\n                        }\n                        &:hover {\n                            color:rgb(var(--tint-color));\n                        }\n                    }\n                }\n            }\n\n            .material-tab-content {\n                .fileOperations{\n                    border-color: rgb(var(--border-color));\n                }\n            }\n\n            .sliding-bar {\n                background:transparent;\n                transition: all 0.3s ease;\n                border-color:rgb(var(--tint-color));\n            }\n        }\n    }\n\n    #figureConfigDialog{\n        textarea {\n            &.figureAttribute {\n                background-color:#272822;\n                border-color:#272822;\n                color:#ffffff;\n            }\n            &.lineNumbering {\n                background-color:#3E3D32;\n                border-color:#3E3D32;\n                color:#928869;\n            }\n        }\n    }\n  \n    #notificationToast {\n        background-color:rgb(var(--tint-color));\n        color: white;\n    }\n\n    .tree {\n        .tree-leaf {\n            \n\n            .tree-leaf-content {\n\n                .tree-expando {\n                    background-color: transparent;\n                    border: 1px solid rgb(var(--input-label-color));\n                    color: rgb(var(--input-label-color));\n\n                }\n                &:hover {\n                    background-color: rgb(var(--list-item-hover-bg-color));\n                }\n\n                &.selected {\n                    background-color: rgb(var(--list-item-selected-bg-color));\n                    .tree-leaf-text {\n                        color: rgb(var(--tint-color));\n                    }\n                    .tree-expando {\n                        color: rgb(var(--tint-color));\n                        border-color: rgb(var(--tint-color));\n                    }\n                }\n            }\n        }\n    }\n\n    /** don't place \".section\" in the sub-tree of \".sections\" . The \".section\" is \n        used in other page elements like pdf, dialog, single page, ...\n    **/ \n    .section {\n        border-color: transparent;\n        &.error {\n            border-color:rgb(var(--tint-color)) ;\n        }\n        .sectionContent {\n            &[data-type='flashcard'],\n            &[data-type='wysiwyg'],\n            &[data-type='markdown'],\n            &[data-type='cloze'] {\n                h1 ,\n                h2 ,\n                h3 {\n                    color: rgb(var(--tint-color)) ;\n                }\n                h1{\n                    border-bottom-color: rgb(var(--tint-color)) ;\n                }\n                .cloze {\n                    background-color: lightgray;\n                    padding-left: 15px;\n                    padding-right: 15px;\n                    border-radius: @borderRadiusSmall;\n                    border-bottom: 1px dotted gray;\n                }\n                a {\n                    color: inherit;\n                    text-decoration: none;\n                    background:\n                    linear-gradient(\n                        to right,\n                        rgb(var(--toolbar-bg-color)),\n                        rgb(var(--toolbar-bg-color))\n                    ),\n                    linear-gradient(\n                        to right,\n                        rgb(var(--tint-color)),\n                        rgba(255, 0, 180, 1),\n                        rgba(0, 100, 200, 1)\n                    );\n                    background-size: 100% 1px, 0 1px;\n                    background-position: 100% 100%, 0 100%;\n                    background-repeat: no-repeat;\n                    transition: background-size 200ms;\n                }    \n                a:hover {\n                    background-size: 0 1px, 100% 1px;\n                }\n            }\n\n            /** learning content gets a special annotation on the left **/\n            &[data-type=\"flashcard\"] {\n                .sectionMenuFlip {\n                    background-color: rgba(var(--tint-color), 0.2) ;\n                    border: 1px solid white;\n                }\n            }\n\n            .placeholderContainer{\n                border-color:rgb(var(--border-color));\n                .placeholderText{\n                h1{\n                    color: rgb(var(--text-color));\n                }\n                h2{\n                    color: rgb(var(--text-color));\n                }\n                }\n            }\n        }\n    }\n    .toolbar {\n        background-color: #B2E2F2;\n    }\n\n    svg.inlined-svg {\n        color: rgb(var(--text-color));\n        border-color:transparent;\n\n        circle[stroke],\n        rect[stroke],\n        line[stroke],\n        polygon[stroke],\n        ellipse[stroke],\n        polyline[stroke],\n        path[stroke],\n        g[stroke] {\n            stroke: rgb(var(--text-color))!important;\n        }\n\n        polygon[fill],\n        text[fill],\n        rect[fill],\n        circle[fill] {\n            fill: rgb(var(--text-color)) !important;\n        }\n    }\n\n    .image-button {\n\n        div {\n            &.highlight {\n                animation: highlight 3s infinite;\n            }\n        }\n\n        &.disabled {\n            opacity: 0.2;\n        }\n\n        &:not(.disabled) {\n            &:hover{\n                    box-shadow: var(--box-shadow-0);\n            }\n        }\n    }\n    @keyframes highlight {\n        0% {\n            color:rgb(var(--tint-color));\n            font-weight: var(--label-bold-font-weight);\n        }\n\n        50% {\n            color:rgba(var(--text-color), 0.4);\n            font-weight: var(--label-font-weight);\n        }\n\n        100% {\n            color:rgb(var(--tint-color));\n            font-weight: var(--label-bold-font-weight);\n        }\n    }\n\n}","/* https://css-tricks.com/snippets/css/a-guide-to-flexbox/ */\n\n.layout {\n    position: relative;\n    display: flex; \n    flex-direction: column;\n    flex-wrap: nowrap;\n    justify-content:space-between;\n\n    z-index: 20;\n    height: 100vh;\n    background-color: rgb(245, 248, 255);\n    color: #333;\n    border-bottom: 2px solid rgb(var(--tint-color));\n    scroll-snap-align: start;\n\n\n    .teaserContainer {\n        flex-grow: 4;\n        display: flex; \n        flex-direction: column;\n        flex-wrap: nowrap;\n        justify-content:start;\n        align-items: center;\n        align-content: center;\n        gap: 50px;\n        .teaser {\n            display: flex; \n            flex-direction: row;\n            justify-content:space-between;\n            align-items: start;\n            align-content: center;\n\n            .slogan {\n                max-width: 80%;\n                h1{\n                    font-weight: 500;\n                    font-size: calc(20px + 1vw);\n                    line-height: 1.2;        \n                    color:rgb(var(--tint-color));\n                }\n                .textblock{\n                    background-color: #ffffffe0;\n                    padding: 20px;\n                    border-radius: @borderRadiusBig;\n                    box-shadow:  var(--box-shadow-1);\n                }\n                font-weight: 300;\n                line-height: 1.2;\n                font-size: calc(8px + 1vw);\n                color: black;\n                padding-left:60px;\n            }\n        }\n        .launchArea{\n            display: flex;\n            text-align: center;\n            justify-content: center;\n            flex-direction: row;\n            max-height:20vh;\n            max-width:100%;\n            \n            .imageContainer {\n                flex: 1;\n                flex-flow: column wrap;\n                align-items: center;\n            \n                display: flex; \n                flex-direction: column;\n                flex-wrap: nowrap;\n                align-items: center;\n             \n                img{\n                    max-height:100%;\n                }\n            }\n        }\n          \n    }\n\n    .avatarContainer {\n        flex-grow: 0;\n\n        display: flex; \n        flex-direction: row;\n        flex-wrap: nowrap;\n        justify-content:space-between;\n        align-items: flex-end;\n        .avatar {\n            text-align: center;\n            font-weight: 400;\n            font-size: 16px;\n            display: flex;\n            flex-direction: column;\n            flex-wrap: nowrap;\n            align-content: flex-end;\n            justify-content: flex-end;\n            align-items: center;\n            height:15vh;\n            max-height:160px;\n            img {\n                height: 100%;\n            }\n        }\n\n        .arrow {\n            animation: mover 2s infinite alternate;\n            font-size:20px;\n            i {\n                height: 20px;\n                display: inline-block;\n                border-left: 4px solid #000;\n                border-radius: @borderRadiusSmall;\n                &.left {\n                    transform: rotate(-45deg);\n                }\n    \n                &.right {\n                    transform: rotate(45deg) translate(3px, -2px);\n                }\n            }\n        }\n    }\n\n    @keyframes mover {\n        0% { transform: translateY(0); }\n        100% { transform: translateY(-10px); }\n    }\n}",".intro {\n    background-color: white;\n    background-image: none;\n    text-align: left;\n    position: relative;\n    z-index: 20;\n    height: 100vh;\n    padding-bottom: 20px;\n    color: #333;\n\n    .header {\n        font-size: calc(19px + 1vw);\n        line-height: 1.2;\n        top: 2vw;\n        padding-left: 50px;\n        color:rgb(var(--tint-color));\n        position: absolute;\n        padding-top: 30px;\n        background-color: rgba(255, 255, 255, 0.8);\n        div {\n            font-size: calc(6px + 1vw);\n            font-weight: 200;\n            color: black;\n            padding-top: 30px;\n        }\n    }\n\n    img {\n        width: 50%;\n        vertical-align: middle;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        margin: auto;\n        left: 0;\n        right: 0;\n    }\n\n    .launch_button {\n        position: absolute;\n        right: 50px;\n        bottom: 100px;\n    }\n}",".slidedeck {\n    position: absolute;\n    height: 400vh;\n    width: 100%;\n    background-image: linear-gradient(135deg, #e13f4d, #d34657);\n\n    .pink_bg {\n        position: absolute;\n        top: 100vh;\n        height: 300vh;\n        width: 100%;\n        background-image: linear-gradient(153deg, #fa7e93, #f5d8d8);\n    }\n\n    .orange_bg {\n        position: absolute;\n        top: 100vh;\n        height: 200vh;\n        width: 100%;\n        background-image: linear-gradient(135deg, #f8ac5c, #fcbe78);\n    }\n\n    .blue_bg {\n        position: absolute;\n        top: 100vh;\n        height: 100vh;\n        width: 100%;\n        background-image: linear-gradient(135deg, #242533, #2a3079);\n    }\n\n\n    .section_header {\n        color: white;\n        font-size: calc(16px + 2vw);\n        text-align: center;\n        font-weight: 100;\n        padding-top: 30px;\n        position: sticky;\n        top: 20px;\n    }\n\n    .card {\n        position: sticky;\n        z-index: 1000;\n        width: 25%;\n        height: 50vh;\n        border-radius: @borderRadiusBig;\n        background-color: #fff;\n        box-shadow: 0 10px 50px 0 rgba(0, 0, 0, .25);\n        top: 0;\n\n        .text {\n            position: absolute;\n            top: -40px;\n            text-align: center;\n            color: white;\n            font-size: 24px;\n            font-weight: 100;\n            width: 100%;\n        }\n        .media {\n            position: absolute;\n            top: 10px;\n            left: 50%;\n            transform: translateX(-50%);\n        }\n        .content {\n            position: absolute;\n            top: 80px;\n            padding: 10px;\n\n            .header {\n                color: rgb(var(--tint-color));\n                text-align: center;\n                margin-bottom: 10px;\n            }\n        }\n\n        .launch_button {\n            position: absolute;\n            left: 50%;\n            bottom: 10px;\n            transform: translateX(-50%);\n        }\n\n        &.left {\n            left: 5%;\n            transform: translateY(50%);\n        }\n\n        &.center {\n            left: 50%;\n            transform: translateY(50%) translateX(-50%);\n        }\n\n        &.right {\n            left: 70%;\n            transform: translateY(50%);\n        }\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


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

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/i18next-browser-languagedetector/dist/cjs/i18nextBrowserLanguageDetector.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/i18next-browser-languagedetector/dist/cjs/i18nextBrowserLanguageDetector.js ***!
  \**************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _classCallCheck = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
var _createClass = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);

var arr = [];
var each = arr.forEach;
var slice = arr.slice;
function defaults(obj) {
  each.call(slice.call(arguments, 1), function (source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

// eslint-disable-next-line no-control-regex
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
var serializeCookie = function serializeCookie(name, val, options) {
  var opt = options || {};
  opt.path = opt.path || '/';
  var value = encodeURIComponent(val);
  var str = "".concat(name, "=").concat(value);
  if (opt.maxAge > 0) {
    var maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += "; Max-Age=".concat(Math.floor(maxAge));
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }
    str += "; Domain=".concat(opt.domain);
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }
    str += "; Path=".concat(opt.path);
  }
  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }
    str += "; Expires=".concat(opt.expires.toUTCString());
  }
  if (opt.httpOnly) str += '; HttpOnly';
  if (opt.secure) str += '; Secure';
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }
  return str;
};
var cookie = {
  create: function create(name, value, minutes, domain) {
    var cookieOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
      path: '/',
      sameSite: 'strict'
    };
    if (minutes) {
      cookieOptions.expires = new Date();
      cookieOptions.expires.setTime(cookieOptions.expires.getTime() + minutes * 60 * 1000);
    }
    if (domain) cookieOptions.domain = domain;
    document.cookie = serializeCookie(name, encodeURIComponent(value), cookieOptions);
  },
  read: function read(name) {
    var nameEQ = "".concat(name, "=");
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  remove: function remove(name) {
    this.create(name, '', -1);
  }
};
var cookie$1 = {
  name: 'cookie',
  lookup: function lookup(options) {
    var found;
    if (options.lookupCookie && typeof document !== 'undefined') {
      var c = cookie.read(options.lookupCookie);
      if (c) found = c;
    }
    return found;
  },
  cacheUserLanguage: function cacheUserLanguage(lng, options) {
    if (options.lookupCookie && typeof document !== 'undefined') {
      cookie.create(options.lookupCookie, lng, options.cookieMinutes, options.cookieDomain, options.cookieOptions);
    }
  }
};

var querystring = {
  name: 'querystring',
  lookup: function lookup(options) {
    var found;
    if (typeof window !== 'undefined') {
      var search = window.location.search;
      if (!window.location.search && window.location.hash && window.location.hash.indexOf('?') > -1) {
        search = window.location.hash.substring(window.location.hash.indexOf('?'));
      }
      var query = search.substring(1);
      var params = query.split('&');
      for (var i = 0; i < params.length; i++) {
        var pos = params[i].indexOf('=');
        if (pos > 0) {
          var key = params[i].substring(0, pos);
          if (key === options.lookupQuerystring) {
            found = params[i].substring(pos + 1);
          }
        }
      }
    }
    return found;
  }
};

var hasLocalStorageSupport = null;
var localStorageAvailable = function localStorageAvailable() {
  if (hasLocalStorageSupport !== null) return hasLocalStorageSupport;
  try {
    hasLocalStorageSupport = window !== 'undefined' && window.localStorage !== null;
    var testKey = 'i18next.translate.boo';
    window.localStorage.setItem(testKey, 'foo');
    window.localStorage.removeItem(testKey);
  } catch (e) {
    hasLocalStorageSupport = false;
  }
  return hasLocalStorageSupport;
};
var localStorage = {
  name: 'localStorage',
  lookup: function lookup(options) {
    var found;
    if (options.lookupLocalStorage && localStorageAvailable()) {
      var lng = window.localStorage.getItem(options.lookupLocalStorage);
      if (lng) found = lng;
    }
    return found;
  },
  cacheUserLanguage: function cacheUserLanguage(lng, options) {
    if (options.lookupLocalStorage && localStorageAvailable()) {
      window.localStorage.setItem(options.lookupLocalStorage, lng);
    }
  }
};

var hasSessionStorageSupport = null;
var sessionStorageAvailable = function sessionStorageAvailable() {
  if (hasSessionStorageSupport !== null) return hasSessionStorageSupport;
  try {
    hasSessionStorageSupport = window !== 'undefined' && window.sessionStorage !== null;
    var testKey = 'i18next.translate.boo';
    window.sessionStorage.setItem(testKey, 'foo');
    window.sessionStorage.removeItem(testKey);
  } catch (e) {
    hasSessionStorageSupport = false;
  }
  return hasSessionStorageSupport;
};
var sessionStorage = {
  name: 'sessionStorage',
  lookup: function lookup(options) {
    var found;
    if (options.lookupSessionStorage && sessionStorageAvailable()) {
      var lng = window.sessionStorage.getItem(options.lookupSessionStorage);
      if (lng) found = lng;
    }
    return found;
  },
  cacheUserLanguage: function cacheUserLanguage(lng, options) {
    if (options.lookupSessionStorage && sessionStorageAvailable()) {
      window.sessionStorage.setItem(options.lookupSessionStorage, lng);
    }
  }
};

var navigator$1 = {
  name: 'navigator',
  lookup: function lookup(options) {
    var found = [];
    if (typeof navigator !== 'undefined') {
      if (navigator.languages) {
        // chrome only; not an array, so can't use .push.apply instead of iterating
        for (var i = 0; i < navigator.languages.length; i++) {
          found.push(navigator.languages[i]);
        }
      }
      if (navigator.userLanguage) {
        found.push(navigator.userLanguage);
      }
      if (navigator.language) {
        found.push(navigator.language);
      }
    }
    return found.length > 0 ? found : undefined;
  }
};

var htmlTag = {
  name: 'htmlTag',
  lookup: function lookup(options) {
    var found;
    var htmlTag = options.htmlTag || (typeof document !== 'undefined' ? document.documentElement : null);
    if (htmlTag && typeof htmlTag.getAttribute === 'function') {
      found = htmlTag.getAttribute('lang');
    }
    return found;
  }
};

var path = {
  name: 'path',
  lookup: function lookup(options) {
    var found;
    if (typeof window !== 'undefined') {
      var language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
      if (language instanceof Array) {
        if (typeof options.lookupFromPathIndex === 'number') {
          if (typeof language[options.lookupFromPathIndex] !== 'string') {
            return undefined;
          }
          found = language[options.lookupFromPathIndex].replace('/', '');
        } else {
          found = language[0].replace('/', '');
        }
      }
    }
    return found;
  }
};

var subdomain = {
  name: 'subdomain',
  lookup: function lookup(options) {
    // If given get the subdomain index else 1
    var lookupFromSubdomainIndex = typeof options.lookupFromSubdomainIndex === 'number' ? options.lookupFromSubdomainIndex + 1 : 1;
    // get all matches if window.location. is existing
    // first item of match is the match itself and the second is the first group macht which sould be the first subdomain match
    // is the hostname no public domain get the or option of localhost
    var language = typeof window !== 'undefined' && window.location && window.location.hostname && window.location.hostname.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);

    // if there is no match (null) return undefined
    if (!language) return undefined;
    // return the given group match
    return language[lookupFromSubdomainIndex];
  }
};

function getDefaults() {
  return {
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',
    // cache user language
    caches: ['localStorage'],
    excludeCacheFor: ['cimode']
    // cookieMinutes: 10,
    // cookieDomain: 'myDomain'
  };
}
var Browser = /*#__PURE__*/function () {
  function Browser(services) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck__default["default"](this, Browser);
    this.type = 'languageDetector';
    this.detectors = {};
    this.init(services, options);
  }
  _createClass__default["default"](Browser, [{
    key: "init",
    value: function init(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var i18nOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.services = services;
      this.options = defaults(options, this.options || {}, getDefaults());

      // backwards compatibility
      if (this.options.lookupFromUrlIndex) this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex;
      this.i18nOptions = i18nOptions;
      this.addDetector(cookie$1);
      this.addDetector(querystring);
      this.addDetector(localStorage);
      this.addDetector(sessionStorage);
      this.addDetector(navigator$1);
      this.addDetector(htmlTag);
      this.addDetector(path);
      this.addDetector(subdomain);
    }
  }, {
    key: "addDetector",
    value: function addDetector(detector) {
      this.detectors[detector.name] = detector;
    }
  }, {
    key: "detect",
    value: function detect(detectionOrder) {
      var _this = this;
      if (!detectionOrder) detectionOrder = this.options.order;
      var detected = [];
      detectionOrder.forEach(function (detectorName) {
        if (_this.detectors[detectorName]) {
          var lookup = _this.detectors[detectorName].lookup(_this.options);
          if (lookup && typeof lookup === 'string') lookup = [lookup];
          if (lookup) detected = detected.concat(lookup);
        }
      });
      if (this.services.languageUtils.getBestMatchFromCodes) return detected; // new i18next v19.5.0
      return detected.length > 0 ? detected[0] : null; // a little backward compatibility
    }
  }, {
    key: "cacheUserLanguage",
    value: function cacheUserLanguage(lng, caches) {
      var _this2 = this;
      if (!caches) caches = this.options.caches;
      if (!caches) return;
      if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) return;
      caches.forEach(function (cacheName) {
        if (_this2.detectors[cacheName]) _this2.detectors[cacheName].cacheUserLanguage(lng, _this2.options);
      });
    }
  }]);
  return Browser;
}();
Browser.type = 'languageDetector';

module.exports = Browser;


/***/ }),

/***/ "./node_modules/i18next/dist/cjs/i18next.js":
/*!**************************************************!*\
  !*** ./node_modules/i18next/dist/cjs/i18next.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
var _classCallCheck = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
var _createClass = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
var _assertThisInitialized = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
var _inherits = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
var _possibleConstructorReturn = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
var _getPrototypeOf = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
var _defineProperty = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
var _toArray = __webpack_require__(/*! @babel/runtime/helpers/toArray */ "./node_modules/@babel/runtime/helpers/toArray.js");

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _toArray__default = /*#__PURE__*/_interopDefaultLegacy(_toArray);

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var consoleLogger = {
  type: 'logger',
  log: function log(args) {
    this.output('log', args);
  },
  warn: function warn(args) {
    this.output('warn', args);
  },
  error: function error(args) {
    this.output('error', args);
  },
  output: function output(type, args) {
    if (console && console[type]) console[type].apply(console, args);
  }
};
var Logger = function () {
  function Logger(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck__default["default"](this, Logger);
    this.init(concreteLogger, options);
  }
  _createClass__default["default"](Logger, [{
    key: "init",
    value: function init(concreteLogger) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.prefix = options.prefix || 'i18next:';
      this.logger = concreteLogger || consoleLogger;
      this.options = options;
      this.debug = options.debug;
    }
  }, {
    key: "setDebug",
    value: function setDebug(bool) {
      this.debug = bool;
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.forward(args, 'log', '', true);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return this.forward(args, 'warn', '', true);
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return this.forward(args, 'error', '');
    }
  }, {
    key: "deprecate",
    value: function deprecate() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
    }
  }, {
    key: "forward",
    value: function forward(args, lvl, prefix, debugOnly) {
      if (debugOnly && !this.debug) return null;
      if (typeof args[0] === 'string') args[0] = "".concat(prefix).concat(this.prefix, " ").concat(args[0]);
      return this.logger[lvl](args);
    }
  }, {
    key: "create",
    value: function create(moduleName) {
      return new Logger(this.logger, _objectSpread$6(_objectSpread$6({}, {
        prefix: "".concat(this.prefix, ":").concat(moduleName, ":")
      }), this.options));
    }
  }, {
    key: "clone",
    value: function clone(options) {
      options = options || this.options;
      options.prefix = options.prefix || this.prefix;
      return new Logger(this.logger, options);
    }
  }]);
  return Logger;
}();
var baseLogger = new Logger();

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck__default["default"](this, EventEmitter);
    this.observers = {};
  }
  _createClass__default["default"](EventEmitter, [{
    key: "on",
    value: function on(events, listener) {
      var _this = this;
      events.split(' ').forEach(function (event) {
        _this.observers[event] = _this.observers[event] || [];
        _this.observers[event].push(listener);
      });
      return this;
    }
  }, {
    key: "off",
    value: function off(event, listener) {
      if (!this.observers[event]) return;
      if (!listener) {
        delete this.observers[event];
        return;
      }
      this.observers[event] = this.observers[event].filter(function (l) {
        return l !== listener;
      });
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      if (this.observers[event]) {
        var cloned = [].concat(this.observers[event]);
        cloned.forEach(function (observer) {
          observer.apply(void 0, args);
        });
      }
      if (this.observers['*']) {
        var _cloned = [].concat(this.observers['*']);
        _cloned.forEach(function (observer) {
          observer.apply(observer, [event].concat(args));
        });
      }
    }
  }]);
  return EventEmitter;
}();

function defer() {
  var res;
  var rej;
  var promise = new Promise(function (resolve, reject) {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
}
function makeString(object) {
  if (object == null) return '';
  return '' + object;
}
function copy(a, s, t) {
  a.forEach(function (m) {
    if (s[m]) t[m] = s[m];
  });
}
function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
  }
  function canNotTraverseDeeper() {
    return !object || typeof object === 'string';
  }
  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
  while (stack.length > 1) {
    if (canNotTraverseDeeper()) return {};
    var key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      object = object[key];
    } else {
      object = {};
    }
  }
  if (canNotTraverseDeeper()) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}
function setPath(object, path, newValue) {
  var _getLastOfPath = getLastOfPath(object, path, Object),
    obj = _getLastOfPath.obj,
    k = _getLastOfPath.k;
  obj[k] = newValue;
}
function pushPath(object, path, newValue, concat) {
  var _getLastOfPath2 = getLastOfPath(object, path, Object),
    obj = _getLastOfPath2.obj,
    k = _getLastOfPath2.k;
  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}
function getPath(object, path) {
  var _getLastOfPath3 = getLastOfPath(object, path),
    obj = _getLastOfPath3.obj,
    k = _getLastOfPath3.k;
  if (!obj) return undefined;
  return obj[k];
}
function getPathWithDefaults(data, defaultData, key) {
  var value = getPath(data, key);
  if (value !== undefined) {
    return value;
  }
  return getPath(defaultData, key);
}
function deepExtend(target, source, overwrite) {
  for (var prop in source) {
    if (prop !== '__proto__' && prop !== 'constructor') {
      if (prop in target) {
        if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
          if (overwrite) target[prop] = source[prop];
        } else {
          deepExtend(target[prop], source[prop], overwrite);
        }
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}
function regexEscape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
var _entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};
function escape(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'\/]/g, function (s) {
      return _entityMap[s];
    });
  }
  return data;
}
var isIE10 = typeof window !== 'undefined' && window.navigator && typeof window.navigator.userAgentData === 'undefined' && window.navigator.userAgent && window.navigator.userAgent.indexOf('MSIE') > -1;
var chars = [' ', ',', '?', '!', ';'];
function looksLikeObjectPath(key, nsSeparator, keySeparator) {
  nsSeparator = nsSeparator || '';
  keySeparator = keySeparator || '';
  var possibleChars = chars.filter(function (c) {
    return nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0;
  });
  if (possibleChars.length === 0) return true;
  var r = new RegExp("(".concat(possibleChars.map(function (c) {
    return c === '?' ? '\\?' : c;
  }).join('|'), ")"));
  var matched = !r.test(key);
  if (!matched) {
    var ki = key.indexOf(keySeparator);
    if (ki > 0 && !r.test(key.substring(0, ki))) {
      matched = true;
    }
  }
  return matched;
}

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }
function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function deepFind(obj, path) {
  var keySeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  if (!obj) return undefined;
  if (obj[path]) return obj[path];
  var paths = path.split(keySeparator);
  var current = obj;
  for (var i = 0; i < paths.length; ++i) {
    if (!current) return undefined;
    if (typeof current[paths[i]] === 'string' && i + 1 < paths.length) {
      return undefined;
    }
    if (current[paths[i]] === undefined) {
      var j = 2;
      var p = paths.slice(i, i + j).join(keySeparator);
      var mix = current[p];
      while (mix === undefined && paths.length > i + j) {
        j++;
        p = paths.slice(i, i + j).join(keySeparator);
        mix = current[p];
      }
      if (mix === undefined) return undefined;
      if (mix === null) return null;
      if (path.endsWith(p)) {
        if (typeof mix === 'string') return mix;
        if (p && typeof mix[p] === 'string') return mix[p];
      }
      var joinedPath = paths.slice(i + j).join(keySeparator);
      if (joinedPath) return deepFind(mix, joinedPath, keySeparator);
      return undefined;
    }
    current = current[paths[i]];
  }
  return current;
}
var ResourceStore = function (_EventEmitter) {
  _inherits__default["default"](ResourceStore, _EventEmitter);
  var _super = _createSuper$3(ResourceStore);
  function ResourceStore(data) {
    var _this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      ns: ['translation'],
      defaultNS: 'translation'
    };
    _classCallCheck__default["default"](this, ResourceStore);
    _this = _super.call(this);
    if (isIE10) {
      EventEmitter.call(_assertThisInitialized__default["default"](_this));
    }
    _this.data = data || {};
    _this.options = options;
    if (_this.options.keySeparator === undefined) {
      _this.options.keySeparator = '.';
    }
    if (_this.options.ignoreJSONStructure === undefined) {
      _this.options.ignoreJSONStructure = true;
    }
    return _this;
  }
  _createClass__default["default"](ResourceStore, [{
    key: "addNamespaces",
    value: function addNamespaces(ns) {
      if (this.options.ns.indexOf(ns) < 0) {
        this.options.ns.push(ns);
      }
    }
  }, {
    key: "removeNamespaces",
    value: function removeNamespaces(ns) {
      var index = this.options.ns.indexOf(ns);
      if (index > -1) {
        this.options.ns.splice(index, 1);
      }
    }
  }, {
    key: "getResource",
    value: function getResource(lng, ns, key) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var ignoreJSONStructure = options.ignoreJSONStructure !== undefined ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
      var path = [lng, ns];
      if (key && typeof key !== 'string') path = path.concat(key);
      if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);
      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
      }
      var result = getPath(this.data, path);
      if (result || !ignoreJSONStructure || typeof key !== 'string') return result;
      return deepFind(this.data && this.data[lng] && this.data[lng][ns], key, keySeparator);
    }
  }, {
    key: "addResource",
    value: function addResource(lng, ns, key, value) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
        silent: false
      };
      var keySeparator = this.options.keySeparator;
      if (keySeparator === undefined) keySeparator = '.';
      var path = [lng, ns];
      if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        value = ns;
        ns = path[1];
      }
      this.addNamespaces(ns);
      setPath(this.data, path, value);
      if (!options.silent) this.emit('added', lng, ns, key, value);
    }
  }, {
    key: "addResources",
    value: function addResources(lng, ns, resources) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        silent: false
      };
      for (var m in resources) {
        if (typeof resources[m] === 'string' || Object.prototype.toString.apply(resources[m]) === '[object Array]') this.addResource(lng, ns, m, resources[m], {
          silent: true
        });
      }
      if (!options.silent) this.emit('added', lng, ns, resources);
    }
  }, {
    key: "addResourceBundle",
    value: function addResourceBundle(lng, ns, resources, deep, overwrite) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
        silent: false
      };
      var path = [lng, ns];
      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        deep = resources;
        resources = ns;
        ns = path[1];
      }
      this.addNamespaces(ns);
      var pack = getPath(this.data, path) || {};
      if (deep) {
        deepExtend(pack, resources, overwrite);
      } else {
        pack = _objectSpread$5(_objectSpread$5({}, pack), resources);
      }
      setPath(this.data, path, pack);
      if (!options.silent) this.emit('added', lng, ns, resources);
    }
  }, {
    key: "removeResourceBundle",
    value: function removeResourceBundle(lng, ns) {
      if (this.hasResourceBundle(lng, ns)) {
        delete this.data[lng][ns];
      }
      this.removeNamespaces(ns);
      this.emit('removed', lng, ns);
    }
  }, {
    key: "hasResourceBundle",
    value: function hasResourceBundle(lng, ns) {
      return this.getResource(lng, ns) !== undefined;
    }
  }, {
    key: "getResourceBundle",
    value: function getResourceBundle(lng, ns) {
      if (!ns) ns = this.options.defaultNS;
      if (this.options.compatibilityAPI === 'v1') return _objectSpread$5(_objectSpread$5({}, {}), this.getResource(lng, ns));
      return this.getResource(lng, ns);
    }
  }, {
    key: "getDataByLanguage",
    value: function getDataByLanguage(lng) {
      return this.data[lng];
    }
  }, {
    key: "hasLanguageSomeTranslations",
    value: function hasLanguageSomeTranslations(lng) {
      var data = this.getDataByLanguage(lng);
      var n = data && Object.keys(data) || [];
      return !!n.find(function (v) {
        return data[v] && Object.keys(data[v]).length > 0;
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.data;
    }
  }]);
  return ResourceStore;
}(EventEmitter);

var postProcessor = {
  processors: {},
  addPostProcessor: function addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle: function handle(processors, value, key, options, translator) {
    var _this = this;
    processors.forEach(function (processor) {
      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
    });
    return value;
  }
};

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }
function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var checkedLoadedFor = {};
var Translator = function (_EventEmitter) {
  _inherits__default["default"](Translator, _EventEmitter);
  var _super = _createSuper$2(Translator);
  function Translator(services) {
    var _this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck__default["default"](this, Translator);
    _this = _super.call(this);
    if (isIE10) {
      EventEmitter.call(_assertThisInitialized__default["default"](_this));
    }
    copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, _assertThisInitialized__default["default"](_this));
    _this.options = options;
    if (_this.options.keySeparator === undefined) {
      _this.options.keySeparator = '.';
    }
    _this.logger = baseLogger.create('translator');
    return _this;
  }
  _createClass__default["default"](Translator, [{
    key: "changeLanguage",
    value: function changeLanguage(lng) {
      if (lng) this.language = lng;
    }
  }, {
    key: "exists",
    value: function exists(key) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        interpolation: {}
      };
      if (key === undefined || key === null) {
        return false;
      }
      var resolved = this.resolve(key, options);
      return resolved && resolved.res !== undefined;
    }
  }, {
    key: "extractFromKey",
    value: function extractFromKey(key, options) {
      var nsSeparator = options.nsSeparator !== undefined ? options.nsSeparator : this.options.nsSeparator;
      if (nsSeparator === undefined) nsSeparator = ':';
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var namespaces = options.ns || this.options.defaultNS || [];
      var wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
      var seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !options.keySeparator && !this.options.userDefinedNsSeparator && !options.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
      if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
        var m = key.match(this.interpolator.nestingRegexp);
        if (m && m.length > 0) {
          return {
            key: key,
            namespaces: namespaces
          };
        }
        var parts = key.split(nsSeparator);
        if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
        key = parts.join(keySeparator);
      }
      if (typeof namespaces === 'string') namespaces = [namespaces];
      return {
        key: key,
        namespaces: namespaces
      };
    }
  }, {
    key: "translate",
    value: function translate(keys, options, lastKey) {
      var _this2 = this;
      if (_typeof__default["default"](options) !== 'object' && this.options.overloadTranslationOptionHandler) {
        options = this.options.overloadTranslationOptionHandler(arguments);
      }
      if (!options) options = {};
      if (keys === undefined || keys === null) return '';
      if (!Array.isArray(keys)) keys = [String(keys)];
      var returnDetails = options.returnDetails !== undefined ? options.returnDetails : this.options.returnDetails;
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var _this$extractFromKey = this.extractFromKey(keys[keys.length - 1], options),
        key = _this$extractFromKey.key,
        namespaces = _this$extractFromKey.namespaces;
      var namespace = namespaces[namespaces.length - 1];
      var lng = options.lng || this.language;
      var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
      if (lng && lng.toLowerCase() === 'cimode') {
        if (appendNamespaceToCIMode) {
          var nsSeparator = options.nsSeparator || this.options.nsSeparator;
          if (returnDetails) {
            return {
              res: "".concat(namespace).concat(nsSeparator).concat(key),
              usedKey: key,
              exactUsedKey: key,
              usedLng: lng,
              usedNS: namespace
            };
          }
          return "".concat(namespace).concat(nsSeparator).concat(key);
        }
        if (returnDetails) {
          return {
            res: key,
            usedKey: key,
            exactUsedKey: key,
            usedLng: lng,
            usedNS: namespace
          };
        }
        return key;
      }
      var resolved = this.resolve(keys, options);
      var res = resolved && resolved.res;
      var resUsedKey = resolved && resolved.usedKey || key;
      var resExactUsedKey = resolved && resolved.exactUsedKey || key;
      var resType = Object.prototype.toString.apply(res);
      var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
      var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
      var handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
      var handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';
      if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === 'string' && resType === '[object Array]')) {
        if (!options.returnObjects && !this.options.returnObjects) {
          if (!this.options.returnedObjectHandler) {
            this.logger.warn('accessing an object - but returnObjects options is not enabled!');
          }
          var r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, _objectSpread$4(_objectSpread$4({}, options), {}, {
            ns: namespaces
          })) : "key '".concat(key, " (").concat(this.language, ")' returned an object instead of string.");
          if (returnDetails) {
            resolved.res = r;
            return resolved;
          }
          return r;
        }
        if (keySeparator) {
          var resTypeIsArray = resType === '[object Array]';
          var copy = resTypeIsArray ? [] : {};
          var newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
          for (var m in res) {
            if (Object.prototype.hasOwnProperty.call(res, m)) {
              var deepKey = "".concat(newKeyToUse).concat(keySeparator).concat(m);
              copy[m] = this.translate(deepKey, _objectSpread$4(_objectSpread$4({}, options), {
                joinArrays: false,
                ns: namespaces
              }));
              if (copy[m] === deepKey) copy[m] = res[m];
            }
          }
          res = copy;
        }
      } else if (handleAsObjectInI18nFormat && typeof joinArrays === 'string' && resType === '[object Array]') {
        res = res.join(joinArrays);
        if (res) res = this.extendTranslation(res, keys, options, lastKey);
      } else {
        var usedDefault = false;
        var usedKey = false;
        var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
        var hasDefaultValue = Translator.hasDefaultValue(options);
        var defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, options) : '';
        var defaultValue = options["defaultValue".concat(defaultValueSuffix)] || options.defaultValue;
        if (!this.isValidLookup(res) && hasDefaultValue) {
          usedDefault = true;
          res = defaultValue;
        }
        if (!this.isValidLookup(res)) {
          usedKey = true;
          res = key;
        }
        var missingKeyNoValueFallbackToKey = options.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
        var resForMissing = missingKeyNoValueFallbackToKey && usedKey ? undefined : res;
        var updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
        if (usedKey || usedDefault || updateMissing) {
          this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? defaultValue : res);
          if (keySeparator) {
            var fk = this.resolve(key, _objectSpread$4(_objectSpread$4({}, options), {}, {
              keySeparator: false
            }));
            if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
          }
          var lngs = [];
          var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
          if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
            for (var i = 0; i < fallbackLngs.length; i++) {
              lngs.push(fallbackLngs[i]);
            }
          } else if (this.options.saveMissingTo === 'all') {
            lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
          } else {
            lngs.push(options.lng || this.language);
          }
          var send = function send(l, k, specificDefaultValue) {
            var defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
            if (_this2.options.missingKeyHandler) {
              _this2.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, options);
            } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {
              _this2.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, options);
            }
            _this2.emit('missingKey', l, namespace, k, res);
          };
          if (this.options.saveMissing) {
            if (this.options.saveMissingPlurals && needsPluralHandling) {
              lngs.forEach(function (language) {
                _this2.pluralResolver.getSuffixes(language, options).forEach(function (suffix) {
                  send([language], key + suffix, options["defaultValue".concat(suffix)] || defaultValue);
                });
              });
            } else {
              send(lngs, key, defaultValue);
            }
          }
        }
        res = this.extendTranslation(res, keys, options, resolved, lastKey);
        if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = "".concat(namespace, ":").concat(key);
        if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
          if (this.options.compatibilityAPI !== 'v1') {
            res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? "".concat(namespace, ":").concat(key) : key, usedDefault ? res : undefined);
          } else {
            res = this.options.parseMissingKeyHandler(res);
          }
        }
      }
      if (returnDetails) {
        resolved.res = res;
        return resolved;
      }
      return res;
    }
  }, {
    key: "extendTranslation",
    value: function extendTranslation(res, key, options, resolved, lastKey) {
      var _this3 = this;
      if (this.i18nFormat && this.i18nFormat.parse) {
        res = this.i18nFormat.parse(res, _objectSpread$4(_objectSpread$4({}, this.options.interpolation.defaultVariables), options), resolved.usedLng, resolved.usedNS, resolved.usedKey, {
          resolved: resolved
        });
      } else if (!options.skipInterpolation) {
        if (options.interpolation) this.interpolator.init(_objectSpread$4(_objectSpread$4({}, options), {
          interpolation: _objectSpread$4(_objectSpread$4({}, this.options.interpolation), options.interpolation)
        }));
        var skipOnVariables = typeof res === 'string' && (options && options.interpolation && options.interpolation.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
        var nestBef;
        if (skipOnVariables) {
          var nb = res.match(this.interpolator.nestingRegexp);
          nestBef = nb && nb.length;
        }
        var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
        if (this.options.interpolation.defaultVariables) data = _objectSpread$4(_objectSpread$4({}, this.options.interpolation.defaultVariables), data);
        res = this.interpolator.interpolate(res, data, options.lng || this.language, options);
        if (skipOnVariables) {
          var na = res.match(this.interpolator.nestingRegexp);
          var nestAft = na && na.length;
          if (nestBef < nestAft) options.nest = false;
        }
        if (options.nest !== false) res = this.interpolator.nest(res, function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          if (lastKey && lastKey[0] === args[0] && !options.context) {
            _this3.logger.warn("It seems you are nesting recursively key: ".concat(args[0], " in key: ").concat(key[0]));
            return null;
          }
          return _this3.translate.apply(_this3, args.concat([key]));
        }, options);
        if (options.interpolation) this.interpolator.reset();
      }
      var postProcess = options.postProcess || this.options.postProcess;
      var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;
      if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
        res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? _objectSpread$4({
          i18nResolved: resolved
        }, options) : options, this);
      }
      return res;
    }
  }, {
    key: "resolve",
    value: function resolve(keys) {
      var _this4 = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var found;
      var usedKey;
      var exactUsedKey;
      var usedLng;
      var usedNS;
      if (typeof keys === 'string') keys = [keys];
      keys.forEach(function (k) {
        if (_this4.isValidLookup(found)) return;
        var extracted = _this4.extractFromKey(k, options);
        var key = extracted.key;
        usedKey = key;
        var namespaces = extracted.namespaces;
        if (_this4.options.fallbackNS) namespaces = namespaces.concat(_this4.options.fallbackNS);
        var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
        var needsZeroSuffixLookup = needsPluralHandling && !options.ordinal && options.count === 0 && _this4.pluralResolver.shouldUseIntlApi();
        var needsContextHandling = options.context !== undefined && (typeof options.context === 'string' || typeof options.context === 'number') && options.context !== '';
        var codes = options.lngs ? options.lngs : _this4.languageUtils.toResolveHierarchy(options.lng || _this4.language, options.fallbackLng);
        namespaces.forEach(function (ns) {
          if (_this4.isValidLookup(found)) return;
          usedNS = ns;
          if (!checkedLoadedFor["".concat(codes[0], "-").concat(ns)] && _this4.utils && _this4.utils.hasLoadedNamespace && !_this4.utils.hasLoadedNamespace(usedNS)) {
            checkedLoadedFor["".concat(codes[0], "-").concat(ns)] = true;
            _this4.logger.warn("key \"".concat(usedKey, "\" for languages \"").concat(codes.join(', '), "\" won't get resolved as namespace \"").concat(usedNS, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
          }
          codes.forEach(function (code) {
            if (_this4.isValidLookup(found)) return;
            usedLng = code;
            var finalKeys = [key];
            if (_this4.i18nFormat && _this4.i18nFormat.addLookupKeys) {
              _this4.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
            } else {
              var pluralSuffix;
              if (needsPluralHandling) pluralSuffix = _this4.pluralResolver.getSuffix(code, options.count, options);
              var zeroSuffix = "".concat(_this4.options.pluralSeparator, "zero");
              if (needsPluralHandling) {
                finalKeys.push(key + pluralSuffix);
                if (needsZeroSuffixLookup) {
                  finalKeys.push(key + zeroSuffix);
                }
              }
              if (needsContextHandling) {
                var contextKey = "".concat(key).concat(_this4.options.contextSeparator).concat(options.context);
                finalKeys.push(contextKey);
                if (needsPluralHandling) {
                  finalKeys.push(contextKey + pluralSuffix);
                  if (needsZeroSuffixLookup) {
                    finalKeys.push(contextKey + zeroSuffix);
                  }
                }
              }
            }
            var possibleKey;
            while (possibleKey = finalKeys.pop()) {
              if (!_this4.isValidLookup(found)) {
                exactUsedKey = possibleKey;
                found = _this4.getResource(code, ns, possibleKey, options);
              }
            }
          });
        });
      });
      return {
        res: found,
        usedKey: usedKey,
        exactUsedKey: exactUsedKey,
        usedLng: usedLng,
        usedNS: usedNS
      };
    }
  }, {
    key: "isValidLookup",
    value: function isValidLookup(res) {
      return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
    }
  }, {
    key: "getResource",
    value: function getResource(code, ns, key) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
      return this.resourceStore.getResource(code, ns, key, options);
    }
  }], [{
    key: "hasDefaultValue",
    value: function hasDefaultValue(options) {
      var prefix = 'defaultValue';
      for (var option in options) {
        if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, prefix.length) && undefined !== options[option]) {
          return true;
        }
      }
      return false;
    }
  }]);
  return Translator;
}(EventEmitter);

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
var LanguageUtil = function () {
  function LanguageUtil(options) {
    _classCallCheck__default["default"](this, LanguageUtil);
    this.options = options;
    this.supportedLngs = this.options.supportedLngs || false;
    this.logger = baseLogger.create('languageUtils');
  }
  _createClass__default["default"](LanguageUtil, [{
    key: "getScriptPartFromCode",
    value: function getScriptPartFromCode(code) {
      if (!code || code.indexOf('-') < 0) return null;
      var p = code.split('-');
      if (p.length === 2) return null;
      p.pop();
      if (p[p.length - 1].toLowerCase() === 'x') return null;
      return this.formatLanguageCode(p.join('-'));
    }
  }, {
    key: "getLanguagePartFromCode",
    value: function getLanguagePartFromCode(code) {
      if (!code || code.indexOf('-') < 0) return code;
      var p = code.split('-');
      return this.formatLanguageCode(p[0]);
    }
  }, {
    key: "formatLanguageCode",
    value: function formatLanguageCode(code) {
      if (typeof code === 'string' && code.indexOf('-') > -1) {
        var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
        var p = code.split('-');
        if (this.options.lowerCaseLng) {
          p = p.map(function (part) {
            return part.toLowerCase();
          });
        } else if (p.length === 2) {
          p[0] = p[0].toLowerCase();
          p[1] = p[1].toUpperCase();
          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        } else if (p.length === 3) {
          p[0] = p[0].toLowerCase();
          if (p[1].length === 2) p[1] = p[1].toUpperCase();
          if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();
          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
          if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
        }
        return p.join('-');
      }
      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
    }
  }, {
    key: "isSupportedCode",
    value: function isSupportedCode(code) {
      if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
        code = this.getLanguagePartFromCode(code);
      }
      return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
    }
  }, {
    key: "getBestMatchFromCodes",
    value: function getBestMatchFromCodes(codes) {
      var _this = this;
      if (!codes) return null;
      var found;
      codes.forEach(function (code) {
        if (found) return;
        var cleanedLng = _this.formatLanguageCode(code);
        if (!_this.options.supportedLngs || _this.isSupportedCode(cleanedLng)) found = cleanedLng;
      });
      if (!found && this.options.supportedLngs) {
        codes.forEach(function (code) {
          if (found) return;
          var lngOnly = _this.getLanguagePartFromCode(code);
          if (_this.isSupportedCode(lngOnly)) return found = lngOnly;
          found = _this.options.supportedLngs.find(function (supportedLng) {
            if (supportedLng.indexOf(lngOnly) === 0) return supportedLng;
          });
        });
      }
      if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
      return found;
    }
  }, {
    key: "getFallbackCodes",
    value: function getFallbackCodes(fallbacks, code) {
      if (!fallbacks) return [];
      if (typeof fallbacks === 'function') fallbacks = fallbacks(code);
      if (typeof fallbacks === 'string') fallbacks = [fallbacks];
      if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;
      if (!code) return fallbacks["default"] || [];
      var found = fallbacks[code];
      if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
      if (!found) found = fallbacks[this.formatLanguageCode(code)];
      if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
      if (!found) found = fallbacks["default"];
      return found || [];
    }
  }, {
    key: "toResolveHierarchy",
    value: function toResolveHierarchy(code, fallbackCode) {
      var _this2 = this;
      var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
      var codes = [];
      var addCode = function addCode(c) {
        if (!c) return;
        if (_this2.isSupportedCode(c)) {
          codes.push(c);
        } else {
          _this2.logger.warn("rejecting language code not found in supportedLngs: ".concat(c));
        }
      };
      if (typeof code === 'string' && code.indexOf('-') > -1) {
        if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
        if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
        if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
      } else if (typeof code === 'string') {
        addCode(this.formatLanguageCode(code));
      }
      fallbackCodes.forEach(function (fc) {
        if (codes.indexOf(fc) < 0) addCode(_this2.formatLanguageCode(fc));
      });
      return codes;
    }
  }]);
  return LanguageUtil;
}();

var sets = [{
  lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'tl', 'ti', 'tr', 'uz', 'wa'],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'hi', 'hu', 'hy', 'ia', 'it', 'kk', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ['ay', 'bo', 'cgg', 'fa', 'ht', 'id', 'ja', 'jbo', 'ka', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'],
  nr: [1],
  fc: 3
}, {
  lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ['ar'],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ['cs', 'sk'],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ['csb', 'pl'],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ['cy'],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ['fr'],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ['ga'],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ['gd'],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ['is'],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ['jv'],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ['kw'],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ['lt'],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ['lv'],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ['mk'],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ['mnk'],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ['mt'],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ['or'],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ['ro'],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ['sl'],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ['he', 'iw'],
  nr: [1, 2, 20, 21],
  fc: 22
}];
var _rulesPluralsTypes = {
  1: function _(n) {
    return Number(n > 1);
  },
  2: function _(n) {
    return Number(n != 1);
  },
  3: function _(n) {
    return 0;
  },
  4: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function _(n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function _(n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function _(n) {
    return Number(n >= 2);
  },
  10: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function _(n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function _(n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function _(n) {
    return Number(n !== 0);
  },
  14: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function _(n) {
    return Number(n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1);
  },
  18: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function _(n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function _(n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function _(n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  },
  22: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);
  }
};
var deprecatedJsonVersions = ['v1', 'v2', 'v3'];
var suffixesOrder = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function createRules() {
  var rules = {};
  sets.forEach(function (set) {
    set.lngs.forEach(function (l) {
      rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}
var PluralResolver = function () {
  function PluralResolver(languageUtils) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck__default["default"](this, PluralResolver);
    this.languageUtils = languageUtils;
    this.options = options;
    this.logger = baseLogger.create('pluralResolver');
    if ((!this.options.compatibilityJSON || this.options.compatibilityJSON === 'v4') && (typeof Intl === 'undefined' || !Intl.PluralRules)) {
      this.options.compatibilityJSON = 'v3';
      this.logger.error('Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.');
    }
    this.rules = createRules();
  }
  _createClass__default["default"](PluralResolver, [{
    key: "addRule",
    value: function addRule(lng, obj) {
      this.rules[lng] = obj;
    }
  }, {
    key: "getRule",
    value: function getRule(code) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (this.shouldUseIntlApi()) {
        try {
          return new Intl.PluralRules(code, {
            type: options.ordinal ? 'ordinal' : 'cardinal'
          });
        } catch (_unused) {
          return;
        }
      }
      return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
    }
  }, {
    key: "needsPlural",
    value: function needsPlural(code) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var rule = this.getRule(code, options);
      if (this.shouldUseIntlApi()) {
        return rule && rule.resolvedOptions().pluralCategories.length > 1;
      }
      return rule && rule.numbers.length > 1;
    }
  }, {
    key: "getPluralFormsOfKey",
    value: function getPluralFormsOfKey(code, key) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.getSuffixes(code, options).map(function (suffix) {
        return "".concat(key).concat(suffix);
      });
    }
  }, {
    key: "getSuffixes",
    value: function getSuffixes(code) {
      var _this = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var rule = this.getRule(code, options);
      if (!rule) {
        return [];
      }
      if (this.shouldUseIntlApi()) {
        return rule.resolvedOptions().pluralCategories.sort(function (pluralCategory1, pluralCategory2) {
          return suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2];
        }).map(function (pluralCategory) {
          return "".concat(_this.options.prepend).concat(pluralCategory);
        });
      }
      return rule.numbers.map(function (number) {
        return _this.getSuffix(code, number, options);
      });
    }
  }, {
    key: "getSuffix",
    value: function getSuffix(code, count) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var rule = this.getRule(code, options);
      if (rule) {
        if (this.shouldUseIntlApi()) {
          return "".concat(this.options.prepend).concat(rule.select(count));
        }
        return this.getSuffixRetroCompatible(rule, count);
      }
      this.logger.warn("no plural rule found for: ".concat(code));
      return '';
    }
  }, {
    key: "getSuffixRetroCompatible",
    value: function getSuffixRetroCompatible(rule, count) {
      var _this2 = this;
      var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
      var suffix = rule.numbers[idx];
      if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
        if (suffix === 2) {
          suffix = 'plural';
        } else if (suffix === 1) {
          suffix = '';
        }
      }
      var returnSuffix = function returnSuffix() {
        return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();
      };
      if (this.options.compatibilityJSON === 'v1') {
        if (suffix === 1) return '';
        if (typeof suffix === 'number') return "_plural_".concat(suffix.toString());
        return returnSuffix();
      } else if (this.options.compatibilityJSON === 'v2') {
        return returnSuffix();
      } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
        return returnSuffix();
      }
      return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
    }
  }, {
    key: "shouldUseIntlApi",
    value: function shouldUseIntlApi() {
      return !deprecatedJsonVersions.includes(this.options.compatibilityJSON);
    }
  }]);
  return PluralResolver;
}();

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Interpolator = function () {
  function Interpolator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck__default["default"](this, Interpolator);
    this.logger = baseLogger.create('interpolator');
    this.options = options;
    this.format = options.interpolation && options.interpolation.format || function (value) {
      return value;
    };
    this.init(options);
  }
  _createClass__default["default"](Interpolator, [{
    key: "init",
    value: function init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!options.interpolation) options.interpolation = {
        escapeValue: true
      };
      var iOpts = options.interpolation;
      this.escape = iOpts.escape !== undefined ? iOpts.escape : escape;
      this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;
      this.useRawValueToEscape = iOpts.useRawValueToEscape !== undefined ? iOpts.useRawValueToEscape : false;
      this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
      this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
      this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
      this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
      this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';
      this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape('$t(');
      this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(')');
      this.nestingOptionsSeparator = iOpts.nestingOptionsSeparator ? iOpts.nestingOptionsSeparator : iOpts.nestingOptionsSeparator || ',';
      this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;
      this.alwaysFormat = iOpts.alwaysFormat !== undefined ? iOpts.alwaysFormat : false;
      this.resetRegExp();
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.options) this.init(this.options);
    }
  }, {
    key: "resetRegExp",
    value: function resetRegExp() {
      var regexpStr = "".concat(this.prefix, "(.+?)").concat(this.suffix);
      this.regexp = new RegExp(regexpStr, 'g');
      var regexpUnescapeStr = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
      this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');
      var nestingRegexpStr = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
      this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
    }
  }, {
    key: "interpolate",
    value: function interpolate(str, data, lng, options) {
      var _this = this;
      var match;
      var value;
      var replaces;
      var defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
      function regexSafe(val) {
        return val.replace(/\$/g, '$$$$');
      }
      var handleFormat = function handleFormat(key) {
        if (key.indexOf(_this.formatSeparator) < 0) {
          var path = getPathWithDefaults(data, defaultData, key);
          return _this.alwaysFormat ? _this.format(path, undefined, lng, _objectSpread$3(_objectSpread$3(_objectSpread$3({}, options), data), {}, {
            interpolationkey: key
          })) : path;
        }
        var p = key.split(_this.formatSeparator);
        var k = p.shift().trim();
        var f = p.join(_this.formatSeparator).trim();
        return _this.format(getPathWithDefaults(data, defaultData, k), f, lng, _objectSpread$3(_objectSpread$3(_objectSpread$3({}, options), data), {}, {
          interpolationkey: k
        }));
      };
      this.resetRegExp();
      var missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
      var skipOnVariables = options && options.interpolation && options.interpolation.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
      var todos = [{
        regex: this.regexpUnescape,
        safeValue: function safeValue(val) {
          return regexSafe(val);
        }
      }, {
        regex: this.regexp,
        safeValue: function safeValue(val) {
          return _this.escapeValue ? regexSafe(_this.escape(val)) : regexSafe(val);
        }
      }];
      todos.forEach(function (todo) {
        replaces = 0;
        while (match = todo.regex.exec(str)) {
          var matchedVar = match[1].trim();
          value = handleFormat(matchedVar);
          if (value === undefined) {
            if (typeof missingInterpolationHandler === 'function') {
              var temp = missingInterpolationHandler(str, match, options);
              value = typeof temp === 'string' ? temp : '';
            } else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) {
              value = '';
            } else if (skipOnVariables) {
              value = match[0];
              continue;
            } else {
              _this.logger.warn("missed to pass in variable ".concat(matchedVar, " for interpolating ").concat(str));
              value = '';
            }
          } else if (typeof value !== 'string' && !_this.useRawValueToEscape) {
            value = makeString(value);
          }
          var safeValue = todo.safeValue(value);
          str = str.replace(match[0], safeValue);
          if (skipOnVariables) {
            todo.regex.lastIndex += value.length;
            todo.regex.lastIndex -= match[0].length;
          } else {
            todo.regex.lastIndex = 0;
          }
          replaces++;
          if (replaces >= _this.maxReplaces) {
            break;
          }
        }
      });
      return str;
    }
  }, {
    key: "nest",
    value: function nest(str, fc) {
      var _this2 = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var match;
      var value;
      var clonedOptions;
      function handleHasOptions(key, inheritedOptions) {
        var sep = this.nestingOptionsSeparator;
        if (key.indexOf(sep) < 0) return key;
        var c = key.split(new RegExp("".concat(sep, "[ ]*{")));
        var optionsString = "{".concat(c[1]);
        key = c[0];
        optionsString = this.interpolate(optionsString, clonedOptions);
        var matchedSingleQuotes = optionsString.match(/'/g);
        var matchedDoubleQuotes = optionsString.match(/"/g);
        if (matchedSingleQuotes && matchedSingleQuotes.length % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
          optionsString = optionsString.replace(/'/g, '"');
        }
        try {
          clonedOptions = JSON.parse(optionsString);
          if (inheritedOptions) clonedOptions = _objectSpread$3(_objectSpread$3({}, inheritedOptions), clonedOptions);
        } catch (e) {
          this.logger.warn("failed parsing options string in nesting for key ".concat(key), e);
          return "".concat(key).concat(sep).concat(optionsString);
        }
        delete clonedOptions.defaultValue;
        return key;
      }
      while (match = this.nestingRegexp.exec(str)) {
        var formatters = [];
        clonedOptions = _objectSpread$3({}, options);
        clonedOptions = clonedOptions.replace && typeof clonedOptions.replace !== 'string' ? clonedOptions.replace : clonedOptions;
        clonedOptions.applyPostProcessor = false;
        delete clonedOptions.defaultValue;
        var doReduce = false;
        if (match[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(match[1])) {
          var r = match[1].split(this.formatSeparator).map(function (elem) {
            return elem.trim();
          });
          match[1] = r.shift();
          formatters = r;
          doReduce = true;
        }
        value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
        if (value && match[0] === str && typeof value !== 'string') return value;
        if (typeof value !== 'string') value = makeString(value);
        if (!value) {
          this.logger.warn("missed to resolve ".concat(match[1], " for nesting ").concat(str));
          value = '';
        }
        if (doReduce) {
          value = formatters.reduce(function (v, f) {
            return _this2.format(v, f, options.lng, _objectSpread$3(_objectSpread$3({}, options), {}, {
              interpolationkey: match[1].trim()
            }));
          }, value.trim());
        }
        str = str.replace(match[0], value);
        this.regexp.lastIndex = 0;
      }
      return str;
    }
  }]);
  return Interpolator;
}();

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function parseFormatStr(formatStr) {
  var formatName = formatStr.toLowerCase().trim();
  var formatOptions = {};
  if (formatStr.indexOf('(') > -1) {
    var p = formatStr.split('(');
    formatName = p[0].toLowerCase().trim();
    var optStr = p[1].substring(0, p[1].length - 1);
    if (formatName === 'currency' && optStr.indexOf(':') < 0) {
      if (!formatOptions.currency) formatOptions.currency = optStr.trim();
    } else if (formatName === 'relativetime' && optStr.indexOf(':') < 0) {
      if (!formatOptions.range) formatOptions.range = optStr.trim();
    } else {
      var opts = optStr.split(';');
      opts.forEach(function (opt) {
        if (!opt) return;
        var _opt$split = opt.split(':'),
          _opt$split2 = _toArray__default["default"](_opt$split),
          key = _opt$split2[0],
          rest = _opt$split2.slice(1);
        var val = rest.join(':').trim().replace(/^'+|'+$/g, '');
        if (!formatOptions[key.trim()]) formatOptions[key.trim()] = val;
        if (val === 'false') formatOptions[key.trim()] = false;
        if (val === 'true') formatOptions[key.trim()] = true;
        if (!isNaN(val)) formatOptions[key.trim()] = parseInt(val, 10);
      });
    }
  }
  return {
    formatName: formatName,
    formatOptions: formatOptions
  };
}
function createCachedFormatter(fn) {
  var cache = {};
  return function invokeFormatter(val, lng, options) {
    var key = lng + JSON.stringify(options);
    var formatter = cache[key];
    if (!formatter) {
      formatter = fn(lng, options);
      cache[key] = formatter;
    }
    return formatter(val);
  };
}
var Formatter = function () {
  function Formatter() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck__default["default"](this, Formatter);
    this.logger = baseLogger.create('formatter');
    this.options = options;
    this.formats = {
      number: createCachedFormatter(function (lng, opt) {
        var formatter = new Intl.NumberFormat(lng, _objectSpread$2({}, opt));
        return function (val) {
          return formatter.format(val);
        };
      }),
      currency: createCachedFormatter(function (lng, opt) {
        var formatter = new Intl.NumberFormat(lng, _objectSpread$2(_objectSpread$2({}, opt), {}, {
          style: 'currency'
        }));
        return function (val) {
          return formatter.format(val);
        };
      }),
      datetime: createCachedFormatter(function (lng, opt) {
        var formatter = new Intl.DateTimeFormat(lng, _objectSpread$2({}, opt));
        return function (val) {
          return formatter.format(val);
        };
      }),
      relativetime: createCachedFormatter(function (lng, opt) {
        var formatter = new Intl.RelativeTimeFormat(lng, _objectSpread$2({}, opt));
        return function (val) {
          return formatter.format(val, opt.range || 'day');
        };
      }),
      list: createCachedFormatter(function (lng, opt) {
        var formatter = new Intl.ListFormat(lng, _objectSpread$2({}, opt));
        return function (val) {
          return formatter.format(val);
        };
      })
    };
    this.init(options);
  }
  _createClass__default["default"](Formatter, [{
    key: "init",
    value: function init(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        interpolation: {}
      };
      var iOpts = options.interpolation;
      this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
    }
  }, {
    key: "add",
    value: function add(name, fc) {
      this.formats[name.toLowerCase().trim()] = fc;
    }
  }, {
    key: "addCached",
    value: function addCached(name, fc) {
      this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
    }
  }, {
    key: "format",
    value: function format(value, _format, lng) {
      var _this = this;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var formats = _format.split(this.formatSeparator);
      var result = formats.reduce(function (mem, f) {
        var _parseFormatStr = parseFormatStr(f),
          formatName = _parseFormatStr.formatName,
          formatOptions = _parseFormatStr.formatOptions;
        if (_this.formats[formatName]) {
          var formatted = mem;
          try {
            var valOptions = options && options.formatParams && options.formatParams[options.interpolationkey] || {};
            var l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
            formatted = _this.formats[formatName](mem, l, _objectSpread$2(_objectSpread$2(_objectSpread$2({}, formatOptions), options), valOptions));
          } catch (error) {
            _this.logger.warn(error);
          }
          return formatted;
        } else {
          _this.logger.warn("there was no format function for ".concat(formatName));
        }
        return mem;
      }, value);
      return result;
    }
  }]);
  return Formatter;
}();

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }
function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function removePending(q, name) {
  if (q.pending[name] !== undefined) {
    delete q.pending[name];
    q.pendingCount--;
  }
}
var Connector = function (_EventEmitter) {
  _inherits__default["default"](Connector, _EventEmitter);
  var _super = _createSuper$1(Connector);
  function Connector(backend, store, services) {
    var _this;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    _classCallCheck__default["default"](this, Connector);
    _this = _super.call(this);
    if (isIE10) {
      EventEmitter.call(_assertThisInitialized__default["default"](_this));
    }
    _this.backend = backend;
    _this.store = store;
    _this.services = services;
    _this.languageUtils = services.languageUtils;
    _this.options = options;
    _this.logger = baseLogger.create('backendConnector');
    _this.waitingReads = [];
    _this.maxParallelReads = options.maxParallelReads || 10;
    _this.readingCalls = 0;
    _this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
    _this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
    _this.state = {};
    _this.queue = [];
    if (_this.backend && _this.backend.init) {
      _this.backend.init(services, options.backend, options);
    }
    return _this;
  }
  _createClass__default["default"](Connector, [{
    key: "queueLoad",
    value: function queueLoad(languages, namespaces, options, callback) {
      var _this2 = this;
      var toLoad = {};
      var pending = {};
      var toLoadLanguages = {};
      var toLoadNamespaces = {};
      languages.forEach(function (lng) {
        var hasAllNamespaces = true;
        namespaces.forEach(function (ns) {
          var name = "".concat(lng, "|").concat(ns);
          if (!options.reload && _this2.store.hasResourceBundle(lng, ns)) {
            _this2.state[name] = 2;
          } else if (_this2.state[name] < 0) ; else if (_this2.state[name] === 1) {
            if (pending[name] === undefined) pending[name] = true;
          } else {
            _this2.state[name] = 1;
            hasAllNamespaces = false;
            if (pending[name] === undefined) pending[name] = true;
            if (toLoad[name] === undefined) toLoad[name] = true;
            if (toLoadNamespaces[ns] === undefined) toLoadNamespaces[ns] = true;
          }
        });
        if (!hasAllNamespaces) toLoadLanguages[lng] = true;
      });
      if (Object.keys(toLoad).length || Object.keys(pending).length) {
        this.queue.push({
          pending: pending,
          pendingCount: Object.keys(pending).length,
          loaded: {},
          errors: [],
          callback: callback
        });
      }
      return {
        toLoad: Object.keys(toLoad),
        pending: Object.keys(pending),
        toLoadLanguages: Object.keys(toLoadLanguages),
        toLoadNamespaces: Object.keys(toLoadNamespaces)
      };
    }
  }, {
    key: "loaded",
    value: function loaded(name, err, data) {
      var s = name.split('|');
      var lng = s[0];
      var ns = s[1];
      if (err) this.emit('failedLoading', lng, ns, err);
      if (data) {
        this.store.addResourceBundle(lng, ns, data);
      }
      this.state[name] = err ? -1 : 2;
      var loaded = {};
      this.queue.forEach(function (q) {
        pushPath(q.loaded, [lng], ns);
        removePending(q, name);
        if (err) q.errors.push(err);
        if (q.pendingCount === 0 && !q.done) {
          Object.keys(q.loaded).forEach(function (l) {
            if (!loaded[l]) loaded[l] = {};
            var loadedKeys = q.loaded[l];
            if (loadedKeys.length) {
              loadedKeys.forEach(function (n) {
                if (loaded[l][n] === undefined) loaded[l][n] = true;
              });
            }
          });
          q.done = true;
          if (q.errors.length) {
            q.callback(q.errors);
          } else {
            q.callback();
          }
        }
      });
      this.emit('loaded', loaded);
      this.queue = this.queue.filter(function (q) {
        return !q.done;
      });
    }
  }, {
    key: "read",
    value: function read(lng, ns, fcName) {
      var _this3 = this;
      var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.retryTimeout;
      var callback = arguments.length > 5 ? arguments[5] : undefined;
      if (!lng.length) return callback(null, {});
      if (this.readingCalls >= this.maxParallelReads) {
        this.waitingReads.push({
          lng: lng,
          ns: ns,
          fcName: fcName,
          tried: tried,
          wait: wait,
          callback: callback
        });
        return;
      }
      this.readingCalls++;
      var resolver = function resolver(err, data) {
        _this3.readingCalls--;
        if (_this3.waitingReads.length > 0) {
          var next = _this3.waitingReads.shift();
          _this3.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
        }
        if (err && data && tried < _this3.maxRetries) {
          setTimeout(function () {
            _this3.read.call(_this3, lng, ns, fcName, tried + 1, wait * 2, callback);
          }, wait);
          return;
        }
        callback(err, data);
      };
      var fc = this.backend[fcName].bind(this.backend);
      if (fc.length === 2) {
        try {
          var r = fc(lng, ns);
          if (r && typeof r.then === 'function') {
            r.then(function (data) {
              return resolver(null, data);
            })["catch"](resolver);
          } else {
            resolver(null, r);
          }
        } catch (err) {
          resolver(err);
        }
        return;
      }
      return fc(lng, ns, resolver);
    }
  }, {
    key: "prepareLoading",
    value: function prepareLoading(languages, namespaces) {
      var _this4 = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = arguments.length > 3 ? arguments[3] : undefined;
      if (!this.backend) {
        this.logger.warn('No backend was added via i18next.use. Will not load resources.');
        return callback && callback();
      }
      if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
      if (typeof namespaces === 'string') namespaces = [namespaces];
      var toLoad = this.queueLoad(languages, namespaces, options, callback);
      if (!toLoad.toLoad.length) {
        if (!toLoad.pending.length) callback();
        return null;
      }
      toLoad.toLoad.forEach(function (name) {
        _this4.loadOne(name);
      });
    }
  }, {
    key: "load",
    value: function load(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {}, callback);
    }
  }, {
    key: "reload",
    value: function reload(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {
        reload: true
      }, callback);
    }
  }, {
    key: "loadOne",
    value: function loadOne(name) {
      var _this5 = this;
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var s = name.split('|');
      var lng = s[0];
      var ns = s[1];
      this.read(lng, ns, 'read', undefined, undefined, function (err, data) {
        if (err) _this5.logger.warn("".concat(prefix, "loading namespace ").concat(ns, " for language ").concat(lng, " failed"), err);
        if (!err && data) _this5.logger.log("".concat(prefix, "loaded namespace ").concat(ns, " for language ").concat(lng), data);
        _this5.loaded(name, err, data);
      });
    }
  }, {
    key: "saveMissing",
    value: function saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var clb = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : function () {};
      if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
        this.logger.warn("did not save key \"".concat(key, "\" as the namespace \"").concat(namespace, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
        return;
      }
      if (key === undefined || key === null || key === '') return;
      if (this.backend && this.backend.create) {
        var opts = _objectSpread$1(_objectSpread$1({}, options), {}, {
          isUpdate: isUpdate
        });
        var fc = this.backend.create.bind(this.backend);
        if (fc.length < 6) {
          try {
            var r;
            if (fc.length === 5) {
              r = fc(languages, namespace, key, fallbackValue, opts);
            } else {
              r = fc(languages, namespace, key, fallbackValue);
            }
            if (r && typeof r.then === 'function') {
              r.then(function (data) {
                return clb(null, data);
              })["catch"](clb);
            } else {
              clb(null, r);
            }
          } catch (err) {
            clb(err);
          }
        } else {
          fc(languages, namespace, key, fallbackValue, clb, opts);
        }
      }
      if (!languages || !languages[0]) return;
      this.store.addResource(languages[0], namespace, key, fallbackValue);
    }
  }]);
  return Connector;
}(EventEmitter);

function get() {
  return {
    debug: false,
    initImmediate: true,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false,
    supportedLngs: false,
    nonExplicitSupportedLngs: false,
    load: 'all',
    preload: false,
    simplifyPluralSuffix: true,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    partialBundledLanguages: false,
    saveMissing: false,
    updateMissing: false,
    saveMissingTo: 'fallback',
    saveMissingPlurals: true,
    missingKeyHandler: false,
    missingInterpolationHandler: false,
    postProcess: false,
    postProcessPassResolved: false,
    returnNull: true,
    returnEmptyString: true,
    returnObjects: false,
    joinArrays: false,
    returnedObjectHandler: false,
    parseMissingKeyHandler: false,
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function handle(args) {
      var ret = {};
      if (_typeof__default["default"](args[1]) === 'object') ret = args[1];
      if (typeof args[1] === 'string') ret.defaultValue = args[1];
      if (typeof args[2] === 'string') ret.tDescription = args[2];
      if (_typeof__default["default"](args[2]) === 'object' || _typeof__default["default"](args[3]) === 'object') {
        var options = args[3] || args[2];
        Object.keys(options).forEach(function (key) {
          ret[key] = options[key];
        });
      }
      return ret;
    },
    interpolation: {
      escapeValue: true,
      format: function format(value, _format, lng, options) {
        return value;
      },
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      unescapePrefix: '-',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      nestingOptionsSeparator: ',',
      maxReplaces: 1000,
      skipOnVariables: true
    }
  };
}
function transformOptions(options) {
  if (typeof options.ns === 'string') options.ns = [options.ns];
  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];
  if (options.supportedLngs && options.supportedLngs.indexOf('cimode') < 0) {
    options.supportedLngs = options.supportedLngs.concat(['cimode']);
  }
  return options;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function noop() {}
function bindMemberFunctions(inst) {
  var mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
  mems.forEach(function (mem) {
    if (typeof inst[mem] === 'function') {
      inst[mem] = inst[mem].bind(inst);
    }
  });
}
var I18n = function (_EventEmitter) {
  _inherits__default["default"](I18n, _EventEmitter);
  var _super = _createSuper(I18n);
  function I18n() {
    var _this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 ? arguments[1] : undefined;
    _classCallCheck__default["default"](this, I18n);
    _this = _super.call(this);
    if (isIE10) {
      EventEmitter.call(_assertThisInitialized__default["default"](_this));
    }
    _this.options = transformOptions(options);
    _this.services = {};
    _this.logger = baseLogger;
    _this.modules = {
      external: []
    };
    bindMemberFunctions(_assertThisInitialized__default["default"](_this));
    if (callback && !_this.isInitialized && !options.isClone) {
      if (!_this.options.initImmediate) {
        _this.init(options, callback);
        return _possibleConstructorReturn__default["default"](_this, _assertThisInitialized__default["default"](_this));
      }
      setTimeout(function () {
        _this.init(options, callback);
      }, 0);
    }
    return _this;
  }
  _createClass__default["default"](I18n, [{
    key: "init",
    value: function init() {
      var _this2 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      if (!options.defaultNS && options.defaultNS !== false && options.ns) {
        if (typeof options.ns === 'string') {
          options.defaultNS = options.ns;
        } else if (options.ns.indexOf('translation') < 0) {
          options.defaultNS = options.ns[0];
        }
      }
      var defOpts = get();
      this.options = _objectSpread(_objectSpread(_objectSpread({}, defOpts), this.options), transformOptions(options));
      if (this.options.compatibilityAPI !== 'v1') {
        this.options.interpolation = _objectSpread(_objectSpread({}, defOpts.interpolation), this.options.interpolation);
      }
      if (options.keySeparator !== undefined) {
        this.options.userDefinedKeySeparator = options.keySeparator;
      }
      if (options.nsSeparator !== undefined) {
        this.options.userDefinedNsSeparator = options.nsSeparator;
      }
      function createClassOnDemand(ClassOrObject) {
        if (!ClassOrObject) return null;
        if (typeof ClassOrObject === 'function') return new ClassOrObject();
        return ClassOrObject;
      }
      if (!this.options.isClone) {
        if (this.modules.logger) {
          baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
        } else {
          baseLogger.init(null, this.options);
        }
        var formatter;
        if (this.modules.formatter) {
          formatter = this.modules.formatter;
        } else if (typeof Intl !== 'undefined') {
          formatter = Formatter;
        }
        var lu = new LanguageUtil(this.options);
        this.store = new ResourceStore(this.options.resources, this.options);
        var s = this.services;
        s.logger = baseLogger;
        s.resourceStore = this.store;
        s.languageUtils = lu;
        s.pluralResolver = new PluralResolver(lu, {
          prepend: this.options.pluralSeparator,
          compatibilityJSON: this.options.compatibilityJSON,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix
        });
        if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
          s.formatter = createClassOnDemand(formatter);
          s.formatter.init(s, this.options);
          this.options.interpolation.format = s.formatter.format.bind(s.formatter);
        }
        s.interpolator = new Interpolator(this.options);
        s.utils = {
          hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
        };
        s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
        s.backendConnector.on('*', function (event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          _this2.emit.apply(_this2, [event].concat(args));
        });
        if (this.modules.languageDetector) {
          s.languageDetector = createClassOnDemand(this.modules.languageDetector);
          if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
        }
        if (this.modules.i18nFormat) {
          s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
          if (s.i18nFormat.init) s.i18nFormat.init(this);
        }
        this.translator = new Translator(this.services, this.options);
        this.translator.on('*', function (event) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          _this2.emit.apply(_this2, [event].concat(args));
        });
        this.modules.external.forEach(function (m) {
          if (m.init) m.init(_this2);
        });
      }
      this.format = this.options.interpolation.format;
      if (!callback) callback = noop;
      if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
        var codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        if (codes.length > 0 && codes[0] !== 'dev') this.options.lng = codes[0];
      }
      if (!this.services.languageDetector && !this.options.lng) {
        this.logger.warn('init: no languageDetector is used and no lng is defined');
      }
      var storeApi = ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
      storeApi.forEach(function (fcName) {
        _this2[fcName] = function () {
          var _this2$store;
          return (_this2$store = _this2.store)[fcName].apply(_this2$store, arguments);
        };
      });
      var storeApiChained = ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'];
      storeApiChained.forEach(function (fcName) {
        _this2[fcName] = function () {
          var _this2$store2;
          (_this2$store2 = _this2.store)[fcName].apply(_this2$store2, arguments);
          return _this2;
        };
      });
      var deferred = defer();
      var load = function load() {
        var finish = function finish(err, t) {
          if (_this2.isInitialized && !_this2.initializedStoreOnce) _this2.logger.warn('init: i18next is already initialized. You should call init just once!');
          _this2.isInitialized = true;
          if (!_this2.options.isClone) _this2.logger.log('initialized', _this2.options);
          _this2.emit('initialized', _this2.options);
          deferred.resolve(t);
          callback(err, t);
        };
        if (_this2.languages && _this2.options.compatibilityAPI !== 'v1' && !_this2.isInitialized) return finish(null, _this2.t.bind(_this2));
        _this2.changeLanguage(_this2.options.lng, finish);
      };
      if (this.options.resources || !this.options.initImmediate) {
        load();
      } else {
        setTimeout(load, 0);
      }
      return deferred;
    }
  }, {
    key: "loadResources",
    value: function loadResources(language) {
      var _this3 = this;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      var usedCallback = callback;
      var usedLng = typeof language === 'string' ? language : this.language;
      if (typeof language === 'function') usedCallback = language;
      if (!this.options.resources || this.options.partialBundledLanguages) {
        if (usedLng && usedLng.toLowerCase() === 'cimode') return usedCallback();
        var toLoad = [];
        var append = function append(lng) {
          if (!lng) return;
          var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
          lngs.forEach(function (l) {
            if (toLoad.indexOf(l) < 0) toLoad.push(l);
          });
        };
        if (!usedLng) {
          var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
          fallbacks.forEach(function (l) {
            return append(l);
          });
        } else {
          append(usedLng);
        }
        if (this.options.preload) {
          this.options.preload.forEach(function (l) {
            return append(l);
          });
        }
        this.services.backendConnector.load(toLoad, this.options.ns, function (e) {
          if (!e && !_this3.resolvedLanguage && _this3.language) _this3.setResolvedLanguage(_this3.language);
          usedCallback(e);
        });
      } else {
        usedCallback(null);
      }
    }
  }, {
    key: "reloadResources",
    value: function reloadResources(lngs, ns, callback) {
      var deferred = defer();
      if (!lngs) lngs = this.languages;
      if (!ns) ns = this.options.ns;
      if (!callback) callback = noop;
      this.services.backendConnector.reload(lngs, ns, function (err) {
        deferred.resolve();
        callback(err);
      });
      return deferred;
    }
  }, {
    key: "use",
    value: function use(module) {
      if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
      if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');
      if (module.type === 'backend') {
        this.modules.backend = module;
      }
      if (module.type === 'logger' || module.log && module.warn && module.error) {
        this.modules.logger = module;
      }
      if (module.type === 'languageDetector') {
        this.modules.languageDetector = module;
      }
      if (module.type === 'i18nFormat') {
        this.modules.i18nFormat = module;
      }
      if (module.type === 'postProcessor') {
        postProcessor.addPostProcessor(module);
      }
      if (module.type === 'formatter') {
        this.modules.formatter = module;
      }
      if (module.type === '3rdParty') {
        this.modules.external.push(module);
      }
      return this;
    }
  }, {
    key: "setResolvedLanguage",
    value: function setResolvedLanguage(l) {
      if (!l || !this.languages) return;
      if (['cimode', 'dev'].indexOf(l) > -1) return;
      for (var li = 0; li < this.languages.length; li++) {
        var lngInLngs = this.languages[li];
        if (['cimode', 'dev'].indexOf(lngInLngs) > -1) continue;
        if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
          this.resolvedLanguage = lngInLngs;
          break;
        }
      }
    }
  }, {
    key: "changeLanguage",
    value: function changeLanguage(lng, callback) {
      var _this4 = this;
      this.isLanguageChangingTo = lng;
      var deferred = defer();
      this.emit('languageChanging', lng);
      var setLngProps = function setLngProps(l) {
        _this4.language = l;
        _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);
        _this4.resolvedLanguage = undefined;
        _this4.setResolvedLanguage(l);
      };
      var done = function done(err, l) {
        if (l) {
          setLngProps(l);
          _this4.translator.changeLanguage(l);
          _this4.isLanguageChangingTo = undefined;
          _this4.emit('languageChanged', l);
          _this4.logger.log('languageChanged', l);
        } else {
          _this4.isLanguageChangingTo = undefined;
        }
        deferred.resolve(function () {
          return _this4.t.apply(_this4, arguments);
        });
        if (callback) callback(err, function () {
          return _this4.t.apply(_this4, arguments);
        });
      };
      var setLng = function setLng(lngs) {
        if (!lng && !lngs && _this4.services.languageDetector) lngs = [];
        var l = typeof lngs === 'string' ? lngs : _this4.services.languageUtils.getBestMatchFromCodes(lngs);
        if (l) {
          if (!_this4.language) {
            setLngProps(l);
          }
          if (!_this4.translator.language) _this4.translator.changeLanguage(l);
          if (_this4.services.languageDetector && _this4.services.languageDetector.cacheUserLanguage) _this4.services.languageDetector.cacheUserLanguage(l);
        }
        _this4.loadResources(l, function (err) {
          done(err, l);
        });
      };
      if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
        setLng(this.services.languageDetector.detect());
      } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
        if (this.services.languageDetector.detect.length === 0) {
          this.services.languageDetector.detect().then(setLng);
        } else {
          this.services.languageDetector.detect(setLng);
        }
      } else {
        setLng(lng);
      }
      return deferred;
    }
  }, {
    key: "getFixedT",
    value: function getFixedT(lng, ns, keyPrefix) {
      var _this5 = this;
      var fixedT = function fixedT(key, opts) {
        var options;
        if (_typeof__default["default"](opts) !== 'object') {
          for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            rest[_key3 - 2] = arguments[_key3];
          }
          options = _this5.options.overloadTranslationOptionHandler([key, opts].concat(rest));
        } else {
          options = _objectSpread({}, opts);
        }
        options.lng = options.lng || fixedT.lng;
        options.lngs = options.lngs || fixedT.lngs;
        options.ns = options.ns || fixedT.ns;
        options.keyPrefix = options.keyPrefix || keyPrefix || fixedT.keyPrefix;
        var keySeparator = _this5.options.keySeparator || '.';
        var resultKey;
        if (options.keyPrefix && Array.isArray(key)) {
          resultKey = key.map(function (k) {
            return "".concat(options.keyPrefix).concat(keySeparator).concat(k);
          });
        } else {
          resultKey = options.keyPrefix ? "".concat(options.keyPrefix).concat(keySeparator).concat(key) : key;
        }
        return _this5.t(resultKey, options);
      };
      if (typeof lng === 'string') {
        fixedT.lng = lng;
      } else {
        fixedT.lngs = lng;
      }
      fixedT.ns = ns;
      fixedT.keyPrefix = keyPrefix;
      return fixedT;
    }
  }, {
    key: "t",
    value: function t() {
      var _this$translator;
      return this.translator && (_this$translator = this.translator).translate.apply(_this$translator, arguments);
    }
  }, {
    key: "exists",
    value: function exists() {
      var _this$translator2;
      return this.translator && (_this$translator2 = this.translator).exists.apply(_this$translator2, arguments);
    }
  }, {
    key: "setDefaultNamespace",
    value: function setDefaultNamespace(ns) {
      this.options.defaultNS = ns;
    }
  }, {
    key: "hasLoadedNamespace",
    value: function hasLoadedNamespace(ns) {
      var _this6 = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.isInitialized) {
        this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
        return false;
      }
      if (!this.languages || !this.languages.length) {
        this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
        return false;
      }
      var lng = this.resolvedLanguage || this.languages[0];
      var fallbackLng = this.options ? this.options.fallbackLng : false;
      var lastLng = this.languages[this.languages.length - 1];
      if (lng.toLowerCase() === 'cimode') return true;
      var loadNotPending = function loadNotPending(l, n) {
        var loadState = _this6.services.backendConnector.state["".concat(l, "|").concat(n)];
        return loadState === -1 || loadState === 2;
      };
      if (options.precheck) {
        var preResult = options.precheck(this, loadNotPending);
        if (preResult !== undefined) return preResult;
      }
      if (this.hasResourceBundle(lng, ns)) return true;
      if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
      if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
      return false;
    }
  }, {
    key: "loadNamespaces",
    value: function loadNamespaces(ns, callback) {
      var _this7 = this;
      var deferred = defer();
      if (!this.options.ns) {
        if (callback) callback();
        return Promise.resolve();
      }
      if (typeof ns === 'string') ns = [ns];
      ns.forEach(function (n) {
        if (_this7.options.ns.indexOf(n) < 0) _this7.options.ns.push(n);
      });
      this.loadResources(function (err) {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
  }, {
    key: "loadLanguages",
    value: function loadLanguages(lngs, callback) {
      var deferred = defer();
      if (typeof lngs === 'string') lngs = [lngs];
      var preloaded = this.options.preload || [];
      var newLngs = lngs.filter(function (lng) {
        return preloaded.indexOf(lng) < 0;
      });
      if (!newLngs.length) {
        if (callback) callback();
        return Promise.resolve();
      }
      this.options.preload = preloaded.concat(newLngs);
      this.loadResources(function (err) {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
  }, {
    key: "dir",
    value: function dir(lng) {
      if (!lng) lng = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language);
      if (!lng) return 'rtl';
      var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam', 'ckb'];
      var languageUtils = this.services && this.services.languageUtils || new LanguageUtil(get());
      return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf('-arab') > 1 ? 'rtl' : 'ltr';
    }
  }, {
    key: "cloneInstance",
    value: function cloneInstance() {
      var _this8 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      var mergedOptions = _objectSpread(_objectSpread(_objectSpread({}, this.options), options), {
        isClone: true
      });
      var clone = new I18n(mergedOptions);
      if (options.debug !== undefined || options.prefix !== undefined) {
        clone.logger = clone.logger.clone(options);
      }
      var membersToCopy = ['store', 'services', 'language'];
      membersToCopy.forEach(function (m) {
        clone[m] = _this8[m];
      });
      clone.services = _objectSpread({}, this.services);
      clone.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      clone.translator = new Translator(clone.services, clone.options);
      clone.translator.on('*', function (event) {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }
        clone.emit.apply(clone, [event].concat(args));
      });
      clone.init(mergedOptions, callback);
      clone.translator.options = clone.options;
      clone.translator.backendConnector.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      return clone;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        options: this.options,
        store: this.store,
        language: this.language,
        languages: this.languages,
        resolvedLanguage: this.resolvedLanguage
      };
    }
  }]);
  return I18n;
}(EventEmitter);
_defineProperty__default["default"](I18n, "createInstance", function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments.length > 1 ? arguments[1] : undefined;
  return new I18n(options, callback);
});
var instance = I18n.createInstance();
instance.createInstance = I18n.createInstance;

module.exports = instance;


/***/ }),

/***/ "./node_modules/jquery-i18next/dist/commonjs/index.js":
/*!************************************************************!*\
  !*** ./node_modules/jquery-i18next/dist/commonjs/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaults = {
  tName: 't',
  i18nName: 'i18n',
  handleName: 'localize',
  selectorAttr: 'data-i18n',
  targetAttr: 'i18n-target',
  optionsAttr: 'i18n-options',
  useOptionsAttr: false,
  parseDefaultValueFromContent: true
};

function init(i18next, $) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


  options = _extends({}, defaults, options);

  function parse(ele, key, opts) {
    if (key.length === 0) return;

    var attr = 'text';

    if (key.indexOf('[') === 0) {
      var parts = key.split(']');
      key = parts[1];
      attr = parts[0].substr(1, parts[0].length - 1);
    }

    if (key.indexOf(';') === key.length - 1) {
      key = key.substr(0, key.length - 2);
    }

    function extendDefault(o, val) {
      if (!options.parseDefaultValueFromContent) return o;
      return _extends({}, o, { defaultValue: val });
    }

    if (attr === 'html') {
      ele.html(i18next.t(key, extendDefault(opts, ele.html())));
    } else if (attr === 'text') {
      ele.text(i18next.t(key, extendDefault(opts, ele.text())));
    } else if (attr === 'prepend') {
      ele.prepend(i18next.t(key, extendDefault(opts, ele.html())));
    } else if (attr === 'append') {
      ele.append(i18next.t(key, extendDefault(opts, ele.html())));
    } else if (attr.indexOf('data-') === 0) {
      var dataAttr = attr.substr('data-'.length);
      var translated = i18next.t(key, extendDefault(opts, ele.data(dataAttr)));

      // we change into the data cache
      ele.data(dataAttr, translated);
      // we change into the dom
      ele.attr(attr, translated);
    } else {
      ele.attr(attr, i18next.t(key, extendDefault(opts, ele.attr(attr))));
    }
  }

  function localize(ele, opts) {
    var key = ele.attr(options.selectorAttr);
    if (!key && typeof key !== 'undefined' && key !== false) key = ele.text() || ele.val();
    if (!key) return;

    var target = ele,
        targetSelector = ele.data(options.targetAttr);

    if (targetSelector) target = ele.find(targetSelector) || ele;

    if (!opts && options.useOptionsAttr === true) opts = ele.data(options.optionsAttr);

    opts = opts || {};

    if (key.indexOf(';') >= 0) {
      var keys = key.split(';');

      $.each(keys, function (m, k) {
        // .trim(): Trim the comma-separated parameters on the data-i18n attribute.
        if (k !== '') parse(target, k.trim(), opts);
      });
    } else {
      parse(target, key, opts);
    }

    if (options.useOptionsAttr === true) {
      var clone = {};
      clone = _extends({ clone: clone }, opts);

      delete clone.lng;
      ele.data(options.optionsAttr, clone);
    }
  }

  function handle(opts) {
    return this.each(function () {
      // localize element itself
      localize($(this), opts);

      // localize children
      var elements = $(this).find('[' + options.selectorAttr + ']');
      elements.each(function () {
        localize($(this), opts);
      });
    });
  };

  // $.t $.i18n shortcut
  $[options.tName] = i18next.t.bind(i18next);
  $[options.i18nName] = i18next;

  // selector function $(mySelector).localize(opts);
  $.fn[options.handleName] = handle;
}

exports["default"] = {
  init: init
};

/***/ }),

/***/ "./node_modules/jquery-i18next/index.js":
/*!**********************************************!*\
  !*** ./node_modules/jquery-i18next/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./dist/commonjs/index.js */ "./node_modules/jquery-i18next/dist/commonjs/index.js")["default"];


/***/ }),

/***/ "./node_modules/party-js/lib/components/circle.js":
/*!********************************************************!*\
  !*** ./node_modules/party-js/lib/components/circle.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Circle = void 0;
/**
 * Represents a circle.
 */
var Circle = /** @class */ (function () {
    /**
     * Creates a new circle at the specified coordinates, with a default radius of 0.
     */
    function Circle(x, y, radius) {
        if (radius === void 0) { radius = 0; }
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    Circle.zero = new Circle(0, 0);
    return Circle;
}());
exports.Circle = Circle;


/***/ }),

/***/ "./node_modules/party-js/lib/components/color.js":
/*!*******************************************************!*\
  !*** ./node_modules/party-js/lib/components/color.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Color = void 0;
var math_1 = __webpack_require__(/*! ../systems/math */ "./node_modules/party-js/lib/systems/math.js");
/**
 * Represents a color consisting of RGB values. The components of it are
 * represented as integers in the range 0 to 255.
 *
 * @example
 * ```ts
 * const a = new Color(12, 59, 219);
 * const b = Color.fromHex("#ffa68d");
 * const result = a.mix(b);
 * ```
 */
var Color = /** @class */ (function () {
    /**
     * Creates a new color instance from the specified RGB components.
     */
    function Color(r, g, b) {
        this.values = new Float32Array(3);
        this.rgb = [r, g, b];
    }
    Object.defineProperty(Color.prototype, "r", {
        /**
         * Returns the r-component of the color.
         */
        get: function () {
            return this.values[0];
        },
        /**
         * Modifies the r-component of the color.
         * Note that this also floors the value.
         */
        set: function (value) {
            this.values[0] = Math.floor(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        /**
         * Returns the g-component of the color.
         */
        get: function () {
            return this.values[1];
        },
        /**
         * Modifies the g-component of the color.
         * Note that this also floors the value.
         */
        set: function (value) {
            this.values[1] = Math.floor(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        /**
         * Returns the b-component of the color.
         * Note that this also floors the value.
         */
        get: function () {
            return this.values[2];
        },
        /**
         * Modifies the b-component of the color.
         */
        set: function (value) {
            this.values[2] = Math.floor(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "rgb", {
        /**
         * Returns the rgb-components of the color, bundled as a copied array.
         */
        get: function () {
            return [this.r, this.g, this.b];
        },
        /**
         * Simultaneously updates the rgb-components of the color, by passing an array.
         */
        set: function (values) {
            this.r = values[0];
            this.g = values[1];
            this.b = values[2];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Mixes the two color together with an optional mixing weight.
     * This weight is 0.5 by default, perfectly averaging the color.
     */
    Color.prototype.mix = function (color, weight) {
        if (weight === void 0) { weight = 0.5; }
        return new Color(math_1.lerp(this.r, color.r, weight), math_1.lerp(this.g, color.g, weight), math_1.lerp(this.b, color.b, weight));
    };
    /**
     * Returns the hexadecimal representation of the color, prefixed by '#'.
     */
    Color.prototype.toHex = function () {
        var hex = function (v) { return v.toString(16).padStart(2, "0"); };
        return "#" + hex(this.r) + hex(this.g) + hex(this.b);
    };
    /**
     * Returns a formatted representation of the color.
     */
    Color.prototype.toString = function () {
        return "rgb(" + this.values.join(", ") + ")";
    };
    /**
     * Creates a color from the specified hexadecimal string.
     * This string can optionally be prefixed by '#'.
     */
    Color.fromHex = function (hex) {
        if (hex.startsWith("#")) {
            hex = hex.substr(1);
        }
        return new Color(parseInt(hex.substr(0, 2), 16), parseInt(hex.substr(2, 2), 16), parseInt(hex.substr(4, 2), 16));
    };
    /**
     * Creates a color from the specified HSL components.
     *
     * @see https://stackoverflow.com/a/9493060/5507624
     */
    Color.fromHsl = function (h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        if (s === 0) {
            return new Color(l, l, l);
        }
        else {
            var hue2rgb = function (p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            var to255 = function (v) { return Math.min(255, 256 * v); };
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            return new Color(to255(hue2rgb(p, q, h + 1 / 3)), to255(hue2rgb(p, q, h)), to255(hue2rgb(p, q, h - 1 / 3)));
        }
    };
    /**
     * Returns (1, 1, 1).
     */
    Color.white = new Color(255, 255, 255);
    /**
     * Returns (0, 0, 0).
     */
    Color.black = new Color(0, 0, 0);
    return Color;
}());
exports.Color = Color;


/***/ }),

/***/ "./node_modules/party-js/lib/components/gradient.js":
/*!**********************************************************!*\
  !*** ./node_modules/party-js/lib/components/gradient.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Gradient = void 0;
var spline_1 = __webpack_require__(/*! ./spline */ "./node_modules/party-js/lib/components/spline.js");
/**
 * Represents a gradient that can be used to interpolate between multiple color.
 */
var Gradient = /** @class */ (function (_super) {
    __extends(Gradient, _super);
    function Gradient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Interpolates between two color on the gradient.
     */
    Gradient.prototype.interpolate = function (a, b, t) {
        return a.mix(b, t);
    };
    /**
     * Returns a solid gradient from the given color.
     */
    Gradient.solid = function (color) {
        return new Gradient({ value: color, time: 0.5 });
    };
    /**
     * Returns a gradient with evenly spaced keys from the given colors.
     */
    Gradient.simple = function () {
        var colors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            colors[_i] = arguments[_i];
        }
        var step = 1 / (colors.length - 1);
        return new (Gradient.bind.apply(Gradient, __spreadArray([void 0], colors.map(function (color, index) { return ({
            value: color,
            time: index * step,
        }); }))))();
    };
    return Gradient;
}(spline_1.Spline));
exports.Gradient = Gradient;


/***/ }),

/***/ "./node_modules/party-js/lib/components/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/party-js/lib/components/index.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./circle */ "./node_modules/party-js/lib/components/circle.js"), exports);
__exportStar(__webpack_require__(/*! ./color */ "./node_modules/party-js/lib/components/color.js"), exports);
__exportStar(__webpack_require__(/*! ./gradient */ "./node_modules/party-js/lib/components/gradient.js"), exports);
__exportStar(__webpack_require__(/*! ./numericSpline */ "./node_modules/party-js/lib/components/numericSpline.js"), exports);
__exportStar(__webpack_require__(/*! ./rect */ "./node_modules/party-js/lib/components/rect.js"), exports);
__exportStar(__webpack_require__(/*! ./vector */ "./node_modules/party-js/lib/components/vector.js"), exports);


/***/ }),

/***/ "./node_modules/party-js/lib/components/numericSpline.js":
/*!***************************************************************!*\
  !*** ./node_modules/party-js/lib/components/numericSpline.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NumericSpline = void 0;
var math_1 = __webpack_require__(/*! ../systems/math */ "./node_modules/party-js/lib/systems/math.js");
var spline_1 = __webpack_require__(/*! ./spline */ "./node_modules/party-js/lib/components/spline.js");
/**
 * Represents a spline that can take numeric values.
 */
var NumericSpline = /** @class */ (function (_super) {
    __extends(NumericSpline, _super);
    function NumericSpline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Smoothly interpolates between two keys on the spline.
     */
    NumericSpline.prototype.interpolate = function (a, b, t) {
        return math_1.slerp(a, b, t);
    };
    return NumericSpline;
}(spline_1.Spline));
exports.NumericSpline = NumericSpline;


/***/ }),

/***/ "./node_modules/party-js/lib/components/rect.js":
/*!******************************************************!*\
  !*** ./node_modules/party-js/lib/components/rect.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rect = void 0;
/**
 * Represents a rectangle with an origin and size.
 */
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    /**
     * Returns a new document-space rectangle from the viewport's bounds.
     */
    Rect.fromScreen = function () {
        return new Rect(window.scrollX, window.scrollY, window.innerWidth, window.innerHeight);
    };
    /**
     * Returns a new document-space rectangle from the specified element.
     */
    Rect.fromElement = function (element) {
        var r = element.getBoundingClientRect();
        return new Rect(window.scrollX + r.x, window.scrollY + r.y, r.width, r.height);
    };
    Rect.zero = new Rect(0, 0);
    return Rect;
}());
exports.Rect = Rect;


/***/ }),

/***/ "./node_modules/party-js/lib/components/spline.js":
/*!********************************************************!*\
  !*** ./node_modules/party-js/lib/components/spline.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Spline = void 0;
var math_1 = __webpack_require__(/*! ../systems/math */ "./node_modules/party-js/lib/systems/math.js");
/**
 * Represents a spline that can be used to continueously evaluate a function
 * between keys. The base implementation is kept generic, so the functionality
 * can easily be implemented for similar constructs, such as gradients.
 */
var Spline = /** @class */ (function () {
    /**
     * Creates a new spline instance, using the specified keys.
     * Note that you have to pass at least one key.
     */
    function Spline() {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        if (keys.length === 0) {
            throw new Error("Splines require at least one key.");
        }
        if (Array.isArray(keys[0])) {
            throw new Error("You are trying to pass an array to the spline constructor, which is not supported. " +
                "Try to spread the array into the constructor instead.");
        }
        this.keys = keys;
    }
    /**
     * Evaluates the spline at the given time.
     */
    Spline.prototype.evaluate = function (time) {
        if (this.keys.length === 0) {
            throw new Error("Attempt to evaluate a spline with no keys.");
        }
        if (this.keys.length === 1) {
            // The spline only contains one key, therefore is constant.
            return this.keys[0].value;
        }
        // Sort the keys and figure out the first key above the passed time.
        var ascendingKeys = this.keys.sort(function (a, b) { return a.time - b.time; });
        var upperKeyIndex = ascendingKeys.findIndex(function (g) { return g.time > time; });
        // If the found index is either 0 or -1, the specified time falls out
        // of the range of the supplied keys. In that case, the value of the
        // nearest applicant key is returned.
        if (upperKeyIndex === 0) {
            return ascendingKeys[0].value;
        }
        if (upperKeyIndex === -1) {
            return ascendingKeys[ascendingKeys.length - 1].value;
        }
        // Otherwise, find the bounding keys, and extrapolate the time between
        // the two. This is then used to interpolate between the two keys,
        // using the provided implementation.
        var lowerKey = ascendingKeys[upperKeyIndex - 1];
        var upperKey = ascendingKeys[upperKeyIndex];
        var containedTime = math_1.invlerp(lowerKey.time, upperKey.time, time);
        return this.interpolate(lowerKey.value, upperKey.value, containedTime);
    };
    return Spline;
}());
exports.Spline = Spline;


/***/ }),

/***/ "./node_modules/party-js/lib/components/vector.js":
/*!********************************************************!*\
  !*** ./node_modules/party-js/lib/components/vector.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vector = void 0;
var math_1 = __webpack_require__(/*! ../systems/math */ "./node_modules/party-js/lib/systems/math.js");
/**
 * Represents a structure used to process vectors.
 *
 * @remarks
 * Note that the operations in this class will **not** modify the original vector,
 * except for the property assignments. This is to ensure that vectors are not
 * unintentionally modified.
 *
 * @example
 * ```ts
 * const vectorA = new Vector(1, 3, 5);
 * const vectorB = new Vector(2, 3, 1);
 * const vectorC = vectorA.add(vectorB); // (3, 6, 6)
 * ```
 */
var Vector = /** @class */ (function () {
    /**
     * Creates a new vector with optional x-, y-, and z-components.
     * Omitted components are defaulted to 0.
     */
    function Vector(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.values = new Float32Array(3);
        this.xyz = [x, y, z];
    }
    Object.defineProperty(Vector.prototype, "x", {
        /**
         * Returns the x-component of the vector.
         */
        get: function () {
            return this.values[0];
        },
        /**
         * Modifies the x-component of the vector.
         */
        set: function (value) {
            this.values[0] = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "y", {
        /**
         * Returns the y-component of the vector.
         */
        get: function () {
            return this.values[1];
        },
        /**
         * Modifies the y-component of the vector.
         */
        set: function (value) {
            this.values[1] = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "z", {
        /**
         * Returns the z-component of the vector.
         */
        get: function () {
            return this.values[2];
        },
        /**
         * Modifies the z-component of the vector.
         */
        set: function (value) {
            this.values[2] = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "xyz", {
        /**
         * Returns the xyz-components of the vector, bundled as a copied array.
         */
        get: function () {
            return [this.x, this.y, this.z];
        },
        /**
         * Simultaneously updates the xyz-components of the vector, by passing an array.
         */
        set: function (values) {
            this.values[0] = values[0];
            this.values[1] = values[1];
            this.values[2] = values[2];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the length of the vector.
     */
    Vector.prototype.magnitude = function () {
        return Math.sqrt(this.sqrMagnitude());
    };
    /**
     * Returns the squared length of the vector.
     */
    Vector.prototype.sqrMagnitude = function () {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    };
    /**
     * Adds the two vectors together, component-wise.
     */
    Vector.prototype.add = function (vector) {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    };
    /**
     * Subtracts the right vector from the left one, component-wise.
     */
    Vector.prototype.subtract = function (vector) {
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    };
    /**
     * Scales the lefthand vector by another vector or by a number.
     */
    Vector.prototype.scale = function (scalar) {
        if (typeof scalar === "number") {
            return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
        }
        else {
            return new Vector(this.x * scalar.x, this.y * scalar.y, this.z * scalar.z);
        }
    };
    /**
     * Normalizes the vector to a length of 1. If the length was previously zero,
     * then a zero-length vector will be returned.
     */
    Vector.prototype.normalized = function () {
        var magnitude = this.magnitude();
        if (magnitude !== 0) {
            return this.scale(1 / magnitude);
        }
        return new (Vector.bind.apply(Vector, __spreadArray([void 0], this.xyz)))();
    };
    /**
     * Returns the angle between two vectors, in degrees.
     */
    Vector.prototype.angle = function (vector) {
        return (math_1.rad2deg *
            Math.acos((this.x * vector.x + this.y * vector.y + this.z * vector.z) /
                (this.magnitude() * vector.magnitude())));
    };
    /**
     * Returns the cross-product of two vectors.
     */
    Vector.prototype.cross = function (vector) {
        return new Vector(this.y * vector.z - this.z * vector.y, this.z * vector.x - this.x * vector.z, this.x * vector.y - this.y * vector.x);
    };
    /**
     * returns the dot-product of two vectors.
     */
    Vector.prototype.dot = function (vector) {
        return (this.magnitude() *
            vector.magnitude() *
            Math.cos(math_1.deg2rad * this.angle(vector)));
    };
    /**
     * Returns a formatted representation of the vector.
     */
    Vector.prototype.toString = function () {
        return "Vector(" + this.values.join(", ") + ")";
    };
    /**
     * Creates a new vector from an angle, in degrees. Note that the z-component will be zero.
     */
    Vector.from2dAngle = function (angle) {
        return new Vector(Math.cos(angle * math_1.deg2rad), Math.sin(angle * math_1.deg2rad));
    };
    /**
     * Returns (0, 0, 0).
     */
    Vector.zero = new Vector(0, 0, 0);
    /**
     * Returns (1, 1, 1).
     */
    Vector.one = new Vector(1, 1, 1);
    /**
     * Returns (1, 0, 0).
     */
    Vector.right = new Vector(1, 0, 0);
    /**
     * Returns (0, 1, 0).
     */
    Vector.up = new Vector(0, 1, 0);
    /**
     * Returns (0, 0, 1).
     */
    Vector.forward = new Vector(0, 0, 1);
    return Vector;
}());
exports.Vector = Vector;


/***/ }),

/***/ "./node_modules/party-js/lib/containers.js":
/*!*************************************************!*\
  !*** ./node_modules/party-js/lib/containers.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.particleContainer = exports.debugContainer = exports.rootContainer = void 0;
var settings_1 = __webpack_require__(/*! ./settings */ "./node_modules/party-js/lib/settings.js");
var util_1 = __webpack_require__(/*! ./util */ "./node_modules/party-js/lib/util/index.js");
/**
 * The prefix to apply to the containers.
 */
var containerPrefix = "party-js-";
/**
 * Checks if the specified container is 'active', meaning not undefined and attached to the DOM.
 */
function isContainerActive(container) {
    return container && container.isConnected;
}
/**
 * A generic factory method for creating a DOM container. Prefixes the specified name with the
 * container prefix, applies the styles and adds it under the parent.
 */
function makeContainer(name, styles, parent) {
    var container = document.createElement("div");
    container.id = containerPrefix + name;
    Object.assign(container.style, styles);
    return parent.appendChild(container);
}
/**
 * Represents the root container for DOM elements of the library.
 */
exports.rootContainer = new util_1.Lazy(function () {
    return makeContainer("container", {
        position: "fixed",
        left: "0",
        top: "0",
        height: "100vh",
        width: "100vw",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: settings_1.settings.zIndex.toString(),
    }, document.body);
}, isContainerActive);
/**
 * Represents the debugging container of the library, only active if debugging is enabled.
 */
exports.debugContainer = new util_1.Lazy(function () {
    return makeContainer("debug", {
        position: "absolute",
        top: "0",
        left: "0",
        margin: "0.5em",
        padding: "0.5em 1em",
        border: "2px solid rgb(0, 0, 0, 0.2)",
        background: "rgb(0, 0, 0, 0.1)",
        color: "#555",
        fontFamily: "monospace",
    }, exports.rootContainer.current);
}, isContainerActive);
/**
 * Represents the particle container of the library.
 * This is where the particle DOM elements get rendered into.
 */
exports.particleContainer = new util_1.Lazy(function () {
    return makeContainer("particles", {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        perspective: "1200px",
    }, exports.rootContainer.current);
}, isContainerActive);


/***/ }),

/***/ "./node_modules/party-js/lib/debug.js":
/*!********************************************!*\
  !*** ./node_modules/party-js/lib/debug.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Debug = void 0;
var containers_1 = __webpack_require__(/*! ./containers */ "./node_modules/party-js/lib/containers.js");
var settings_1 = __webpack_require__(/*! ./settings */ "./node_modules/party-js/lib/settings.js");
/**
 * Represents a utility module to view debug information inside the DOM.
 * This is disabled by default and needs to manually be enabled by setting
 * the '.enabled' field to true.
 *
 * While disabled, the utility will not fetch stats and update itself.
 */
var Debug = /** @class */ (function () {
    /**
     * Registers a new debug utility that is attached to the given scene.
     *
     * @param scene The scene to attach to.
     */
    function Debug(scene) {
        this.scene = scene;
        /**
         * The rate at which the debug interface should refresh itself (per second).
         */
        this.refreshRate = 8;
        /**
         * The timer counting down to refreshes.
         */
        this.refreshTimer = 1 / this.refreshRate;
    }
    /**
     * Processes a tick event in the interface. This checks if enough has passed to
     * trigger a refresh, and if so, fetches the debug information and updates the DOM.
     *
     * @param delta The time that has elapsed since the last tick.
     */
    Debug.prototype.tick = function (delta) {
        var container = containers_1.debugContainer.current;
        // If the current display style does not match the style inferred from the
        // enabled-state, update it.
        var displayStyle = settings_1.settings.debug ? "block" : "none";
        if (container.style.display !== displayStyle) {
            container.style.display = displayStyle;
        }
        if (!settings_1.settings.debug) {
            // If the interface is not enabled, don't fetch or update any infos.
            return;
        }
        this.refreshTimer += delta;
        if (this.refreshTimer > 1 / this.refreshRate) {
            this.refreshTimer = 0;
            // Update the container with the fetched information joined on line breaks.
            container.innerHTML = this.getDebugInformation(delta).join("<br>");
        }
    };
    /**
     * Fetches the debug information from the specified delta and the linked scene.
     *
     * @returns An array of debugging information, formatted as HTML.
     */
    Debug.prototype.getDebugInformation = function (delta) {
        // Count emitters and particles.
        var emitters = this.scene.emitters.length;
        var particles = this.scene.emitters.reduce(function (acc, cur) { return acc + cur.particles.length; }, 0);
        var infos = [
            "<b>party.js Debug</b>",
            "--------------",
            "FPS: " + Math.round(1 / delta),
            "Emitters: " + emitters,
            "Particles: " + particles,
        ];
        // Emitter informations are formatted using their index, internal timer
        // and total particle count.
        var emitterInfos = this.scene.emitters.map(function (emitter) {
            return [
                // Show the current loop and the total loops.
                "\u2B6F: " + (emitter["currentLoop"] + 1) + "/" + (emitter.options.loops >= 0 ? emitter.options.loops : "∞"),
                // Show the amount of particle contained.
                "\u03A3p: " + emitter.particles.length,
                // Show the internal timer.
                !emitter.isExpired
                    ? "\u03A3t: " + emitter["durationTimer"].toFixed(3) + "s"
                    : "<i>expired</i>",
            ].join(", ");
        });
        infos.push.apply(infos, __spreadArray(["--------------"], emitterInfos));
        return infos;
    };
    return Debug;
}());
exports.Debug = Debug;


/***/ }),

/***/ "./node_modules/party-js/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/party-js/lib/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = exports.forceInit = exports.util = exports.math = exports.random = exports.sources = exports.variation = exports.Emitter = exports.Particle = exports.settings = exports.scene = void 0;
var scene_1 = __webpack_require__(/*! ./scene */ "./node_modules/party-js/lib/scene.js");
var util_1 = __webpack_require__(/*! ./util */ "./node_modules/party-js/lib/util/index.js");
__exportStar(__webpack_require__(/*! ./components */ "./node_modules/party-js/lib/components/index.js"), exports);
__exportStar(__webpack_require__(/*! ./templates */ "./node_modules/party-js/lib/templates/index.js"), exports);
__exportStar(__webpack_require__(/*! ./systems/shapes */ "./node_modules/party-js/lib/systems/shapes.js"), exports);
__exportStar(__webpack_require__(/*! ./systems/modules */ "./node_modules/party-js/lib/systems/modules.js"), exports);
// Create the lazy-initializing scene.
exports.scene = new util_1.Lazy(function () {
    // The library requires the use of the DOM, hence it cannot run in non-browser environments.
    if (typeof document === "undefined" || typeof window === "undefined") {
        throw new Error("It seems like you are trying to run party.js in a non-browser-like environment, which is not supported.");
    }
    return new scene_1.Scene();
});
var settings_1 = __webpack_require__(/*! ./settings */ "./node_modules/party-js/lib/settings.js");
Object.defineProperty(exports, "settings", ({ enumerable: true, get: function () { return settings_1.settings; } }));
var particle_1 = __webpack_require__(/*! ./particles/particle */ "./node_modules/party-js/lib/particles/particle.js");
Object.defineProperty(exports, "Particle", ({ enumerable: true, get: function () { return particle_1.Particle; } }));
var emitter_1 = __webpack_require__(/*! ./particles/emitter */ "./node_modules/party-js/lib/particles/emitter.js");
Object.defineProperty(exports, "Emitter", ({ enumerable: true, get: function () { return emitter_1.Emitter; } }));
exports.variation = __webpack_require__(/*! ./systems/variation */ "./node_modules/party-js/lib/systems/variation.js");
exports.sources = __webpack_require__(/*! ./systems/sources */ "./node_modules/party-js/lib/systems/sources.js");
exports.random = __webpack_require__(/*! ./systems/random */ "./node_modules/party-js/lib/systems/random.js");
exports.math = __webpack_require__(/*! ./systems/math */ "./node_modules/party-js/lib/systems/math.js");
exports.util = __webpack_require__(/*! ./util */ "./node_modules/party-js/lib/util/index.js");
/**
 * Forces the initialization of the otherwise lazy scene.
 */
function forceInit() {
    exports.scene.current;
}
exports.forceInit = forceInit;
exports["default"] = __webpack_require__(/*! ./ */ "./node_modules/party-js/lib/index.js");


/***/ }),

/***/ "./node_modules/party-js/lib/particles/emitter.js":
/*!********************************************************!*\
  !*** ./node_modules/party-js/lib/particles/emitter.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Emitter = void 0;
var vector_1 = __webpack_require__(/*! ../components/vector */ "./node_modules/party-js/lib/components/vector.js");
var settings_1 = __webpack_require__(/*! ../settings */ "./node_modules/party-js/lib/settings.js");
var variation_1 = __webpack_require__(/*! ../systems/variation */ "./node_modules/party-js/lib/systems/variation.js");
var config_1 = __webpack_require__(/*! ../util/config */ "./node_modules/party-js/lib/util/config.js");
var options_1 = __webpack_require__(/*! ./options */ "./node_modules/party-js/lib/particles/options/index.js");
var particle_1 = __webpack_require__(/*! ./particle */ "./node_modules/party-js/lib/particles/particle.js");
/**
 * Represents an emitter that is responsible for spawning and updating particles.
 *
 * Particles themselves are just data-holders, with the system acting upon them and
 * modifying them. The modifications are done mainly via modules, that use the
 * particle's data together with some function to apply temporal transitions.
 *
 * @see Particle
 * @see ParticleModifierModule
 */
var Emitter = /** @class */ (function () {
    /**
     * Creates a new emitter, using default options.
     */
    function Emitter(options) {
        /**
         * The particles currently contained within the system.
         */
        this.particles = [];
        this.currentLoop = 0; // The current loop index.
        this.durationTimer = 0; // Measures the current runtime duration, to allow loops to reset.
        this.emissionTimer = 0; // Measures the current emission timer, to allow spawning particles in intervals.
        this.attemptedBurstIndices = []; // The indices of the particle bursts that were attempted this loop.
        this.options = config_1.overrideDefaults(options_1.getDefaultEmitterOptions(), options === null || options === void 0 ? void 0 : options.emitterOptions);
        this.emission = config_1.overrideDefaults(options_1.getDefaultEmissionOptions(), options === null || options === void 0 ? void 0 : options.emissionOptions);
        this.renderer = config_1.overrideDefaults(options_1.getDefaultRendererOptions(), options === null || options === void 0 ? void 0 : options.rendererOptions);
    }
    Object.defineProperty(Emitter.prototype, "isExpired", {
        /**
         * Checks if the emitter is already expired and can be removed.
         * Expired emitters do not emit new particles.
         */
        get: function () {
            return (this.options.loops >= 0 && this.currentLoop >= this.options.loops);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Emitter.prototype, "canRemove", {
        /**
         * Checks if the emitter can safely be removed.
         * This is true if no more particles are active.
         */
        get: function () {
            return this.particles.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Clears all particles inside the emitter.
     *
     * @returns The number of cleared particles.
     */
    Emitter.prototype.clearParticles = function () {
        return this.particles.splice(0).length;
    };
    /**
     * Processes a tick of the emitter, using the elapsed time.
     *
     * @remarks
     * This handles a few things, namely:
     * - Incrementing the duration timer and potentially incrementing the loop.
     * - Handling particle bursts & emissions.
     * - Despawning particles conditionally.
     *
     * @param delta The time, in seconds, passed since the last tick.
     */
    Emitter.prototype.tick = function (delta) {
        if (!this.isExpired) {
            this.durationTimer += delta;
            if (this.durationTimer >= this.options.duration) {
                this.currentLoop++;
                // To start a new loop, the duration timer and attempted bursts are reset.
                this.durationTimer = 0;
                this.attemptedBurstIndices = [];
            }
            // We need to check the expiry again, in case the added loop or duration changed something.
            if (!this.isExpired) {
                // Iterate over the bursts, attempting to execute them if the time is ready.
                var burstIndex = 0;
                for (var _i = 0, _a = this.emission.bursts; _i < _a.length; _i++) {
                    var burst = _a[_i];
                    if (burst.time <= this.durationTimer) {
                        // Has the burst already been attempted? If not ...
                        if (!this.attemptedBurstIndices.includes(burstIndex)) {
                            // Perform the burst, emitting a variable amount of particles.
                            var count = variation_1.evaluateVariation(burst.count);
                            for (var i = 0; i < count; i++) {
                                this.emitParticle();
                            }
                            // Mark the burst as attempted.
                            this.attemptedBurstIndices.push(burstIndex);
                        }
                    }
                    burstIndex++;
                }
                // Handle the 'emission over time'. By using a while-loop instead of a simple
                // if-condition, we take high deltas into account, and ensure that the correct
                // number of particles will consistently be emitted.
                this.emissionTimer += delta;
                var delay = 1 / this.emission.rate;
                while (this.emissionTimer > delay) {
                    this.emissionTimer -= delay;
                    this.emitParticle();
                }
            }
        }
        var _loop_1 = function (i) {
            var particle = this_1.particles[i];
            this_1.tickParticle(particle, delta);
            // Particles should be despawned (i.e. removed from the collection) if any of
            // the despawning rules apply to them.
            if (this_1.options.despawningRules.some(function (rule) { return rule(particle); })) {
                this_1.particles.splice(i, 1);
            }
        };
        var this_1 = this;
        for (var i = this.particles.length - 1; i >= 0; i--) {
            _loop_1(i);
        }
    };
    /**
     * Performs an internal tick for the particle.
     *
     * @remarks
     * This method controls the particle's lifetime, location and velocity, according
     * to the elapsed delta and the configuration. Additionally, each of the emitter's
     * modules is applied to the particle.
     *
     * @param particle The particle to apply the tick for.
     * @param delta The time, in seconds, passed since the last tick.
     */
    Emitter.prototype.tickParticle = function (particle, delta) {
        particle.lifetime -= delta;
        if (this.options.useGravity) {
            // Apply gravitational acceleration to the particle.
            particle.velocity = particle.velocity.add(vector_1.Vector.up.scale(settings_1.settings.gravity * delta));
        }
        // Apply the particle's velocity to its location.
        particle.location = particle.location.add(particle.velocity.scale(delta));
        // Apply the modules to the particle.
        for (var _i = 0, _a = this.options.modules; _i < _a.length; _i++) {
            var moduleFunction = _a[_i];
            moduleFunction(particle);
        }
    };
    /**
     * Emits a particle using the registered settings.
     * Also may despawn a particle if the maximum number of particles is exceeded.
     */
    Emitter.prototype.emitParticle = function () {
        var particle = new particle_1.Particle({
            location: this.emission.sourceSampler(),
            lifetime: variation_1.evaluateVariation(this.emission.initialLifetime),
            velocity: vector_1.Vector.from2dAngle(variation_1.evaluateVariation(this.emission.angle)).scale(variation_1.evaluateVariation(this.emission.initialSpeed)),
            size: variation_1.evaluateVariation(this.emission.initialSize),
            rotation: variation_1.evaluateVariation(this.emission.initialRotation),
            color: variation_1.evaluateVariation(this.emission.initialColor),
        });
        this.particles.push(particle);
        // Ensure that no more particles than 'maxParticles' can exist.
        if (this.particles.length > this.options.maxParticles) {
            this.particles.shift();
        }
        return particle;
    };
    return Emitter;
}());
exports.Emitter = Emitter;


/***/ }),

/***/ "./node_modules/party-js/lib/particles/options/emissionOptions.js":
/*!************************************************************************!*\
  !*** ./node_modules/party-js/lib/particles/options/emissionOptions.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDefaultEmissionOptions = void 0;
var components_1 = __webpack_require__(/*! ../../components */ "./node_modules/party-js/lib/components/index.js");
var sources_1 = __webpack_require__(/*! ../../systems/sources */ "./node_modules/party-js/lib/systems/sources.js");
/**
 * Returns the default set of emission options.
 */
function getDefaultEmissionOptions() {
    return {
        rate: 10,
        angle: 0,
        bursts: [],
        sourceSampler: sources_1.rectSource(components_1.Rect.zero),
        initialLifetime: 5,
        initialSpeed: 5,
        initialSize: 1,
        initialRotation: components_1.Vector.zero,
        initialColor: components_1.Color.white,
    };
}
exports.getDefaultEmissionOptions = getDefaultEmissionOptions;


/***/ }),

/***/ "./node_modules/party-js/lib/particles/options/emitterOptions.js":
/*!***********************************************************************!*\
  !*** ./node_modules/party-js/lib/particles/options/emitterOptions.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDefaultEmitterOptions = void 0;
var rules_1 = __webpack_require__(/*! ../../util/rules */ "./node_modules/party-js/lib/util/rules.js");
/**
 * Returns the default set of emitter options.
 */
function getDefaultEmitterOptions() {
    return {
        duration: 5,
        loops: 1,
        useGravity: true,
        maxParticles: 300,
        despawningRules: [rules_1.despawningRules.lifetime, rules_1.despawningRules.bounds],
        modules: [],
    };
}
exports.getDefaultEmitterOptions = getDefaultEmitterOptions;


/***/ }),

/***/ "./node_modules/party-js/lib/particles/options/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/party-js/lib/particles/options/index.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./emitterOptions */ "./node_modules/party-js/lib/particles/options/emitterOptions.js"), exports);
__exportStar(__webpack_require__(/*! ./emissionOptions */ "./node_modules/party-js/lib/particles/options/emissionOptions.js"), exports);
__exportStar(__webpack_require__(/*! ./renderOptions */ "./node_modules/party-js/lib/particles/options/renderOptions.js"), exports);


/***/ }),

/***/ "./node_modules/party-js/lib/particles/options/renderOptions.js":
/*!**********************************************************************!*\
  !*** ./node_modules/party-js/lib/particles/options/renderOptions.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDefaultRendererOptions = void 0;
/**
 * Returns the default set of renderer options.
 */
function getDefaultRendererOptions() {
    return {
        shapeFactory: "square",
        applyColor: defaultApplyColor,
        applyOpacity: defaultApplyOpacity,
        applyLighting: defaultApplyLighting,
        applyTransform: defaultApplyTransform,
    };
}
exports.getDefaultRendererOptions = getDefaultRendererOptions;
/**
 * Applies the specified color to the element.
 *
 * @remarks
 * This function is aware of the element's node type:
 * - `div` elements have their `background` set.
 * - `svg` elements have their `fill` and `color` set.
 * - Other elements have their `color` set.
 */
function defaultApplyColor(color, element) {
    var hex = color.toHex();
    // Note that by default, HTML node names are uppercase.
    switch (element.nodeName.toLowerCase()) {
        case "div":
            element.style.background = hex;
            break;
        case "svg":
            element.style.fill = element.style.color = hex;
            break;
        default:
            element.style.color = hex;
            break;
    }
}
/**
 * Applies the specified opacity to the element.
 */
function defaultApplyOpacity(opacity, element) {
    element.style.opacity = opacity.toString();
}
/**
 * Applies the specified lighting to the element as a brightness filter.
 *
 * @remarks
 * This function assumes an ambient light with intensity 0.5, and that the
 * particle should be lit from both sides. The brightness filter can exceed 1,
 * to give the particles a "glossy" feel.
 */
function defaultApplyLighting(lighting, element) {
    element.style.filter = "brightness(" + (0.5 + Math.abs(lighting)) + ")";
}
/**
 * Applies the specified transform to the element as a 3D CSS transform.
 * Also takes into account the current window scroll, to make sure that particles are
 * rendered inside of the fixed container.
 */
function defaultApplyTransform(particle, element) {
    element.style.transform =
        // Make sure to take window scrolling into account.
        "translateX(" + (particle.location.x - window.scrollX).toFixed(3) + "px) " +
            ("translateY(" + (particle.location.y - window.scrollY).toFixed(3) + "px) ") +
            ("translateZ(" + particle.location.z.toFixed(3) + "px) ") +
            ("rotateX(" + particle.rotation.x.toFixed(3) + "deg) ") +
            ("rotateY(" + particle.rotation.y.toFixed(3) + "deg) ") +
            ("rotateZ(" + particle.rotation.z.toFixed(3) + "deg) ") +
            ("scale(" + particle.size.toFixed(3) + ")");
}


/***/ }),

/***/ "./node_modules/party-js/lib/particles/particle.js":
/*!*********************************************************!*\
  !*** ./node_modules/party-js/lib/particles/particle.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Particle = void 0;
var components_1 = __webpack_require__(/*! ../components */ "./node_modules/party-js/lib/components/index.js");
var config_1 = __webpack_require__(/*! ../util/config */ "./node_modules/party-js/lib/util/config.js");
/**
 * Represents an emitted particle.
 */
var Particle = /** @class */ (function () {
    /**
     * Creates a new particle instance through the specified options.
     */
    function Particle(options) {
        var populatedOptions = config_1.overrideDefaults({
            lifetime: 0,
            size: 1,
            location: components_1.Vector.zero,
            rotation: components_1.Vector.zero,
            velocity: components_1.Vector.zero,
            color: components_1.Color.white,
            opacity: 1,
        }, options);
        // Generate a symbolic ID.
        this.id = Symbol();
        // Assign various properties, together with some initials for later reference.
        this.size = this.initialSize = populatedOptions.size;
        this.lifetime = this.initialLifetime = populatedOptions.lifetime;
        this.rotation = this.initialRotation = populatedOptions.rotation;
        this.location = populatedOptions.location;
        this.velocity = populatedOptions.velocity;
        this.color = populatedOptions.color;
        this.opacity = populatedOptions.opacity;
    }
    return Particle;
}());
exports.Particle = Particle;


/***/ }),

/***/ "./node_modules/party-js/lib/particles/renderer.js":
/*!*********************************************************!*\
  !*** ./node_modules/party-js/lib/particles/renderer.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Renderer = void 0;
var __1 = __webpack_require__(/*! .. */ "./node_modules/party-js/lib/index.js");
var vector_1 = __webpack_require__(/*! ../components/vector */ "./node_modules/party-js/lib/components/vector.js");
var containers_1 = __webpack_require__(/*! ../containers */ "./node_modules/party-js/lib/containers.js");
var shapes_1 = __webpack_require__(/*! ../systems/shapes */ "./node_modules/party-js/lib/systems/shapes.js");
var util_1 = __webpack_require__(/*! ../util */ "./node_modules/party-js/lib/util/index.js");
/**
 * Represents a renderer used to draw particles to the DOM via HTML
 * elements. Additionally, it is responsible for purging the elements
 * of destroyed particles from the DOM.
 */
var Renderer = /** @class */ (function () {
    function Renderer() {
        /**
         * The lookup of elements currently handled by the renderer, with the
         * particle ID as key and a HTMLElement as the value.
         */
        this.elements = new Map();
        /**
         * The normalized direction the light comes from.
         */
        this.light = new vector_1.Vector(0, 0, 1);
        /**
         * Whether or not the renderer should actually draw particles.
         */
        this.enabled = true;
        // Respect that users might prefer reduced motion.
        // See: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
        this.enabled =
            !__1.settings.respectReducedMotion ||
                !window.matchMedia("(prefers-reduced-motion)").matches;
    }
    /**
     * Begins a new render block. During the rendering phase, a list of rendered particles
     * is tracked, so that stale particles can be removed later.
     */
    Renderer.prototype.begin = function () {
        this.renderedParticles = [];
    };
    /**
     * Terminates an existing render block. This checks which particles were rendered
     * during the block and purges all unused HTMLElements from the DOM.
     *
     * @returns The amount of particles that were rendered.
     */
    Renderer.prototype.end = function () {
        var it = this.elements.keys();
        var result = it.next();
        while (!result.done) {
            var id = result.value;
            if (!this.renderedParticles.includes(id)) {
                this.elements.get(id).remove();
                this.elements.delete(id);
            }
            result = it.next();
        }
        return this.renderedParticles.length;
    };
    /**
     * Renders an individual particle to the DOM. If the particle is rendered for the first
     * time, a HTMLElement will be created using the emitter's render settings.
     *
     * @param particle The particle to be rendered.
     * @param emitter The system containing the particle.
     */
    Renderer.prototype.renderParticle = function (particle, emitter) {
        if (!this.enabled)
            return;
        var options = emitter.renderer;
        // Ensure that an element for the particle exists.
        var element = this.elements.has(particle.id)
            ? this.elements.get(particle.id)
            : this.createParticleElement(particle, options);
        if (options.applyColor) {
            // If the options offer a coloring method, apply it.
            options.applyColor(particle.color, element);
        }
        if (options.applyOpacity) {
            // If the options offer an opacity modifying method, apply it.
            options.applyOpacity(particle.opacity, element);
        }
        if (options.applyLighting) {
            // If the options offer a lighting method, apply it.
            // Lighting is calculated as a combination of the particle's normal
            // direction and the lighting direction.
            var normal = util_1.rotationToNormal(particle.rotation);
            var lightingCoefficient = normal.dot(this.light);
            options.applyLighting(lightingCoefficient, element);
        }
        if (options.applyTransform) {
            // If the options offer a transformation method, apply it.
            // This ensures the particle is rendered at the correct position with the correct rotation.
            options.applyTransform(particle, element);
        }
        // Mark the particle as rendered.
        this.renderedParticles.push(particle.id);
    };
    /**
     * Creates the HTMLElement for a particle that does not have one already.
     */
    Renderer.prototype.createParticleElement = function (particle, options) {
        // Resolve the element returned from the factory.
        var resolved = shapes_1.resolveShapeFactory(options.shapeFactory);
        // Clone the node to ensure we do not break existing elements.
        var element = resolved.cloneNode(true);
        // Ensure that the elements can be "stacked" ontop of eachother.
        element.style.position = "absolute";
        // Register the new element in the map, while appending the new element to the DOM.
        this.elements.set(particle.id, containers_1.particleContainer.current.appendChild(element));
        return element;
    };
    return Renderer;
}());
exports.Renderer = Renderer;


/***/ }),

/***/ "./node_modules/party-js/lib/scene.js":
/*!********************************************!*\
  !*** ./node_modules/party-js/lib/scene.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Scene = void 0;
var debug_1 = __webpack_require__(/*! ./debug */ "./node_modules/party-js/lib/debug.js");
var emitter_1 = __webpack_require__(/*! ./particles/emitter */ "./node_modules/party-js/lib/particles/emitter.js");
var renderer_1 = __webpack_require__(/*! ./particles/renderer */ "./node_modules/party-js/lib/particles/renderer.js");
/**
 * Represents a scene that contains emitters and their particles.
 *
 * Scenes are responsible for spawning and updating emitters, and
 * removing them once they are done.
 *
 * Scenes are not explicitely present in the DOM as an element, only
 * the contained particles are.
 */
var Scene = /** @class */ (function () {
    /**
     * Initializes a new scene and starts the ticking job.
     */
    function Scene() {
        /**
         * The emitters currently present in the scene.
         */
        this.emitters = [];
        /**
         * The debug instance associated with the scene.
         */
        this.debug = new debug_1.Debug(this);
        /**
         * The renderer associated with the scene.
         */
        this.renderer = new renderer_1.Renderer();
        /**
         * The ID of the currently scheduled tick.
         */
        this.scheduledTickId = undefined;
        /**
         * The timestamp of the last tick, used to calculate deltas.
         *
         * @initialValue `performance.now()` (time origin)
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp
         */
        this.lastTickTimestamp = performance.now();
        // Ensure the scene context is preserved on the tick.
        this.tick = this.tick.bind(this);
        this.scheduleTick();
    }
    /**
     * Creates and returns a new, default emitter object.
     */
    Scene.prototype.createEmitter = function (options) {
        var emitter = new emitter_1.Emitter(options);
        this.emitters.push(emitter);
        return emitter;
    };
    /**
     * Clears all emitters from the scene.
     *
     * @returns The number of cleared emitters.
     */
    Scene.prototype.clearEmitters = function () {
        return this.emitters.splice(0).length;
    };
    /**
     * Clears the particles from all emitters in the scene.
     * Note that this does not remove the actual emitter objects though.
     *
     * @returns The number of cleared particles.
     */
    Scene.prototype.clearParticles = function () {
        return this.emitters.reduce(function (sum, emitter) { return sum + emitter.clearParticles(); }, 0);
    };
    /**
     * Schedules a tick in the scene.
     */
    Scene.prototype.scheduleTick = function () {
        this.scheduledTickId = window.requestAnimationFrame(this.tick);
    };
    /**
     * Cancels a pending tick operation.
     */
    Scene.prototype.cancelTick = function () {
        window.cancelAnimationFrame(this.scheduledTickId);
    };
    /**
     * Processes a tick cycle, updating all emitters contained in the scene.
     * This is handled as a JS animation frame event, hence the passed timestamp.
     *
     * @remarks
     * The emitter ticking and particle rendering is run using try-catch blocks,
     * to ensure that we can recover from potential errors.
     *
     * @param timestamp The current timestamp of the animation frame.
     */
    Scene.prototype.tick = function (timestamp) {
        // Calculate the elapsed delta and convert it to seconds.
        var delta = (timestamp - this.lastTickTimestamp) / 1000;
        try {
            // Perform ticks for all the emitters in the scene.
            for (var i = 0; i < this.emitters.length; i++) {
                var emitter = this.emitters[i];
                emitter.tick(delta);
                if (emitter.isExpired && emitter.canRemove) {
                    this.emitters.splice(i--, 1);
                }
            }
        }
        catch (error) {
            console.error("An error occurred while updating the scene's emitters:\n\"" + error + "\"");
        }
        try {
            // Instruct the renderer to draw the particles of all systems.
            this.renderer.begin();
            for (var _i = 0, _a = this.emitters; _i < _a.length; _i++) {
                var emitter = _a[_i];
                for (var _b = 0, _c = emitter.particles; _b < _c.length; _b++) {
                    var particle = _c[_b];
                    this.renderer.renderParticle(particle, emitter);
                }
            }
            this.renderer.end();
        }
        catch (error) {
            console.error("An error occurred while rendering the scene's particles:\n\"" + error + "\"");
        }
        // Perform a tick on the debug interface
        this.debug.tick(delta);
        // Save the timestamp as the last tick timestamp and schedule a new tick.
        this.lastTickTimestamp = timestamp;
        this.scheduleTick();
    };
    return Scene;
}());
exports.Scene = Scene;


/***/ }),

/***/ "./node_modules/party-js/lib/settings.js":
/*!***********************************************!*\
  !*** ./node_modules/party-js/lib/settings.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.settings = void 0;
exports.settings = {
    debug: false,
    gravity: 800,
    zIndex: 99999,
    respectReducedMotion: true,
};


/***/ }),

/***/ "./node_modules/party-js/lib/systems/math.js":
/*!***************************************************!*\
  !*** ./node_modules/party-js/lib/systems/math.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.approximately = exports.clamp = exports.invlerp = exports.slerp = exports.lerp = exports.epsilon = exports.rad2deg = exports.deg2rad = void 0;
/**
 * Constant coefficient to convert degrees to radians.
 */
exports.deg2rad = Math.PI / 180;
/**
 * Constant coefficient to convert radians to degrees.
 */
exports.rad2deg = 180 / Math.PI;
/**
 * A small value to approximately compare values.
 */
exports.epsilon = 0.000001;
/**
 * Linearly interpolates between a and b by t.
 */
function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}
exports.lerp = lerp;
/**
 * Smoothly interpolates between a and b by t (using cosine interpolation).
 */
function slerp(a, b, t) {
    return lerp(a, b, (1 - Math.cos(t * Math.PI)) / 2);
}
exports.slerp = slerp;
/**
 * Inversely lerps v between a and b to find t.
 */
function invlerp(a, b, v) {
    return (v - a) / (b - a);
}
exports.invlerp = invlerp;
/**
 * Clamps the specified value between a minimum and a maximum.
 */
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
exports.clamp = clamp;
/**
 * Checks if a is approximately equal to b.
 */
function approximately(a, b) {
    return Math.abs(a - b) < exports.epsilon;
}
exports.approximately = approximately;


/***/ }),

/***/ "./node_modules/party-js/lib/systems/modules.js":
/*!******************************************************!*\
  !*** ./node_modules/party-js/lib/systems/modules.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleBuilder = void 0;
var components_1 = __webpack_require__(/*! ../components */ "./node_modules/party-js/lib/components/index.js");
/**
 * Represents a builder for particle modules. Returns an evaluatable module
 * function, that can be consumed by emitters.
 *
 * @remarks
 * Not all properties can be driven. TypeScript will validate this at compile time,
 * but no internal validation is performed due to performance reasons. Also, note
 * that the driving factor is "lifetime" by default.
 *
 * @example
 * ```ts
 * new ModuleBuilder()
 *     .drive("size")
 *     .by((t) => t * 2)
 *     .through("lifetime")
 *     .build();
 * ```
 */
var ModuleBuilder = /** @class */ (function () {
    function ModuleBuilder() {
        /**
         * The factor driving the built function.
         *
         * @defaultValue "lifetime"
         */
        this.factor = "lifetime";
        this.isRelative = false;
    }
    /**
     * Specifies the key in the particle that should be driven.
     *
     * @remarks
     * Note that not all of a particle's properties are drivable through modules. If you
     * need full control of a particle inside of a module, you can use a module function directly.
     *
     * @returns The chained builder instance.
     */
    ModuleBuilder.prototype.drive = function (key) {
        this.driverKey = key;
        return this;
    };
    /**
     * Specifies the factor to drive the evaluated value by. Supports "lifetime" and "size".
     *
     * @returns The chained builder instance.
     */
    ModuleBuilder.prototype.through = function (factor) {
        this.factor = factor;
        return this;
    };
    /**
     * Specifies the value to drive the module behaviour by. This can be a constant,
     * a spline or an evaluable function. Note that in the last case, the driving
     * factor is passed as a parameter.
     *
     * @returns The chained builder instance.
     */
    ModuleBuilder.prototype.by = function (driver) {
        this.driverValue = driver;
        return this;
    };
    /**
     * Specifies that the module function is supposed to act relative to the
     * properties initial value.
     *
     * @remarks
     * Note that this is only possible if an "initial*" property exists on the
     * particle object. The operation applied to the initial and new value
     * is dependant on their type:
     * - `Vector`: Both vectors are added.
     * - `number`: Both numbers are multiplied.
     *
     * For more advanced relative customizations, consider using the particle
     * object in the driver value function instead, like:
     * ```ts
     * .by((t, p) => p.initialSize + t * 2);
     * ```
     */
    ModuleBuilder.prototype.relative = function (isRelative) {
        if (isRelative === void 0) { isRelative = true; }
        this.isRelative = isRelative;
        return this;
    };
    /**
     * Consumes the builder and returns an evaluatable module function.
     *
     * @remarks
     * Note that you need to specify the driving key and value, otherwise an error
     * will be thrown.
     */
    ModuleBuilder.prototype.build = function () {
        var _this = this;
        if (typeof this.driverKey === "undefined") {
            throw new Error("No driving key was provided in the module builder. Did you forget a '.drive()' call?");
        }
        if (typeof this.driverValue === "undefined") {
            throw new Error("No driving value was provided in the module builder. Did you forget a '.through()' call?");
        }
        return function (particle) {
            updateDrivenProperty(particle, _this.driverKey, evaluateModuleDriver(_this.driverValue, calculateModuleFactor(_this.factor, particle), particle), _this.isRelative);
        };
    };
    return ModuleBuilder;
}());
exports.ModuleBuilder = ModuleBuilder;
/**
 * Evaluates the module driver using a specified factor.
 */
function evaluateModuleDriver(driver, factor, particle) {
    if (typeof driver === "object" && "evaluate" in driver) {
        return driver.evaluate(factor);
    }
    if (typeof driver === "function") {
        return driver(factor, particle);
    }
    return driver;
}
/**
 * Calculates a module factor using a specified particle as context.
 */
function calculateModuleFactor(factor, particle) {
    switch (factor) {
        case "lifetime":
            return particle.initialLifetime - particle.lifetime;
        case "relativeLifetime":
            return ((particle.initialLifetime - particle.lifetime) /
                particle.initialLifetime);
        case "size":
            return particle.size;
        default:
            throw new Error("Invalid driving factor '" + factor + "'.");
    }
}
/**
 * Updates a driven property of a particle using the specified value.
 *
 * @remarks
 * If the operation is marked as relative, the function infers the new value
 * through the value's type. Note that relative properties must have a
 * corresponding "initial*" value in the particle's properties.
 */
function updateDrivenProperty(particle, key, value, relative) {
    if (relative === void 0) { relative = false; }
    if (!relative) {
        particle[key] = value;
    }
    else {
        var initial = particle["initial" + key[0].toUpperCase() + key.substr(1)];
        if (typeof initial === "undefined") {
            throw new Error("Unable to use relative chaining with key '" + key + "'; no initial value exists.");
        }
        if (value instanceof components_1.Vector) {
            updateDrivenProperty(particle, key, initial.add(value));
        }
        else if (typeof value === "number") {
            updateDrivenProperty(particle, key, initial * value);
        }
        else {
            throw new Error("Unable to use relative chaining with particle key '" + key + "'; no relative operation for '" + value + "' could be inferred.");
        }
    }
}


/***/ }),

/***/ "./node_modules/party-js/lib/systems/random.js":
/*!*****************************************************!*\
  !*** ./node_modules/party-js/lib/systems/random.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomInsideCircle = exports.randomInsideRect = exports.randomUnitVector = exports.pick = exports.randomRange = void 0;
var components_1 = __webpack_require__(/*! ../components */ "./node_modules/party-js/lib/components/index.js");
var math_1 = __webpack_require__(/*! ./math */ "./node_modules/party-js/lib/systems/math.js");
/**
 * Returns a random value from min to max.
 */
function randomRange(min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    return math_1.lerp(min, max, Math.random());
}
exports.randomRange = randomRange;
/**
 * Picks a random element from the specified array. Returns undefined if the array is empty.
 */
function pick(arr) {
    return arr.length === 0
        ? undefined
        : arr[Math.floor(Math.random() * arr.length)];
}
exports.pick = pick;
/**
 * Returns a random unit vector.
 */
function randomUnitVector() {
    var theta = randomRange(0, 2 * Math.PI);
    var z = randomRange(-1, 1);
    return new components_1.Vector(Math.sqrt(1 - z * z) * Math.cos(theta), Math.sqrt(1 - z * z) * Math.sin(theta), z);
}
exports.randomUnitVector = randomUnitVector;
/**
 * Returns a random point inside the given rect.
 */
function randomInsideRect(rect) {
    return new components_1.Vector(rect.x + randomRange(0, rect.width), rect.y + randomRange(0, rect.height));
}
exports.randomInsideRect = randomInsideRect;
function randomInsideCircle(circle) {
    var theta = randomRange(0, 2 * Math.PI);
    var radius = randomRange(0, circle.radius);
    return new components_1.Vector(circle.x + Math.cos(theta) * radius, circle.y + Math.sin(theta) * radius);
}
exports.randomInsideCircle = randomInsideCircle;


/***/ }),

/***/ "./node_modules/party-js/lib/systems/shapes.js":
/*!*****************************************************!*\
  !*** ./node_modules/party-js/lib/systems/shapes.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveShapeFactory = exports.resolvableShapes = void 0;
var variation_1 = __webpack_require__(/*! ./variation */ "./node_modules/party-js/lib/systems/variation.js");
/**
 * Represents the lookup that maps resolveable element keys to their HTML strings.
 *
 * @remarks
 * The default shapes are made to fit inside a dimension of 10x10 pixels, except
 * the 'star' shape, which exceeds it slightly.
 */
exports.resolvableShapes = {
    square: "<div style=\"height: 10px; width: 10px;\"></div>",
    rectangle: "<div style=\"height: 6px; width: 10px;\"></div>",
    circle: "<svg viewBox=\"0 0 2 2\" width=\"10\" height=\"10\"><circle cx=\"1\" cy=\"1\" r=\"1\" fill=\"currentColor\"/></svg>",
    roundedSquare: "<div style=\"height: 10px; width: 10px; border-radius: 3px;\"></div>",
    roundedRectangle: "<div style=\"height: 6px; width: 10px; border-radius: 3px;\"></div>",
    star: "<svg viewBox=\"0 0 512 512\" width=\"15\" height=\"15\"><polygon fill=\"currentColor\" points=\"512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 255.898,401.21 416.035,502.431 369.263,318.842\"/></svg>",
};
/**
 * Resolves the specified element factory using the resolvable elements, if needed.
 */
function resolveShapeFactory(factory) {
    // Retrieve the unresolved element from the factory.
    var shape = variation_1.evaluateVariation(factory);
    // If a string is returned, we need to resolve the element. This means
    // looking up the string in the resolver lookup. If the key was not
    // resolvable, we throw an error.
    if (typeof shape === "string") {
        var resolved = exports.resolvableShapes[shape];
        if (!resolved) {
            throw new Error("Failed to resolve shape key '" + shape + "'. Did you forget to add it to the 'resolvableShapes' lookup?");
        }
        // We're in luck, we can resolve the element! We create a dummy <div> element
        // to set the innerHTML of, and return the first element child.
        var dummy = document.createElement("div");
        dummy.innerHTML = resolved;
        return dummy.firstElementChild;
    }
    return shape;
}
exports.resolveShapeFactory = resolveShapeFactory;


/***/ }),

/***/ "./node_modules/party-js/lib/systems/sources.js":
/*!******************************************************!*\
  !*** ./node_modules/party-js/lib/systems/sources.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.circleSource = exports.rectSource = exports.mouseSource = exports.elementSource = exports.dynamicSource = void 0;
var components_1 = __webpack_require__(/*! ../components */ "./node_modules/party-js/lib/components/index.js");
var random_1 = __webpack_require__(/*! ./random */ "./node_modules/party-js/lib/systems/random.js");
/**
 * Dynamically infers a source sampler for the specified source type.
 */
function dynamicSource(source) {
    if (source instanceof HTMLElement) {
        return elementSource(source);
    }
    if (source instanceof components_1.Circle) {
        return circleSource(source);
    }
    if (source instanceof components_1.Rect) {
        return rectSource(source);
    }
    if (source instanceof MouseEvent) {
        return mouseSource(source);
    }
    throw new Error("Cannot infer the source type of '" + source + "'.");
}
exports.dynamicSource = dynamicSource;
/**
 * Creates a sampler to retrieve random points inside a specified HTMLElement.
 */
function elementSource(source) {
    return function () { return random_1.randomInsideRect(components_1.Rect.fromElement(source)); };
}
exports.elementSource = elementSource;
/**
 * Creates a sampler to retrieve the position of a mouse event.
 */
function mouseSource(source) {
    return function () {
        return new components_1.Vector(window.scrollX + source.clientX, window.scrollY + source.clientY);
    };
}
exports.mouseSource = mouseSource;
/**
 * Creates a sampler to retrieve random points inside a specified rectangle.
 */
function rectSource(source) {
    return function () { return random_1.randomInsideRect(source); };
}
exports.rectSource = rectSource;
/**
 * Creates a sampler to retrieve random points inside a specified circle.
 */
function circleSource(source) {
    return function () { return random_1.randomInsideCircle(source); };
}
exports.circleSource = circleSource;


/***/ }),

/***/ "./node_modules/party-js/lib/systems/variation.js":
/*!********************************************************!*\
  !*** ./node_modules/party-js/lib/systems/variation.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.gradientSample = exports.splineSample = exports.skewRelative = exports.skew = exports.range = exports.evaluateVariation = void 0;
var random_1 = __webpack_require__(/*! ./random */ "./node_modules/party-js/lib/systems/random.js");
/**
 * Returns a value instance of a variation.
 */
function evaluateVariation(variation) {
    if (Array.isArray(variation))
        return random_1.pick(variation);
    if (typeof variation === "function")
        return variation();
    return variation;
}
exports.evaluateVariation = evaluateVariation;
/**
 * Creates a variation function that returns a random number from min to max.
 */
function range(min, max) {
    return function () { return random_1.randomRange(min, max); };
}
exports.range = range;
/**
 * Creates a variation function that skews the specified value by a specified, absolute
 * amount. This means that instead of the value itself, a random number that deviates
 * at most by the specified amount is returned.
 *
 * @remarks
 * If you want to skew by a percentage instead, use `skewRelative`.
 */
function skew(value, amount) {
    return function () { return value + random_1.randomRange(-amount, amount); };
}
exports.skew = skew;
/**
 * Creates a variation function that skews the specified value by a specified percentage.
 * This means that instead of the value itself, a random number that deviates by a maximum
 * of the specified percentage is returned.
 */
function skewRelative(value, percentage) {
    return function () { return value * (1 + random_1.randomRange(-percentage, percentage)); };
}
exports.skewRelative = skewRelative;
/**
 * Creates a variation function that returns a random sample from the given spline.
 *
 * @param spline The spline to sample from.
 */
function splineSample(spline) {
    return function () { return spline.evaluate(Math.random()); };
}
exports.splineSample = splineSample;
/**
 * Creates a variation function that returns a random sample from the given gradient.
 *
 * @remarks
 * This function is an alias for the spline variation, since a gradient is just
 * a spline under the hood.
 *
 * @param gradient The gradient to sample from.
 */
function gradientSample(gradient) {
    return splineSample(gradient);
}
exports.gradientSample = gradientSample;


/***/ }),

/***/ "./node_modules/party-js/lib/templates/confetti.js":
/*!*********************************************************!*\
  !*** ./node_modules/party-js/lib/templates/confetti.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.confetti = void 0;
var __1 = __webpack_require__(/*! ../ */ "./node_modules/party-js/lib/index.js");
var components_1 = __webpack_require__(/*! ../components */ "./node_modules/party-js/lib/components/index.js");
var modules_1 = __webpack_require__(/*! ../systems/modules */ "./node_modules/party-js/lib/systems/modules.js");
var random = __webpack_require__(/*! ../systems/random */ "./node_modules/party-js/lib/systems/random.js");
var sources = __webpack_require__(/*! ../systems/sources */ "./node_modules/party-js/lib/systems/sources.js");
var variation = __webpack_require__(/*! ../systems/variation */ "./node_modules/party-js/lib/systems/variation.js");
var util = __webpack_require__(/*! ../util */ "./node_modules/party-js/lib/util/index.js");
/**
 * The standard confetti template.
 *
 * @param source The source to emit the confetti from.
 * @param options The (optional) configuration overrides.
 */
function confetti(source, options) {
    var populated = util.overrideDefaults({
        count: variation.range(20, 40),
        spread: variation.range(35, 45),
        speed: variation.range(300, 600),
        size: variation.skew(1, 0.2),
        rotation: function () { return random.randomUnitVector().scale(180); },
        color: function () { return components_1.Color.fromHsl(random.randomRange(0, 360), 100, 70); },
        modules: [
            new modules_1.ModuleBuilder()
                .drive("size")
                .by(function (t) { return Math.min(1, t * 3); })
                .relative()
                .build(),
            new modules_1.ModuleBuilder()
                .drive("rotation")
                .by(function (t) { return new components_1.Vector(140, 200, 260).scale(t); })
                .relative()
                .build(),
        ],
        shapes: ["square", "circle"],
    }, options);
    var emitter = __1.scene.current.createEmitter({
        emitterOptions: {
            loops: 1,
            duration: 8,
            modules: populated.modules,
        },
        emissionOptions: {
            rate: 0,
            bursts: [{ time: 0, count: populated.count }],
            sourceSampler: sources.dynamicSource(source),
            angle: variation.skew(-90, variation.evaluateVariation(populated.spread)),
            initialLifetime: 8,
            initialSpeed: populated.speed,
            initialSize: populated.size,
            initialRotation: populated.rotation,
            initialColor: populated.color,
        },
        rendererOptions: {
            shapeFactory: populated.shapes,
        },
    });
    return emitter;
}
exports.confetti = confetti;


/***/ }),

/***/ "./node_modules/party-js/lib/templates/index.js":
/*!******************************************************!*\
  !*** ./node_modules/party-js/lib/templates/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./confetti */ "./node_modules/party-js/lib/templates/confetti.js"), exports);
__exportStar(__webpack_require__(/*! ./sparkles */ "./node_modules/party-js/lib/templates/sparkles.js"), exports);


/***/ }),

/***/ "./node_modules/party-js/lib/templates/sparkles.js":
/*!*********************************************************!*\
  !*** ./node_modules/party-js/lib/templates/sparkles.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sparkles = void 0;
var __1 = __webpack_require__(/*! .. */ "./node_modules/party-js/lib/index.js");
var components_1 = __webpack_require__(/*! ../components */ "./node_modules/party-js/lib/components/index.js");
var modules_1 = __webpack_require__(/*! ../systems/modules */ "./node_modules/party-js/lib/systems/modules.js");
var random = __webpack_require__(/*! ../systems/random */ "./node_modules/party-js/lib/systems/random.js");
var sources = __webpack_require__(/*! ../systems/sources */ "./node_modules/party-js/lib/systems/sources.js");
var variation = __webpack_require__(/*! ../systems/variation */ "./node_modules/party-js/lib/systems/variation.js");
var util = __webpack_require__(/*! ../util */ "./node_modules/party-js/lib/util/index.js");
/**
 * The standard sparkles template.
 *
 * @param source The source to emit the sparkles from.
 * @param options The (optional) configuration overrides.
 */
function sparkles(source, options) {
    var populated = util.overrideDefaults({
        lifetime: variation.range(1, 2),
        count: variation.range(10, 20),
        speed: variation.range(100, 200),
        size: variation.range(0.8, 1.8),
        rotation: function () { return new components_1.Vector(0, 0, random.randomRange(0, 360)); },
        color: function () { return components_1.Color.fromHsl(50, 100, random.randomRange(55, 85)); },
        modules: [
            new modules_1.ModuleBuilder()
                .drive("rotation")
                .by(function (t) { return new components_1.Vector(0, 0, 200).scale(t); })
                .relative()
                .build(),
            new modules_1.ModuleBuilder()
                .drive("size")
                .by(new components_1.NumericSpline({ time: 0, value: 0 }, { time: 0.3, value: 1 }, { time: 0.7, value: 1 }, { time: 1, value: 0 }))
                .through("relativeLifetime")
                .relative()
                .build(),
            new modules_1.ModuleBuilder()
                .drive("opacity")
                .by(new components_1.NumericSpline({ time: 0, value: 1 }, { time: 0.5, value: 1 }, { time: 1, value: 0 }))
                .through("relativeLifetime")
                .build(),
        ],
        shapes: "star",
    }, options);
    var emitter = __1.scene.current.createEmitter({
        emitterOptions: {
            loops: 1,
            duration: 3,
            useGravity: false,
            modules: populated.modules,
        },
        emissionOptions: {
            rate: 0,
            bursts: [{ time: 0, count: populated.count }],
            sourceSampler: sources.dynamicSource(source),
            angle: variation.range(0, 360),
            initialLifetime: populated.lifetime,
            initialSpeed: populated.speed,
            initialSize: populated.size,
            initialRotation: populated.rotation,
            initialColor: populated.color,
        },
        rendererOptions: {
            applyLighting: undefined,
            shapeFactory: populated.shapes,
        },
    });
    return emitter;
}
exports.sparkles = sparkles;


/***/ }),

/***/ "./node_modules/party-js/lib/util/config.js":
/*!**************************************************!*\
  !*** ./node_modules/party-js/lib/util/config.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.overrideDefaults = void 0;
/**
 * Replaces the supplied defaults with the properties specified in the overrides.
 * This returns a new object.
 */
function overrideDefaults(defaults, overrides) {
    return Object.assign({}, defaults, overrides);
}
exports.overrideDefaults = overrideDefaults;


/***/ }),

/***/ "./node_modules/party-js/lib/util/index.js":
/*!*************************************************!*\
  !*** ./node_modules/party-js/lib/util/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./config */ "./node_modules/party-js/lib/util/config.js"), exports);
__exportStar(__webpack_require__(/*! ./rotation */ "./node_modules/party-js/lib/util/rotation.js"), exports);
__exportStar(__webpack_require__(/*! ./rules */ "./node_modules/party-js/lib/util/rules.js"), exports);
__exportStar(__webpack_require__(/*! ./lazy */ "./node_modules/party-js/lib/util/lazy.js"), exports);


/***/ }),

/***/ "./node_modules/party-js/lib/util/lazy.js":
/*!************************************************!*\
  !*** ./node_modules/party-js/lib/util/lazy.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Lazy = void 0;
/**
 * A wrapper class to lazily initialize a value.
 * Supports custom factory and predicate methods.
 */
var Lazy = /** @class */ (function () {
    function Lazy(factory, exists) {
        if (exists === void 0) { exists = Lazy.defaultExists; }
        this.factory = factory;
        this.exists = exists;
    }
    Object.defineProperty(Lazy.prototype, "current", {
        /**
         * The current value of the lazy object. Will be initialized, if the 'exists'
         * predicate doesn't match.
         */
        get: function () {
            if (!this.exists(this.value)) {
                this.value = this.factory();
            }
            return this.value;
        },
        enumerable: false,
        configurable: true
    });
    Lazy.defaultExists = function (value) {
        return typeof value !== "undefined";
    };
    return Lazy;
}());
exports.Lazy = Lazy;


/***/ }),

/***/ "./node_modules/party-js/lib/util/rotation.js":
/*!****************************************************!*\
  !*** ./node_modules/party-js/lib/util/rotation.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rotationToNormal = void 0;
var components_1 = __webpack_require__(/*! ../components */ "./node_modules/party-js/lib/components/index.js");
var math_1 = __webpack_require__(/*! ../systems/math */ "./node_modules/party-js/lib/systems/math.js");
/**
 * Converts the specified euler rotation (in degrees) into the corresponding normal vector.
 *
 * @remarks
 * The normal is calculated by placing a (figurative) plane in a coordinate-system's
 * origin, and rotating it by the specified angles. Note that the z-component of the
 * rotation is irrelevant for the normal and can be ignored. Then, two vectors
 * describing the orientation of the plane are calculated. Their cross product
 * denotes the normal vector.
 *
 * @param rotation The euler rotation angles (in degrees) to calculate the normal for.
 */
function rotationToNormal(rotation) {
    var alpha = rotation.x * math_1.deg2rad;
    var beta = rotation.y * math_1.deg2rad;
    var a = new components_1.Vector(Math.cos(beta), 0, Math.sin(beta));
    var b = new components_1.Vector(0, Math.cos(alpha), Math.sin(alpha));
    return a.cross(b);
}
exports.rotationToNormal = rotationToNormal;


/***/ }),

/***/ "./node_modules/party-js/lib/util/rules.js":
/*!*************************************************!*\
  !*** ./node_modules/party-js/lib/util/rules.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.despawningRules = void 0;
/**
 * Contains a set of pre-defined particle despawning rules.
 */
exports.despawningRules = {
    /**
     * A rule that despawns a particle once its lifetime is over.
     */
    lifetime: function (particle) {
        return particle.lifetime <= 0;
    },
    /**
     * A rule that despawns a particle once its y-coordinate is outside of the document.
     */
    bounds: function (particle) {
        // Get document height: https://stackoverflow.com/a/44077777/5507624
        var height = document.documentElement.scrollHeight;
        return particle.location.y > height;
    },
};


/***/ }),

/***/ "./public/less/index.less":
/*!********************************!*\
  !*** ./public/less/index.less ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./public/less/index.less");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


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

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

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

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


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
  } // For old IE

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

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


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

/***/ }),

/***/ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==":
/*!**********************************************************************************************************************************************************!*\
  !*** data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg== ***!
  \**********************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==";

/***/ }),

/***/ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=":
/*!**************************************************************************************************************************************************************************!*\
  !*** data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII= ***!
  \**************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=";

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/***/ ((module) => {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/***/ ((module) => {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/toPropertyKey.js");
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/toPropertyKey.js");
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
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
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/***/ ((module) => {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/***/ ((module) => {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return assertThisInitialized(self);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toArray.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toArray.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");
function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
}
module.exports = _toArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toPrimitive.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toPropertyKey.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/toPrimitive.js");
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/axios/dist/browser/axios.cjs":
/*!***************************************************!*\
  !*** ./node_modules/axios/dist/browser/axios.cjs ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Axios v1.3.3 Copyright (c) 2023 Matt Zabriskie and contributors


function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
};

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  const pattern = '[object FormData]';
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) ||
    toString.call(thing) === pattern ||
    (isFunction(thing.toString) && thing.toString() === pattern)
  );
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : __webpack_require__.g)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    if (reducer(descriptor, name, obj) !== false) {
      reducedDescriptors[name] = descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
};

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  };

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

const DIGIT = '0123456789';

const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};

const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0];
  }

  return str;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  };

  return visit(obj, 0);
};

var utils = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const prototype$1 = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

// eslint-disable-next-line strict
var httpAdapter = null;

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils.isPlainObject(thing) || utils.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils.isSpecCompliantForm(formData);

  if (!utils.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils.isBlob(value)) {
      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils.isArray(value) && isFlatArray(value)) ||
        ((utils.isFileList(value) || utils.endsWith(key, '[]')) && (arr = utils.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils.forEach(value, function each(el, key) {
      const result = !(utils.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode$1(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && toFormData(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils.isURLSearchParams(params) ?
      params.toString() :
      new AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

var InterceptorManager$1 = InterceptorManager;

var transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const isStandardBrowserEnv = (() => {
  let product;
  if (typeof navigator !== 'undefined' && (
    (product = navigator.product) === 'ReactNative' ||
    product === 'NativeScript' ||
    product === 'NS')
  ) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
})();

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
 const isStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();


var platform = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
};

function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
    const obj = {};

    utils.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

const DEFAULT_CONTENT_TYPE = {
  'Content-Type': undefined
};

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: transitionalDefaults,

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils.isObject(data);

    if (isObjectPayload && utils.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils.isFormData(data);

    if (isFormData) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }

    if (utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return toFormData(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (data && utils.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults$1 = defaults;

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

function isValidHeaderName(str) {
  return /^[-_a-zA-Z]+$/.test(str.trim());
}

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils.isString(value)) return;

  if (utils.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if(utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils.forEach(this, (value, header) => {
      const key = utils.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

utils.freezeMethods(AxiosHeaders.prototype);
utils.freezeMethods(AxiosHeaders);

var AxiosHeaders$1 = AxiosHeaders;

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || defaults$1;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;

  utils.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

var cookies = platform.isStandardBrowserEnv ?

// Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        const cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

// Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })();

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

var isURLSameOrigin = platform.isStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })();

function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);

  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

var xhrAdapter = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
    const responseType = config.responseType;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv)) {
      requestHeaders.setContentType(false); // Let the browser set it
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = AxiosHeaders$1.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (platform.isStandardBrowserEnv) {
      // Add xsrf header
      const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath))
        && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(fullPath);

    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
};

const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};

utils.forEach(knownAdapters, (fn, value) => {
  if(fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

var adapters = {
  getAdapter: (adapters) => {
    adapters = utils.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      if((adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter)) {
        break;
      }
    }

    if (!adapter) {
      if (adapter === false) {
        throw new AxiosError(
          `Adapter ${nameOrAdapter} is not supported by the environment`,
          'ERR_NOT_SUPPORT'
        );
      }

      throw new Error(
        utils.hasOwnProp(knownAdapters, nameOrAdapter) ?
          `Adapter '${nameOrAdapter}' is not available in the build` :
          `Unknown adapter '${nameOrAdapter}'`
      );
    }

    if (!utils.isFunction(adapter)) {
      throw new TypeError('adapter is not a function');
    }

    return adapter;
  },
  adapters: knownAdapters
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = AxiosHeaders$1.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = AxiosHeaders$1.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge.call({caseless}, target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

const VERSION = "1.3.3";

const validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

var validator = {
  assertOptions,
  validators: validators$1
};

const validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer !== undefined) {
      validator.assertOptions(paramsSerializer, {
        encode: validators.function,
        serialize: validators.function
      }, true);
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    let contextHeaders;

    // Flatten headers
    contextHeaders = headers && utils.merge(
      headers.common,
      headers[config.method]
    );

    contextHeaders && utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

var Axios$1 = Axios;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

var CancelToken$1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
}

const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

var HttpStatusCode$1 = HttpStatusCode;

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults$1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios$1;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;

// Expose AxiosError class
axios.AxiosError = AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = AxiosHeaders$1;

axios.formToJSON = thing => formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.HttpStatusCode = HttpStatusCode$1;

axios.default = axios;

module.exports = axios;
//# sourceMappingURL=axios.cjs.map


/***/ }),

/***/ "./node_modules/i18next-http-backend/cjs/getFetch.js":
/*!***********************************************************!*\
  !*** ./node_modules/i18next-http-backend/cjs/getFetch.js ***!
  \***********************************************************/
/***/ ((module, exports, __webpack_require__) => {

var fetchApi
if (typeof fetch === 'function') {
  if (typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g.fetch) {
    fetchApi = __webpack_require__.g.fetch
  } else if (typeof window !== 'undefined' && window.fetch) {
    fetchApi = window.fetch
  } else {
    fetchApi = fetch
  }
}

if ( true && (typeof window === 'undefined' || typeof window.document === 'undefined')) {
  var f = fetchApi || __webpack_require__(/*! cross-fetch */ "./node_modules/cross-fetch/dist/browser-ponyfill.js")
  if (f.default) f = f.default
  exports["default"] = f
  module.exports = exports.default
}


/***/ }),

/***/ "./node_modules/i18next-http-backend/cjs/index.js":
/*!********************************************************!*\
  !*** ./node_modules/i18next-http-backend/cjs/index.js ***!
  \********************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _utils = __webpack_require__(/*! ./utils.js */ "./node_modules/i18next-http-backend/cjs/utils.js");
var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ "./node_modules/i18next-http-backend/cjs/request.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var getDefaults = function getDefaults() {
  return {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    addPath: '/locales/add/{{lng}}/{{ns}}',
    allowMultiLoading: false,
    parse: function parse(data) {
      return JSON.parse(data);
    },
    stringify: JSON.stringify,
    parsePayload: function parsePayload(namespace, key, fallbackValue) {
      return _defineProperty({}, key, fallbackValue || '');
    },
    request: _request.default,
    reloadInterval: typeof window !== 'undefined' ? false : 60 * 60 * 1000,
    customHeaders: {},
    queryStringParams: {},
    crossDomain: false,
    withCredentials: false,
    overrideMimeType: false,
    requestOptions: {
      mode: 'cors',
      credentials: 'same-origin',
      cache: 'default'
    }
  };
};
var Backend = function () {
  function Backend(services) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var allOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, Backend);
    this.services = services;
    this.options = options;
    this.allOptions = allOptions;
    this.type = 'backend';
    this.init(services, options, allOptions);
  }
  _createClass(Backend, [{
    key: "init",
    value: function init(services) {
      var _this = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.services = services;
      this.options = (0, _utils.defaults)(options, this.options || {}, getDefaults());
      this.allOptions = allOptions;
      if (this.services && this.options.reloadInterval) {
        setInterval(function () {
          return _this.reload();
        }, this.options.reloadInterval);
      }
    }
  }, {
    key: "readMulti",
    value: function readMulti(languages, namespaces, callback) {
      this._readAny(languages, languages, namespaces, namespaces, callback);
    }
  }, {
    key: "read",
    value: function read(language, namespace, callback) {
      this._readAny([language], language, [namespace], namespace, callback);
    }
  }, {
    key: "_readAny",
    value: function _readAny(languages, loadUrlLanguages, namespaces, loadUrlNamespaces, callback) {
      var _this2 = this;
      var loadPath = this.options.loadPath;
      if (typeof this.options.loadPath === 'function') {
        loadPath = this.options.loadPath(languages, namespaces);
      }
      loadPath = (0, _utils.makePromise)(loadPath);
      loadPath.then(function (resolvedLoadPath) {
        if (!resolvedLoadPath) return callback(null, {});
        var url = _this2.services.interpolator.interpolate(resolvedLoadPath, {
          lng: languages.join('+'),
          ns: namespaces.join('+')
        });
        _this2.loadUrl(url, callback, loadUrlLanguages, loadUrlNamespaces);
      });
    }
  }, {
    key: "loadUrl",
    value: function loadUrl(url, callback, languages, namespaces) {
      var _this3 = this;
      this.options.request(this.options, url, undefined, function (err, res) {
        if (res && (res.status >= 500 && res.status < 600 || !res.status)) return callback('failed loading ' + url + '; status code: ' + res.status, true);
        if (res && res.status >= 400 && res.status < 500) return callback('failed loading ' + url + '; status code: ' + res.status, false);
        if (!res && err && err.message && err.message.indexOf('Failed to fetch') > -1) return callback('failed loading ' + url + ': ' + err.message, true);
        if (err) return callback(err, false);
        var ret, parseErr;
        try {
          if (typeof res.data === 'string') {
            ret = _this3.options.parse(res.data, languages, namespaces);
          } else {
            ret = res.data;
          }
        } catch (e) {
          parseErr = 'failed parsing ' + url + ' to json';
        }
        if (parseErr) return callback(parseErr, false);
        callback(null, ret);
      });
    }
  }, {
    key: "create",
    value: function create(languages, namespace, key, fallbackValue, callback) {
      var _this4 = this;
      if (!this.options.addPath) return;
      if (typeof languages === 'string') languages = [languages];
      var payload = this.options.parsePayload(namespace, key, fallbackValue);
      var finished = 0;
      var dataArray = [];
      var resArray = [];
      languages.forEach(function (lng) {
        var addPath = _this4.options.addPath;
        if (typeof _this4.options.addPath === 'function') {
          addPath = _this4.options.addPath(lng, namespace);
        }
        var url = _this4.services.interpolator.interpolate(addPath, {
          lng: lng,
          ns: namespace
        });
        _this4.options.request(_this4.options, url, payload, function (data, res) {
          finished += 1;
          dataArray.push(data);
          resArray.push(res);
          if (finished === languages.length) {
            if (typeof callback === 'function') callback(dataArray, resArray);
          }
        });
      });
    }
  }, {
    key: "reload",
    value: function reload() {
      var _this5 = this;
      var _this$services = this.services,
        backendConnector = _this$services.backendConnector,
        languageUtils = _this$services.languageUtils,
        logger = _this$services.logger;
      var currentLanguage = backendConnector.language;
      if (currentLanguage && currentLanguage.toLowerCase() === 'cimode') return;
      var toLoad = [];
      var append = function append(lng) {
        var lngs = languageUtils.toResolveHierarchy(lng);
        lngs.forEach(function (l) {
          if (toLoad.indexOf(l) < 0) toLoad.push(l);
        });
      };
      append(currentLanguage);
      if (this.allOptions.preload) this.allOptions.preload.forEach(function (l) {
        return append(l);
      });
      toLoad.forEach(function (lng) {
        _this5.allOptions.ns.forEach(function (ns) {
          backendConnector.read(lng, ns, 'read', null, null, function (err, data) {
            if (err) logger.warn("loading namespace ".concat(ns, " for language ").concat(lng, " failed"), err);
            if (!err && data) logger.log("loaded namespace ".concat(ns, " for language ").concat(lng), data);
            backendConnector.loaded("".concat(lng, "|").concat(ns), err, data);
          });
        });
      });
    }
  }]);
  return Backend;
}();
Backend.type = 'backend';
var _default = Backend;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/i18next-http-backend/cjs/request.js":
/*!**********************************************************!*\
  !*** ./node_modules/i18next-http-backend/cjs/request.js ***!
  \**********************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _utils = __webpack_require__(/*! ./utils.js */ "./node_modules/i18next-http-backend/cjs/utils.js");
var fetchNode = _interopRequireWildcard(__webpack_require__(/*! ./getFetch.js */ "./node_modules/i18next-http-backend/cjs/getFetch.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var fetchApi;
if (typeof fetch === 'function') {
  if (typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g.fetch) {
    fetchApi = __webpack_require__.g.fetch;
  } else if (typeof window !== 'undefined' && window.fetch) {
    fetchApi = window.fetch;
  } else {
    fetchApi = fetch;
  }
}
var XmlHttpRequestApi;
if ((0, _utils.hasXMLHttpRequest)()) {
  if (typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g.XMLHttpRequest) {
    XmlHttpRequestApi = __webpack_require__.g.XMLHttpRequest;
  } else if (typeof window !== 'undefined' && window.XMLHttpRequest) {
    XmlHttpRequestApi = window.XMLHttpRequest;
  }
}
var ActiveXObjectApi;
if (typeof ActiveXObject === 'function') {
  if (typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g.ActiveXObject) {
    ActiveXObjectApi = __webpack_require__.g.ActiveXObject;
  } else if (typeof window !== 'undefined' && window.ActiveXObject) {
    ActiveXObjectApi = window.ActiveXObject;
  }
}
if (!fetchApi && fetchNode && !XmlHttpRequestApi && !ActiveXObjectApi) fetchApi = fetchNode.default || fetchNode;
if (typeof fetchApi !== 'function') fetchApi = undefined;
var addQueryString = function addQueryString(url, params) {
  if (params && _typeof(params) === 'object') {
    var queryString = '';
    for (var paramName in params) {
      queryString += '&' + encodeURIComponent(paramName) + '=' + encodeURIComponent(params[paramName]);
    }
    if (!queryString) return url;
    url = url + (url.indexOf('?') !== -1 ? '&' : '?') + queryString.slice(1);
  }
  return url;
};
var fetchIt = function fetchIt(url, fetchOptions, callback) {
  fetchApi(url, fetchOptions).then(function (response) {
    if (!response.ok) return callback(response.statusText || 'Error', {
      status: response.status
    });
    response.text().then(function (data) {
      callback(null, {
        status: response.status,
        data: data
      });
    }).catch(callback);
  }).catch(callback);
};
var omitFetchOptions = false;
var requestWithFetch = function requestWithFetch(options, url, payload, callback) {
  if (options.queryStringParams) {
    url = addQueryString(url, options.queryStringParams);
  }
  var headers = (0, _utils.defaults)({}, typeof options.customHeaders === 'function' ? options.customHeaders() : options.customHeaders);
  if (payload) headers['Content-Type'] = 'application/json';
  var reqOptions = typeof options.requestOptions === 'function' ? options.requestOptions(payload) : options.requestOptions;
  var fetchOptions = (0, _utils.defaults)({
    method: payload ? 'POST' : 'GET',
    body: payload ? options.stringify(payload) : undefined,
    headers: headers
  }, omitFetchOptions ? {} : reqOptions);
  try {
    fetchIt(url, fetchOptions, callback);
  } catch (e) {
    if (!reqOptions || Object.keys(reqOptions).length === 0 || !e.message || e.message.indexOf('not implemented') < 0) {
      return callback(e);
    }
    try {
      Object.keys(reqOptions).forEach(function (opt) {
        delete fetchOptions[opt];
      });
      fetchIt(url, fetchOptions, callback);
      omitFetchOptions = true;
    } catch (err) {
      callback(err);
    }
  }
};
var requestWithXmlHttpRequest = function requestWithXmlHttpRequest(options, url, payload, callback) {
  if (payload && _typeof(payload) === 'object') {
    payload = addQueryString('', payload).slice(1);
  }
  if (options.queryStringParams) {
    url = addQueryString(url, options.queryStringParams);
  }
  try {
    var x;
    if (XmlHttpRequestApi) {
      x = new XmlHttpRequestApi();
    } else {
      x = new ActiveXObjectApi('MSXML2.XMLHTTP.3.0');
    }
    x.open(payload ? 'POST' : 'GET', url, 1);
    if (!options.crossDomain) {
      x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }
    x.withCredentials = !!options.withCredentials;
    if (payload) {
      x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    if (x.overrideMimeType) {
      x.overrideMimeType('application/json');
    }
    var h = options.customHeaders;
    h = typeof h === 'function' ? h() : h;
    if (h) {
      for (var i in h) {
        x.setRequestHeader(i, h[i]);
      }
    }
    x.onreadystatechange = function () {
      x.readyState > 3 && callback(x.status >= 400 ? x.statusText : null, {
        status: x.status,
        data: x.responseText
      });
    };
    x.send(payload);
  } catch (e) {
    console && console.log(e);
  }
};
var request = function request(options, url, payload, callback) {
  if (typeof payload === 'function') {
    callback = payload;
    payload = undefined;
  }
  callback = callback || function () {};
  if (fetchApi && url.indexOf('file:') !== 0) {
    return requestWithFetch(options, url, payload, callback);
  }
  if ((0, _utils.hasXMLHttpRequest)() || typeof ActiveXObject === 'function') {
    return requestWithXmlHttpRequest(options, url, payload, callback);
  }
  callback(new Error('No fetch and no xhr implementation found!'));
};
var _default = request;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/i18next-http-backend/cjs/utils.js":
/*!********************************************************!*\
  !*** ./node_modules/i18next-http-backend/cjs/utils.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.defaults = defaults;
exports.hasXMLHttpRequest = hasXMLHttpRequest;
exports.makePromise = makePromise;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var arr = [];
var each = arr.forEach;
var slice = arr.slice;
function defaults(obj) {
  each.call(slice.call(arguments, 1), function (source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}
function hasXMLHttpRequest() {
  return typeof XMLHttpRequest === 'function' || (typeof XMLHttpRequest === "undefined" ? "undefined" : _typeof(XMLHttpRequest)) === 'object';
}
function isPromise(maybePromise) {
  return !!maybePromise && typeof maybePromise.then === 'function';
}
function makePromise(maybePromise) {
  if (isPromise(maybePromise)) {
    return maybePromise;
  }
  return Promise.resolve(maybePromise);
}

/***/ })

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/


var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/dist/browser/axios.cjs"));
var _i18next = _interopRequireDefault(__webpack_require__(/*! i18next */ "./node_modules/i18next/dist/cjs/i18next.js"));
var _i18nextHttpBackend = _interopRequireDefault(__webpack_require__(/*! i18next-http-backend */ "./node_modules/i18next-http-backend/cjs/index.js"));
var _jqueryI18next = _interopRequireDefault(__webpack_require__(/*! jquery-i18next */ "./node_modules/jquery-i18next/index.js"));
var _i18nextBrowserLanguagedetector = _interopRequireDefault(__webpack_require__(/*! i18next-browser-languagedetector */ "./node_modules/i18next-browser-languagedetector/dist/cjs/i18nextBrowserLanguageDetector.js"));
var _global = _interopRequireDefault(__webpack_require__(/*! ./global */ "./public/js/global.js"));
__webpack_require__(/*! ../../common/js/polyfill */ "../common/public/js/polyfill.js");
__webpack_require__(/*! ../less/index.less */ "./public/less/index.less");
var _inlineSVG = _interopRequireDefault(__webpack_require__(/*! ../../common/js/inlineSVG */ "../common/public/js/inlineSVG.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// simple text fade out for the card headers
//
function get() {
  var el = $('.section_header');
  el.each((index, text) => {
    text = $(text);
    var offset = text.offset().top - $(window).scrollTop();
    if (offset > 200) {
      text.css("opacity", 0);
    } else if (offset > 100) {
      text.css("opacity", (100 - (offset - 100)) / 100);
    } else {
      text.css("opacity", 1);
    }
  });
  return true;
}
get();
$(window).scroll(get);
$(window).load(function () {
  // set the global socket object
  socket = io({
    path: '/socket.io'
  });

  // export all required classes for deserialize JSON with "eval"
  // "eval" code didn't sees imported class or code
  //
  for (var k in _global.default) window[k] = _global.default[k];
  _i18next.default.use(_i18nextBrowserLanguagedetector.default).use(_i18nextHttpBackend.default).init({
    fallbackLng: "en",
    ns: ['common', 'home'],
    defaultNS: 'home',
    debug: false,
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: '../common/i18n/{{ns}}/{{lng}}.json'
    }
  }).then(() => {
    _jqueryI18next.default.init(_i18next.default, $, {
      useOptionsAttr: true
    });
    return _axios.default.get("../permissions");
  }).then(response => {
    let permissions = response.data;
    app = (__webpack_require__(/*! ./Application */ "./public/js/Application.js")["default"]);
    return app.init(permissions);
  }).then(app => {
    $('body').localize();
    _inlineSVG.default.init();
  });
});
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map