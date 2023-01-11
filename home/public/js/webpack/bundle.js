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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppSwitch)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var AppSwitch = /*#__PURE__*/_createClass(function AppSwitch(permissions) {
  _classCallCheck(this, AppSwitch);
  var appSwitchButtons = $(" \n            <label class=\"dropdown\" >\n                <span class=\"image-button application-waffel\"  data-toggle=\"dropdown\">\n                  <img  src=\"../common/images/toolbar_app_switch.svg\" class=\"svg\"/>\n                </span>\n\n                <div class=\"dropdown-menu\" role=\"menu\" >\n                      <label class=\"applicationSwitchHome image-button\">\n                        <img src=\"../common/images/app_home.svg\"/>\n                        <div>Home<br>&nbsp;</div>\n                      </label>\n\n                      <label class=\"applicationSwitchSimulator image-button\">\n                        <img src=\"../common/images/app_simulator.svg\"/>\n                        <div>Circuit</div>\n                        <div>Simulator</div>\n                      </label>\n\n                      <label class=\"applicationSwitchAuthor image-button\" >\n                        <img src=\"../common/images/app_lessons.svg\"/>\n                        <div>Lesson</div>\n                        <div>Author</div>\n                      </label>\n\n                      <label class=\"applicationSwitchDesigner image-button\" >\n                        <img src=\"../common/images/app_designer.svg\"/>\n                        <div>Component</div>\n                        <div>Designer</div>\n                      </label>\n                      \n                      <label class=\"applicationSwitchYoutube image-button\" >\n                        <img src=\"../common/images/app_youtube.svg\"/>\n                        <div>Youtube</div>\n                        <div>Channel</div>\n                      </label>\n\n                      <label class=\"applicationSwitchUser image-button\" >\n                        <img src=\"../common/images/app_user.svg\"/>\n                        <div>User</div>\n                        <div>Management</div>\n                      </label>\n                      \n                      <label class=\"applicationSwitchGroups image-button\" >\n                        <img src=\"../common/images/app_groups.svg\"/>\n                        <div>My Groups</div>\n                        <div>&nbsp;</div>\n                      </label>\n                </div>   \n         </span>\n    ");
  $(".applicationSwitch").prepend(appSwitchButtons);
  $(".applicationSwitchYoutube").off("click").on("click", function () {
    window.open("https://www.youtube.com/@electra.academy", "youtube");
  });
  $(".applicationSwitchDesigner").off("click").on("click", function () {
    window.open("../designer", "designer");
  });
  $(".applicationSwitchAuthor").off("click").on("click", function () {
    window.open("../author", "author");
  });
  $(".applicationSwitchSimulator").off("click").on("click", function () {
    window.open("../simulator", "simulator");
  });
  $(".applicationSwitchHome").off("click").on("click", function () {
    window.open("../home", "home");
  });
  if (permissions.featureset.usermanagement === true) {
    $(document).on("click", ".applicationSwitchUser", function () {
      window.open("../user", "user");
    });
  } else {
    $(".applicationSwitchUser").remove();
  }
  if (permissions.featureset.records === true) {
    $(document).on("click", ".applicationSwitchGroups", function () {
      window.open("../groups", "groups");
    });
  } else {
    $(".applicationSwitchGroups").remove();
  }
});


/***/ }),

/***/ "../common/public/js/Userinfo.js":
/*!***************************************!*\
  !*** ../common/public/js/Userinfo.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Userinfo)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var Userinfo = /*#__PURE__*/function () {
  function Userinfo(permissions) {
    var _this = this;
    _classCallCheck(this, Userinfo);
    if (permissions.featureset.authentication === false) {
      $(".userinfo_toggler").remove();
    } else {
      // https://console.cloud.google.com/apis/credentials
      google.accounts.id.initialize({
        client_id: "1008700492445-0t7mlaamv1355pld1uh4gt9duqs7fg8l.apps.googleusercontent.com",
        login_uri: "".concat(window.location.protocol, "//").concat(window.location.host, "/oauth/callback").concat(window.location.pathname),
        ux_mode: "redirect"
      });
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("../userinfo").then(function (response) {
        _this.user = response.data;
        var icon = _this.user.picture ? _this.user.picture : "../common/images/toolbar_user.svg";
        var role = _this.user.role === "admin" ? "(Administrator)" : "";
        $(".userinfo_toggler img").attr("src", icon);
        $(".userinfo_toggler .dropdown-menu").html(" \n              <div class=\"userContainer\">\n                <img src=\"".concat(icon, "\"/>\n                <div>").concat(_this.user.displayName, "</div>\n                <div>").concat(role, "</div>\n              </div>\n          "));
      })["catch"](function () {
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
  _createClass(Userinfo, [{
    key: "getUser",
    value: function getUser() {
      return this.user;
    }
  }]);
  return Userinfo;
}();


/***/ }),

/***/ "../common/public/js/inlineSVG.js":
/*!****************************************!*\
  !*** ../common/public/js/inlineSVG.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory(root)),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : this.window || this.global, function (root) {
  // Variables
  var inlineSVG = {},
    supports = !!document.querySelector && !!root.addEventListener,
    settings;

  // Defaults
  var defaults = {
    initClass: 'js-inlinesvg',
    svgSelector: 'img.svg'
  };

  /**
   * Stolen from underscore.js
   * @private
   * @param {Int} times
   * @param {Function} func
   */

  var after = function after(times, func) {
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
  var extend = function extend() {
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
    var merge = function merge(obj) {
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
  var getAll = function getAll() {
    var svgs = document.querySelectorAll(settings.svgSelector);
    return svgs;
  };

  /**
   * Inline all the SVGs in the array
   * @public
   */
  var inliner = function inliner(cb) {
    var svgs = getAll();
    var callback = after(svgs.length, cb);
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
          var titles = inlinedSVG.getElementsByTagName('title');
          while (titles[0]) {
            titles[0].parentNode.removeChild(titles[0]);
          }
          var descs = inlinedSVG.getElementsByTagName('desc');
          while (descs[0]) {
            descs[0].parentNode.removeChild(descs[0]);
          }

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

          // Add an additional class to the inlined SVG to imply it was
          // infact inlined, might be useful to know
          if (inlinedSVG.classList) {
            inlinedSVG.classList.add('inlined-svg');
          } else {
            inlinedSVG.className += ' ' + 'inlined-svg';
          }

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
    settings = extend(defaults, options || {});

    // Kick-off the inliner
    inliner(callback || function () {});
  };
  return inlineSVG;
});

/***/ }),

/***/ "./public/js/Application.js":
/*!**********************************!*\
  !*** ./public/js/Application.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_js_Userinfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/js/Userinfo */ "../common/public/js/Userinfo.js");
/* harmony import */ var _common_js_AppSwitch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/js/AppSwitch */ "../common/public/js/AppSwitch.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var Application = /*#__PURE__*/function () {
  function Application() {
    _classCallCheck(this, Application);
  }
  _createClass(Application, [{
    key: "init",
    value: function init(permissions) {
      this.userinfo = new _common_js_Userinfo__WEBPACK_IMPORTED_MODULE_0__["default"](permissions);
      this.appSwitch = new _common_js_AppSwitch__WEBPACK_IMPORTED_MODULE_1__["default"](permissions);
    }
  }]);
  return Application;
}();
var app = new Application();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);

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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  font-family: 'Roboto', sans-serif !important;\n  font-weight: 300;\n}\n@keyframes spinner {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.spinner:before {\n  content: '';\n  box-sizing: border-box;\n  position: absolute;\n  top: 35%;\n  left: 50%;\n  width: 30px;\n  height: 30px;\n  margin-top: -15px;\n  margin-left: -15px;\n  border-radius: 50%;\n  border-width: 2px;\n  border-style: solid;\n  animation: spinner 0.6s linear infinite;\n}\n.material-button {\n  position: relative;\n  display: inline-block;\n  box-sizing: border-box;\n  border: none;\n  border-radius: 4px;\n  padding: 0 16px;\n  min-width: 64px;\n  height: 36px;\n  vertical-align: middle;\n  text-align: center;\n  text-overflow: ellipsis;\n  text-transform: uppercase;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 36px;\n  overflow: hidden;\n  outline: none;\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n}\n.material-button::-moz-focus-inner {\n  border: none;\n}\n/* Overlay */\n.material-button::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n/* Ripple */\n.material-button::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  border-radius: 50%;\n  padding: 50%;\n  width: 32px;\n  /* Safari */\n  height: 32px;\n  /* Safari */\n  opacity: 0;\n  transform: translate(-50%, -50%) scale(1);\n  transition: opacity 1s, transform 0.5s;\n}\n.material-button:active::after {\n  transform: translate(-50%, -50%) scale(0);\n  transition: transform 0s;\n}\n/* Disabled */\n.material-button:disabled {\n  cursor: initial;\n}\n.tooltip {\n  z-index: 1000000;\n}\n.userinfo_toggler .userContainer {\n  text-align: center;\n}\n.userinfo_toggler .userContainer img {\n  width: 90px;\n}\n.appbar {\n  height: 70px;\n  position: relative;\n  border: none !important;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.appbar .icon {\n  height: 40;\n}\n.appbar .title h1 {\n  font-size: 24px;\n  font-weight: 100;\n  letter-spacing: 6px;\n  margin: 0;\n}\n.appbar .title h2 {\n  font-size: 14px;\n  font-weight: 100;\n  letter-spacing: 4px;\n  margin: 0;\n}\n.appbar .spacer {\n  flex-grow: 1;\n}\n.appbar .group {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n.toolbar {\n  position: relative;\n  border: none !important;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding-right: 10px;\n  height: 60;\n}\n.toolbar * {\n  outline: none;\n}\n.toolbar .spacer {\n  flex-grow: 1;\n}\n.toolbar .group {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n.toolbar .group .statusIndicator {\n  margin: 20px;\n}\n.toolbar .group .statusIndicator img {\n  display: block;\n  cursor: pointer;\n  margin: auto;\n}\n.toolbar .group .statusIndicator span {\n  font-size: 0.8em;\n  text-align: center;\n  width: 100%;\n  display: inline-block;\n  white-space: nowrap;\n}\n.toolbar .group .statusIndicator .notSupported {\n  display: none;\n  font-weight: bold;\n}\n.toolbar .group .statusIndicator .connected {\n  display: block;\n}\n.toolbar .group .statusIndicator .disconnected {\n  display: none;\n}\n.toolbar .group .statusIndicator.disabled img {\n  cursor: not-allowed;\n}\n.toolbar .group .statusIndicator.disabled img:hover {\n  box-shadow: none;\n}\n.toolbar .group .statusIndicator.disabled .notSupported {\n  display: block;\n}\n.toolbar .group .statusIndicator.disabled .connected {\n  display: none;\n}\n.toolbar .group .statusIndicator.disabled .disconnected {\n  display: none;\n}\n.toolbar .group .statusIndicator.error:not(.disabled) span {\n  font-weight: bold;\n}\n.toolbar .group .statusIndicator.error:not(.disabled) .notSupported {\n  display: none;\n}\n.toolbar .group .statusIndicator.error:not(.disabled) .connected {\n  display: none;\n}\n.toolbar .group .statusIndicator.error:not(.disabled) .disconnected {\n  display: block;\n}\n.modal-backdrop.in {\n  transition: all 0.4s linear;\n}\n.genericDialog .modal-content {\n  border-radius: 4px;\n}\n.genericDialog .modal-content .modal-header {\n  border-bottom: 0;\n  font-weight: 400;\n}\n.genericDialog .modal-content .modal-body {\n  min-height: 120px;\n}\n.genericDialog .modal-content .modal-body .form-control {\n  appearance: none;\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin: 0;\n  padding: 0;\n  display: inline-block;\n  font: inherit;\n  border-width: 1px;\n  border-style: solid;\n  box-shadow: none;\n  height: 24px;\n  padding: 0 3px;\n}\n.genericDialog .modal-content .modal-body .list-group {\n  overflow-y: auto;\n  overflow-x: auto;\n}\n.genericDialog .modal-content .modal-body .list-group *[data-draw2d=\"true\"] {\n  font-weight: bold;\n}\n.genericDialog .modal-content .modal-body .list-group .list-group-item {\n  background-color: transparent;\n  font-weight: 300;\n}\n.genericDialog .modal-content .modal-body .list-group .list-group-item:hover {\n  text-decoration: underline;\n}\n.genericDialog .modal-content .modal-body .list-group *[data-draw2d=\"false\"][data-type=\"file\"] {\n  cursor: default;\n  text-decoration: none !important;\n}\n.genericDialog .modal-content .modal-footer {\n  border-top: 0;\n}\n.genericDialog .modal-content .modal-footer .btn,\n.genericDialog .modal-content .modal-footer .btn-group {\n  border: 0;\n  text-transform: uppercase;\n  background-color: transparent;\n  transition: all 0.5s;\n}\n.genericDialog .modal-content .modal-footer .btn:hover,\n.genericDialog .modal-content .modal-footer .btn-group:hover {\n  transition: all 0.5s;\n}\n.genericDialog .modal-content .modal-footer .btn-group {\n  border: 0;\n  text-transform: uppercase;\n  transition: all 0.5s;\n}\n.genericDialog .modal-content .modal-footer .btn-group .dropdown-toggle .caret {\n  margin-top: 7px;\n}\n.genericDialog .modal-content .modal-footer .btn-group:hover {\n  transition: all 0.5s;\n}\n.genericDialog .modal-content .modal-footer .btn-primary {\n  font-weight: bold;\n}\n.context-menu-list {\n  margin: 0;\n  padding: 0;\n  min-width: 120px;\n  max-width: unset;\n  display: inline-block;\n  position: absolute;\n  list-style-type: none;\n  border-width: 1px;\n  border-style: solid;\n  border-left-width: 2px;\n  font-size: 15px;\n  white-space: nowrap;\n  /* vertically align inside labels */\n  /* position checkboxes and radios as icons */\n}\n.context-menu-list .context-menu-item {\n  padding: 5px 5px 5px 24px;\n  position: relative;\n  user-select: none;\n}\n.context-menu-list .context-menu-item.hover {\n  cursor: pointer;\n}\n.context-menu-list .context-menu-item > label > input,\n.context-menu-list .context-menu-item > label > textarea {\n  user-select: text;\n}\n.context-menu-list .context-menu-separator {\n  padding-bottom: 0;\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n}\n.context-menu-list .context-menu-input.hover,\n.context-menu-list .context-menu-item.disabled.hover {\n  cursor: default;\n}\n.context-menu-list .context-menu-submenu:after {\n  content: \">\";\n  position: absolute;\n  top: 0;\n  right: 3px;\n  z-index: 1;\n}\n.context-menu-list .context-menu-item.icon {\n  min-height: 18px;\n}\n.context-menu-list .context-menu-item.icon:before {\n  position: relative;\n  left: -15px;\n  font-size: 19px;\n}\n.context-menu-list .context-menu-input > label > * {\n  vertical-align: top;\n}\n.context-menu-list .context-menu-input > label > input[type=\"checkbox\"],\n.context-menu-list .context-menu-input > label > input[type=\"radio\"] {\n  margin-left: -17px;\n}\n.context-menu-list .context-menu-input > label > span {\n  margin-left: 5px;\n}\n.context-menu-list .context-menu-input > label,\n.context-menu-list .context-menu-input > label > input[type=\"text\"],\n.context-menu-list .context-menu-input > label > textarea,\n.context-menu-list .context-menu-input > label > select {\n  display: block;\n  width: 100%;\n  box-sizing: border-box;\n}\n.context-menu-list .context-menu-input > label > textarea {\n  height: 100px;\n}\n.context-menu-list .context-menu-item > .context-menu-list {\n  display: none;\n  /* re-positioned by js */\n  right: -5px;\n  top: 5px;\n}\n.context-menu-list .context-menu-item.hover > .context-menu-list {\n  display: block;\n}\n.context-menu-list .context-menu-accesskey {\n  text-decoration: underline;\n}\n.context-menu-list .context-menu-list {\n  border-color: #DDD;\n  background: white;\n  border-left-color: #C71D3D;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);\n}\n.context-menu-list .context-menu-list .context-menu-separator {\n  border-bottom: 1px solid #DDD;\n}\n.context-menu-list .context-menu-list .context-menu-item.hover {\n  background-color: #C71D3D;\n  color: white;\n}\n.context-menu-list .context-menu-list .context-menu-item.disabled {\n  color: #666;\n}\n.context-menu-list .context-menu-list .context-menu-item.disabled.hover {\n  background-color: #EEE;\n}\n.context-menu-list .context-menu-list .context-menu-item .context-menu-submenu:after {\n  color: #666;\n}\n#githubNewFileDialog .filePreview {\n  font-size: 115px;\n}\n#fileOpenDialog .list-group {\n  height: 60%;\n}\n#fileSaveDialog .filePreview {\n  max-width: 200px;\n  max-height: 200px;\n}\n#fileSaveDialog .modal-body .media {\n  padding: 20px;\n}\n#githubFileSaveAsDialog .filePreview {\n  max-width: 200px;\n  max-height: 200px;\n}\n#githubFileSaveAsDialog .list-group {\n  height: 250px;\n}\n#canvas_zoom {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  border-radius: 5px;\n  display: flex;\n  flex-wrap: nowrap;\n  align-items: center;\n}\n#canvas_zoom button {\n  background-color: transparent;\n  font-weight: 300;\n  padding: 5px;\n  padding-left: 10px;\n  padding-right: 10px;\n  border-width: 1px;\n  border-style: solid;\n  outline: none;\n  transition: all 0.5s;\n}\n#canvas_zoom button:hover {\n  border-width: 1px;\n  border-style: solid;\n}\n.markdownRendering {\n  padding: 20px;\n}\n.markdownRendering img {\n  max-width: 100%;\n}\n.markdownRendering p {\n  font-size: 16px;\n  margin-top: 30px;\n}\n.markdownRendering table {\n  margin-left: auto;\n  margin-right: auto;\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 12px;\n  border-width: 1px;\n  border-style: solid;\n  border-radius: 3px;\n}\n.markdownRendering table th {\n  padding: 21px 25px 22px 25px;\n  border-width: 1px;\n  border-style: solid;\n}\n.markdownRendering table th:first-child {\n  text-align: left;\n  padding-left: 20px;\n}\n.markdownRendering table tr:first-child th:first-child {\n  border-top-left-radius: 3px;\n}\n.markdownRendering table tr:first-child th:last-child {\n  border-top-right-radius: 3px;\n}\n.markdownRendering table tr {\n  text-align: center;\n  padding-left: 20px;\n}\n.markdownRendering table tr td:first-child {\n  text-align: left;\n  padding-left: 20px;\n  border-left: 0;\n}\n.markdownRendering table tr td {\n  padding: 18px;\n  border-width: 1px;\n  border-style: solid;\n}\n.markdownRendering table tr:last-child td {\n  border-bottom: 0;\n}\n.markdownRendering table tr:last-child td:first-child {\n  border-bottom-left-radius: 3px;\n}\n.markdownRendering table tr:last-child td:last-child {\n  border-bottom-right-radius: 3px;\n}\n.markdownRendering .info {\n  border-width: 1px;\n  border-style: solid;\n  border-radius: 5px;\n  font-weight: 400;\n  letter-spacing: 2px;\n  padding: 5px;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.markdownRendering .info p {\n  padding: 0;\n  margin: 0;\n}\n.tinyFlyoverMenu {\n  border-width: 1px;\n  border-style: solid;\n  position: absolute;\n  top: -15px;\n  right: 20px;\n  border-radius: 2px;\n  font-size: 20px;\n  z-index: 1;\n  padding: 3px;\n  display: flex;\n  flex-direction: row;\n  align-items: stretch;\n  justify-content: center;\n  gap: 10px;\n  flex-wrap: nowrap;\n}\n.tinyFlyoverMenu div {\n  border-width: 1px;\n  border-style: solid;\n}\n.tinyFlyoverMenu div:hover {\n  border-width: 1px;\n  border-style: solid;\n  cursor: pointer;\n}\n.activeSection .tinyFlyoverMenu {\n  position: sticky;\n  float: right;\n  top: 10px;\n}\n#notificationToast {\n  position: absolute;\n  top: -20px;\n  left: 50%;\n  transform: translateX(-50%);\n  padding-left: 20px;\n  padding-right: 20px;\n  border-radius: 0 0 8px 8px;\n  font-weight: 100;\n  z-index: 30000;\n}\n#leftTabStrip {\n  height: 100%;\n  position: absolute;\n  width: 60px;\n  padding-top: 60px;\n  overflow: hidden;\n}\n#leftTabStrip:after {\n  transform: rotate(-90deg) translate(-90px, -70px);\n  font-size: 55px;\n  white-space: nowrap;\n  font-weight: 200;\n  letter-spacing: 3px;\n}\n#leftTabStrip .leftTab {\n  border-radius: 0 !important;\n  width: 60px;\n  height: 60px;\n}\n.tab-content {\n  position: absolute;\n  left: 60px;\n  right: 0px;\n  top: 70px;\n  bottom: 0;\n}\n.tab-content .tab-pane {\n  display: none;\n  padding: 0;\n  height: 100%;\n  position: relative;\n}\n.tab-content .tab-pane.active {\n  display: flex !important;\n  flex-direction: column;\n  align-items: stretch;\n}\n.tab-content .tab-pane .workspace #canvas_config {\n  position: relative;\n  width: 40px;\n  top: 65;\n  left: 5px;\n  cursor: pointer;\n  border-width: 1px;\n  border-style: solid;\n}\n.tab-content .tab-pane .workspace #canvas_config:hover {\n  border-width: 1px !important;\n  border-style: solid !important;\n}\n.tab-content .tab-pane .workspace #canvas_config_items {\n  position: absolute;\n  top: 90;\n  left: 5px;\n  cursor: pointer;\n  padding: 10px;\n  white-space: nowrap;\n  min-width: 250px;\n}\n#editor .toolbar {\n  right: 0;\n  left: 0;\n  position: absolute;\n}\n#editor .workspace {\n  position: relative;\n  height: 100%;\n}\n#files {\n  overflow-y: scroll;\n  padding: 40px;\n}\n#files .teaser {\n  display: inline-block;\n  padding-left: 20px;\n  padding-right: 20px;\n  margin-bottom: 0;\n}\n#files .teaser .title {\n  font-weight: 200;\n  font-size: 4vw;\n  white-space: nowrap;\n  margin-bottom: 10px;\n}\n#files .teaser .title img {\n  padding-right: 40px;\n  height: 100px;\n}\n#files .teaser .slogan {\n  font-size: 2vw;\n  font-weight: 200;\n}\n#files .deleteIcon {\n  position: absolute;\n  right: 24px;\n  top: 18px;\n  cursor: pointer;\n  font-size: 25px;\n  padding: 4px;\n  border-radius: 2px;\n}\n#files .list-group-item {\n  cursor: pointer;\n}\n#files .list-group-item .thumb .thumbnail {\n  cursor: pointer;\n}\n#files .list-group-item .thumb .media-body {\n  padding-top: 14px;\n  padding-left: 20px;\n}\n#files .list-group-item .thumb .filenameInplaceEdit {\n  font-size: 18px;\n  margin-top: -5px;\n}\n#files .list-group-item .thumb h4 {\n  font-size: 18px;\n  display: inline-block;\n}\n#files .list-group-item .thumb .editIcon {\n  padding-left: 10px;\n  font-size: 14px;\n  display: none;\n}\n#files .list-group-item .thumb:hover h4 {\n  text-decoration: underline;\n}\n#files .list-group-item .thumb:hover .editIcon {\n  display: inline-block;\n}\n#files .thumbAdd {\n  border-width: 1px;\n  border-style: solid;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 1s;\n}\n#files .thumbAdd div {\n  font-size: 160px;\n  text-align: center;\n}\n#files .thumbAdd h4 {\n  text-align: center;\n}\n#files .thumbAdd:hover {\n  border-width: 1px;\n  border-style: solid;\n  transition: all 1s;\n}\n#files .fileOperations {\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n  padding-bottom: 9px;\n}\n#files #material-tabs {\n  position: relative;\n  display: block;\n  padding: 0;\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n}\n#files #material-tabs a {\n  position: relative;\n  display: inline-block;\n  text-decoration: none;\n  padding-bottom: 15px;\n  padding-left: 20px;\n  padding-right: 20px;\n  padding-top: 5px;\n  text-transform: uppercase;\n  font-size: 14px;\n  font-weight: 300;\n  text-align: center;\n  transition: all 0.3s ease;\n  outline: none;\n  z-index: 1001;\n}\n#files #material-tabs a.active {\n  font-weight: 400;\n  transition: all 0.3s ease;\n}\n#files .material-tab-content > div {\n  padding: 10px;\n  min-height: 600px;\n}\n#files header {\n  position: relative;\n}\n#files .yellow-bar {\n  position: absolute;\n  z-index: 1000;\n  bottom: -2px;\n  height: 50px;\n  display: block;\n  left: 0;\n  transition: all 0.3s ease;\n  border-radius: 10px 10px 0 0;\n  border-width: 1px 1px 0 1px;\n  border-style: solid;\n}\n#home {\n  overflow: scroll;\n}\n#home .authorPage {\n  padding: 40px !important;\n  font-size: calc(12px + 0.5vw);\n  font-weight: 400;\n}\n#home .authorPage h1 {\n  font-weight: 200;\n  font-size: calc(16px + 2.5vw);\n  white-space: nowrap;\n  margin-bottom: 10px;\n}\n#home .authorPage h2 {\n  font-size: calc(14px + 1.5vw);\n  font-weight: 200;\n}\n#home footer {\n  text-align: center;\n  margin-top: 100px;\n}\n#home footer a {\n  text-decoration: underline;\n}\n#configMenuIcon {\n  font-size: 25px;\n  cursor: pointer;\n}\n#figureConfigDialog {\n  display: none;\n  border-width: 1px;\n  border-style: solid;\n  padding: 10px;\n  margin-left: 30px;\n  border-left-width: 1px;\n  border-left-style: solid;\n  border-radius: 4px;\n}\n#figureConfigDialog .header {\n  font-size: 16px;\n  font-weight: 600;\n  padding-bottom: 15px;\n}\n#figureConfigDialog .figureAddLabel {\n  font-size: 12px;\n  font-weight: 200;\n  cursor: pointer;\n}\n#figureConfigDialog .form-group textarea {\n  min-width: 300px;\n  min-height: 100px;\n}\n#figureConfigDialog:after {\n  content: '';\n  display: block;\n  position: absolute;\n  left: -20px;\n  top: 10px;\n  width: 0;\n  height: 0;\n  border-width: 10px;\n  border-style: solid;\n}\n.applicationSwitch .open .dropdown-menu {\n  z-index: 10000;\n  right: 0;\n  left: initial;\n  display: grid;\n  max-width: 200px;\n  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));\n  grid-auto-rows: minmax(80px, auto);\n  grid-gap: 5px;\n}\n.applicationSwitch .dropdown-menu {\n  display: none;\n}\n.image-button {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-weight: 400;\n}\n.image-button img,\n.image-button svg {\n  margin: 5px;\n  margin-bottom: 0;\n  padding: 0;\n  width: 40;\n  height: 40;\n  text-align: center;\n  font-size: 45px;\n  transition: all 0.5s;\n  border-radius: 4px;\n  border-width: 1px;\n  border-style: solid;\n}\n.image-button div {\n  text-align: center;\n  font-size: 10px;\n  cursor: default;\n}\n.image-button:not(.disabled) img,\n.image-button:not(.disabled) svg {\n  cursor: pointer;\n}\n:root {\n  --shadow-color: #C71D3D;\n  --shadow-color-light: white;\n}\n@keyframes neon {\n  0% {\n    text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light), 0 0 3px var(--shadow-color-light), 0 0 10px var(--shadow-color-light), 0 0 20px var(--shadow-color-light), 0 0 30px var(--shadow-color), 0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 70px var(--shadow-color), 0 0 100px var(--shadow-color), 0 0 200px var(--shadow-color);\n  }\n  50% {\n    text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light), 0 0 5px var(--shadow-color-light), 0 0 15px var(--shadow-color-light), 0 0 25px var(--shadow-color-light), 0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 60px var(--shadow-color), 0 0 80px var(--shadow-color), 0 0 110px var(--shadow-color), 0 0 210px var(--shadow-color);\n  }\n  100% {\n    text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light), 0 0 3px var(--shadow-color-light), 0 0 10px var(--shadow-color-light), 0 0 20px var(--shadow-color-light), 0 0 30px var(--shadow-color), 0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 70px var(--shadow-color), 0 0 100px var(--shadow-color), 0 0 200px var(--shadow-color);\n  }\n}\nbody.light {\n  /* Overlay */\n  /* Ripple */\n  /* Hover, Focus */\n  /* Active */\n  /* Disabled */\n}\nbody.light .appbar {\n  background-color: #202b3b;\n}\nbody.light .appbar .title h1 {\n  color: white;\n}\nbody.light .appbar .title h2 {\n  color: white;\n  animation: neon 3s infinite;\n}\nbody.light .appbar .slogan {\n  color: white;\n  letter-spacing: 0.2vw;\n}\nbody.light .appbar .application-waffel img,\nbody.light .appbar .application-waffel svg {\n  color: white;\n  border-color: transparent;\n}\nbody.light .appbar .application-waffel img circle[stroke],\nbody.light .appbar .application-waffel svg circle[stroke],\nbody.light .appbar .application-waffel img polyline[stroke],\nbody.light .appbar .application-waffel svg polyline[stroke],\nbody.light .appbar .application-waffel img path[stroke],\nbody.light .appbar .application-waffel svg path[stroke],\nbody.light .appbar .application-waffel img g[stroke],\nbody.light .appbar .application-waffel svg g[stroke] {\n  stroke: white !important;\n}\nbody.light .appbar .application-waffel img rect[fill],\nbody.light .appbar .application-waffel svg rect[fill],\nbody.light .appbar .application-waffel img circle[fill],\nbody.light .appbar .application-waffel svg circle[fill] {\n  fill: white !important;\n}\nbody.light .appbar .application-waffel div {\n  color: white;\n}\nbody.light .appbar .application-waffel div.highlight {\n  animation: highlight 3s infinite;\n}\nbody.light .appbar .application-waffel.disabled {\n  opacity: 0.2;\n}\nbody.light .appbar .application-waffel:not(.disabled) img:hover,\nbody.light .appbar .application-waffel:not(.disabled) svg:hover {\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  border-color: white;\n}\nbody.light .spinner:before {\n  border-color: #ccc;\n  border-top-color: #C71D3D;\n}\nbody.light .material-button {\n  color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));\n  background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\nbody.light .material-button::before {\n  background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));\n  opacity: 0;\n}\nbody.light .material-button::after {\n  background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));\n  opacity: 0;\n}\nbody.light .material-button:hover,\nbody.light .material-button:focus {\n  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);\n}\nbody.light .material-button:hover::before {\n  opacity: 0.08;\n}\nbody.light .material-button:focus::before {\n  opacity: 0.24;\n}\nbody.light .material-button:hover:focus::before {\n  opacity: 0.3;\n}\nbody.light .material-button:active {\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\nbody.light .material-button:active::after {\n  opacity: 0.32;\n}\nbody.light .material-button:disabled {\n  color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);\n  background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.12);\n  box-shadow: none;\n}\nbody.light .material-button:disabled::before {\n  opacity: 0;\n}\nbody.light .material-button:disabled::after {\n  opacity: 0;\n}\nbody.light .confirm-dialog-btn-confirm {\n  background-color: #C71D3D;\n}\nbody.light .context-menu-list {\n  border-color: #DDD;\n  background: white;\n  border-left-color: #C71D3D;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);\n}\nbody.light .context-menu-list .context-menu-separator {\n  border-bottom: 1px solid #DDD;\n}\nbody.light .context-menu-list .context-menu-item.hover {\n  background-color: #C71D3D;\n  color: white;\n}\nbody.light .context-menu-list .context-menu-item.disabled {\n  color: #666;\n}\nbody.light .context-menu-list .context-menu-item.disabled.hover {\n  background-color: #EEE;\n}\nbody.light .context-menu-list .context-menu-item .context-menu-submenu:after {\n  color: #666;\n}\nbody.light .gutter {\n  background-color: #eee;\n}\nbody.light .gutter.gutter-vertical {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\nbody.light .gutter.gutter-horizontal {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\nbody.light .tinyFlyoverMenu {\n  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);\n  border-color: lightgray;\n  background-color: #fde9e9;\n}\nbody.light .tinyFlyoverMenu div {\n  border-color: transparent;\n}\nbody.light .tinyFlyoverMenu div:hover {\n  border-color: lightgray;\n}\nbody.light #home .authorPage h1 {\n  color: #C71D3D;\n}\nbody.light #home .authorPage h2 {\n  color: #C71D3D;\n}\nbody.light #home footer {\n  color: #C71D3D;\n}\nbody.light #home footer a {\n  color: #C71D3D;\n}\nbody.light #canvas_zoom {\n  background-color: rgba(178, 226, 242, 0.3);\n}\nbody.light #canvas_zoom button {\n  background-color: transparent;\n  border-color: transparent;\n  transition: all 0.5s;\n}\nbody.light #canvas_zoom button:hover {\n  border-color: #C71D3D;\n}\nbody.light #configMenuIcon:hover {\n  opacity: 1;\n  color: #C71D3D;\n}\nbody.light #figureConfigDialog {\n  background-color: white;\n  border-color: rgba(0, 0, 0, 0.2);\n  border-left-color: #C71D3D;\n}\nbody.light #figureConfigDialog .figureAddLabel:hover {\n  color: #C71D3D;\n}\nbody.light #figureConfigDialog:after {\n  border-color: transparent;\n  border-right-color: #C71D3D;\n}\nbody.light .modal-backdrop.in {\n  opacity: 0.7;\n  background-color: black;\n}\nbody.light .genericDialog .modal-content {\n  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);\n  background-color: #ffffff;\n}\nbody.light .genericDialog .modal-content .modal-header {\n  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);\n}\nbody.light .genericDialog .modal-content .modal-body .form-control {\n  color: #4D4D4D;\n  border-color: #DFDFDF;\n  box-shadow: none;\n}\nbody.light .genericDialog .modal-content .modal-body .form-control:focus {\n  background-color: #f5f5f5;\n}\nbody.light .genericDialog .modal-content .modal-body .list-group *[data-draw2d=\"true\"] {\n  color: #C71D3D;\n}\nbody.light .genericDialog .modal-content .modal-body .list-group .list-group-item {\n  background-color: transparent;\n}\nbody.light .genericDialog .modal-content .modal-body .list-group *[data-draw2d=\"false\"][data-type=\"file\"] {\n  color: gray;\n}\nbody.light .genericDialog .modal-content .modal-footer {\n  background-color: transparent;\n}\nbody.light .genericDialog .modal-content .modal-footer .btn,\nbody.light .genericDialog .modal-content .modal-footer .btn-group {\n  background-color: transparent;\n  color: #C71D3D;\n}\nbody.light .genericDialog .modal-content .modal-footer .btn:hover,\nbody.light .genericDialog .modal-content .modal-footer .btn-group:hover {\n  background-color: rgba(199, 29, 61, 0.04);\n}\nbody.light .genericDialog .modal-content .modal-footer .btn-group {\n  background-color: transparent;\n  color: #C71D3D;\n}\nbody.light .genericDialog .modal-content .modal-footer .btn-group .btn:hover {\n  background-color: transparent;\n}\nbody.light .genericDialog .modal-content .modal-footer .btn-group:hover {\n  background-color: rgba(199, 29, 61, 0.04);\n}\nbody.light .tab-pane {\n  box-shadow: -6px 0 20px -4px rgba(31, 73, 125, 0.3);\n}\nbody.light #files .teaser {\n  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.4) 70%, #fff 100%), radial-gradient(ellipse at center, rgba(247, 249, 250, 0.7) 0%, rgba(247, 249, 250, 0) 60%), linear-gradient(to bottom, rgba(247, 249, 250, 0) 0%, #f7f9fa 100%);\n}\nbody.light #files .teaser .title {\n  color: #C71D3D;\n}\nbody.light #files .teaser .slogan {\n  color: #34495e;\n}\nbody.light #files .deleteIcon:hover {\n  background-color: rgba(0, 0, 0, 0.03);\n}\nbody.light #files .list-group-item {\n  cursor: pointer;\n}\nbody.light #files .list-group-item .thumb .filenameInplaceEdit {\n  color: #C71D3D;\n}\nbody.light #files .list-group-item .thumb h4 {\n  color: #C71D3D;\n}\nbody.light #files .thumbAdd {\n  color: #0078f2;\n  border-color: rgba(0, 120, 242, 0.33);\n}\nbody.light #files .thumbAdd:hover {\n  border-color: #0078f2;\n}\nbody.light #files #material-tabs {\n  border-bottom-color: #e0e0e0;\n}\nbody.light #files #material-tabs a {\n  color: #424f5a;\n}\nbody.light #files .material-tab-content > div {\n  background-color: #fef9f9;\n}\nbody.light #files #material-tabs > a:not(.active):hover {\n  background-color: inherit;\n  color: #C71D3D;\n}\nbody.light #files .yellow-bar {\n  background: #fef9f9;\n  transition: all 0.3s ease;\n  border-color: #e0e0e0;\n}\nbody.light #githubNewFileDialog .filePreview {\n  color: #C71D3D;\n}\nbody.light #notificationToast {\n  background-color: #C71D3D;\n  color: white;\n}\nbody.light .markdownRendering table {\n  color: #666;\n  text-shadow: 1px 1px 0px #fff;\n  background: #eaebec;\n  border-color: #ccc;\n  box-shadow: 0 1px 2px #d1d1d1;\n}\nbody.light .markdownRendering table th {\n  border-top-color: #fafafa;\n  border-bottom-color: #e0e0e0;\n}\nbody.light .markdownRendering table tr td {\n  border-top-color: #ffffff;\n  border-bottom-color: #e0e0e0;\n  border-left-color: #e0e0e0;\n}\nbody.light .markdownRendering tbody tr:nth-child(odd) {\n  background: #fafafa;\n}\nbody.light .markdownRendering tbody tr:nth-child(even) {\n  background: #f3f3f3;\n}\nbody.light .markdownRendering .info {\n  border-color: #B4E1E4;\n  background-color: #81c7e1;\n  color: white;\n}\nbody.light .toolbar {\n  background-color: #B2E2F2;\n}\nbody.light .image-button img,\nbody.light .image-button svg {\n  color: #777;\n  border-color: transparent;\n}\nbody.light .image-button img circle[stroke],\nbody.light .image-button svg circle[stroke],\nbody.light .image-button img polyline[stroke],\nbody.light .image-button svg polyline[stroke],\nbody.light .image-button img path[stroke],\nbody.light .image-button svg path[stroke],\nbody.light .image-button img g[stroke],\nbody.light .image-button svg g[stroke] {\n  stroke: #777 !important;\n}\nbody.light .image-button img rect[fill],\nbody.light .image-button svg rect[fill],\nbody.light .image-button img circle[fill],\nbody.light .image-button svg circle[fill] {\n  fill: #777 !important;\n}\nbody.light .image-button div {\n  color: #777;\n}\nbody.light .image-button div.highlight {\n  animation: highlight 3s infinite;\n}\nbody.light .image-button.disabled {\n  opacity: 0.2;\n}\nbody.light .image-button:not(.disabled) img:hover,\nbody.light .image-button:not(.disabled) svg:hover {\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  border-color: rgba(0, 0, 0, 0.15);\n}\n@keyframes highlight {\n  0% {\n    color: #C71D3D;\n  }\n  50% {\n    color: rgba(0, 0, 0, 0.4);\n  }\n  100% {\n    color: #C71D3D;\n  }\n}\n/* https://css-tricks.com/snippets/css/a-guide-to-flexbox/ */\n.hero {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  z-index: 20;\n  height: 100vh;\n  background-color: #fff;\n  color: #333;\n  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);\n  border-bottom: 2px solid #C71D3D;\n  scroll-snap-align: start;\n}\n.hero .toolbar {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  font-size: 30px;\n  color: white;\n  background-color: white;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n}\n.hero .toolbar .title img {\n  height: 30px;\n  margin-left: 30px;\n  margin-top: 5px;\n}\n.hero .toolbar .title .app_name {\n  font-weight: 200;\n  display: inline-block;\n  top: 6px;\n  position: relative;\n  left: 20px;\n  color: #C71D3D;\n}\n.hero .toolbar .title .app_slogan {\n  font-weight: 200;\n  display: inline-block;\n  top: 6px;\n  position: relative;\n  left: 20px;\n  color: #C71D3D;\n  font-size: 70%;\n  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n@media (max-width: 990px) {\n  .hero .toolbar .title .app_slogan {\n    font-size: 50%;\n    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n  }\n}\n@media (max-width: 890px) {\n  .hero .toolbar .title .app_slogan {\n    display: none;\n    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n  }\n}\n.hero .teaserContainer {\n  flex-grow: 4;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  justify-content: center;\n  align-items: center;\n  align-content: center;\n  gap: 50px;\n}\n.hero .teaserContainer .teaser {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  align-items: center;\n  align-content: center;\n}\n.hero .teaserContainer .teaser .slogan {\n  font-weight: 300;\n  line-height: 1.2;\n  font-size: calc(8px + 1vw);\n  color: black;\n  padding-left: 60px;\n}\n.hero .teaserContainer .teaser .slogan h1 {\n  font-weight: 500;\n  font-size: calc(20px + 1vw);\n  line-height: 1.2;\n  color: #C71D3D;\n}\n.hero .teaserContainer .teaser .imageContainer {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  align-items: center;\n  align-content: center;\n}\n.hero .teaserContainer .teaser .imageContainer img {\n  width: 33vw;\n}\n.hero .teaserContainer .launch_button:hover {\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n}\n.hero .avatarContainer {\n  flex-grow: 0;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  align-items: flex-end;\n}\n.hero .avatarContainer .avatar {\n  text-align: center;\n  font-weight: 400;\n  font-size: 16px;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  align-content: flex-end;\n  justify-content: flex-end;\n  align-items: center;\n}\n.hero .avatarContainer .avatar img {\n  height: 120px;\n}\n.hero .avatarContainer .arrow {\n  animation: mover 2s infinite alternate;\n  font-size: 20px;\n}\n.hero .avatarContainer .arrow i {\n  height: 20px;\n  display: inline-block;\n  border-left: 4px solid #000;\n  border-radius: 4px;\n}\n.hero .avatarContainer .arrow i.left {\n  transform: rotate(-45deg);\n}\n.hero .avatarContainer .arrow i.right {\n  transform: rotate(45deg) translate(3px, -2px);\n}\n@keyframes mover {\n  0% {\n    transform: translateY(0);\n  }\n  100% {\n    transform: translateY(-10px);\n  }\n}\n.intro {\n  background-color: white;\n  background-image: none;\n  text-align: left;\n  position: relative;\n  z-index: 20;\n  height: 100vh;\n  padding-bottom: 20px;\n  color: #333;\n  font-size: 30px;\n}\n.intro .header {\n  font-size: calc(19px + 1vw);\n  line-height: 1.2;\n  top: 2vw;\n  padding-left: 50px;\n  color: #C71D3D;\n  position: absolute;\n  padding-top: 30px;\n  background-color: rgba(255, 255, 255, 0.8);\n}\n.intro .header div {\n  font-size: calc(6px + 1vw);\n  font-weight: 200;\n  color: black;\n  padding-top: 30px;\n}\n.intro img {\n  width: 50%;\n  vertical-align: middle;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  left: 0;\n  right: 0;\n}\n.intro .launch_button {\n  position: absolute;\n  right: 50px;\n  bottom: 100px;\n}\n.intro .launch_button:hover {\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n}\n.slidedeck {\n  position: absolute;\n  height: 400vh;\n  width: 100%;\n  background-image: linear-gradient(135deg, #e13f4d, #d34657);\n}\n.slidedeck .pink_bg {\n  position: absolute;\n  top: 100vh;\n  height: 300vh;\n  width: 100%;\n  background-image: linear-gradient(153deg, #fa7e93, #f5d8d8);\n}\n.slidedeck .orange_bg {\n  position: absolute;\n  top: 100vh;\n  height: 200vh;\n  width: 100%;\n  background-image: linear-gradient(135deg, #f8ac5c, #fcbe78);\n}\n.slidedeck .blue_bg {\n  position: absolute;\n  top: 100vh;\n  height: 100vh;\n  width: 100%;\n  background-image: linear-gradient(135deg, #242533, #2a3079);\n}\n.slidedeck .section_header {\n  color: white;\n  font-size: calc(16px + 2vw);\n  text-align: center;\n  font-weight: 100;\n  padding-top: 30px;\n  position: sticky;\n  top: 20px;\n}\n.slidedeck .card {\n  position: sticky;\n  z-index: 1000;\n  width: 25%;\n  height: 50vh;\n  border-radius: 10px;\n  background-color: #fff;\n  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.25);\n  top: 0;\n}\n.slidedeck .card .text {\n  position: absolute;\n  top: -40px;\n  text-align: center;\n  color: white;\n  font-size: 24px;\n  font-weight: 100;\n  width: 100%;\n}\n.slidedeck .card .media {\n  position: absolute;\n  top: 10px;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.slidedeck .card .content {\n  position: absolute;\n  top: 80px;\n  padding: 10px;\n}\n.slidedeck .card .content .header {\n  color: #C71D3D;\n  text-align: center;\n  margin-bottom: 10px;\n}\n.slidedeck .card .launch_button {\n  position: absolute;\n  left: 50%;\n  bottom: 10px;\n  transform: translateX(-50%);\n  border-radius: 4px;\n  font-size: 14px;\n  padding: 10px;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.slidedeck .card.left {\n  left: 5%;\n  transform: translateY(50%);\n}\n.slidedeck .card.center {\n  left: 50%;\n  transform: translateY(50%) translateX(-50%);\n}\n.slidedeck .card.right {\n  left: 70%;\n  transform: translateY(50%);\n}\nbody {\n  margin: 0;\n  padding: 0;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  scroll-snap-type: y mandatory;\n}\n.launch_button {\n  margin-top: 20px;\n  border-radius: 5px;\n  display: inline-block;\n  padding: 5px;\n  padding-left: 10px;\n  padding-right: 10px;\n  font-size: calc(10px + 1vw);\n  cursor: pointer;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n  text-decoration: none;\n  background-color: #C71D3D;\n  color: white;\n  font-weight: 300;\n}\n.image-button img,\n.image-button svg {\n  color: #777;\n}\n.image-button img circle[stroke],\n.image-button svg circle[stroke],\n.image-button img polyline[stroke],\n.image-button svg polyline[stroke],\n.image-button img path[stroke],\n.image-button svg path[stroke],\n.image-button img g[stroke],\n.image-button svg g[stroke] {\n  stroke: #777 !important;\n}\n.image-button img rect[fill],\n.image-button svg rect[fill],\n.image-button img circle[fill],\n.image-button svg circle[fill] {\n  fill: #777 !important;\n}\n.image-button div {\n  color: #777;\n}\n.image-button div.highlight {\n  animation: highlight 3s infinite;\n}\n.image-button.disabled {\n  opacity: 0.2;\n}\n.image-button:not(.disabled) img,\n.image-button:not(.disabled) svg {\n  cursor: pointer;\n}\n.image-button:not(.disabled) img:hover,\n.image-button:not(.disabled) svg:hover {\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n}\n", "",{"version":3,"sources":["webpack://./common/less/layout/common.less","webpack://./public/less/index.less","webpack://./common/less/layout/userinfo.less","webpack://./common/less/layout/appbar.less","webpack://./common/less/layout/toolbar.less","webpack://./common/less/layout/dialog.less","webpack://./common/less/layout/contextmenu.less","webpack://./common/less/layout/file_new_dialog.less","webpack://./common/less/layout/file_open_dialog.less","webpack://./common/less/layout/file_save_dialog.less","webpack://./common/less/layout/file_saveas_dialog.less","webpack://./common/less/layout/canvas_zoom.less","webpack://./common/less/layout/markdown_rendering.less","webpack://./common/less/layout/tiny_flyover_menu.less","webpack://./common/less/layout/notification.less","webpack://./common/less/layout/tab_strip.less","webpack://./common/less/layout/tab_content.less","webpack://./common/less/layout/tabpane_editor.less","webpack://./common/less/layout/tabpane_files.less","webpack://./common/less/layout/author_page.less","webpack://./common/less/layout/config_dialog.less","webpack://./common/less/layout/appSwitch.less","webpack://./common/less/layout/image_button.less","webpack://./common/less/theme_light.less","webpack://./public/less/hero.less","webpack://./public/less/intro.less","webpack://./public/less/slidedeck.less"],"names":[],"mappings":"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","sourcesContent":["\nbody {\n    font-family: 'Roboto', sans-serif !important;\n    font-weight: 300;\n}\n  \n@keyframes spinner {\n    to {transform: rotate(360deg);}\n}\n\n.spinner:before {\n    content: '';\n    box-sizing: border-box;\n    position: absolute;\n    top: 35%;\n    left: 50%;\n    width: 30px;\n    height: 30px;\n    margin-top: -15px;\n    margin-left: -15px;\n    border-radius: 50%;\n    border-width:2px;\n    border-style: solid;\n    animation: spinner .6s linear infinite;\n}\n\n\n.material-button {\n    position: relative;\n    display: inline-block;\n    box-sizing: border-box;\n    border: none;\n    border-radius: 4px;\n    padding: 0 16px;\n    min-width: 64px;\n    height: 36px;\n    vertical-align: middle;\n    text-align: center;\n    text-overflow: ellipsis;\n    text-transform: uppercase;\n    font-size: 14px;\n    font-weight: 500;\n    line-height: 36px;\n    overflow: hidden;\n    outline: none;\n    cursor: pointer;\n    transition: box-shadow 0.2s;\n}\n\n.material-button::-moz-focus-inner {\n    border: none;\n}\n\n/* Overlay */\n.material-button::before {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    opacity: 0;\n    transition: opacity 0.2s;\n}\n\n/* Ripple */\n.material-button::after {\n    content: \"\";\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    border-radius: 50%;\n    padding: 50%;\n    width: 32px; /* Safari */\n    height: 32px; /* Safari */\n    opacity: 0;\n    transform: translate(-50%, -50%) scale(1);\n    transition: opacity 1s, transform 0.5s;\n}\n\n\n.material-button:active::after {\n    transform: translate(-50%, -50%) scale(0);\n    transition: transform 0s;\n}\n\n/* Disabled */\n.material-button:disabled {\n    cursor: initial;\n}\n\n\n.tooltip{\n    z-index: 1000000;\n}\n  ","@import \"../../common/less/index\";\n\n@import \"variables\";\n@import \"hero\";\n@import \"intro\";\n@import \"slidedeck\";\n\n\nbody {\n    margin: 0;\n    padding: 0;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    scroll-snap-type: y mandatory;\n}\n\n\n.launch_button {\n    margin-top: 20px;\n    border-radius: 5px;\n    display: inline-block;\n    padding: 5px;\n    padding-left: 10px;\n    padding-right: 10px;\n    font-size: calc(10px + 1vw);\n    cursor: pointer;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);\n    text-decoration: none;\n    background-color: #C71D3D;\n    color: white;\n    font-weight: 300;\n}\n\n\n.image-button {\n\n    img,\n    svg {\n        color: #777;\n\n        circle[stroke],\n        polyline[stroke],\n        path[stroke],\n        g[stroke] {\n            stroke: #777 !important;\n        }\n\n        rect[fill],\n        circle[fill] {\n            fill: #777 !important;\n        }\n    }\n\n    div {\n        color: #777;\n\n        &.highlight {\n            animation: highlight 3s infinite;\n        }\n    }\n\n    &.disabled {\n        opacity: 0.2;\n    }\n\n    &:not(.disabled) {\n\n        img,\n        svg {\n            cursor: pointer;\n\n            &:hover {\n                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n            }\n        }\n    }\n}",".userinfo_toggler{\n\n  .userContainer {\n    text-align: center;\n    img {\n      width: 90px;\n    }\n  }\n}\n",".appbar {\n    height:@appbarHeight;\n    position: relative;\n    border: none !important;\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding-left:10px;\n    padding-right:10px;\n\n    .icon {\n        height: @toolbarHeight - 20;\n    }\n    .title {\n        h1 {\n            font-size: 24px;\n            font-weight: 100;\n            letter-spacing: 6px;\n            margin: 0;\n        }\n        h2 {\n            font-size: 14px;\n            font-weight: 100;\n            letter-spacing:4px;\n            margin: 0;\n        }\n    }\n\n    .spacer {\n        flex-grow: 1;\n    }\n\n    .group {\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n    }    \n}",".toolbar {\n  position: relative;\n  border: none !important;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding-right: 10px;\n  height: @toolbarHeight;\n\n  * {\n    outline: none;\n  }\n\n  .spacer {\n    flex-grow: 1;\n  }\n\n  .group {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n\n    .statusIndicator {\n      margin: 20px;\n\n      img {\n        display: block;\n        cursor: pointer;\n        margin: auto;\n      }\n\n      span {\n        font-size: .8em;\n        text-align: center;\n        width: 100%;\n        display: inline-block;\n        white-space: nowrap;\n      }\n\n      .notSupported {\n        display: none;\n        font-weight: bold;\n      }\n\n      .connected {\n        display: block;\n      }\n\n      .disconnected {\n        display: none;\n      }\n    }\n\n    .statusIndicator.disabled {\n      img {\n        cursor: not-allowed;\n\n        &:hover {\n          box-shadow: none;\n        }\n      }\n\n      .notSupported {\n        display: block;\n      }\n\n      .connected {\n        display: none;\n      }\n\n      .disconnected {\n        display: none;\n      }\n    }\n\n    .statusIndicator.error:not(.disabled) {\n      span {\n        font-weight: bold;\n      }\n\n      .notSupported {\n        display: none;\n      }\n\n      .connected {\n        display: none;\n      }\n\n      .disconnected {\n        display: block;\n      }\n    }\n  }\n}",".modal-backdrop.in{\n  transition: all .4s linear;\n}\n\n.genericDialog {\n  .modal-content{\n    border-radius:4px;\n\n    .modal-header{\n      border-bottom:0;\n      font-weight:400;\n    }\n\n    .modal-body {\n      min-height:120px;\n\n      .form-control{\n        appearance: none;\n        box-sizing: border-box;\n        border-radius: 4px;\n        margin: 0;\n        padding: 0;\n        display: inline-block;\n        font: inherit;\n        border-width:1px;\n        border-style: solid;\n        box-shadow: none;\n        height: 24px;\n        padding: 0 3px;\n      }\n\n      .list-group {\n        overflow-y: auto;\n        overflow-x: auto;\n\n        *[data-draw2d=\"true\"] {\n          font-weight: bold;\n        }\n\n        .list-group-item {\n          background-color: transparent;\n          font-weight: 300;\n\n          &:hover {\n            text-decoration: underline;\n          }\n        }\n\n        *[data-draw2d=\"false\"][data-type=\"file\"] {\n          cursor: default;\n          text-decoration: none !important;\n\n        }\n      }\n    }\n\n    .modal-footer {\n      border-top:0;\n\n      .btn, .btn-group{\n        border:0;\n        text-transform: uppercase;\n        background-color:transparent;\n        transition: all 0.5s;\n\n        &:hover{\n          transition: all 0.5s;\n        }\n      }\n      .btn-group{\n        .dropdown-toggle{\n          .caret{\n            margin-top:7px;\n          }\n        }\n        border:0;\n        text-transform: uppercase;\n        transition: all 0.5s;\n\n        &:hover{\n          transition: all 0.5s;\n        }\n      }\n\n      .btn-primary{\n        font-weight: bold;\n      }\n    }\n  }\n}\n",".context-menu-list {\n  margin: 0;\n  padding: 0;\n\n  min-width: 120px;\n  max-width: unset;\n  display: inline-block;\n  position: absolute;\n  list-style-type: none;\n\n  border-width: 1px;\n  border-style: solid;\n  border-left-width: 2px;\n  font-size: 15px;\n  white-space: nowrap;\n\n  .context-menu-item {\n    padding: 5px 5px 5px 24px;\n    position: relative;\n    user-select: none;\n\n    &.hover {\n      cursor: pointer;\n    }\n\n    >label {\n\n      >input,\n      >textarea {\n        user-select: text;\n      }\n    }\n  }\n\n  .context-menu-separator {\n    padding-bottom: 0;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n  }\n\n  .context-menu-input.hover,\n  .context-menu-item.disabled.hover {\n    cursor: default;\n  }\n\n  .context-menu-submenu:after {\n    content: \">\";\n    position: absolute;\n    top: 0;\n    right: 3px;\n    z-index: 1;\n  }\n\n  .context-menu-item.icon {\n    min-height: 18px;\n  }\n\n  .context-menu-item.icon:before {\n    position: relative;\n    left: -15px;\n    font-size: 19px;\n  }\n\n  /* vertically align inside labels */\n  .context-menu-input>label>* {\n    vertical-align: top;\n  }\n\n  /* position checkboxes and radios as icons */\n  .context-menu-input>label>input[type=\"checkbox\"],\n  .context-menu-input>label>input[type=\"radio\"] {\n    margin-left: -17px;\n  }\n\n  .context-menu-input>label>span {\n    margin-left: 5px;\n  }\n\n  .context-menu-input>label,\n  .context-menu-input>label>input[type=\"text\"],\n  .context-menu-input>label>textarea,\n  .context-menu-input>label>select {\n    display: block;\n    width: 100%;\n    box-sizing: border-box;\n  }\n\n  .context-menu-input>label>textarea {\n    height: 100px;\n  }\n\n  .context-menu-item>.context-menu-list {\n    display: none;\n    /* re-positioned by js */\n    right: -5px;\n    top: 5px;\n  }\n\n  .context-menu-item.hover>.context-menu-list {\n    display: block;\n  }\n\n  .context-menu-accesskey {\n    text-decoration: underline;\n  }\n\n  .context-menu-list {\n    border-color: #DDD;\n    background: white;\n    border-left-color: #C71D3D;\n    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);\n\n    .context-menu-separator {\n      border-bottom: 1px solid #DDD;\n    }\n\n    .context-menu-item {\n      &.hover {\n        background-color: #C71D3D;\n        color: white;\n      }\n\n      &.disabled {\n        color: #666;\n\n        &.hover {\n          background-color: #EEE;\n        }\n      }\n\n      .context-menu-submenu:after {\n        color: #666;\n      }\n    }\n  }\n}","\n#githubNewFileDialog {\n\n  .filePreview{\n    font-size:115px;\n  }\n\n}\n","\n#fileOpenDialog {\n\n  .list-group{\n    height:60%;\n  }\n}\n","\n#fileSaveDialog {\n\n  .filePreview{\n    max-width: 200px;\n    max-height: 200px;\n  }\n\n  .modal-body {\n    .media {\n      padding: 20px;\n    }\n  }\n}\n","\n#githubFileSaveAsDialog {\n\n  .filePreview{\n    max-width: 200px;\n    max-height: 200px;\n  }\n\n\n  .list-group{\n    height:250px;\n  }\n}\n","#canvas_zoom{\n  position: fixed;\n  bottom: 20px;\n  right: @rightMenuWidth + 20px;\n  border-radius:5px;\n  display: flex;\n  flex-wrap: nowrap;\n  align-items: center;\n\n  button {\n    background-color:transparent;\n    font-weight:300;\n    padding:5px;\n    padding-left:10px;\n    padding-right:10px;\n    border-width:1px;\n    border-style: solid;\n    outline:none;\n    transition: all 0.5s;\n    &:hover {\n      border-width:1px;\n      border-style: solid;\n    }\n  }\n}\n",".markdownRendering{\n  padding:20px;\n  img {\n    max-width: 100%;\n  }\n\n  p{\n    font-size: 16px;\n    margin-top: 30px;\n  }\n  table {\n    margin-left:auto;\n    margin-right:auto;\n    font-family:Arial, Helvetica, sans-serif;\n    font-size:12px;\n    border-width:1px;\n    border-style: solid;\n    border-radius:3px;\n  }\n  table th {\n    padding:21px 25px 22px 25px;\n    border-width:1px;\n    border-style: solid;\n  }\n\n  table th:first-child{\n    text-align: left;\n    padding-left:20px;\n  }\n  table tr:first-child th:first-child{\n    border-top-left-radius:3px;\n  }\n  table tr:first-child th:last-child{\n    border-top-right-radius:3px;\n  }\n  table tr{\n    text-align: center;\n    padding-left:20px;\n  }\n  table tr td:first-child{\n    text-align: left;\n    padding-left:20px;\n    border-left: 0;\n  }\n  table tr td {\n    padding:18px;\n    border-width:1px;\n    border-style: solid;\n  }\n\n  table tr:last-child td{\n    border-bottom:0;\n  }\n\n  table tr:last-child td:first-child{\n    border-bottom-left-radius:3px;\n  }\n\n  table tr:last-child td:last-child{\n    border-bottom-right-radius:3px;\n  }\n\n  .info{\n    border-width:1px;\n    border-style: solid;\n    border-radius: 5px;\n    font-weight: 400;\n    letter-spacing: 2px;\n    padding: 5px;\n    padding: 5px;\n    padding-left: 20px;\n    padding-right: 20px;\n    p{\n      padding: 0;\n      margin:0;\n    }\n  }\n}\n","\n.tinyFlyoverMenu {\n  border-width:1px;\n  border-style: solid;\n  position:absolute;\n  top:-15px;\n  right:20px;\n  border-radius: 2px;\n  font-size:20px;\n  z-index:1;\n  padding: 3px;\n  \n  display: flex;\n  flex-direction: row;\n  align-items: stretch;\n  justify-content: center;\n  gap: 10px;\n  flex-wrap: nowrap;\n\n  div{\n    border-width:1px;\n    border-style: solid;\n    &:hover{\n      border-width:1px;\n      border-style: solid;\n      cursor:pointer;\n    }\n  }\n}\n\n.activeSection {\n\n  .tinyFlyoverMenu {\n    position:sticky;\n    float:right;\n    top:10px;\n  }\n}\n","\n#notificationToast{\n  position: absolute;\n  top: -20px;\n  left: 50%;\n  transform: translateX(-50%);\n  padding-left: 20px;\n  padding-right: 20px;\n  border-radius: 0 0 8px 8px;\n  font-weight: 100;\n  z-index:30000;\n}\n","#leftTabStrip {\n    height: 100%;\n    position:absolute;\n    width: @tabSize;\n    padding-top: @tabSize;\n    overflow:hidden;\n    &:after {\n        transform: rotate(-90deg) translate(-90px, -70px);\n        font-size: 55px;\n        white-space: nowrap;\n        font-weight: 200;\n        letter-spacing: 3px;\n    }\n  \n    .leftTab {\n      border-radius: 0 !important;\n      width:@tabSize;\n      height:@tabSize;\n    }\n  }\n","\n  .tab-content {\n    position: absolute;\n    left: @tabSize;\n    right: 0px;\n    top: @appbarHeight;\n    bottom:0;\n    .tab-pane {\n      display: none;\n      padding: 0;\n      height: 100%;\n      position: relative;\n\n      &.active {\n        display: flex !important;\n        flex-direction: column;\n        align-items: stretch;\n      }\n\n      .workspace {\n\n        #canvas_config {\n          position: relative;\n          width: 40px;\n          top: @toolbarHeight + 5;\n          left: unit(@leftPaneWidth+5, px);\n          cursor: pointer;\n          border-width: 1px;\n          border-style: solid;\n\n          &:hover {\n            border-width: 1px !important;\n            border-style: solid !important;\n          }\n        }\n\n\n        #canvas_config_items {\n          position: absolute;\n          top: @toolbarHeight+30;\n          left: unit(@leftPaneWidth+5, px);;\n          cursor: pointer;\n          padding: 10px;\n          white-space: nowrap;\n          min-width: 250px;\n        }\n\n      }\n    }\n  }\n","\n#editor{\n\n  .toolbar {\n    right: 0;\n    left: @leftPaneWidth;\n    position: absolute;\n  }\n\n  .workspace {\n    position: relative;\n    height:100%;\n  }\n}\n","#files {\n  overflow-y: scroll;\n  padding: 40px;\n\n  .teaser {\n    display: inline-block;\n    padding-left: 20px;\n    padding-right: 20px;\n    margin-bottom: 0;\n\n    .title {\n      font-weight: 200;\n      font-size: 4vw;\n      white-space: nowrap;\n      margin-bottom: 10px;\n\n      img {\n        padding-right: 40px;\n        height: 100px;\n      }\n    }\n\n    .slogan {\n      font-size: 2vw;\n      font-weight: 200;\n    }\n  }\n\n  .deleteIcon {\n    position: absolute;\n    right: 24px;\n    top: 18px;\n    cursor: pointer;\n    font-size: 25px;\n    padding: 4px;\n    border-radius: 2px;\n  }\n\n  .list-group-item {\n    cursor: pointer;\n\n    .thumb {\n      .thumbnail {\n        cursor: pointer;\n      }\n\n      .media-body {\n        padding-top: 14px;\n        padding-left: 20px;\n      }\n\n      .filenameInplaceEdit {\n        font-size: 18px;\n        margin-top: -5px;\n      }\n\n      h4 {\n        font-size: 18px;\n        display: inline-block;\n      }\n\n      .editIcon {\n        padding-left: 10px;\n        font-size: 14px;\n        display: none;\n      }\n\n      &:hover {\n        h4 {\n          text-decoration: underline;\n        }\n\n        .editIcon {\n          display: inline-block;\n        }\n      }\n    }\n\n  }\n\n  .thumbAdd {\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    cursor: pointer;\n    transition: all 1s;\n\n    div {\n      font-size: 160px;\n      text-align: center;\n    }\n\n    h4 {\n      text-align: center;\n    }\n\n    &:hover {\n      border-width: 1px;\n      border-style: solid;\n      transition: all 1s;\n    }\n  }\n\n  .fileOperations {\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    padding-bottom: 9px;\n  }\n\n\n  #material-tabs {\n    position: relative;\n    display: block;\n    padding: 0;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n\n    a {\n      position: relative;\n      display: inline-block;\n      text-decoration: none;\n      padding-bottom: 15px;\n      padding-left: 20px;\n      padding-right: 20px;\n      padding-top: 5px;\n      text-transform: uppercase;\n      font-size: 14px;\n      font-weight: 300;\n      text-align: center;\n      transition: all 0.3s ease;\n      outline: none;\n      z-index: 1001;\n\n      &.active {\n        font-weight: 400;\n        transition: all 0.3s ease;\n      }\n    }\n  }\n\n  .material-tab-content {\n    &>div {\n      padding: 10px;\n      min-height: 600px;\n    }\n  }\n\n  header {\n    position: relative;\n  }\n\n  .yellow-bar {\n    position: absolute;\n    z-index: 1000;\n    bottom: -2px;\n    height: 50px;\n    display: block;\n    left: 0;\n    transition: all 0.3s ease;\n    border-radius: 10px 10px 0 0;\n    border-width: 1px 1px 0 1px;\n    border-style: solid;\n  }\n}","#home {\n  overflow:scroll;\n\n  .authorPage {\n    padding: 40px !important;\n    font-size: calc(12px + 0.5vw);\n    font-weight: 400;\n\n\n    h1 {\n      font-weight: 200;\n      font-size: calc(16px + 2.5vw);\n      white-space: nowrap;\n      margin-bottom: 10px;\n    }\n\n    h2 {\n      font-size: calc(14px + 1.5vw);\n      font-weight: 200;\n    }\n\n  }\n  footer {\n    text-align: center;\n    margin-top: 100px;\n\n    a {\n      text-decoration: underline;\n    }\n  }\n}\n","\n#configMenuIcon{\n  font-size: 25px;\n  cursor:pointer;\n}\n\n\n#figureConfigDialog{\n  display:none;\n  border-width:1px;\n  border-style: solid;\n  padding: 10px;\n  margin-left:30px;\n  border-left-width:1px;\n  border-left-style: solid;\n  border-radius:4px;\n  .header{\n    font-size: 16px;\n    font-weight: 600;\n    padding-bottom: 15px;\n  }\n  .figureAddLabel{\n    font-size:12px;\n    font-weight: 200;\n    cursor:pointer;\n  }\n\n  .form-group{\n    textarea{\n      min-width: 300px;\n      min-height: 100px;\n    }\n  }\n  &:after {\n    content: '';\n    display: block;\n    position: absolute;\n    left: -20px;\n    top: 10px;\n    width: 0;\n    height: 0;\n    border-width:10px;\n    border-style: solid;\n  }\n}\n","\n.applicationSwitch {\n\n  .open {\n    .dropdown-menu{\n      z-index: 10000;\n      right:0;\n      left: initial;\n\n      display: grid;\n      max-width:200px;\n      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));\n      grid-auto-rows: minmax(80px, auto);\n      grid-gap: 5px;\n    }\n  }\n  .dropdown-menu{\n    display: none;\n  }\n}\n",".image-button {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    font-weight: 400;\n    img,\n    svg {\n      margin: 5px;\n      margin-bottom: 0;\n      padding: 0;\n      width: @toolbarHeight - 20;\n      height: @toolbarHeight - 20;\n      text-align: center;\n      font-size: 45px;\n      transition: all 0.5s;\n      border-radius: 4px;\n      border-width: 1px;\n      border-style: solid;\n    }\n\n    div {\n      text-align: center;\n      font-size: 10px;\n      cursor: default;\n    }\n\n    &:not(.disabled) {\n\n      img,\n      svg {\n        cursor: pointer;\n        &:hover {\n        }\n      }\n    }\n  }",":root {\n    --shadow-color: #C71D3D;\n    --shadow-color-light: white;\n}\n\n\n@keyframes neon {\n    0% {\n      text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light),\n      0 0 3px var(--shadow-color-light), 0 0 10px var(--shadow-color-light), 0 0 20px var(--shadow-color-light),\n      0 0 30px var(--shadow-color), 0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 70px var(--shadow-color), 0 0 100px var(--shadow-color), 0 0 200px var(--shadow-color);\n    }\n    50% {\n      text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light),\n      0 0 5px var(--shadow-color-light), 0 0 15px var(--shadow-color-light), 0 0 25px var(--shadow-color-light),\n      0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 60px var(--shadow-color), 0 0 80px var(--shadow-color), 0 0 110px var(--shadow-color), 0 0 210px var(--shadow-color);\n    }\n    100% {\n      text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light),\n      0 0 3px var(--shadow-color-light), 0 0 10px var(--shadow-color-light), 0 0 20px var(--shadow-color-light),\n      0 0 30px var(--shadow-color), 0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 70px var(--shadow-color), 0 0 100px var(--shadow-color), 0 0 200px var(--shadow-color);\n    }\n  }\n\nbody.light {\n\n    .appbar {\n        background-color:rgb(32, 43, 59);\n        .title {\n            h1 {\n                color: white;\n            }\n            h2 {\n                color: white;\n                animation: neon 3s infinite;\n            }\n        }\n        .slogan{\n            color: white;\n            letter-spacing: 0.2vw;\n        }\n\n        .application-waffel {\n\n            img,\n            svg {\n                color: white;\n                border-color:transparent;\n    \n                circle[stroke],\n                polyline[stroke],\n                path[stroke],\n                g[stroke] {\n                    stroke: white !important;\n                }\n    \n                rect[fill],\n                circle[fill] {\n                    fill: white !important;\n                }\n            }\n    \n            div {\n                color: white;\n    \n                &.highlight {\n                    animation: highlight 3s infinite;\n                }\n            }\n    \n            &.disabled {\n                opacity: 0.2;\n            }\n    \n            &:not(.disabled) {\n                img,\n                svg {\n                    &:hover {\n                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n                        border-color:white;\n                    }\n                }\n            }\n        }\n    }\n\n    .spinner:before {\n        border-color: #ccc;\n        border-top-color: #C71D3D;\n    }\n\n    .material-button {\n        color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));\n        background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));\n        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n    }\n\n    /* Overlay */\n    .material-button::before {\n        background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));\n        opacity: 0;\n    }\n\n    /* Ripple */\n    .material-button::after {\n        background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));\n        opacity: 0;\n    }\n\n    /* Hover, Focus */\n    .material-button:hover,\n    .material-button:focus {\n        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);\n    }\n\n    .material-button:hover::before {\n        opacity: 0.08;\n    }\n\n    .material-button:focus::before {\n        opacity: 0.24;\n    }\n\n    .material-button:hover:focus::before {\n        opacity: 0.3;\n    }\n\n    /* Active */\n    .material-button:active {\n        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n    }\n\n    .material-button:active::after {\n        opacity: 0.32;\n    }\n\n    /* Disabled */\n    .material-button:disabled {\n        color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);\n        background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.12);\n        box-shadow: none;\n    }\n\n    .material-button:disabled::before {\n        opacity: 0;\n    }\n\n    .material-button:disabled::after {\n        opacity: 0;\n    }\n\n\n    .confirm-dialog-btn-confirm {\n        background-color: #C71D3D;\n    }\n\n    .context-menu-list {\n        border-color: #DDD;\n        background: white;\n        border-left-color: #C71D3D;\n        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);\n\n        .context-menu-separator {\n            border-bottom: 1px solid #DDD;\n        }\n\n        .context-menu-item {\n            &.hover {\n                background-color: #C71D3D;\n                color: white;\n            }\n\n            &.disabled {\n                color: #666;\n\n                &.hover {\n                    background-color: #EEE;\n                }\n            }\n\n            .context-menu-submenu:after {\n                color: #666;\n            }\n        }\n\n    }\n\n    .gutter {\n        background-color: #eee;\n\n        &.gutter-vertical {\n            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');\n        }\n\n        &.gutter-horizontal {\n            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');\n        }\n    }\n\n    .tinyFlyoverMenu {\n        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);\n        border-color: lightgray;\n        background-color: rgb(253 233 233);\n\n        div {\n            border-color: transparent;\n            &:hover {\n                border-color: lightgray;\n            }\n        }\n    }\n\n    #home {\n        .authorPage {\n            h1 {\n                color: #C71D3D;\n            }\n\n            h2 {\n                color: #C71D3D;\n            }\n        }\n\n        footer {\n            color: #C71D3D;\n\n            a {\n                color: #C71D3D;\n            }\n        }\n    }\n\n    #canvas_zoom {\n        background-color: fadeout(#B2E2F2, 70%);\n\n        button {\n            background-color: transparent;\n            border-color: transparent;\n            transition: all 0.5s;\n\n            &:hover {\n                border-color: #C71D3D;\n            }\n        }\n    }\n\n    #configMenuIcon {\n        &:hover {\n            opacity: 1;\n            color: #C71D3D;\n        }\n    }\n\n\n    #figureConfigDialog {\n        background-color: white;\n        border-color: rgba(0, 0, 0, 0.2);\n        border-left-color: #C71D3D;\n\n        .figureAddLabel {\n            &:hover {\n                color: #C71D3D;\n            }\n        }\n\n        &:after {\n            border-color: transparent;\n            border-right-color: #C71D3D;\n        }\n    }\n\n    .modal-backdrop.in {\n        opacity: 0.7;\n        background-color: black;\n    }\n\n    .genericDialog {\n        .modal-content {\n            box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);\n            background-color: rgb(255, 255, 255);\n\n            .modal-header {\n                box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);\n            }\n\n            .modal-body {\n                .form-control {\n                    color: #4D4D4D;\n                    border-color: #DFDFDF;\n                    box-shadow: none;\n\n                    &:focus {\n                        background-color: rgb(245, 245, 245);\n                    }\n                }\n\n                .list-group {\n\n                    *[data-draw2d=\"true\"] {\n                        color: #C71D3D;\n                    }\n\n                    .list-group-item {\n                        background-color: transparent;\n                    }\n\n                    *[data-draw2d=\"false\"][data-type=\"file\"] {\n                        color: gray;\n                    }\n                }\n            }\n\n            .modal-footer {\n                background-color: transparent;\n\n                .btn,\n                .btn-group {\n                    background-color: transparent;\n                    color: #C71D3D;\n\n                    &:hover {\n                        background-color: fadeout(#C71D3D, 96);\n                    }\n                }\n\n                .btn-group {\n                    .btn {\n                        &:hover {\n                            background-color: transparent;\n                        }\n                    }\n\n                    background-color:transparent;\n                    color:#C71D3D;\n\n                    &:hover {\n                        background-color: fadeout(#C71D3D, 96);\n                    }\n                }\n            }\n        }\n    }\n\n    .tab-pane {\n        box-shadow: -6px 0 20px -4px rgba(31, 73, 125, 0.3);\n    }\n\n    #files {\n        .teaser {\n            background-image:\n                linear-gradient(to bottom, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, .4) 70%, #fff 100%),\n                radial-gradient(ellipse at center, rgba(247, 249, 250, .7) 0%, rgba(247, 249, 250, 0) 60%),\n                linear-gradient(to bottom, rgba(247, 249, 250, 0) 0%, #f7f9fa 100%);\n\n            .title {\n                color: #C71D3D;\n            }\n\n            .slogan {\n                color: #34495e;\n            }\n        }\n\n        .deleteIcon {\n            &:hover {\n                background-color: rgba(0, 0, 0, 0.03);\n            }\n        }\n\n        .list-group-item {\n            cursor: pointer;\n\n            .thumb {\n\n                .filenameInplaceEdit {\n                    color: #C71D3D;\n                }\n\n                h4 {\n                    color: #C71D3D;\n                }\n\n            }\n\n        }\n\n        .thumbAdd {\n            color: #0078f2;\n            border-color: rgba(0, 120, 242, 0.33);\n\n            &:hover {\n                border-color: rgba(0, 120, 242, 1);\n            }\n        }\n\n\n        #material-tabs {\n            border-bottom-color: #e0e0e0;\n\n            a {\n                color: #424f5a;\n            }\n        }\n\n        .material-tab-content {\n            &>div {\n                background-color: rgb(254 249 249);\n            }\n        }\n\n        #material-tabs>a:not(.active):hover {\n            background-color: inherit;\n            color: #C71D3D;\n        }\n\n        .yellow-bar {\n            background: rgb(254 249 249);\n            transition: all 0.3s ease;\n            border-color: #e0e0e0;\n        }\n    }\n\n    #githubNewFileDialog {\n        .filePreview {\n            color: #C71D3D;\n        }\n    }\n\n    #notificationToast {\n        background-color: #C71D3D;\n        color: white;\n    }\n\n    .markdownRendering {\n        table {\n            color: #666;\n            text-shadow: 1px 1px 0px #fff;\n            background: #eaebec;\n            border-color: #ccc;\n            box-shadow: 0 1px 2px #d1d1d1;\n        }\n\n        table th {\n            border-top-color: #fafafa;\n            border-bottom-color: #e0e0e0;\n        }\n\n        table tr td {\n            border-top-color: #ffffff;\n            border-bottom-color: #e0e0e0;\n            border-left-color: #e0e0e0;\n        }\n\n        tbody tr:nth-child(odd) {\n            background: #fafafa;\n        }\n\n        tbody tr:nth-child(even) {\n            background: #f3f3f3;\n        }\n\n        .info {\n            border-color: #B4E1E4;\n            background-color: #81c7e1;\n            color: white;\n\n            p {}\n        }\n    }\n\n    .toolbar {\n        background-color: #B2E2F2;\n    }\n\n    .image-button {\n\n        img,\n        svg {\n            color: #777;\n            border-color:transparent;\n\n            circle[stroke],\n            polyline[stroke],\n            path[stroke],\n            g[stroke] {\n                stroke: #777 !important;\n            }\n\n            rect[fill],\n            circle[fill] {\n                fill: #777 !important;\n            }\n        }\n\n        div {\n            color: #777;\n\n            &.highlight {\n                animation: highlight 3s infinite;\n            }\n        }\n\n        &.disabled {\n            opacity: 0.2;\n        }\n\n        &:not(.disabled) {\n            img,\n            svg {\n                &:hover {\n                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n                    border-color:rgba(0,0,0,0.15);\n                }\n            }\n        }\n    }\n    @keyframes highlight {\n        0% {\n            color: #C71D3D;\n        }\n\n        50% {\n            color: rgba(0, 0, 0, 0.4);\n        }\n\n        100% {\n            color: #C71D3D;\n        }\n    }\n\n}","/* https://css-tricks.com/snippets/css/a-guide-to-flexbox/ */\n\n.hero {\n    position: relative;\n    display: flex; \n    flex-direction: column;\n    flex-wrap: nowrap;\n    justify-content:space-between;\n\n    z-index: 20;\n    height: 100vh;\n    background-color: #fff;\n    color: #333;\n    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);\n    border-bottom: 2px solid #C71D3D;\n    scroll-snap-align: start;\n\n    .toolbar {\n        display: flex; \n        flex-direction: row;\n        flex-wrap: nowrap;\n        justify-content:space-between;\n\n        font-size: 30px;\n        color:white;\n        background-color:white;\n        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\n      \n        .title {\n          img{\n            height:30px;\n            margin-left:30px;\n            margin-top:5px;\n          }\n      \n          .app_name {\n            font-weight: 200;\n            display: inline-block;\n            top: 6px;\n            position: relative;\n            left: 20px;\n            color:#C71D3D;\n          }\n      \n          .app_slogan {\n            font-weight: 200;\n            display: inline-block;\n            top: 6px;\n            position: relative;\n            left: 20px;\n            color:#C71D3D;\n            font-size:70%;\n            transition: all 0.3s cubic-bezier(.25, .8, .25, 1);\n          }\n          @media (max-width: 990px) {\n            .app_slogan {\n              font-size:50%;\n              transition: all 0.3s cubic-bezier(.25, .8, .25, 1);\n            }\n          }\n          @media (max-width: 890px) {\n            .app_slogan {\n              display: none;\n              transition: all 0.3s cubic-bezier(.25, .8, .25, 1);\n            }\n          }\n        }\n    }\n      \n    .teaserContainer {\n        flex-grow: 4;\n\n        display: flex; \n        flex-direction: column;\n        flex-wrap: nowrap;\n        justify-content:center;\n        align-items: center;\n        align-content: center;\n        gap: 50px;\n        .teaser {\n            display: flex; \n            flex-direction: row;\n            flex-wrap: nowrap;\n            justify-content:space-between;\n            align-items: center;\n            align-content: center;\n\n            .slogan {\n\n                h1{\n                    font-weight: 500;\n                    font-size: calc(20px + 1vw);\n                    line-height: 1.2;        \n                    color: #C71D3D;\n                }\n                font-weight: 300;\n                line-height: 1.2;\n                font-size: calc(8px + 1vw);\n                color: black;\n                padding-left:60px;\n            }\n            .imageContainer {\n                display: flex; \n                flex-direction: column;\n                flex-wrap: nowrap;\n                justify-content:space-between;\n                align-items: center;\n                align-content: center;\n                img{\n                    width:33vw;\n                }\n            }\n        }\n        .launch_button {\n            &:hover {\n                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n            }\n        }    \n    }\n\n    .avatarContainer {\n        flex-grow: 0;\n\n        display: flex; \n        flex-direction: row;\n        flex-wrap: nowrap;\n        justify-content:space-between;\n        align-items: flex-end;\n        .avatar {\n            text-align: center;\n            font-weight: 400;\n            font-size: 16px;\n            display: flex;\n            flex-direction: column;\n            flex-wrap: nowrap;\n            align-content: flex-end;\n            justify-content: flex-end;\n            align-items: center;\n            img {\n                height: 120px;\n            }\n        }\n\n        .arrow {\n            animation: mover 2s infinite alternate;\n            font-size:20px;\n            i {\n                height: 20px;\n                display: inline-block;\n                border-left: 4px solid #000;\n                border-radius:4px;\n                &.left {\n                    transform: rotate(-45deg);\n                }\n    \n                &.right {\n                    transform: rotate(45deg) translate(3px, -2px);\n                }\n            }\n        }\n    }\n\n    @keyframes mover {\n        0% { transform: translateY(0); }\n        100% { transform: translateY(-10px); }\n    }\n}",".intro {\n    background-color: white;\n    background-image: none;\n    text-align: left;\n    position: relative;\n    z-index: 20;\n    height: 100vh;\n    padding-bottom: 20px;\n    color: #333;\n    font-size: 30px;\n\n    .header {\n        font-size: calc(19px + 1vw);\n        line-height: 1.2;\n        top: 2vw;\n        padding-left: 50px;\n        color: #C71D3D;\n        position: absolute;\n        padding-top: 30px;\n        background-color: rgba(255, 255, 255, 0.8);\n        div {\n            font-size: calc(6px + 1vw);\n            font-weight: 200;\n            color: black;\n            padding-top: 30px;\n        }\n    }\n\n    img {\n        width: 50%;\n        vertical-align: middle;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        margin: auto;\n        left: 0;\n        right: 0;\n    }\n\n    .launch_button {\n        position: absolute;\n        right: 50px;\n        bottom: 100px;\n\n        &:hover {\n            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n        }\n    }\n}",".slidedeck {\n    position: absolute;\n    height: 400vh;\n    width: 100%;\n    background-image: linear-gradient(135deg, #e13f4d, #d34657);\n\n    .pink_bg {\n        position: absolute;\n        top: 100vh;\n        height: 300vh;\n        width: 100%;\n        background-image: linear-gradient(153deg, #fa7e93, #f5d8d8);\n    }\n\n    .orange_bg {\n        position: absolute;\n        top: 100vh;\n        height: 200vh;\n        width: 100%;\n        background-image: linear-gradient(135deg, #f8ac5c, #fcbe78);\n    }\n\n    .blue_bg {\n        position: absolute;\n        top: 100vh;\n        height: 100vh;\n        width: 100%;\n        background-image: linear-gradient(135deg, #242533, #2a3079);\n    }\n\n\n    .section_header {\n        color: white;\n        font-size: calc(16px + 2vw);\n        text-align: center;\n        font-weight: 100;\n        padding-top: 30px;\n        position: sticky;\n        top: 20px;\n    }\n\n    .card {\n        position: sticky;\n        z-index: 1000;\n        width: 25%;\n        height: 50vh;\n        border-radius: 10px;\n        background-color: #fff;\n        box-shadow: 0 10px 50px 0 rgba(0, 0, 0, .25);\n        top: 0;\n\n        .text {\n            position: absolute;\n            top: -40px;\n            text-align: center;\n            color: white;\n            font-size: 24px;\n            font-weight: 100;\n            width: 100%;\n        }\n        .media {\n            position: absolute;\n            top: 10px;\n            left: 50%;\n            transform: translateX(-50%);\n        }\n        .content {\n            position: absolute;\n            top: 80px;\n            padding: 10px;\n\n            .header {\n                color: #C71D3D;\n                text-align: center;\n                margin-bottom: 10px;\n            }\n        }\n\n        .launch_button {\n            position: absolute;\n            left: 50%;\n            bottom: 10px;\n            transform: translateX(-50%);\n            border-radius: 4px;\n            font-size: 14px;\n            padding: 10px;\n            padding-left: 20px;\n            padding-right: 20px;\n        }\n\n        &.left {\n            left: 5%;\n            transform: translateY(50%);\n        }\n\n        &.center {\n            left: 50%;\n            transform: translateY(50%) translateX(-50%);\n        }\n\n        &.right {\n            left: 70%;\n            transform: translateY(50%);\n        }\n    }\n}"],"sourceRoot":""}]);
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

/***/ "./node_modules/form-data/lib/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/form-data/lib/browser.js ***!
  \***********************************************/
/***/ ((module) => {

/* eslint-env browser */
module.exports = typeof self == 'object' ? self.FormData : window.FormData;


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

/***/ "./node_modules/axios/lib/adapters/adapters.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/adapters/adapters.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _http_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http.js */ "./node_modules/axios/lib/helpers/null.js");
/* harmony import */ var _xhr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xhr.js */ "./node_modules/axios/lib/adapters/xhr.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");





const knownAdapters = {
  http: _http_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  xhr: _xhr_js__WEBPACK_IMPORTED_MODULE_1__["default"]
}

_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].forEach(knownAdapters, (fn, value) => {
  if(fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getAdapter: (adapters) => {
    adapters = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      if((adapter = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter)) {
        break;
      }
    }

    if (!adapter) {
      if (adapter === false) {
        throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"](
          `Adapter ${nameOrAdapter} is not supported by the environment`,
          'ERR_NOT_SUPPORT'
        );
      }

      throw new Error(
        _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].hasOwnProp(knownAdapters, nameOrAdapter) ?
          `Adapter '${nameOrAdapter}' is not available in the build` :
          `Unknown adapter '${nameOrAdapter}'`
      );
    }

    if (!_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(adapter)) {
      throw new TypeError('adapter is not a function');
    }

    return adapter;
  },
  adapters: knownAdapters
});


/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_settle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../core/settle.js */ "./node_modules/axios/lib/core/settle.js");
/* harmony import */ var _helpers_cookies_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../helpers/cookies.js */ "./node_modules/axios/lib/helpers/cookies.js");
/* harmony import */ var _helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../helpers/buildURL.js */ "./node_modules/axios/lib/helpers/buildURL.js");
/* harmony import */ var _core_buildFullPath_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/buildFullPath.js */ "./node_modules/axios/lib/core/buildFullPath.js");
/* harmony import */ var _helpers_isURLSameOrigin_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../helpers/isURLSameOrigin.js */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
/* harmony import */ var _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../defaults/transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../helpers/parseProtocol.js */ "./node_modules/axios/lib/helpers/parseProtocol.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _helpers_speedometer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/speedometer.js */ "./node_modules/axios/lib/helpers/speedometer.js");
















function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = (0,_helpers_speedometer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(50, 250);

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(config.headers).normalize();
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

    if (_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isFormData(requestData) && (_platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStandardBrowserEnv || _platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStandardBrowserWebWorkerEnv)) {
      requestHeaders.setContentType(false); // Let the browser set it
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = (0,_core_buildFullPath_js__WEBPACK_IMPORTED_MODULE_4__["default"])(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), (0,_helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_5__["default"])(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(
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

      (0,_core_settle_js__WEBPACK_IMPORTED_MODULE_6__["default"])(function _resolve(value) {
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

      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"]('Request aborted', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"]('Network Error', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_8__["default"];
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"](
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ETIMEDOUT : _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (_platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStandardBrowserEnv) {
      // Add xsrf header
      const xsrfValue = (config.withCredentials || (0,_helpers_isURLSameOrigin_js__WEBPACK_IMPORTED_MODULE_9__["default"])(fullPath))
        && config.xsrfCookieName && _helpers_cookies_js__WEBPACK_IMPORTED_MODULE_10__["default"].read(config.xsrfCookieName);

      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isUndefined(config.withCredentials)) {
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
        reject(!cancel || cancel.type ? new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_11__["default"](null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = (0,_helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_12__["default"])(fullPath);

    if (protocol && _platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].protocols.indexOf(protocol) === -1) {
      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"]('Unsupported protocol ' + protocol + ':', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
});


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_bind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/bind.js */ "./node_modules/axios/lib/helpers/bind.js");
/* harmony import */ var _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Axios.js */ "./node_modules/axios/lib/core/Axios.js");
/* harmony import */ var _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./helpers/formDataToJSON.js */ "./node_modules/axios/lib/helpers/formDataToJSON.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _cancel_CancelToken_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cancel/CancelToken.js */ "./node_modules/axios/lib/cancel/CancelToken.js");
/* harmony import */ var _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cancel/isCancel.js */ "./node_modules/axios/lib/cancel/isCancel.js");
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _helpers_spread_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./helpers/spread.js */ "./node_modules/axios/lib/helpers/spread.js");
/* harmony import */ var _helpers_isAxiosError_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helpers/isAxiosError.js */ "./node_modules/axios/lib/helpers/isAxiosError.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");


















/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"](defaultConfig);
  const instance = (0,_helpers_bind_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.request, context);

  // Copy axios.prototype to instance
  _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].extend(instance, _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype, context, {allOwnKeys: true});

  // Copy context to instance
  _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance((0,_core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"])(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(_defaults_index_js__WEBPACK_IMPORTED_MODULE_4__["default"]);

// Expose Axios class to allow class inheritance
axios.Axios = _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"];

// Expose Cancel & CancelToken
axios.CanceledError = _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_5__["default"];
axios.CancelToken = _cancel_CancelToken_js__WEBPACK_IMPORTED_MODULE_6__["default"];
axios.isCancel = _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_7__["default"];
axios.VERSION = _env_data_js__WEBPACK_IMPORTED_MODULE_8__.VERSION;
axios.toFormData = _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_9__["default"];

// Expose AxiosError class
axios.AxiosError = _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_10__["default"];

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = _helpers_spread_js__WEBPACK_IMPORTED_MODULE_11__["default"];

// Expose isAxiosError
axios.isAxiosError = _helpers_isAxiosError_js__WEBPACK_IMPORTED_MODULE_12__["default"];

// Expose mergeConfig
axios.mergeConfig = _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"];

axios.AxiosHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_13__["default"];

axios.formToJSON = thing => (0,_helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_14__["default"])(_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isHTMLForm(thing) ? new FormData(thing) : thing);

axios.default = axios;

// this module should only have a default export
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (axios);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CanceledError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");




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

      token.reason = new _CanceledError_js__WEBPACK_IMPORTED_MODULE_0__["default"](message, config, request);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CancelToken);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CanceledError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CanceledError.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");





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
  _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, message == null ? 'canceled' : message, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].inherits(CanceledError, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
  __CANCEL__: true
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanceledError);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isCancel)
/* harmony export */ });


function isCancel(value) {
  return !!(value && value.__CANCEL__);
}


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/buildURL.js */ "./node_modules/axios/lib/helpers/buildURL.js");
/* harmony import */ var _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InterceptorManager.js */ "./node_modules/axios/lib/core/InterceptorManager.js");
/* harmony import */ var _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dispatchRequest.js */ "./node_modules/axios/lib/core/dispatchRequest.js");
/* harmony import */ var _mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _buildFullPath_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./buildFullPath.js */ "./node_modules/axios/lib/core/buildFullPath.js");
/* harmony import */ var _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/validator.js */ "./node_modules/axios/lib/helpers/validator.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");











const validators = _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].validators;

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
      request: new _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
      response: new _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__["default"]()
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

    config = (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer !== undefined) {
      _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].assertOptions(paramsSerializer, {
        encode: validators.function,
        serialize: validators.function
      }, true);
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    let contextHeaders;

    // Flatten headers
    contextHeaders = headers && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].merge(
      headers.common,
      headers[config.method]
    );

    contextHeaders && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__["default"].concat(contextHeaders, headers);

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
      const chain = [_dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__["default"].bind(this), undefined];
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
      promise = _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__["default"].call(this, newConfig);
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
    config = (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.defaults, config);
    const fullPath = (0,_buildFullPath_js__WEBPACK_IMPORTED_MODULE_6__["default"])(config.baseURL, config.url);
    return (0,_helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_7__["default"])(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request((0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request((0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(config || {}, {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Axios);


/***/ }),

/***/ "./node_modules/axios/lib/core/AxiosError.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosError.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




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

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].inherits(AxiosError, Error, {
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
      config: _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const prototype = AxiosError.prototype;
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
Object.defineProperty(prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype);

  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(error, axiosError, function filter(obj) {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosError);


/***/ }),

/***/ "./node_modules/axios/lib/core/AxiosHeaders.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosHeaders.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_parseHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/parseHeaders.js */ "./node_modules/axios/lib/helpers/parseHeaders.js");





const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value.map(normalizeValue) : String(value);
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

function matchHeaderValue(context, value, header, filter) {
  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(value)) return;

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegExp(filter)) {
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
  const accessorName = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toCamelCase(' ' + header);

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

      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite)
    } else if(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders((0,_helpers_parseHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"])(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(this, header);

      return !!(key && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }

  normalize(format) {
    const self = this;
    const headers = {};

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this, (value, header) => {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(headers, header);

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

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value.join(', ') : value);
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

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent']);

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].freezeMethods(AxiosHeaders.prototype);
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].freezeMethods(AxiosHeaders);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosHeaders);


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




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
    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InterceptorManager);


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildFullPath)
/* harmony export */ });
/* harmony import */ var _helpers_isAbsoluteURL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/isAbsoluteURL.js */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
/* harmony import */ var _helpers_combineURLs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/combineURLs.js */ "./node_modules/axios/lib/helpers/combineURLs.js");





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
  if (baseURL && !(0,_helpers_isAbsoluteURL_js__WEBPACK_IMPORTED_MODULE_0__["default"])(requestedURL)) {
    return (0,_helpers_combineURLs_js__WEBPACK_IMPORTED_MODULE_1__["default"])(baseURL, requestedURL);
  }
  return requestedURL;
}


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dispatchRequest)
/* harmony export */ });
/* harmony import */ var _transformData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transformData.js */ "./node_modules/axios/lib/core/transformData.js");
/* harmony import */ var _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../cancel/isCancel.js */ "./node_modules/axios/lib/cancel/isCancel.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../adapters/adapters.js */ "./node_modules/axios/lib/adapters/adapters.js");









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
    throw new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_0__["default"](null, config);
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

  config.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(config.headers);

  // Transform request data
  config.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_3__["default"].getAdapter(config.adapter || _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__["default"].adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(
      config,
      config.transformResponse,
      response
    );

    response.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!(0,_cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_5__["default"])(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeConfig)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");





const headersToObject = (thing) => thing instanceof _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? thing.toJSON() : thing;

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
    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(target) && _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(source)) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].merge.call({caseless}, target, source);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(source)) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].merge({}, source);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(a)) {
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

  _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ settle)
/* harmony export */ });
/* harmony import */ var _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");




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
    reject(new _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"](
      'Request failed with status code ' + response.status,
      [_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_BAD_REQUEST, _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ transformData)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");






/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || _defaults_index_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  const context = response || config;
  const headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(context.headers);
  let data = context.data;

  _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}


/***/ }),

/***/ "./node_modules/axios/lib/defaults/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _transitional_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");
/* harmony import */ var _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _helpers_toURLEncodedForm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/toURLEncodedForm.js */ "./node_modules/axios/lib/helpers/toURLEncodedForm.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");
/* harmony import */ var _helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/formDataToJSON.js */ "./node_modules/axios/lib/helpers/formDataToJSON.js");










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
  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: _transitional_js__WEBPACK_IMPORTED_MODULE_1__["default"],

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(data);

    if (isObjectPayload && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFormData(data);

    if (isFormData) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify((0,_helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_2__["default"])(data)) : data;
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBuffer(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBuffer(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStream(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFile(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBlob(data)
    ) {
      return data;
    }
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBufferView(data)) {
      return data.buffer;
    }
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return (0,_helpers_toURLEncodedForm_js__WEBPACK_IMPORTED_MODULE_3__["default"])(data, this.formSerializer).toString();
      }

      if ((isFileList = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return (0,_helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
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

    if (data && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__["default"].from(e, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__["default"].ERR_BAD_RESPONSE, this, null, this.response);
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
    FormData: _platform_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].classes.FormData,
    Blob: _platform_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].classes.Blob
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

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].merge(DEFAULT_CONTENT_TYPE);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaults);


/***/ }),

/***/ "./node_modules/axios/lib/defaults/transitional.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
});


/***/ }),

/***/ "./node_modules/axios/lib/env/classes/FormData.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/env/classes/FormData.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var form_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! form-data */ "./node_modules/form-data/lib/browser.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form_data__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VERSION": () => (/* binding */ VERSION)
/* harmony export */ });
const VERSION = "1.2.1";

/***/ }),

/***/ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js":
/*!****************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/AxiosURLSearchParams.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");




/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode(str) {
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

  params && (0,_toFormData_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode);
  } : encode;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosURLSearchParams);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ bind)
/* harmony export */ });


function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildURL)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/AxiosURLSearchParams.js */ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js");





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
    serializedParams = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isURLSearchParams(params) ?
      params.toString() :
      new _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_1__["default"](params, options).toString(_encode);
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


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ combineURLs)
/* harmony export */ });


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


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStandardBrowserEnv ?

// Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        const cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(path)) {
          cookie.push('path=' + path);
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(domain)) {
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
  })());


/***/ }),

/***/ "./node_modules/axios/lib/helpers/formDataToJSON.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/formDataToJSON.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




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
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].matchAll(/\w+|\[(\w*)]/g, name).map(match => {
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
    name = !name && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target) ? target.length : name;

    if (isLast) {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFormData(formData) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(formData.entries)) {
    const obj = {};

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formDataToJSON);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isAbsoluteURL)
/* harmony export */ });


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


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isAxiosError)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(payload) && (payload.isAxiosError === true);
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStandardBrowserEnv ?

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
      const parsed = (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })());


/***/ }),

/***/ "./node_modules/axios/lib/helpers/null.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/null.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// eslint-disable-next-line strict
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (null);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toObjectSet([
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rawHeaders => {
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
});


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseProtocol.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseProtocol.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseProtocol)
/* harmony export */ });


function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/speedometer.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/speedometer.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (speedometer);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ spread)
/* harmony export */ });


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


/***/ }),

/***/ "./node_modules/axios/lib/helpers/toFormData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toFormData.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _env_classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../env/classes/FormData.js */ "./node_modules/axios/lib/env/classes/FormData.js");






/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(thing) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '[]') ? key.slice(0, -2) : key;
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
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(arr) && !arr.some(isVisitable);
}

const predicates = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"], {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliant(thing) {
  return thing && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator];
}

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
  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (_env_classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__["default"] || FormData)();

  // eslint-disable-next-line no-param-reassign
  options = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && isSpecCompliant(formData);

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBlob(value)) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"]('Blob is not supported. Use a Buffer instead.');
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBuffer(value) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isTypedArray(value)) {
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
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) && isFlatArray(value)) ||
        (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFileList(value) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '[]') && (arr = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(el) || el === null) && formData.append(
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
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(value, function each(el, key) {
      const result = !(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(el) || el === null) && visitor.call(
        formData, el, _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toFormData);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/toURLEncodedForm.js":
/*!************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toURLEncodedForm.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toURLEncodedForm)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");






function toURLEncodedForm(data, options) {
  return (0,_toFormData_js__WEBPACK_IMPORTED_MODULE_0__["default"])(data, new _platform_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (_platform_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isNode && _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");





const validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators[type] = function validator(thing) {
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
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + _env_data_js__WEBPACK_IMPORTED_MODULE_0__.VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"](
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_DEPRECATED
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
    throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('options must be an object', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION_VALUE);
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
        throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('option ' + opt + ' must be ' + result, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('Unknown option ' + opt, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  assertOptions,
  validators
});


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/classes/FormData.js":
/*!*********************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/FormData.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormData);


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js":
/*!****************************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/AxiosURLSearchParams.js */ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof URLSearchParams !== 'undefined' ? URLSearchParams : _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _classes_URLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/URLSearchParams.js */ "./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js");
/* harmony import */ var _classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/FormData.js */ "./node_modules/axios/lib/platform/browser/classes/FormData.js");



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
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  isBrowser: true,
  classes: {
    URLSearchParams: _classes_URLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    FormData: _classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    Blob
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
});


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/bind.js */ "./node_modules/axios/lib/helpers/bind.js");




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
}

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
}

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
}

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

const _global = typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self;

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
  }

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
      a[key] = (0,_helpers_bind_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
}

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
}

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
}

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
}

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
}


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
}

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
}

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
}

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,
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
}

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
}

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  }

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
}

const noop = () => {}

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
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
  }

  return visit(obj, 0);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
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
  toJSONObject
});


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
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _less_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../less/index.less */ "./public/less/index.less");
/* harmony import */ var _common_js_inlineSVG__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/js/inlineSVG */ "../common/public/js/inlineSVG.js");
/* harmony import */ var _common_js_inlineSVG__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_common_js_inlineSVG__WEBPACK_IMPORTED_MODULE_1__);




// simple text fade out for the card headers
//
function get() {
  var el = $('.section_header');
  el.each(function (index, text) {
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
  // Init the UI after we have receive the UI/UX permissions of this kind of installation
  // (fake event from the socket.io mock )
  //
  axios__WEBPACK_IMPORTED_MODULE_2__["default"].get("../permissions").then(function (response) {
    var permissions = response.data;
    app = (__webpack_require__(/*! ./Application */ "./public/js/Application.js")["default"]);
    app.init(permissions);
    _common_js_inlineSVG__WEBPACK_IMPORTED_MODULE_1___default().init();
  });
});
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map