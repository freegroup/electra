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

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'babel-preset-modern-browser' imported from /Users/d023280/Documents/workspace/electra/author/babel-virtual-resolve-base.js\n    at new NodeError (/Users/d023280/Documents/workspace/electra/author/node_modules/@babel/core/lib/vendor/import-meta-resolve.js:2327:5)\n    at packageResolve (/Users/d023280/Documents/workspace/electra/author/node_modules/@babel/core/lib/vendor/import-meta-resolve.js:2906:9)\n    at moduleResolve (/Users/d023280/Documents/workspace/electra/author/node_modules/@babel/core/lib/vendor/import-meta-resolve.js:2937:18)\n    at defaultResolve (/Users/d023280/Documents/workspace/electra/author/node_modules/@babel/core/lib/vendor/import-meta-resolve.js:2969:13)\n    at /Users/d023280/Documents/workspace/electra/author/node_modules/@babel/core/lib/vendor/import-meta-resolve.js:2990:14\n    at Generator.next (<anonymous>)\n    at asyncGeneratorStep (/Users/d023280/Documents/workspace/electra/author/node_modules/@babel/core/lib/vendor/import-meta-resolve.js:45:103)\n    at _next (/Users/d023280/Documents/workspace/electra/author/node_modules/@babel/core/lib/vendor/import-meta-resolve.js:46:194)\n    at /Users/d023280/Documents/workspace/electra/author/node_modules/@babel/core/lib/vendor/import-meta-resolve.js:46:364\n    at new Promise (<anonymous>)");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module doesn't tell about it's top-level declarations so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/index.js"]();
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map