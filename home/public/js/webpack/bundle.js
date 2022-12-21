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
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./public/less/index.less":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./public/less/index.less ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Safari */\n  -khtml-user-select: none;\n  /* Konqueror HTML */\n  -moz-user-select: none;\n  /* Old versions of Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */\n}\n@keyframes spinner {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.spinner:before {\n  content: '';\n  box-sizing: border-box;\n  position: absolute;\n  top: 35%;\n  left: 50%;\n  width: 30px;\n  height: 30px;\n  margin-top: -15px;\n  margin-left: -15px;\n  border-radius: 50%;\n  border: 2px solid #ccc;\n  border-top-color: #C71D3D;\n  animation: spinner 0.6s linear infinite;\n}\n.material-button {\n  position: relative;\n  display: inline-block;\n  box-sizing: border-box;\n  border: none;\n  border-radius: 4px;\n  padding: 0 16px;\n  min-width: 64px;\n  height: 36px;\n  vertical-align: middle;\n  text-align: center;\n  text-overflow: ellipsis;\n  text-transform: uppercase;\n  color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));\n  background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  font-family: var(--pure-material-font, \"Roboto\", \"Segoe UI\", BlinkMacSystemFont, system-ui, -apple-system);\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 36px;\n  overflow: hidden;\n  outline: none;\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n}\n.material-button::-moz-focus-inner {\n  border: none;\n}\n/* Overlay */\n.material-button::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n/* Ripple */\n.material-button::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  border-radius: 50%;\n  padding: 50%;\n  width: 32px;\n  /* Safari */\n  height: 32px;\n  /* Safari */\n  background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));\n  opacity: 0;\n  transform: translate(-50%, -50%) scale(1);\n  transition: opacity 1s, transform 0.5s;\n}\n/* Hover, Focus */\n.material-button:hover,\n.material-button:focus {\n  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);\n}\n.material-button:hover::before {\n  opacity: 0.08;\n}\n.material-button:focus::before {\n  opacity: 0.24;\n}\n.material-button:hover:focus::before {\n  opacity: 0.3;\n}\n/* Active */\n.material-button:active {\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n.material-button:active::after {\n  opacity: 0.32;\n  transform: translate(-50%, -50%) scale(0);\n  transition: transform 0s;\n}\n/* Disabled */\n.material-button:disabled {\n  color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);\n  background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.12);\n  box-shadow: none;\n  cursor: initial;\n}\n.material-button:disabled::before {\n  opacity: 0;\n}\n.material-button:disabled::after {\n  opacity: 0;\n}\n.userinfo_toggler .image-button img {\n  border-radius: 50%;\n}\n.userinfo_toggler .userContainer {\n  text-align: center;\n}\n.userinfo_toggler .userContainer img {\n  width: 90px;\n}\n.toolbar {\n  margin: 0;\n  padding-top: 0;\n  padding-right: 10px;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 60;\n  overflow: visible;\n  position: absolute;\n  background-color: #B2E2F2;\n  border: none !important;\n}\n.toolbar * {\n  outline: none;\n}\n.toolbar .group {\n  padding-right: 20px;\n  display: inline-block;\n  vertical-align: top;\n}\n.toolbar .group .image-button {\n  display: inline-block;\n}\n.toolbar .group .image-button img {\n  margin: 5px;\n  margin-bottom: 0;\n  padding: 0;\n  width: 40;\n  height: 40;\n  position: relative;\n  display: inline-block;\n  text-align: center;\n  color: #777;\n  font-size: 45px;\n  transition: all 0.5s;\n}\n.toolbar .group .image-button div {\n  color: rgba(0, 0, 0, 0.5);\n  text-align: center;\n  font-size: 10px;\n}\n.toolbar .group .image-button div.highlight {\n  animation: highlight 3s infinite;\n}\n.toolbar .group .image-button.disabled {\n  opacity: 0.2;\n}\n.toolbar .group .image-button:not(.disabled) img,\n.toolbar .group .image-button:not(.disabled) svg {\n  cursor: pointer;\n}\n.toolbar .group .image-button:not(.disabled) img:hover,\n.toolbar .group .image-button:not(.disabled) svg:hover {\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n}\n@keyframes highlight {\n  0% {\n    color: #C71D3D;\n  }\n  50% {\n    color: rgba(0, 0, 0, 0.4);\n  }\n  100% {\n    color: #C71D3D;\n  }\n}\n.applicationSwitch {\n  float: right;\n  padding-top: 7px;\n}\n.applicationSwitch .dropdown {\n  vertical-align: middle;\n}\n.applicationSwitch .dropdown-menu {\n  z-index: 10000;\n  right: 0;\n  left: initial;\n  min-width: 190px;\n}\n.applicationSwitch .form-horizontal .image-button {\n  padding: 15px;\n  font-weight: 400;\n}\n.toolbar {\n  position: relative;\n  color: white;\n  background-color: white;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n}\n.toolbar img {\n  height: 30px;\n  margin-left: 30px;\n  margin-top: 5px;\n}\n.toolbar .app_name {\n  font-weight: 200;\n  display: inline-block;\n  top: -6px;\n  position: relative;\n  left: 20px;\n  color: #C71D3D;\n}\n.toolbar .app_slogan {\n  font-weight: 200;\n  display: inline-block;\n  top: -6px;\n  position: relative;\n  left: 20px;\n  color: #C71D3D;\n  font-size: 70%;\n}\n.toolbar .group .form-horizontal {\n  min-width: 170px;\n}\n.hero {\n  position: relative;\n  z-index: 20;\n  height: 100vh;\n  padding-bottom: 20px;\n  background-color: #fff;\n  color: #333;\n  font-size: 30px;\n  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);\n  border-bottom: 2px solid #C71D3D;\n  scroll-snap-align: start;\n}\n.hero .teaser {\n  font-weight: 500;\n  font-size: calc(26px + 1vw);\n  line-height: 1.2;\n  width: 40%;\n  left: 10%;\n  position: relative;\n  top: 40%;\n  transform: translateY(-50%);\n  color: #C71D3D;\n}\n.hero .slogan {\n  font-weight: 300;\n  line-height: 1.2;\n  font-size: calc(10px + 1vw);\n  margin-top: 43px;\n  color: black;\n}\n.hero .header {\n  font-size: calc(20px + 1vw);\n  line-height: 1.2;\n  width: 90%;\n  top: 5vw;\n  padding: 20px;\n  padding-left: 50px;\n}\n.hero .launch_button {\n  position: relative;\n  left: 0;\n}\n.hero .launch_button:hover {\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n}\n.hero .image {\n  width: 40%;\n  left: 55%;\n  position: absolute;\n  overflow: hidden;\n  text-align: center;\n  top: 40%;\n  transform: translateY(-50%);\n}\n.hero .image img {\n  width: 60%;\n}\n.hero .maker {\n  bottom: 10px;\n  position: absolute;\n  left: 40px;\n  text-align: center;\n  font-weight: 400;\n  font-size: 16px;\n}\n.hero .maker img {\n  height: 120px;\n}\n.hero .teacher {\n  bottom: 10px;\n  position: absolute;\n  right: 40px;\n  text-align: center;\n  font-weight: 400;\n  font-size: 16px;\n}\n.hero .teacher img {\n  height: 120px;\n}\n.hero .student {\n  bottom: 10px;\n  position: absolute;\n  left: 50%;\n  text-align: center;\n  font-weight: 400;\n  font-size: 16px;\n  transform: translateX(-50%);\n}\n.hero .student img {\n  height: 120px;\n}\n@keyframes mover {\n  0% {\n    transform: translateY(0);\n  }\n  100% {\n    transform: translateY(-10px);\n  }\n}\n.hero .arrow {\n  position: absolute;\n  bottom: 20px;\n  animation: mover 2s infinite alternate;\n}\n.hero .arrow i {\n  height: 20px;\n  width: 1px;\n  display: inline-block;\n  border-left: 2px solid #000;\n}\n.hero .arrow i.left {\n  -webkit-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n}\n.hero .arrow i.right {\n  -webkit-transform: rotate(45deg) translate(3px, -2px);\n  transform: rotate(45deg) translate(3px, -2px);\n}\n.hero .arrow.left {\n  left: 30%;\n}\n.hero .arrow.right {\n  left: 70%;\n}\n@media (max-height: 650px) {\n  .hero .launch_button {\n    position: relative;\n    left: 100%;\n    transform: translateX(-50%);\n    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n  }\n}\n.intro {\n  background-color: white;\n  background-image: none;\n  text-align: left;\n  position: relative;\n  z-index: 20;\n  height: 100vh;\n  padding-bottom: 20px;\n  color: #333;\n  font-size: 30px;\n}\n.intro .header {\n  font-size: calc(19px + 1vw);\n  line-height: 1.2;\n  top: 2vw;\n  padding-left: 50px;\n  color: #C71D3D;\n  position: absolute;\n  padding-top: 30px;\n  background-color: rgba(255, 255, 255, 0.8);\n}\n.intro .header div {\n  font-size: calc(6px + 1vw);\n  font-weight: 200;\n  color: black;\n  padding-top: 30px;\n}\n.intro img {\n  width: 50%;\n  vertical-align: middle;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  left: 0;\n  right: 0;\n}\n.intro .launch_button {\n  position: absolute;\n  right: 50px;\n  bottom: 100px;\n}\n.intro .launch_button:hover {\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n}\n.slidedeck {\n  position: absolute;\n  height: 400vh;\n  width: 100%;\n  background-image: linear-gradient(135deg, #e13f4d, #d34657);\n}\n.slidedeck .pink_bg {\n  position: absolute;\n  top: 100vh;\n  height: 300vh;\n  width: 100%;\n  background-image: linear-gradient(153deg, #fa7e93, #f5d8d8);\n}\n.slidedeck .orange_bg {\n  position: absolute;\n  top: 100vh;\n  height: 200vh;\n  width: 100%;\n  background-image: linear-gradient(135deg, #f8ac5c, #fcbe78);\n}\n.slidedeck .blue_bg {\n  position: absolute;\n  top: 100vh;\n  height: 100vh;\n  width: 100%;\n  background-image: linear-gradient(135deg, #242533, #2a3079);\n}\n.slidedeck .section_header {\n  color: white;\n  font-size: calc(16px + 2vw);\n  text-align: center;\n  font-weight: 100;\n  padding-top: 30px;\n  position: sticky;\n  top: 20px;\n}\n.slidedeck .card {\n  position: sticky;\n  z-index: 1000;\n  width: 25%;\n  height: 50vh;\n  border-radius: 10px;\n  background-color: #fff;\n  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.25);\n  top: 0;\n}\n.slidedeck .card .text {\n  position: absolute;\n  top: -40px;\n  text-align: center;\n  color: white;\n  font-size: 24px;\n  font-weight: 100;\n  width: 100%;\n}\n.slidedeck .card .media {\n  position: absolute;\n  top: 10px;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.slidedeck .card .content {\n  position: absolute;\n  top: 80px;\n  padding: 10px;\n}\n.slidedeck .card .content .header {\n  color: #C71D3D;\n  text-align: center;\n  margin-bottom: 10px;\n}\n.slidedeck .card .launch_button {\n  position: absolute;\n  left: 50%;\n  bottom: 10px;\n  transform: translateX(-50%);\n  border-radius: 4px;\n  font-size: 14px;\n  padding: 10px;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.slidedeck .card.left {\n  left: 5%;\n  transform: translateY(50%);\n}\n.slidedeck .card.center {\n  left: 50%;\n  transform: translateY(50%) translateX(-50%);\n}\n.slidedeck .card.right {\n  left: 70%;\n  transform: translateY(50%);\n}\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: Roboto, sans-serif;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  scroll-snap-type: y mandatory;\n}\n.launch_button {\n  margin-top: 20px;\n  border-radius: 5px;\n  display: inline-block;\n  padding: 5px;\n  padding-left: 10px;\n  padding-right: 10px;\n  font-size: calc(10px + 1vw);\n  cursor: pointer;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n  text-decoration: none;\n  background-color: #C71D3D;\n  color: white;\n  font-weight: 300;\n}\n", "",{"version":3,"sources":["webpack://./common/less/variables.less","webpack://./public/less/index.less","webpack://./common/less/common.less","webpack://./common/less/userinfo.less","webpack://./common/less/toolbar.less","webpack://./common/less/appSwitch.less","webpack://./public/less/toolbar.less","webpack://./public/less/hero.less","webpack://./public/less/intro.less","webpack://./public/less/slidedeck.less"],"names":[],"mappings":"AAWA;EACE,2BAAA;ECVA,eAAe;EDWf,yBAAA;ECTA,WAAW;EDUX,wBAAA;ECRA,mBAAmB;EDSnB,sBAAA;ECPA,4BAA4B;EDQ5B,qBAAA;ECNA,2BAA2B;EDO3B,iBAAA;ECLA,iFAAiF;AACnF;ACbA;EACI;IAAI,yBAAA;EDgBN;AACF;ACdA;EACI,WAAA;EACA,sBAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,kBAAA;EACA,kBAAA;EACA,sBAAA;EACA,yBAAA;EACA,uCAAA;ADgBJ;ACZA;EACI,kBAAA;EACA,qBAAA;EACA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;EACA,eAAA;EACA,YAAA;EACA,sBAAA;EACA,kBAAA;EACA,uBAAA;EACA,yBAAA;EACA,6DAAA;EACA,qEAAA;EACA,+GAAA;EACA,0GAAA;EACA,eAAA;EACA,gBAAA;EACA,iBAAA;EACA,gBAAA;EACA,aAAA;EACA,eAAA;EACA,2BAAA;ADcJ;ACXA;EACI,YAAA;ADaJ;AACA,YAAY;ACVZ;EACI,WAAA;EACA,kBAAA;EACA,MAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,wEAAA;EACA,UAAA;EACA,wBAAA;ADYJ;AACA,WAAW;ACTX;EACI,WAAA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;EACA,kBAAA;EACA,YAAA;EACA,WAAA;EDWF,WAAW;ECVT,YAAA;EDYF,WAAW;ECXT,wEAAA;EACA,UAAA;EACA,yCAAA;EACA,sCAAA;ADaJ;AACA,iBAAiB;ACVjB;;EAEI,gHAAA;ADYJ;ACTA;EACI,aAAA;ADWJ;ACRA;EACI,aAAA;ADUJ;ACPA;EACI,YAAA;ADSJ;AACA,WAAW;ACNX;EACI,qHAAA;ADQJ;ACLA;EACI,aAAA;EACA,yCAAA;EACA,wBAAA;ADOJ;AACA,aAAa;ACJb;EACI,8DAAA;EACA,yEAAA;EACA,gBAAA;EACA,eAAA;ADMJ;ACHA;EACI,UAAA;ADKJ;ACFA;EACI,UAAA;ADIJ;AE9HA;EAIM,kBAAA;AF6HN;AEjIA;EASI,kBAAA;AF2HJ;AEpIA;EAWM,WAAA;AF4HN;AGvIA;EACE,SAAA;EACA,cAAA;EACA,mBAAA;EACA,MAAA;EACA,QAAA;EACA,OAAA;EACA,UAAA;EACA,iBAAA;EACA,kBAAA;EACA,yBAAA;EACA,uBAAA;AHyIF;AGpJA;EAcI,aAAA;AHyIJ;AGvJA;EAkBI,mBAAA;EACA,qBAAA;EACA,mBAAA;AHwIJ;AG5JA;EAuBM,qBAAA;AHwIN;AG/JA;EAyBQ,WAAA;EACA,gBAAA;EACA,UAAA;EACA,SAAA;EACA,UAAA;EACA,kBAAA;EACA,qBAAA;EACA,kBAAA;EACA,WAAA;EACA,eAAA;EACA,oBAAA;AHyIR;AG5KA;EAsCQ,yBAAA;EACA,kBAAA;EACA,eAAA;AHyIR;AGxIQ;EACE,gCAAA;AH0IV;AGvIM;EACE,YAAA;AHyIR;AGvIM;;EAEI,eAAA;AHyIV;AGxIU;;EACE,wEAAA;AH2IZ;AGlIA;EACE;IAAO,cAAA;EHqIP;EGpIA;IAAO,yBAAA;EHuIP;EGtIA;IAAO,cAAA;EHyIP;AACF;AIxMA;EACE,YAAA;EACA,gBAAA;AJ0MF;AI5MA;EAII,sBAAA;AJ2MJ;AI/MA;EAOI,cAAA;EACA,QAAA;EACA,aAAA;EACA,gBAAA;AJ2MJ;AIrNA;EAcM,aAAA;EACA,gBAAA;AJ0MN;AK3NA;EACE,kBAAA;EACA,YAAA;EACA,uBAAA;EACA,wEAAA;AL6NF;AKjOA;EAOI,YAAA;EACA,iBAAA;EACA,eAAA;AL6NJ;AKtOA;EAaI,gBAAA;EACA,qBAAA;EACA,SAAA;EACA,kBAAA;EACA,UAAA;EACA,cAAA;AL4NJ;AK9OA;EAsBI,gBAAA;EACA,qBAAA;EACA,SAAA;EACA,kBAAA;EACA,UAAA;EACA,cAAA;EACA,cAAA;AL2NJ;AKvPA;EAiCM,gBAAA;ALyNN;AM1PA;EACI,kBAAA;EACA,WAAA;EACA,aAAA;EACA,oBAAA;EACA,sBAAA;EACA,WAAA;EACA,eAAA;EACA,mEAAA;EACA,gCAAA;EACA,wBAAA;AN4PJ;AMtQA;EAaQ,gBAAA;EACA,2BAAA;EACA,gBAAA;EACA,UAAA;EACA,SAAA;EACA,kBAAA;EACA,QAAA;EACA,2BAAA;EACA,cAAA;AN4PR;AMjRA;EAyBQ,gBAAA;EACA,gBAAA;EACA,2BAAA;EACA,gBAAA;EACA,YAAA;AN2PR;AMxRA;EAiCQ,2BAAA;EACA,gBAAA;EACA,UAAA;EACA,QAAA;EACA,aAAA;EACA,kBAAA;AN0PR;AMhSA;EA0CQ,kBAAA;EACA,OAAA;ANyPR;AMvPQ;EACI,wEAAA;ANyPZ;AMvSA;EAoDQ,UAAA;EACA,SAAA;EACA,kBAAA;EACA,gBAAA;EACA,kBAAA;EACA,QAAA;EACA,2BAAA;ANsPR;AMhTA;EA6DY,UAAA;ANsPZ;AMnTA;EAmEQ,YAAA;EACA,kBAAA;EACA,UAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;ANmPR;AM3TA;EA2EY,aAAA;ANmPZ;AM9TA;EAgFQ,YAAA;EACA,kBAAA;EACA,WAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;ANiPR;AMtUA;EAwFY,aAAA;ANiPZ;AMzUA;EA8FQ,YAAA;EACA,kBAAA;EACA,SAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,2BAAA;AN8OR;AMlVA;EAuGY,aAAA;AN8OZ;AM1OI;EACI;IAAK,wBAAA;EN6OX;EM5OM;IAAO,4BAAA;EN+Ob;AACF;AM7VA;EAgHQ,kBAAA;EACA,YAAA;EACA,sCAAA;ANgPR;AMlWA;EAqHY,YAAA;EACA,UAAA;EACA,qBAAA;EACA,2BAAA;ANgPZ;AM9OY;EACI,iCAAA;EACA,yBAAA;ANgPhB;AM7OY;EACI,qDAAA;EACA,6CAAA;AN+OhB;AM3OQ;EACI,SAAA;AN6OZ;AM1OQ;EACI,SAAA;AN4OZ;AMxOI;EAAA;IAEQ,kBAAA;IACA,UAAA;IACA,2BAAA;IACA,qDAAA;EN0OV;AACF;AO9XA;EACI,uBAAA;EACA,sBAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EACA,aAAA;EACA,oBAAA;EACA,WAAA;EACA,eAAA;APgYJ;AOzYA;EAYQ,2BAAA;EACA,gBAAA;EACA,QAAA;EACA,kBAAA;EACA,cAAA;EACA,kBAAA;EACA,iBAAA;EACA,0CAAA;APgYR;AOnZA;EAqBY,0BAAA;EACA,gBAAA;EACA,YAAA;EACA,iBAAA;APiYZ;AOzZA;EA6BQ,UAAA;EACA,sBAAA;EACA,kBAAA;EACA,MAAA;EACA,SAAA;EACA,YAAA;EACA,OAAA;EACA,QAAA;AP+XR;AOnaA;EAwCQ,kBAAA;EACA,WAAA;EACA,aAAA;AP8XR;AO5XQ;EACI,wEAAA;AP8XZ;AQ3aA;EACI,kBAAA;EACA,aAAA;EACA,WAAA;EACA,2DAAA;AR6aJ;AQjbA;EAOQ,kBAAA;EACA,UAAA;EACA,aAAA;EACA,WAAA;EACA,2DAAA;AR6aR;AQxbA;EAeQ,kBAAA;EACA,UAAA;EACA,aAAA;EACA,WAAA;EACA,2DAAA;AR4aR;AQ/bA;EAuBQ,kBAAA;EACA,UAAA;EACA,aAAA;EACA,WAAA;EACA,2DAAA;AR2aR;AQtcA;EAgCQ,YAAA;EACA,2BAAA;EACA,kBAAA;EACA,gBAAA;EACA,iBAAA;EACA,gBAAA;EACA,SAAA;ARyaR;AQ/cA;EA0CQ,gBAAA;EACA,aAAA;EACA,UAAA;EACA,YAAA;EACA,mBAAA;EACA,sBAAA;EACA,6CAAA;EACA,MAAA;ARwaR;AQzdA;EAoDY,kBAAA;EACA,UAAA;EACA,kBAAA;EACA,YAAA;EACA,eAAA;EACA,gBAAA;EACA,WAAA;ARwaZ;AQleA;EA8DY,kBAAA;EACA,SAAA;EACA,SAAA;EACA,2BAAA;ARuaZ;AQxeA;EAqEY,kBAAA;EACA,SAAA;EACA,aAAA;ARsaZ;AQ7eA;EA0EgB,cAAA;EACA,kBAAA;EACA,mBAAA;ARsahB;AQlfA;EAiFY,kBAAA;EACA,SAAA;EACA,YAAA;EACA,2BAAA;EACA,kBAAA;EACA,eAAA;EACA,aAAA;EACA,kBAAA;EACA,mBAAA;ARoaZ;AQjaQ;EACI,QAAA;EACA,0BAAA;ARmaZ;AQhaQ;EACI,SAAA;EACA,2CAAA;ARkaZ;AQ/ZQ;EACI,SAAA;EACA,0BAAA;ARiaZ;AA3fA;EACI,SAAA;EACA,UAAA;EACA,+BAAA;EACA,kBAAA;EACA,kBAAA;EACA,6BAAA;AA6fJ;AAzfA;EACI,gBAAA;EACA,kBAAA;EACA,qBAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,2BAAA;EACA,eAAA;EACA,wEAAA;EACA,qDAAA;EACA,qBAAA;EACA,yBAAA;EACA,YAAA;EACA,gBAAA;AA2fJ","sourcesContent":["\n@tintColor:#C71D3D;\n@darkTextColor: #333;\n\n@rightMenuWidth: 0px;\n\n@leftMenubarBackground: @tintColor;\n@tabSize : 60px;\n\n@toolbarBackground: #B2E2F2;\n\n.noselect {\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */\n  -khtml-user-select: none; /* Konqueror HTML */\n  -moz-user-select: none; /* Old versions of Firefox */\n  -ms-user-select: none; /* Internet Explorer/Edge */\n  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */\n}\n\n","@import \"../../common/less/variables\";\n@import \"variables\";\n\n@import \"../../common/less/common\";\n@import \"../../common/less/userinfo\";\n@import \"../../common/less/toolbar\";\n@import \"../../common/less/appSwitch\";\n\n@import \"toolbar\";\n@import \"hero\";\n@import \"intro\";\n@import \"slidedeck\";\n\n\nbody {\n    margin: 0;\n    padding: 0;\n    font-family: Roboto, sans-serif;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    scroll-snap-type: y mandatory;\n}\n\n\n.launch_button {\n    margin-top: 20px;\n    border-radius: 5px;\n    display: inline-block;\n    padding: 5px;\n    padding-left: 10px;\n    padding-right: 10px;\n    font-size: calc(10px + 1vw);\n    cursor: pointer;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);\n    text-decoration: none;\n    background-color: #C71D3D;\n    color: white;\n    font-weight: 300;\n}","@keyframes spinner {\n    to {transform: rotate(360deg);}\n}\n\n.spinner:before {\n    content: '';\n    box-sizing: border-box;\n    position: absolute;\n    top: 35%;\n    left: 50%;\n    width: 30px;\n    height: 30px;\n    margin-top: -15px;\n    margin-left: -15px;\n    border-radius: 50%;\n    border: 2px solid #ccc;\n    border-top-color: @tintColor;\n    animation: spinner .6s linear infinite;\n}\n\n\n.material-button {\n    position: relative;\n    display: inline-block;\n    box-sizing: border-box;\n    border: none;\n    border-radius: 4px;\n    padding: 0 16px;\n    min-width: 64px;\n    height: 36px;\n    vertical-align: middle;\n    text-align: center;\n    text-overflow: ellipsis;\n    text-transform: uppercase;\n    color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));\n    background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));\n    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n    font-family: var(--pure-material-font, \"Roboto\", \"Segoe UI\", BlinkMacSystemFont, system-ui, -apple-system);\n    font-size: 14px;\n    font-weight: 500;\n    line-height: 36px;\n    overflow: hidden;\n    outline: none;\n    cursor: pointer;\n    transition: box-shadow 0.2s;\n}\n\n.material-button::-moz-focus-inner {\n    border: none;\n}\n\n/* Overlay */\n.material-button::before {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));\n    opacity: 0;\n    transition: opacity 0.2s;\n}\n\n/* Ripple */\n.material-button::after {\n    content: \"\";\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    border-radius: 50%;\n    padding: 50%;\n    width: 32px; /* Safari */\n    height: 32px; /* Safari */\n    background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));\n    opacity: 0;\n    transform: translate(-50%, -50%) scale(1);\n    transition: opacity 1s, transform 0.5s;\n}\n\n/* Hover, Focus */\n.material-button:hover,\n.material-button:focus {\n    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);\n}\n\n.material-button:hover::before {\n    opacity: 0.08;\n}\n\n.material-button:focus::before {\n    opacity: 0.24;\n}\n\n.material-button:hover:focus::before {\n    opacity: 0.3;\n}\n\n/* Active */\n.material-button:active {\n    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n\n.material-button:active::after {\n    opacity: 0.32;\n    transform: translate(-50%, -50%) scale(0);\n    transition: transform 0s;\n}\n\n/* Disabled */\n.material-button:disabled {\n    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);\n    background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.12);\n    box-shadow: none;\n    cursor: initial;\n}\n\n.material-button:disabled::before {\n    opacity: 0;\n}\n\n.material-button:disabled::after {\n    opacity: 0;\n}",".userinfo_toggler{\n\n  .image-button {\n    img {\n      border-radius: 50%;\n    }\n  }\n\n  .userContainer {\n    text-align: center;\n    img {\n      width: 90px;\n    }\n  }\n}\n",".toolbar {\n  margin:0;\n  padding-top:0;\n  padding-right:10px;\n  top:0;\n  right:0;\n  left:@leftPaneWidth;\n  height:@toolbarHeight;\n  overflow: visible;\n  position:absolute;\n  background-color:@toolbarBackground;\n  border: none !important;\n\n  * {\n    outline:none;\n  }\n\n  .group{\n    padding-right:20px;\n    display: inline-block;\n    vertical-align: top;\n\n    .image-button{\n      display: inline-block;\n      img{\n        margin: 5px;\n        margin-bottom:0;\n        padding: 0;\n        width: @toolbarHeight - 20;\n        height: @toolbarHeight - 20;\n        position: relative;\n        display: inline-block;\n        text-align: center;\n        color:#777;\n        font-size:45px;\n        transition: all 0.5s;\n      }\n      div{\n        color:@toolbarButtonFontColor;\n        text-align: center;\n        font-size: 10px;\n        &.highlight{\n          animation: highlight 3s infinite;\n        }\n      }\n      &.disabled{\n        opacity:0.2;\n      }\n      &:not(.disabled){\n        img, svg {\n          cursor:pointer;\n          &:hover{\n            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n          }\n        }\n      }\n    }\n  }\n}\n\n\n@keyframes highlight {\n  0%   { color: @tintColor  }\n  50%  { color: rgba(0,0,0,0.4) }\n  100% { color: @tintColor  }\n}\n","\n\n.applicationSwitch {\n  float: right;\n  padding-top: 7px;\n  .dropdown {\n    vertical-align: middle;\n  }\n  .dropdown-menu{\n    z-index: 10000;\n    right:0;\n    left: initial;\n    min-width: 190px;\n  }\n  .form-horizontal {\n    .image-button {\n      padding:15px;\n      font-weight: 400;\n    }\n  }\n}\n",".toolbar {\n  position: relative;\n  color:white;\n  background-color:white;\n  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\n\n  img{\n    height:30px;\n    margin-left:30px;\n    margin-top:5px;\n  }\n\n  .app_name {\n    font-weight: 200;\n    display: inline-block;\n    top: -6px;\n    position: relative;\n    left: 20px;\n    color:#C71D3D;\n  }\n\n  .app_slogan {\n    font-weight: 200;\n    display: inline-block;\n    top: -6px;\n    position: relative;\n    left: 20px;\n    color:#C71D3D;\n    font-size:70%;\n  }\n\n  .group{\n    .form-horizontal {\n      min-width: 170px;\n    }\n  }\n}\n",".hero {\n    position: relative;\n    z-index: 20;\n    height: 100vh;\n    padding-bottom: 20px;\n    background-color: #fff;\n    color: #333;\n    font-size: 30px;\n    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);\n    border-bottom: 2px solid #C71D3D;\n    scroll-snap-align: start;\n\n    .teaser {\n        font-weight: 500;\n        font-size: calc(26px + 1vw);\n        line-height: 1.2;\n        width: 40%;\n        left: 10%;\n        position: relative;\n        top: 40%;\n        transform: translateY(-50%);\n        color: #C71D3D\n    }\n\n    .slogan {\n        font-weight: 300;\n        line-height: 1.2;\n        font-size: calc(10px + 1vw);\n        margin-top: 43px;\n        color: black;\n    }\n\n    .header {\n        font-size: calc(20px + 1vw);\n        line-height: 1.2;\n        width: 90%;\n        top: 5vw;\n        padding: 20px;\n        padding-left: 50px;\n    }\n\n    .launch_button {\n        position: relative;\n        left: 0;\n\n        &:hover {\n            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n        }\n    }\n\n\n    .image {\n        width: 40%;\n        left: 55%;\n        position: absolute;\n        overflow: hidden;\n        text-align: center;\n        top: 40%;\n        transform: translateY(-50%);\n\n        img {\n            width: 60%;\n        }\n    }\n\n\n    .maker {\n        bottom: 10px;\n        position: absolute;\n        left: 40px;\n        text-align: center;\n        font-weight: 400;\n        font-size: 16px;\n\n        img {\n            height: 120px;\n        }\n    }\n\n    .teacher {\n        bottom: 10px;\n        position: absolute;\n        right: 40px;\n        text-align: center;\n        font-weight: 400;\n        font-size: 16px;\n\n        img {\n            height: 120px;\n        }\n    }\n\n\n    .student {\n        bottom: 10px;\n        position: absolute;\n        left: 50%;\n        text-align: center;\n        font-weight: 400;\n        font-size: 16px;\n        transform: translateX(-50%);\n\n        img {\n            height: 120px;\n        }\n    }\n\n    @keyframes mover {\n        0% { transform: translateY(0); }\n        100% { transform: translateY(-10px); }\n    }\n    .arrow {\n        position: absolute;\n        bottom: 20px;\n        animation: mover 2s infinite alternate;\n\n        i {\n            height: 20px;\n            width: 1px;\n            display: inline-block;\n            border-left: 2px solid #000;\n\n            &.left {\n                -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n            }\n\n            &.right {\n                -webkit-transform: rotate(45deg) translate(3px, -2px);\n                transform: rotate(45deg) translate(3px, -2px);\n            }\n        }\n\n        &.left {\n            left: 30%;\n        }\n\n        &.right {\n            left: 70%;\n        }\n    }\n\n    @media (max-height: 650px) {\n        .launch_button {\n            position: relative;\n            left: 100%;\n            transform: translateX(-50%);\n            transition: all 0.3s cubic-bezier(.25, .8, .25, 1);\n        }\n    }\n\n}",".intro {\n    background-color: white;\n    background-image: none;\n    text-align: left;\n    position: relative;\n    z-index: 20;\n    height: 100vh;\n    padding-bottom: 20px;\n    color: #333;\n    font-size: 30px;\n\n    .header {\n        font-size: calc(19px + 1vw);\n        line-height: 1.2;\n        top: 2vw;\n        padding-left: 50px;\n        color: #C71D3D;\n        position: absolute;\n        padding-top: 30px;\n        background-color: rgba(255, 255, 255, 0.8);\n        div {\n            font-size: calc(6px + 1vw);\n            font-weight: 200;\n            color: black;\n            padding-top: 30px;\n        }\n    }\n\n    img {\n        width: 50%;\n        vertical-align: middle;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        margin: auto;\n        left: 0;\n        right: 0;\n    }\n\n    .launch_button {\n        position: absolute;\n        right: 50px;\n        bottom: 100px;\n\n        &:hover {\n            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n        }\n    }\n\n}",".slidedeck {\n    position: absolute;\n    height: 400vh;\n    width: 100%;\n    background-image: linear-gradient(135deg, #e13f4d, #d34657);\n\n    .pink_bg {\n        position: absolute;\n        top: 100vh;\n        height: 300vh;\n        width: 100%;\n        background-image: linear-gradient(153deg, #fa7e93, #f5d8d8);\n    }\n\n    .orange_bg {\n        position: absolute;\n        top: 100vh;\n        height: 200vh;\n        width: 100%;\n        background-image: linear-gradient(135deg, #f8ac5c, #fcbe78);\n    }\n\n    .blue_bg {\n        position: absolute;\n        top: 100vh;\n        height: 100vh;\n        width: 100%;\n        background-image: linear-gradient(135deg, #242533, #2a3079);\n    }\n\n\n    .section_header {\n        color: white;\n        font-size: calc(16px + 2vw);\n        text-align: center;\n        font-weight: 100;\n        padding-top: 30px;\n        position: sticky;\n        top: 20px;\n    }\n\n    .card {\n        position: sticky;\n        z-index: 1000;\n        width: 25%;\n        height: 50vh;\n        border-radius: 10px;\n        background-color: #fff;\n        box-shadow: 0 10px 50px 0 rgba(0, 0, 0, .25);\n        top: 0;\n\n        .text {\n            position: absolute;\n            top: -40px;\n            text-align: center;\n            color: white;\n            font-size: 24px;\n            font-weight: 100;\n            width: 100%;\n        }\n    \n        .media {\n            position: absolute;\n            top: 10px;\n            left: 50%;\n            transform: translateX(-50%);\n        }\n\n        .content {\n            position: absolute;\n            top: 80px;\n            padding: 10px;\n\n            .header {\n                color: #C71D3D;\n                text-align: center;\n                margin-bottom: 10px;\n            }\n        }\n\n        .launch_button {\n            position: absolute;\n            left: 50%;\n            bottom: 10px;\n            transform: translateX(-50%);\n            border-radius: 4px;\n            font-size: 14px;\n            padding: 10px;\n            padding-left: 20px;\n            padding-right: 20px;\n        }\n    \n        &.left {\n            left: 5%;\n            transform: translateY(50%);\n        }\n    \n        &.center {\n            left: 50%;\n            transform: translateY(50%) translateX(-50%);\n        }\n    \n        &.right {\n            left: 70%;\n            transform: translateY(50%);\n        }\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



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

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



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

/***/ "./public/less/index.less":
/*!********************************!*\
  !*** ./public/less/index.less ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _less_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../less/index.less */ "./public/less/index.less");


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
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map