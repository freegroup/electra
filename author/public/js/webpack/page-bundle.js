(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var transitionalDefaults = __webpack_require__(/*! ../defaults/transitional */ "./node_modules/axios/lib/defaults/transitional.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
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

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
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
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
axios.VERSION = (__webpack_require__(/*! ./env/data */ "./node_modules/axios/lib/env/data.js").version);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
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
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel('canceled');
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
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
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ../helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ../core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");
var transitionalDefaults = __webpack_require__(/*! ./transitional */ "./node_modules/axios/lib/defaults/transitional.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ../adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ../adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

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

var defaults = {

  transitional: transitionalDefaults,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
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
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
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

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/defaults/transitional.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};


/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = {
  "version": "0.26.1"
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

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
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
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
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
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
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

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
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

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
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


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
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var VERSION = (__webpack_require__(/*! ../env/data */ "./node_modules/axios/lib/env/data.js").version);

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
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
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
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
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return toString.call(val) === '[object URLSearchParams]';
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

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
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

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
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

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
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/font-awesome/css/font-awesome.css":
/*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/font-awesome/css/font-awesome.css ***!
  \**********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/fontawesome-webfont.eot?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/fontawesome-webfont.eot */ "./node_modules/font-awesome/fonts/fontawesome-webfont.eot"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/fontawesome-webfont.woff2?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/fontawesome-webfont.woff?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/fontawesome-webfont.ttf?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/fontawesome-webfont.svg?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___, { hash: "?#iefix&v=4.7.0" });
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___, { hash: "#fontawesomeregular" });
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */\n/* FONT PATH\n * -------------------------- */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('embedded-opentype'), url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format('woff2'), url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format('woff'), url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format('truetype'), url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n.fa {\n  display: inline-block;\n  font: normal normal normal 14px/1 FontAwesome;\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n/* makes the font 33% larger relative to the icon container */\n.fa-lg {\n  font-size: 1.33333333em;\n  line-height: 0.75em;\n  vertical-align: -15%;\n}\n.fa-2x {\n  font-size: 2em;\n}\n.fa-3x {\n  font-size: 3em;\n}\n.fa-4x {\n  font-size: 4em;\n}\n.fa-5x {\n  font-size: 5em;\n}\n.fa-fw {\n  width: 1.28571429em;\n  text-align: center;\n}\n.fa-ul {\n  padding-left: 0;\n  margin-left: 2.14285714em;\n  list-style-type: none;\n}\n.fa-ul > li {\n  position: relative;\n}\n.fa-li {\n  position: absolute;\n  left: -2.14285714em;\n  width: 2.14285714em;\n  top: 0.14285714em;\n  text-align: center;\n}\n.fa-li.fa-lg {\n  left: -1.85714286em;\n}\n.fa-border {\n  padding: .2em .25em .15em;\n  border: solid 0.08em #eeeeee;\n  border-radius: .1em;\n}\n.fa-pull-left {\n  float: left;\n}\n.fa-pull-right {\n  float: right;\n}\n.fa.fa-pull-left {\n  margin-right: .3em;\n}\n.fa.fa-pull-right {\n  margin-left: .3em;\n}\n/* Deprecated as of 4.4.0 */\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n.fa.pull-left {\n  margin-right: .3em;\n}\n.fa.pull-right {\n  margin-left: .3em;\n}\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n  animation: fa-spin 1s infinite steps(8);\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  -webkit-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  -webkit-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  -webkit-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  transform: rotate(270deg);\n}\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  -webkit-transform: scale(-1, 1);\n  -ms-transform: scale(-1, 1);\n  transform: scale(-1, 1);\n}\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(1, -1);\n  -ms-transform: scale(1, -1);\n  transform: scale(1, -1);\n}\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  filter: none;\n}\n.fa-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle;\n}\n.fa-stack-1x,\n.fa-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n.fa-stack-1x {\n  line-height: inherit;\n}\n.fa-stack-2x {\n  font-size: 2em;\n}\n.fa-inverse {\n  color: #ffffff;\n}\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n   readers do not read off random characters that represent icons */\n.fa-glass:before {\n  content: \"\\f000\";\n}\n.fa-music:before {\n  content: \"\\f001\";\n}\n.fa-search:before {\n  content: \"\\f002\";\n}\n.fa-envelope-o:before {\n  content: \"\\f003\";\n}\n.fa-heart:before {\n  content: \"\\f004\";\n}\n.fa-star:before {\n  content: \"\\f005\";\n}\n.fa-star-o:before {\n  content: \"\\f006\";\n}\n.fa-user:before {\n  content: \"\\f007\";\n}\n.fa-film:before {\n  content: \"\\f008\";\n}\n.fa-th-large:before {\n  content: \"\\f009\";\n}\n.fa-th:before {\n  content: \"\\f00a\";\n}\n.fa-th-list:before {\n  content: \"\\f00b\";\n}\n.fa-check:before {\n  content: \"\\f00c\";\n}\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n  content: \"\\f00d\";\n}\n.fa-search-plus:before {\n  content: \"\\f00e\";\n}\n.fa-search-minus:before {\n  content: \"\\f010\";\n}\n.fa-power-off:before {\n  content: \"\\f011\";\n}\n.fa-signal:before {\n  content: \"\\f012\";\n}\n.fa-gear:before,\n.fa-cog:before {\n  content: \"\\f013\";\n}\n.fa-trash-o:before {\n  content: \"\\f014\";\n}\n.fa-home:before {\n  content: \"\\f015\";\n}\n.fa-file-o:before {\n  content: \"\\f016\";\n}\n.fa-clock-o:before {\n  content: \"\\f017\";\n}\n.fa-road:before {\n  content: \"\\f018\";\n}\n.fa-download:before {\n  content: \"\\f019\";\n}\n.fa-arrow-circle-o-down:before {\n  content: \"\\f01a\";\n}\n.fa-arrow-circle-o-up:before {\n  content: \"\\f01b\";\n}\n.fa-inbox:before {\n  content: \"\\f01c\";\n}\n.fa-play-circle-o:before {\n  content: \"\\f01d\";\n}\n.fa-rotate-right:before,\n.fa-repeat:before {\n  content: \"\\f01e\";\n}\n.fa-refresh:before {\n  content: \"\\f021\";\n}\n.fa-list-alt:before {\n  content: \"\\f022\";\n}\n.fa-lock:before {\n  content: \"\\f023\";\n}\n.fa-flag:before {\n  content: \"\\f024\";\n}\n.fa-headphones:before {\n  content: \"\\f025\";\n}\n.fa-volume-off:before {\n  content: \"\\f026\";\n}\n.fa-volume-down:before {\n  content: \"\\f027\";\n}\n.fa-volume-up:before {\n  content: \"\\f028\";\n}\n.fa-qrcode:before {\n  content: \"\\f029\";\n}\n.fa-barcode:before {\n  content: \"\\f02a\";\n}\n.fa-tag:before {\n  content: \"\\f02b\";\n}\n.fa-tags:before {\n  content: \"\\f02c\";\n}\n.fa-book:before {\n  content: \"\\f02d\";\n}\n.fa-bookmark:before {\n  content: \"\\f02e\";\n}\n.fa-print:before {\n  content: \"\\f02f\";\n}\n.fa-camera:before {\n  content: \"\\f030\";\n}\n.fa-font:before {\n  content: \"\\f031\";\n}\n.fa-bold:before {\n  content: \"\\f032\";\n}\n.fa-italic:before {\n  content: \"\\f033\";\n}\n.fa-text-height:before {\n  content: \"\\f034\";\n}\n.fa-text-width:before {\n  content: \"\\f035\";\n}\n.fa-align-left:before {\n  content: \"\\f036\";\n}\n.fa-align-center:before {\n  content: \"\\f037\";\n}\n.fa-align-right:before {\n  content: \"\\f038\";\n}\n.fa-align-justify:before {\n  content: \"\\f039\";\n}\n.fa-list:before {\n  content: \"\\f03a\";\n}\n.fa-dedent:before,\n.fa-outdent:before {\n  content: \"\\f03b\";\n}\n.fa-indent:before {\n  content: \"\\f03c\";\n}\n.fa-video-camera:before {\n  content: \"\\f03d\";\n}\n.fa-photo:before,\n.fa-image:before,\n.fa-picture-o:before {\n  content: \"\\f03e\";\n}\n.fa-pencil:before {\n  content: \"\\f040\";\n}\n.fa-map-marker:before {\n  content: \"\\f041\";\n}\n.fa-adjust:before {\n  content: \"\\f042\";\n}\n.fa-tint:before {\n  content: \"\\f043\";\n}\n.fa-edit:before,\n.fa-pencil-square-o:before {\n  content: \"\\f044\";\n}\n.fa-share-square-o:before {\n  content: \"\\f045\";\n}\n.fa-check-square-o:before {\n  content: \"\\f046\";\n}\n.fa-arrows:before {\n  content: \"\\f047\";\n}\n.fa-step-backward:before {\n  content: \"\\f048\";\n}\n.fa-fast-backward:before {\n  content: \"\\f049\";\n}\n.fa-backward:before {\n  content: \"\\f04a\";\n}\n.fa-play:before {\n  content: \"\\f04b\";\n}\n.fa-pause:before {\n  content: \"\\f04c\";\n}\n.fa-stop:before {\n  content: \"\\f04d\";\n}\n.fa-forward:before {\n  content: \"\\f04e\";\n}\n.fa-fast-forward:before {\n  content: \"\\f050\";\n}\n.fa-step-forward:before {\n  content: \"\\f051\";\n}\n.fa-eject:before {\n  content: \"\\f052\";\n}\n.fa-chevron-left:before {\n  content: \"\\f053\";\n}\n.fa-chevron-right:before {\n  content: \"\\f054\";\n}\n.fa-plus-circle:before {\n  content: \"\\f055\";\n}\n.fa-minus-circle:before {\n  content: \"\\f056\";\n}\n.fa-times-circle:before {\n  content: \"\\f057\";\n}\n.fa-check-circle:before {\n  content: \"\\f058\";\n}\n.fa-question-circle:before {\n  content: \"\\f059\";\n}\n.fa-info-circle:before {\n  content: \"\\f05a\";\n}\n.fa-crosshairs:before {\n  content: \"\\f05b\";\n}\n.fa-times-circle-o:before {\n  content: \"\\f05c\";\n}\n.fa-check-circle-o:before {\n  content: \"\\f05d\";\n}\n.fa-ban:before {\n  content: \"\\f05e\";\n}\n.fa-arrow-left:before {\n  content: \"\\f060\";\n}\n.fa-arrow-right:before {\n  content: \"\\f061\";\n}\n.fa-arrow-up:before {\n  content: \"\\f062\";\n}\n.fa-arrow-down:before {\n  content: \"\\f063\";\n}\n.fa-mail-forward:before,\n.fa-share:before {\n  content: \"\\f064\";\n}\n.fa-expand:before {\n  content: \"\\f065\";\n}\n.fa-compress:before {\n  content: \"\\f066\";\n}\n.fa-plus:before {\n  content: \"\\f067\";\n}\n.fa-minus:before {\n  content: \"\\f068\";\n}\n.fa-asterisk:before {\n  content: \"\\f069\";\n}\n.fa-exclamation-circle:before {\n  content: \"\\f06a\";\n}\n.fa-gift:before {\n  content: \"\\f06b\";\n}\n.fa-leaf:before {\n  content: \"\\f06c\";\n}\n.fa-fire:before {\n  content: \"\\f06d\";\n}\n.fa-eye:before {\n  content: \"\\f06e\";\n}\n.fa-eye-slash:before {\n  content: \"\\f070\";\n}\n.fa-warning:before,\n.fa-exclamation-triangle:before {\n  content: \"\\f071\";\n}\n.fa-plane:before {\n  content: \"\\f072\";\n}\n.fa-calendar:before {\n  content: \"\\f073\";\n}\n.fa-random:before {\n  content: \"\\f074\";\n}\n.fa-comment:before {\n  content: \"\\f075\";\n}\n.fa-magnet:before {\n  content: \"\\f076\";\n}\n.fa-chevron-up:before {\n  content: \"\\f077\";\n}\n.fa-chevron-down:before {\n  content: \"\\f078\";\n}\n.fa-retweet:before {\n  content: \"\\f079\";\n}\n.fa-shopping-cart:before {\n  content: \"\\f07a\";\n}\n.fa-folder:before {\n  content: \"\\f07b\";\n}\n.fa-folder-open:before {\n  content: \"\\f07c\";\n}\n.fa-arrows-v:before {\n  content: \"\\f07d\";\n}\n.fa-arrows-h:before {\n  content: \"\\f07e\";\n}\n.fa-bar-chart-o:before,\n.fa-bar-chart:before {\n  content: \"\\f080\";\n}\n.fa-twitter-square:before {\n  content: \"\\f081\";\n}\n.fa-facebook-square:before {\n  content: \"\\f082\";\n}\n.fa-camera-retro:before {\n  content: \"\\f083\";\n}\n.fa-key:before {\n  content: \"\\f084\";\n}\n.fa-gears:before,\n.fa-cogs:before {\n  content: \"\\f085\";\n}\n.fa-comments:before {\n  content: \"\\f086\";\n}\n.fa-thumbs-o-up:before {\n  content: \"\\f087\";\n}\n.fa-thumbs-o-down:before {\n  content: \"\\f088\";\n}\n.fa-star-half:before {\n  content: \"\\f089\";\n}\n.fa-heart-o:before {\n  content: \"\\f08a\";\n}\n.fa-sign-out:before {\n  content: \"\\f08b\";\n}\n.fa-linkedin-square:before {\n  content: \"\\f08c\";\n}\n.fa-thumb-tack:before {\n  content: \"\\f08d\";\n}\n.fa-external-link:before {\n  content: \"\\f08e\";\n}\n.fa-sign-in:before {\n  content: \"\\f090\";\n}\n.fa-trophy:before {\n  content: \"\\f091\";\n}\n.fa-github-square:before {\n  content: \"\\f092\";\n}\n.fa-upload:before {\n  content: \"\\f093\";\n}\n.fa-lemon-o:before {\n  content: \"\\f094\";\n}\n.fa-phone:before {\n  content: \"\\f095\";\n}\n.fa-square-o:before {\n  content: \"\\f096\";\n}\n.fa-bookmark-o:before {\n  content: \"\\f097\";\n}\n.fa-phone-square:before {\n  content: \"\\f098\";\n}\n.fa-twitter:before {\n  content: \"\\f099\";\n}\n.fa-facebook-f:before,\n.fa-facebook:before {\n  content: \"\\f09a\";\n}\n.fa-github:before {\n  content: \"\\f09b\";\n}\n.fa-unlock:before {\n  content: \"\\f09c\";\n}\n.fa-credit-card:before {\n  content: \"\\f09d\";\n}\n.fa-feed:before,\n.fa-rss:before {\n  content: \"\\f09e\";\n}\n.fa-hdd-o:before {\n  content: \"\\f0a0\";\n}\n.fa-bullhorn:before {\n  content: \"\\f0a1\";\n}\n.fa-bell:before {\n  content: \"\\f0f3\";\n}\n.fa-certificate:before {\n  content: \"\\f0a3\";\n}\n.fa-hand-o-right:before {\n  content: \"\\f0a4\";\n}\n.fa-hand-o-left:before {\n  content: \"\\f0a5\";\n}\n.fa-hand-o-up:before {\n  content: \"\\f0a6\";\n}\n.fa-hand-o-down:before {\n  content: \"\\f0a7\";\n}\n.fa-arrow-circle-left:before {\n  content: \"\\f0a8\";\n}\n.fa-arrow-circle-right:before {\n  content: \"\\f0a9\";\n}\n.fa-arrow-circle-up:before {\n  content: \"\\f0aa\";\n}\n.fa-arrow-circle-down:before {\n  content: \"\\f0ab\";\n}\n.fa-globe:before {\n  content: \"\\f0ac\";\n}\n.fa-wrench:before {\n  content: \"\\f0ad\";\n}\n.fa-tasks:before {\n  content: \"\\f0ae\";\n}\n.fa-filter:before {\n  content: \"\\f0b0\";\n}\n.fa-briefcase:before {\n  content: \"\\f0b1\";\n}\n.fa-arrows-alt:before {\n  content: \"\\f0b2\";\n}\n.fa-group:before,\n.fa-users:before {\n  content: \"\\f0c0\";\n}\n.fa-chain:before,\n.fa-link:before {\n  content: \"\\f0c1\";\n}\n.fa-cloud:before {\n  content: \"\\f0c2\";\n}\n.fa-flask:before {\n  content: \"\\f0c3\";\n}\n.fa-cut:before,\n.fa-scissors:before {\n  content: \"\\f0c4\";\n}\n.fa-copy:before,\n.fa-files-o:before {\n  content: \"\\f0c5\";\n}\n.fa-paperclip:before {\n  content: \"\\f0c6\";\n}\n.fa-save:before,\n.fa-floppy-o:before {\n  content: \"\\f0c7\";\n}\n.fa-square:before {\n  content: \"\\f0c8\";\n}\n.fa-navicon:before,\n.fa-reorder:before,\n.fa-bars:before {\n  content: \"\\f0c9\";\n}\n.fa-list-ul:before {\n  content: \"\\f0ca\";\n}\n.fa-list-ol:before {\n  content: \"\\f0cb\";\n}\n.fa-strikethrough:before {\n  content: \"\\f0cc\";\n}\n.fa-underline:before {\n  content: \"\\f0cd\";\n}\n.fa-table:before {\n  content: \"\\f0ce\";\n}\n.fa-magic:before {\n  content: \"\\f0d0\";\n}\n.fa-truck:before {\n  content: \"\\f0d1\";\n}\n.fa-pinterest:before {\n  content: \"\\f0d2\";\n}\n.fa-pinterest-square:before {\n  content: \"\\f0d3\";\n}\n.fa-google-plus-square:before {\n  content: \"\\f0d4\";\n}\n.fa-google-plus:before {\n  content: \"\\f0d5\";\n}\n.fa-money:before {\n  content: \"\\f0d6\";\n}\n.fa-caret-down:before {\n  content: \"\\f0d7\";\n}\n.fa-caret-up:before {\n  content: \"\\f0d8\";\n}\n.fa-caret-left:before {\n  content: \"\\f0d9\";\n}\n.fa-caret-right:before {\n  content: \"\\f0da\";\n}\n.fa-columns:before {\n  content: \"\\f0db\";\n}\n.fa-unsorted:before,\n.fa-sort:before {\n  content: \"\\f0dc\";\n}\n.fa-sort-down:before,\n.fa-sort-desc:before {\n  content: \"\\f0dd\";\n}\n.fa-sort-up:before,\n.fa-sort-asc:before {\n  content: \"\\f0de\";\n}\n.fa-envelope:before {\n  content: \"\\f0e0\";\n}\n.fa-linkedin:before {\n  content: \"\\f0e1\";\n}\n.fa-rotate-left:before,\n.fa-undo:before {\n  content: \"\\f0e2\";\n}\n.fa-legal:before,\n.fa-gavel:before {\n  content: \"\\f0e3\";\n}\n.fa-dashboard:before,\n.fa-tachometer:before {\n  content: \"\\f0e4\";\n}\n.fa-comment-o:before {\n  content: \"\\f0e5\";\n}\n.fa-comments-o:before {\n  content: \"\\f0e6\";\n}\n.fa-flash:before,\n.fa-bolt:before {\n  content: \"\\f0e7\";\n}\n.fa-sitemap:before {\n  content: \"\\f0e8\";\n}\n.fa-umbrella:before {\n  content: \"\\f0e9\";\n}\n.fa-paste:before,\n.fa-clipboard:before {\n  content: \"\\f0ea\";\n}\n.fa-lightbulb-o:before {\n  content: \"\\f0eb\";\n}\n.fa-exchange:before {\n  content: \"\\f0ec\";\n}\n.fa-cloud-download:before {\n  content: \"\\f0ed\";\n}\n.fa-cloud-upload:before {\n  content: \"\\f0ee\";\n}\n.fa-user-md:before {\n  content: \"\\f0f0\";\n}\n.fa-stethoscope:before {\n  content: \"\\f0f1\";\n}\n.fa-suitcase:before {\n  content: \"\\f0f2\";\n}\n.fa-bell-o:before {\n  content: \"\\f0a2\";\n}\n.fa-coffee:before {\n  content: \"\\f0f4\";\n}\n.fa-cutlery:before {\n  content: \"\\f0f5\";\n}\n.fa-file-text-o:before {\n  content: \"\\f0f6\";\n}\n.fa-building-o:before {\n  content: \"\\f0f7\";\n}\n.fa-hospital-o:before {\n  content: \"\\f0f8\";\n}\n.fa-ambulance:before {\n  content: \"\\f0f9\";\n}\n.fa-medkit:before {\n  content: \"\\f0fa\";\n}\n.fa-fighter-jet:before {\n  content: \"\\f0fb\";\n}\n.fa-beer:before {\n  content: \"\\f0fc\";\n}\n.fa-h-square:before {\n  content: \"\\f0fd\";\n}\n.fa-plus-square:before {\n  content: \"\\f0fe\";\n}\n.fa-angle-double-left:before {\n  content: \"\\f100\";\n}\n.fa-angle-double-right:before {\n  content: \"\\f101\";\n}\n.fa-angle-double-up:before {\n  content: \"\\f102\";\n}\n.fa-angle-double-down:before {\n  content: \"\\f103\";\n}\n.fa-angle-left:before {\n  content: \"\\f104\";\n}\n.fa-angle-right:before {\n  content: \"\\f105\";\n}\n.fa-angle-up:before {\n  content: \"\\f106\";\n}\n.fa-angle-down:before {\n  content: \"\\f107\";\n}\n.fa-desktop:before {\n  content: \"\\f108\";\n}\n.fa-laptop:before {\n  content: \"\\f109\";\n}\n.fa-tablet:before {\n  content: \"\\f10a\";\n}\n.fa-mobile-phone:before,\n.fa-mobile:before {\n  content: \"\\f10b\";\n}\n.fa-circle-o:before {\n  content: \"\\f10c\";\n}\n.fa-quote-left:before {\n  content: \"\\f10d\";\n}\n.fa-quote-right:before {\n  content: \"\\f10e\";\n}\n.fa-spinner:before {\n  content: \"\\f110\";\n}\n.fa-circle:before {\n  content: \"\\f111\";\n}\n.fa-mail-reply:before,\n.fa-reply:before {\n  content: \"\\f112\";\n}\n.fa-github-alt:before {\n  content: \"\\f113\";\n}\n.fa-folder-o:before {\n  content: \"\\f114\";\n}\n.fa-folder-open-o:before {\n  content: \"\\f115\";\n}\n.fa-smile-o:before {\n  content: \"\\f118\";\n}\n.fa-frown-o:before {\n  content: \"\\f119\";\n}\n.fa-meh-o:before {\n  content: \"\\f11a\";\n}\n.fa-gamepad:before {\n  content: \"\\f11b\";\n}\n.fa-keyboard-o:before {\n  content: \"\\f11c\";\n}\n.fa-flag-o:before {\n  content: \"\\f11d\";\n}\n.fa-flag-checkered:before {\n  content: \"\\f11e\";\n}\n.fa-terminal:before {\n  content: \"\\f120\";\n}\n.fa-code:before {\n  content: \"\\f121\";\n}\n.fa-mail-reply-all:before,\n.fa-reply-all:before {\n  content: \"\\f122\";\n}\n.fa-star-half-empty:before,\n.fa-star-half-full:before,\n.fa-star-half-o:before {\n  content: \"\\f123\";\n}\n.fa-location-arrow:before {\n  content: \"\\f124\";\n}\n.fa-crop:before {\n  content: \"\\f125\";\n}\n.fa-code-fork:before {\n  content: \"\\f126\";\n}\n.fa-unlink:before,\n.fa-chain-broken:before {\n  content: \"\\f127\";\n}\n.fa-question:before {\n  content: \"\\f128\";\n}\n.fa-info:before {\n  content: \"\\f129\";\n}\n.fa-exclamation:before {\n  content: \"\\f12a\";\n}\n.fa-superscript:before {\n  content: \"\\f12b\";\n}\n.fa-subscript:before {\n  content: \"\\f12c\";\n}\n.fa-eraser:before {\n  content: \"\\f12d\";\n}\n.fa-puzzle-piece:before {\n  content: \"\\f12e\";\n}\n.fa-microphone:before {\n  content: \"\\f130\";\n}\n.fa-microphone-slash:before {\n  content: \"\\f131\";\n}\n.fa-shield:before {\n  content: \"\\f132\";\n}\n.fa-calendar-o:before {\n  content: \"\\f133\";\n}\n.fa-fire-extinguisher:before {\n  content: \"\\f134\";\n}\n.fa-rocket:before {\n  content: \"\\f135\";\n}\n.fa-maxcdn:before {\n  content: \"\\f136\";\n}\n.fa-chevron-circle-left:before {\n  content: \"\\f137\";\n}\n.fa-chevron-circle-right:before {\n  content: \"\\f138\";\n}\n.fa-chevron-circle-up:before {\n  content: \"\\f139\";\n}\n.fa-chevron-circle-down:before {\n  content: \"\\f13a\";\n}\n.fa-html5:before {\n  content: \"\\f13b\";\n}\n.fa-css3:before {\n  content: \"\\f13c\";\n}\n.fa-anchor:before {\n  content: \"\\f13d\";\n}\n.fa-unlock-alt:before {\n  content: \"\\f13e\";\n}\n.fa-bullseye:before {\n  content: \"\\f140\";\n}\n.fa-ellipsis-h:before {\n  content: \"\\f141\";\n}\n.fa-ellipsis-v:before {\n  content: \"\\f142\";\n}\n.fa-rss-square:before {\n  content: \"\\f143\";\n}\n.fa-play-circle:before {\n  content: \"\\f144\";\n}\n.fa-ticket:before {\n  content: \"\\f145\";\n}\n.fa-minus-square:before {\n  content: \"\\f146\";\n}\n.fa-minus-square-o:before {\n  content: \"\\f147\";\n}\n.fa-level-up:before {\n  content: \"\\f148\";\n}\n.fa-level-down:before {\n  content: \"\\f149\";\n}\n.fa-check-square:before {\n  content: \"\\f14a\";\n}\n.fa-pencil-square:before {\n  content: \"\\f14b\";\n}\n.fa-external-link-square:before {\n  content: \"\\f14c\";\n}\n.fa-share-square:before {\n  content: \"\\f14d\";\n}\n.fa-compass:before {\n  content: \"\\f14e\";\n}\n.fa-toggle-down:before,\n.fa-caret-square-o-down:before {\n  content: \"\\f150\";\n}\n.fa-toggle-up:before,\n.fa-caret-square-o-up:before {\n  content: \"\\f151\";\n}\n.fa-toggle-right:before,\n.fa-caret-square-o-right:before {\n  content: \"\\f152\";\n}\n.fa-euro:before,\n.fa-eur:before {\n  content: \"\\f153\";\n}\n.fa-gbp:before {\n  content: \"\\f154\";\n}\n.fa-dollar:before,\n.fa-usd:before {\n  content: \"\\f155\";\n}\n.fa-rupee:before,\n.fa-inr:before {\n  content: \"\\f156\";\n}\n.fa-cny:before,\n.fa-rmb:before,\n.fa-yen:before,\n.fa-jpy:before {\n  content: \"\\f157\";\n}\n.fa-ruble:before,\n.fa-rouble:before,\n.fa-rub:before {\n  content: \"\\f158\";\n}\n.fa-won:before,\n.fa-krw:before {\n  content: \"\\f159\";\n}\n.fa-bitcoin:before,\n.fa-btc:before {\n  content: \"\\f15a\";\n}\n.fa-file:before {\n  content: \"\\f15b\";\n}\n.fa-file-text:before {\n  content: \"\\f15c\";\n}\n.fa-sort-alpha-asc:before {\n  content: \"\\f15d\";\n}\n.fa-sort-alpha-desc:before {\n  content: \"\\f15e\";\n}\n.fa-sort-amount-asc:before {\n  content: \"\\f160\";\n}\n.fa-sort-amount-desc:before {\n  content: \"\\f161\";\n}\n.fa-sort-numeric-asc:before {\n  content: \"\\f162\";\n}\n.fa-sort-numeric-desc:before {\n  content: \"\\f163\";\n}\n.fa-thumbs-up:before {\n  content: \"\\f164\";\n}\n.fa-thumbs-down:before {\n  content: \"\\f165\";\n}\n.fa-youtube-square:before {\n  content: \"\\f166\";\n}\n.fa-youtube:before {\n  content: \"\\f167\";\n}\n.fa-xing:before {\n  content: \"\\f168\";\n}\n.fa-xing-square:before {\n  content: \"\\f169\";\n}\n.fa-youtube-play:before {\n  content: \"\\f16a\";\n}\n.fa-dropbox:before {\n  content: \"\\f16b\";\n}\n.fa-stack-overflow:before {\n  content: \"\\f16c\";\n}\n.fa-instagram:before {\n  content: \"\\f16d\";\n}\n.fa-flickr:before {\n  content: \"\\f16e\";\n}\n.fa-adn:before {\n  content: \"\\f170\";\n}\n.fa-bitbucket:before {\n  content: \"\\f171\";\n}\n.fa-bitbucket-square:before {\n  content: \"\\f172\";\n}\n.fa-tumblr:before {\n  content: \"\\f173\";\n}\n.fa-tumblr-square:before {\n  content: \"\\f174\";\n}\n.fa-long-arrow-down:before {\n  content: \"\\f175\";\n}\n.fa-long-arrow-up:before {\n  content: \"\\f176\";\n}\n.fa-long-arrow-left:before {\n  content: \"\\f177\";\n}\n.fa-long-arrow-right:before {\n  content: \"\\f178\";\n}\n.fa-apple:before {\n  content: \"\\f179\";\n}\n.fa-windows:before {\n  content: \"\\f17a\";\n}\n.fa-android:before {\n  content: \"\\f17b\";\n}\n.fa-linux:before {\n  content: \"\\f17c\";\n}\n.fa-dribbble:before {\n  content: \"\\f17d\";\n}\n.fa-skype:before {\n  content: \"\\f17e\";\n}\n.fa-foursquare:before {\n  content: \"\\f180\";\n}\n.fa-trello:before {\n  content: \"\\f181\";\n}\n.fa-female:before {\n  content: \"\\f182\";\n}\n.fa-male:before {\n  content: \"\\f183\";\n}\n.fa-gittip:before,\n.fa-gratipay:before {\n  content: \"\\f184\";\n}\n.fa-sun-o:before {\n  content: \"\\f185\";\n}\n.fa-moon-o:before {\n  content: \"\\f186\";\n}\n.fa-archive:before {\n  content: \"\\f187\";\n}\n.fa-bug:before {\n  content: \"\\f188\";\n}\n.fa-vk:before {\n  content: \"\\f189\";\n}\n.fa-weibo:before {\n  content: \"\\f18a\";\n}\n.fa-renren:before {\n  content: \"\\f18b\";\n}\n.fa-pagelines:before {\n  content: \"\\f18c\";\n}\n.fa-stack-exchange:before {\n  content: \"\\f18d\";\n}\n.fa-arrow-circle-o-right:before {\n  content: \"\\f18e\";\n}\n.fa-arrow-circle-o-left:before {\n  content: \"\\f190\";\n}\n.fa-toggle-left:before,\n.fa-caret-square-o-left:before {\n  content: \"\\f191\";\n}\n.fa-dot-circle-o:before {\n  content: \"\\f192\";\n}\n.fa-wheelchair:before {\n  content: \"\\f193\";\n}\n.fa-vimeo-square:before {\n  content: \"\\f194\";\n}\n.fa-turkish-lira:before,\n.fa-try:before {\n  content: \"\\f195\";\n}\n.fa-plus-square-o:before {\n  content: \"\\f196\";\n}\n.fa-space-shuttle:before {\n  content: \"\\f197\";\n}\n.fa-slack:before {\n  content: \"\\f198\";\n}\n.fa-envelope-square:before {\n  content: \"\\f199\";\n}\n.fa-wordpress:before {\n  content: \"\\f19a\";\n}\n.fa-openid:before {\n  content: \"\\f19b\";\n}\n.fa-institution:before,\n.fa-bank:before,\n.fa-university:before {\n  content: \"\\f19c\";\n}\n.fa-mortar-board:before,\n.fa-graduation-cap:before {\n  content: \"\\f19d\";\n}\n.fa-yahoo:before {\n  content: \"\\f19e\";\n}\n.fa-google:before {\n  content: \"\\f1a0\";\n}\n.fa-reddit:before {\n  content: \"\\f1a1\";\n}\n.fa-reddit-square:before {\n  content: \"\\f1a2\";\n}\n.fa-stumbleupon-circle:before {\n  content: \"\\f1a3\";\n}\n.fa-stumbleupon:before {\n  content: \"\\f1a4\";\n}\n.fa-delicious:before {\n  content: \"\\f1a5\";\n}\n.fa-digg:before {\n  content: \"\\f1a6\";\n}\n.fa-pied-piper-pp:before {\n  content: \"\\f1a7\";\n}\n.fa-pied-piper-alt:before {\n  content: \"\\f1a8\";\n}\n.fa-drupal:before {\n  content: \"\\f1a9\";\n}\n.fa-joomla:before {\n  content: \"\\f1aa\";\n}\n.fa-language:before {\n  content: \"\\f1ab\";\n}\n.fa-fax:before {\n  content: \"\\f1ac\";\n}\n.fa-building:before {\n  content: \"\\f1ad\";\n}\n.fa-child:before {\n  content: \"\\f1ae\";\n}\n.fa-paw:before {\n  content: \"\\f1b0\";\n}\n.fa-spoon:before {\n  content: \"\\f1b1\";\n}\n.fa-cube:before {\n  content: \"\\f1b2\";\n}\n.fa-cubes:before {\n  content: \"\\f1b3\";\n}\n.fa-behance:before {\n  content: \"\\f1b4\";\n}\n.fa-behance-square:before {\n  content: \"\\f1b5\";\n}\n.fa-steam:before {\n  content: \"\\f1b6\";\n}\n.fa-steam-square:before {\n  content: \"\\f1b7\";\n}\n.fa-recycle:before {\n  content: \"\\f1b8\";\n}\n.fa-automobile:before,\n.fa-car:before {\n  content: \"\\f1b9\";\n}\n.fa-cab:before,\n.fa-taxi:before {\n  content: \"\\f1ba\";\n}\n.fa-tree:before {\n  content: \"\\f1bb\";\n}\n.fa-spotify:before {\n  content: \"\\f1bc\";\n}\n.fa-deviantart:before {\n  content: \"\\f1bd\";\n}\n.fa-soundcloud:before {\n  content: \"\\f1be\";\n}\n.fa-database:before {\n  content: \"\\f1c0\";\n}\n.fa-file-pdf-o:before {\n  content: \"\\f1c1\";\n}\n.fa-file-word-o:before {\n  content: \"\\f1c2\";\n}\n.fa-file-excel-o:before {\n  content: \"\\f1c3\";\n}\n.fa-file-powerpoint-o:before {\n  content: \"\\f1c4\";\n}\n.fa-file-photo-o:before,\n.fa-file-picture-o:before,\n.fa-file-image-o:before {\n  content: \"\\f1c5\";\n}\n.fa-file-zip-o:before,\n.fa-file-archive-o:before {\n  content: \"\\f1c6\";\n}\n.fa-file-sound-o:before,\n.fa-file-audio-o:before {\n  content: \"\\f1c7\";\n}\n.fa-file-movie-o:before,\n.fa-file-video-o:before {\n  content: \"\\f1c8\";\n}\n.fa-file-code-o:before {\n  content: \"\\f1c9\";\n}\n.fa-vine:before {\n  content: \"\\f1ca\";\n}\n.fa-codepen:before {\n  content: \"\\f1cb\";\n}\n.fa-jsfiddle:before {\n  content: \"\\f1cc\";\n}\n.fa-life-bouy:before,\n.fa-life-buoy:before,\n.fa-life-saver:before,\n.fa-support:before,\n.fa-life-ring:before {\n  content: \"\\f1cd\";\n}\n.fa-circle-o-notch:before {\n  content: \"\\f1ce\";\n}\n.fa-ra:before,\n.fa-resistance:before,\n.fa-rebel:before {\n  content: \"\\f1d0\";\n}\n.fa-ge:before,\n.fa-empire:before {\n  content: \"\\f1d1\";\n}\n.fa-git-square:before {\n  content: \"\\f1d2\";\n}\n.fa-git:before {\n  content: \"\\f1d3\";\n}\n.fa-y-combinator-square:before,\n.fa-yc-square:before,\n.fa-hacker-news:before {\n  content: \"\\f1d4\";\n}\n.fa-tencent-weibo:before {\n  content: \"\\f1d5\";\n}\n.fa-qq:before {\n  content: \"\\f1d6\";\n}\n.fa-wechat:before,\n.fa-weixin:before {\n  content: \"\\f1d7\";\n}\n.fa-send:before,\n.fa-paper-plane:before {\n  content: \"\\f1d8\";\n}\n.fa-send-o:before,\n.fa-paper-plane-o:before {\n  content: \"\\f1d9\";\n}\n.fa-history:before {\n  content: \"\\f1da\";\n}\n.fa-circle-thin:before {\n  content: \"\\f1db\";\n}\n.fa-header:before {\n  content: \"\\f1dc\";\n}\n.fa-paragraph:before {\n  content: \"\\f1dd\";\n}\n.fa-sliders:before {\n  content: \"\\f1de\";\n}\n.fa-share-alt:before {\n  content: \"\\f1e0\";\n}\n.fa-share-alt-square:before {\n  content: \"\\f1e1\";\n}\n.fa-bomb:before {\n  content: \"\\f1e2\";\n}\n.fa-soccer-ball-o:before,\n.fa-futbol-o:before {\n  content: \"\\f1e3\";\n}\n.fa-tty:before {\n  content: \"\\f1e4\";\n}\n.fa-binoculars:before {\n  content: \"\\f1e5\";\n}\n.fa-plug:before {\n  content: \"\\f1e6\";\n}\n.fa-slideshare:before {\n  content: \"\\f1e7\";\n}\n.fa-twitch:before {\n  content: \"\\f1e8\";\n}\n.fa-yelp:before {\n  content: \"\\f1e9\";\n}\n.fa-newspaper-o:before {\n  content: \"\\f1ea\";\n}\n.fa-wifi:before {\n  content: \"\\f1eb\";\n}\n.fa-calculator:before {\n  content: \"\\f1ec\";\n}\n.fa-paypal:before {\n  content: \"\\f1ed\";\n}\n.fa-google-wallet:before {\n  content: \"\\f1ee\";\n}\n.fa-cc-visa:before {\n  content: \"\\f1f0\";\n}\n.fa-cc-mastercard:before {\n  content: \"\\f1f1\";\n}\n.fa-cc-discover:before {\n  content: \"\\f1f2\";\n}\n.fa-cc-amex:before {\n  content: \"\\f1f3\";\n}\n.fa-cc-paypal:before {\n  content: \"\\f1f4\";\n}\n.fa-cc-stripe:before {\n  content: \"\\f1f5\";\n}\n.fa-bell-slash:before {\n  content: \"\\f1f6\";\n}\n.fa-bell-slash-o:before {\n  content: \"\\f1f7\";\n}\n.fa-trash:before {\n  content: \"\\f1f8\";\n}\n.fa-copyright:before {\n  content: \"\\f1f9\";\n}\n.fa-at:before {\n  content: \"\\f1fa\";\n}\n.fa-eyedropper:before {\n  content: \"\\f1fb\";\n}\n.fa-paint-brush:before {\n  content: \"\\f1fc\";\n}\n.fa-birthday-cake:before {\n  content: \"\\f1fd\";\n}\n.fa-area-chart:before {\n  content: \"\\f1fe\";\n}\n.fa-pie-chart:before {\n  content: \"\\f200\";\n}\n.fa-line-chart:before {\n  content: \"\\f201\";\n}\n.fa-lastfm:before {\n  content: \"\\f202\";\n}\n.fa-lastfm-square:before {\n  content: \"\\f203\";\n}\n.fa-toggle-off:before {\n  content: \"\\f204\";\n}\n.fa-toggle-on:before {\n  content: \"\\f205\";\n}\n.fa-bicycle:before {\n  content: \"\\f206\";\n}\n.fa-bus:before {\n  content: \"\\f207\";\n}\n.fa-ioxhost:before {\n  content: \"\\f208\";\n}\n.fa-angellist:before {\n  content: \"\\f209\";\n}\n.fa-cc:before {\n  content: \"\\f20a\";\n}\n.fa-shekel:before,\n.fa-sheqel:before,\n.fa-ils:before {\n  content: \"\\f20b\";\n}\n.fa-meanpath:before {\n  content: \"\\f20c\";\n}\n.fa-buysellads:before {\n  content: \"\\f20d\";\n}\n.fa-connectdevelop:before {\n  content: \"\\f20e\";\n}\n.fa-dashcube:before {\n  content: \"\\f210\";\n}\n.fa-forumbee:before {\n  content: \"\\f211\";\n}\n.fa-leanpub:before {\n  content: \"\\f212\";\n}\n.fa-sellsy:before {\n  content: \"\\f213\";\n}\n.fa-shirtsinbulk:before {\n  content: \"\\f214\";\n}\n.fa-simplybuilt:before {\n  content: \"\\f215\";\n}\n.fa-skyatlas:before {\n  content: \"\\f216\";\n}\n.fa-cart-plus:before {\n  content: \"\\f217\";\n}\n.fa-cart-arrow-down:before {\n  content: \"\\f218\";\n}\n.fa-diamond:before {\n  content: \"\\f219\";\n}\n.fa-ship:before {\n  content: \"\\f21a\";\n}\n.fa-user-secret:before {\n  content: \"\\f21b\";\n}\n.fa-motorcycle:before {\n  content: \"\\f21c\";\n}\n.fa-street-view:before {\n  content: \"\\f21d\";\n}\n.fa-heartbeat:before {\n  content: \"\\f21e\";\n}\n.fa-venus:before {\n  content: \"\\f221\";\n}\n.fa-mars:before {\n  content: \"\\f222\";\n}\n.fa-mercury:before {\n  content: \"\\f223\";\n}\n.fa-intersex:before,\n.fa-transgender:before {\n  content: \"\\f224\";\n}\n.fa-transgender-alt:before {\n  content: \"\\f225\";\n}\n.fa-venus-double:before {\n  content: \"\\f226\";\n}\n.fa-mars-double:before {\n  content: \"\\f227\";\n}\n.fa-venus-mars:before {\n  content: \"\\f228\";\n}\n.fa-mars-stroke:before {\n  content: \"\\f229\";\n}\n.fa-mars-stroke-v:before {\n  content: \"\\f22a\";\n}\n.fa-mars-stroke-h:before {\n  content: \"\\f22b\";\n}\n.fa-neuter:before {\n  content: \"\\f22c\";\n}\n.fa-genderless:before {\n  content: \"\\f22d\";\n}\n.fa-facebook-official:before {\n  content: \"\\f230\";\n}\n.fa-pinterest-p:before {\n  content: \"\\f231\";\n}\n.fa-whatsapp:before {\n  content: \"\\f232\";\n}\n.fa-server:before {\n  content: \"\\f233\";\n}\n.fa-user-plus:before {\n  content: \"\\f234\";\n}\n.fa-user-times:before {\n  content: \"\\f235\";\n}\n.fa-hotel:before,\n.fa-bed:before {\n  content: \"\\f236\";\n}\n.fa-viacoin:before {\n  content: \"\\f237\";\n}\n.fa-train:before {\n  content: \"\\f238\";\n}\n.fa-subway:before {\n  content: \"\\f239\";\n}\n.fa-medium:before {\n  content: \"\\f23a\";\n}\n.fa-yc:before,\n.fa-y-combinator:before {\n  content: \"\\f23b\";\n}\n.fa-optin-monster:before {\n  content: \"\\f23c\";\n}\n.fa-opencart:before {\n  content: \"\\f23d\";\n}\n.fa-expeditedssl:before {\n  content: \"\\f23e\";\n}\n.fa-battery-4:before,\n.fa-battery:before,\n.fa-battery-full:before {\n  content: \"\\f240\";\n}\n.fa-battery-3:before,\n.fa-battery-three-quarters:before {\n  content: \"\\f241\";\n}\n.fa-battery-2:before,\n.fa-battery-half:before {\n  content: \"\\f242\";\n}\n.fa-battery-1:before,\n.fa-battery-quarter:before {\n  content: \"\\f243\";\n}\n.fa-battery-0:before,\n.fa-battery-empty:before {\n  content: \"\\f244\";\n}\n.fa-mouse-pointer:before {\n  content: \"\\f245\";\n}\n.fa-i-cursor:before {\n  content: \"\\f246\";\n}\n.fa-object-group:before {\n  content: \"\\f247\";\n}\n.fa-object-ungroup:before {\n  content: \"\\f248\";\n}\n.fa-sticky-note:before {\n  content: \"\\f249\";\n}\n.fa-sticky-note-o:before {\n  content: \"\\f24a\";\n}\n.fa-cc-jcb:before {\n  content: \"\\f24b\";\n}\n.fa-cc-diners-club:before {\n  content: \"\\f24c\";\n}\n.fa-clone:before {\n  content: \"\\f24d\";\n}\n.fa-balance-scale:before {\n  content: \"\\f24e\";\n}\n.fa-hourglass-o:before {\n  content: \"\\f250\";\n}\n.fa-hourglass-1:before,\n.fa-hourglass-start:before {\n  content: \"\\f251\";\n}\n.fa-hourglass-2:before,\n.fa-hourglass-half:before {\n  content: \"\\f252\";\n}\n.fa-hourglass-3:before,\n.fa-hourglass-end:before {\n  content: \"\\f253\";\n}\n.fa-hourglass:before {\n  content: \"\\f254\";\n}\n.fa-hand-grab-o:before,\n.fa-hand-rock-o:before {\n  content: \"\\f255\";\n}\n.fa-hand-stop-o:before,\n.fa-hand-paper-o:before {\n  content: \"\\f256\";\n}\n.fa-hand-scissors-o:before {\n  content: \"\\f257\";\n}\n.fa-hand-lizard-o:before {\n  content: \"\\f258\";\n}\n.fa-hand-spock-o:before {\n  content: \"\\f259\";\n}\n.fa-hand-pointer-o:before {\n  content: \"\\f25a\";\n}\n.fa-hand-peace-o:before {\n  content: \"\\f25b\";\n}\n.fa-trademark:before {\n  content: \"\\f25c\";\n}\n.fa-registered:before {\n  content: \"\\f25d\";\n}\n.fa-creative-commons:before {\n  content: \"\\f25e\";\n}\n.fa-gg:before {\n  content: \"\\f260\";\n}\n.fa-gg-circle:before {\n  content: \"\\f261\";\n}\n.fa-tripadvisor:before {\n  content: \"\\f262\";\n}\n.fa-odnoklassniki:before {\n  content: \"\\f263\";\n}\n.fa-odnoklassniki-square:before {\n  content: \"\\f264\";\n}\n.fa-get-pocket:before {\n  content: \"\\f265\";\n}\n.fa-wikipedia-w:before {\n  content: \"\\f266\";\n}\n.fa-safari:before {\n  content: \"\\f267\";\n}\n.fa-chrome:before {\n  content: \"\\f268\";\n}\n.fa-firefox:before {\n  content: \"\\f269\";\n}\n.fa-opera:before {\n  content: \"\\f26a\";\n}\n.fa-internet-explorer:before {\n  content: \"\\f26b\";\n}\n.fa-tv:before,\n.fa-television:before {\n  content: \"\\f26c\";\n}\n.fa-contao:before {\n  content: \"\\f26d\";\n}\n.fa-500px:before {\n  content: \"\\f26e\";\n}\n.fa-amazon:before {\n  content: \"\\f270\";\n}\n.fa-calendar-plus-o:before {\n  content: \"\\f271\";\n}\n.fa-calendar-minus-o:before {\n  content: \"\\f272\";\n}\n.fa-calendar-times-o:before {\n  content: \"\\f273\";\n}\n.fa-calendar-check-o:before {\n  content: \"\\f274\";\n}\n.fa-industry:before {\n  content: \"\\f275\";\n}\n.fa-map-pin:before {\n  content: \"\\f276\";\n}\n.fa-map-signs:before {\n  content: \"\\f277\";\n}\n.fa-map-o:before {\n  content: \"\\f278\";\n}\n.fa-map:before {\n  content: \"\\f279\";\n}\n.fa-commenting:before {\n  content: \"\\f27a\";\n}\n.fa-commenting-o:before {\n  content: \"\\f27b\";\n}\n.fa-houzz:before {\n  content: \"\\f27c\";\n}\n.fa-vimeo:before {\n  content: \"\\f27d\";\n}\n.fa-black-tie:before {\n  content: \"\\f27e\";\n}\n.fa-fonticons:before {\n  content: \"\\f280\";\n}\n.fa-reddit-alien:before {\n  content: \"\\f281\";\n}\n.fa-edge:before {\n  content: \"\\f282\";\n}\n.fa-credit-card-alt:before {\n  content: \"\\f283\";\n}\n.fa-codiepie:before {\n  content: \"\\f284\";\n}\n.fa-modx:before {\n  content: \"\\f285\";\n}\n.fa-fort-awesome:before {\n  content: \"\\f286\";\n}\n.fa-usb:before {\n  content: \"\\f287\";\n}\n.fa-product-hunt:before {\n  content: \"\\f288\";\n}\n.fa-mixcloud:before {\n  content: \"\\f289\";\n}\n.fa-scribd:before {\n  content: \"\\f28a\";\n}\n.fa-pause-circle:before {\n  content: \"\\f28b\";\n}\n.fa-pause-circle-o:before {\n  content: \"\\f28c\";\n}\n.fa-stop-circle:before {\n  content: \"\\f28d\";\n}\n.fa-stop-circle-o:before {\n  content: \"\\f28e\";\n}\n.fa-shopping-bag:before {\n  content: \"\\f290\";\n}\n.fa-shopping-basket:before {\n  content: \"\\f291\";\n}\n.fa-hashtag:before {\n  content: \"\\f292\";\n}\n.fa-bluetooth:before {\n  content: \"\\f293\";\n}\n.fa-bluetooth-b:before {\n  content: \"\\f294\";\n}\n.fa-percent:before {\n  content: \"\\f295\";\n}\n.fa-gitlab:before {\n  content: \"\\f296\";\n}\n.fa-wpbeginner:before {\n  content: \"\\f297\";\n}\n.fa-wpforms:before {\n  content: \"\\f298\";\n}\n.fa-envira:before {\n  content: \"\\f299\";\n}\n.fa-universal-access:before {\n  content: \"\\f29a\";\n}\n.fa-wheelchair-alt:before {\n  content: \"\\f29b\";\n}\n.fa-question-circle-o:before {\n  content: \"\\f29c\";\n}\n.fa-blind:before {\n  content: \"\\f29d\";\n}\n.fa-audio-description:before {\n  content: \"\\f29e\";\n}\n.fa-volume-control-phone:before {\n  content: \"\\f2a0\";\n}\n.fa-braille:before {\n  content: \"\\f2a1\";\n}\n.fa-assistive-listening-systems:before {\n  content: \"\\f2a2\";\n}\n.fa-asl-interpreting:before,\n.fa-american-sign-language-interpreting:before {\n  content: \"\\f2a3\";\n}\n.fa-deafness:before,\n.fa-hard-of-hearing:before,\n.fa-deaf:before {\n  content: \"\\f2a4\";\n}\n.fa-glide:before {\n  content: \"\\f2a5\";\n}\n.fa-glide-g:before {\n  content: \"\\f2a6\";\n}\n.fa-signing:before,\n.fa-sign-language:before {\n  content: \"\\f2a7\";\n}\n.fa-low-vision:before {\n  content: \"\\f2a8\";\n}\n.fa-viadeo:before {\n  content: \"\\f2a9\";\n}\n.fa-viadeo-square:before {\n  content: \"\\f2aa\";\n}\n.fa-snapchat:before {\n  content: \"\\f2ab\";\n}\n.fa-snapchat-ghost:before {\n  content: \"\\f2ac\";\n}\n.fa-snapchat-square:before {\n  content: \"\\f2ad\";\n}\n.fa-pied-piper:before {\n  content: \"\\f2ae\";\n}\n.fa-first-order:before {\n  content: \"\\f2b0\";\n}\n.fa-yoast:before {\n  content: \"\\f2b1\";\n}\n.fa-themeisle:before {\n  content: \"\\f2b2\";\n}\n.fa-google-plus-circle:before,\n.fa-google-plus-official:before {\n  content: \"\\f2b3\";\n}\n.fa-fa:before,\n.fa-font-awesome:before {\n  content: \"\\f2b4\";\n}\n.fa-handshake-o:before {\n  content: \"\\f2b5\";\n}\n.fa-envelope-open:before {\n  content: \"\\f2b6\";\n}\n.fa-envelope-open-o:before {\n  content: \"\\f2b7\";\n}\n.fa-linode:before {\n  content: \"\\f2b8\";\n}\n.fa-address-book:before {\n  content: \"\\f2b9\";\n}\n.fa-address-book-o:before {\n  content: \"\\f2ba\";\n}\n.fa-vcard:before,\n.fa-address-card:before {\n  content: \"\\f2bb\";\n}\n.fa-vcard-o:before,\n.fa-address-card-o:before {\n  content: \"\\f2bc\";\n}\n.fa-user-circle:before {\n  content: \"\\f2bd\";\n}\n.fa-user-circle-o:before {\n  content: \"\\f2be\";\n}\n.fa-user-o:before {\n  content: \"\\f2c0\";\n}\n.fa-id-badge:before {\n  content: \"\\f2c1\";\n}\n.fa-drivers-license:before,\n.fa-id-card:before {\n  content: \"\\f2c2\";\n}\n.fa-drivers-license-o:before,\n.fa-id-card-o:before {\n  content: \"\\f2c3\";\n}\n.fa-quora:before {\n  content: \"\\f2c4\";\n}\n.fa-free-code-camp:before {\n  content: \"\\f2c5\";\n}\n.fa-telegram:before {\n  content: \"\\f2c6\";\n}\n.fa-thermometer-4:before,\n.fa-thermometer:before,\n.fa-thermometer-full:before {\n  content: \"\\f2c7\";\n}\n.fa-thermometer-3:before,\n.fa-thermometer-three-quarters:before {\n  content: \"\\f2c8\";\n}\n.fa-thermometer-2:before,\n.fa-thermometer-half:before {\n  content: \"\\f2c9\";\n}\n.fa-thermometer-1:before,\n.fa-thermometer-quarter:before {\n  content: \"\\f2ca\";\n}\n.fa-thermometer-0:before,\n.fa-thermometer-empty:before {\n  content: \"\\f2cb\";\n}\n.fa-shower:before {\n  content: \"\\f2cc\";\n}\n.fa-bathtub:before,\n.fa-s15:before,\n.fa-bath:before {\n  content: \"\\f2cd\";\n}\n.fa-podcast:before {\n  content: \"\\f2ce\";\n}\n.fa-window-maximize:before {\n  content: \"\\f2d0\";\n}\n.fa-window-minimize:before {\n  content: \"\\f2d1\";\n}\n.fa-window-restore:before {\n  content: \"\\f2d2\";\n}\n.fa-times-rectangle:before,\n.fa-window-close:before {\n  content: \"\\f2d3\";\n}\n.fa-times-rectangle-o:before,\n.fa-window-close-o:before {\n  content: \"\\f2d4\";\n}\n.fa-bandcamp:before {\n  content: \"\\f2d5\";\n}\n.fa-grav:before {\n  content: \"\\f2d6\";\n}\n.fa-etsy:before {\n  content: \"\\f2d7\";\n}\n.fa-imdb:before {\n  content: \"\\f2d8\";\n}\n.fa-ravelry:before {\n  content: \"\\f2d9\";\n}\n.fa-eercast:before {\n  content: \"\\f2da\";\n}\n.fa-microchip:before {\n  content: \"\\f2db\";\n}\n.fa-snowflake-o:before {\n  content: \"\\f2dc\";\n}\n.fa-superpowers:before {\n  content: \"\\f2dd\";\n}\n.fa-wpexplorer:before {\n  content: \"\\f2de\";\n}\n.fa-meetup:before {\n  content: \"\\f2e0\";\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n.sr-only-focusable:active,\n.sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}\n", "",{"version":3,"sources":["webpack://./node_modules/font-awesome/css/font-awesome.css"],"names":[],"mappings":"AAAA;;;EAGE;AACF;+BAC+B;AAC/B;EACE,0BAA0B;EAC1B,4CAAoD;EACpD,4SAAiX;EACjX,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,qBAAqB;EACrB,6CAA6C;EAC7C,kBAAkB;EAClB,oBAAoB;EACpB,mCAAmC;EACnC,kCAAkC;AACpC;AACA,6DAA6D;AAC7D;EACE,uBAAuB;EACvB,mBAAmB;EACnB,oBAAoB;AACtB;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,eAAe;EACf,yBAAyB;EACzB,qBAAqB;AACvB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,mBAAmB;EACnB,iBAAiB;EACjB,kBAAkB;AACpB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,yBAAyB;EACzB,4BAA4B;EAC5B,mBAAmB;AACrB;AACA;EACE,WAAW;AACb;AACA;EACE,YAAY;AACd;AACA;EACE,kBAAkB;AACpB;AACA;EACE,iBAAiB;AACnB;AACA,2BAA2B;AAC3B;EACE,YAAY;AACd;AACA;EACE,WAAW;AACb;AACA;EACE,kBAAkB;AACpB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,6CAA6C;EAC7C,qCAAqC;AACvC;AACA;EACE,+CAA+C;EAC/C,uCAAuC;AACzC;AACA;EACE;IACE,+BAA+B;IAC/B,uBAAuB;EACzB;EACA;IACE,iCAAiC;IACjC,yBAAyB;EAC3B;AACF;AACA;EACE;IACE,+BAA+B;IAC/B,uBAAuB;EACzB;EACA;IACE,iCAAiC;IACjC,yBAAyB;EAC3B;AACF;AACA;EACE,sEAAsE;EACtE,gCAAgC;EAChC,4BAA4B;EAC5B,wBAAwB;AAC1B;AACA;EACE,sEAAsE;EACtE,iCAAiC;EACjC,6BAA6B;EAC7B,yBAAyB;AAC3B;AACA;EACE,sEAAsE;EACtE,iCAAiC;EACjC,6BAA6B;EAC7B,yBAAyB;AAC3B;AACA;EACE,gFAAgF;EAChF,+BAA+B;EAC/B,2BAA2B;EAC3B,uBAAuB;AACzB;AACA;EACE,gFAAgF;EAChF,+BAA+B;EAC/B,2BAA2B;EAC3B,uBAAuB;AACzB;AACA;;;;;EAKE,YAAY;AACd;AACA;EACE,kBAAkB;EAClB,qBAAqB;EACrB,UAAU;EACV,WAAW;EACX,gBAAgB;EAChB,sBAAsB;AACxB;AACA;;EAEE,kBAAkB;EAClB,OAAO;EACP,WAAW;EACX,kBAAkB;AACpB;AACA;EACE,oBAAoB;AACtB;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;mEACmE;AACnE;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;;EAGE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;;EAGE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;;EAGE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;;EAGE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;;;EAIE,gBAAgB;AAClB;AACA;;;EAGE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;;EAGE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;;EAGE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;;;;EAKE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;;EAGE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;;EAGE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;;EAGE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;;EAGE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;;EAGE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;;EAGE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;;EAGE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,kBAAkB;EAClB,UAAU;EACV,WAAW;EACX,UAAU;EACV,YAAY;EACZ,gBAAgB;EAChB,sBAAsB;EACtB,SAAS;AACX;AACA;;EAEE,gBAAgB;EAChB,WAAW;EACX,YAAY;EACZ,SAAS;EACT,iBAAiB;EACjB,UAAU;AACZ","sourcesContent":["/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */\n/* FONT PATH\n * -------------------------- */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url('../fonts/fontawesome-webfont.eot?v=4.7.0');\n  src: url('../fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('../fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('../fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'), url('../fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('../fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n.fa {\n  display: inline-block;\n  font: normal normal normal 14px/1 FontAwesome;\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n/* makes the font 33% larger relative to the icon container */\n.fa-lg {\n  font-size: 1.33333333em;\n  line-height: 0.75em;\n  vertical-align: -15%;\n}\n.fa-2x {\n  font-size: 2em;\n}\n.fa-3x {\n  font-size: 3em;\n}\n.fa-4x {\n  font-size: 4em;\n}\n.fa-5x {\n  font-size: 5em;\n}\n.fa-fw {\n  width: 1.28571429em;\n  text-align: center;\n}\n.fa-ul {\n  padding-left: 0;\n  margin-left: 2.14285714em;\n  list-style-type: none;\n}\n.fa-ul > li {\n  position: relative;\n}\n.fa-li {\n  position: absolute;\n  left: -2.14285714em;\n  width: 2.14285714em;\n  top: 0.14285714em;\n  text-align: center;\n}\n.fa-li.fa-lg {\n  left: -1.85714286em;\n}\n.fa-border {\n  padding: .2em .25em .15em;\n  border: solid 0.08em #eeeeee;\n  border-radius: .1em;\n}\n.fa-pull-left {\n  float: left;\n}\n.fa-pull-right {\n  float: right;\n}\n.fa.fa-pull-left {\n  margin-right: .3em;\n}\n.fa.fa-pull-right {\n  margin-left: .3em;\n}\n/* Deprecated as of 4.4.0 */\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n.fa.pull-left {\n  margin-right: .3em;\n}\n.fa.pull-right {\n  margin-left: .3em;\n}\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n  animation: fa-spin 1s infinite steps(8);\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  -webkit-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  -webkit-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  -webkit-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  transform: rotate(270deg);\n}\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  -webkit-transform: scale(-1, 1);\n  -ms-transform: scale(-1, 1);\n  transform: scale(-1, 1);\n}\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(1, -1);\n  -ms-transform: scale(1, -1);\n  transform: scale(1, -1);\n}\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  filter: none;\n}\n.fa-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle;\n}\n.fa-stack-1x,\n.fa-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n.fa-stack-1x {\n  line-height: inherit;\n}\n.fa-stack-2x {\n  font-size: 2em;\n}\n.fa-inverse {\n  color: #ffffff;\n}\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n   readers do not read off random characters that represent icons */\n.fa-glass:before {\n  content: \"\\f000\";\n}\n.fa-music:before {\n  content: \"\\f001\";\n}\n.fa-search:before {\n  content: \"\\f002\";\n}\n.fa-envelope-o:before {\n  content: \"\\f003\";\n}\n.fa-heart:before {\n  content: \"\\f004\";\n}\n.fa-star:before {\n  content: \"\\f005\";\n}\n.fa-star-o:before {\n  content: \"\\f006\";\n}\n.fa-user:before {\n  content: \"\\f007\";\n}\n.fa-film:before {\n  content: \"\\f008\";\n}\n.fa-th-large:before {\n  content: \"\\f009\";\n}\n.fa-th:before {\n  content: \"\\f00a\";\n}\n.fa-th-list:before {\n  content: \"\\f00b\";\n}\n.fa-check:before {\n  content: \"\\f00c\";\n}\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n  content: \"\\f00d\";\n}\n.fa-search-plus:before {\n  content: \"\\f00e\";\n}\n.fa-search-minus:before {\n  content: \"\\f010\";\n}\n.fa-power-off:before {\n  content: \"\\f011\";\n}\n.fa-signal:before {\n  content: \"\\f012\";\n}\n.fa-gear:before,\n.fa-cog:before {\n  content: \"\\f013\";\n}\n.fa-trash-o:before {\n  content: \"\\f014\";\n}\n.fa-home:before {\n  content: \"\\f015\";\n}\n.fa-file-o:before {\n  content: \"\\f016\";\n}\n.fa-clock-o:before {\n  content: \"\\f017\";\n}\n.fa-road:before {\n  content: \"\\f018\";\n}\n.fa-download:before {\n  content: \"\\f019\";\n}\n.fa-arrow-circle-o-down:before {\n  content: \"\\f01a\";\n}\n.fa-arrow-circle-o-up:before {\n  content: \"\\f01b\";\n}\n.fa-inbox:before {\n  content: \"\\f01c\";\n}\n.fa-play-circle-o:before {\n  content: \"\\f01d\";\n}\n.fa-rotate-right:before,\n.fa-repeat:before {\n  content: \"\\f01e\";\n}\n.fa-refresh:before {\n  content: \"\\f021\";\n}\n.fa-list-alt:before {\n  content: \"\\f022\";\n}\n.fa-lock:before {\n  content: \"\\f023\";\n}\n.fa-flag:before {\n  content: \"\\f024\";\n}\n.fa-headphones:before {\n  content: \"\\f025\";\n}\n.fa-volume-off:before {\n  content: \"\\f026\";\n}\n.fa-volume-down:before {\n  content: \"\\f027\";\n}\n.fa-volume-up:before {\n  content: \"\\f028\";\n}\n.fa-qrcode:before {\n  content: \"\\f029\";\n}\n.fa-barcode:before {\n  content: \"\\f02a\";\n}\n.fa-tag:before {\n  content: \"\\f02b\";\n}\n.fa-tags:before {\n  content: \"\\f02c\";\n}\n.fa-book:before {\n  content: \"\\f02d\";\n}\n.fa-bookmark:before {\n  content: \"\\f02e\";\n}\n.fa-print:before {\n  content: \"\\f02f\";\n}\n.fa-camera:before {\n  content: \"\\f030\";\n}\n.fa-font:before {\n  content: \"\\f031\";\n}\n.fa-bold:before {\n  content: \"\\f032\";\n}\n.fa-italic:before {\n  content: \"\\f033\";\n}\n.fa-text-height:before {\n  content: \"\\f034\";\n}\n.fa-text-width:before {\n  content: \"\\f035\";\n}\n.fa-align-left:before {\n  content: \"\\f036\";\n}\n.fa-align-center:before {\n  content: \"\\f037\";\n}\n.fa-align-right:before {\n  content: \"\\f038\";\n}\n.fa-align-justify:before {\n  content: \"\\f039\";\n}\n.fa-list:before {\n  content: \"\\f03a\";\n}\n.fa-dedent:before,\n.fa-outdent:before {\n  content: \"\\f03b\";\n}\n.fa-indent:before {\n  content: \"\\f03c\";\n}\n.fa-video-camera:before {\n  content: \"\\f03d\";\n}\n.fa-photo:before,\n.fa-image:before,\n.fa-picture-o:before {\n  content: \"\\f03e\";\n}\n.fa-pencil:before {\n  content: \"\\f040\";\n}\n.fa-map-marker:before {\n  content: \"\\f041\";\n}\n.fa-adjust:before {\n  content: \"\\f042\";\n}\n.fa-tint:before {\n  content: \"\\f043\";\n}\n.fa-edit:before,\n.fa-pencil-square-o:before {\n  content: \"\\f044\";\n}\n.fa-share-square-o:before {\n  content: \"\\f045\";\n}\n.fa-check-square-o:before {\n  content: \"\\f046\";\n}\n.fa-arrows:before {\n  content: \"\\f047\";\n}\n.fa-step-backward:before {\n  content: \"\\f048\";\n}\n.fa-fast-backward:before {\n  content: \"\\f049\";\n}\n.fa-backward:before {\n  content: \"\\f04a\";\n}\n.fa-play:before {\n  content: \"\\f04b\";\n}\n.fa-pause:before {\n  content: \"\\f04c\";\n}\n.fa-stop:before {\n  content: \"\\f04d\";\n}\n.fa-forward:before {\n  content: \"\\f04e\";\n}\n.fa-fast-forward:before {\n  content: \"\\f050\";\n}\n.fa-step-forward:before {\n  content: \"\\f051\";\n}\n.fa-eject:before {\n  content: \"\\f052\";\n}\n.fa-chevron-left:before {\n  content: \"\\f053\";\n}\n.fa-chevron-right:before {\n  content: \"\\f054\";\n}\n.fa-plus-circle:before {\n  content: \"\\f055\";\n}\n.fa-minus-circle:before {\n  content: \"\\f056\";\n}\n.fa-times-circle:before {\n  content: \"\\f057\";\n}\n.fa-check-circle:before {\n  content: \"\\f058\";\n}\n.fa-question-circle:before {\n  content: \"\\f059\";\n}\n.fa-info-circle:before {\n  content: \"\\f05a\";\n}\n.fa-crosshairs:before {\n  content: \"\\f05b\";\n}\n.fa-times-circle-o:before {\n  content: \"\\f05c\";\n}\n.fa-check-circle-o:before {\n  content: \"\\f05d\";\n}\n.fa-ban:before {\n  content: \"\\f05e\";\n}\n.fa-arrow-left:before {\n  content: \"\\f060\";\n}\n.fa-arrow-right:before {\n  content: \"\\f061\";\n}\n.fa-arrow-up:before {\n  content: \"\\f062\";\n}\n.fa-arrow-down:before {\n  content: \"\\f063\";\n}\n.fa-mail-forward:before,\n.fa-share:before {\n  content: \"\\f064\";\n}\n.fa-expand:before {\n  content: \"\\f065\";\n}\n.fa-compress:before {\n  content: \"\\f066\";\n}\n.fa-plus:before {\n  content: \"\\f067\";\n}\n.fa-minus:before {\n  content: \"\\f068\";\n}\n.fa-asterisk:before {\n  content: \"\\f069\";\n}\n.fa-exclamation-circle:before {\n  content: \"\\f06a\";\n}\n.fa-gift:before {\n  content: \"\\f06b\";\n}\n.fa-leaf:before {\n  content: \"\\f06c\";\n}\n.fa-fire:before {\n  content: \"\\f06d\";\n}\n.fa-eye:before {\n  content: \"\\f06e\";\n}\n.fa-eye-slash:before {\n  content: \"\\f070\";\n}\n.fa-warning:before,\n.fa-exclamation-triangle:before {\n  content: \"\\f071\";\n}\n.fa-plane:before {\n  content: \"\\f072\";\n}\n.fa-calendar:before {\n  content: \"\\f073\";\n}\n.fa-random:before {\n  content: \"\\f074\";\n}\n.fa-comment:before {\n  content: \"\\f075\";\n}\n.fa-magnet:before {\n  content: \"\\f076\";\n}\n.fa-chevron-up:before {\n  content: \"\\f077\";\n}\n.fa-chevron-down:before {\n  content: \"\\f078\";\n}\n.fa-retweet:before {\n  content: \"\\f079\";\n}\n.fa-shopping-cart:before {\n  content: \"\\f07a\";\n}\n.fa-folder:before {\n  content: \"\\f07b\";\n}\n.fa-folder-open:before {\n  content: \"\\f07c\";\n}\n.fa-arrows-v:before {\n  content: \"\\f07d\";\n}\n.fa-arrows-h:before {\n  content: \"\\f07e\";\n}\n.fa-bar-chart-o:before,\n.fa-bar-chart:before {\n  content: \"\\f080\";\n}\n.fa-twitter-square:before {\n  content: \"\\f081\";\n}\n.fa-facebook-square:before {\n  content: \"\\f082\";\n}\n.fa-camera-retro:before {\n  content: \"\\f083\";\n}\n.fa-key:before {\n  content: \"\\f084\";\n}\n.fa-gears:before,\n.fa-cogs:before {\n  content: \"\\f085\";\n}\n.fa-comments:before {\n  content: \"\\f086\";\n}\n.fa-thumbs-o-up:before {\n  content: \"\\f087\";\n}\n.fa-thumbs-o-down:before {\n  content: \"\\f088\";\n}\n.fa-star-half:before {\n  content: \"\\f089\";\n}\n.fa-heart-o:before {\n  content: \"\\f08a\";\n}\n.fa-sign-out:before {\n  content: \"\\f08b\";\n}\n.fa-linkedin-square:before {\n  content: \"\\f08c\";\n}\n.fa-thumb-tack:before {\n  content: \"\\f08d\";\n}\n.fa-external-link:before {\n  content: \"\\f08e\";\n}\n.fa-sign-in:before {\n  content: \"\\f090\";\n}\n.fa-trophy:before {\n  content: \"\\f091\";\n}\n.fa-github-square:before {\n  content: \"\\f092\";\n}\n.fa-upload:before {\n  content: \"\\f093\";\n}\n.fa-lemon-o:before {\n  content: \"\\f094\";\n}\n.fa-phone:before {\n  content: \"\\f095\";\n}\n.fa-square-o:before {\n  content: \"\\f096\";\n}\n.fa-bookmark-o:before {\n  content: \"\\f097\";\n}\n.fa-phone-square:before {\n  content: \"\\f098\";\n}\n.fa-twitter:before {\n  content: \"\\f099\";\n}\n.fa-facebook-f:before,\n.fa-facebook:before {\n  content: \"\\f09a\";\n}\n.fa-github:before {\n  content: \"\\f09b\";\n}\n.fa-unlock:before {\n  content: \"\\f09c\";\n}\n.fa-credit-card:before {\n  content: \"\\f09d\";\n}\n.fa-feed:before,\n.fa-rss:before {\n  content: \"\\f09e\";\n}\n.fa-hdd-o:before {\n  content: \"\\f0a0\";\n}\n.fa-bullhorn:before {\n  content: \"\\f0a1\";\n}\n.fa-bell:before {\n  content: \"\\f0f3\";\n}\n.fa-certificate:before {\n  content: \"\\f0a3\";\n}\n.fa-hand-o-right:before {\n  content: \"\\f0a4\";\n}\n.fa-hand-o-left:before {\n  content: \"\\f0a5\";\n}\n.fa-hand-o-up:before {\n  content: \"\\f0a6\";\n}\n.fa-hand-o-down:before {\n  content: \"\\f0a7\";\n}\n.fa-arrow-circle-left:before {\n  content: \"\\f0a8\";\n}\n.fa-arrow-circle-right:before {\n  content: \"\\f0a9\";\n}\n.fa-arrow-circle-up:before {\n  content: \"\\f0aa\";\n}\n.fa-arrow-circle-down:before {\n  content: \"\\f0ab\";\n}\n.fa-globe:before {\n  content: \"\\f0ac\";\n}\n.fa-wrench:before {\n  content: \"\\f0ad\";\n}\n.fa-tasks:before {\n  content: \"\\f0ae\";\n}\n.fa-filter:before {\n  content: \"\\f0b0\";\n}\n.fa-briefcase:before {\n  content: \"\\f0b1\";\n}\n.fa-arrows-alt:before {\n  content: \"\\f0b2\";\n}\n.fa-group:before,\n.fa-users:before {\n  content: \"\\f0c0\";\n}\n.fa-chain:before,\n.fa-link:before {\n  content: \"\\f0c1\";\n}\n.fa-cloud:before {\n  content: \"\\f0c2\";\n}\n.fa-flask:before {\n  content: \"\\f0c3\";\n}\n.fa-cut:before,\n.fa-scissors:before {\n  content: \"\\f0c4\";\n}\n.fa-copy:before,\n.fa-files-o:before {\n  content: \"\\f0c5\";\n}\n.fa-paperclip:before {\n  content: \"\\f0c6\";\n}\n.fa-save:before,\n.fa-floppy-o:before {\n  content: \"\\f0c7\";\n}\n.fa-square:before {\n  content: \"\\f0c8\";\n}\n.fa-navicon:before,\n.fa-reorder:before,\n.fa-bars:before {\n  content: \"\\f0c9\";\n}\n.fa-list-ul:before {\n  content: \"\\f0ca\";\n}\n.fa-list-ol:before {\n  content: \"\\f0cb\";\n}\n.fa-strikethrough:before {\n  content: \"\\f0cc\";\n}\n.fa-underline:before {\n  content: \"\\f0cd\";\n}\n.fa-table:before {\n  content: \"\\f0ce\";\n}\n.fa-magic:before {\n  content: \"\\f0d0\";\n}\n.fa-truck:before {\n  content: \"\\f0d1\";\n}\n.fa-pinterest:before {\n  content: \"\\f0d2\";\n}\n.fa-pinterest-square:before {\n  content: \"\\f0d3\";\n}\n.fa-google-plus-square:before {\n  content: \"\\f0d4\";\n}\n.fa-google-plus:before {\n  content: \"\\f0d5\";\n}\n.fa-money:before {\n  content: \"\\f0d6\";\n}\n.fa-caret-down:before {\n  content: \"\\f0d7\";\n}\n.fa-caret-up:before {\n  content: \"\\f0d8\";\n}\n.fa-caret-left:before {\n  content: \"\\f0d9\";\n}\n.fa-caret-right:before {\n  content: \"\\f0da\";\n}\n.fa-columns:before {\n  content: \"\\f0db\";\n}\n.fa-unsorted:before,\n.fa-sort:before {\n  content: \"\\f0dc\";\n}\n.fa-sort-down:before,\n.fa-sort-desc:before {\n  content: \"\\f0dd\";\n}\n.fa-sort-up:before,\n.fa-sort-asc:before {\n  content: \"\\f0de\";\n}\n.fa-envelope:before {\n  content: \"\\f0e0\";\n}\n.fa-linkedin:before {\n  content: \"\\f0e1\";\n}\n.fa-rotate-left:before,\n.fa-undo:before {\n  content: \"\\f0e2\";\n}\n.fa-legal:before,\n.fa-gavel:before {\n  content: \"\\f0e3\";\n}\n.fa-dashboard:before,\n.fa-tachometer:before {\n  content: \"\\f0e4\";\n}\n.fa-comment-o:before {\n  content: \"\\f0e5\";\n}\n.fa-comments-o:before {\n  content: \"\\f0e6\";\n}\n.fa-flash:before,\n.fa-bolt:before {\n  content: \"\\f0e7\";\n}\n.fa-sitemap:before {\n  content: \"\\f0e8\";\n}\n.fa-umbrella:before {\n  content: \"\\f0e9\";\n}\n.fa-paste:before,\n.fa-clipboard:before {\n  content: \"\\f0ea\";\n}\n.fa-lightbulb-o:before {\n  content: \"\\f0eb\";\n}\n.fa-exchange:before {\n  content: \"\\f0ec\";\n}\n.fa-cloud-download:before {\n  content: \"\\f0ed\";\n}\n.fa-cloud-upload:before {\n  content: \"\\f0ee\";\n}\n.fa-user-md:before {\n  content: \"\\f0f0\";\n}\n.fa-stethoscope:before {\n  content: \"\\f0f1\";\n}\n.fa-suitcase:before {\n  content: \"\\f0f2\";\n}\n.fa-bell-o:before {\n  content: \"\\f0a2\";\n}\n.fa-coffee:before {\n  content: \"\\f0f4\";\n}\n.fa-cutlery:before {\n  content: \"\\f0f5\";\n}\n.fa-file-text-o:before {\n  content: \"\\f0f6\";\n}\n.fa-building-o:before {\n  content: \"\\f0f7\";\n}\n.fa-hospital-o:before {\n  content: \"\\f0f8\";\n}\n.fa-ambulance:before {\n  content: \"\\f0f9\";\n}\n.fa-medkit:before {\n  content: \"\\f0fa\";\n}\n.fa-fighter-jet:before {\n  content: \"\\f0fb\";\n}\n.fa-beer:before {\n  content: \"\\f0fc\";\n}\n.fa-h-square:before {\n  content: \"\\f0fd\";\n}\n.fa-plus-square:before {\n  content: \"\\f0fe\";\n}\n.fa-angle-double-left:before {\n  content: \"\\f100\";\n}\n.fa-angle-double-right:before {\n  content: \"\\f101\";\n}\n.fa-angle-double-up:before {\n  content: \"\\f102\";\n}\n.fa-angle-double-down:before {\n  content: \"\\f103\";\n}\n.fa-angle-left:before {\n  content: \"\\f104\";\n}\n.fa-angle-right:before {\n  content: \"\\f105\";\n}\n.fa-angle-up:before {\n  content: \"\\f106\";\n}\n.fa-angle-down:before {\n  content: \"\\f107\";\n}\n.fa-desktop:before {\n  content: \"\\f108\";\n}\n.fa-laptop:before {\n  content: \"\\f109\";\n}\n.fa-tablet:before {\n  content: \"\\f10a\";\n}\n.fa-mobile-phone:before,\n.fa-mobile:before {\n  content: \"\\f10b\";\n}\n.fa-circle-o:before {\n  content: \"\\f10c\";\n}\n.fa-quote-left:before {\n  content: \"\\f10d\";\n}\n.fa-quote-right:before {\n  content: \"\\f10e\";\n}\n.fa-spinner:before {\n  content: \"\\f110\";\n}\n.fa-circle:before {\n  content: \"\\f111\";\n}\n.fa-mail-reply:before,\n.fa-reply:before {\n  content: \"\\f112\";\n}\n.fa-github-alt:before {\n  content: \"\\f113\";\n}\n.fa-folder-o:before {\n  content: \"\\f114\";\n}\n.fa-folder-open-o:before {\n  content: \"\\f115\";\n}\n.fa-smile-o:before {\n  content: \"\\f118\";\n}\n.fa-frown-o:before {\n  content: \"\\f119\";\n}\n.fa-meh-o:before {\n  content: \"\\f11a\";\n}\n.fa-gamepad:before {\n  content: \"\\f11b\";\n}\n.fa-keyboard-o:before {\n  content: \"\\f11c\";\n}\n.fa-flag-o:before {\n  content: \"\\f11d\";\n}\n.fa-flag-checkered:before {\n  content: \"\\f11e\";\n}\n.fa-terminal:before {\n  content: \"\\f120\";\n}\n.fa-code:before {\n  content: \"\\f121\";\n}\n.fa-mail-reply-all:before,\n.fa-reply-all:before {\n  content: \"\\f122\";\n}\n.fa-star-half-empty:before,\n.fa-star-half-full:before,\n.fa-star-half-o:before {\n  content: \"\\f123\";\n}\n.fa-location-arrow:before {\n  content: \"\\f124\";\n}\n.fa-crop:before {\n  content: \"\\f125\";\n}\n.fa-code-fork:before {\n  content: \"\\f126\";\n}\n.fa-unlink:before,\n.fa-chain-broken:before {\n  content: \"\\f127\";\n}\n.fa-question:before {\n  content: \"\\f128\";\n}\n.fa-info:before {\n  content: \"\\f129\";\n}\n.fa-exclamation:before {\n  content: \"\\f12a\";\n}\n.fa-superscript:before {\n  content: \"\\f12b\";\n}\n.fa-subscript:before {\n  content: \"\\f12c\";\n}\n.fa-eraser:before {\n  content: \"\\f12d\";\n}\n.fa-puzzle-piece:before {\n  content: \"\\f12e\";\n}\n.fa-microphone:before {\n  content: \"\\f130\";\n}\n.fa-microphone-slash:before {\n  content: \"\\f131\";\n}\n.fa-shield:before {\n  content: \"\\f132\";\n}\n.fa-calendar-o:before {\n  content: \"\\f133\";\n}\n.fa-fire-extinguisher:before {\n  content: \"\\f134\";\n}\n.fa-rocket:before {\n  content: \"\\f135\";\n}\n.fa-maxcdn:before {\n  content: \"\\f136\";\n}\n.fa-chevron-circle-left:before {\n  content: \"\\f137\";\n}\n.fa-chevron-circle-right:before {\n  content: \"\\f138\";\n}\n.fa-chevron-circle-up:before {\n  content: \"\\f139\";\n}\n.fa-chevron-circle-down:before {\n  content: \"\\f13a\";\n}\n.fa-html5:before {\n  content: \"\\f13b\";\n}\n.fa-css3:before {\n  content: \"\\f13c\";\n}\n.fa-anchor:before {\n  content: \"\\f13d\";\n}\n.fa-unlock-alt:before {\n  content: \"\\f13e\";\n}\n.fa-bullseye:before {\n  content: \"\\f140\";\n}\n.fa-ellipsis-h:before {\n  content: \"\\f141\";\n}\n.fa-ellipsis-v:before {\n  content: \"\\f142\";\n}\n.fa-rss-square:before {\n  content: \"\\f143\";\n}\n.fa-play-circle:before {\n  content: \"\\f144\";\n}\n.fa-ticket:before {\n  content: \"\\f145\";\n}\n.fa-minus-square:before {\n  content: \"\\f146\";\n}\n.fa-minus-square-o:before {\n  content: \"\\f147\";\n}\n.fa-level-up:before {\n  content: \"\\f148\";\n}\n.fa-level-down:before {\n  content: \"\\f149\";\n}\n.fa-check-square:before {\n  content: \"\\f14a\";\n}\n.fa-pencil-square:before {\n  content: \"\\f14b\";\n}\n.fa-external-link-square:before {\n  content: \"\\f14c\";\n}\n.fa-share-square:before {\n  content: \"\\f14d\";\n}\n.fa-compass:before {\n  content: \"\\f14e\";\n}\n.fa-toggle-down:before,\n.fa-caret-square-o-down:before {\n  content: \"\\f150\";\n}\n.fa-toggle-up:before,\n.fa-caret-square-o-up:before {\n  content: \"\\f151\";\n}\n.fa-toggle-right:before,\n.fa-caret-square-o-right:before {\n  content: \"\\f152\";\n}\n.fa-euro:before,\n.fa-eur:before {\n  content: \"\\f153\";\n}\n.fa-gbp:before {\n  content: \"\\f154\";\n}\n.fa-dollar:before,\n.fa-usd:before {\n  content: \"\\f155\";\n}\n.fa-rupee:before,\n.fa-inr:before {\n  content: \"\\f156\";\n}\n.fa-cny:before,\n.fa-rmb:before,\n.fa-yen:before,\n.fa-jpy:before {\n  content: \"\\f157\";\n}\n.fa-ruble:before,\n.fa-rouble:before,\n.fa-rub:before {\n  content: \"\\f158\";\n}\n.fa-won:before,\n.fa-krw:before {\n  content: \"\\f159\";\n}\n.fa-bitcoin:before,\n.fa-btc:before {\n  content: \"\\f15a\";\n}\n.fa-file:before {\n  content: \"\\f15b\";\n}\n.fa-file-text:before {\n  content: \"\\f15c\";\n}\n.fa-sort-alpha-asc:before {\n  content: \"\\f15d\";\n}\n.fa-sort-alpha-desc:before {\n  content: \"\\f15e\";\n}\n.fa-sort-amount-asc:before {\n  content: \"\\f160\";\n}\n.fa-sort-amount-desc:before {\n  content: \"\\f161\";\n}\n.fa-sort-numeric-asc:before {\n  content: \"\\f162\";\n}\n.fa-sort-numeric-desc:before {\n  content: \"\\f163\";\n}\n.fa-thumbs-up:before {\n  content: \"\\f164\";\n}\n.fa-thumbs-down:before {\n  content: \"\\f165\";\n}\n.fa-youtube-square:before {\n  content: \"\\f166\";\n}\n.fa-youtube:before {\n  content: \"\\f167\";\n}\n.fa-xing:before {\n  content: \"\\f168\";\n}\n.fa-xing-square:before {\n  content: \"\\f169\";\n}\n.fa-youtube-play:before {\n  content: \"\\f16a\";\n}\n.fa-dropbox:before {\n  content: \"\\f16b\";\n}\n.fa-stack-overflow:before {\n  content: \"\\f16c\";\n}\n.fa-instagram:before {\n  content: \"\\f16d\";\n}\n.fa-flickr:before {\n  content: \"\\f16e\";\n}\n.fa-adn:before {\n  content: \"\\f170\";\n}\n.fa-bitbucket:before {\n  content: \"\\f171\";\n}\n.fa-bitbucket-square:before {\n  content: \"\\f172\";\n}\n.fa-tumblr:before {\n  content: \"\\f173\";\n}\n.fa-tumblr-square:before {\n  content: \"\\f174\";\n}\n.fa-long-arrow-down:before {\n  content: \"\\f175\";\n}\n.fa-long-arrow-up:before {\n  content: \"\\f176\";\n}\n.fa-long-arrow-left:before {\n  content: \"\\f177\";\n}\n.fa-long-arrow-right:before {\n  content: \"\\f178\";\n}\n.fa-apple:before {\n  content: \"\\f179\";\n}\n.fa-windows:before {\n  content: \"\\f17a\";\n}\n.fa-android:before {\n  content: \"\\f17b\";\n}\n.fa-linux:before {\n  content: \"\\f17c\";\n}\n.fa-dribbble:before {\n  content: \"\\f17d\";\n}\n.fa-skype:before {\n  content: \"\\f17e\";\n}\n.fa-foursquare:before {\n  content: \"\\f180\";\n}\n.fa-trello:before {\n  content: \"\\f181\";\n}\n.fa-female:before {\n  content: \"\\f182\";\n}\n.fa-male:before {\n  content: \"\\f183\";\n}\n.fa-gittip:before,\n.fa-gratipay:before {\n  content: \"\\f184\";\n}\n.fa-sun-o:before {\n  content: \"\\f185\";\n}\n.fa-moon-o:before {\n  content: \"\\f186\";\n}\n.fa-archive:before {\n  content: \"\\f187\";\n}\n.fa-bug:before {\n  content: \"\\f188\";\n}\n.fa-vk:before {\n  content: \"\\f189\";\n}\n.fa-weibo:before {\n  content: \"\\f18a\";\n}\n.fa-renren:before {\n  content: \"\\f18b\";\n}\n.fa-pagelines:before {\n  content: \"\\f18c\";\n}\n.fa-stack-exchange:before {\n  content: \"\\f18d\";\n}\n.fa-arrow-circle-o-right:before {\n  content: \"\\f18e\";\n}\n.fa-arrow-circle-o-left:before {\n  content: \"\\f190\";\n}\n.fa-toggle-left:before,\n.fa-caret-square-o-left:before {\n  content: \"\\f191\";\n}\n.fa-dot-circle-o:before {\n  content: \"\\f192\";\n}\n.fa-wheelchair:before {\n  content: \"\\f193\";\n}\n.fa-vimeo-square:before {\n  content: \"\\f194\";\n}\n.fa-turkish-lira:before,\n.fa-try:before {\n  content: \"\\f195\";\n}\n.fa-plus-square-o:before {\n  content: \"\\f196\";\n}\n.fa-space-shuttle:before {\n  content: \"\\f197\";\n}\n.fa-slack:before {\n  content: \"\\f198\";\n}\n.fa-envelope-square:before {\n  content: \"\\f199\";\n}\n.fa-wordpress:before {\n  content: \"\\f19a\";\n}\n.fa-openid:before {\n  content: \"\\f19b\";\n}\n.fa-institution:before,\n.fa-bank:before,\n.fa-university:before {\n  content: \"\\f19c\";\n}\n.fa-mortar-board:before,\n.fa-graduation-cap:before {\n  content: \"\\f19d\";\n}\n.fa-yahoo:before {\n  content: \"\\f19e\";\n}\n.fa-google:before {\n  content: \"\\f1a0\";\n}\n.fa-reddit:before {\n  content: \"\\f1a1\";\n}\n.fa-reddit-square:before {\n  content: \"\\f1a2\";\n}\n.fa-stumbleupon-circle:before {\n  content: \"\\f1a3\";\n}\n.fa-stumbleupon:before {\n  content: \"\\f1a4\";\n}\n.fa-delicious:before {\n  content: \"\\f1a5\";\n}\n.fa-digg:before {\n  content: \"\\f1a6\";\n}\n.fa-pied-piper-pp:before {\n  content: \"\\f1a7\";\n}\n.fa-pied-piper-alt:before {\n  content: \"\\f1a8\";\n}\n.fa-drupal:before {\n  content: \"\\f1a9\";\n}\n.fa-joomla:before {\n  content: \"\\f1aa\";\n}\n.fa-language:before {\n  content: \"\\f1ab\";\n}\n.fa-fax:before {\n  content: \"\\f1ac\";\n}\n.fa-building:before {\n  content: \"\\f1ad\";\n}\n.fa-child:before {\n  content: \"\\f1ae\";\n}\n.fa-paw:before {\n  content: \"\\f1b0\";\n}\n.fa-spoon:before {\n  content: \"\\f1b1\";\n}\n.fa-cube:before {\n  content: \"\\f1b2\";\n}\n.fa-cubes:before {\n  content: \"\\f1b3\";\n}\n.fa-behance:before {\n  content: \"\\f1b4\";\n}\n.fa-behance-square:before {\n  content: \"\\f1b5\";\n}\n.fa-steam:before {\n  content: \"\\f1b6\";\n}\n.fa-steam-square:before {\n  content: \"\\f1b7\";\n}\n.fa-recycle:before {\n  content: \"\\f1b8\";\n}\n.fa-automobile:before,\n.fa-car:before {\n  content: \"\\f1b9\";\n}\n.fa-cab:before,\n.fa-taxi:before {\n  content: \"\\f1ba\";\n}\n.fa-tree:before {\n  content: \"\\f1bb\";\n}\n.fa-spotify:before {\n  content: \"\\f1bc\";\n}\n.fa-deviantart:before {\n  content: \"\\f1bd\";\n}\n.fa-soundcloud:before {\n  content: \"\\f1be\";\n}\n.fa-database:before {\n  content: \"\\f1c0\";\n}\n.fa-file-pdf-o:before {\n  content: \"\\f1c1\";\n}\n.fa-file-word-o:before {\n  content: \"\\f1c2\";\n}\n.fa-file-excel-o:before {\n  content: \"\\f1c3\";\n}\n.fa-file-powerpoint-o:before {\n  content: \"\\f1c4\";\n}\n.fa-file-photo-o:before,\n.fa-file-picture-o:before,\n.fa-file-image-o:before {\n  content: \"\\f1c5\";\n}\n.fa-file-zip-o:before,\n.fa-file-archive-o:before {\n  content: \"\\f1c6\";\n}\n.fa-file-sound-o:before,\n.fa-file-audio-o:before {\n  content: \"\\f1c7\";\n}\n.fa-file-movie-o:before,\n.fa-file-video-o:before {\n  content: \"\\f1c8\";\n}\n.fa-file-code-o:before {\n  content: \"\\f1c9\";\n}\n.fa-vine:before {\n  content: \"\\f1ca\";\n}\n.fa-codepen:before {\n  content: \"\\f1cb\";\n}\n.fa-jsfiddle:before {\n  content: \"\\f1cc\";\n}\n.fa-life-bouy:before,\n.fa-life-buoy:before,\n.fa-life-saver:before,\n.fa-support:before,\n.fa-life-ring:before {\n  content: \"\\f1cd\";\n}\n.fa-circle-o-notch:before {\n  content: \"\\f1ce\";\n}\n.fa-ra:before,\n.fa-resistance:before,\n.fa-rebel:before {\n  content: \"\\f1d0\";\n}\n.fa-ge:before,\n.fa-empire:before {\n  content: \"\\f1d1\";\n}\n.fa-git-square:before {\n  content: \"\\f1d2\";\n}\n.fa-git:before {\n  content: \"\\f1d3\";\n}\n.fa-y-combinator-square:before,\n.fa-yc-square:before,\n.fa-hacker-news:before {\n  content: \"\\f1d4\";\n}\n.fa-tencent-weibo:before {\n  content: \"\\f1d5\";\n}\n.fa-qq:before {\n  content: \"\\f1d6\";\n}\n.fa-wechat:before,\n.fa-weixin:before {\n  content: \"\\f1d7\";\n}\n.fa-send:before,\n.fa-paper-plane:before {\n  content: \"\\f1d8\";\n}\n.fa-send-o:before,\n.fa-paper-plane-o:before {\n  content: \"\\f1d9\";\n}\n.fa-history:before {\n  content: \"\\f1da\";\n}\n.fa-circle-thin:before {\n  content: \"\\f1db\";\n}\n.fa-header:before {\n  content: \"\\f1dc\";\n}\n.fa-paragraph:before {\n  content: \"\\f1dd\";\n}\n.fa-sliders:before {\n  content: \"\\f1de\";\n}\n.fa-share-alt:before {\n  content: \"\\f1e0\";\n}\n.fa-share-alt-square:before {\n  content: \"\\f1e1\";\n}\n.fa-bomb:before {\n  content: \"\\f1e2\";\n}\n.fa-soccer-ball-o:before,\n.fa-futbol-o:before {\n  content: \"\\f1e3\";\n}\n.fa-tty:before {\n  content: \"\\f1e4\";\n}\n.fa-binoculars:before {\n  content: \"\\f1e5\";\n}\n.fa-plug:before {\n  content: \"\\f1e6\";\n}\n.fa-slideshare:before {\n  content: \"\\f1e7\";\n}\n.fa-twitch:before {\n  content: \"\\f1e8\";\n}\n.fa-yelp:before {\n  content: \"\\f1e9\";\n}\n.fa-newspaper-o:before {\n  content: \"\\f1ea\";\n}\n.fa-wifi:before {\n  content: \"\\f1eb\";\n}\n.fa-calculator:before {\n  content: \"\\f1ec\";\n}\n.fa-paypal:before {\n  content: \"\\f1ed\";\n}\n.fa-google-wallet:before {\n  content: \"\\f1ee\";\n}\n.fa-cc-visa:before {\n  content: \"\\f1f0\";\n}\n.fa-cc-mastercard:before {\n  content: \"\\f1f1\";\n}\n.fa-cc-discover:before {\n  content: \"\\f1f2\";\n}\n.fa-cc-amex:before {\n  content: \"\\f1f3\";\n}\n.fa-cc-paypal:before {\n  content: \"\\f1f4\";\n}\n.fa-cc-stripe:before {\n  content: \"\\f1f5\";\n}\n.fa-bell-slash:before {\n  content: \"\\f1f6\";\n}\n.fa-bell-slash-o:before {\n  content: \"\\f1f7\";\n}\n.fa-trash:before {\n  content: \"\\f1f8\";\n}\n.fa-copyright:before {\n  content: \"\\f1f9\";\n}\n.fa-at:before {\n  content: \"\\f1fa\";\n}\n.fa-eyedropper:before {\n  content: \"\\f1fb\";\n}\n.fa-paint-brush:before {\n  content: \"\\f1fc\";\n}\n.fa-birthday-cake:before {\n  content: \"\\f1fd\";\n}\n.fa-area-chart:before {\n  content: \"\\f1fe\";\n}\n.fa-pie-chart:before {\n  content: \"\\f200\";\n}\n.fa-line-chart:before {\n  content: \"\\f201\";\n}\n.fa-lastfm:before {\n  content: \"\\f202\";\n}\n.fa-lastfm-square:before {\n  content: \"\\f203\";\n}\n.fa-toggle-off:before {\n  content: \"\\f204\";\n}\n.fa-toggle-on:before {\n  content: \"\\f205\";\n}\n.fa-bicycle:before {\n  content: \"\\f206\";\n}\n.fa-bus:before {\n  content: \"\\f207\";\n}\n.fa-ioxhost:before {\n  content: \"\\f208\";\n}\n.fa-angellist:before {\n  content: \"\\f209\";\n}\n.fa-cc:before {\n  content: \"\\f20a\";\n}\n.fa-shekel:before,\n.fa-sheqel:before,\n.fa-ils:before {\n  content: \"\\f20b\";\n}\n.fa-meanpath:before {\n  content: \"\\f20c\";\n}\n.fa-buysellads:before {\n  content: \"\\f20d\";\n}\n.fa-connectdevelop:before {\n  content: \"\\f20e\";\n}\n.fa-dashcube:before {\n  content: \"\\f210\";\n}\n.fa-forumbee:before {\n  content: \"\\f211\";\n}\n.fa-leanpub:before {\n  content: \"\\f212\";\n}\n.fa-sellsy:before {\n  content: \"\\f213\";\n}\n.fa-shirtsinbulk:before {\n  content: \"\\f214\";\n}\n.fa-simplybuilt:before {\n  content: \"\\f215\";\n}\n.fa-skyatlas:before {\n  content: \"\\f216\";\n}\n.fa-cart-plus:before {\n  content: \"\\f217\";\n}\n.fa-cart-arrow-down:before {\n  content: \"\\f218\";\n}\n.fa-diamond:before {\n  content: \"\\f219\";\n}\n.fa-ship:before {\n  content: \"\\f21a\";\n}\n.fa-user-secret:before {\n  content: \"\\f21b\";\n}\n.fa-motorcycle:before {\n  content: \"\\f21c\";\n}\n.fa-street-view:before {\n  content: \"\\f21d\";\n}\n.fa-heartbeat:before {\n  content: \"\\f21e\";\n}\n.fa-venus:before {\n  content: \"\\f221\";\n}\n.fa-mars:before {\n  content: \"\\f222\";\n}\n.fa-mercury:before {\n  content: \"\\f223\";\n}\n.fa-intersex:before,\n.fa-transgender:before {\n  content: \"\\f224\";\n}\n.fa-transgender-alt:before {\n  content: \"\\f225\";\n}\n.fa-venus-double:before {\n  content: \"\\f226\";\n}\n.fa-mars-double:before {\n  content: \"\\f227\";\n}\n.fa-venus-mars:before {\n  content: \"\\f228\";\n}\n.fa-mars-stroke:before {\n  content: \"\\f229\";\n}\n.fa-mars-stroke-v:before {\n  content: \"\\f22a\";\n}\n.fa-mars-stroke-h:before {\n  content: \"\\f22b\";\n}\n.fa-neuter:before {\n  content: \"\\f22c\";\n}\n.fa-genderless:before {\n  content: \"\\f22d\";\n}\n.fa-facebook-official:before {\n  content: \"\\f230\";\n}\n.fa-pinterest-p:before {\n  content: \"\\f231\";\n}\n.fa-whatsapp:before {\n  content: \"\\f232\";\n}\n.fa-server:before {\n  content: \"\\f233\";\n}\n.fa-user-plus:before {\n  content: \"\\f234\";\n}\n.fa-user-times:before {\n  content: \"\\f235\";\n}\n.fa-hotel:before,\n.fa-bed:before {\n  content: \"\\f236\";\n}\n.fa-viacoin:before {\n  content: \"\\f237\";\n}\n.fa-train:before {\n  content: \"\\f238\";\n}\n.fa-subway:before {\n  content: \"\\f239\";\n}\n.fa-medium:before {\n  content: \"\\f23a\";\n}\n.fa-yc:before,\n.fa-y-combinator:before {\n  content: \"\\f23b\";\n}\n.fa-optin-monster:before {\n  content: \"\\f23c\";\n}\n.fa-opencart:before {\n  content: \"\\f23d\";\n}\n.fa-expeditedssl:before {\n  content: \"\\f23e\";\n}\n.fa-battery-4:before,\n.fa-battery:before,\n.fa-battery-full:before {\n  content: \"\\f240\";\n}\n.fa-battery-3:before,\n.fa-battery-three-quarters:before {\n  content: \"\\f241\";\n}\n.fa-battery-2:before,\n.fa-battery-half:before {\n  content: \"\\f242\";\n}\n.fa-battery-1:before,\n.fa-battery-quarter:before {\n  content: \"\\f243\";\n}\n.fa-battery-0:before,\n.fa-battery-empty:before {\n  content: \"\\f244\";\n}\n.fa-mouse-pointer:before {\n  content: \"\\f245\";\n}\n.fa-i-cursor:before {\n  content: \"\\f246\";\n}\n.fa-object-group:before {\n  content: \"\\f247\";\n}\n.fa-object-ungroup:before {\n  content: \"\\f248\";\n}\n.fa-sticky-note:before {\n  content: \"\\f249\";\n}\n.fa-sticky-note-o:before {\n  content: \"\\f24a\";\n}\n.fa-cc-jcb:before {\n  content: \"\\f24b\";\n}\n.fa-cc-diners-club:before {\n  content: \"\\f24c\";\n}\n.fa-clone:before {\n  content: \"\\f24d\";\n}\n.fa-balance-scale:before {\n  content: \"\\f24e\";\n}\n.fa-hourglass-o:before {\n  content: \"\\f250\";\n}\n.fa-hourglass-1:before,\n.fa-hourglass-start:before {\n  content: \"\\f251\";\n}\n.fa-hourglass-2:before,\n.fa-hourglass-half:before {\n  content: \"\\f252\";\n}\n.fa-hourglass-3:before,\n.fa-hourglass-end:before {\n  content: \"\\f253\";\n}\n.fa-hourglass:before {\n  content: \"\\f254\";\n}\n.fa-hand-grab-o:before,\n.fa-hand-rock-o:before {\n  content: \"\\f255\";\n}\n.fa-hand-stop-o:before,\n.fa-hand-paper-o:before {\n  content: \"\\f256\";\n}\n.fa-hand-scissors-o:before {\n  content: \"\\f257\";\n}\n.fa-hand-lizard-o:before {\n  content: \"\\f258\";\n}\n.fa-hand-spock-o:before {\n  content: \"\\f259\";\n}\n.fa-hand-pointer-o:before {\n  content: \"\\f25a\";\n}\n.fa-hand-peace-o:before {\n  content: \"\\f25b\";\n}\n.fa-trademark:before {\n  content: \"\\f25c\";\n}\n.fa-registered:before {\n  content: \"\\f25d\";\n}\n.fa-creative-commons:before {\n  content: \"\\f25e\";\n}\n.fa-gg:before {\n  content: \"\\f260\";\n}\n.fa-gg-circle:before {\n  content: \"\\f261\";\n}\n.fa-tripadvisor:before {\n  content: \"\\f262\";\n}\n.fa-odnoklassniki:before {\n  content: \"\\f263\";\n}\n.fa-odnoklassniki-square:before {\n  content: \"\\f264\";\n}\n.fa-get-pocket:before {\n  content: \"\\f265\";\n}\n.fa-wikipedia-w:before {\n  content: \"\\f266\";\n}\n.fa-safari:before {\n  content: \"\\f267\";\n}\n.fa-chrome:before {\n  content: \"\\f268\";\n}\n.fa-firefox:before {\n  content: \"\\f269\";\n}\n.fa-opera:before {\n  content: \"\\f26a\";\n}\n.fa-internet-explorer:before {\n  content: \"\\f26b\";\n}\n.fa-tv:before,\n.fa-television:before {\n  content: \"\\f26c\";\n}\n.fa-contao:before {\n  content: \"\\f26d\";\n}\n.fa-500px:before {\n  content: \"\\f26e\";\n}\n.fa-amazon:before {\n  content: \"\\f270\";\n}\n.fa-calendar-plus-o:before {\n  content: \"\\f271\";\n}\n.fa-calendar-minus-o:before {\n  content: \"\\f272\";\n}\n.fa-calendar-times-o:before {\n  content: \"\\f273\";\n}\n.fa-calendar-check-o:before {\n  content: \"\\f274\";\n}\n.fa-industry:before {\n  content: \"\\f275\";\n}\n.fa-map-pin:before {\n  content: \"\\f276\";\n}\n.fa-map-signs:before {\n  content: \"\\f277\";\n}\n.fa-map-o:before {\n  content: \"\\f278\";\n}\n.fa-map:before {\n  content: \"\\f279\";\n}\n.fa-commenting:before {\n  content: \"\\f27a\";\n}\n.fa-commenting-o:before {\n  content: \"\\f27b\";\n}\n.fa-houzz:before {\n  content: \"\\f27c\";\n}\n.fa-vimeo:before {\n  content: \"\\f27d\";\n}\n.fa-black-tie:before {\n  content: \"\\f27e\";\n}\n.fa-fonticons:before {\n  content: \"\\f280\";\n}\n.fa-reddit-alien:before {\n  content: \"\\f281\";\n}\n.fa-edge:before {\n  content: \"\\f282\";\n}\n.fa-credit-card-alt:before {\n  content: \"\\f283\";\n}\n.fa-codiepie:before {\n  content: \"\\f284\";\n}\n.fa-modx:before {\n  content: \"\\f285\";\n}\n.fa-fort-awesome:before {\n  content: \"\\f286\";\n}\n.fa-usb:before {\n  content: \"\\f287\";\n}\n.fa-product-hunt:before {\n  content: \"\\f288\";\n}\n.fa-mixcloud:before {\n  content: \"\\f289\";\n}\n.fa-scribd:before {\n  content: \"\\f28a\";\n}\n.fa-pause-circle:before {\n  content: \"\\f28b\";\n}\n.fa-pause-circle-o:before {\n  content: \"\\f28c\";\n}\n.fa-stop-circle:before {\n  content: \"\\f28d\";\n}\n.fa-stop-circle-o:before {\n  content: \"\\f28e\";\n}\n.fa-shopping-bag:before {\n  content: \"\\f290\";\n}\n.fa-shopping-basket:before {\n  content: \"\\f291\";\n}\n.fa-hashtag:before {\n  content: \"\\f292\";\n}\n.fa-bluetooth:before {\n  content: \"\\f293\";\n}\n.fa-bluetooth-b:before {\n  content: \"\\f294\";\n}\n.fa-percent:before {\n  content: \"\\f295\";\n}\n.fa-gitlab:before {\n  content: \"\\f296\";\n}\n.fa-wpbeginner:before {\n  content: \"\\f297\";\n}\n.fa-wpforms:before {\n  content: \"\\f298\";\n}\n.fa-envira:before {\n  content: \"\\f299\";\n}\n.fa-universal-access:before {\n  content: \"\\f29a\";\n}\n.fa-wheelchair-alt:before {\n  content: \"\\f29b\";\n}\n.fa-question-circle-o:before {\n  content: \"\\f29c\";\n}\n.fa-blind:before {\n  content: \"\\f29d\";\n}\n.fa-audio-description:before {\n  content: \"\\f29e\";\n}\n.fa-volume-control-phone:before {\n  content: \"\\f2a0\";\n}\n.fa-braille:before {\n  content: \"\\f2a1\";\n}\n.fa-assistive-listening-systems:before {\n  content: \"\\f2a2\";\n}\n.fa-asl-interpreting:before,\n.fa-american-sign-language-interpreting:before {\n  content: \"\\f2a3\";\n}\n.fa-deafness:before,\n.fa-hard-of-hearing:before,\n.fa-deaf:before {\n  content: \"\\f2a4\";\n}\n.fa-glide:before {\n  content: \"\\f2a5\";\n}\n.fa-glide-g:before {\n  content: \"\\f2a6\";\n}\n.fa-signing:before,\n.fa-sign-language:before {\n  content: \"\\f2a7\";\n}\n.fa-low-vision:before {\n  content: \"\\f2a8\";\n}\n.fa-viadeo:before {\n  content: \"\\f2a9\";\n}\n.fa-viadeo-square:before {\n  content: \"\\f2aa\";\n}\n.fa-snapchat:before {\n  content: \"\\f2ab\";\n}\n.fa-snapchat-ghost:before {\n  content: \"\\f2ac\";\n}\n.fa-snapchat-square:before {\n  content: \"\\f2ad\";\n}\n.fa-pied-piper:before {\n  content: \"\\f2ae\";\n}\n.fa-first-order:before {\n  content: \"\\f2b0\";\n}\n.fa-yoast:before {\n  content: \"\\f2b1\";\n}\n.fa-themeisle:before {\n  content: \"\\f2b2\";\n}\n.fa-google-plus-circle:before,\n.fa-google-plus-official:before {\n  content: \"\\f2b3\";\n}\n.fa-fa:before,\n.fa-font-awesome:before {\n  content: \"\\f2b4\";\n}\n.fa-handshake-o:before {\n  content: \"\\f2b5\";\n}\n.fa-envelope-open:before {\n  content: \"\\f2b6\";\n}\n.fa-envelope-open-o:before {\n  content: \"\\f2b7\";\n}\n.fa-linode:before {\n  content: \"\\f2b8\";\n}\n.fa-address-book:before {\n  content: \"\\f2b9\";\n}\n.fa-address-book-o:before {\n  content: \"\\f2ba\";\n}\n.fa-vcard:before,\n.fa-address-card:before {\n  content: \"\\f2bb\";\n}\n.fa-vcard-o:before,\n.fa-address-card-o:before {\n  content: \"\\f2bc\";\n}\n.fa-user-circle:before {\n  content: \"\\f2bd\";\n}\n.fa-user-circle-o:before {\n  content: \"\\f2be\";\n}\n.fa-user-o:before {\n  content: \"\\f2c0\";\n}\n.fa-id-badge:before {\n  content: \"\\f2c1\";\n}\n.fa-drivers-license:before,\n.fa-id-card:before {\n  content: \"\\f2c2\";\n}\n.fa-drivers-license-o:before,\n.fa-id-card-o:before {\n  content: \"\\f2c3\";\n}\n.fa-quora:before {\n  content: \"\\f2c4\";\n}\n.fa-free-code-camp:before {\n  content: \"\\f2c5\";\n}\n.fa-telegram:before {\n  content: \"\\f2c6\";\n}\n.fa-thermometer-4:before,\n.fa-thermometer:before,\n.fa-thermometer-full:before {\n  content: \"\\f2c7\";\n}\n.fa-thermometer-3:before,\n.fa-thermometer-three-quarters:before {\n  content: \"\\f2c8\";\n}\n.fa-thermometer-2:before,\n.fa-thermometer-half:before {\n  content: \"\\f2c9\";\n}\n.fa-thermometer-1:before,\n.fa-thermometer-quarter:before {\n  content: \"\\f2ca\";\n}\n.fa-thermometer-0:before,\n.fa-thermometer-empty:before {\n  content: \"\\f2cb\";\n}\n.fa-shower:before {\n  content: \"\\f2cc\";\n}\n.fa-bathtub:before,\n.fa-s15:before,\n.fa-bath:before {\n  content: \"\\f2cd\";\n}\n.fa-podcast:before {\n  content: \"\\f2ce\";\n}\n.fa-window-maximize:before {\n  content: \"\\f2d0\";\n}\n.fa-window-minimize:before {\n  content: \"\\f2d1\";\n}\n.fa-window-restore:before {\n  content: \"\\f2d2\";\n}\n.fa-times-rectangle:before,\n.fa-window-close:before {\n  content: \"\\f2d3\";\n}\n.fa-times-rectangle-o:before,\n.fa-window-close-o:before {\n  content: \"\\f2d4\";\n}\n.fa-bandcamp:before {\n  content: \"\\f2d5\";\n}\n.fa-grav:before {\n  content: \"\\f2d6\";\n}\n.fa-etsy:before {\n  content: \"\\f2d7\";\n}\n.fa-imdb:before {\n  content: \"\\f2d8\";\n}\n.fa-ravelry:before {\n  content: \"\\f2d9\";\n}\n.fa-eercast:before {\n  content: \"\\f2da\";\n}\n.fa-microchip:before {\n  content: \"\\f2db\";\n}\n.fa-snowflake-o:before {\n  content: \"\\f2dc\";\n}\n.fa-superpowers:before {\n  content: \"\\f2dd\";\n}\n.fa-wpexplorer:before {\n  content: \"\\f2de\";\n}\n.fa-meetup:before {\n  content: \"\\f2e0\";\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n.sr-only-focusable:active,\n.sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./public/less/index-page.less":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./public/less/index-page.less ***!
  \******************************************************************************************************************/
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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Safari */\n  -khtml-user-select: none;\n  /* Konqueror HTML */\n  -moz-user-select: none;\n  /* Old versions of Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */\n}\nbody {\n  font-family: 'Roboto', sans-serif !important;\n}\n.pdf-footer a {\n  color: #C71D3D !important;\n}\n.imageRendering {\n  text-align: center;\n  padding: 40px;\n}\n.markdownRendering {\n  padding: 20px;\n}\n.markdownRendering h1 {\n  font-weight: 400;\n  margin-bottom: 0;\n  color: #C71D3D;\n  text-decoration: underline;\n}\n.markdownRendering h2 {\n  font-weight: 300;\n  color: #C71D3D;\n}\n.markdownRendering img {\n  max-width: 100%;\n}\n.markdownRendering p {\n  font-size: 16px;\n  margin-top: 30px;\n}\n.markdownRendering table {\n  page-break-inside: avoid;\n  margin-left: auto;\n  margin-right: auto;\n  font-size: 12px;\n  background: #eaebec;\n  border: #ccc 1px solid;\n  border-collapse: collapse;\n}\n.markdownRendering table thead tr th {\n  padding: 21px 25px 22px 25px;\n  background-color: rgba(0, 0, 0, 0.3);\n  break-inside: avoid;\n  border: 1px solid black;\n  font-weight: bolder;\n}\n.markdownRendering table tbody tr {\n  text-align: center;\n  padding-left: 20px;\n}\n.markdownRendering table tbody tr td {\n  padding: 18px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  border: 1px solid black;\n}\n.markdownRendering table tbody tr:nth-child(odd) {\n  background: #ffffff;\n}\n.markdownRendering table tbody tr:nth-child(even) {\n  background: #f2f2f2;\n}\n.markdownRendering .info {\n  border: 1px solid #B4E1E4;\n  border-radius: 5px;\n  background-color: #81c7e1;\n  color: white;\n  font-weight: 400;\n  letter-spacing: 2px;\n  padding: 5px;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.markdownRendering .info p {\n  padding: 0;\n  margin: 0;\n}\n.katex {\n  color: #0c1f88;\n}\n.katex-display {\n  font-size: 120%;\n}\n", "",{"version":3,"sources":["webpack://./common/less/variables.less","webpack://./public/less/index-page.less"],"names":[],"mappings":"AAWA;EACE,2BAAA;ECVA,eAAe;EDWf,yBAAA;ECTA,WAAW;EDUX,wBAAA;ECRA,mBAAmB;EDSnB,sBAAA;ECPA,4BAA4B;EDQ5B,qBAAA;ECNA,2BAA2B;EDO3B,iBAAA;ECLA,iFAAiF;AACnF;AATA;EACE,4CAAA;AAWF;AARA;EAEI,yBAAA;AASJ;AALA;EACE,kBAAA;EACA,aAAA;AAOF;AAHA;EACE,aAAA;AAKF;AANA;EAII,gBAAA;EACA,gBAAA;EACA,cAAA;EACA,0BAAA;AAKJ;AAZA;EAWI,gBAAA;EACA,cAAA;AAIJ;AAhBA;EAgBI,eAAA;AAGJ;AAnBA;EAoBI,eAAA;EACA,gBAAA;AAEJ;AAvBA;EAyBI,wBAAA;EACA,iBAAA;EACA,kBAAA;EACA,eAAA;EACA,mBAAA;EACA,sBAAA;EACA,yBAAA;AACJ;AAhCA;EAqCU,4BAAA;EACA,oCAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;AAFV;AAvCA;EA+CQ,kBAAA;EACA,kBAAA;AALR;AA3CA;EAmDU,aAAA;EACA,iBAAA;EACA,oBAAA;EACA,uBAAA;AALV;AAQQ;EACE,mBAAA;AANV;AAQQ;EACE,mBAAA;AANV;AAvDA;EAoEI,yBAAA;EACA,kBAAA;EACA,yBAAA;EACA,YAAA;EACA,gBAAA;EACA,mBAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;AAVJ;AAlEA;EA8EM,UAAA;EACA,SAAA;AATN;AAcA;EACE,cAAA;AAZF;AAeA;EACE,eAAA;AAbF","sourcesContent":["\n@tintColor:#C71D3D;\n@darkTextColor: #333;\n\n@rightMenuWidth: 0px;\n\n@leftMenubarBackground: @tintColor;\n@tabSize : 60px;\n\n@toolbarBackground: #B2E2F2;\n\n.noselect {\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */\n  -khtml-user-select: none; /* Konqueror HTML */\n  -moz-user-select: none; /* Old versions of Firefox */\n  -ms-user-select: none; /* Internet Explorer/Edge */\n  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */\n}\n\n","@import \"../../common/less/variables\";\n@import \"variables\";\n\n\nbody {\n  font-family: 'Roboto', sans-serif !important;\n}\n\n.pdf-footer {\n  a {\n    color: @tintColor !important;\n  }\n}\n\n.imageRendering {\n  text-align: center;\n  padding: 40px;\n}\n\n\n.markdownRendering {\n  padding: 20px;\n\n  h1 {\n    font-weight: 400;\n    margin-bottom: 0;\n    color: @tintColor;\n    text-decoration: underline;\n  }\n\n  h2 {\n    font-weight: 300;\n    color: @tintColor;\n  }\n\n  img {\n    max-width: 100%;\n  }\n\n  p {\n    font-size: 16px;\n    margin-top: 30px;\n  }\n\n  table {\n    page-break-inside: avoid;\n    margin-left: auto;\n    margin-right: auto;\n    font-size: 12px;\n    background: #eaebec;\n    border: #ccc 1px solid;\n    border-collapse: collapse;\n\n\n    thead{\n      tr{\n        th {\n          padding: 21px 25px 22px 25px;\n          background-color: rgba(0,0,0,0.3);\n          break-inside: avoid;\n          border: 1px solid black;\n          font-weight: bolder;\n        }\n      }\n    }\n    tbody{\n      tr {\n        text-align: center;\n        padding-left: 20px;\n\n        td {\n          padding: 18px;\n          padding-top: 10px;\n          padding-bottom: 10px;\n          border: 1px solid black;\n        }\n\n        &:nth-child(odd) {\n          background: #ffffff;\n        }\n        &:nth-child(even) {\n          background: #f2f2f2;\n        }\n      }\n    }\n  }\n\n  .info{\n    border: 1px solid #B4E1E4;\n    border-radius: 5px;\n    background-color: #81c7e1;\n    color: white;\n    font-weight: 400;\n    letter-spacing: 2px;\n    padding: 5px;\n    padding-left: 20px;\n    padding-right: 20px;\n    p{\n      padding: 0;\n      margin:0;\n    }\n  }\n}\n\n.katex {\n  color: #0c1f88;\n}\n\n.katex-display {\n  font-size: 120%;\n}\n\n"],"sourceRoot":""}]);
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
  var list = []; // return the list of modules as css string

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
  }; // import a list of modules into the list


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

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
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
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/katex/katex.js":
/*!*************************************!*\
  !*** ./node_modules/katex/katex.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-console:0 */
/**
 * This is the main entry point for KaTeX. Here, we expose functions for
 * rendering expressions either to DOM nodes or to markup strings.
 *
 * We also expose the ParseError class to check if errors thrown from KaTeX are
 * errors in the expression, or errors in javascript handling.
 */

var ParseError = __webpack_require__(/*! ./src/ParseError */ "./node_modules/katex/src/ParseError.js");
var Settings = __webpack_require__(/*! ./src/Settings */ "./node_modules/katex/src/Settings.js");

var buildTree = __webpack_require__(/*! ./src/buildTree */ "./node_modules/katex/src/buildTree.js");
var parseTree = __webpack_require__(/*! ./src/parseTree */ "./node_modules/katex/src/parseTree.js");
var utils = __webpack_require__(/*! ./src/utils */ "./node_modules/katex/src/utils.js");

/**
 * Parse and build an expression, and place that expression in the DOM node
 * given.
 */
var render = function(expression, baseNode, options) {
    utils.clearNode(baseNode);

    var settings = new Settings(options);

    var tree = parseTree(expression, settings);
    var node = buildTree(tree, expression, settings).toNode();

    baseNode.appendChild(node);
};

// KaTeX's styles don't work properly in quirks mode. Print out an error, and
// disable rendering.
if (typeof document !== "undefined") {
    if (document.compatMode !== "CSS1Compat") {
        typeof console !== "undefined" && console.warn(
            "Warning: KaTeX doesn't work in quirks mode. Make sure your " +
                "website has a suitable doctype.");

        render = function() {
            throw new ParseError("KaTeX doesn't work in quirks mode.");
        };
    }
}

/**
 * Parse and build an expression, and return the markup for that.
 */
var renderToString = function(expression, options) {
    var settings = new Settings(options);

    var tree = parseTree(expression, settings);
    return buildTree(tree, expression, settings).toMarkup();
};

/**
 * Parse an expression and return the parse tree.
 */
var generateParseTree = function(expression, options) {
    var settings = new Settings(options);
    return parseTree(expression, settings);
};

module.exports = {
    render: render,
    renderToString: renderToString,
    /**
     * NOTE: This method is not currently recommended for public use.
     * The internal tree representation is unstable and is very likely
     * to change. Use at your own risk.
     */
    __parse: generateParseTree,
    ParseError: ParseError
};


/***/ }),

/***/ "./node_modules/katex/src/Lexer.js":
/*!*****************************************!*\
  !*** ./node_modules/katex/src/Lexer.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * The Lexer class handles tokenizing the input in various ways. Since our
 * parser expects us to be able to backtrack, the lexer allows lexing from any
 * given starting point.
 *
 * Its main exposed function is the `lex` function, which takes a position to
 * lex from and a type of token to lex. It defers to the appropriate `_innerLex`
 * function.
 *
 * The various `_innerLex` functions perform the actual lexing of different
 * kinds.
 */

var matchAt = __webpack_require__(/*! match-at */ "./node_modules/match-at/lib/matchAt.js");

var ParseError = __webpack_require__(/*! ./ParseError */ "./node_modules/katex/src/ParseError.js");

// The main lexer class
function Lexer(input) {
    this.input = input;
    this.pos = 0;
}

/**
 * The resulting token returned from `lex`.
 *
 * It consists of the token text plus some position information.
 * The position information is essentially a range in an input string,
 * but instead of referencing the bare input string, we refer to the lexer.
 * That way it is possible to attach extra metadata to the input string,
 * like for example a file name or similar.
 *
 * The position information (all three parameters) is optional,
 * so it is OK to construct synthetic tokens if appropriate.
 * Not providing available position information may lead to
 * degraded error reporting, though.
 *
 * @param {string}  text   the text of this token
 * @param {number=} start  the start offset, zero-based inclusive
 * @param {number=} end    the end offset, zero-based exclusive
 * @param {Lexer=}  lexer  the lexer which in turn holds the input string
 */
function Token(text, start, end, lexer) {
    this.text = text;
    this.start = start;
    this.end = end;
    this.lexer = lexer;
}

/**
 * Given a pair of tokens (this and endToken), compute a “Token” encompassing
 * the whole input range enclosed by these two.
 *
 * @param {Token}  endToken  last token of the range, inclusive
 * @param {string} text      the text of the newly constructed token
 */
Token.prototype.range = function(endToken, text) {
    if (endToken.lexer !== this.lexer) {
        return new Token(text); // sorry, no position information available
    }
    return new Token(text, this.start, endToken.end, this.lexer);
};

/* The following tokenRegex
 * - matches typical whitespace (but not NBSP etc.) using its first group
 * - does not match any control character \x00-\x1f except whitespace
 * - does not match a bare backslash
 * - matches any ASCII character except those just mentioned
 * - does not match the BMP private use area \uE000-\uF8FF
 * - does not match bare surrogate code units
 * - matches any BMP character except for those just described
 * - matches any valid Unicode surrogate pair
 * - matches a backslash followed by one or more letters
 * - matches a backslash followed by any BMP character, including newline
 * Just because the Lexer matches something doesn't mean it's valid input:
 * If there is no matching function or symbol definition, the Parser will
 * still reject the input.
 */
var tokenRegex = new RegExp(
    "([ \r\n\t]+)|" +                                 // whitespace
    "([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]" +  // single codepoint
    "|[\uD800-\uDBFF][\uDC00-\uDFFF]" +               // surrogate pair
    "|\\\\(?:[a-zA-Z]+|[^\uD800-\uDFFF])" +           // function name
    ")"
);

/**
 * This function lexes a single token.
 */
Lexer.prototype.lex = function() {
    var input = this.input;
    var pos = this.pos;
    if (pos === input.length) {
        return new Token("EOF", pos, pos, this);
    }
    var match = matchAt(tokenRegex, input, pos);
    if (match === null) {
        throw new ParseError(
            "Unexpected character: '" + input[pos] + "'",
            new Token(input[pos], pos, pos + 1, this));
    }
    var text = match[2] || " ";
    var start = this.pos;
    this.pos += match[0].length;
    var end = this.pos;
    return new Token(text, start, end, this);
};

module.exports = Lexer;


/***/ }),

/***/ "./node_modules/katex/src/MacroExpander.js":
/*!*************************************************!*\
  !*** ./node_modules/katex/src/MacroExpander.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * This file contains the “gullet” where macros are expanded
 * until only non-macro tokens remain.
 */

var Lexer = __webpack_require__(/*! ./Lexer */ "./node_modules/katex/src/Lexer.js");

function MacroExpander(input, macros) {
    this.lexer = new Lexer(input);
    this.macros = macros;
    this.stack = []; // contains tokens in REVERSE order
    this.discardedWhiteSpace = [];
}

/**
 * Recursively expand first token, then return first non-expandable token.
 */
MacroExpander.prototype.nextToken = function() {
    for (;;) {
        if (this.stack.length === 0) {
            this.stack.push(this.lexer.lex());
        }
        var topToken = this.stack.pop();
        var name = topToken.text;
        if (!(name.charAt(0) === "\\" && this.macros.hasOwnProperty(name))) {
            return topToken;
        }
        var expansion = this.macros[name];
        if (typeof expansion === "string") {
            var bodyLexer = new Lexer(expansion);
            expansion = [];
            var tok = bodyLexer.lex();
            while (tok.text !== "EOF") {
                expansion.push(tok);
                tok = bodyLexer.lex();
            }
            expansion.reverse(); // to fit in with stack using push and pop
            this.macros[name] = expansion;
        }
        this.stack = this.stack.concat(expansion);
    }
};

MacroExpander.prototype.get = function(ignoreSpace) {
    this.discardedWhiteSpace = [];
    var token = this.nextToken();
    if (ignoreSpace) {
        while (token.text === " ") {
            this.discardedWhiteSpace.push(token);
            token = this.nextToken();
        }
    }
    return token;
};

/**
 * Undo the effect of the preceding call to the get method.
 * A call to this method MUST be immediately preceded and immediately followed
 * by a call to get.  Only used during mode switching, i.e. after one token
 * was got in the old mode but should get got again in a new mode
 * with possibly different whitespace handling.
 */
MacroExpander.prototype.unget = function(token) {
    this.stack.push(token);
    while (this.discardedWhiteSpace.length !== 0) {
        this.stack.push(this.discardedWhiteSpace.pop());
    }
};

module.exports = MacroExpander;


/***/ }),

/***/ "./node_modules/katex/src/Options.js":
/*!*******************************************!*\
  !*** ./node_modules/katex/src/Options.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * This file contains information about the options that the Parser carries
 * around with it while parsing. Data is held in an `Options` object, and when
 * recursing, a new `Options` object can be created with the `.with*` and
 * `.reset` functions.
 */

/**
 * This is the main options class. It contains the style, size, color, and font
 * of the current parse level. It also contains the style and size of the parent
 * parse level, so size changes can be handled efficiently.
 *
 * Each of the `.with*` and `.reset` functions passes its current style and size
 * as the parentStyle and parentSize of the new options class, so parent
 * handling is taken care of automatically.
 */
function Options(data) {
    this.style = data.style;
    this.color = data.color;
    this.size = data.size;
    this.phantom = data.phantom;
    this.font = data.font;

    if (data.parentStyle === undefined) {
        this.parentStyle = data.style;
    } else {
        this.parentStyle = data.parentStyle;
    }

    if (data.parentSize === undefined) {
        this.parentSize = data.size;
    } else {
        this.parentSize = data.parentSize;
    }
}

/**
 * Returns a new options object with the same properties as "this".  Properties
 * from "extension" will be copied to the new options object.
 */
Options.prototype.extend = function(extension) {
    var data = {
        style: this.style,
        size: this.size,
        color: this.color,
        parentStyle: this.style,
        parentSize: this.size,
        phantom: this.phantom,
        font: this.font
    };

    for (var key in extension) {
        if (extension.hasOwnProperty(key)) {
            data[key] = extension[key];
        }
    }

    return new Options(data);
};

/**
 * Create a new options object with the given style.
 */
Options.prototype.withStyle = function(style) {
    return this.extend({
        style: style
    });
};

/**
 * Create a new options object with the given size.
 */
Options.prototype.withSize = function(size) {
    return this.extend({
        size: size
    });
};

/**
 * Create a new options object with the given color.
 */
Options.prototype.withColor = function(color) {
    return this.extend({
        color: color
    });
};

/**
 * Create a new options object with "phantom" set to true.
 */
Options.prototype.withPhantom = function() {
    return this.extend({
        phantom: true
    });
};

/**
 * Create a new options objects with the give font.
 */
Options.prototype.withFont = function(font) {
    return this.extend({
        font: font || this.font
    });
};

/**
 * Create a new options object with the same style, size, and color. This is
 * used so that parent style and size changes are handled correctly.
 */
Options.prototype.reset = function() {
    return this.extend({});
};

/**
 * A map of color names to CSS colors.
 * TODO(emily): Remove this when we have real macros
 */
var colorMap = {
    "katex-blue": "#6495ed",
    "katex-orange": "#ffa500",
    "katex-pink": "#ff00af",
    "katex-red": "#df0030",
    "katex-green": "#28ae7b",
    "katex-gray": "gray",
    "katex-purple": "#9d38bd",
    "katex-blueA": "#ccfaff",
    "katex-blueB": "#80f6ff",
    "katex-blueC": "#63d9ea",
    "katex-blueD": "#11accd",
    "katex-blueE": "#0c7f99",
    "katex-tealA": "#94fff5",
    "katex-tealB": "#26edd5",
    "katex-tealC": "#01d1c1",
    "katex-tealD": "#01a995",
    "katex-tealE": "#208170",
    "katex-greenA": "#b6ffb0",
    "katex-greenB": "#8af281",
    "katex-greenC": "#74cf70",
    "katex-greenD": "#1fab54",
    "katex-greenE": "#0d923f",
    "katex-goldA": "#ffd0a9",
    "katex-goldB": "#ffbb71",
    "katex-goldC": "#ff9c39",
    "katex-goldD": "#e07d10",
    "katex-goldE": "#a75a05",
    "katex-redA": "#fca9a9",
    "katex-redB": "#ff8482",
    "katex-redC": "#f9685d",
    "katex-redD": "#e84d39",
    "katex-redE": "#bc2612",
    "katex-maroonA": "#ffbde0",
    "katex-maroonB": "#ff92c6",
    "katex-maroonC": "#ed5fa6",
    "katex-maroonD": "#ca337c",
    "katex-maroonE": "#9e034e",
    "katex-purpleA": "#ddd7ff",
    "katex-purpleB": "#c6b9fc",
    "katex-purpleC": "#aa87ff",
    "katex-purpleD": "#7854ab",
    "katex-purpleE": "#543b78",
    "katex-mintA": "#f5f9e8",
    "katex-mintB": "#edf2df",
    "katex-mintC": "#e0e5cc",
    "katex-grayA": "#f6f7f7",
    "katex-grayB": "#f0f1f2",
    "katex-grayC": "#e3e5e6",
    "katex-grayD": "#d6d8da",
    "katex-grayE": "#babec2",
    "katex-grayF": "#888d93",
    "katex-grayG": "#626569",
    "katex-grayH": "#3b3e40",
    "katex-grayI": "#21242c",
    "katex-kaBlue": "#314453",
    "katex-kaGreen": "#71B307"
};

/**
 * Gets the CSS color of the current options object, accounting for the
 * `colorMap`.
 */
Options.prototype.getColor = function() {
    if (this.phantom) {
        return "transparent";
    } else {
        return colorMap[this.color] || this.color;
    }
};

module.exports = Options;


/***/ }),

/***/ "./node_modules/katex/src/ParseError.js":
/*!**********************************************!*\
  !*** ./node_modules/katex/src/ParseError.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * This is the ParseError class, which is the main error thrown by KaTeX
 * functions when something has gone wrong. This is used to distinguish internal
 * errors from errors in the expression that the user provided.
 *
 * If possible, a caller should provide a Token or ParseNode with information
 * about where in the source string the problem occurred.
 *
 * @param {string} message  The error message
 * @param {(Token|ParseNode)=} token  An object providing position information
 */
function ParseError(message, token) {
    var error = "KaTeX parse error: " + message;
    var start;
    var end;

    if (token && token.lexer && token.start <= token.end) {
        // If we have the input and a position, make the error a bit fancier

        // Get the input
        var input = token.lexer.input;

        // Prepend some information
        start = token.start;
        end = token.end;
        if (start === input.length) {
            error += " at end of input: ";
        } else {
            error += " at position " + (start + 1) + ": ";
        }

        // Underline token in question using combining underscores
        var underlined = input.slice(start, end).replace(/[^]/g, "$&\u0332");

        // Extract some context from the input and add it to the error
        var left;
        if (start > 15) {
            left = "…" + input.slice(start - 15, start);
        } else {
            left = input.slice(0, start);
        }
        var right;
        if (end + 15 < input.length) {
            right = input.slice(end, end + 15) + "…";
        } else {
            right = input.slice(end);
        }
        error += left + underlined + right;
    }

    // Some hackery to make ParseError a prototype of Error
    // See http://stackoverflow.com/a/8460753
    var self = new Error(error);
    self.name = "ParseError";
    self.__proto__ = ParseError.prototype;

    self.position = start;
    return self;
}

// More hackery
ParseError.prototype.__proto__ = Error.prototype;

module.exports = ParseError;


/***/ }),

/***/ "./node_modules/katex/src/Parser.js":
/*!******************************************!*\
  !*** ./node_modules/katex/src/Parser.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-constant-condition:0 */
var functions = __webpack_require__(/*! ./functions */ "./node_modules/katex/src/functions.js");
var environments = __webpack_require__(/*! ./environments */ "./node_modules/katex/src/environments.js");
var MacroExpander = __webpack_require__(/*! ./MacroExpander */ "./node_modules/katex/src/MacroExpander.js");
var symbols = __webpack_require__(/*! ./symbols */ "./node_modules/katex/src/symbols.js");
var utils = __webpack_require__(/*! ./utils */ "./node_modules/katex/src/utils.js");
var cjkRegex = (__webpack_require__(/*! ./unicodeRegexes */ "./node_modules/katex/src/unicodeRegexes.js").cjkRegex);

var parseData = __webpack_require__(/*! ./parseData */ "./node_modules/katex/src/parseData.js");
var ParseError = __webpack_require__(/*! ./ParseError */ "./node_modules/katex/src/ParseError.js");

/**
 * This file contains the parser used to parse out a TeX expression from the
 * input. Since TeX isn't context-free, standard parsers don't work particularly
 * well.
 *
 * The strategy of this parser is as such:
 *
 * The main functions (the `.parse...` ones) take a position in the current
 * parse string to parse tokens from. The lexer (found in Lexer.js, stored at
 * this.lexer) also supports pulling out tokens at arbitrary places. When
 * individual tokens are needed at a position, the lexer is called to pull out a
 * token, which is then used.
 *
 * The parser has a property called "mode" indicating the mode that
 * the parser is currently in. Currently it has to be one of "math" or
 * "text", which denotes whether the current environment is a math-y
 * one or a text-y one (e.g. inside \text). Currently, this serves to
 * limit the functions which can be used in text mode.
 *
 * The main functions then return an object which contains the useful data that
 * was parsed at its given point, and a new position at the end of the parsed
 * data. The main functions can call each other and continue the parsing by
 * using the returned position as a new starting point.
 *
 * There are also extra `.handle...` functions, which pull out some reused
 * functionality into self-contained functions.
 *
 * The earlier functions return ParseNodes.
 * The later functions (which are called deeper in the parse) sometimes return
 * ParseFuncOrArgument, which contain a ParseNode as well as some data about
 * whether the parsed object is a function which is missing some arguments, or a
 * standalone object which can be used as an argument to another function.
 */

/**
 * Main Parser class
 */
function Parser(input, settings) {
    // Create a new macro expander (gullet) and (indirectly via that) also a
    // new lexer (mouth) for this parser (stomach, in the language of TeX)
    this.gullet = new MacroExpander(input, settings.macros);
    // Store the settings for use in parsing
    this.settings = settings;
    // Count leftright depth (for \middle errors)
    this.leftrightDepth = 0;
}

var ParseNode = parseData.ParseNode;

/**
 * An initial function (without its arguments), or an argument to a function.
 * The `result` argument should be a ParseNode.
 */
function ParseFuncOrArgument(result, isFunction, token) {
    this.result = result;
    // Is this a function (i.e. is it something defined in functions.js)?
    this.isFunction = isFunction;
    this.token = token;
}

/**
 * Checks a result to make sure it has the right type, and throws an
 * appropriate error otherwise.
 *
 * @param {boolean=} consume whether to consume the expected token,
 *                           defaults to true
 */
Parser.prototype.expect = function(text, consume) {
    if (this.nextToken.text !== text) {
        throw new ParseError(
            "Expected '" + text + "', got '" + this.nextToken.text + "'",
            this.nextToken
        );
    }
    if (consume !== false) {
        this.consume();
    }
};

/**
 * Considers the current look ahead token as consumed,
 * and fetches the one after that as the new look ahead.
 */
Parser.prototype.consume = function() {
    this.nextToken = this.gullet.get(this.mode === "math");
};

Parser.prototype.switchMode = function(newMode) {
    this.gullet.unget(this.nextToken);
    this.mode = newMode;
    this.consume();
};

/**
 * Main parsing function, which parses an entire input.
 *
 * @return {?Array.<ParseNode>}
 */
Parser.prototype.parse = function() {
    // Try to parse the input
    this.mode = "math";
    this.consume();
    var parse = this.parseInput();
    return parse;
};

/**
 * Parses an entire input tree.
 */
Parser.prototype.parseInput = function() {
    // Parse an expression
    var expression = this.parseExpression(false);
    // If we succeeded, make sure there's an EOF at the end
    this.expect("EOF", false);
    return expression;
};

var endOfExpression = ["}", "\\end", "\\right", "&", "\\\\", "\\cr"];

/**
 * Parses an "expression", which is a list of atoms.
 *
 * @param {boolean} breakOnInfix  Should the parsing stop when we hit infix
 *                  nodes? This happens when functions have higher precendence
 *                  than infix nodes in implicit parses.
 *
 * @param {?string} breakOnTokenText  The text of the token that the expression
 *                  should end with, or `null` if something else should end the
 *                  expression.
 *
 * @return {ParseNode}
 */
Parser.prototype.parseExpression = function(breakOnInfix, breakOnTokenText) {
    var body = [];
    // Keep adding atoms to the body until we can't parse any more atoms (either
    // we reached the end, a }, or a \right)
    while (true) {
        var lex = this.nextToken;
        if (endOfExpression.indexOf(lex.text) !== -1) {
            break;
        }
        if (breakOnTokenText && lex.text === breakOnTokenText) {
            break;
        }
        if (breakOnInfix && functions[lex.text] && functions[lex.text].infix) {
            break;
        }
        var atom = this.parseAtom();
        if (!atom) {
            if (!this.settings.throwOnError && lex.text[0] === "\\") {
                var errorNode = this.handleUnsupportedCmd();
                body.push(errorNode);
                continue;
            }

            break;
        }
        body.push(atom);
    }
    return this.handleInfixNodes(body);
};

/**
 * Rewrites infix operators such as \over with corresponding commands such
 * as \frac.
 *
 * There can only be one infix operator per group.  If there's more than one
 * then the expression is ambiguous.  This can be resolved by adding {}.
 *
 * @returns {Array}
 */
Parser.prototype.handleInfixNodes = function(body) {
    var overIndex = -1;
    var funcName;

    for (var i = 0; i < body.length; i++) {
        var node = body[i];
        if (node.type === "infix") {
            if (overIndex !== -1) {
                throw new ParseError(
                    "only one infix operator per group",
                    node.value.token);
            }
            overIndex = i;
            funcName = node.value.replaceWith;
        }
    }

    if (overIndex !== -1) {
        var numerNode;
        var denomNode;

        var numerBody = body.slice(0, overIndex);
        var denomBody = body.slice(overIndex + 1);

        if (numerBody.length === 1 && numerBody[0].type === "ordgroup") {
            numerNode = numerBody[0];
        } else {
            numerNode = new ParseNode("ordgroup", numerBody, this.mode);
        }

        if (denomBody.length === 1 && denomBody[0].type === "ordgroup") {
            denomNode = denomBody[0];
        } else {
            denomNode = new ParseNode("ordgroup", denomBody, this.mode);
        }

        var value = this.callFunction(
            funcName, [numerNode, denomNode], null);
        return [new ParseNode(value.type, value, this.mode)];
    } else {
        return body;
    }
};

// The greediness of a superscript or subscript
var SUPSUB_GREEDINESS = 1;

/**
 * Handle a subscript or superscript with nice errors.
 */
Parser.prototype.handleSupSubscript = function(name) {
    var symbolToken = this.nextToken;
    var symbol = symbolToken.text;
    this.consume();
    var group = this.parseGroup();

    if (!group) {
        if (!this.settings.throwOnError && this.nextToken.text[0] === "\\") {
            return this.handleUnsupportedCmd();
        } else {
            throw new ParseError(
                "Expected group after '" + symbol + "'",
                symbolToken
            );
        }
    } else if (group.isFunction) {
        // ^ and _ have a greediness, so handle interactions with functions'
        // greediness
        var funcGreediness = functions[group.result].greediness;
        if (funcGreediness > SUPSUB_GREEDINESS) {
            return this.parseFunction(group);
        } else {
            throw new ParseError(
                "Got function '" + group.result + "' with no arguments " +
                    "as " + name, symbolToken);
        }
    } else {
        return group.result;
    }
};

/**
 * Converts the textual input of an unsupported command into a text node
 * contained within a color node whose color is determined by errorColor
 */
Parser.prototype.handleUnsupportedCmd = function() {
    var text = this.nextToken.text;
    var textordArray = [];

    for (var i = 0; i < text.length; i++) {
        textordArray.push(new ParseNode("textord", text[i], "text"));
    }

    var textNode = new ParseNode(
        "text",
        {
            body: textordArray,
            type: "text"
        },
        this.mode);

    var colorNode = new ParseNode(
        "color",
        {
            color: this.settings.errorColor,
            value: [textNode],
            type: "color"
        },
        this.mode);

    this.consume();
    return colorNode;
};

/**
 * Parses a group with optional super/subscripts.
 *
 * @return {?ParseNode}
 */
Parser.prototype.parseAtom = function() {
    // The body of an atom is an implicit group, so that things like
    // \left(x\right)^2 work correctly.
    var base = this.parseImplicitGroup();

    // In text mode, we don't have superscripts or subscripts
    if (this.mode === "text") {
        return base;
    }

    // Note that base may be empty (i.e. null) at this point.

    var superscript;
    var subscript;
    while (true) {
        // Lex the first token
        var lex = this.nextToken;

        if (lex.text === "\\limits" || lex.text === "\\nolimits") {
            // We got a limit control
            if (!base || base.type !== "op") {
                throw new ParseError(
                    "Limit controls must follow a math operator",
                    lex);
            } else {
                var limits = lex.text === "\\limits";
                base.value.limits = limits;
                base.value.alwaysHandleSupSub = true;
            }
            this.consume();
        } else if (lex.text === "^") {
            // We got a superscript start
            if (superscript) {
                throw new ParseError("Double superscript", lex);
            }
            superscript = this.handleSupSubscript("superscript");
        } else if (lex.text === "_") {
            // We got a subscript start
            if (subscript) {
                throw new ParseError("Double subscript", lex);
            }
            subscript = this.handleSupSubscript("subscript");
        } else if (lex.text === "'") {
            // We got a prime
            var prime = new ParseNode("textord", "\\prime", this.mode);

            // Many primes can be grouped together, so we handle this here
            var primes = [prime];
            this.consume();
            // Keep lexing tokens until we get something that's not a prime
            while (this.nextToken.text === "'") {
                // For each one, add another prime to the list
                primes.push(prime);
                this.consume();
            }
            // Put them into an ordgroup as the superscript
            superscript = new ParseNode("ordgroup", primes, this.mode);
        } else {
            // If it wasn't ^, _, or ', stop parsing super/subscripts
            break;
        }
    }

    if (superscript || subscript) {
        // If we got either a superscript or subscript, create a supsub
        return new ParseNode("supsub", {
            base: base,
            sup: superscript,
            sub: subscript
        }, this.mode);
    } else {
        // Otherwise return the original body
        return base;
    }
};

// A list of the size-changing functions, for use in parseImplicitGroup
var sizeFuncs = [
    "\\tiny", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize",
    "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"
];

// A list of the style-changing functions, for use in parseImplicitGroup
var styleFuncs = [
    "\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"
];

/**
 * Parses an implicit group, which is a group that starts at the end of a
 * specified, and ends right before a higher explicit group ends, or at EOL. It
 * is used for functions that appear to affect the current style, like \Large or
 * \textrm, where instead of keeping a style we just pretend that there is an
 * implicit grouping after it until the end of the group. E.g.
 *   small text {\Large large text} small text again
 * It is also used for \left and \right to get the correct grouping.
 *
 * @return {?ParseNode}
 */
Parser.prototype.parseImplicitGroup = function() {
    var start = this.parseSymbol();

    if (start == null) {
        // If we didn't get anything we handle, fall back to parseFunction
        return this.parseFunction();
    }

    var func = start.result;
    var body;

    if (func === "\\left") {
        // If we see a left:
        // Parse the entire left function (including the delimiter)
        var left = this.parseFunction(start);
        // Parse out the implicit body
        ++this.leftrightDepth;
        body = this.parseExpression(false);
        --this.leftrightDepth;
        // Check the next token
        this.expect("\\right", false);
        var right = this.parseFunction();
        return new ParseNode("leftright", {
            body: body,
            left: left.value.value,
            right: right.value.value
        }, this.mode);
    } else if (func === "\\begin") {
        // begin...end is similar to left...right
        var begin = this.parseFunction(start);
        var envName = begin.value.name;
        if (!environments.hasOwnProperty(envName)) {
            throw new ParseError(
                "No such environment: " + envName, begin.value.nameGroup);
        }
        // Build the environment object. Arguments and other information will
        // be made available to the begin and end methods using properties.
        var env = environments[envName];
        var args = this.parseArguments("\\begin{" + envName + "}", env);
        var context = {
            mode: this.mode,
            envName: envName,
            parser: this,
            positions: args.pop()
        };
        var result = env.handler(context, args);
        this.expect("\\end", false);
        var endNameToken = this.nextToken;
        var end = this.parseFunction();
        if (end.value.name !== envName) {
            throw new ParseError(
                "Mismatch: \\begin{" + envName + "} matched " +
                "by \\end{" + end.value.name + "}",
                endNameToken);
        }
        result.position = end.position;
        return result;
    } else if (utils.contains(sizeFuncs, func)) {
        // If we see a sizing function, parse out the implict body
        body = this.parseExpression(false);
        return new ParseNode("sizing", {
            // Figure out what size to use based on the list of functions above
            size: "size" + (utils.indexOf(sizeFuncs, func) + 1),
            value: body
        }, this.mode);
    } else if (utils.contains(styleFuncs, func)) {
        // If we see a styling function, parse out the implict body
        body = this.parseExpression(true);
        return new ParseNode("styling", {
            // Figure out what style to use by pulling out the style from
            // the function name
            style: func.slice(1, func.length - 5),
            value: body
        }, this.mode);
    } else {
        // Defer to parseFunction if it's not a function we handle
        return this.parseFunction(start);
    }
};

/**
 * Parses an entire function, including its base and all of its arguments.
 * The base might either have been parsed already, in which case
 * it is provided as an argument, or it's the next group in the input.
 *
 * @param {ParseFuncOrArgument=} baseGroup optional as described above
 * @return {?ParseNode}
 */
Parser.prototype.parseFunction = function(baseGroup) {
    if (!baseGroup) {
        baseGroup = this.parseGroup();
    }

    if (baseGroup) {
        if (baseGroup.isFunction) {
            var func = baseGroup.result;
            var funcData = functions[func];
            if (this.mode === "text" && !funcData.allowedInText) {
                throw new ParseError(
                    "Can't use function '" + func + "' in text mode",
                    baseGroup.token);
            }

            var args = this.parseArguments(func, funcData);
            var token = baseGroup.token;
            var result = this.callFunction(func, args, args.pop(), token);
            return new ParseNode(result.type, result, this.mode);
        } else {
            return baseGroup.result;
        }
    } else {
        return null;
    }
};

/**
 * Call a function handler with a suitable context and arguments.
 */
Parser.prototype.callFunction = function(name, args, positions, token) {
    var context = {
        funcName: name,
        parser: this,
        positions: positions,
        token: token
    };
    return functions[name].handler(context, args);
};

/**
 * Parses the arguments of a function or environment
 *
 * @param {string} func  "\name" or "\begin{name}"
 * @param {{numArgs:number,numOptionalArgs:number|undefined}} funcData
 * @return the array of arguments, with the list of positions as last element
 */
Parser.prototype.parseArguments = function(func, funcData) {
    var totalArgs = funcData.numArgs + funcData.numOptionalArgs;
    if (totalArgs === 0) {
        return [[this.pos]];
    }

    var baseGreediness = funcData.greediness;
    var positions = [this.pos];
    var args = [];

    for (var i = 0; i < totalArgs; i++) {
        var nextToken = this.nextToken;
        var argType = funcData.argTypes && funcData.argTypes[i];
        var arg;
        if (i < funcData.numOptionalArgs) {
            if (argType) {
                arg = this.parseGroupOfType(argType, true);
            } else {
                arg = this.parseGroup(true);
            }
            if (!arg) {
                args.push(null);
                positions.push(this.pos);
                continue;
            }
        } else {
            if (argType) {
                arg = this.parseGroupOfType(argType);
            } else {
                arg = this.parseGroup();
            }
            if (!arg) {
                if (!this.settings.throwOnError &&
                    this.nextToken.text[0] === "\\") {
                    arg = new ParseFuncOrArgument(
                        this.handleUnsupportedCmd(this.nextToken.text),
                        false);
                } else {
                    throw new ParseError(
                        "Expected group after '" + func + "'", nextToken);
                }
            }
        }
        var argNode;
        if (arg.isFunction) {
            var argGreediness =
                functions[arg.result].greediness;
            if (argGreediness > baseGreediness) {
                argNode = this.parseFunction(arg);
            } else {
                throw new ParseError(
                    "Got function '" + arg.result + "' as " +
                    "argument to '" + func + "'", nextToken);
            }
        } else {
            argNode = arg.result;
        }
        args.push(argNode);
        positions.push(this.pos);
    }

    args.push(positions);

    return args;
};


/**
 * Parses a group when the mode is changing.
 *
 * @return {?ParseFuncOrArgument}
 */
Parser.prototype.parseGroupOfType = function(innerMode, optional) {
    var outerMode = this.mode;
    // Handle `original` argTypes
    if (innerMode === "original") {
        innerMode = outerMode;
    }

    if (innerMode === "color") {
        return this.parseColorGroup(optional);
    }
    if (innerMode === "size") {
        return this.parseSizeGroup(optional);
    }

    this.switchMode(innerMode);
    if (innerMode === "text") {
        // text mode is special because it should ignore the whitespace before
        // it
        while (this.nextToken.text === " ") {
            this.consume();
        }
    }
    // By the time we get here, innerMode is one of "text" or "math".
    // We switch the mode of the parser, recurse, then restore the old mode.
    var res = this.parseGroup(optional);
    this.switchMode(outerMode);
    return res;
};

/**
 * Parses a group, essentially returning the string formed by the
 * brace-enclosed tokens plus some position information.
 *
 * @param {string} modeName  Used to describe the mode in error messages
 * @param {boolean=} optional  Whether the group is optional or required
 */
Parser.prototype.parseStringGroup = function(modeName, optional) {
    if (optional && this.nextToken.text !== "[") {
        return null;
    }
    var outerMode = this.mode;
    this.mode = "text";
    this.expect(optional ? "[" : "{");
    var str = "";
    var firstToken = this.nextToken;
    var lastToken = firstToken;
    while (this.nextToken.text !== (optional ? "]" : "}")) {
        if (this.nextToken.text === "EOF") {
            throw new ParseError(
                "Unexpected end of input in " + modeName,
                firstToken.range(this.nextToken, str));
        }
        lastToken = this.nextToken;
        str += lastToken.text;
        this.consume();
    }
    this.mode = outerMode;
    this.expect(optional ? "]" : "}");
    return firstToken.range(lastToken, str);
};

/**
 * Parses a regex-delimited group: the largest sequence of tokens
 * whose concatenated strings match `regex`. Returns the string
 * formed by the tokens plus some position information.
 *
 * @param {RegExp} regex
 * @param {string} modeName  Used to describe the mode in error messages
 */
Parser.prototype.parseRegexGroup = function(regex, modeName) {
    var outerMode = this.mode;
    this.mode = "text";
    var firstToken = this.nextToken;
    var lastToken = firstToken;
    var str = "";
    while (this.nextToken.text !== "EOF"
           && regex.test(str + this.nextToken.text)) {
        lastToken = this.nextToken;
        str += lastToken.text;
        this.consume();
    }
    if (str === "") {
        throw new ParseError(
            "Invalid " + modeName + ": '" + firstToken.text + "'",
            firstToken);
    }
    this.mode = outerMode;
    return firstToken.range(lastToken, str);
};

/**
 * Parses a color description.
 */
Parser.prototype.parseColorGroup = function(optional) {
    var res = this.parseStringGroup("color", optional);
    if (!res) {
        return null;
    }
    var match = (/^(#[a-z0-9]+|[a-z]+)$/i).exec(res.text);
    if (!match) {
        throw new ParseError("Invalid color: '" + res.text + "'", res);
    }
    return new ParseFuncOrArgument(
        new ParseNode("color", match[0], this.mode),
        false);
};

/**
 * Parses a size specification, consisting of magnitude and unit.
 */
Parser.prototype.parseSizeGroup = function(optional) {
    var res;
    if (!optional && this.nextToken.text !== "{") {
        res = this.parseRegexGroup(
            /^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2}$/, "size");
    } else {
        res = this.parseStringGroup("size", optional);
    }
    if (!res) {
        return null;
    }
    var match = (/([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/).exec(res.text);
    if (!match) {
        throw new ParseError("Invalid size: '" + res.text + "'", res);
    }
    var data = {
        number: +(match[1] + match[2]), // sign + magnitude, cast to number
        unit: match[3]
    };
    if (data.unit !== "em" && data.unit !== "ex" && data.unit !== "mu") {
        throw new ParseError("Invalid unit: '" + data.unit + "'", res);
    }
    return new ParseFuncOrArgument(
        new ParseNode("color", data, this.mode),
        false);
};

/**
 * If the argument is false or absent, this parses an ordinary group,
 * which is either a single nucleus (like "x") or an expression
 * in braces (like "{x+y}").
 * If the argument is true, it parses either a bracket-delimited expression
 * (like "[x+y]") or returns null to indicate the absence of a
 * bracket-enclosed group.
 *
 * @param {boolean=} optional  Whether the group is optional or required
 * @return {?ParseFuncOrArgument}
 */
Parser.prototype.parseGroup = function(optional) {
    var firstToken = this.nextToken;
    // Try to parse an open brace
    if (this.nextToken.text === (optional ? "[" : "{")) {
        // If we get a brace, parse an expression
        this.consume();
        var expression = this.parseExpression(false, optional ? "]" : null);
        var lastToken = this.nextToken;
        // Make sure we get a close brace
        this.expect(optional ? "]" : "}");
        if (this.mode === "text") {
            this.formLigatures(expression);
        }
        return new ParseFuncOrArgument(
            new ParseNode("ordgroup", expression, this.mode,
                          firstToken, lastToken),
            false);
    } else {
        // Otherwise, just return a nucleus, or nothing for an optional group
        return optional ? null : this.parseSymbol();
    }
};

/**
 * Form ligature-like combinations of characters for text mode.
 * This includes inputs like "--", "---", "``" and "''".
 * The result will simply replace multiple textord nodes with a single
 * character in each value by a single textord node having multiple
 * characters in its value.  The representation is still ASCII source.
 *
 * @param {Array.<ParseNode>} group  the nodes of this group,
 *                                   list will be moified in place
 */
Parser.prototype.formLigatures = function(group) {
    var i;
    var n = group.length - 1;
    for (i = 0; i < n; ++i) {
        var a = group[i];
        var v = a.value;
        if (v === "-" && group[i + 1].value === "-") {
            if (i + 1 < n && group[i + 2].value === "-") {
                group.splice(i, 3, new ParseNode(
                    "textord", "---", "text", a, group[i + 2]));
                n -= 2;
            } else {
                group.splice(i, 2, new ParseNode(
                    "textord", "--", "text", a, group[i + 1]));
                n -= 1;
            }
        }
        if ((v === "'" || v === "`") && group[i + 1].value === v) {
            group.splice(i, 2, new ParseNode(
                "textord", v + v, "text", a, group[i + 1]));
            n -= 1;
        }
    }
};

/**
 * Parse a single symbol out of the string. Here, we handle both the functions
 * we have defined, as well as the single character symbols
 *
 * @return {?ParseFuncOrArgument}
 */
Parser.prototype.parseSymbol = function() {
    var nucleus = this.nextToken;

    if (functions[nucleus.text]) {
        this.consume();
        // If there exists a function with this name, we return the function and
        // say that it is a function.
        return new ParseFuncOrArgument(
            nucleus.text,
            true, nucleus);
    } else if (symbols[this.mode][nucleus.text]) {
        this.consume();
        // Otherwise if this is a no-argument function, find the type it
        // corresponds to in the symbols map
        return new ParseFuncOrArgument(
            new ParseNode(symbols[this.mode][nucleus.text].group,
                          nucleus.text, this.mode, nucleus),
            false, nucleus);
    } else if (this.mode === "text" && cjkRegex.test(nucleus.text)) {
        this.consume();
        return new ParseFuncOrArgument(
            new ParseNode("textord", nucleus.text, this.mode, nucleus),
            false, nucleus);
    } else {
        return null;
    }
};

Parser.prototype.ParseNode = ParseNode;

module.exports = Parser;


/***/ }),

/***/ "./node_modules/katex/src/Settings.js":
/*!********************************************!*\
  !*** ./node_modules/katex/src/Settings.js ***!
  \********************************************/
/***/ ((module) => {

/**
 * This is a module for storing settings passed into KaTeX. It correctly handles
 * default settings.
 */

/**
 * Helper function for getting a default value if the value is undefined
 */
function get(option, defaultValue) {
    return option === undefined ? defaultValue : option;
}

/**
 * The main Settings object
 *
 * The current options stored are:
 *  - displayMode: Whether the expression should be typeset by default in
 *                 textstyle or displaystyle (default false)
 */
function Settings(options) {
    // allow null options
    options = options || {};
    this.displayMode = get(options.displayMode, false);
    this.throwOnError = get(options.throwOnError, true);
    this.errorColor = get(options.errorColor, "#cc0000");
    this.macros = options.macros || {};
}

module.exports = Settings;


/***/ }),

/***/ "./node_modules/katex/src/Style.js":
/*!*****************************************!*\
  !*** ./node_modules/katex/src/Style.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * This file contains information and classes for the various kinds of styles
 * used in TeX. It provides a generic `Style` class, which holds information
 * about a specific style. It then provides instances of all the different kinds
 * of styles possible, and provides functions to move between them and get
 * information about them.
 */

var sigmas = (__webpack_require__(/*! ./fontMetrics.js */ "./node_modules/katex/src/fontMetrics.js").sigmas);

var metrics = [{}, {}, {}];
var i;
for (var key in sigmas) {
    if (sigmas.hasOwnProperty(key)) {
        for (i = 0; i < 3; i++) {
            metrics[i][key] = sigmas[key][i];
        }
    }
}
for (i = 0; i < 3; i++) {
    metrics[i].emPerEx = sigmas.xHeight[i] / sigmas.quad[i];
}

/**
 * The main style class. Contains a unique id for the style, a size (which is
 * the same for cramped and uncramped version of a style), a cramped flag, and a
 * size multiplier, which gives the size difference between a style and
 * textstyle.
 */
function Style(id, size, multiplier, cramped) {
    this.id = id;
    this.size = size;
    this.cramped = cramped;
    this.sizeMultiplier = multiplier;
    this.metrics = metrics[size > 0 ? size - 1 : 0];
}

/**
 * Get the style of a superscript given a base in the current style.
 */
Style.prototype.sup = function() {
    return styles[sup[this.id]];
};

/**
 * Get the style of a subscript given a base in the current style.
 */
Style.prototype.sub = function() {
    return styles[sub[this.id]];
};

/**
 * Get the style of a fraction numerator given the fraction in the current
 * style.
 */
Style.prototype.fracNum = function() {
    return styles[fracNum[this.id]];
};

/**
 * Get the style of a fraction denominator given the fraction in the current
 * style.
 */
Style.prototype.fracDen = function() {
    return styles[fracDen[this.id]];
};

/**
 * Get the cramped version of a style (in particular, cramping a cramped style
 * doesn't change the style).
 */
Style.prototype.cramp = function() {
    return styles[cramp[this.id]];
};

/**
 * HTML class name, like "displaystyle cramped"
 */
Style.prototype.cls = function() {
    return sizeNames[this.size] + (this.cramped ? " cramped" : " uncramped");
};

/**
 * HTML Reset class name, like "reset-textstyle"
 */
Style.prototype.reset = function() {
    return resetNames[this.size];
};

/**
 * Return if this style is tightly spaced (scriptstyle/scriptscriptstyle)
 */
Style.prototype.isTight = function() {
    return this.size >= 2;
};

// IDs of the different styles
var D = 0;
var Dc = 1;
var T = 2;
var Tc = 3;
var S = 4;
var Sc = 5;
var SS = 6;
var SSc = 7;

// String names for the different sizes
var sizeNames = [
    "displaystyle textstyle",
    "textstyle",
    "scriptstyle",
    "scriptscriptstyle"
];

// Reset names for the different sizes
var resetNames = [
    "reset-textstyle",
    "reset-textstyle",
    "reset-scriptstyle",
    "reset-scriptscriptstyle"
];

// Instances of the different styles
var styles = [
    new Style(D, 0, 1.0, false),
    new Style(Dc, 0, 1.0, true),
    new Style(T, 1, 1.0, false),
    new Style(Tc, 1, 1.0, true),
    new Style(S, 2, 0.7, false),
    new Style(Sc, 2, 0.7, true),
    new Style(SS, 3, 0.5, false),
    new Style(SSc, 3, 0.5, true)
];

// Lookup tables for switching from one style to another
var sup = [S, Sc, S, Sc, SS, SSc, SS, SSc];
var sub = [Sc, Sc, Sc, Sc, SSc, SSc, SSc, SSc];
var fracNum = [T, Tc, S, Sc, SS, SSc, SS, SSc];
var fracDen = [Tc, Tc, Sc, Sc, SSc, SSc, SSc, SSc];
var cramp = [Dc, Dc, Tc, Tc, Sc, Sc, SSc, SSc];

// We only export some of the styles. Also, we don't export the `Style` class so
// no more styles can be generated.
module.exports = {
    DISPLAY: styles[D],
    TEXT: styles[T],
    SCRIPT: styles[S],
    SCRIPTSCRIPT: styles[SS]
};


/***/ }),

/***/ "./node_modules/katex/src/buildCommon.js":
/*!***********************************************!*\
  !*** ./node_modules/katex/src/buildCommon.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-console:0 */
/**
 * This module contains general functions that can be used for building
 * different kinds of domTree nodes in a consistent manner.
 */

var domTree = __webpack_require__(/*! ./domTree */ "./node_modules/katex/src/domTree.js");
var fontMetrics = __webpack_require__(/*! ./fontMetrics */ "./node_modules/katex/src/fontMetrics.js");
var symbols = __webpack_require__(/*! ./symbols */ "./node_modules/katex/src/symbols.js");
var utils = __webpack_require__(/*! ./utils */ "./node_modules/katex/src/utils.js");

var greekCapitals = [
    "\\Gamma",
    "\\Delta",
    "\\Theta",
    "\\Lambda",
    "\\Xi",
    "\\Pi",
    "\\Sigma",
    "\\Upsilon",
    "\\Phi",
    "\\Psi",
    "\\Omega"
];

// The following have to be loaded from Main-Italic font, using class mainit
var mainitLetters = [
    "\u0131",   // dotless i, \imath
    "\u0237",   // dotless j, \jmath
    "\u00a3"   // \pounds
];

/**
 * Makes a symbolNode after translation via the list of symbols in symbols.js.
 * Correctly pulls out metrics for the character, and optionally takes a list of
 * classes to be attached to the node.
 *
 * TODO: make argument order closer to makeSpan
 * TODO: add a separate argument for math class (e.g. `mop`, `mbin`), which
 * should if present come first in `classes`.
 */
var makeSymbol = function(value, fontFamily, mode, options, classes) {
    // Replace the value with its replaced value from symbol.js
    if (symbols[mode][value] && symbols[mode][value].replace) {
        value = symbols[mode][value].replace;
    }

    var metrics = fontMetrics.getCharacterMetrics(value, fontFamily);

    var symbolNode;
    if (metrics) {
        var italic = metrics.italic;
        if (mode === "text") {
            italic = 0;
        }
        symbolNode = new domTree.symbolNode(
            value, metrics.height, metrics.depth, italic, metrics.skew,
            classes);
    } else {
        // TODO(emily): Figure out a good way to only print this in development
        typeof console !== "undefined" && console.warn(
            "No character metrics for '" + value + "' in style '" +
                fontFamily + "'");
        symbolNode = new domTree.symbolNode(value, 0, 0, 0, 0, classes);
    }

    if (options) {
        if (options.style.isTight()) {
            symbolNode.classes.push("mtight");
        }
        if (options.getColor()) {
            symbolNode.style.color = options.getColor();
        }
    }

    return symbolNode;
};

/**
 * Makes a symbol in Main-Regular or AMS-Regular.
 * Used for rel, bin, open, close, inner, and punct.
 */
var mathsym = function(value, mode, options, classes) {
    // Decide what font to render the symbol in by its entry in the symbols
    // table.
    // Have a special case for when the value = \ because the \ is used as a
    // textord in unsupported command errors but cannot be parsed as a regular
    // text ordinal and is therefore not present as a symbol in the symbols
    // table for text
    if (value === "\\" || symbols[mode][value].font === "main") {
        return makeSymbol(value, "Main-Regular", mode, options, classes);
    } else {
        return makeSymbol(
            value, "AMS-Regular", mode, options, classes.concat(["amsrm"]));
    }
};

/**
 * Makes a symbol in the default font for mathords and textords.
 */
var mathDefault = function(value, mode, options, classes, type) {
    if (type === "mathord") {
        return mathit(value, mode, options, classes);
    } else if (type === "textord") {
        return makeSymbol(
            value, "Main-Regular", mode, options, classes.concat(["mathrm"]));
    } else {
        throw new Error("unexpected type: " + type + " in mathDefault");
    }
};

/**
 * Makes a symbol in the italic math font.
 */
var mathit = function(value, mode, options, classes) {
    if (/[0-9]/.test(value.charAt(0)) ||
            // glyphs for \imath and \jmath do not exist in Math-Italic so we
            // need to use Main-Italic instead
            utils.contains(mainitLetters, value) ||
            utils.contains(greekCapitals, value)) {
        return makeSymbol(
            value, "Main-Italic", mode, options, classes.concat(["mainit"]));
    } else {
        return makeSymbol(
            value, "Math-Italic", mode, options, classes.concat(["mathit"]));
    }
};

/**
 * Makes either a mathord or textord in the correct font and color.
 */
var makeOrd = function(group, options, type) {
    var mode = group.mode;
    var value = group.value;
    if (symbols[mode][value] && symbols[mode][value].replace) {
        value = symbols[mode][value].replace;
    }

    var classes = ["mord"];

    var font = options.font;
    if (font) {
        if (font === "mathit" || utils.contains(mainitLetters, value)) {
            return mathit(value, mode, options, classes);
        } else {
            var fontName = fontMap[font].fontName;
            if (fontMetrics.getCharacterMetrics(value, fontName)) {
                return makeSymbol(
                    value, fontName, mode, options, classes.concat([font]));
            } else {
                return mathDefault(value, mode, options, classes, type);
            }
        }
    } else {
        return mathDefault(value, mode, options, classes, type);
    }
};

/**
 * Calculate the height, depth, and maxFontSize of an element based on its
 * children.
 */
var sizeElementFromChildren = function(elem) {
    var height = 0;
    var depth = 0;
    var maxFontSize = 0;

    if (elem.children) {
        for (var i = 0; i < elem.children.length; i++) {
            if (elem.children[i].height > height) {
                height = elem.children[i].height;
            }
            if (elem.children[i].depth > depth) {
                depth = elem.children[i].depth;
            }
            if (elem.children[i].maxFontSize > maxFontSize) {
                maxFontSize = elem.children[i].maxFontSize;
            }
        }
    }

    elem.height = height;
    elem.depth = depth;
    elem.maxFontSize = maxFontSize;
};

/**
 * Makes a span with the given list of classes, list of children, and options.
 *
 * TODO: Ensure that `options` is always provided (currently some call sites
 * don't pass it).
 * TODO: add a separate argument for math class (e.g. `mop`, `mbin`), which
 * should if present come first in `classes`.
 */
var makeSpan = function(classes, children, options) {
    var span = new domTree.span(classes, children, options);

    sizeElementFromChildren(span);

    return span;
};

/**
 * Prepends the given children to the given span, updating height, depth, and
 * maxFontSize.
 */
var prependChildren = function(span, children) {
    span.children = children.concat(span.children);

    sizeElementFromChildren(span);
};

/**
 * Makes a document fragment with the given list of children.
 */
var makeFragment = function(children) {
    var fragment = new domTree.documentFragment(children);

    sizeElementFromChildren(fragment);

    return fragment;
};

/**
 * Makes an element placed in each of the vlist elements to ensure that each
 * element has the same max font size. To do this, we create a zero-width space
 * with the correct font size.
 */
var makeFontSizer = function(options, fontSize) {
    var fontSizeInner = makeSpan([], [new domTree.symbolNode("\u200b")]);
    fontSizeInner.style.fontSize =
        (fontSize / options.style.sizeMultiplier) + "em";

    var fontSizer = makeSpan(
        ["fontsize-ensurer", "reset-" + options.size, "size5"],
        [fontSizeInner]);

    return fontSizer;
};

/**
 * Makes a vertical list by stacking elements and kerns on top of each other.
 * Allows for many different ways of specifying the positioning method.
 *
 * Arguments:
 *  - children: A list of child or kern nodes to be stacked on top of each other
 *              (i.e. the first element will be at the bottom, and the last at
 *              the top). Element nodes are specified as
 *                {type: "elem", elem: node}
 *              while kern nodes are specified as
 *                {type: "kern", size: size}
 *  - positionType: The method by which the vlist should be positioned. Valid
 *                  values are:
 *                   - "individualShift": The children list only contains elem
 *                                        nodes, and each node contains an extra
 *                                        "shift" value of how much it should be
 *                                        shifted (note that shifting is always
 *                                        moving downwards). positionData is
 *                                        ignored.
 *                   - "top": The positionData specifies the topmost point of
 *                            the vlist (note this is expected to be a height,
 *                            so positive values move up)
 *                   - "bottom": The positionData specifies the bottommost point
 *                               of the vlist (note this is expected to be a
 *                               depth, so positive values move down
 *                   - "shift": The vlist will be positioned such that its
 *                              baseline is positionData away from the baseline
 *                              of the first child. Positive values move
 *                              downwards.
 *                   - "firstBaseline": The vlist will be positioned such that
 *                                      its baseline is aligned with the
 *                                      baseline of the first child.
 *                                      positionData is ignored. (this is
 *                                      equivalent to "shift" with
 *                                      positionData=0)
 *  - positionData: Data used in different ways depending on positionType
 *  - options: An Options object
 *
 */
var makeVList = function(children, positionType, positionData, options) {
    var depth;
    var currPos;
    var i;
    if (positionType === "individualShift") {
        var oldChildren = children;
        children = [oldChildren[0]];

        // Add in kerns to the list of children to get each element to be
        // shifted to the correct specified shift
        depth = -oldChildren[0].shift - oldChildren[0].elem.depth;
        currPos = depth;
        for (i = 1; i < oldChildren.length; i++) {
            var diff = -oldChildren[i].shift - currPos -
                oldChildren[i].elem.depth;
            var size = diff -
                (oldChildren[i - 1].elem.height +
                 oldChildren[i - 1].elem.depth);

            currPos = currPos + diff;

            children.push({type: "kern", size: size});
            children.push(oldChildren[i]);
        }
    } else if (positionType === "top") {
        // We always start at the bottom, so calculate the bottom by adding up
        // all the sizes
        var bottom = positionData;
        for (i = 0; i < children.length; i++) {
            if (children[i].type === "kern") {
                bottom -= children[i].size;
            } else {
                bottom -= children[i].elem.height + children[i].elem.depth;
            }
        }
        depth = bottom;
    } else if (positionType === "bottom") {
        depth = -positionData;
    } else if (positionType === "shift") {
        depth = -children[0].elem.depth - positionData;
    } else if (positionType === "firstBaseline") {
        depth = -children[0].elem.depth;
    } else {
        depth = 0;
    }

    // Make the fontSizer
    var maxFontSize = 0;
    for (i = 0; i < children.length; i++) {
        if (children[i].type === "elem") {
            maxFontSize = Math.max(maxFontSize, children[i].elem.maxFontSize);
        }
    }
    var fontSizer = makeFontSizer(options, maxFontSize);

    // Create a new list of actual children at the correct offsets
    var realChildren = [];
    currPos = depth;
    for (i = 0; i < children.length; i++) {
        if (children[i].type === "kern") {
            currPos += children[i].size;
        } else {
            var child = children[i].elem;

            var shift = -child.depth - currPos;
            currPos += child.height + child.depth;

            var childWrap = makeSpan([], [fontSizer, child]);
            childWrap.height -= shift;
            childWrap.depth += shift;
            childWrap.style.top = shift + "em";

            realChildren.push(childWrap);
        }
    }

    // Add in an element at the end with no offset to fix the calculation of
    // baselines in some browsers (namely IE, sometimes safari)
    var baselineFix = makeSpan(
        ["baseline-fix"], [fontSizer, new domTree.symbolNode("\u200b")]);
    realChildren.push(baselineFix);

    var vlist = makeSpan(["vlist"], realChildren);
    // Fix the final height and depth, in case there were kerns at the ends
    // since the makeSpan calculation won't take that in to account.
    vlist.height = Math.max(currPos, vlist.height);
    vlist.depth = Math.max(-depth, vlist.depth);
    return vlist;
};

// A table of size -> font size for the different sizing functions
var sizingMultiplier = {
    size1: 0.5,
    size2: 0.7,
    size3: 0.8,
    size4: 0.9,
    size5: 1.0,
    size6: 1.2,
    size7: 1.44,
    size8: 1.73,
    size9: 2.07,
    size10: 2.49
};

// A map of spacing functions to their attributes, like size and corresponding
// CSS class
var spacingFunctions = {
    "\\qquad": {
        size: "2em",
        className: "qquad"
    },
    "\\quad": {
        size: "1em",
        className: "quad"
    },
    "\\enspace": {
        size: "0.5em",
        className: "enspace"
    },
    "\\;": {
        size: "0.277778em",
        className: "thickspace"
    },
    "\\:": {
        size: "0.22222em",
        className: "mediumspace"
    },
    "\\,": {
        size: "0.16667em",
        className: "thinspace"
    },
    "\\!": {
        size: "-0.16667em",
        className: "negativethinspace"
    }
};

/**
 * Maps TeX font commands to objects containing:
 * - variant: string used for "mathvariant" attribute in buildMathML.js
 * - fontName: the "style" parameter to fontMetrics.getCharacterMetrics
 */
// A map between tex font commands an MathML mathvariant attribute values
var fontMap = {
    // styles
    "mathbf": {
        variant: "bold",
        fontName: "Main-Bold"
    },
    "mathrm": {
        variant: "normal",
        fontName: "Main-Regular"
    },
    "textit": {
        variant: "italic",
        fontName: "Main-Italic"
    },

    // "mathit" is missing because it requires the use of two fonts: Main-Italic
    // and Math-Italic.  This is handled by a special case in makeOrd which ends
    // up calling mathit.

    // families
    "mathbb": {
        variant: "double-struck",
        fontName: "AMS-Regular"
    },
    "mathcal": {
        variant: "script",
        fontName: "Caligraphic-Regular"
    },
    "mathfrak": {
        variant: "fraktur",
        fontName: "Fraktur-Regular"
    },
    "mathscr": {
        variant: "script",
        fontName: "Script-Regular"
    },
    "mathsf": {
        variant: "sans-serif",
        fontName: "SansSerif-Regular"
    },
    "mathtt": {
        variant: "monospace",
        fontName: "Typewriter-Regular"
    }
};

module.exports = {
    fontMap: fontMap,
    makeSymbol: makeSymbol,
    mathsym: mathsym,
    makeSpan: makeSpan,
    makeFragment: makeFragment,
    makeVList: makeVList,
    makeOrd: makeOrd,
    prependChildren: prependChildren,
    sizingMultiplier: sizingMultiplier,
    spacingFunctions: spacingFunctions
};


/***/ }),

/***/ "./node_modules/katex/src/buildHTML.js":
/*!*********************************************!*\
  !*** ./node_modules/katex/src/buildHTML.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-console:0 */
/**
 * This file does the main work of building a domTree structure from a parse
 * tree. The entry point is the `buildHTML` function, which takes a parse tree.
 * Then, the buildExpression, buildGroup, and various groupTypes functions are
 * called, to produce a final HTML tree.
 */

var ParseError = __webpack_require__(/*! ./ParseError */ "./node_modules/katex/src/ParseError.js");
var Style = __webpack_require__(/*! ./Style */ "./node_modules/katex/src/Style.js");

var buildCommon = __webpack_require__(/*! ./buildCommon */ "./node_modules/katex/src/buildCommon.js");
var delimiter = __webpack_require__(/*! ./delimiter */ "./node_modules/katex/src/delimiter.js");
var domTree = __webpack_require__(/*! ./domTree */ "./node_modules/katex/src/domTree.js");
var fontMetrics = __webpack_require__(/*! ./fontMetrics */ "./node_modules/katex/src/fontMetrics.js");
var utils = __webpack_require__(/*! ./utils */ "./node_modules/katex/src/utils.js");

var makeSpan = buildCommon.makeSpan;

var isSpace = function(node) {
    return node instanceof domTree.span && node.classes[0] === "mspace";
};

// Binary atoms (first class `mbin`) change into ordinary atoms (`mord`)
// depending on their surroundings. See TeXbook pg. 442-446, Rules 5 and 6,
// and the text before Rule 19.

var isBin = function(node) {
    return node && node.classes[0] === "mbin";
};

var isBinLeftCanceller = function(node, isRealGroup) {
    // TODO: This code assumes that a node's math class is the first element
    // of its `classes` array. A later cleanup should ensure this, for
    // instance by changing the signature of `makeSpan`.
    if (node) {
        return utils.contains(["mbin", "mopen", "mrel", "mop", "mpunct"],
                              node.classes[0]);
    } else {
        return isRealGroup;
    }
};

var isBinRightCanceller = function(node, isRealGroup) {
    if (node) {
        return utils.contains(["mrel", "mclose", "mpunct"], node.classes[0]);
    } else {
        return isRealGroup;
    }
};

/**
 * Take a list of nodes, build them in order, and return a list of the built
 * nodes. documentFragments are flattened into their contents, so the
 * returned list contains no fragments. `isRealGroup` is true if `expression`
 * is a real group (no atoms will be added on either side), as opposed to
 * a partial group (e.g. one created by \color).
 */
var buildExpression = function(expression, options, isRealGroup) {
    // Parse expressions into `groups`.
    var groups = [];
    for (var i = 0; i < expression.length; i++) {
        var group = expression[i];
        var output = buildGroup(group, options);
        if (output instanceof domTree.documentFragment) {
            Array.prototype.push.apply(groups, output.children);
        } else {
            groups.push(output);
        }
    }
    // At this point `groups` consists entirely of `symbolNode`s and `span`s.

    // Explicit spaces (e.g., \;, \,) should be ignored with respect to atom
    // spacing (e.g., "add thick space between mord and mrel"). Since CSS
    // adjacency rules implement atom spacing, spaces should be invisible to
    // CSS. So we splice them out of `groups` and into the atoms themselves.
    var spaces = null;
    for (i = 0; i < groups.length; i++) {
        if (isSpace(groups[i])) {
            spaces = spaces || [];
            spaces.push(groups[i]);
            groups.splice(i, 1);
            i--;
        } else if (spaces) {
            if (groups[i] instanceof domTree.symbolNode) {
                groups[i] = makeSpan([].concat(groups[i].classes), [groups[i]]);
            }
            buildCommon.prependChildren(groups[i], spaces);
            spaces = null;
        }
    }
    if (spaces) {
        Array.prototype.push.apply(groups, spaces);
    }

    // Binary operators change to ordinary symbols in some contexts.
    for (i = 0; i < groups.length; i++) {
        if (isBin(groups[i])
            && (isBinLeftCanceller(groups[i - 1], isRealGroup)
                || isBinRightCanceller(groups[i + 1], isRealGroup))) {
            groups[i].classes[0] = "mord";
        }
    }

    return groups;
};

// Return math atom class (mclass) of a domTree.
var getTypeOfDomTree = function(node) {
    if (node instanceof domTree.documentFragment) {
        if (node.children.length) {
            return getTypeOfDomTree(
                node.children[node.children.length - 1]);
        }
    } else {
        if (utils.contains(["mord", "mop", "mbin", "mrel", "mopen", "mclose",
            "mpunct", "minner"], node.classes[0])) {
            return node.classes[0];
        }
    }
    return null;
};

/**
 * Sometimes, groups perform special rules when they have superscripts or
 * subscripts attached to them. This function lets the `supsub` group know that
 * its inner element should handle the superscripts and subscripts instead of
 * handling them itself.
 */
var shouldHandleSupSub = function(group, options) {
    if (!group) {
        return false;
    } else if (group.type === "op") {
        // Operators handle supsubs differently when they have limits
        // (e.g. `\displaystyle\sum_2^3`)
        return group.value.limits &&
            (options.style.size === Style.DISPLAY.size ||
            group.value.alwaysHandleSupSub);
    } else if (group.type === "accent") {
        return isCharacterBox(group.value.base);
    } else {
        return null;
    }
};

/**
 * Sometimes we want to pull out the innermost element of a group. In most
 * cases, this will just be the group itself, but when ordgroups and colors have
 * a single element, we want to pull that out.
 */
var getBaseElem = function(group) {
    if (!group) {
        return false;
    } else if (group.type === "ordgroup") {
        if (group.value.length === 1) {
            return getBaseElem(group.value[0]);
        } else {
            return group;
        }
    } else if (group.type === "color") {
        if (group.value.value.length === 1) {
            return getBaseElem(group.value.value[0]);
        } else {
            return group;
        }
    } else if (group.type === "font") {
        return getBaseElem(group.value.body);
    } else {
        return group;
    }
};

/**
 * TeXbook algorithms often reference "character boxes", which are simply groups
 * with a single character in them. To decide if something is a character box,
 * we find its innermost group, and see if it is a single character.
 */
var isCharacterBox = function(group) {
    var baseElem = getBaseElem(group);

    // These are all they types of groups which hold single characters
    return baseElem.type === "mathord" ||
        baseElem.type === "textord" ||
        baseElem.type === "bin" ||
        baseElem.type === "rel" ||
        baseElem.type === "inner" ||
        baseElem.type === "open" ||
        baseElem.type === "close" ||
        baseElem.type === "punct";
};

var makeNullDelimiter = function(options, classes) {
    return makeSpan(classes.concat([
        "sizing", "reset-" + options.size, "size5",
        options.style.reset(), Style.TEXT.cls(),
        "nulldelimiter"]));
};

/**
 * This is a map of group types to the function used to handle that type.
 * Simpler types come at the beginning, while complicated types come afterwards.
 */
var groupTypes = {};

groupTypes.mathord = function(group, options) {
    return buildCommon.makeOrd(group, options, "mathord");
};

groupTypes.textord = function(group, options) {
    return buildCommon.makeOrd(group, options, "textord");
};

groupTypes.bin = function(group, options) {
    return buildCommon.mathsym(
        group.value, group.mode, options, ["mbin"]);
};

groupTypes.rel = function(group, options) {
    return buildCommon.mathsym(
        group.value, group.mode, options, ["mrel"]);
};

groupTypes.open = function(group, options) {
    return buildCommon.mathsym(
        group.value, group.mode, options, ["mopen"]);
};

groupTypes.close = function(group, options) {
    return buildCommon.mathsym(
        group.value, group.mode, options, ["mclose"]);
};

groupTypes.inner = function(group, options) {
    return buildCommon.mathsym(
        group.value, group.mode, options, ["minner"]);
};

groupTypes.punct = function(group, options) {
    return buildCommon.mathsym(
        group.value, group.mode, options, ["mpunct"]);
};

groupTypes.ordgroup = function(group, options) {
    return makeSpan(
        ["mord", options.style.cls()],
        buildExpression(group.value, options.reset(), true),
        options
    );
};

groupTypes.text = function(group, options) {
    var newOptions = options.withFont(group.value.style);
    var inner = buildExpression(group.value.body, newOptions, true);
    for (var i = 0; i < inner.length - 1; i++) {
        if (inner[i].tryCombine(inner[i + 1])) {
            inner.splice(i + 1, 1);
            i--;
        }
    }
    return makeSpan(["mord", "text", newOptions.style.cls()],
        inner, newOptions);
};

groupTypes.color = function(group, options) {
    var elements = buildExpression(
        group.value.value,
        options.withColor(group.value.color),
        false
    );

    // \color isn't supposed to affect the type of the elements it contains.
    // To accomplish this, we wrap the results in a fragment, so the inner
    // elements will be able to directly interact with their neighbors. For
    // example, `\color{red}{2 +} 3` has the same spacing as `2 + 3`
    return new buildCommon.makeFragment(elements);
};

groupTypes.supsub = function(group, options) {
    // Superscript and subscripts are handled in the TeXbook on page
    // 445-446, rules 18(a-f).

    // Here is where we defer to the inner group if it should handle
    // superscripts and subscripts itself.
    if (shouldHandleSupSub(group.value.base, options)) {
        return groupTypes[group.value.base.type](group, options);
    }

    var base = buildGroup(group.value.base, options.reset());
    var supmid;
    var submid;
    var sup;
    var sub;

    var style = options.style;
    var newOptions;

    if (group.value.sup) {
        newOptions = options.withStyle(style.sup());
        sup = buildGroup(group.value.sup, newOptions);
        supmid = makeSpan([style.reset(), style.sup().cls()],
            [sup], newOptions);
    }

    if (group.value.sub) {
        newOptions = options.withStyle(style.sub());
        sub = buildGroup(group.value.sub, newOptions);
        submid = makeSpan([style.reset(), style.sub().cls()],
            [sub], newOptions);
    }

    // Rule 18a
    var supShift;
    var subShift;
    if (isCharacterBox(group.value.base)) {
        supShift = 0;
        subShift = 0;
    } else {
        supShift = base.height - style.metrics.supDrop;
        subShift = base.depth + style.metrics.subDrop;
    }

    // Rule 18c
    var minSupShift;
    if (style === Style.DISPLAY) {
        minSupShift = style.metrics.sup1;
    } else if (style.cramped) {
        minSupShift = style.metrics.sup3;
    } else {
        minSupShift = style.metrics.sup2;
    }

    // scriptspace is a font-size-independent size, so scale it
    // appropriately
    var multiplier = Style.TEXT.sizeMultiplier *
            style.sizeMultiplier;
    var scriptspace =
        (0.5 / fontMetrics.metrics.ptPerEm) / multiplier + "em";

    var supsub;
    if (!group.value.sup) {
        // Rule 18b
        subShift = Math.max(
            subShift, style.metrics.sub1,
            sub.height - 0.8 * style.metrics.xHeight);

        supsub = buildCommon.makeVList([
            {type: "elem", elem: submid}
        ], "shift", subShift, options);

        supsub.children[0].style.marginRight = scriptspace;

        // Subscripts shouldn't be shifted by the base's italic correction.
        // Account for that by shifting the subscript back the appropriate
        // amount. Note we only do this when the base is a single symbol.
        if (base instanceof domTree.symbolNode) {
            supsub.children[0].style.marginLeft = -base.italic + "em";
        }
    } else if (!group.value.sub) {
        // Rule 18c, d
        supShift = Math.max(supShift, minSupShift,
            sup.depth + 0.25 * style.metrics.xHeight);

        supsub = buildCommon.makeVList([
            {type: "elem", elem: supmid}
        ], "shift", -supShift, options);

        supsub.children[0].style.marginRight = scriptspace;
    } else {
        supShift = Math.max(
            supShift, minSupShift, sup.depth + 0.25 * style.metrics.xHeight);
        subShift = Math.max(subShift, style.metrics.sub2);

        var ruleWidth = fontMetrics.metrics.defaultRuleThickness;

        // Rule 18e
        if ((supShift - sup.depth) - (sub.height - subShift) <
                4 * ruleWidth) {
            subShift = 4 * ruleWidth - (supShift - sup.depth) + sub.height;
            var psi = 0.8 * style.metrics.xHeight - (supShift - sup.depth);
            if (psi > 0) {
                supShift += psi;
                subShift -= psi;
            }
        }

        supsub = buildCommon.makeVList([
            {type: "elem", elem: submid, shift: subShift},
            {type: "elem", elem: supmid, shift: -supShift}
        ], "individualShift", null, options);

        // See comment above about subscripts not being shifted
        if (base instanceof domTree.symbolNode) {
            supsub.children[0].style.marginLeft = -base.italic + "em";
        }

        supsub.children[0].style.marginRight = scriptspace;
        supsub.children[1].style.marginRight = scriptspace;
    }

    // We ensure to wrap the supsub vlist in a span.msupsub to reset text-align
    var mclass = getTypeOfDomTree(base) || "mord";
    return makeSpan([mclass],
        [base, makeSpan(["msupsub"], [supsub])],
        options);
};

groupTypes.genfrac = function(group, options) {
    // Fractions are handled in the TeXbook on pages 444-445, rules 15(a-e).
    // Figure out what style this fraction should be in based on the
    // function used
    var style = options.style;
    if (group.value.size === "display") {
        style = Style.DISPLAY;
    } else if (group.value.size === "text") {
        style = Style.TEXT;
    }

    var nstyle = style.fracNum();
    var dstyle = style.fracDen();
    var newOptions;

    newOptions = options.withStyle(nstyle);
    var numer = buildGroup(group.value.numer, newOptions);
    var numerreset = makeSpan([style.reset(), nstyle.cls()],
        [numer], newOptions);

    newOptions = options.withStyle(dstyle);
    var denom = buildGroup(group.value.denom, newOptions);
    var denomreset = makeSpan([style.reset(), dstyle.cls()],
        [denom], newOptions);

    var ruleWidth;
    if (group.value.hasBarLine) {
        ruleWidth = fontMetrics.metrics.defaultRuleThickness /
            options.style.sizeMultiplier;
    } else {
        ruleWidth = 0;
    }

    // Rule 15b
    var numShift;
    var clearance;
    var denomShift;
    if (style.size === Style.DISPLAY.size) {
        numShift = style.metrics.num1;
        if (ruleWidth > 0) {
            clearance = 3 * ruleWidth;
        } else {
            clearance = 7 * fontMetrics.metrics.defaultRuleThickness;
        }
        denomShift = style.metrics.denom1;
    } else {
        if (ruleWidth > 0) {
            numShift = style.metrics.num2;
            clearance = ruleWidth;
        } else {
            numShift = style.metrics.num3;
            clearance = 3 * fontMetrics.metrics.defaultRuleThickness;
        }
        denomShift = style.metrics.denom2;
    }

    var frac;
    if (ruleWidth === 0) {
        // Rule 15c
        var candidateClearance =
            (numShift - numer.depth) - (denom.height - denomShift);
        if (candidateClearance < clearance) {
            numShift += 0.5 * (clearance - candidateClearance);
            denomShift += 0.5 * (clearance - candidateClearance);
        }

        frac = buildCommon.makeVList([
            {type: "elem", elem: denomreset, shift: denomShift},
            {type: "elem", elem: numerreset, shift: -numShift}
        ], "individualShift", null, options);
    } else {
        // Rule 15d
        var axisHeight = style.metrics.axisHeight;

        if ((numShift - numer.depth) - (axisHeight + 0.5 * ruleWidth) <
                clearance) {
            numShift +=
                clearance - ((numShift - numer.depth) -
                             (axisHeight + 0.5 * ruleWidth));
        }

        if ((axisHeight - 0.5 * ruleWidth) - (denom.height - denomShift) <
                clearance) {
            denomShift +=
                clearance - ((axisHeight - 0.5 * ruleWidth) -
                             (denom.height - denomShift));
        }

        var mid = makeSpan(
            [options.style.reset(), Style.TEXT.cls(), "frac-line"]);
        // Manually set the height of the line because its height is
        // created in CSS
        mid.height = ruleWidth;

        var midShift = -(axisHeight - 0.5 * ruleWidth);

        frac = buildCommon.makeVList([
            {type: "elem", elem: denomreset, shift: denomShift},
            {type: "elem", elem: mid,        shift: midShift},
            {type: "elem", elem: numerreset, shift: -numShift}
        ], "individualShift", null, options);
    }

    // Since we manually change the style sometimes (with \dfrac or \tfrac),
    // account for the possible size change here.
    frac.height *= style.sizeMultiplier / options.style.sizeMultiplier;
    frac.depth *= style.sizeMultiplier / options.style.sizeMultiplier;

    // Rule 15e
    var delimSize;
    if (style.size === Style.DISPLAY.size) {
        delimSize = style.metrics.delim1;
    } else {
        delimSize = style.metrics.delim2;
    }

    var leftDelim;
    var rightDelim;
    if (group.value.leftDelim == null) {
        leftDelim = makeNullDelimiter(options, ["mopen"]);
    } else {
        leftDelim = delimiter.customSizedDelim(
            group.value.leftDelim, delimSize, true,
            options.withStyle(style), group.mode, ["mopen"]);
    }
    if (group.value.rightDelim == null) {
        rightDelim = makeNullDelimiter(options, ["mclose"]);
    } else {
        rightDelim = delimiter.customSizedDelim(
            group.value.rightDelim, delimSize, true,
            options.withStyle(style), group.mode, ["mclose"]);
    }

    return makeSpan(
        ["mord", options.style.reset(), style.cls()],
        [leftDelim, makeSpan(["mfrac"], [frac]), rightDelim],
        options);
};

var calculateSize = function(sizeValue, style) {
    var x = sizeValue.number;
    if (sizeValue.unit === "ex") {
        x *= style.metrics.emPerEx;
    } else if (sizeValue.unit === "mu") {
        x /= 18;
    }
    return x;
};

groupTypes.array = function(group, options) {
    var r;
    var c;
    var nr = group.value.body.length;
    var nc = 0;
    var body = new Array(nr);

    var style = options.style;

    // Horizontal spacing
    var pt = 1 / fontMetrics.metrics.ptPerEm;
    var arraycolsep = 5 * pt; // \arraycolsep in article.cls

    // Vertical spacing
    var baselineskip = 12 * pt; // see size10.clo
    // Default \arraystretch from lttab.dtx
    // TODO(gagern): may get redefined once we have user-defined macros
    var arraystretch = utils.deflt(group.value.arraystretch, 1);
    var arrayskip = arraystretch * baselineskip;
    var arstrutHeight = 0.7 * arrayskip; // \strutbox in ltfsstrc.dtx and
    var arstrutDepth = 0.3 * arrayskip;  // \@arstrutbox in lttab.dtx

    var totalHeight = 0;
    for (r = 0; r < group.value.body.length; ++r) {
        var inrow = group.value.body[r];
        var height = arstrutHeight; // \@array adds an \@arstrut
        var depth = arstrutDepth;   // to each tow (via the template)

        if (nc < inrow.length) {
            nc = inrow.length;
        }

        var outrow = new Array(inrow.length);
        for (c = 0; c < inrow.length; ++c) {
            var elt = buildGroup(inrow[c], options);
            if (depth < elt.depth) {
                depth = elt.depth;
            }
            if (height < elt.height) {
                height = elt.height;
            }
            outrow[c] = elt;
        }

        var gap = 0;
        if (group.value.rowGaps[r]) {
            gap = calculateSize(group.value.rowGaps[r].value, style);
            if (gap > 0) { // \@argarraycr
                gap += arstrutDepth;
                if (depth < gap) {
                    depth = gap; // \@xargarraycr
                }
                gap = 0;
            }
        }

        outrow.height = height;
        outrow.depth = depth;
        totalHeight += height;
        outrow.pos = totalHeight;
        totalHeight += depth + gap; // \@yargarraycr
        body[r] = outrow;
    }

    var offset = totalHeight / 2 + style.metrics.axisHeight;
    var colDescriptions = group.value.cols || [];
    var cols = [];
    var colSep;
    var colDescrNum;
    for (c = 0, colDescrNum = 0;
         // Continue while either there are more columns or more column
         // descriptions, so trailing separators don't get lost.
         c < nc || colDescrNum < colDescriptions.length;
         ++c, ++colDescrNum) {

        var colDescr = colDescriptions[colDescrNum] || {};

        var firstSeparator = true;
        while (colDescr.type === "separator") {
            // If there is more than one separator in a row, add a space
            // between them.
            if (!firstSeparator) {
                colSep = makeSpan(["arraycolsep"], []);
                colSep.style.width =
                    fontMetrics.metrics.doubleRuleSep + "em";
                cols.push(colSep);
            }

            if (colDescr.separator === "|") {
                var separator = makeSpan(
                    ["vertical-separator"],
                    []);
                separator.style.height = totalHeight + "em";
                separator.style.verticalAlign =
                    -(totalHeight - offset) + "em";

                cols.push(separator);
            } else {
                throw new ParseError(
                    "Invalid separator type: " + colDescr.separator);
            }

            colDescrNum++;
            colDescr = colDescriptions[colDescrNum] || {};
            firstSeparator = false;
        }

        if (c >= nc) {
            continue;
        }

        var sepwidth;
        if (c > 0 || group.value.hskipBeforeAndAfter) {
            sepwidth = utils.deflt(colDescr.pregap, arraycolsep);
            if (sepwidth !== 0) {
                colSep = makeSpan(["arraycolsep"], []);
                colSep.style.width = sepwidth + "em";
                cols.push(colSep);
            }
        }

        var col = [];
        for (r = 0; r < nr; ++r) {
            var row = body[r];
            var elem = row[c];
            if (!elem) {
                continue;
            }
            var shift = row.pos - offset;
            elem.depth = row.depth;
            elem.height = row.height;
            col.push({type: "elem", elem: elem, shift: shift});
        }

        col = buildCommon.makeVList(col, "individualShift", null, options);
        col = makeSpan(
            ["col-align-" + (colDescr.align || "c")],
            [col]);
        cols.push(col);

        if (c < nc - 1 || group.value.hskipBeforeAndAfter) {
            sepwidth = utils.deflt(colDescr.postgap, arraycolsep);
            if (sepwidth !== 0) {
                colSep = makeSpan(["arraycolsep"], []);
                colSep.style.width = sepwidth + "em";
                cols.push(colSep);
            }
        }
    }
    body = makeSpan(["mtable"], cols);
    return makeSpan(["mord"], [body], options);
};

groupTypes.spacing = function(group, options) {
    if (group.value === "\\ " || group.value === "\\space" ||
        group.value === " " || group.value === "~") {
        // Spaces are generated by adding an actual space. Each of these
        // things has an entry in the symbols table, so these will be turned
        // into appropriate outputs.
        if (group.mode === "text") {
            return buildCommon.makeOrd(group, options, "textord");
        } else {
            return makeSpan(["mspace"],
                [buildCommon.mathsym(group.value, group.mode, options)],
                options);
        }
    } else {
        // Other kinds of spaces are of arbitrary width. We use CSS to
        // generate these.
        return makeSpan(
            ["mspace",
                buildCommon.spacingFunctions[group.value].className],
            [], options);
    }
};

groupTypes.llap = function(group, options) {
    var inner = makeSpan(
        ["inner"], [buildGroup(group.value.body, options.reset())]);
    var fix = makeSpan(["fix"], []);
    return makeSpan(
        ["mord", "llap", options.style.cls()], [inner, fix], options);
};

groupTypes.rlap = function(group, options) {
    var inner = makeSpan(
        ["inner"], [buildGroup(group.value.body, options.reset())]);
    var fix = makeSpan(["fix"], []);
    return makeSpan(
        ["mord", "rlap", options.style.cls()], [inner, fix], options);
};

groupTypes.op = function(group, options) {
    // Operators are handled in the TeXbook pg. 443-444, rule 13(a).
    var supGroup;
    var subGroup;
    var hasLimits = false;
    if (group.type === "supsub") {
        // If we have limits, supsub will pass us its group to handle. Pull
        // out the superscript and subscript and set the group to the op in
        // its base.
        supGroup = group.value.sup;
        subGroup = group.value.sub;
        group = group.value.base;
        hasLimits = true;
    }

    var style = options.style;

    // Most operators have a large successor symbol, but these don't.
    var noSuccessor = [
        "\\smallint"
    ];

    var large = false;
    if (style.size === Style.DISPLAY.size &&
        group.value.symbol &&
        !utils.contains(noSuccessor, group.value.body)) {

        // Most symbol operators get larger in displaystyle (rule 13)
        large = true;
    }

    var base;
    var baseShift = 0;
    var slant = 0;
    if (group.value.symbol) {
        // If this is a symbol, create the symbol.
        var fontName = large ? "Size2-Regular" : "Size1-Regular";
        base = buildCommon.makeSymbol(
            group.value.body, fontName, "math", options,
            ["mop", "op-symbol", large ? "large-op" : "small-op"]);

        // Shift the symbol so its center lies on the axis (rule 13). It
        // appears that our fonts have the centers of the symbols already
        // almost on the axis, so these numbers are very small. Note we
        // don't actually apply this here, but instead it is used either in
        // the vlist creation or separately when there are no limits.
        baseShift = (base.height - base.depth) / 2 -
            style.metrics.axisHeight * style.sizeMultiplier;

        // The slant of the symbol is just its italic correction.
        slant = base.italic;
    } else if (group.value.value) {
        // If this is a list, compose that list.
        var inner = buildExpression(group.value.value, options, true);

        base = makeSpan(["mop"], inner, options);
    } else {
        // Otherwise, this is a text operator. Build the text from the
        // operator's name.
        // TODO(emily): Add a space in the middle of some of these
        // operators, like \limsup
        var output = [];
        for (var i = 1; i < group.value.body.length; i++) {
            output.push(buildCommon.mathsym(group.value.body[i], group.mode));
        }
        base = makeSpan(["mop"], output, options);
    }

    if (hasLimits) {
        // IE 8 clips \int if it is in a display: inline-block. We wrap it
        // in a new span so it is an inline, and works.
        base = makeSpan([], [base]);

        var supmid;
        var supKern;
        var submid;
        var subKern;
        var newOptions;
        // We manually have to handle the superscripts and subscripts. This,
        // aside from the kern calculations, is copied from supsub.
        if (supGroup) {
            newOptions = options.withStyle(style.sup());
            var sup = buildGroup(supGroup, newOptions);
            supmid = makeSpan([style.reset(), style.sup().cls()],
                [sup], newOptions);

            supKern = Math.max(
                fontMetrics.metrics.bigOpSpacing1,
                fontMetrics.metrics.bigOpSpacing3 - sup.depth);
        }

        if (subGroup) {
            newOptions = options.withStyle(style.sub());
            var sub = buildGroup(subGroup, newOptions);
            submid = makeSpan([style.reset(), style.sub().cls()],
                [sub], newOptions);

            subKern = Math.max(
                fontMetrics.metrics.bigOpSpacing2,
                fontMetrics.metrics.bigOpSpacing4 - sub.height);
        }

        // Build the final group as a vlist of the possible subscript, base,
        // and possible superscript.
        var finalGroup;
        var top;
        var bottom;
        if (!supGroup) {
            top = base.height - baseShift;

            finalGroup = buildCommon.makeVList([
                {type: "kern", size: fontMetrics.metrics.bigOpSpacing5},
                {type: "elem", elem: submid},
                {type: "kern", size: subKern},
                {type: "elem", elem: base}
            ], "top", top, options);

            // Here, we shift the limits by the slant of the symbol. Note
            // that we are supposed to shift the limits by 1/2 of the slant,
            // but since we are centering the limits adding a full slant of
            // margin will shift by 1/2 that.
            finalGroup.children[0].style.marginLeft = -slant + "em";
        } else if (!subGroup) {
            bottom = base.depth + baseShift;

            finalGroup = buildCommon.makeVList([
                {type: "elem", elem: base},
                {type: "kern", size: supKern},
                {type: "elem", elem: supmid},
                {type: "kern", size: fontMetrics.metrics.bigOpSpacing5}
            ], "bottom", bottom, options);

            // See comment above about slants
            finalGroup.children[1].style.marginLeft = slant + "em";
        } else if (!supGroup && !subGroup) {
            // This case probably shouldn't occur (this would mean the
            // supsub was sending us a group with no superscript or
            // subscript) but be safe.
            return base;
        } else {
            bottom = fontMetrics.metrics.bigOpSpacing5 +
                submid.height + submid.depth +
                subKern +
                base.depth + baseShift;

            finalGroup = buildCommon.makeVList([
                {type: "kern", size: fontMetrics.metrics.bigOpSpacing5},
                {type: "elem", elem: submid},
                {type: "kern", size: subKern},
                {type: "elem", elem: base},
                {type: "kern", size: supKern},
                {type: "elem", elem: supmid},
                {type: "kern", size: fontMetrics.metrics.bigOpSpacing5}
            ], "bottom", bottom, options);

            // See comment above about slants
            finalGroup.children[0].style.marginLeft = -slant + "em";
            finalGroup.children[2].style.marginLeft = slant + "em";
        }

        return makeSpan(["mop", "op-limits"], [finalGroup], options);
    } else {
        if (group.value.symbol) {
            base.style.top = baseShift + "em";
        }

        return base;
    }
};

groupTypes.mod = function(group, options) {
    var inner = [];

    if (group.value.modType === "bmod") {
        // “\nonscript\mskip-\medmuskip\mkern5mu”
        if (!options.style.isTight()) {
            inner.push(makeSpan(
                ["mspace", "negativemediumspace"], [], options));
        }
        inner.push(makeSpan(["mspace", "thickspace"], [], options));
    } else if (options.style.size === Style.DISPLAY.size) {
        inner.push(makeSpan(["mspace", "quad"], [], options));
    } else if (group.value.modType === "mod") {
        inner.push(makeSpan(["mspace", "twelvemuspace"], [], options));
    } else {
        inner.push(makeSpan(["mspace", "eightmuspace"], [], options));
    }

    if (group.value.modType === "pod" || group.value.modType === "pmod") {
        inner.push(buildCommon.mathsym("(", group.mode));
    }

    if (group.value.modType !== "pod") {
        var modInner = [
            buildCommon.mathsym("m", group.mode),
            buildCommon.mathsym("o", group.mode),
            buildCommon.mathsym("d", group.mode)];
        if (group.value.modType === "bmod") {
            inner.push(makeSpan(["mbin"], modInner, options));
            // “\mkern5mu\nonscript\mskip-\medmuskip”
            inner.push(makeSpan(["mspace", "thickspace"], [], options));
            if (!options.style.isTight()) {
                inner.push(makeSpan(
                    ["mspace", "negativemediumspace"], [], options));
            }
        } else {
            Array.prototype.push.apply(inner, modInner);
            inner.push(makeSpan(["mspace", "sixmuspace"], [], options));
        }
    }

    if (group.value.value) {
        Array.prototype.push.apply(inner,
            buildExpression(group.value.value, options, false));
    }

    if (group.value.modType === "pod" || group.value.modType === "pmod") {
        inner.push(buildCommon.mathsym(")", group.mode));
    }

    return buildCommon.makeFragment(inner);
};

groupTypes.katex = function(group, options) {
    // The KaTeX logo. The offsets for the K and a were chosen to look
    // good, but the offsets for the T, E, and X were taken from the
    // definition of \TeX in TeX (see TeXbook pg. 356)
    var k = makeSpan(
        ["k"], [buildCommon.mathsym("K", group.mode)], options);
    var a = makeSpan(
        ["a"], [buildCommon.mathsym("A", group.mode)], options);

    a.height = (a.height + 0.2) * 0.75;
    a.depth = (a.height - 0.2) * 0.75;

    var t = makeSpan(
        ["t"], [buildCommon.mathsym("T", group.mode)], options);
    var e = makeSpan(
        ["e"], [buildCommon.mathsym("E", group.mode)], options);

    e.height = (e.height - 0.2155);
    e.depth = (e.depth + 0.2155);

    var x = makeSpan(
        ["x"], [buildCommon.mathsym("X", group.mode)], options);

    return makeSpan(
        ["mord", "katex-logo"], [k, a, t, e, x], options);
};

groupTypes.overline = function(group, options) {
    // Overlines are handled in the TeXbook pg 443, Rule 9.
    var style = options.style;

    // Build the inner group in the cramped style.
    var innerGroup = buildGroup(group.value.body,
            options.withStyle(style.cramp()));

    var ruleWidth = fontMetrics.metrics.defaultRuleThickness /
        style.sizeMultiplier;

    // Create the line above the body
    var line = makeSpan(
        [style.reset(), Style.TEXT.cls(), "overline-line"]);
    line.height = ruleWidth;
    line.maxFontSize = 1.0;

    // Generate the vlist, with the appropriate kerns
    var vlist = buildCommon.makeVList([
        {type: "elem", elem: innerGroup},
        {type: "kern", size: 3 * ruleWidth},
        {type: "elem", elem: line},
        {type: "kern", size: ruleWidth}
    ], "firstBaseline", null, options);

    return makeSpan(["mord", "overline"], [vlist], options);
};

groupTypes.underline = function(group, options) {
    // Underlines are handled in the TeXbook pg 443, Rule 10.
    var style = options.style;

    // Build the inner group.
    var innerGroup = buildGroup(group.value.body, options);

    var ruleWidth = fontMetrics.metrics.defaultRuleThickness /
        style.sizeMultiplier;

    // Create the line above the body
    var line = makeSpan([style.reset(), Style.TEXT.cls(), "underline-line"]);
    line.height = ruleWidth;
    line.maxFontSize = 1.0;

    // Generate the vlist, with the appropriate kerns
    var vlist = buildCommon.makeVList([
        {type: "kern", size: ruleWidth},
        {type: "elem", elem: line},
        {type: "kern", size: 3 * ruleWidth},
        {type: "elem", elem: innerGroup}
    ], "top", innerGroup.height, options);

    return makeSpan(["mord", "underline"], [vlist], options);
};

groupTypes.sqrt = function(group, options) {
    // Square roots are handled in the TeXbook pg. 443, Rule 11.
    var style = options.style;

    // First, we do the same steps as in overline to build the inner group
    // and line
    var inner = buildGroup(group.value.body, options.withStyle(style.cramp()));

    var ruleWidth = fontMetrics.metrics.defaultRuleThickness /
        style.sizeMultiplier;

    var line = makeSpan(
        [style.reset(), Style.TEXT.cls(), "sqrt-line"], [],
        options);
    line.height = ruleWidth;
    line.maxFontSize = 1.0;

    var phi = ruleWidth;
    if (style.id < Style.TEXT.id) {
        phi = style.metrics.xHeight;
    }

    // Calculate the clearance between the body and line
    var lineClearance = ruleWidth + phi / 4;

    var innerHeight = (inner.height + inner.depth) * style.sizeMultiplier;
    var minDelimiterHeight = innerHeight + lineClearance + ruleWidth;

    // Create a \surd delimiter of the required minimum size
    var delim = makeSpan(["sqrt-sign"], [
        delimiter.customSizedDelim("\\surd", minDelimiterHeight,
                                   false, options, group.mode)],
                         options);

    var delimDepth = (delim.height + delim.depth) - ruleWidth;

    // Adjust the clearance based on the delimiter size
    if (delimDepth > inner.height + inner.depth + lineClearance) {
        lineClearance =
            (lineClearance + delimDepth - inner.height - inner.depth) / 2;
    }

    // Shift the delimiter so that its top lines up with the top of the line
    var delimShift = -(inner.height + lineClearance + ruleWidth) + delim.height;
    delim.style.top = delimShift + "em";
    delim.height -= delimShift;
    delim.depth += delimShift;

    // We add a special case here, because even when `inner` is empty, we
    // still get a line. So, we use a simple heuristic to decide if we
    // should omit the body entirely. (note this doesn't work for something
    // like `\sqrt{\rlap{x}}`, but if someone is doing that they deserve for
    // it not to work.
    var body;
    if (inner.height === 0 && inner.depth === 0) {
        body = makeSpan();
    } else {
        body = buildCommon.makeVList([
            {type: "elem", elem: inner},
            {type: "kern", size: lineClearance},
            {type: "elem", elem: line},
            {type: "kern", size: ruleWidth}
        ], "firstBaseline", null, options);
    }

    if (!group.value.index) {
        return makeSpan(["mord", "sqrt"], [delim, body], options);
    } else {
        // Handle the optional root index

        // The index is always in scriptscript style
        var newOptions = options.withStyle(Style.SCRIPTSCRIPT);
        var root = buildGroup(group.value.index, newOptions);
        var rootWrap = makeSpan(
            [style.reset(), Style.SCRIPTSCRIPT.cls()],
            [root],
            newOptions);

        // Figure out the height and depth of the inner part
        var innerRootHeight = Math.max(delim.height, body.height);
        var innerRootDepth = Math.max(delim.depth, body.depth);

        // The amount the index is shifted by. This is taken from the TeX
        // source, in the definition of `\r@@t`.
        var toShift = 0.6 * (innerRootHeight - innerRootDepth);

        // Build a VList with the superscript shifted up correctly
        var rootVList = buildCommon.makeVList(
            [{type: "elem", elem: rootWrap}],
            "shift", -toShift, options);
        // Add a class surrounding it so we can add on the appropriate
        // kerning
        var rootVListWrap = makeSpan(["root"], [rootVList]);

        return makeSpan(["mord", "sqrt"],
            [rootVListWrap, delim, body], options);
    }
};

groupTypes.sizing = function(group, options) {
    // Handle sizing operators like \Huge. Real TeX doesn't actually allow
    // these functions inside of math expressions, so we do some special
    // handling.
    var inner = buildExpression(group.value.value,
            options.withSize(group.value.size), false);

    // Compute the correct maxFontSize.
    var style = options.style;
    var fontSize = buildCommon.sizingMultiplier[group.value.size];
    fontSize = fontSize * style.sizeMultiplier;

    // Add size-resetting classes to the inner list and set maxFontSize
    // manually. Handle nested size changes.
    for (var i = 0; i < inner.length; i++) {
        var pos = utils.indexOf(inner[i].classes, "sizing");
        if (pos < 0) {
            inner[i].classes.push("sizing", "reset-" + options.size,
                                  group.value.size, style.cls());
            inner[i].maxFontSize = fontSize;
        } else if (inner[i].classes[pos + 1] === "reset-" + group.value.size) {
            // This is a nested size change: e.g., inner[i] is the "b" in
            // `\Huge a \small b`. Override the old size (the `reset-` class)
            // but not the new size.
            inner[i].classes[pos + 1] = "reset-" + options.size;
        }
    }

    return buildCommon.makeFragment(inner);
};

groupTypes.styling = function(group, options) {
    // Style changes are handled in the TeXbook on pg. 442, Rule 3.

    // Figure out what style we're changing to.
    var styleMap = {
        "display": Style.DISPLAY,
        "text": Style.TEXT,
        "script": Style.SCRIPT,
        "scriptscript": Style.SCRIPTSCRIPT
    };

    var newStyle = styleMap[group.value.style];
    var newOptions = options.withStyle(newStyle);

    // Build the inner expression in the new style.
    var inner = buildExpression(
        group.value.value, newOptions, false);

    // Add style-resetting classes to the inner list. Handle nested changes.
    for (var i = 0; i < inner.length; i++) {
        var pos = utils.indexOf(inner[i].classes, newStyle.reset());
        if (pos < 0) {
            inner[i].classes.push(options.style.reset(), newStyle.cls());
        } else {
            // This is a nested style change, as `\textstyle a\scriptstyle b`.
            // Only override the old style (the reset class).
            inner[i].classes[pos] = options.style.reset();
        }
    }

    return new buildCommon.makeFragment(inner);
};

groupTypes.font = function(group, options) {
    var font = group.value.font;
    return buildGroup(group.value.body, options.withFont(font));
};

groupTypes.delimsizing = function(group, options) {
    var delim = group.value.value;

    if (delim === ".") {
        // Empty delimiters still count as elements, even though they don't
        // show anything.
        return makeSpan([group.value.mclass]);
    }

    // Use delimiter.sizedDelim to generate the delimiter.
    return delimiter.sizedDelim(
            delim, group.value.size, options, group.mode,
            [group.value.mclass]);
};

groupTypes.leftright = function(group, options) {
    // Build the inner expression
    var inner = buildExpression(group.value.body, options.reset(), true);

    var innerHeight = 0;
    var innerDepth = 0;
    var hadMiddle = false;

    // Calculate its height and depth
    for (var i = 0; i < inner.length; i++) {
        if (inner[i].isMiddle) {
            hadMiddle = true;
        } else {
            innerHeight = Math.max(inner[i].height, innerHeight);
            innerDepth = Math.max(inner[i].depth, innerDepth);
        }
    }

    var style = options.style;

    // The size of delimiters is the same, regardless of what style we are
    // in. Thus, to correctly calculate the size of delimiter we need around
    // a group, we scale down the inner size based on the size.
    innerHeight *= style.sizeMultiplier;
    innerDepth *= style.sizeMultiplier;

    var leftDelim;
    if (group.value.left === ".") {
        // Empty delimiters in \left and \right make null delimiter spaces.
        leftDelim = makeNullDelimiter(options, ["mopen"]);
    } else {
        // Otherwise, use leftRightDelim to generate the correct sized
        // delimiter.
        leftDelim = delimiter.leftRightDelim(
            group.value.left, innerHeight, innerDepth, options,
            group.mode, ["mopen"]);
    }
    // Add it to the beginning of the expression
    inner.unshift(leftDelim);

    // Handle middle delimiters
    if (hadMiddle) {
        for (i = 1; i < inner.length; i++) {
            if (inner[i].isMiddle) {
                // Apply the options that were active when \middle was called
                inner[i] = delimiter.leftRightDelim(
                    inner[i].isMiddle.value, innerHeight, innerDepth,
                    inner[i].isMiddle.options, group.mode, []);
            }
        }
    }

    var rightDelim;
    // Same for the right delimiter
    if (group.value.right === ".") {
        rightDelim = makeNullDelimiter(options, ["mclose"]);
    } else {
        rightDelim = delimiter.leftRightDelim(
            group.value.right, innerHeight, innerDepth, options,
            group.mode, ["mclose"]);
    }
    // Add it to the end of the expression.
    inner.push(rightDelim);

    return makeSpan(
        ["minner", style.cls()], inner, options);
};

groupTypes.middle = function(group, options) {
    var middleDelim;
    if (group.value.value === ".") {
        middleDelim = makeNullDelimiter(options, []);
    } else {
        middleDelim = delimiter.sizedDelim(
            group.value.value, 1, options,
            group.mode, []);
        middleDelim.isMiddle = {value: group.value.value, options: options};
    }
    return middleDelim;
};

groupTypes.rule = function(group, options) {
    // Make an empty span for the rule
    var rule = makeSpan(["mord", "rule"], [], options);
    var style = options.style;

    // Calculate the shift, width, and height of the rule, and account for units
    var shift = 0;
    if (group.value.shift) {
        shift = calculateSize(group.value.shift, style);
    }

    var width = calculateSize(group.value.width, style);
    var height = calculateSize(group.value.height, style);

    // The sizes of rules are absolute, so make it larger if we are in a
    // smaller style.
    shift /= style.sizeMultiplier;
    width /= style.sizeMultiplier;
    height /= style.sizeMultiplier;

    // Style the rule to the right size
    rule.style.borderRightWidth = width + "em";
    rule.style.borderTopWidth = height + "em";
    rule.style.bottom = shift + "em";

    // Record the height and width
    rule.width = width;
    rule.height = height + shift;
    rule.depth = -shift;

    return rule;
};

groupTypes.kern = function(group, options) {
    // Make an empty span for the rule
    var rule = makeSpan(["mord", "rule"], [], options);
    var style = options.style;

    var dimension = 0;
    if (group.value.dimension) {
        dimension = calculateSize(group.value.dimension, style);
    }

    dimension /= style.sizeMultiplier;

    rule.style.marginLeft = dimension + "em";

    return rule;
};

groupTypes.accent = function(group, options) {
    // Accents are handled in the TeXbook pg. 443, rule 12.
    var base = group.value.base;
    var style = options.style;

    var supsubGroup;
    if (group.type === "supsub") {
        // If our base is a character box, and we have superscripts and
        // subscripts, the supsub will defer to us. In particular, we want
        // to attach the superscripts and subscripts to the inner body (so
        // that the position of the superscripts and subscripts won't be
        // affected by the height of the accent). We accomplish this by
        // sticking the base of the accent into the base of the supsub, and
        // rendering that, while keeping track of where the accent is.

        // The supsub group is the group that was passed in
        var supsub = group;
        // The real accent group is the base of the supsub group
        group = supsub.value.base;
        // The character box is the base of the accent group
        base = group.value.base;
        // Stick the character box into the base of the supsub group
        supsub.value.base = base;

        // Rerender the supsub group with its new base, and store that
        // result.
        supsubGroup = buildGroup(
            supsub, options.reset());
    }

    // Build the base group
    var body = buildGroup(
        base, options.withStyle(style.cramp()));

    // Calculate the skew of the accent. This is based on the line "If the
    // nucleus is not a single character, let s = 0; otherwise set s to the
    // kern amount for the nucleus followed by the \skewchar of its font."
    // Note that our skew metrics are just the kern between each character
    // and the skewchar.
    var skew;
    if (isCharacterBox(base)) {
        // If the base is a character box, then we want the skew of the
        // innermost character. To do that, we find the innermost character:
        var baseChar = getBaseElem(base);
        // Then, we render its group to get the symbol inside it
        var baseGroup = buildGroup(
            baseChar, options.withStyle(style.cramp()));
        // Finally, we pull the skew off of the symbol.
        skew = baseGroup.skew;
        // Note that we now throw away baseGroup, because the layers we
        // removed with getBaseElem might contain things like \color which
        // we can't get rid of.
        // TODO(emily): Find a better way to get the skew
    } else {
        skew = 0;
    }

    // calculate the amount of space between the body and the accent
    var clearance = Math.min(
        body.height,
        style.metrics.xHeight);

    // Build the accent
    var accent = buildCommon.makeSymbol(
        group.value.accent, "Main-Regular", "math", options);
    // Remove the italic correction of the accent, because it only serves to
    // shift the accent over to a place we don't want.
    accent.italic = 0;

    // The \vec character that the fonts use is a combining character, and
    // thus shows up much too far to the left. To account for this, we add a
    // specific class which shifts the accent over to where we want it.
    // TODO(emily): Fix this in a better way, like by changing the font
    var vecClass = group.value.accent === "\\vec" ? "accent-vec" : null;

    var accentBody = makeSpan(["accent-body", vecClass], [
        makeSpan([], [accent])]);

    accentBody = buildCommon.makeVList([
        {type: "elem", elem: body},
        {type: "kern", size: -clearance},
        {type: "elem", elem: accentBody}
    ], "firstBaseline", null, options);

    // Shift the accent over by the skew. Note we shift by twice the skew
    // because we are centering the accent, so by adding 2*skew to the left,
    // we shift it to the right by 1*skew.
    accentBody.children[1].style.marginLeft = 2 * skew + "em";

    var accentWrap = makeSpan(["mord", "accent"], [accentBody], options);

    if (supsubGroup) {
        // Here, we replace the "base" child of the supsub with our newly
        // generated accent.
        supsubGroup.children[0] = accentWrap;

        // Since we don't rerun the height calculation after replacing the
        // accent, we manually recalculate height.
        supsubGroup.height = Math.max(accentWrap.height, supsubGroup.height);

        // Accents should always be ords, even when their innards are not.
        supsubGroup.classes[0] = "mord";

        return supsubGroup;
    } else {
        return accentWrap;
    }
};

groupTypes.phantom = function(group, options) {
    var elements = buildExpression(
        group.value.value,
        options.withPhantom(),
        false
    );

    // \phantom isn't supposed to affect the elements it contains.
    // See "color" for more details.
    return new buildCommon.makeFragment(elements);
};

groupTypes.mclass = function(group, options) {
    var elements = buildExpression(group.value.value, options, true);

    return makeSpan([group.value.mclass], elements, options);
};

/**
 * buildGroup is the function that takes a group and calls the correct groupType
 * function for it. It also handles the interaction of size and style changes
 * between parents and children.
 */
var buildGroup = function(group, options) {
    if (!group) {
        return makeSpan();
    }

    if (groupTypes[group.type]) {
        // Call the groupTypes function
        var groupNode = groupTypes[group.type](group, options);
        var multiplier;

        // If the style changed between the parent and the current group,
        // account for the size difference
        if (options.style !== options.parentStyle) {
            multiplier = options.style.sizeMultiplier /
                    options.parentStyle.sizeMultiplier;

            groupNode.height *= multiplier;
            groupNode.depth *= multiplier;
        }

        // If the size changed between the parent and the current group, account
        // for that size difference.
        if (options.size !== options.parentSize) {
            multiplier = buildCommon.sizingMultiplier[options.size] /
                    buildCommon.sizingMultiplier[options.parentSize];

            groupNode.height *= multiplier;
            groupNode.depth *= multiplier;
        }

        return groupNode;
    } else {
        throw new ParseError(
            "Got group of unknown type: '" + group.type + "'");
    }
};

/**
 * Take an entire parse tree, and build it into an appropriate set of HTML
 * nodes.
 */
var buildHTML = function(tree, options) {
    // buildExpression is destructive, so we need to make a clone
    // of the incoming tree so that it isn't accidentally changed
    tree = JSON.parse(JSON.stringify(tree));

    // Build the expression contained in the tree
    var expression = buildExpression(tree, options, true);
    var body = makeSpan(["base", options.style.cls()], expression, options);

    // Add struts, which ensure that the top of the HTML element falls at the
    // height of the expression, and the bottom of the HTML element falls at the
    // depth of the expression.
    var topStrut = makeSpan(["strut"]);
    var bottomStrut = makeSpan(["strut", "bottom"]);

    topStrut.style.height = body.height + "em";
    bottomStrut.style.height = (body.height + body.depth) + "em";
    // We'd like to use `vertical-align: top` but in IE 9 this lowers the
    // baseline of the box to the bottom of this strut (instead staying in the
    // normal place) so we use an absolute value for vertical-align instead
    bottomStrut.style.verticalAlign = -body.depth + "em";

    // Wrap the struts and body together
    var htmlNode = makeSpan(["katex-html"], [topStrut, bottomStrut, body]);

    htmlNode.setAttribute("aria-hidden", "true");

    return htmlNode;
};

module.exports = buildHTML;


/***/ }),

/***/ "./node_modules/katex/src/buildMathML.js":
/*!***********************************************!*\
  !*** ./node_modules/katex/src/buildMathML.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * This file converts a parse tree into a cooresponding MathML tree. The main
 * entry point is the `buildMathML` function, which takes a parse tree from the
 * parser.
 */

var buildCommon = __webpack_require__(/*! ./buildCommon */ "./node_modules/katex/src/buildCommon.js");
var fontMetrics = __webpack_require__(/*! ./fontMetrics */ "./node_modules/katex/src/fontMetrics.js");
var mathMLTree = __webpack_require__(/*! ./mathMLTree */ "./node_modules/katex/src/mathMLTree.js");
var ParseError = __webpack_require__(/*! ./ParseError */ "./node_modules/katex/src/ParseError.js");
var symbols = __webpack_require__(/*! ./symbols */ "./node_modules/katex/src/symbols.js");
var utils = __webpack_require__(/*! ./utils */ "./node_modules/katex/src/utils.js");

var makeSpan = buildCommon.makeSpan;
var fontMap = buildCommon.fontMap;

/**
 * Takes a symbol and converts it into a MathML text node after performing
 * optional replacement from symbols.js.
 */
var makeText = function(text, mode) {
    if (symbols[mode][text] && symbols[mode][text].replace) {
        text = symbols[mode][text].replace;
    }

    return new mathMLTree.TextNode(text);
};

/**
 * Returns the math variant as a string or null if none is required.
 */
var getVariant = function(group, options) {
    var font = options.font;
    if (!font) {
        return null;
    }

    var mode = group.mode;
    if (font === "mathit") {
        return "italic";
    }

    var value = group.value;
    if (utils.contains(["\\imath", "\\jmath"], value)) {
        return null;
    }

    if (symbols[mode][value] && symbols[mode][value].replace) {
        value = symbols[mode][value].replace;
    }

    var fontName = fontMap[font].fontName;
    if (fontMetrics.getCharacterMetrics(value, fontName)) {
        return fontMap[options.font].variant;
    }

    return null;
};

/**
 * Functions for handling the different types of groups found in the parse
 * tree. Each function should take a parse group and return a MathML node.
 */
var groupTypes = {};

groupTypes.mathord = function(group, options) {
    var node = new mathMLTree.MathNode(
        "mi",
        [makeText(group.value, group.mode)]);

    var variant = getVariant(group, options);
    if (variant) {
        node.setAttribute("mathvariant", variant);
    }
    return node;
};

groupTypes.textord = function(group, options) {
    var text = makeText(group.value, group.mode);

    var variant = getVariant(group, options) || "normal";

    var node;
    if (/[0-9]/.test(group.value)) {
        // TODO(kevinb) merge adjacent <mn> nodes
        // do it as a post processing step
        node = new mathMLTree.MathNode("mn", [text]);
        if (options.font) {
            node.setAttribute("mathvariant", variant);
        }
    } else {
        node = new mathMLTree.MathNode("mi", [text]);
        node.setAttribute("mathvariant", variant);
    }

    return node;
};

groupTypes.bin = function(group) {
    var node = new mathMLTree.MathNode(
        "mo", [makeText(group.value, group.mode)]);

    return node;
};

groupTypes.rel = function(group) {
    var node = new mathMLTree.MathNode(
        "mo", [makeText(group.value, group.mode)]);

    return node;
};

groupTypes.open = function(group) {
    var node = new mathMLTree.MathNode(
        "mo", [makeText(group.value, group.mode)]);

    return node;
};

groupTypes.close = function(group) {
    var node = new mathMLTree.MathNode(
        "mo", [makeText(group.value, group.mode)]);

    return node;
};

groupTypes.inner = function(group) {
    var node = new mathMLTree.MathNode(
        "mo", [makeText(group.value, group.mode)]);

    return node;
};

groupTypes.punct = function(group) {
    var node = new mathMLTree.MathNode(
        "mo", [makeText(group.value, group.mode)]);

    node.setAttribute("separator", "true");

    return node;
};

groupTypes.ordgroup = function(group, options) {
    var inner = buildExpression(group.value, options);

    var node = new mathMLTree.MathNode("mrow", inner);

    return node;
};

groupTypes.text = function(group, options) {
    var inner = buildExpression(group.value.body, options);

    var node = new mathMLTree.MathNode("mtext", inner);

    return node;
};

groupTypes.color = function(group, options) {
    var inner = buildExpression(group.value.value, options);

    var node = new mathMLTree.MathNode("mstyle", inner);

    node.setAttribute("mathcolor", group.value.color);

    return node;
};

groupTypes.supsub = function(group, options) {
    var children = [buildGroup(group.value.base, options)];

    if (group.value.sub) {
        children.push(buildGroup(group.value.sub, options));
    }

    if (group.value.sup) {
        children.push(buildGroup(group.value.sup, options));
    }

    var nodeType;
    if (!group.value.sub) {
        nodeType = "msup";
    } else if (!group.value.sup) {
        nodeType = "msub";
    } else {
        nodeType = "msubsup";
    }

    var node = new mathMLTree.MathNode(nodeType, children);

    return node;
};

groupTypes.genfrac = function(group, options) {
    var node = new mathMLTree.MathNode(
        "mfrac",
        [buildGroup(group.value.numer, options),
            buildGroup(group.value.denom, options)]);

    if (!group.value.hasBarLine) {
        node.setAttribute("linethickness", "0px");
    }

    if (group.value.leftDelim != null || group.value.rightDelim != null) {
        var withDelims = [];

        if (group.value.leftDelim != null) {
            var leftOp = new mathMLTree.MathNode(
                "mo", [new mathMLTree.TextNode(group.value.leftDelim)]);

            leftOp.setAttribute("fence", "true");

            withDelims.push(leftOp);
        }

        withDelims.push(node);

        if (group.value.rightDelim != null) {
            var rightOp = new mathMLTree.MathNode(
                "mo", [new mathMLTree.TextNode(group.value.rightDelim)]);

            rightOp.setAttribute("fence", "true");

            withDelims.push(rightOp);
        }

        var outerNode = new mathMLTree.MathNode("mrow", withDelims);

        return outerNode;
    }

    return node;
};

groupTypes.array = function(group, options) {
    return new mathMLTree.MathNode(
        "mtable", group.value.body.map(function(row) {
            return new mathMLTree.MathNode(
                "mtr", row.map(function(cell) {
                    return new mathMLTree.MathNode(
                        "mtd", [buildGroup(cell, options)]);
                }));
        }));
};

groupTypes.sqrt = function(group, options) {
    var node;
    if (group.value.index) {
        node = new mathMLTree.MathNode(
            "mroot", [
                buildGroup(group.value.body, options),
                buildGroup(group.value.index, options)
            ]);
    } else {
        node = new mathMLTree.MathNode(
            "msqrt", [buildGroup(group.value.body, options)]);
    }

    return node;
};

groupTypes.leftright = function(group, options) {
    var inner = buildExpression(group.value.body, options);

    if (group.value.left !== ".") {
        var leftNode = new mathMLTree.MathNode(
            "mo", [makeText(group.value.left, group.mode)]);

        leftNode.setAttribute("fence", "true");

        inner.unshift(leftNode);
    }

    if (group.value.right !== ".") {
        var rightNode = new mathMLTree.MathNode(
            "mo", [makeText(group.value.right, group.mode)]);

        rightNode.setAttribute("fence", "true");

        inner.push(rightNode);
    }

    var outerNode = new mathMLTree.MathNode("mrow", inner);

    return outerNode;
};

groupTypes.middle = function(group, options) {
    var middleNode = new mathMLTree.MathNode(
        "mo", [makeText(group.value.middle, group.mode)]);
    middleNode.setAttribute("fence", "true");
    return middleNode;
};

groupTypes.accent = function(group, options) {
    var accentNode = new mathMLTree.MathNode(
        "mo", [makeText(group.value.accent, group.mode)]);

    var node = new mathMLTree.MathNode(
        "mover",
        [buildGroup(group.value.base, options),
            accentNode]);

    node.setAttribute("accent", "true");

    return node;
};

groupTypes.spacing = function(group) {
    var node;

    if (group.value === "\\ " || group.value === "\\space" ||
        group.value === " " || group.value === "~") {
        node = new mathMLTree.MathNode(
            "mtext", [new mathMLTree.TextNode("\u00a0")]);
    } else {
        node = new mathMLTree.MathNode("mspace");

        node.setAttribute(
            "width", buildCommon.spacingFunctions[group.value].size);
    }

    return node;
};

groupTypes.op = function(group, options) {
    var node;

    // TODO(emily): handle big operators using the `largeop` attribute

    if (group.value.symbol) {
        // This is a symbol. Just add the symbol.
        node = new mathMLTree.MathNode(
            "mo", [makeText(group.value.body, group.mode)]);
    } else if (group.value.value) {
        // This is an operator with children. Add them.
        node = new mathMLTree.MathNode(
            "mo", buildExpression(group.value.value, options));
    } else {
        // This is a text operator. Add all of the characters from the
        // operator's name.
        // TODO(emily): Add a space in the middle of some of these
        // operators, like \limsup.
        node = new mathMLTree.MathNode(
            "mi", [new mathMLTree.TextNode(group.value.body.slice(1))]);
    }

    return node;
};

groupTypes.mod = function(group, options) {
    var inner = [];

    if (group.value.modType === "pod" || group.value.modType === "pmod") {
        inner.push(new mathMLTree.MathNode(
            "mo", [makeText("(", group.mode)]));
    }
    if (group.value.modType !== "pod") {
        inner.push(new mathMLTree.MathNode(
            "mo", [makeText("mod", group.mode)]));
    }
    if (group.value.value) {
        var space = new mathMLTree.MathNode("mspace");
        space.setAttribute("width", "0.333333em");
        inner.push(space);
        inner = inner.concat(buildExpression(group.value.value, options));
    }
    if (group.value.modType === "pod" || group.value.modType === "pmod") {
        inner.push(new mathMLTree.MathNode(
            "mo", [makeText(")", group.mode)]));
    }

    return new mathMLTree.MathNode("mo", inner);
};

groupTypes.katex = function(group) {
    var node = new mathMLTree.MathNode(
        "mtext", [new mathMLTree.TextNode("KaTeX")]);

    return node;
};

groupTypes.font = function(group, options) {
    var font = group.value.font;
    return buildGroup(group.value.body, options.withFont(font));
};

groupTypes.delimsizing = function(group) {
    var children = [];

    if (group.value.value !== ".") {
        children.push(makeText(group.value.value, group.mode));
    }

    var node = new mathMLTree.MathNode("mo", children);

    if (group.value.mclass === "mopen" ||
        group.value.mclass === "mclose") {
        // Only some of the delimsizing functions act as fences, and they
        // return "mopen" or "mclose" mclass.
        node.setAttribute("fence", "true");
    } else {
        // Explicitly disable fencing if it's not a fence, to override the
        // defaults.
        node.setAttribute("fence", "false");
    }

    return node;
};

groupTypes.styling = function(group, options) {
    var inner = buildExpression(group.value.value, options);

    var node = new mathMLTree.MathNode("mstyle", inner);

    var styleAttributes = {
        "display": ["0", "true"],
        "text": ["0", "false"],
        "script": ["1", "false"],
        "scriptscript": ["2", "false"]
    };

    var attr = styleAttributes[group.value.style];

    node.setAttribute("scriptlevel", attr[0]);
    node.setAttribute("displaystyle", attr[1]);

    return node;
};

groupTypes.sizing = function(group, options) {
    var inner = buildExpression(group.value.value, options);

    var node = new mathMLTree.MathNode("mstyle", inner);

    // TODO(emily): This doesn't produce the correct size for nested size
    // changes, because we don't keep state of what style we're currently
    // in, so we can't reset the size to normal before changing it.  Now
    // that we're passing an options parameter we should be able to fix
    // this.
    node.setAttribute(
        "mathsize", buildCommon.sizingMultiplier[group.value.size] + "em");

    return node;
};

groupTypes.overline = function(group, options) {
    var operator = new mathMLTree.MathNode(
        "mo", [new mathMLTree.TextNode("\u203e")]);
    operator.setAttribute("stretchy", "true");

    var node = new mathMLTree.MathNode(
        "mover",
        [buildGroup(group.value.body, options),
            operator]);
    node.setAttribute("accent", "true");

    return node;
};

groupTypes.underline = function(group, options) {
    var operator = new mathMLTree.MathNode(
        "mo", [new mathMLTree.TextNode("\u203e")]);
    operator.setAttribute("stretchy", "true");

    var node = new mathMLTree.MathNode(
        "munder",
        [buildGroup(group.value.body, options),
            operator]);
    node.setAttribute("accentunder", "true");

    return node;
};

groupTypes.rule = function(group) {
    // TODO(emily): Figure out if there's an actual way to draw black boxes
    // in MathML.
    var node = new mathMLTree.MathNode("mrow");

    return node;
};

groupTypes.kern = function(group) {
    // TODO(kevin): Figure out if there's a way to add space in MathML
    var node = new mathMLTree.MathNode("mrow");

    return node;
};

groupTypes.llap = function(group, options) {
    var node = new mathMLTree.MathNode(
        "mpadded", [buildGroup(group.value.body, options)]);

    node.setAttribute("lspace", "-1width");
    node.setAttribute("width", "0px");

    return node;
};

groupTypes.rlap = function(group, options) {
    var node = new mathMLTree.MathNode(
        "mpadded", [buildGroup(group.value.body, options)]);

    node.setAttribute("width", "0px");

    return node;
};

groupTypes.phantom = function(group, options) {
    var inner = buildExpression(group.value.value, options);
    return new mathMLTree.MathNode("mphantom", inner);
};

groupTypes.mclass = function(group, options) {
    var inner = buildExpression(group.value.value, options);
    return new mathMLTree.MathNode("mstyle", inner);
};

/**
 * Takes a list of nodes, builds them, and returns a list of the generated
 * MathML nodes. A little simpler than the HTML version because we don't do any
 * previous-node handling.
 */
var buildExpression = function(expression, options) {
    var groups = [];
    for (var i = 0; i < expression.length; i++) {
        var group = expression[i];
        groups.push(buildGroup(group, options));
    }
    return groups;
};

/**
 * Takes a group from the parser and calls the appropriate groupTypes function
 * on it to produce a MathML node.
 */
var buildGroup = function(group, options) {
    if (!group) {
        return new mathMLTree.MathNode("mrow");
    }

    if (groupTypes[group.type]) {
        // Call the groupTypes function
        return groupTypes[group.type](group, options);
    } else {
        throw new ParseError(
            "Got group of unknown type: '" + group.type + "'");
    }
};

/**
 * Takes a full parse tree and settings and builds a MathML representation of
 * it. In particular, we put the elements from building the parse tree into a
 * <semantics> tag so we can also include that TeX source as an annotation.
 *
 * Note that we actually return a domTree element with a `<math>` inside it so
 * we can do appropriate styling.
 */
var buildMathML = function(tree, texExpression, options) {
    var expression = buildExpression(tree, options);

    // Wrap up the expression in an mrow so it is presented in the semantics
    // tag correctly.
    var wrapper = new mathMLTree.MathNode("mrow", expression);

    // Build a TeX annotation of the source
    var annotation = new mathMLTree.MathNode(
        "annotation", [new mathMLTree.TextNode(texExpression)]);

    annotation.setAttribute("encoding", "application/x-tex");

    var semantics = new mathMLTree.MathNode(
        "semantics", [wrapper, annotation]);

    var math = new mathMLTree.MathNode("math", [semantics]);

    // You can't style <math> nodes, so we wrap the node in a span.
    return makeSpan(["katex-mathml"], [math]);
};

module.exports = buildMathML;


/***/ }),

/***/ "./node_modules/katex/src/buildTree.js":
/*!*********************************************!*\
  !*** ./node_modules/katex/src/buildTree.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var buildHTML = __webpack_require__(/*! ./buildHTML */ "./node_modules/katex/src/buildHTML.js");
var buildMathML = __webpack_require__(/*! ./buildMathML */ "./node_modules/katex/src/buildMathML.js");
var buildCommon = __webpack_require__(/*! ./buildCommon */ "./node_modules/katex/src/buildCommon.js");
var Options = __webpack_require__(/*! ./Options */ "./node_modules/katex/src/Options.js");
var Settings = __webpack_require__(/*! ./Settings */ "./node_modules/katex/src/Settings.js");
var Style = __webpack_require__(/*! ./Style */ "./node_modules/katex/src/Style.js");

var makeSpan = buildCommon.makeSpan;

var buildTree = function(tree, expression, settings) {
    settings = settings || new Settings({});

    var startStyle = Style.TEXT;
    if (settings.displayMode) {
        startStyle = Style.DISPLAY;
    }

    // Setup the default options
    var options = new Options({
        style: startStyle,
        size: "size5"
    });

    // `buildHTML` sometimes messes with the parse tree (like turning bins ->
    // ords), so we build the MathML version first.
    var mathMLNode = buildMathML(tree, expression, options);
    var htmlNode = buildHTML(tree, options);

    var katexNode = makeSpan(["katex"], [
        mathMLNode, htmlNode
    ]);

    if (settings.displayMode) {
        return makeSpan(["katex-display"], [katexNode]);
    } else {
        return katexNode;
    }
};

module.exports = buildTree;


/***/ }),

/***/ "./node_modules/katex/src/delimiter.js":
/*!*********************************************!*\
  !*** ./node_modules/katex/src/delimiter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * This file deals with creating delimiters of various sizes. The TeXbook
 * discusses these routines on page 441-442, in the "Another subroutine sets box
 * x to a specified variable delimiter" paragraph.
 *
 * There are three main routines here. `makeSmallDelim` makes a delimiter in the
 * normal font, but in either text, script, or scriptscript style.
 * `makeLargeDelim` makes a delimiter in textstyle, but in one of the Size1,
 * Size2, Size3, or Size4 fonts. `makeStackedDelim` makes a delimiter out of
 * smaller pieces that are stacked on top of one another.
 *
 * The functions take a parameter `center`, which determines if the delimiter
 * should be centered around the axis.
 *
 * Then, there are three exposed functions. `sizedDelim` makes a delimiter in
 * one of the given sizes. This is used for things like `\bigl`.
 * `customSizedDelim` makes a delimiter with a given total height+depth. It is
 * called in places like `\sqrt`. `leftRightDelim` makes an appropriate
 * delimiter which surrounds an expression of a given height an depth. It is
 * used in `\left` and `\right`.
 */

var ParseError = __webpack_require__(/*! ./ParseError */ "./node_modules/katex/src/ParseError.js");
var Style = __webpack_require__(/*! ./Style */ "./node_modules/katex/src/Style.js");

var buildCommon = __webpack_require__(/*! ./buildCommon */ "./node_modules/katex/src/buildCommon.js");
var fontMetrics = __webpack_require__(/*! ./fontMetrics */ "./node_modules/katex/src/fontMetrics.js");
var symbols = __webpack_require__(/*! ./symbols */ "./node_modules/katex/src/symbols.js");
var utils = __webpack_require__(/*! ./utils */ "./node_modules/katex/src/utils.js");

var makeSpan = buildCommon.makeSpan;

/**
 * Get the metrics for a given symbol and font, after transformation (i.e.
 * after following replacement from symbols.js)
 */
var getMetrics = function(symbol, font) {
    if (symbols.math[symbol] && symbols.math[symbol].replace) {
        return fontMetrics.getCharacterMetrics(
            symbols.math[symbol].replace, font);
    } else {
        return fontMetrics.getCharacterMetrics(
            symbol, font);
    }
};

/**
 * Builds a symbol in the given font size (note size is an integer)
 */
var mathrmSize = function(value, size, mode, options) {
    return buildCommon.makeSymbol(value, "Size" + size + "-Regular",
        mode, options);
};

/**
 * Puts a delimiter span in a given style, and adds appropriate height, depth,
 * and maxFontSizes.
 */
var styleWrap = function(delim, toStyle, options, classes) {
    classes = classes || [];
    var span = makeSpan(
        classes.concat(["style-wrap", options.style.reset(), toStyle.cls()]),
        [delim], options);

    var multiplier = toStyle.sizeMultiplier / options.style.sizeMultiplier;

    span.height *= multiplier;
    span.depth *= multiplier;
    span.maxFontSize = toStyle.sizeMultiplier;

    return span;
};

/**
 * Makes a small delimiter. This is a delimiter that comes in the Main-Regular
 * font, but is restyled to either be in textstyle, scriptstyle, or
 * scriptscriptstyle.
 */
var makeSmallDelim = function(delim, style, center, options, mode, classes) {
    var text = buildCommon.makeSymbol(delim, "Main-Regular", mode, options);

    var span = styleWrap(text, style, options, classes);

    if (center) {
        var shift =
            (1 - options.style.sizeMultiplier / style.sizeMultiplier) *
            options.style.metrics.axisHeight;

        span.style.top = shift + "em";
        span.height -= shift;
        span.depth += shift;
    }

    return span;
};

/**
 * Makes a large delimiter. This is a delimiter that comes in the Size1, Size2,
 * Size3, or Size4 fonts. It is always rendered in textstyle.
 */
var makeLargeDelim = function(delim, size, center, options, mode, classes) {
    var inner = mathrmSize(delim, size, mode, options);

    var span = styleWrap(
        makeSpan(["delimsizing", "size" + size], [inner], options),
        Style.TEXT, options, classes);

    if (center) {
        var shift = (1 - options.style.sizeMultiplier) *
            options.style.metrics.axisHeight;

        span.style.top = shift + "em";
        span.height -= shift;
        span.depth += shift;
    }

    return span;
};

/**
 * Make an inner span with the given offset and in the given font. This is used
 * in `makeStackedDelim` to make the stacking pieces for the delimiter.
 */
var makeInner = function(symbol, font, mode) {
    var sizeClass;
    // Apply the correct CSS class to choose the right font.
    if (font === "Size1-Regular") {
        sizeClass = "delim-size1";
    } else if (font === "Size4-Regular") {
        sizeClass = "delim-size4";
    }

    var inner = makeSpan(
        ["delimsizinginner", sizeClass],
        [makeSpan([], [buildCommon.makeSymbol(symbol, font, mode)])]);

    // Since this will be passed into `makeVList` in the end, wrap the element
    // in the appropriate tag that VList uses.
    return {type: "elem", elem: inner};
};

/**
 * Make a stacked delimiter out of a given delimiter, with the total height at
 * least `heightTotal`. This routine is mentioned on page 442 of the TeXbook.
 */
var makeStackedDelim = function(delim, heightTotal, center, options, mode,
                                classes) {
    // There are four parts, the top, an optional middle, a repeated part, and a
    // bottom.
    var top;
    var middle;
    var repeat;
    var bottom;
    top = repeat = bottom = delim;
    middle = null;
    // Also keep track of what font the delimiters are in
    var font = "Size1-Regular";

    // We set the parts and font based on the symbol. Note that we use
    // '\u23d0' instead of '|' and '\u2016' instead of '\\|' for the
    // repeats of the arrows
    if (delim === "\\uparrow") {
        repeat = bottom = "\u23d0";
    } else if (delim === "\\Uparrow") {
        repeat = bottom = "\u2016";
    } else if (delim === "\\downarrow") {
        top = repeat = "\u23d0";
    } else if (delim === "\\Downarrow") {
        top = repeat = "\u2016";
    } else if (delim === "\\updownarrow") {
        top = "\\uparrow";
        repeat = "\u23d0";
        bottom = "\\downarrow";
    } else if (delim === "\\Updownarrow") {
        top = "\\Uparrow";
        repeat = "\u2016";
        bottom = "\\Downarrow";
    } else if (delim === "[" || delim === "\\lbrack") {
        top = "\u23a1";
        repeat = "\u23a2";
        bottom = "\u23a3";
        font = "Size4-Regular";
    } else if (delim === "]" || delim === "\\rbrack") {
        top = "\u23a4";
        repeat = "\u23a5";
        bottom = "\u23a6";
        font = "Size4-Regular";
    } else if (delim === "\\lfloor") {
        repeat = top = "\u23a2";
        bottom = "\u23a3";
        font = "Size4-Regular";
    } else if (delim === "\\lceil") {
        top = "\u23a1";
        repeat = bottom = "\u23a2";
        font = "Size4-Regular";
    } else if (delim === "\\rfloor") {
        repeat = top = "\u23a5";
        bottom = "\u23a6";
        font = "Size4-Regular";
    } else if (delim === "\\rceil") {
        top = "\u23a4";
        repeat = bottom = "\u23a5";
        font = "Size4-Regular";
    } else if (delim === "(") {
        top = "\u239b";
        repeat = "\u239c";
        bottom = "\u239d";
        font = "Size4-Regular";
    } else if (delim === ")") {
        top = "\u239e";
        repeat = "\u239f";
        bottom = "\u23a0";
        font = "Size4-Regular";
    } else if (delim === "\\{" || delim === "\\lbrace") {
        top = "\u23a7";
        middle = "\u23a8";
        bottom = "\u23a9";
        repeat = "\u23aa";
        font = "Size4-Regular";
    } else if (delim === "\\}" || delim === "\\rbrace") {
        top = "\u23ab";
        middle = "\u23ac";
        bottom = "\u23ad";
        repeat = "\u23aa";
        font = "Size4-Regular";
    } else if (delim === "\\lgroup") {
        top = "\u23a7";
        bottom = "\u23a9";
        repeat = "\u23aa";
        font = "Size4-Regular";
    } else if (delim === "\\rgroup") {
        top = "\u23ab";
        bottom = "\u23ad";
        repeat = "\u23aa";
        font = "Size4-Regular";
    } else if (delim === "\\lmoustache") {
        top = "\u23a7";
        bottom = "\u23ad";
        repeat = "\u23aa";
        font = "Size4-Regular";
    } else if (delim === "\\rmoustache") {
        top = "\u23ab";
        bottom = "\u23a9";
        repeat = "\u23aa";
        font = "Size4-Regular";
    } else if (delim === "\\surd") {
        top = "\ue001";
        bottom = "\u23b7";
        repeat = "\ue000";
        font = "Size4-Regular";
    }

    // Get the metrics of the four sections
    var topMetrics = getMetrics(top, font);
    var topHeightTotal = topMetrics.height + topMetrics.depth;
    var repeatMetrics = getMetrics(repeat, font);
    var repeatHeightTotal = repeatMetrics.height + repeatMetrics.depth;
    var bottomMetrics = getMetrics(bottom, font);
    var bottomHeightTotal = bottomMetrics.height + bottomMetrics.depth;
    var middleHeightTotal = 0;
    var middleFactor = 1;
    if (middle !== null) {
        var middleMetrics = getMetrics(middle, font);
        middleHeightTotal = middleMetrics.height + middleMetrics.depth;
        middleFactor = 2; // repeat symmetrically above and below middle
    }

    // Calcuate the minimal height that the delimiter can have.
    // It is at least the size of the top, bottom, and optional middle combined.
    var minHeight = topHeightTotal + bottomHeightTotal + middleHeightTotal;

    // Compute the number of copies of the repeat symbol we will need
    var repeatCount = Math.ceil(
        (heightTotal - minHeight) / (middleFactor * repeatHeightTotal));

    // Compute the total height of the delimiter including all the symbols
    var realHeightTotal =
        minHeight + repeatCount * middleFactor * repeatHeightTotal;

    // The center of the delimiter is placed at the center of the axis. Note
    // that in this context, "center" means that the delimiter should be
    // centered around the axis in the current style, while normally it is
    // centered around the axis in textstyle.
    var axisHeight = options.style.metrics.axisHeight;
    if (center) {
        axisHeight *= options.style.sizeMultiplier;
    }
    // Calculate the depth
    var depth = realHeightTotal / 2 - axisHeight;

    // Now, we start building the pieces that will go into the vlist

    // Keep a list of the inner pieces
    var inners = [];

    // Add the bottom symbol
    inners.push(makeInner(bottom, font, mode));

    var i;
    if (middle === null) {
        // Add that many symbols
        for (i = 0; i < repeatCount; i++) {
            inners.push(makeInner(repeat, font, mode));
        }
    } else {
        // When there is a middle bit, we need the middle part and two repeated
        // sections
        for (i = 0; i < repeatCount; i++) {
            inners.push(makeInner(repeat, font, mode));
        }
        inners.push(makeInner(middle, font, mode));
        for (i = 0; i < repeatCount; i++) {
            inners.push(makeInner(repeat, font, mode));
        }
    }

    // Add the top symbol
    inners.push(makeInner(top, font, mode));

    // Finally, build the vlist
    var inner = buildCommon.makeVList(inners, "bottom", depth, options);

    return styleWrap(
        makeSpan(["delimsizing", "mult"], [inner], options),
        Style.TEXT, options, classes);
};

// There are three kinds of delimiters, delimiters that stack when they become
// too large
var stackLargeDelimiters = [
    "(", ")", "[", "\\lbrack", "]", "\\rbrack",
    "\\{", "\\lbrace", "\\}", "\\rbrace",
    "\\lfloor", "\\rfloor", "\\lceil", "\\rceil",
    "\\surd"
];

// delimiters that always stack
var stackAlwaysDelimiters = [
    "\\uparrow", "\\downarrow", "\\updownarrow",
    "\\Uparrow", "\\Downarrow", "\\Updownarrow",
    "|", "\\|", "\\vert", "\\Vert",
    "\\lvert", "\\rvert", "\\lVert", "\\rVert",
    "\\lgroup", "\\rgroup", "\\lmoustache", "\\rmoustache"
];

// and delimiters that never stack
var stackNeverDelimiters = [
    "<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"
];

// Metrics of the different sizes. Found by looking at TeX's output of
// $\bigl| // \Bigl| \biggl| \Biggl| \showlists$
// Used to create stacked delimiters of appropriate sizes in makeSizedDelim.
var sizeToMaxHeight = [0, 1.2, 1.8, 2.4, 3.0];

/**
 * Used to create a delimiter of a specific size, where `size` is 1, 2, 3, or 4.
 */
var makeSizedDelim = function(delim, size, options, mode, classes) {
    // < and > turn into \langle and \rangle in delimiters
    if (delim === "<" || delim === "\\lt") {
        delim = "\\langle";
    } else if (delim === ">" || delim === "\\gt") {
        delim = "\\rangle";
    }

    // Sized delimiters are never centered.
    if (utils.contains(stackLargeDelimiters, delim) ||
        utils.contains(stackNeverDelimiters, delim)) {
        return makeLargeDelim(delim, size, false, options, mode, classes);
    } else if (utils.contains(stackAlwaysDelimiters, delim)) {
        return makeStackedDelim(
            delim, sizeToMaxHeight[size], false, options, mode, classes);
    } else {
        throw new ParseError("Illegal delimiter: '" + delim + "'");
    }
};

/**
 * There are three different sequences of delimiter sizes that the delimiters
 * follow depending on the kind of delimiter. This is used when creating custom
 * sized delimiters to decide whether to create a small, large, or stacked
 * delimiter.
 *
 * In real TeX, these sequences aren't explicitly defined, but are instead
 * defined inside the font metrics. Since there are only three sequences that
 * are possible for the delimiters that TeX defines, it is easier to just encode
 * them explicitly here.
 */

// Delimiters that never stack try small delimiters and large delimiters only
var stackNeverDelimiterSequence = [
    {type: "small", style: Style.SCRIPTSCRIPT},
    {type: "small", style: Style.SCRIPT},
    {type: "small", style: Style.TEXT},
    {type: "large", size: 1},
    {type: "large", size: 2},
    {type: "large", size: 3},
    {type: "large", size: 4}
];

// Delimiters that always stack try the small delimiters first, then stack
var stackAlwaysDelimiterSequence = [
    {type: "small", style: Style.SCRIPTSCRIPT},
    {type: "small", style: Style.SCRIPT},
    {type: "small", style: Style.TEXT},
    {type: "stack"}
];

// Delimiters that stack when large try the small and then large delimiters, and
// stack afterwards
var stackLargeDelimiterSequence = [
    {type: "small", style: Style.SCRIPTSCRIPT},
    {type: "small", style: Style.SCRIPT},
    {type: "small", style: Style.TEXT},
    {type: "large", size: 1},
    {type: "large", size: 2},
    {type: "large", size: 3},
    {type: "large", size: 4},
    {type: "stack"}
];

/**
 * Get the font used in a delimiter based on what kind of delimiter it is.
 */
var delimTypeToFont = function(type) {
    if (type.type === "small") {
        return "Main-Regular";
    } else if (type.type === "large") {
        return "Size" + type.size + "-Regular";
    } else if (type.type === "stack") {
        return "Size4-Regular";
    }
};

/**
 * Traverse a sequence of types of delimiters to decide what kind of delimiter
 * should be used to create a delimiter of the given height+depth.
 */
var traverseSequence = function(delim, height, sequence, options) {
    // Here, we choose the index we should start at in the sequences. In smaller
    // sizes (which correspond to larger numbers in style.size) we start earlier
    // in the sequence. Thus, scriptscript starts at index 3-3=0, script starts
    // at index 3-2=1, text starts at 3-1=2, and display starts at min(2,3-0)=2
    var start = Math.min(2, 3 - options.style.size);
    for (var i = start; i < sequence.length; i++) {
        if (sequence[i].type === "stack") {
            // This is always the last delimiter, so we just break the loop now.
            break;
        }

        var metrics = getMetrics(delim, delimTypeToFont(sequence[i]));
        var heightDepth = metrics.height + metrics.depth;

        // Small delimiters are scaled down versions of the same font, so we
        // account for the style change size.

        if (sequence[i].type === "small") {
            heightDepth *= sequence[i].style.sizeMultiplier;
        }

        // Check if the delimiter at this size works for the given height.
        if (heightDepth > height) {
            return sequence[i];
        }
    }

    // If we reached the end of the sequence, return the last sequence element.
    return sequence[sequence.length - 1];
};

/**
 * Make a delimiter of a given height+depth, with optional centering. Here, we
 * traverse the sequences, and create a delimiter that the sequence tells us to.
 */
var makeCustomSizedDelim = function(delim, height, center, options, mode,
                                    classes) {
    if (delim === "<" || delim === "\\lt") {
        delim = "\\langle";
    } else if (delim === ">" || delim === "\\gt") {
        delim = "\\rangle";
    }

    // Decide what sequence to use
    var sequence;
    if (utils.contains(stackNeverDelimiters, delim)) {
        sequence = stackNeverDelimiterSequence;
    } else if (utils.contains(stackLargeDelimiters, delim)) {
        sequence = stackLargeDelimiterSequence;
    } else {
        sequence = stackAlwaysDelimiterSequence;
    }

    // Look through the sequence
    var delimType = traverseSequence(delim, height, sequence, options);

    // Depending on the sequence element we decided on, call the appropriate
    // function.
    if (delimType.type === "small") {
        return makeSmallDelim(delim, delimType.style, center, options, mode,
                              classes);
    } else if (delimType.type === "large") {
        return makeLargeDelim(delim, delimType.size, center, options, mode,
                              classes);
    } else if (delimType.type === "stack") {
        return makeStackedDelim(delim, height, center, options, mode, classes);
    }
};

/**
 * Make a delimiter for use with `\left` and `\right`, given a height and depth
 * of an expression that the delimiters surround.
 */
var makeLeftRightDelim = function(delim, height, depth, options, mode,
                                  classes) {
    // We always center \left/\right delimiters, so the axis is always shifted
    var axisHeight =
        options.style.metrics.axisHeight * options.style.sizeMultiplier;

    // Taken from TeX source, tex.web, function make_left_right
    var delimiterFactor = 901;
    var delimiterExtend = 5.0 / fontMetrics.metrics.ptPerEm;

    var maxDistFromAxis = Math.max(
        height - axisHeight, depth + axisHeight);

    var totalHeight = Math.max(
        // In real TeX, calculations are done using integral values which are
        // 65536 per pt, or 655360 per em. So, the division here truncates in
        // TeX but doesn't here, producing different results. If we wanted to
        // exactly match TeX's calculation, we could do
        //   Math.floor(655360 * maxDistFromAxis / 500) *
        //    delimiterFactor / 655360
        // (To see the difference, compare
        //    x^{x^{\left(\rule{0.1em}{0.68em}\right)}}
        // in TeX and KaTeX)
        maxDistFromAxis / 500 * delimiterFactor,
        2 * maxDistFromAxis - delimiterExtend);

    // Finally, we defer to `makeCustomSizedDelim` with our calculated total
    // height
    return makeCustomSizedDelim(delim, totalHeight, true, options, mode,
                                classes);
};

module.exports = {
    sizedDelim: makeSizedDelim,
    customSizedDelim: makeCustomSizedDelim,
    leftRightDelim: makeLeftRightDelim
};


/***/ }),

/***/ "./node_modules/katex/src/domTree.js":
/*!*******************************************!*\
  !*** ./node_modules/katex/src/domTree.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * These objects store the data about the DOM nodes we create, as well as some
 * extra data. They can then be transformed into real DOM nodes with the
 * `toNode` function or HTML markup using `toMarkup`. They are useful for both
 * storing extra properties on the nodes, as well as providing a way to easily
 * work with the DOM.
 *
 * Similar functions for working with MathML nodes exist in mathMLTree.js.
 */
var unicodeRegexes = __webpack_require__(/*! ./unicodeRegexes */ "./node_modules/katex/src/unicodeRegexes.js");
var utils = __webpack_require__(/*! ./utils */ "./node_modules/katex/src/utils.js");

/**
 * Create an HTML className based on a list of classes. In addition to joining
 * with spaces, we also remove null or empty classes.
 */
var createClass = function(classes) {
    classes = classes.slice();
    for (var i = classes.length - 1; i >= 0; i--) {
        if (!classes[i]) {
            classes.splice(i, 1);
        }
    }

    return classes.join(" ");
};

/**
 * This node represents a span node, with a className, a list of children, and
 * an inline style. It also contains information about its height, depth, and
 * maxFontSize.
 */
function span(classes, children, options) {
    this.classes = classes || [];
    this.children = children || [];
    this.height = 0;
    this.depth = 0;
    this.maxFontSize = 0;
    this.style = {};
    this.attributes = {};
    if (options) {
        if (options.style.isTight()) {
            this.classes.push("mtight");
        }
        if (options.getColor()) {
            this.style.color = options.getColor();
        }
    }
}

/**
 * Sets an arbitrary attribute on the span. Warning: use this wisely. Not all
 * browsers support attributes the same, and having too many custom attributes
 * is probably bad.
 */
span.prototype.setAttribute = function(attribute, value) {
    this.attributes[attribute] = value;
};

span.prototype.tryCombine = function(sibling) {
    return false;
};

/**
 * Convert the span into an HTML node
 */
span.prototype.toNode = function() {
    var span = document.createElement("span");

    // Apply the class
    span.className = createClass(this.classes);

    // Apply inline styles
    for (var style in this.style) {
        if (Object.prototype.hasOwnProperty.call(this.style, style)) {
            span.style[style] = this.style[style];
        }
    }

    // Apply attributes
    for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            span.setAttribute(attr, this.attributes[attr]);
        }
    }

    // Append the children, also as HTML nodes
    for (var i = 0; i < this.children.length; i++) {
        span.appendChild(this.children[i].toNode());
    }

    return span;
};

/**
 * Convert the span into an HTML markup string
 */
span.prototype.toMarkup = function() {
    var markup = "<span";

    // Add the class
    if (this.classes.length) {
        markup += " class=\"";
        markup += utils.escape(createClass(this.classes));
        markup += "\"";
    }

    var styles = "";

    // Add the styles, after hyphenation
    for (var style in this.style) {
        if (this.style.hasOwnProperty(style)) {
            styles += utils.hyphenate(style) + ":" + this.style[style] + ";";
        }
    }

    if (styles) {
        markup += " style=\"" + utils.escape(styles) + "\"";
    }

    // Add the attributes
    for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            markup += " " + attr + "=\"";
            markup += utils.escape(this.attributes[attr]);
            markup += "\"";
        }
    }

    markup += ">";

    // Add the markup of the children, also as markup
    for (var i = 0; i < this.children.length; i++) {
        markup += this.children[i].toMarkup();
    }

    markup += "</span>";

    return markup;
};

/**
 * This node represents a document fragment, which contains elements, but when
 * placed into the DOM doesn't have any representation itself. Thus, it only
 * contains children and doesn't have any HTML properties. It also keeps track
 * of a height, depth, and maxFontSize.
 */
function documentFragment(children) {
    this.children = children || [];
    this.height = 0;
    this.depth = 0;
    this.maxFontSize = 0;
}

/**
 * Convert the fragment into a node
 */
documentFragment.prototype.toNode = function() {
    // Create a fragment
    var frag = document.createDocumentFragment();

    // Append the children
    for (var i = 0; i < this.children.length; i++) {
        frag.appendChild(this.children[i].toNode());
    }

    return frag;
};

/**
 * Convert the fragment into HTML markup
 */
documentFragment.prototype.toMarkup = function() {
    var markup = "";

    // Simply concatenate the markup for the children together
    for (var i = 0; i < this.children.length; i++) {
        markup += this.children[i].toMarkup();
    }

    return markup;
};

var iCombinations = {
    'î': '\u0131\u0302',
    'ï': '\u0131\u0308',
    'í': '\u0131\u0301',
    // 'ī': '\u0131\u0304', // enable when we add Extended Latin
    'ì': '\u0131\u0300'
};

/**
 * A symbol node contains information about a single symbol. It either renders
 * to a single text node, or a span with a single text node in it, depending on
 * whether it has CSS classes, styles, or needs italic correction.
 */
function symbolNode(value, height, depth, italic, skew, classes, style) {
    this.value = value || "";
    this.height = height || 0;
    this.depth = depth || 0;
    this.italic = italic || 0;
    this.skew = skew || 0;
    this.classes = classes || [];
    this.style = style || {};
    this.maxFontSize = 0;

    // Mark CJK characters with specific classes so that we can specify which
    // fonts to use.  This allows us to render these characters with a serif
    // font in situations where the browser would either default to a sans serif
    // or render a placeholder character.
    if (unicodeRegexes.cjkRegex.test(value)) {
        // I couldn't find any fonts that contained Hangul as well as all of
        // the other characters we wanted to test there for it gets its own
        // CSS class.
        if (unicodeRegexes.hangulRegex.test(value)) {
            this.classes.push('hangul_fallback');
        } else {
            this.classes.push('cjk_fallback');
        }
    }

    if (/[îïíì]/.test(this.value)) {    // add ī when we add Extended Latin
        this.value = iCombinations[this.value];
    }
}

symbolNode.prototype.tryCombine = function(sibling) {
    if (!sibling
        || !(sibling instanceof symbolNode)
        || this.italic > 0
        || createClass(this.classes) !== createClass(sibling.classes)
        || this.skew !== sibling.skew
        || this.maxFontSize !== sibling.maxFontSize) {
        return false;
    }
    for (var style in this.style) {
        if (this.style.hasOwnProperty(style)
            && this.style[style] !== sibling.style[style]) {
            return false;
        }
    }
    for (style in sibling.style) {
        if (sibling.style.hasOwnProperty(style)
            && this.style[style] !== sibling.style[style]) {
            return false;
        }
    }
    this.value += sibling.value;
    this.height = Math.max(this.height, sibling.height);
    this.depth = Math.max(this.depth, sibling.depth);
    this.italic = sibling.italic;
    return true;
};

/**
 * Creates a text node or span from a symbol node. Note that a span is only
 * created if it is needed.
 */
symbolNode.prototype.toNode = function() {
    var node = document.createTextNode(this.value);
    var span = null;

    if (this.italic > 0) {
        span = document.createElement("span");
        span.style.marginRight = this.italic + "em";
    }

    if (this.classes.length > 0) {
        span = span || document.createElement("span");
        span.className = createClass(this.classes);
    }

    for (var style in this.style) {
        if (this.style.hasOwnProperty(style)) {
            span = span || document.createElement("span");
            span.style[style] = this.style[style];
        }
    }

    if (span) {
        span.appendChild(node);
        return span;
    } else {
        return node;
    }
};

/**
 * Creates markup for a symbol node.
 */
symbolNode.prototype.toMarkup = function() {
    // TODO(alpert): More duplication than I'd like from
    // span.prototype.toMarkup and symbolNode.prototype.toNode...
    var needsSpan = false;

    var markup = "<span";

    if (this.classes.length) {
        needsSpan = true;
        markup += " class=\"";
        markup += utils.escape(createClass(this.classes));
        markup += "\"";
    }

    var styles = "";

    if (this.italic > 0) {
        styles += "margin-right:" + this.italic + "em;";
    }
    for (var style in this.style) {
        if (this.style.hasOwnProperty(style)) {
            styles += utils.hyphenate(style) + ":" + this.style[style] + ";";
        }
    }

    if (styles) {
        needsSpan = true;
        markup += " style=\"" + utils.escape(styles) + "\"";
    }

    var escaped = utils.escape(this.value);
    if (needsSpan) {
        markup += ">";
        markup += escaped;
        markup += "</span>";
        return markup;
    } else {
        return escaped;
    }
};

module.exports = {
    span: span,
    documentFragment: documentFragment,
    symbolNode: symbolNode
};


/***/ }),

/***/ "./node_modules/katex/src/environments.js":
/*!************************************************!*\
  !*** ./node_modules/katex/src/environments.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-constant-condition:0 */
var parseData = __webpack_require__(/*! ./parseData */ "./node_modules/katex/src/parseData.js");
var ParseError = __webpack_require__(/*! ./ParseError */ "./node_modules/katex/src/ParseError.js");
var Style = __webpack_require__(/*! ./Style */ "./node_modules/katex/src/Style.js");

var ParseNode = parseData.ParseNode;

/**
 * Parse the body of the environment, with rows delimited by \\ and
 * columns delimited by &, and create a nested list in row-major order
 * with one group per cell.
 */
function parseArray(parser, result) {
    var row = [];
    var body = [row];
    var rowGaps = [];
    while (true) {
        var cell = parser.parseExpression(false, null);
        row.push(new ParseNode("ordgroup", cell, parser.mode));
        var next = parser.nextToken.text;
        if (next === "&") {
            parser.consume();
        } else if (next === "\\end") {
            break;
        } else if (next === "\\\\" || next === "\\cr") {
            var cr = parser.parseFunction();
            rowGaps.push(cr.value.size);
            row = [];
            body.push(row);
        } else {
            throw new ParseError("Expected & or \\\\ or \\end",
                                 parser.nextToken);
        }
    }
    result.body = body;
    result.rowGaps = rowGaps;
    return new ParseNode(result.type, result, parser.mode);
}

/*
 * An environment definition is very similar to a function definition:
 * it is declared with a name or a list of names, a set of properties
 * and a handler containing the actual implementation.
 *
 * The properties include:
 *  - numArgs: The number of arguments after the \begin{name} function.
 *  - argTypes: (optional) Just like for a function
 *  - allowedInText: (optional) Whether or not the environment is allowed inside
 *                   text mode (default false) (not enforced yet)
 *  - numOptionalArgs: (optional) Just like for a function
 * A bare number instead of that object indicates the numArgs value.
 *
 * The handler function will receive two arguments
 *  - context: information and references provided by the parser
 *  - args: an array of arguments passed to \begin{name}
 * The context contains the following properties:
 *  - envName: the name of the environment, one of the listed names.
 *  - parser: the parser object
 *  - lexer: the lexer object
 *  - positions: the positions associated with these arguments from args.
 * The handler must return a ParseResult.
 */

function defineEnvironment(names, props, handler) {
    if (typeof names === "string") {
        names = [names];
    }
    if (typeof props === "number") {
        props = { numArgs: props };
    }
    // Set default values of environments
    var data = {
        numArgs: props.numArgs || 0,
        argTypes: props.argTypes,
        greediness: 1,
        allowedInText: !!props.allowedInText,
        numOptionalArgs: props.numOptionalArgs || 0,
        handler: handler
    };
    for (var i = 0; i < names.length; ++i) {
        module.exports[names[i]] = data;
    }
}

// Arrays are part of LaTeX, defined in lttab.dtx so its documentation
// is part of the source2e.pdf file of LaTeX2e source documentation.
defineEnvironment("array", {
    numArgs: 1
}, function(context, args) {
    var colalign = args[0];
    colalign = colalign.value.map ? colalign.value : [colalign];
    var cols = colalign.map(function(node) {
        var ca = node.value;
        if ("lcr".indexOf(ca) !== -1) {
            return {
                type: "align",
                align: ca
            };
        } else if (ca === "|") {
            return {
                type: "separator",
                separator: "|"
            };
        }
        throw new ParseError(
            "Unknown column alignment: " + node.value,
            node);
    });
    var res = {
        type: "array",
        cols: cols,
        hskipBeforeAndAfter: true // \@preamble in lttab.dtx
    };
    res = parseArray(context.parser, res);
    return res;
});

// The matrix environments of amsmath builds on the array environment
// of LaTeX, which is discussed above.
defineEnvironment([
    "matrix",
    "pmatrix",
    "bmatrix",
    "Bmatrix",
    "vmatrix",
    "Vmatrix"
], {
}, function(context) {
    var delimiters = {
        "matrix": null,
        "pmatrix": ["(", ")"],
        "bmatrix": ["[", "]"],
        "Bmatrix": ["\\{", "\\}"],
        "vmatrix": ["|", "|"],
        "Vmatrix": ["\\Vert", "\\Vert"]
    }[context.envName];
    var res = {
        type: "array",
        hskipBeforeAndAfter: false // \hskip -\arraycolsep in amsmath
    };
    res = parseArray(context.parser, res);
    if (delimiters) {
        res = new ParseNode("leftright", {
            body: [res],
            left: delimiters[0],
            right: delimiters[1]
        }, context.mode);
    }
    return res;
});

// A cases environment (in amsmath.sty) is almost equivalent to
// \def\arraystretch{1.2}%
// \left\{\begin{array}{@{}l@{\quad}l@{}} … \end{array}\right.
defineEnvironment("cases", {
}, function(context) {
    var res = {
        type: "array",
        arraystretch: 1.2,
        cols: [{
            type: "align",
            align: "l",
            pregap: 0,
            // TODO(kevinb) get the current style.
            // For now we use the metrics for TEXT style which is what we were
            // doing before.  Before attempting to get the current style we
            // should look at TeX's behavior especially for \over and matrices.
            postgap: Style.TEXT.metrics.quad
        }, {
            type: "align",
            align: "l",
            pregap: 0,
            postgap: 0
        }]
    };
    res = parseArray(context.parser, res);
    res = new ParseNode("leftright", {
        body: [res],
        left: "\\{",
        right: "."
    }, context.mode);
    return res;
});

// An aligned environment is like the align* environment
// except it operates within math mode.
// Note that we assume \nomallineskiplimit to be zero,
// so that \strut@ is the same as \strut.
defineEnvironment("aligned", {
}, function(context) {
    var res = {
        type: "array",
        cols: []
    };
    res = parseArray(context.parser, res);
    var emptyGroup = new ParseNode("ordgroup", [], context.mode);
    var numCols = 0;
    res.value.body.forEach(function(row) {
        var i;
        for (i = 1; i < row.length; i += 2) {
            row[i].value.unshift(emptyGroup);
        }
        if (numCols < row.length) {
            numCols = row.length;
        }
    });
    for (var i = 0; i < numCols; ++i) {
        var align = "r";
        var pregap = 0;
        if (i % 2 === 1) {
            align = "l";
        } else if (i > 0) {
            pregap = 2; // one \qquad between columns
        }
        res.value.cols[i] = {
            type: "align",
            align: align,
            pregap: pregap,
            postgap: 0
        };
    }
    return res;
});


/***/ }),

/***/ "./node_modules/katex/src/fontMetrics.js":
/*!***********************************************!*\
  !*** ./node_modules/katex/src/fontMetrics.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-unused-vars:0 */

var Style = __webpack_require__(/*! ./Style */ "./node_modules/katex/src/Style.js");
var cjkRegex = (__webpack_require__(/*! ./unicodeRegexes */ "./node_modules/katex/src/unicodeRegexes.js").cjkRegex);

/**
 * This file contains metrics regarding fonts and individual symbols. The sigma
 * and xi variables, as well as the metricMap map contain data extracted from
 * TeX, TeX font metrics, and the TTF files. These data are then exposed via the
 * `metrics` variable and the getCharacterMetrics function.
 */

// In TeX, there are actually three sets of dimensions, one for each of
// textstyle, scriptstyle, and scriptscriptstyle.  These are provided in the
// the arrays below, in that order.
//
// The font metrics are stored in fonts cmsy10, cmsy7, and cmsy5 respsectively.
// This was determined by running the folllowing script:
//
//     latex -interaction=nonstopmode \
//     '\documentclass{article}\usepackage{amsmath}\begin{document}' \
//     '$a$ \expandafter\show\the\textfont2' \
//     '\expandafter\show\the\scriptfont2' \
//     '\expandafter\show\the\scriptscriptfont2' \
//     '\stop'
//
// The metrics themselves were retreived using the following commands:
//
//     tftopl cmsy10
//     tftopl cmsy7
//     tftopl cmsy5
//
// The output of each of these commands is quite lengthy.  The only part we
// care about is the FONTDIMEN section. Each value is measured in EMs.
var sigmas = {
    slant: [0.250, 0.250, 0.250],       // sigma1
    space: [0.000, 0.000, 0.000],       // sigma2
    stretch: [0.000, 0.000, 0.000],     // sigma3
    shrink: [0.000, 0.000, 0.000],      // sigma4
    xHeight: [0.431, 0.431, 0.431],     // sigma5
    quad: [1.000, 1.171, 1.472],        // sigma6
    extraSpace: [0.000, 0.000, 0.000],  // sigma7
    num1: [0.677, 0.732, 0.925],        // sigma8
    num2: [0.394, 0.384, 0.387],        // sigma9
    num3: [0.444, 0.471, 0.504],        // sigma10
    denom1: [0.686, 0.752, 1.025],      // sigma11
    denom2: [0.345, 0.344, 0.532],      // sigma12
    sup1: [0.413, 0.503, 0.504],        // sigma13
    sup2: [0.363, 0.431, 0.404],        // sigma14
    sup3: [0.289, 0.286, 0.294],        // sigma15
    sub1: [0.150, 0.143, 0.200],        // sigma16
    sub2: [0.247, 0.286, 0.400],        // sigma17
    supDrop: [0.386, 0.353, 0.494],     // sigma18
    subDrop: [0.050, 0.071, 0.100],     // sigma19
    delim1: [2.390, 1.700, 1.980],      // sigma20
    delim2: [1.010, 1.157, 1.420],      // sigma21
    axisHeight: [0.250, 0.250, 0.250]  // sigma22
};

// These font metrics are extracted from TeX by using
// \font\a=cmex10
// \showthe\fontdimenX\a
// where X is the corresponding variable number. These correspond to the font
// parameters of the extension fonts (family 3). See the TeXbook, page 441.
var xi1 = 0;
var xi2 = 0;
var xi3 = 0;
var xi4 = 0;
var xi5 = 0.431;
var xi6 = 1;
var xi7 = 0;
var xi8 = 0.04;
var xi9 = 0.111;
var xi10 = 0.166;
var xi11 = 0.2;
var xi12 = 0.6;
var xi13 = 0.1;

// This value determines how large a pt is, for metrics which are defined in
// terms of pts.
// This value is also used in katex.less; if you change it make sure the values
// match.
var ptPerEm = 10.0;

// The space between adjacent `|` columns in an array definition. From
// `\showthe\doublerulesep` in LaTeX.
var doubleRuleSep = 2.0 / ptPerEm;

/**
 * This is just a mapping from common names to real metrics
 */
var metrics = {
    defaultRuleThickness: xi8,
    bigOpSpacing1: xi9,
    bigOpSpacing2: xi10,
    bigOpSpacing3: xi11,
    bigOpSpacing4: xi12,
    bigOpSpacing5: xi13,
    ptPerEm: ptPerEm,
    doubleRuleSep: doubleRuleSep
};

// This map contains a mapping from font name and character code to character
// metrics, including height, depth, italic correction, and skew (kern from the
// character to the corresponding \skewchar)
// This map is generated via `make metrics`. It should not be changed manually.
var metricMap = __webpack_require__(/*! ./fontMetricsData */ "./node_modules/katex/src/fontMetricsData.js");

// These are very rough approximations.  We default to Times New Roman which
// should have Latin-1 and Cyrillic characters, but may not depending on the
// operating system.  The metrics do not account for extra height from the
// accents.  In the case of Cyrillic characters which have both ascenders and
// descenders we prefer approximations with ascenders, primarily to prevent
// the fraction bar or root line from intersecting the glyph.
// TODO(kevinb) allow union of multiple glyph metrics for better accuracy.
var extraCharacterMap = {
    // Latin-1
    'À': 'A',
    'Á': 'A',
    'Â': 'A',
    'Ã': 'A',
    'Ä': 'A',
    'Å': 'A',
    'Æ': 'A',
    'Ç': 'C',
    'È': 'E',
    'É': 'E',
    'Ê': 'E',
    'Ë': 'E',
    'Ì': 'I',
    'Í': 'I',
    'Î': 'I',
    'Ï': 'I',
    'Ð': 'D',
    'Ñ': 'N',
    'Ò': 'O',
    'Ó': 'O',
    'Ô': 'O',
    'Õ': 'O',
    'Ö': 'O',
    'Ø': 'O',
    'Ù': 'U',
    'Ú': 'U',
    'Û': 'U',
    'Ü': 'U',
    'Ý': 'Y',
    'Þ': 'o',
    'ß': 'B',
    'à': 'a',
    'á': 'a',
    'â': 'a',
    'ã': 'a',
    'ä': 'a',
    'å': 'a',
    'æ': 'a',
    'ç': 'c',
    'è': 'e',
    'é': 'e',
    'ê': 'e',
    'ë': 'e',
    'ì': 'i',
    'í': 'i',
    'î': 'i',
    'ï': 'i',
    'ð': 'd',
    'ñ': 'n',
    'ò': 'o',
    'ó': 'o',
    'ô': 'o',
    'õ': 'o',
    'ö': 'o',
    'ø': 'o',
    'ù': 'u',
    'ú': 'u',
    'û': 'u',
    'ü': 'u',
    'ý': 'y',
    'þ': 'o',
    'ÿ': 'y',

    // Cyrillic
    'А': 'A',
    'Б': 'B',
    'В': 'B',
    'Г': 'F',
    'Д': 'A',
    'Е': 'E',
    'Ж': 'K',
    'З': '3',
    'И': 'N',
    'Й': 'N',
    'К': 'K',
    'Л': 'N',
    'М': 'M',
    'Н': 'H',
    'О': 'O',
    'П': 'N',
    'Р': 'P',
    'С': 'C',
    'Т': 'T',
    'У': 'y',
    'Ф': 'O',
    'Х': 'X',
    'Ц': 'U',
    'Ч': 'h',
    'Ш': 'W',
    'Щ': 'W',
    'Ъ': 'B',
    'Ы': 'X',
    'Ь': 'B',
    'Э': '3',
    'Ю': 'X',
    'Я': 'R',
    'а': 'a',
    'б': 'b',
    'в': 'a',
    'г': 'r',
    'д': 'y',
    'е': 'e',
    'ж': 'm',
    'з': 'e',
    'и': 'n',
    'й': 'n',
    'к': 'n',
    'л': 'n',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'n',
    'р': 'p',
    'с': 'c',
    'т': 'o',
    'у': 'y',
    'ф': 'b',
    'х': 'x',
    'ц': 'n',
    'ч': 'n',
    'ш': 'w',
    'щ': 'w',
    'ъ': 'a',
    'ы': 'm',
    'ь': 'a',
    'э': 'e',
    'ю': 'm',
    'я': 'r'
};

/**
 * This function is a convenience function for looking up information in the
 * metricMap table. It takes a character as a string, and a style.
 *
 * Note: the `width` property may be undefined if fontMetricsData.js wasn't
 * built using `Make extended_metrics`.
 */
var getCharacterMetrics = function(character, style) {
    var ch = character.charCodeAt(0);
    if (character[0] in extraCharacterMap) {
        ch = extraCharacterMap[character[0]].charCodeAt(0);
    } else if (cjkRegex.test(character[0])) {
        ch = 'M'.charCodeAt(0);
    }
    var metrics = metricMap[style][ch];
    if (metrics) {
        return {
            depth: metrics[0],
            height: metrics[1],
            italic: metrics[2],
            skew: metrics[3],
            width: metrics[4]
        };
    }
};

module.exports = {
    metrics: metrics,
    sigmas: sigmas,
    getCharacterMetrics: getCharacterMetrics
};


/***/ }),

/***/ "./node_modules/katex/src/fontMetricsData.js":
/*!***************************************************!*\
  !*** ./node_modules/katex/src/fontMetricsData.js ***!
  \***************************************************/
/***/ ((module) => {

module.exports = {
    "AMS-Regular": {
        "65": [0, 0.68889, 0, 0],
        "66": [0, 0.68889, 0, 0],
        "67": [0, 0.68889, 0, 0],
        "68": [0, 0.68889, 0, 0],
        "69": [0, 0.68889, 0, 0],
        "70": [0, 0.68889, 0, 0],
        "71": [0, 0.68889, 0, 0],
        "72": [0, 0.68889, 0, 0],
        "73": [0, 0.68889, 0, 0],
        "74": [0.16667, 0.68889, 0, 0],
        "75": [0, 0.68889, 0, 0],
        "76": [0, 0.68889, 0, 0],
        "77": [0, 0.68889, 0, 0],
        "78": [0, 0.68889, 0, 0],
        "79": [0.16667, 0.68889, 0, 0],
        "80": [0, 0.68889, 0, 0],
        "81": [0.16667, 0.68889, 0, 0],
        "82": [0, 0.68889, 0, 0],
        "83": [0, 0.68889, 0, 0],
        "84": [0, 0.68889, 0, 0],
        "85": [0, 0.68889, 0, 0],
        "86": [0, 0.68889, 0, 0],
        "87": [0, 0.68889, 0, 0],
        "88": [0, 0.68889, 0, 0],
        "89": [0, 0.68889, 0, 0],
        "90": [0, 0.68889, 0, 0],
        "107": [0, 0.68889, 0, 0],
        "165": [0, 0.675, 0.025, 0],
        "174": [0.15559, 0.69224, 0, 0],
        "240": [0, 0.68889, 0, 0],
        "295": [0, 0.68889, 0, 0],
        "710": [0, 0.825, 0, 0],
        "732": [0, 0.9, 0, 0],
        "770": [0, 0.825, 0, 0],
        "771": [0, 0.9, 0, 0],
        "989": [0.08167, 0.58167, 0, 0],
        "1008": [0, 0.43056, 0.04028, 0],
        "8245": [0, 0.54986, 0, 0],
        "8463": [0, 0.68889, 0, 0],
        "8487": [0, 0.68889, 0, 0],
        "8498": [0, 0.68889, 0, 0],
        "8502": [0, 0.68889, 0, 0],
        "8503": [0, 0.68889, 0, 0],
        "8504": [0, 0.68889, 0, 0],
        "8513": [0, 0.68889, 0, 0],
        "8592": [-0.03598, 0.46402, 0, 0],
        "8594": [-0.03598, 0.46402, 0, 0],
        "8602": [-0.13313, 0.36687, 0, 0],
        "8603": [-0.13313, 0.36687, 0, 0],
        "8606": [0.01354, 0.52239, 0, 0],
        "8608": [0.01354, 0.52239, 0, 0],
        "8610": [0.01354, 0.52239, 0, 0],
        "8611": [0.01354, 0.52239, 0, 0],
        "8619": [0, 0.54986, 0, 0],
        "8620": [0, 0.54986, 0, 0],
        "8621": [-0.13313, 0.37788, 0, 0],
        "8622": [-0.13313, 0.36687, 0, 0],
        "8624": [0, 0.69224, 0, 0],
        "8625": [0, 0.69224, 0, 0],
        "8630": [0, 0.43056, 0, 0],
        "8631": [0, 0.43056, 0, 0],
        "8634": [0.08198, 0.58198, 0, 0],
        "8635": [0.08198, 0.58198, 0, 0],
        "8638": [0.19444, 0.69224, 0, 0],
        "8639": [0.19444, 0.69224, 0, 0],
        "8642": [0.19444, 0.69224, 0, 0],
        "8643": [0.19444, 0.69224, 0, 0],
        "8644": [0.1808, 0.675, 0, 0],
        "8646": [0.1808, 0.675, 0, 0],
        "8647": [0.1808, 0.675, 0, 0],
        "8648": [0.19444, 0.69224, 0, 0],
        "8649": [0.1808, 0.675, 0, 0],
        "8650": [0.19444, 0.69224, 0, 0],
        "8651": [0.01354, 0.52239, 0, 0],
        "8652": [0.01354, 0.52239, 0, 0],
        "8653": [-0.13313, 0.36687, 0, 0],
        "8654": [-0.13313, 0.36687, 0, 0],
        "8655": [-0.13313, 0.36687, 0, 0],
        "8666": [0.13667, 0.63667, 0, 0],
        "8667": [0.13667, 0.63667, 0, 0],
        "8669": [-0.13313, 0.37788, 0, 0],
        "8672": [-0.064, 0.437, 0, 0],
        "8674": [-0.064, 0.437, 0, 0],
        "8705": [0, 0.825, 0, 0],
        "8708": [0, 0.68889, 0, 0],
        "8709": [0.08167, 0.58167, 0, 0],
        "8717": [0, 0.43056, 0, 0],
        "8722": [-0.03598, 0.46402, 0, 0],
        "8724": [0.08198, 0.69224, 0, 0],
        "8726": [0.08167, 0.58167, 0, 0],
        "8733": [0, 0.69224, 0, 0],
        "8736": [0, 0.69224, 0, 0],
        "8737": [0, 0.69224, 0, 0],
        "8738": [0.03517, 0.52239, 0, 0],
        "8739": [0.08167, 0.58167, 0, 0],
        "8740": [0.25142, 0.74111, 0, 0],
        "8741": [0.08167, 0.58167, 0, 0],
        "8742": [0.25142, 0.74111, 0, 0],
        "8756": [0, 0.69224, 0, 0],
        "8757": [0, 0.69224, 0, 0],
        "8764": [-0.13313, 0.36687, 0, 0],
        "8765": [-0.13313, 0.37788, 0, 0],
        "8769": [-0.13313, 0.36687, 0, 0],
        "8770": [-0.03625, 0.46375, 0, 0],
        "8774": [0.30274, 0.79383, 0, 0],
        "8776": [-0.01688, 0.48312, 0, 0],
        "8778": [0.08167, 0.58167, 0, 0],
        "8782": [0.06062, 0.54986, 0, 0],
        "8783": [0.06062, 0.54986, 0, 0],
        "8785": [0.08198, 0.58198, 0, 0],
        "8786": [0.08198, 0.58198, 0, 0],
        "8787": [0.08198, 0.58198, 0, 0],
        "8790": [0, 0.69224, 0, 0],
        "8791": [0.22958, 0.72958, 0, 0],
        "8796": [0.08198, 0.91667, 0, 0],
        "8806": [0.25583, 0.75583, 0, 0],
        "8807": [0.25583, 0.75583, 0, 0],
        "8808": [0.25142, 0.75726, 0, 0],
        "8809": [0.25142, 0.75726, 0, 0],
        "8812": [0.25583, 0.75583, 0, 0],
        "8814": [0.20576, 0.70576, 0, 0],
        "8815": [0.20576, 0.70576, 0, 0],
        "8816": [0.30274, 0.79383, 0, 0],
        "8817": [0.30274, 0.79383, 0, 0],
        "8818": [0.22958, 0.72958, 0, 0],
        "8819": [0.22958, 0.72958, 0, 0],
        "8822": [0.1808, 0.675, 0, 0],
        "8823": [0.1808, 0.675, 0, 0],
        "8828": [0.13667, 0.63667, 0, 0],
        "8829": [0.13667, 0.63667, 0, 0],
        "8830": [0.22958, 0.72958, 0, 0],
        "8831": [0.22958, 0.72958, 0, 0],
        "8832": [0.20576, 0.70576, 0, 0],
        "8833": [0.20576, 0.70576, 0, 0],
        "8840": [0.30274, 0.79383, 0, 0],
        "8841": [0.30274, 0.79383, 0, 0],
        "8842": [0.13597, 0.63597, 0, 0],
        "8843": [0.13597, 0.63597, 0, 0],
        "8847": [0.03517, 0.54986, 0, 0],
        "8848": [0.03517, 0.54986, 0, 0],
        "8858": [0.08198, 0.58198, 0, 0],
        "8859": [0.08198, 0.58198, 0, 0],
        "8861": [0.08198, 0.58198, 0, 0],
        "8862": [0, 0.675, 0, 0],
        "8863": [0, 0.675, 0, 0],
        "8864": [0, 0.675, 0, 0],
        "8865": [0, 0.675, 0, 0],
        "8872": [0, 0.69224, 0, 0],
        "8873": [0, 0.69224, 0, 0],
        "8874": [0, 0.69224, 0, 0],
        "8876": [0, 0.68889, 0, 0],
        "8877": [0, 0.68889, 0, 0],
        "8878": [0, 0.68889, 0, 0],
        "8879": [0, 0.68889, 0, 0],
        "8882": [0.03517, 0.54986, 0, 0],
        "8883": [0.03517, 0.54986, 0, 0],
        "8884": [0.13667, 0.63667, 0, 0],
        "8885": [0.13667, 0.63667, 0, 0],
        "8888": [0, 0.54986, 0, 0],
        "8890": [0.19444, 0.43056, 0, 0],
        "8891": [0.19444, 0.69224, 0, 0],
        "8892": [0.19444, 0.69224, 0, 0],
        "8901": [0, 0.54986, 0, 0],
        "8903": [0.08167, 0.58167, 0, 0],
        "8905": [0.08167, 0.58167, 0, 0],
        "8906": [0.08167, 0.58167, 0, 0],
        "8907": [0, 0.69224, 0, 0],
        "8908": [0, 0.69224, 0, 0],
        "8909": [-0.03598, 0.46402, 0, 0],
        "8910": [0, 0.54986, 0, 0],
        "8911": [0, 0.54986, 0, 0],
        "8912": [0.03517, 0.54986, 0, 0],
        "8913": [0.03517, 0.54986, 0, 0],
        "8914": [0, 0.54986, 0, 0],
        "8915": [0, 0.54986, 0, 0],
        "8916": [0, 0.69224, 0, 0],
        "8918": [0.0391, 0.5391, 0, 0],
        "8919": [0.0391, 0.5391, 0, 0],
        "8920": [0.03517, 0.54986, 0, 0],
        "8921": [0.03517, 0.54986, 0, 0],
        "8922": [0.38569, 0.88569, 0, 0],
        "8923": [0.38569, 0.88569, 0, 0],
        "8926": [0.13667, 0.63667, 0, 0],
        "8927": [0.13667, 0.63667, 0, 0],
        "8928": [0.30274, 0.79383, 0, 0],
        "8929": [0.30274, 0.79383, 0, 0],
        "8934": [0.23222, 0.74111, 0, 0],
        "8935": [0.23222, 0.74111, 0, 0],
        "8936": [0.23222, 0.74111, 0, 0],
        "8937": [0.23222, 0.74111, 0, 0],
        "8938": [0.20576, 0.70576, 0, 0],
        "8939": [0.20576, 0.70576, 0, 0],
        "8940": [0.30274, 0.79383, 0, 0],
        "8941": [0.30274, 0.79383, 0, 0],
        "8994": [0.19444, 0.69224, 0, 0],
        "8995": [0.19444, 0.69224, 0, 0],
        "9416": [0.15559, 0.69224, 0, 0],
        "9484": [0, 0.69224, 0, 0],
        "9488": [0, 0.69224, 0, 0],
        "9492": [0, 0.37788, 0, 0],
        "9496": [0, 0.37788, 0, 0],
        "9585": [0.19444, 0.68889, 0, 0],
        "9586": [0.19444, 0.74111, 0, 0],
        "9632": [0, 0.675, 0, 0],
        "9633": [0, 0.675, 0, 0],
        "9650": [0, 0.54986, 0, 0],
        "9651": [0, 0.54986, 0, 0],
        "9654": [0.03517, 0.54986, 0, 0],
        "9660": [0, 0.54986, 0, 0],
        "9661": [0, 0.54986, 0, 0],
        "9664": [0.03517, 0.54986, 0, 0],
        "9674": [0.11111, 0.69224, 0, 0],
        "9733": [0.19444, 0.69224, 0, 0],
        "10003": [0, 0.69224, 0, 0],
        "10016": [0, 0.69224, 0, 0],
        "10731": [0.11111, 0.69224, 0, 0],
        "10846": [0.19444, 0.75583, 0, 0],
        "10877": [0.13667, 0.63667, 0, 0],
        "10878": [0.13667, 0.63667, 0, 0],
        "10885": [0.25583, 0.75583, 0, 0],
        "10886": [0.25583, 0.75583, 0, 0],
        "10887": [0.13597, 0.63597, 0, 0],
        "10888": [0.13597, 0.63597, 0, 0],
        "10889": [0.26167, 0.75726, 0, 0],
        "10890": [0.26167, 0.75726, 0, 0],
        "10891": [0.48256, 0.98256, 0, 0],
        "10892": [0.48256, 0.98256, 0, 0],
        "10901": [0.13667, 0.63667, 0, 0],
        "10902": [0.13667, 0.63667, 0, 0],
        "10933": [0.25142, 0.75726, 0, 0],
        "10934": [0.25142, 0.75726, 0, 0],
        "10935": [0.26167, 0.75726, 0, 0],
        "10936": [0.26167, 0.75726, 0, 0],
        "10937": [0.26167, 0.75726, 0, 0],
        "10938": [0.26167, 0.75726, 0, 0],
        "10949": [0.25583, 0.75583, 0, 0],
        "10950": [0.25583, 0.75583, 0, 0],
        "10955": [0.28481, 0.79383, 0, 0],
        "10956": [0.28481, 0.79383, 0, 0],
        "57350": [0.08167, 0.58167, 0, 0],
        "57351": [0.08167, 0.58167, 0, 0],
        "57352": [0.08167, 0.58167, 0, 0],
        "57353": [0, 0.43056, 0.04028, 0],
        "57356": [0.25142, 0.75726, 0, 0],
        "57357": [0.25142, 0.75726, 0, 0],
        "57358": [0.41951, 0.91951, 0, 0],
        "57359": [0.30274, 0.79383, 0, 0],
        "57360": [0.30274, 0.79383, 0, 0],
        "57361": [0.41951, 0.91951, 0, 0],
        "57366": [0.25142, 0.75726, 0, 0],
        "57367": [0.25142, 0.75726, 0, 0],
        "57368": [0.25142, 0.75726, 0, 0],
        "57369": [0.25142, 0.75726, 0, 0],
        "57370": [0.13597, 0.63597, 0, 0],
        "57371": [0.13597, 0.63597, 0, 0]
    },
    "Caligraphic-Regular": {
        "48": [0, 0.43056, 0, 0],
        "49": [0, 0.43056, 0, 0],
        "50": [0, 0.43056, 0, 0],
        "51": [0.19444, 0.43056, 0, 0],
        "52": [0.19444, 0.43056, 0, 0],
        "53": [0.19444, 0.43056, 0, 0],
        "54": [0, 0.64444, 0, 0],
        "55": [0.19444, 0.43056, 0, 0],
        "56": [0, 0.64444, 0, 0],
        "57": [0.19444, 0.43056, 0, 0],
        "65": [0, 0.68333, 0, 0.19445],
        "66": [0, 0.68333, 0.03041, 0.13889],
        "67": [0, 0.68333, 0.05834, 0.13889],
        "68": [0, 0.68333, 0.02778, 0.08334],
        "69": [0, 0.68333, 0.08944, 0.11111],
        "70": [0, 0.68333, 0.09931, 0.11111],
        "71": [0.09722, 0.68333, 0.0593, 0.11111],
        "72": [0, 0.68333, 0.00965, 0.11111],
        "73": [0, 0.68333, 0.07382, 0],
        "74": [0.09722, 0.68333, 0.18472, 0.16667],
        "75": [0, 0.68333, 0.01445, 0.05556],
        "76": [0, 0.68333, 0, 0.13889],
        "77": [0, 0.68333, 0, 0.13889],
        "78": [0, 0.68333, 0.14736, 0.08334],
        "79": [0, 0.68333, 0.02778, 0.11111],
        "80": [0, 0.68333, 0.08222, 0.08334],
        "81": [0.09722, 0.68333, 0, 0.11111],
        "82": [0, 0.68333, 0, 0.08334],
        "83": [0, 0.68333, 0.075, 0.13889],
        "84": [0, 0.68333, 0.25417, 0],
        "85": [0, 0.68333, 0.09931, 0.08334],
        "86": [0, 0.68333, 0.08222, 0],
        "87": [0, 0.68333, 0.08222, 0.08334],
        "88": [0, 0.68333, 0.14643, 0.13889],
        "89": [0.09722, 0.68333, 0.08222, 0.08334],
        "90": [0, 0.68333, 0.07944, 0.13889]
    },
    "Fraktur-Regular": {
        "33": [0, 0.69141, 0, 0],
        "34": [0, 0.69141, 0, 0],
        "38": [0, 0.69141, 0, 0],
        "39": [0, 0.69141, 0, 0],
        "40": [0.24982, 0.74947, 0, 0],
        "41": [0.24982, 0.74947, 0, 0],
        "42": [0, 0.62119, 0, 0],
        "43": [0.08319, 0.58283, 0, 0],
        "44": [0, 0.10803, 0, 0],
        "45": [0.08319, 0.58283, 0, 0],
        "46": [0, 0.10803, 0, 0],
        "47": [0.24982, 0.74947, 0, 0],
        "48": [0, 0.47534, 0, 0],
        "49": [0, 0.47534, 0, 0],
        "50": [0, 0.47534, 0, 0],
        "51": [0.18906, 0.47534, 0, 0],
        "52": [0.18906, 0.47534, 0, 0],
        "53": [0.18906, 0.47534, 0, 0],
        "54": [0, 0.69141, 0, 0],
        "55": [0.18906, 0.47534, 0, 0],
        "56": [0, 0.69141, 0, 0],
        "57": [0.18906, 0.47534, 0, 0],
        "58": [0, 0.47534, 0, 0],
        "59": [0.12604, 0.47534, 0, 0],
        "61": [-0.13099, 0.36866, 0, 0],
        "63": [0, 0.69141, 0, 0],
        "65": [0, 0.69141, 0, 0],
        "66": [0, 0.69141, 0, 0],
        "67": [0, 0.69141, 0, 0],
        "68": [0, 0.69141, 0, 0],
        "69": [0, 0.69141, 0, 0],
        "70": [0.12604, 0.69141, 0, 0],
        "71": [0, 0.69141, 0, 0],
        "72": [0.06302, 0.69141, 0, 0],
        "73": [0, 0.69141, 0, 0],
        "74": [0.12604, 0.69141, 0, 0],
        "75": [0, 0.69141, 0, 0],
        "76": [0, 0.69141, 0, 0],
        "77": [0, 0.69141, 0, 0],
        "78": [0, 0.69141, 0, 0],
        "79": [0, 0.69141, 0, 0],
        "80": [0.18906, 0.69141, 0, 0],
        "81": [0.03781, 0.69141, 0, 0],
        "82": [0, 0.69141, 0, 0],
        "83": [0, 0.69141, 0, 0],
        "84": [0, 0.69141, 0, 0],
        "85": [0, 0.69141, 0, 0],
        "86": [0, 0.69141, 0, 0],
        "87": [0, 0.69141, 0, 0],
        "88": [0, 0.69141, 0, 0],
        "89": [0.18906, 0.69141, 0, 0],
        "90": [0.12604, 0.69141, 0, 0],
        "91": [0.24982, 0.74947, 0, 0],
        "93": [0.24982, 0.74947, 0, 0],
        "94": [0, 0.69141, 0, 0],
        "97": [0, 0.47534, 0, 0],
        "98": [0, 0.69141, 0, 0],
        "99": [0, 0.47534, 0, 0],
        "100": [0, 0.62119, 0, 0],
        "101": [0, 0.47534, 0, 0],
        "102": [0.18906, 0.69141, 0, 0],
        "103": [0.18906, 0.47534, 0, 0],
        "104": [0.18906, 0.69141, 0, 0],
        "105": [0, 0.69141, 0, 0],
        "106": [0, 0.69141, 0, 0],
        "107": [0, 0.69141, 0, 0],
        "108": [0, 0.69141, 0, 0],
        "109": [0, 0.47534, 0, 0],
        "110": [0, 0.47534, 0, 0],
        "111": [0, 0.47534, 0, 0],
        "112": [0.18906, 0.52396, 0, 0],
        "113": [0.18906, 0.47534, 0, 0],
        "114": [0, 0.47534, 0, 0],
        "115": [0, 0.47534, 0, 0],
        "116": [0, 0.62119, 0, 0],
        "117": [0, 0.47534, 0, 0],
        "118": [0, 0.52396, 0, 0],
        "119": [0, 0.52396, 0, 0],
        "120": [0.18906, 0.47534, 0, 0],
        "121": [0.18906, 0.47534, 0, 0],
        "122": [0.18906, 0.47534, 0, 0],
        "8216": [0, 0.69141, 0, 0],
        "8217": [0, 0.69141, 0, 0],
        "58112": [0, 0.62119, 0, 0],
        "58113": [0, 0.62119, 0, 0],
        "58114": [0.18906, 0.69141, 0, 0],
        "58115": [0.18906, 0.69141, 0, 0],
        "58116": [0.18906, 0.47534, 0, 0],
        "58117": [0, 0.69141, 0, 0],
        "58118": [0, 0.62119, 0, 0],
        "58119": [0, 0.47534, 0, 0]
    },
    "Main-Bold": {
        "33": [0, 0.69444, 0, 0],
        "34": [0, 0.69444, 0, 0],
        "35": [0.19444, 0.69444, 0, 0],
        "36": [0.05556, 0.75, 0, 0],
        "37": [0.05556, 0.75, 0, 0],
        "38": [0, 0.69444, 0, 0],
        "39": [0, 0.69444, 0, 0],
        "40": [0.25, 0.75, 0, 0],
        "41": [0.25, 0.75, 0, 0],
        "42": [0, 0.75, 0, 0],
        "43": [0.13333, 0.63333, 0, 0],
        "44": [0.19444, 0.15556, 0, 0],
        "45": [0, 0.44444, 0, 0],
        "46": [0, 0.15556, 0, 0],
        "47": [0.25, 0.75, 0, 0],
        "48": [0, 0.64444, 0, 0],
        "49": [0, 0.64444, 0, 0],
        "50": [0, 0.64444, 0, 0],
        "51": [0, 0.64444, 0, 0],
        "52": [0, 0.64444, 0, 0],
        "53": [0, 0.64444, 0, 0],
        "54": [0, 0.64444, 0, 0],
        "55": [0, 0.64444, 0, 0],
        "56": [0, 0.64444, 0, 0],
        "57": [0, 0.64444, 0, 0],
        "58": [0, 0.44444, 0, 0],
        "59": [0.19444, 0.44444, 0, 0],
        "60": [0.08556, 0.58556, 0, 0],
        "61": [-0.10889, 0.39111, 0, 0],
        "62": [0.08556, 0.58556, 0, 0],
        "63": [0, 0.69444, 0, 0],
        "64": [0, 0.69444, 0, 0],
        "65": [0, 0.68611, 0, 0],
        "66": [0, 0.68611, 0, 0],
        "67": [0, 0.68611, 0, 0],
        "68": [0, 0.68611, 0, 0],
        "69": [0, 0.68611, 0, 0],
        "70": [0, 0.68611, 0, 0],
        "71": [0, 0.68611, 0, 0],
        "72": [0, 0.68611, 0, 0],
        "73": [0, 0.68611, 0, 0],
        "74": [0, 0.68611, 0, 0],
        "75": [0, 0.68611, 0, 0],
        "76": [0, 0.68611, 0, 0],
        "77": [0, 0.68611, 0, 0],
        "78": [0, 0.68611, 0, 0],
        "79": [0, 0.68611, 0, 0],
        "80": [0, 0.68611, 0, 0],
        "81": [0.19444, 0.68611, 0, 0],
        "82": [0, 0.68611, 0, 0],
        "83": [0, 0.68611, 0, 0],
        "84": [0, 0.68611, 0, 0],
        "85": [0, 0.68611, 0, 0],
        "86": [0, 0.68611, 0.01597, 0],
        "87": [0, 0.68611, 0.01597, 0],
        "88": [0, 0.68611, 0, 0],
        "89": [0, 0.68611, 0.02875, 0],
        "90": [0, 0.68611, 0, 0],
        "91": [0.25, 0.75, 0, 0],
        "92": [0.25, 0.75, 0, 0],
        "93": [0.25, 0.75, 0, 0],
        "94": [0, 0.69444, 0, 0],
        "95": [0.31, 0.13444, 0.03194, 0],
        "96": [0, 0.69444, 0, 0],
        "97": [0, 0.44444, 0, 0],
        "98": [0, 0.69444, 0, 0],
        "99": [0, 0.44444, 0, 0],
        "100": [0, 0.69444, 0, 0],
        "101": [0, 0.44444, 0, 0],
        "102": [0, 0.69444, 0.10903, 0],
        "103": [0.19444, 0.44444, 0.01597, 0],
        "104": [0, 0.69444, 0, 0],
        "105": [0, 0.69444, 0, 0],
        "106": [0.19444, 0.69444, 0, 0],
        "107": [0, 0.69444, 0, 0],
        "108": [0, 0.69444, 0, 0],
        "109": [0, 0.44444, 0, 0],
        "110": [0, 0.44444, 0, 0],
        "111": [0, 0.44444, 0, 0],
        "112": [0.19444, 0.44444, 0, 0],
        "113": [0.19444, 0.44444, 0, 0],
        "114": [0, 0.44444, 0, 0],
        "115": [0, 0.44444, 0, 0],
        "116": [0, 0.63492, 0, 0],
        "117": [0, 0.44444, 0, 0],
        "118": [0, 0.44444, 0.01597, 0],
        "119": [0, 0.44444, 0.01597, 0],
        "120": [0, 0.44444, 0, 0],
        "121": [0.19444, 0.44444, 0.01597, 0],
        "122": [0, 0.44444, 0, 0],
        "123": [0.25, 0.75, 0, 0],
        "124": [0.25, 0.75, 0, 0],
        "125": [0.25, 0.75, 0, 0],
        "126": [0.35, 0.34444, 0, 0],
        "168": [0, 0.69444, 0, 0],
        "172": [0, 0.44444, 0, 0],
        "175": [0, 0.59611, 0, 0],
        "176": [0, 0.69444, 0, 0],
        "177": [0.13333, 0.63333, 0, 0],
        "180": [0, 0.69444, 0, 0],
        "215": [0.13333, 0.63333, 0, 0],
        "247": [0.13333, 0.63333, 0, 0],
        "305": [0, 0.44444, 0, 0],
        "567": [0.19444, 0.44444, 0, 0],
        "710": [0, 0.69444, 0, 0],
        "711": [0, 0.63194, 0, 0],
        "713": [0, 0.59611, 0, 0],
        "714": [0, 0.69444, 0, 0],
        "715": [0, 0.69444, 0, 0],
        "728": [0, 0.69444, 0, 0],
        "729": [0, 0.69444, 0, 0],
        "730": [0, 0.69444, 0, 0],
        "732": [0, 0.69444, 0, 0],
        "768": [0, 0.69444, 0, 0],
        "769": [0, 0.69444, 0, 0],
        "770": [0, 0.69444, 0, 0],
        "771": [0, 0.69444, 0, 0],
        "772": [0, 0.59611, 0, 0],
        "774": [0, 0.69444, 0, 0],
        "775": [0, 0.69444, 0, 0],
        "776": [0, 0.69444, 0, 0],
        "778": [0, 0.69444, 0, 0],
        "779": [0, 0.69444, 0, 0],
        "780": [0, 0.63194, 0, 0],
        "824": [0.19444, 0.69444, 0, 0],
        "915": [0, 0.68611, 0, 0],
        "916": [0, 0.68611, 0, 0],
        "920": [0, 0.68611, 0, 0],
        "923": [0, 0.68611, 0, 0],
        "926": [0, 0.68611, 0, 0],
        "928": [0, 0.68611, 0, 0],
        "931": [0, 0.68611, 0, 0],
        "933": [0, 0.68611, 0, 0],
        "934": [0, 0.68611, 0, 0],
        "936": [0, 0.68611, 0, 0],
        "937": [0, 0.68611, 0, 0],
        "8211": [0, 0.44444, 0.03194, 0],
        "8212": [0, 0.44444, 0.03194, 0],
        "8216": [0, 0.69444, 0, 0],
        "8217": [0, 0.69444, 0, 0],
        "8220": [0, 0.69444, 0, 0],
        "8221": [0, 0.69444, 0, 0],
        "8224": [0.19444, 0.69444, 0, 0],
        "8225": [0.19444, 0.69444, 0, 0],
        "8242": [0, 0.55556, 0, 0],
        "8407": [0, 0.72444, 0.15486, 0],
        "8463": [0, 0.69444, 0, 0],
        "8465": [0, 0.69444, 0, 0],
        "8467": [0, 0.69444, 0, 0],
        "8472": [0.19444, 0.44444, 0, 0],
        "8476": [0, 0.69444, 0, 0],
        "8501": [0, 0.69444, 0, 0],
        "8592": [-0.10889, 0.39111, 0, 0],
        "8593": [0.19444, 0.69444, 0, 0],
        "8594": [-0.10889, 0.39111, 0, 0],
        "8595": [0.19444, 0.69444, 0, 0],
        "8596": [-0.10889, 0.39111, 0, 0],
        "8597": [0.25, 0.75, 0, 0],
        "8598": [0.19444, 0.69444, 0, 0],
        "8599": [0.19444, 0.69444, 0, 0],
        "8600": [0.19444, 0.69444, 0, 0],
        "8601": [0.19444, 0.69444, 0, 0],
        "8636": [-0.10889, 0.39111, 0, 0],
        "8637": [-0.10889, 0.39111, 0, 0],
        "8640": [-0.10889, 0.39111, 0, 0],
        "8641": [-0.10889, 0.39111, 0, 0],
        "8656": [-0.10889, 0.39111, 0, 0],
        "8657": [0.19444, 0.69444, 0, 0],
        "8658": [-0.10889, 0.39111, 0, 0],
        "8659": [0.19444, 0.69444, 0, 0],
        "8660": [-0.10889, 0.39111, 0, 0],
        "8661": [0.25, 0.75, 0, 0],
        "8704": [0, 0.69444, 0, 0],
        "8706": [0, 0.69444, 0.06389, 0],
        "8707": [0, 0.69444, 0, 0],
        "8709": [0.05556, 0.75, 0, 0],
        "8711": [0, 0.68611, 0, 0],
        "8712": [0.08556, 0.58556, 0, 0],
        "8715": [0.08556, 0.58556, 0, 0],
        "8722": [0.13333, 0.63333, 0, 0],
        "8723": [0.13333, 0.63333, 0, 0],
        "8725": [0.25, 0.75, 0, 0],
        "8726": [0.25, 0.75, 0, 0],
        "8727": [-0.02778, 0.47222, 0, 0],
        "8728": [-0.02639, 0.47361, 0, 0],
        "8729": [-0.02639, 0.47361, 0, 0],
        "8730": [0.18, 0.82, 0, 0],
        "8733": [0, 0.44444, 0, 0],
        "8734": [0, 0.44444, 0, 0],
        "8736": [0, 0.69224, 0, 0],
        "8739": [0.25, 0.75, 0, 0],
        "8741": [0.25, 0.75, 0, 0],
        "8743": [0, 0.55556, 0, 0],
        "8744": [0, 0.55556, 0, 0],
        "8745": [0, 0.55556, 0, 0],
        "8746": [0, 0.55556, 0, 0],
        "8747": [0.19444, 0.69444, 0.12778, 0],
        "8764": [-0.10889, 0.39111, 0, 0],
        "8768": [0.19444, 0.69444, 0, 0],
        "8771": [0.00222, 0.50222, 0, 0],
        "8776": [0.02444, 0.52444, 0, 0],
        "8781": [0.00222, 0.50222, 0, 0],
        "8801": [0.00222, 0.50222, 0, 0],
        "8804": [0.19667, 0.69667, 0, 0],
        "8805": [0.19667, 0.69667, 0, 0],
        "8810": [0.08556, 0.58556, 0, 0],
        "8811": [0.08556, 0.58556, 0, 0],
        "8826": [0.08556, 0.58556, 0, 0],
        "8827": [0.08556, 0.58556, 0, 0],
        "8834": [0.08556, 0.58556, 0, 0],
        "8835": [0.08556, 0.58556, 0, 0],
        "8838": [0.19667, 0.69667, 0, 0],
        "8839": [0.19667, 0.69667, 0, 0],
        "8846": [0, 0.55556, 0, 0],
        "8849": [0.19667, 0.69667, 0, 0],
        "8850": [0.19667, 0.69667, 0, 0],
        "8851": [0, 0.55556, 0, 0],
        "8852": [0, 0.55556, 0, 0],
        "8853": [0.13333, 0.63333, 0, 0],
        "8854": [0.13333, 0.63333, 0, 0],
        "8855": [0.13333, 0.63333, 0, 0],
        "8856": [0.13333, 0.63333, 0, 0],
        "8857": [0.13333, 0.63333, 0, 0],
        "8866": [0, 0.69444, 0, 0],
        "8867": [0, 0.69444, 0, 0],
        "8868": [0, 0.69444, 0, 0],
        "8869": [0, 0.69444, 0, 0],
        "8900": [-0.02639, 0.47361, 0, 0],
        "8901": [-0.02639, 0.47361, 0, 0],
        "8902": [-0.02778, 0.47222, 0, 0],
        "8968": [0.25, 0.75, 0, 0],
        "8969": [0.25, 0.75, 0, 0],
        "8970": [0.25, 0.75, 0, 0],
        "8971": [0.25, 0.75, 0, 0],
        "8994": [-0.13889, 0.36111, 0, 0],
        "8995": [-0.13889, 0.36111, 0, 0],
        "9651": [0.19444, 0.69444, 0, 0],
        "9657": [-0.02778, 0.47222, 0, 0],
        "9661": [0.19444, 0.69444, 0, 0],
        "9667": [-0.02778, 0.47222, 0, 0],
        "9711": [0.19444, 0.69444, 0, 0],
        "9824": [0.12963, 0.69444, 0, 0],
        "9825": [0.12963, 0.69444, 0, 0],
        "9826": [0.12963, 0.69444, 0, 0],
        "9827": [0.12963, 0.69444, 0, 0],
        "9837": [0, 0.75, 0, 0],
        "9838": [0.19444, 0.69444, 0, 0],
        "9839": [0.19444, 0.69444, 0, 0],
        "10216": [0.25, 0.75, 0, 0],
        "10217": [0.25, 0.75, 0, 0],
        "10815": [0, 0.68611, 0, 0],
        "10927": [0.19667, 0.69667, 0, 0],
        "10928": [0.19667, 0.69667, 0, 0]
    },
    "Main-Italic": {
        "33": [0, 0.69444, 0.12417, 0],
        "34": [0, 0.69444, 0.06961, 0],
        "35": [0.19444, 0.69444, 0.06616, 0],
        "37": [0.05556, 0.75, 0.13639, 0],
        "38": [0, 0.69444, 0.09694, 0],
        "39": [0, 0.69444, 0.12417, 0],
        "40": [0.25, 0.75, 0.16194, 0],
        "41": [0.25, 0.75, 0.03694, 0],
        "42": [0, 0.75, 0.14917, 0],
        "43": [0.05667, 0.56167, 0.03694, 0],
        "44": [0.19444, 0.10556, 0, 0],
        "45": [0, 0.43056, 0.02826, 0],
        "46": [0, 0.10556, 0, 0],
        "47": [0.25, 0.75, 0.16194, 0],
        "48": [0, 0.64444, 0.13556, 0],
        "49": [0, 0.64444, 0.13556, 0],
        "50": [0, 0.64444, 0.13556, 0],
        "51": [0, 0.64444, 0.13556, 0],
        "52": [0.19444, 0.64444, 0.13556, 0],
        "53": [0, 0.64444, 0.13556, 0],
        "54": [0, 0.64444, 0.13556, 0],
        "55": [0.19444, 0.64444, 0.13556, 0],
        "56": [0, 0.64444, 0.13556, 0],
        "57": [0, 0.64444, 0.13556, 0],
        "58": [0, 0.43056, 0.0582, 0],
        "59": [0.19444, 0.43056, 0.0582, 0],
        "61": [-0.13313, 0.36687, 0.06616, 0],
        "63": [0, 0.69444, 0.1225, 0],
        "64": [0, 0.69444, 0.09597, 0],
        "65": [0, 0.68333, 0, 0],
        "66": [0, 0.68333, 0.10257, 0],
        "67": [0, 0.68333, 0.14528, 0],
        "68": [0, 0.68333, 0.09403, 0],
        "69": [0, 0.68333, 0.12028, 0],
        "70": [0, 0.68333, 0.13305, 0],
        "71": [0, 0.68333, 0.08722, 0],
        "72": [0, 0.68333, 0.16389, 0],
        "73": [0, 0.68333, 0.15806, 0],
        "74": [0, 0.68333, 0.14028, 0],
        "75": [0, 0.68333, 0.14528, 0],
        "76": [0, 0.68333, 0, 0],
        "77": [0, 0.68333, 0.16389, 0],
        "78": [0, 0.68333, 0.16389, 0],
        "79": [0, 0.68333, 0.09403, 0],
        "80": [0, 0.68333, 0.10257, 0],
        "81": [0.19444, 0.68333, 0.09403, 0],
        "82": [0, 0.68333, 0.03868, 0],
        "83": [0, 0.68333, 0.11972, 0],
        "84": [0, 0.68333, 0.13305, 0],
        "85": [0, 0.68333, 0.16389, 0],
        "86": [0, 0.68333, 0.18361, 0],
        "87": [0, 0.68333, 0.18361, 0],
        "88": [0, 0.68333, 0.15806, 0],
        "89": [0, 0.68333, 0.19383, 0],
        "90": [0, 0.68333, 0.14528, 0],
        "91": [0.25, 0.75, 0.1875, 0],
        "93": [0.25, 0.75, 0.10528, 0],
        "94": [0, 0.69444, 0.06646, 0],
        "95": [0.31, 0.12056, 0.09208, 0],
        "97": [0, 0.43056, 0.07671, 0],
        "98": [0, 0.69444, 0.06312, 0],
        "99": [0, 0.43056, 0.05653, 0],
        "100": [0, 0.69444, 0.10333, 0],
        "101": [0, 0.43056, 0.07514, 0],
        "102": [0.19444, 0.69444, 0.21194, 0],
        "103": [0.19444, 0.43056, 0.08847, 0],
        "104": [0, 0.69444, 0.07671, 0],
        "105": [0, 0.65536, 0.1019, 0],
        "106": [0.19444, 0.65536, 0.14467, 0],
        "107": [0, 0.69444, 0.10764, 0],
        "108": [0, 0.69444, 0.10333, 0],
        "109": [0, 0.43056, 0.07671, 0],
        "110": [0, 0.43056, 0.07671, 0],
        "111": [0, 0.43056, 0.06312, 0],
        "112": [0.19444, 0.43056, 0.06312, 0],
        "113": [0.19444, 0.43056, 0.08847, 0],
        "114": [0, 0.43056, 0.10764, 0],
        "115": [0, 0.43056, 0.08208, 0],
        "116": [0, 0.61508, 0.09486, 0],
        "117": [0, 0.43056, 0.07671, 0],
        "118": [0, 0.43056, 0.10764, 0],
        "119": [0, 0.43056, 0.10764, 0],
        "120": [0, 0.43056, 0.12042, 0],
        "121": [0.19444, 0.43056, 0.08847, 0],
        "122": [0, 0.43056, 0.12292, 0],
        "126": [0.35, 0.31786, 0.11585, 0],
        "163": [0, 0.69444, 0, 0],
        "305": [0, 0.43056, 0, 0.02778],
        "567": [0.19444, 0.43056, 0, 0.08334],
        "768": [0, 0.69444, 0, 0],
        "769": [0, 0.69444, 0.09694, 0],
        "770": [0, 0.69444, 0.06646, 0],
        "771": [0, 0.66786, 0.11585, 0],
        "772": [0, 0.56167, 0.10333, 0],
        "774": [0, 0.69444, 0.10806, 0],
        "775": [0, 0.66786, 0.11752, 0],
        "776": [0, 0.66786, 0.10474, 0],
        "778": [0, 0.69444, 0, 0],
        "779": [0, 0.69444, 0.1225, 0],
        "780": [0, 0.62847, 0.08295, 0],
        "915": [0, 0.68333, 0.13305, 0],
        "916": [0, 0.68333, 0, 0],
        "920": [0, 0.68333, 0.09403, 0],
        "923": [0, 0.68333, 0, 0],
        "926": [0, 0.68333, 0.15294, 0],
        "928": [0, 0.68333, 0.16389, 0],
        "931": [0, 0.68333, 0.12028, 0],
        "933": [0, 0.68333, 0.11111, 0],
        "934": [0, 0.68333, 0.05986, 0],
        "936": [0, 0.68333, 0.11111, 0],
        "937": [0, 0.68333, 0.10257, 0],
        "8211": [0, 0.43056, 0.09208, 0],
        "8212": [0, 0.43056, 0.09208, 0],
        "8216": [0, 0.69444, 0.12417, 0],
        "8217": [0, 0.69444, 0.12417, 0],
        "8220": [0, 0.69444, 0.1685, 0],
        "8221": [0, 0.69444, 0.06961, 0],
        "8463": [0, 0.68889, 0, 0]
    },
    "Main-Regular": {
        "32": [0, 0, 0, 0],
        "33": [0, 0.69444, 0, 0],
        "34": [0, 0.69444, 0, 0],
        "35": [0.19444, 0.69444, 0, 0],
        "36": [0.05556, 0.75, 0, 0],
        "37": [0.05556, 0.75, 0, 0],
        "38": [0, 0.69444, 0, 0],
        "39": [0, 0.69444, 0, 0],
        "40": [0.25, 0.75, 0, 0],
        "41": [0.25, 0.75, 0, 0],
        "42": [0, 0.75, 0, 0],
        "43": [0.08333, 0.58333, 0, 0],
        "44": [0.19444, 0.10556, 0, 0],
        "45": [0, 0.43056, 0, 0],
        "46": [0, 0.10556, 0, 0],
        "47": [0.25, 0.75, 0, 0],
        "48": [0, 0.64444, 0, 0],
        "49": [0, 0.64444, 0, 0],
        "50": [0, 0.64444, 0, 0],
        "51": [0, 0.64444, 0, 0],
        "52": [0, 0.64444, 0, 0],
        "53": [0, 0.64444, 0, 0],
        "54": [0, 0.64444, 0, 0],
        "55": [0, 0.64444, 0, 0],
        "56": [0, 0.64444, 0, 0],
        "57": [0, 0.64444, 0, 0],
        "58": [0, 0.43056, 0, 0],
        "59": [0.19444, 0.43056, 0, 0],
        "60": [0.0391, 0.5391, 0, 0],
        "61": [-0.13313, 0.36687, 0, 0],
        "62": [0.0391, 0.5391, 0, 0],
        "63": [0, 0.69444, 0, 0],
        "64": [0, 0.69444, 0, 0],
        "65": [0, 0.68333, 0, 0],
        "66": [0, 0.68333, 0, 0],
        "67": [0, 0.68333, 0, 0],
        "68": [0, 0.68333, 0, 0],
        "69": [0, 0.68333, 0, 0],
        "70": [0, 0.68333, 0, 0],
        "71": [0, 0.68333, 0, 0],
        "72": [0, 0.68333, 0, 0],
        "73": [0, 0.68333, 0, 0],
        "74": [0, 0.68333, 0, 0],
        "75": [0, 0.68333, 0, 0],
        "76": [0, 0.68333, 0, 0],
        "77": [0, 0.68333, 0, 0],
        "78": [0, 0.68333, 0, 0],
        "79": [0, 0.68333, 0, 0],
        "80": [0, 0.68333, 0, 0],
        "81": [0.19444, 0.68333, 0, 0],
        "82": [0, 0.68333, 0, 0],
        "83": [0, 0.68333, 0, 0],
        "84": [0, 0.68333, 0, 0],
        "85": [0, 0.68333, 0, 0],
        "86": [0, 0.68333, 0.01389, 0],
        "87": [0, 0.68333, 0.01389, 0],
        "88": [0, 0.68333, 0, 0],
        "89": [0, 0.68333, 0.025, 0],
        "90": [0, 0.68333, 0, 0],
        "91": [0.25, 0.75, 0, 0],
        "92": [0.25, 0.75, 0, 0],
        "93": [0.25, 0.75, 0, 0],
        "94": [0, 0.69444, 0, 0],
        "95": [0.31, 0.12056, 0.02778, 0],
        "96": [0, 0.69444, 0, 0],
        "97": [0, 0.43056, 0, 0],
        "98": [0, 0.69444, 0, 0],
        "99": [0, 0.43056, 0, 0],
        "100": [0, 0.69444, 0, 0],
        "101": [0, 0.43056, 0, 0],
        "102": [0, 0.69444, 0.07778, 0],
        "103": [0.19444, 0.43056, 0.01389, 0],
        "104": [0, 0.69444, 0, 0],
        "105": [0, 0.66786, 0, 0],
        "106": [0.19444, 0.66786, 0, 0],
        "107": [0, 0.69444, 0, 0],
        "108": [0, 0.69444, 0, 0],
        "109": [0, 0.43056, 0, 0],
        "110": [0, 0.43056, 0, 0],
        "111": [0, 0.43056, 0, 0],
        "112": [0.19444, 0.43056, 0, 0],
        "113": [0.19444, 0.43056, 0, 0],
        "114": [0, 0.43056, 0, 0],
        "115": [0, 0.43056, 0, 0],
        "116": [0, 0.61508, 0, 0],
        "117": [0, 0.43056, 0, 0],
        "118": [0, 0.43056, 0.01389, 0],
        "119": [0, 0.43056, 0.01389, 0],
        "120": [0, 0.43056, 0, 0],
        "121": [0.19444, 0.43056, 0.01389, 0],
        "122": [0, 0.43056, 0, 0],
        "123": [0.25, 0.75, 0, 0],
        "124": [0.25, 0.75, 0, 0],
        "125": [0.25, 0.75, 0, 0],
        "126": [0.35, 0.31786, 0, 0],
        "160": [0, 0, 0, 0],
        "168": [0, 0.66786, 0, 0],
        "172": [0, 0.43056, 0, 0],
        "175": [0, 0.56778, 0, 0],
        "176": [0, 0.69444, 0, 0],
        "177": [0.08333, 0.58333, 0, 0],
        "180": [0, 0.69444, 0, 0],
        "215": [0.08333, 0.58333, 0, 0],
        "247": [0.08333, 0.58333, 0, 0],
        "305": [0, 0.43056, 0, 0],
        "567": [0.19444, 0.43056, 0, 0],
        "710": [0, 0.69444, 0, 0],
        "711": [0, 0.62847, 0, 0],
        "713": [0, 0.56778, 0, 0],
        "714": [0, 0.69444, 0, 0],
        "715": [0, 0.69444, 0, 0],
        "728": [0, 0.69444, 0, 0],
        "729": [0, 0.66786, 0, 0],
        "730": [0, 0.69444, 0, 0],
        "732": [0, 0.66786, 0, 0],
        "768": [0, 0.69444, 0, 0],
        "769": [0, 0.69444, 0, 0],
        "770": [0, 0.69444, 0, 0],
        "771": [0, 0.66786, 0, 0],
        "772": [0, 0.56778, 0, 0],
        "774": [0, 0.69444, 0, 0],
        "775": [0, 0.66786, 0, 0],
        "776": [0, 0.66786, 0, 0],
        "778": [0, 0.69444, 0, 0],
        "779": [0, 0.69444, 0, 0],
        "780": [0, 0.62847, 0, 0],
        "824": [0.19444, 0.69444, 0, 0],
        "915": [0, 0.68333, 0, 0],
        "916": [0, 0.68333, 0, 0],
        "920": [0, 0.68333, 0, 0],
        "923": [0, 0.68333, 0, 0],
        "926": [0, 0.68333, 0, 0],
        "928": [0, 0.68333, 0, 0],
        "931": [0, 0.68333, 0, 0],
        "933": [0, 0.68333, 0, 0],
        "934": [0, 0.68333, 0, 0],
        "936": [0, 0.68333, 0, 0],
        "937": [0, 0.68333, 0, 0],
        "8211": [0, 0.43056, 0.02778, 0],
        "8212": [0, 0.43056, 0.02778, 0],
        "8216": [0, 0.69444, 0, 0],
        "8217": [0, 0.69444, 0, 0],
        "8220": [0, 0.69444, 0, 0],
        "8221": [0, 0.69444, 0, 0],
        "8224": [0.19444, 0.69444, 0, 0],
        "8225": [0.19444, 0.69444, 0, 0],
        "8230": [0, 0.12, 0, 0],
        "8242": [0, 0.55556, 0, 0],
        "8407": [0, 0.71444, 0.15382, 0],
        "8463": [0, 0.68889, 0, 0],
        "8465": [0, 0.69444, 0, 0],
        "8467": [0, 0.69444, 0, 0.11111],
        "8472": [0.19444, 0.43056, 0, 0.11111],
        "8476": [0, 0.69444, 0, 0],
        "8501": [0, 0.69444, 0, 0],
        "8592": [-0.13313, 0.36687, 0, 0],
        "8593": [0.19444, 0.69444, 0, 0],
        "8594": [-0.13313, 0.36687, 0, 0],
        "8595": [0.19444, 0.69444, 0, 0],
        "8596": [-0.13313, 0.36687, 0, 0],
        "8597": [0.25, 0.75, 0, 0],
        "8598": [0.19444, 0.69444, 0, 0],
        "8599": [0.19444, 0.69444, 0, 0],
        "8600": [0.19444, 0.69444, 0, 0],
        "8601": [0.19444, 0.69444, 0, 0],
        "8614": [0.011, 0.511, 0, 0],
        "8617": [0.011, 0.511, 0, 0],
        "8618": [0.011, 0.511, 0, 0],
        "8636": [-0.13313, 0.36687, 0, 0],
        "8637": [-0.13313, 0.36687, 0, 0],
        "8640": [-0.13313, 0.36687, 0, 0],
        "8641": [-0.13313, 0.36687, 0, 0],
        "8652": [0.011, 0.671, 0, 0],
        "8656": [-0.13313, 0.36687, 0, 0],
        "8657": [0.19444, 0.69444, 0, 0],
        "8658": [-0.13313, 0.36687, 0, 0],
        "8659": [0.19444, 0.69444, 0, 0],
        "8660": [-0.13313, 0.36687, 0, 0],
        "8661": [0.25, 0.75, 0, 0],
        "8704": [0, 0.69444, 0, 0],
        "8706": [0, 0.69444, 0.05556, 0.08334],
        "8707": [0, 0.69444, 0, 0],
        "8709": [0.05556, 0.75, 0, 0],
        "8711": [0, 0.68333, 0, 0],
        "8712": [0.0391, 0.5391, 0, 0],
        "8715": [0.0391, 0.5391, 0, 0],
        "8722": [0.08333, 0.58333, 0, 0],
        "8723": [0.08333, 0.58333, 0, 0],
        "8725": [0.25, 0.75, 0, 0],
        "8726": [0.25, 0.75, 0, 0],
        "8727": [-0.03472, 0.46528, 0, 0],
        "8728": [-0.05555, 0.44445, 0, 0],
        "8729": [-0.05555, 0.44445, 0, 0],
        "8730": [0.2, 0.8, 0, 0],
        "8733": [0, 0.43056, 0, 0],
        "8734": [0, 0.43056, 0, 0],
        "8736": [0, 0.69224, 0, 0],
        "8739": [0.25, 0.75, 0, 0],
        "8741": [0.25, 0.75, 0, 0],
        "8743": [0, 0.55556, 0, 0],
        "8744": [0, 0.55556, 0, 0],
        "8745": [0, 0.55556, 0, 0],
        "8746": [0, 0.55556, 0, 0],
        "8747": [0.19444, 0.69444, 0.11111, 0],
        "8764": [-0.13313, 0.36687, 0, 0],
        "8768": [0.19444, 0.69444, 0, 0],
        "8771": [-0.03625, 0.46375, 0, 0],
        "8773": [-0.022, 0.589, 0, 0],
        "8776": [-0.01688, 0.48312, 0, 0],
        "8781": [-0.03625, 0.46375, 0, 0],
        "8784": [-0.133, 0.67, 0, 0],
        "8800": [0.215, 0.716, 0, 0],
        "8801": [-0.03625, 0.46375, 0, 0],
        "8804": [0.13597, 0.63597, 0, 0],
        "8805": [0.13597, 0.63597, 0, 0],
        "8810": [0.0391, 0.5391, 0, 0],
        "8811": [0.0391, 0.5391, 0, 0],
        "8826": [0.0391, 0.5391, 0, 0],
        "8827": [0.0391, 0.5391, 0, 0],
        "8834": [0.0391, 0.5391, 0, 0],
        "8835": [0.0391, 0.5391, 0, 0],
        "8838": [0.13597, 0.63597, 0, 0],
        "8839": [0.13597, 0.63597, 0, 0],
        "8846": [0, 0.55556, 0, 0],
        "8849": [0.13597, 0.63597, 0, 0],
        "8850": [0.13597, 0.63597, 0, 0],
        "8851": [0, 0.55556, 0, 0],
        "8852": [0, 0.55556, 0, 0],
        "8853": [0.08333, 0.58333, 0, 0],
        "8854": [0.08333, 0.58333, 0, 0],
        "8855": [0.08333, 0.58333, 0, 0],
        "8856": [0.08333, 0.58333, 0, 0],
        "8857": [0.08333, 0.58333, 0, 0],
        "8866": [0, 0.69444, 0, 0],
        "8867": [0, 0.69444, 0, 0],
        "8868": [0, 0.69444, 0, 0],
        "8869": [0, 0.69444, 0, 0],
        "8872": [0.249, 0.75, 0, 0],
        "8900": [-0.05555, 0.44445, 0, 0],
        "8901": [-0.05555, 0.44445, 0, 0],
        "8902": [-0.03472, 0.46528, 0, 0],
        "8904": [0.005, 0.505, 0, 0],
        "8942": [0.03, 0.9, 0, 0],
        "8943": [-0.19, 0.31, 0, 0],
        "8945": [-0.1, 0.82, 0, 0],
        "8968": [0.25, 0.75, 0, 0],
        "8969": [0.25, 0.75, 0, 0],
        "8970": [0.25, 0.75, 0, 0],
        "8971": [0.25, 0.75, 0, 0],
        "8994": [-0.14236, 0.35764, 0, 0],
        "8995": [-0.14236, 0.35764, 0, 0],
        "9136": [0.244, 0.744, 0, 0],
        "9137": [0.244, 0.744, 0, 0],
        "9651": [0.19444, 0.69444, 0, 0],
        "9657": [-0.03472, 0.46528, 0, 0],
        "9661": [0.19444, 0.69444, 0, 0],
        "9667": [-0.03472, 0.46528, 0, 0],
        "9711": [0.19444, 0.69444, 0, 0],
        "9824": [0.12963, 0.69444, 0, 0],
        "9825": [0.12963, 0.69444, 0, 0],
        "9826": [0.12963, 0.69444, 0, 0],
        "9827": [0.12963, 0.69444, 0, 0],
        "9837": [0, 0.75, 0, 0],
        "9838": [0.19444, 0.69444, 0, 0],
        "9839": [0.19444, 0.69444, 0, 0],
        "10216": [0.25, 0.75, 0, 0],
        "10217": [0.25, 0.75, 0, 0],
        "10222": [0.244, 0.744, 0, 0],
        "10223": [0.244, 0.744, 0, 0],
        "10229": [0.011, 0.511, 0, 0],
        "10230": [0.011, 0.511, 0, 0],
        "10231": [0.011, 0.511, 0, 0],
        "10232": [0.024, 0.525, 0, 0],
        "10233": [0.024, 0.525, 0, 0],
        "10234": [0.024, 0.525, 0, 0],
        "10236": [0.011, 0.511, 0, 0],
        "10815": [0, 0.68333, 0, 0],
        "10927": [0.13597, 0.63597, 0, 0],
        "10928": [0.13597, 0.63597, 0, 0]
    },
    "Math-BoldItalic": {
        "47": [0.19444, 0.69444, 0, 0],
        "65": [0, 0.68611, 0, 0],
        "66": [0, 0.68611, 0.04835, 0],
        "67": [0, 0.68611, 0.06979, 0],
        "68": [0, 0.68611, 0.03194, 0],
        "69": [0, 0.68611, 0.05451, 0],
        "70": [0, 0.68611, 0.15972, 0],
        "71": [0, 0.68611, 0, 0],
        "72": [0, 0.68611, 0.08229, 0],
        "73": [0, 0.68611, 0.07778, 0],
        "74": [0, 0.68611, 0.10069, 0],
        "75": [0, 0.68611, 0.06979, 0],
        "76": [0, 0.68611, 0, 0],
        "77": [0, 0.68611, 0.11424, 0],
        "78": [0, 0.68611, 0.11424, 0],
        "79": [0, 0.68611, 0.03194, 0],
        "80": [0, 0.68611, 0.15972, 0],
        "81": [0.19444, 0.68611, 0, 0],
        "82": [0, 0.68611, 0.00421, 0],
        "83": [0, 0.68611, 0.05382, 0],
        "84": [0, 0.68611, 0.15972, 0],
        "85": [0, 0.68611, 0.11424, 0],
        "86": [0, 0.68611, 0.25555, 0],
        "87": [0, 0.68611, 0.15972, 0],
        "88": [0, 0.68611, 0.07778, 0],
        "89": [0, 0.68611, 0.25555, 0],
        "90": [0, 0.68611, 0.06979, 0],
        "97": [0, 0.44444, 0, 0],
        "98": [0, 0.69444, 0, 0],
        "99": [0, 0.44444, 0, 0],
        "100": [0, 0.69444, 0, 0],
        "101": [0, 0.44444, 0, 0],
        "102": [0.19444, 0.69444, 0.11042, 0],
        "103": [0.19444, 0.44444, 0.03704, 0],
        "104": [0, 0.69444, 0, 0],
        "105": [0, 0.69326, 0, 0],
        "106": [0.19444, 0.69326, 0.0622, 0],
        "107": [0, 0.69444, 0.01852, 0],
        "108": [0, 0.69444, 0.0088, 0],
        "109": [0, 0.44444, 0, 0],
        "110": [0, 0.44444, 0, 0],
        "111": [0, 0.44444, 0, 0],
        "112": [0.19444, 0.44444, 0, 0],
        "113": [0.19444, 0.44444, 0.03704, 0],
        "114": [0, 0.44444, 0.03194, 0],
        "115": [0, 0.44444, 0, 0],
        "116": [0, 0.63492, 0, 0],
        "117": [0, 0.44444, 0, 0],
        "118": [0, 0.44444, 0.03704, 0],
        "119": [0, 0.44444, 0.02778, 0],
        "120": [0, 0.44444, 0, 0],
        "121": [0.19444, 0.44444, 0.03704, 0],
        "122": [0, 0.44444, 0.04213, 0],
        "915": [0, 0.68611, 0.15972, 0],
        "916": [0, 0.68611, 0, 0],
        "920": [0, 0.68611, 0.03194, 0],
        "923": [0, 0.68611, 0, 0],
        "926": [0, 0.68611, 0.07458, 0],
        "928": [0, 0.68611, 0.08229, 0],
        "931": [0, 0.68611, 0.05451, 0],
        "933": [0, 0.68611, 0.15972, 0],
        "934": [0, 0.68611, 0, 0],
        "936": [0, 0.68611, 0.11653, 0],
        "937": [0, 0.68611, 0.04835, 0],
        "945": [0, 0.44444, 0, 0],
        "946": [0.19444, 0.69444, 0.03403, 0],
        "947": [0.19444, 0.44444, 0.06389, 0],
        "948": [0, 0.69444, 0.03819, 0],
        "949": [0, 0.44444, 0, 0],
        "950": [0.19444, 0.69444, 0.06215, 0],
        "951": [0.19444, 0.44444, 0.03704, 0],
        "952": [0, 0.69444, 0.03194, 0],
        "953": [0, 0.44444, 0, 0],
        "954": [0, 0.44444, 0, 0],
        "955": [0, 0.69444, 0, 0],
        "956": [0.19444, 0.44444, 0, 0],
        "957": [0, 0.44444, 0.06898, 0],
        "958": [0.19444, 0.69444, 0.03021, 0],
        "959": [0, 0.44444, 0, 0],
        "960": [0, 0.44444, 0.03704, 0],
        "961": [0.19444, 0.44444, 0, 0],
        "962": [0.09722, 0.44444, 0.07917, 0],
        "963": [0, 0.44444, 0.03704, 0],
        "964": [0, 0.44444, 0.13472, 0],
        "965": [0, 0.44444, 0.03704, 0],
        "966": [0.19444, 0.44444, 0, 0],
        "967": [0.19444, 0.44444, 0, 0],
        "968": [0.19444, 0.69444, 0.03704, 0],
        "969": [0, 0.44444, 0.03704, 0],
        "977": [0, 0.69444, 0, 0],
        "981": [0.19444, 0.69444, 0, 0],
        "982": [0, 0.44444, 0.03194, 0],
        "1009": [0.19444, 0.44444, 0, 0],
        "1013": [0, 0.44444, 0, 0]
    },
    "Math-Italic": {
        "47": [0.19444, 0.69444, 0, 0],
        "65": [0, 0.68333, 0, 0.13889],
        "66": [0, 0.68333, 0.05017, 0.08334],
        "67": [0, 0.68333, 0.07153, 0.08334],
        "68": [0, 0.68333, 0.02778, 0.05556],
        "69": [0, 0.68333, 0.05764, 0.08334],
        "70": [0, 0.68333, 0.13889, 0.08334],
        "71": [0, 0.68333, 0, 0.08334],
        "72": [0, 0.68333, 0.08125, 0.05556],
        "73": [0, 0.68333, 0.07847, 0.11111],
        "74": [0, 0.68333, 0.09618, 0.16667],
        "75": [0, 0.68333, 0.07153, 0.05556],
        "76": [0, 0.68333, 0, 0.02778],
        "77": [0, 0.68333, 0.10903, 0.08334],
        "78": [0, 0.68333, 0.10903, 0.08334],
        "79": [0, 0.68333, 0.02778, 0.08334],
        "80": [0, 0.68333, 0.13889, 0.08334],
        "81": [0.19444, 0.68333, 0, 0.08334],
        "82": [0, 0.68333, 0.00773, 0.08334],
        "83": [0, 0.68333, 0.05764, 0.08334],
        "84": [0, 0.68333, 0.13889, 0.08334],
        "85": [0, 0.68333, 0.10903, 0.02778],
        "86": [0, 0.68333, 0.22222, 0],
        "87": [0, 0.68333, 0.13889, 0],
        "88": [0, 0.68333, 0.07847, 0.08334],
        "89": [0, 0.68333, 0.22222, 0],
        "90": [0, 0.68333, 0.07153, 0.08334],
        "97": [0, 0.43056, 0, 0],
        "98": [0, 0.69444, 0, 0],
        "99": [0, 0.43056, 0, 0.05556],
        "100": [0, 0.69444, 0, 0.16667],
        "101": [0, 0.43056, 0, 0.05556],
        "102": [0.19444, 0.69444, 0.10764, 0.16667],
        "103": [0.19444, 0.43056, 0.03588, 0.02778],
        "104": [0, 0.69444, 0, 0],
        "105": [0, 0.65952, 0, 0],
        "106": [0.19444, 0.65952, 0.05724, 0],
        "107": [0, 0.69444, 0.03148, 0],
        "108": [0, 0.69444, 0.01968, 0.08334],
        "109": [0, 0.43056, 0, 0],
        "110": [0, 0.43056, 0, 0],
        "111": [0, 0.43056, 0, 0.05556],
        "112": [0.19444, 0.43056, 0, 0.08334],
        "113": [0.19444, 0.43056, 0.03588, 0.08334],
        "114": [0, 0.43056, 0.02778, 0.05556],
        "115": [0, 0.43056, 0, 0.05556],
        "116": [0, 0.61508, 0, 0.08334],
        "117": [0, 0.43056, 0, 0.02778],
        "118": [0, 0.43056, 0.03588, 0.02778],
        "119": [0, 0.43056, 0.02691, 0.08334],
        "120": [0, 0.43056, 0, 0.02778],
        "121": [0.19444, 0.43056, 0.03588, 0.05556],
        "122": [0, 0.43056, 0.04398, 0.05556],
        "915": [0, 0.68333, 0.13889, 0.08334],
        "916": [0, 0.68333, 0, 0.16667],
        "920": [0, 0.68333, 0.02778, 0.08334],
        "923": [0, 0.68333, 0, 0.16667],
        "926": [0, 0.68333, 0.07569, 0.08334],
        "928": [0, 0.68333, 0.08125, 0.05556],
        "931": [0, 0.68333, 0.05764, 0.08334],
        "933": [0, 0.68333, 0.13889, 0.05556],
        "934": [0, 0.68333, 0, 0.08334],
        "936": [0, 0.68333, 0.11, 0.05556],
        "937": [0, 0.68333, 0.05017, 0.08334],
        "945": [0, 0.43056, 0.0037, 0.02778],
        "946": [0.19444, 0.69444, 0.05278, 0.08334],
        "947": [0.19444, 0.43056, 0.05556, 0],
        "948": [0, 0.69444, 0.03785, 0.05556],
        "949": [0, 0.43056, 0, 0.08334],
        "950": [0.19444, 0.69444, 0.07378, 0.08334],
        "951": [0.19444, 0.43056, 0.03588, 0.05556],
        "952": [0, 0.69444, 0.02778, 0.08334],
        "953": [0, 0.43056, 0, 0.05556],
        "954": [0, 0.43056, 0, 0],
        "955": [0, 0.69444, 0, 0],
        "956": [0.19444, 0.43056, 0, 0.02778],
        "957": [0, 0.43056, 0.06366, 0.02778],
        "958": [0.19444, 0.69444, 0.04601, 0.11111],
        "959": [0, 0.43056, 0, 0.05556],
        "960": [0, 0.43056, 0.03588, 0],
        "961": [0.19444, 0.43056, 0, 0.08334],
        "962": [0.09722, 0.43056, 0.07986, 0.08334],
        "963": [0, 0.43056, 0.03588, 0],
        "964": [0, 0.43056, 0.1132, 0.02778],
        "965": [0, 0.43056, 0.03588, 0.02778],
        "966": [0.19444, 0.43056, 0, 0.08334],
        "967": [0.19444, 0.43056, 0, 0.05556],
        "968": [0.19444, 0.69444, 0.03588, 0.11111],
        "969": [0, 0.43056, 0.03588, 0],
        "977": [0, 0.69444, 0, 0.08334],
        "981": [0.19444, 0.69444, 0, 0.08334],
        "982": [0, 0.43056, 0.02778, 0],
        "1009": [0.19444, 0.43056, 0, 0.08334],
        "1013": [0, 0.43056, 0, 0.05556]
    },
    "Math-Regular": {
        "65": [0, 0.68333, 0, 0.13889],
        "66": [0, 0.68333, 0.05017, 0.08334],
        "67": [0, 0.68333, 0.07153, 0.08334],
        "68": [0, 0.68333, 0.02778, 0.05556],
        "69": [0, 0.68333, 0.05764, 0.08334],
        "70": [0, 0.68333, 0.13889, 0.08334],
        "71": [0, 0.68333, 0, 0.08334],
        "72": [0, 0.68333, 0.08125, 0.05556],
        "73": [0, 0.68333, 0.07847, 0.11111],
        "74": [0, 0.68333, 0.09618, 0.16667],
        "75": [0, 0.68333, 0.07153, 0.05556],
        "76": [0, 0.68333, 0, 0.02778],
        "77": [0, 0.68333, 0.10903, 0.08334],
        "78": [0, 0.68333, 0.10903, 0.08334],
        "79": [0, 0.68333, 0.02778, 0.08334],
        "80": [0, 0.68333, 0.13889, 0.08334],
        "81": [0.19444, 0.68333, 0, 0.08334],
        "82": [0, 0.68333, 0.00773, 0.08334],
        "83": [0, 0.68333, 0.05764, 0.08334],
        "84": [0, 0.68333, 0.13889, 0.08334],
        "85": [0, 0.68333, 0.10903, 0.02778],
        "86": [0, 0.68333, 0.22222, 0],
        "87": [0, 0.68333, 0.13889, 0],
        "88": [0, 0.68333, 0.07847, 0.08334],
        "89": [0, 0.68333, 0.22222, 0],
        "90": [0, 0.68333, 0.07153, 0.08334],
        "97": [0, 0.43056, 0, 0],
        "98": [0, 0.69444, 0, 0],
        "99": [0, 0.43056, 0, 0.05556],
        "100": [0, 0.69444, 0, 0.16667],
        "101": [0, 0.43056, 0, 0.05556],
        "102": [0.19444, 0.69444, 0.10764, 0.16667],
        "103": [0.19444, 0.43056, 0.03588, 0.02778],
        "104": [0, 0.69444, 0, 0],
        "105": [0, 0.65952, 0, 0],
        "106": [0.19444, 0.65952, 0.05724, 0],
        "107": [0, 0.69444, 0.03148, 0],
        "108": [0, 0.69444, 0.01968, 0.08334],
        "109": [0, 0.43056, 0, 0],
        "110": [0, 0.43056, 0, 0],
        "111": [0, 0.43056, 0, 0.05556],
        "112": [0.19444, 0.43056, 0, 0.08334],
        "113": [0.19444, 0.43056, 0.03588, 0.08334],
        "114": [0, 0.43056, 0.02778, 0.05556],
        "115": [0, 0.43056, 0, 0.05556],
        "116": [0, 0.61508, 0, 0.08334],
        "117": [0, 0.43056, 0, 0.02778],
        "118": [0, 0.43056, 0.03588, 0.02778],
        "119": [0, 0.43056, 0.02691, 0.08334],
        "120": [0, 0.43056, 0, 0.02778],
        "121": [0.19444, 0.43056, 0.03588, 0.05556],
        "122": [0, 0.43056, 0.04398, 0.05556],
        "915": [0, 0.68333, 0.13889, 0.08334],
        "916": [0, 0.68333, 0, 0.16667],
        "920": [0, 0.68333, 0.02778, 0.08334],
        "923": [0, 0.68333, 0, 0.16667],
        "926": [0, 0.68333, 0.07569, 0.08334],
        "928": [0, 0.68333, 0.08125, 0.05556],
        "931": [0, 0.68333, 0.05764, 0.08334],
        "933": [0, 0.68333, 0.13889, 0.05556],
        "934": [0, 0.68333, 0, 0.08334],
        "936": [0, 0.68333, 0.11, 0.05556],
        "937": [0, 0.68333, 0.05017, 0.08334],
        "945": [0, 0.43056, 0.0037, 0.02778],
        "946": [0.19444, 0.69444, 0.05278, 0.08334],
        "947": [0.19444, 0.43056, 0.05556, 0],
        "948": [0, 0.69444, 0.03785, 0.05556],
        "949": [0, 0.43056, 0, 0.08334],
        "950": [0.19444, 0.69444, 0.07378, 0.08334],
        "951": [0.19444, 0.43056, 0.03588, 0.05556],
        "952": [0, 0.69444, 0.02778, 0.08334],
        "953": [0, 0.43056, 0, 0.05556],
        "954": [0, 0.43056, 0, 0],
        "955": [0, 0.69444, 0, 0],
        "956": [0.19444, 0.43056, 0, 0.02778],
        "957": [0, 0.43056, 0.06366, 0.02778],
        "958": [0.19444, 0.69444, 0.04601, 0.11111],
        "959": [0, 0.43056, 0, 0.05556],
        "960": [0, 0.43056, 0.03588, 0],
        "961": [0.19444, 0.43056, 0, 0.08334],
        "962": [0.09722, 0.43056, 0.07986, 0.08334],
        "963": [0, 0.43056, 0.03588, 0],
        "964": [0, 0.43056, 0.1132, 0.02778],
        "965": [0, 0.43056, 0.03588, 0.02778],
        "966": [0.19444, 0.43056, 0, 0.08334],
        "967": [0.19444, 0.43056, 0, 0.05556],
        "968": [0.19444, 0.69444, 0.03588, 0.11111],
        "969": [0, 0.43056, 0.03588, 0],
        "977": [0, 0.69444, 0, 0.08334],
        "981": [0.19444, 0.69444, 0, 0.08334],
        "982": [0, 0.43056, 0.02778, 0],
        "1009": [0.19444, 0.43056, 0, 0.08334],
        "1013": [0, 0.43056, 0, 0.05556]
    },
    "SansSerif-Regular": {
        "33": [0, 0.69444, 0, 0],
        "34": [0, 0.69444, 0, 0],
        "35": [0.19444, 0.69444, 0, 0],
        "36": [0.05556, 0.75, 0, 0],
        "37": [0.05556, 0.75, 0, 0],
        "38": [0, 0.69444, 0, 0],
        "39": [0, 0.69444, 0, 0],
        "40": [0.25, 0.75, 0, 0],
        "41": [0.25, 0.75, 0, 0],
        "42": [0, 0.75, 0, 0],
        "43": [0.08333, 0.58333, 0, 0],
        "44": [0.125, 0.08333, 0, 0],
        "45": [0, 0.44444, 0, 0],
        "46": [0, 0.08333, 0, 0],
        "47": [0.25, 0.75, 0, 0],
        "48": [0, 0.65556, 0, 0],
        "49": [0, 0.65556, 0, 0],
        "50": [0, 0.65556, 0, 0],
        "51": [0, 0.65556, 0, 0],
        "52": [0, 0.65556, 0, 0],
        "53": [0, 0.65556, 0, 0],
        "54": [0, 0.65556, 0, 0],
        "55": [0, 0.65556, 0, 0],
        "56": [0, 0.65556, 0, 0],
        "57": [0, 0.65556, 0, 0],
        "58": [0, 0.44444, 0, 0],
        "59": [0.125, 0.44444, 0, 0],
        "61": [-0.13, 0.37, 0, 0],
        "63": [0, 0.69444, 0, 0],
        "64": [0, 0.69444, 0, 0],
        "65": [0, 0.69444, 0, 0],
        "66": [0, 0.69444, 0, 0],
        "67": [0, 0.69444, 0, 0],
        "68": [0, 0.69444, 0, 0],
        "69": [0, 0.69444, 0, 0],
        "70": [0, 0.69444, 0, 0],
        "71": [0, 0.69444, 0, 0],
        "72": [0, 0.69444, 0, 0],
        "73": [0, 0.69444, 0, 0],
        "74": [0, 0.69444, 0, 0],
        "75": [0, 0.69444, 0, 0],
        "76": [0, 0.69444, 0, 0],
        "77": [0, 0.69444, 0, 0],
        "78": [0, 0.69444, 0, 0],
        "79": [0, 0.69444, 0, 0],
        "80": [0, 0.69444, 0, 0],
        "81": [0.125, 0.69444, 0, 0],
        "82": [0, 0.69444, 0, 0],
        "83": [0, 0.69444, 0, 0],
        "84": [0, 0.69444, 0, 0],
        "85": [0, 0.69444, 0, 0],
        "86": [0, 0.69444, 0.01389, 0],
        "87": [0, 0.69444, 0.01389, 0],
        "88": [0, 0.69444, 0, 0],
        "89": [0, 0.69444, 0.025, 0],
        "90": [0, 0.69444, 0, 0],
        "91": [0.25, 0.75, 0, 0],
        "93": [0.25, 0.75, 0, 0],
        "94": [0, 0.69444, 0, 0],
        "95": [0.35, 0.09444, 0.02778, 0],
        "97": [0, 0.44444, 0, 0],
        "98": [0, 0.69444, 0, 0],
        "99": [0, 0.44444, 0, 0],
        "100": [0, 0.69444, 0, 0],
        "101": [0, 0.44444, 0, 0],
        "102": [0, 0.69444, 0.06944, 0],
        "103": [0.19444, 0.44444, 0.01389, 0],
        "104": [0, 0.69444, 0, 0],
        "105": [0, 0.67937, 0, 0],
        "106": [0.19444, 0.67937, 0, 0],
        "107": [0, 0.69444, 0, 0],
        "108": [0, 0.69444, 0, 0],
        "109": [0, 0.44444, 0, 0],
        "110": [0, 0.44444, 0, 0],
        "111": [0, 0.44444, 0, 0],
        "112": [0.19444, 0.44444, 0, 0],
        "113": [0.19444, 0.44444, 0, 0],
        "114": [0, 0.44444, 0.01389, 0],
        "115": [0, 0.44444, 0, 0],
        "116": [0, 0.57143, 0, 0],
        "117": [0, 0.44444, 0, 0],
        "118": [0, 0.44444, 0.01389, 0],
        "119": [0, 0.44444, 0.01389, 0],
        "120": [0, 0.44444, 0, 0],
        "121": [0.19444, 0.44444, 0.01389, 0],
        "122": [0, 0.44444, 0, 0],
        "126": [0.35, 0.32659, 0, 0],
        "305": [0, 0.44444, 0, 0],
        "567": [0.19444, 0.44444, 0, 0],
        "768": [0, 0.69444, 0, 0],
        "769": [0, 0.69444, 0, 0],
        "770": [0, 0.69444, 0, 0],
        "771": [0, 0.67659, 0, 0],
        "772": [0, 0.60889, 0, 0],
        "774": [0, 0.69444, 0, 0],
        "775": [0, 0.67937, 0, 0],
        "776": [0, 0.67937, 0, 0],
        "778": [0, 0.69444, 0, 0],
        "779": [0, 0.69444, 0, 0],
        "780": [0, 0.63194, 0, 0],
        "915": [0, 0.69444, 0, 0],
        "916": [0, 0.69444, 0, 0],
        "920": [0, 0.69444, 0, 0],
        "923": [0, 0.69444, 0, 0],
        "926": [0, 0.69444, 0, 0],
        "928": [0, 0.69444, 0, 0],
        "931": [0, 0.69444, 0, 0],
        "933": [0, 0.69444, 0, 0],
        "934": [0, 0.69444, 0, 0],
        "936": [0, 0.69444, 0, 0],
        "937": [0, 0.69444, 0, 0],
        "8211": [0, 0.44444, 0.02778, 0],
        "8212": [0, 0.44444, 0.02778, 0],
        "8216": [0, 0.69444, 0, 0],
        "8217": [0, 0.69444, 0, 0],
        "8220": [0, 0.69444, 0, 0],
        "8221": [0, 0.69444, 0, 0]
    },
    "Script-Regular": {
        "65": [0, 0.7, 0.22925, 0],
        "66": [0, 0.7, 0.04087, 0],
        "67": [0, 0.7, 0.1689, 0],
        "68": [0, 0.7, 0.09371, 0],
        "69": [0, 0.7, 0.18583, 0],
        "70": [0, 0.7, 0.13634, 0],
        "71": [0, 0.7, 0.17322, 0],
        "72": [0, 0.7, 0.29694, 0],
        "73": [0, 0.7, 0.19189, 0],
        "74": [0.27778, 0.7, 0.19189, 0],
        "75": [0, 0.7, 0.31259, 0],
        "76": [0, 0.7, 0.19189, 0],
        "77": [0, 0.7, 0.15981, 0],
        "78": [0, 0.7, 0.3525, 0],
        "79": [0, 0.7, 0.08078, 0],
        "80": [0, 0.7, 0.08078, 0],
        "81": [0, 0.7, 0.03305, 0],
        "82": [0, 0.7, 0.06259, 0],
        "83": [0, 0.7, 0.19189, 0],
        "84": [0, 0.7, 0.29087, 0],
        "85": [0, 0.7, 0.25815, 0],
        "86": [0, 0.7, 0.27523, 0],
        "87": [0, 0.7, 0.27523, 0],
        "88": [0, 0.7, 0.26006, 0],
        "89": [0, 0.7, 0.2939, 0],
        "90": [0, 0.7, 0.24037, 0]
    },
    "Size1-Regular": {
        "40": [0.35001, 0.85, 0, 0],
        "41": [0.35001, 0.85, 0, 0],
        "47": [0.35001, 0.85, 0, 0],
        "91": [0.35001, 0.85, 0, 0],
        "92": [0.35001, 0.85, 0, 0],
        "93": [0.35001, 0.85, 0, 0],
        "123": [0.35001, 0.85, 0, 0],
        "125": [0.35001, 0.85, 0, 0],
        "710": [0, 0.72222, 0, 0],
        "732": [0, 0.72222, 0, 0],
        "770": [0, 0.72222, 0, 0],
        "771": [0, 0.72222, 0, 0],
        "8214": [-0.00099, 0.601, 0, 0],
        "8593": [1e-05, 0.6, 0, 0],
        "8595": [1e-05, 0.6, 0, 0],
        "8657": [1e-05, 0.6, 0, 0],
        "8659": [1e-05, 0.6, 0, 0],
        "8719": [0.25001, 0.75, 0, 0],
        "8720": [0.25001, 0.75, 0, 0],
        "8721": [0.25001, 0.75, 0, 0],
        "8730": [0.35001, 0.85, 0, 0],
        "8739": [-0.00599, 0.606, 0, 0],
        "8741": [-0.00599, 0.606, 0, 0],
        "8747": [0.30612, 0.805, 0.19445, 0],
        "8748": [0.306, 0.805, 0.19445, 0],
        "8749": [0.306, 0.805, 0.19445, 0],
        "8750": [0.30612, 0.805, 0.19445, 0],
        "8896": [0.25001, 0.75, 0, 0],
        "8897": [0.25001, 0.75, 0, 0],
        "8898": [0.25001, 0.75, 0, 0],
        "8899": [0.25001, 0.75, 0, 0],
        "8968": [0.35001, 0.85, 0, 0],
        "8969": [0.35001, 0.85, 0, 0],
        "8970": [0.35001, 0.85, 0, 0],
        "8971": [0.35001, 0.85, 0, 0],
        "9168": [-0.00099, 0.601, 0, 0],
        "10216": [0.35001, 0.85, 0, 0],
        "10217": [0.35001, 0.85, 0, 0],
        "10752": [0.25001, 0.75, 0, 0],
        "10753": [0.25001, 0.75, 0, 0],
        "10754": [0.25001, 0.75, 0, 0],
        "10756": [0.25001, 0.75, 0, 0],
        "10758": [0.25001, 0.75, 0, 0]
    },
    "Size2-Regular": {
        "40": [0.65002, 1.15, 0, 0],
        "41": [0.65002, 1.15, 0, 0],
        "47": [0.65002, 1.15, 0, 0],
        "91": [0.65002, 1.15, 0, 0],
        "92": [0.65002, 1.15, 0, 0],
        "93": [0.65002, 1.15, 0, 0],
        "123": [0.65002, 1.15, 0, 0],
        "125": [0.65002, 1.15, 0, 0],
        "710": [0, 0.75, 0, 0],
        "732": [0, 0.75, 0, 0],
        "770": [0, 0.75, 0, 0],
        "771": [0, 0.75, 0, 0],
        "8719": [0.55001, 1.05, 0, 0],
        "8720": [0.55001, 1.05, 0, 0],
        "8721": [0.55001, 1.05, 0, 0],
        "8730": [0.65002, 1.15, 0, 0],
        "8747": [0.86225, 1.36, 0.44445, 0],
        "8748": [0.862, 1.36, 0.44445, 0],
        "8749": [0.862, 1.36, 0.44445, 0],
        "8750": [0.86225, 1.36, 0.44445, 0],
        "8896": [0.55001, 1.05, 0, 0],
        "8897": [0.55001, 1.05, 0, 0],
        "8898": [0.55001, 1.05, 0, 0],
        "8899": [0.55001, 1.05, 0, 0],
        "8968": [0.65002, 1.15, 0, 0],
        "8969": [0.65002, 1.15, 0, 0],
        "8970": [0.65002, 1.15, 0, 0],
        "8971": [0.65002, 1.15, 0, 0],
        "10216": [0.65002, 1.15, 0, 0],
        "10217": [0.65002, 1.15, 0, 0],
        "10752": [0.55001, 1.05, 0, 0],
        "10753": [0.55001, 1.05, 0, 0],
        "10754": [0.55001, 1.05, 0, 0],
        "10756": [0.55001, 1.05, 0, 0],
        "10758": [0.55001, 1.05, 0, 0]
    },
    "Size3-Regular": {
        "40": [0.95003, 1.45, 0, 0],
        "41": [0.95003, 1.45, 0, 0],
        "47": [0.95003, 1.45, 0, 0],
        "91": [0.95003, 1.45, 0, 0],
        "92": [0.95003, 1.45, 0, 0],
        "93": [0.95003, 1.45, 0, 0],
        "123": [0.95003, 1.45, 0, 0],
        "125": [0.95003, 1.45, 0, 0],
        "710": [0, 0.75, 0, 0],
        "732": [0, 0.75, 0, 0],
        "770": [0, 0.75, 0, 0],
        "771": [0, 0.75, 0, 0],
        "8730": [0.95003, 1.45, 0, 0],
        "8968": [0.95003, 1.45, 0, 0],
        "8969": [0.95003, 1.45, 0, 0],
        "8970": [0.95003, 1.45, 0, 0],
        "8971": [0.95003, 1.45, 0, 0],
        "10216": [0.95003, 1.45, 0, 0],
        "10217": [0.95003, 1.45, 0, 0]
    },
    "Size4-Regular": {
        "40": [1.25003, 1.75, 0, 0],
        "41": [1.25003, 1.75, 0, 0],
        "47": [1.25003, 1.75, 0, 0],
        "91": [1.25003, 1.75, 0, 0],
        "92": [1.25003, 1.75, 0, 0],
        "93": [1.25003, 1.75, 0, 0],
        "123": [1.25003, 1.75, 0, 0],
        "125": [1.25003, 1.75, 0, 0],
        "710": [0, 0.825, 0, 0],
        "732": [0, 0.825, 0, 0],
        "770": [0, 0.825, 0, 0],
        "771": [0, 0.825, 0, 0],
        "8730": [1.25003, 1.75, 0, 0],
        "8968": [1.25003, 1.75, 0, 0],
        "8969": [1.25003, 1.75, 0, 0],
        "8970": [1.25003, 1.75, 0, 0],
        "8971": [1.25003, 1.75, 0, 0],
        "9115": [0.64502, 1.155, 0, 0],
        "9116": [1e-05, 0.6, 0, 0],
        "9117": [0.64502, 1.155, 0, 0],
        "9118": [0.64502, 1.155, 0, 0],
        "9119": [1e-05, 0.6, 0, 0],
        "9120": [0.64502, 1.155, 0, 0],
        "9121": [0.64502, 1.155, 0, 0],
        "9122": [-0.00099, 0.601, 0, 0],
        "9123": [0.64502, 1.155, 0, 0],
        "9124": [0.64502, 1.155, 0, 0],
        "9125": [-0.00099, 0.601, 0, 0],
        "9126": [0.64502, 1.155, 0, 0],
        "9127": [1e-05, 0.9, 0, 0],
        "9128": [0.65002, 1.15, 0, 0],
        "9129": [0.90001, 0, 0, 0],
        "9130": [0, 0.3, 0, 0],
        "9131": [1e-05, 0.9, 0, 0],
        "9132": [0.65002, 1.15, 0, 0],
        "9133": [0.90001, 0, 0, 0],
        "9143": [0.88502, 0.915, 0, 0],
        "10216": [1.25003, 1.75, 0, 0],
        "10217": [1.25003, 1.75, 0, 0],
        "57344": [-0.00499, 0.605, 0, 0],
        "57345": [-0.00499, 0.605, 0, 0],
        "57680": [0, 0.12, 0, 0],
        "57681": [0, 0.12, 0, 0],
        "57682": [0, 0.12, 0, 0],
        "57683": [0, 0.12, 0, 0]
    },
    "Typewriter-Regular": {
        "33": [0, 0.61111, 0, 0],
        "34": [0, 0.61111, 0, 0],
        "35": [0, 0.61111, 0, 0],
        "36": [0.08333, 0.69444, 0, 0],
        "37": [0.08333, 0.69444, 0, 0],
        "38": [0, 0.61111, 0, 0],
        "39": [0, 0.61111, 0, 0],
        "40": [0.08333, 0.69444, 0, 0],
        "41": [0.08333, 0.69444, 0, 0],
        "42": [0, 0.52083, 0, 0],
        "43": [-0.08056, 0.53055, 0, 0],
        "44": [0.13889, 0.125, 0, 0],
        "45": [-0.08056, 0.53055, 0, 0],
        "46": [0, 0.125, 0, 0],
        "47": [0.08333, 0.69444, 0, 0],
        "48": [0, 0.61111, 0, 0],
        "49": [0, 0.61111, 0, 0],
        "50": [0, 0.61111, 0, 0],
        "51": [0, 0.61111, 0, 0],
        "52": [0, 0.61111, 0, 0],
        "53": [0, 0.61111, 0, 0],
        "54": [0, 0.61111, 0, 0],
        "55": [0, 0.61111, 0, 0],
        "56": [0, 0.61111, 0, 0],
        "57": [0, 0.61111, 0, 0],
        "58": [0, 0.43056, 0, 0],
        "59": [0.13889, 0.43056, 0, 0],
        "60": [-0.05556, 0.55556, 0, 0],
        "61": [-0.19549, 0.41562, 0, 0],
        "62": [-0.05556, 0.55556, 0, 0],
        "63": [0, 0.61111, 0, 0],
        "64": [0, 0.61111, 0, 0],
        "65": [0, 0.61111, 0, 0],
        "66": [0, 0.61111, 0, 0],
        "67": [0, 0.61111, 0, 0],
        "68": [0, 0.61111, 0, 0],
        "69": [0, 0.61111, 0, 0],
        "70": [0, 0.61111, 0, 0],
        "71": [0, 0.61111, 0, 0],
        "72": [0, 0.61111, 0, 0],
        "73": [0, 0.61111, 0, 0],
        "74": [0, 0.61111, 0, 0],
        "75": [0, 0.61111, 0, 0],
        "76": [0, 0.61111, 0, 0],
        "77": [0, 0.61111, 0, 0],
        "78": [0, 0.61111, 0, 0],
        "79": [0, 0.61111, 0, 0],
        "80": [0, 0.61111, 0, 0],
        "81": [0.13889, 0.61111, 0, 0],
        "82": [0, 0.61111, 0, 0],
        "83": [0, 0.61111, 0, 0],
        "84": [0, 0.61111, 0, 0],
        "85": [0, 0.61111, 0, 0],
        "86": [0, 0.61111, 0, 0],
        "87": [0, 0.61111, 0, 0],
        "88": [0, 0.61111, 0, 0],
        "89": [0, 0.61111, 0, 0],
        "90": [0, 0.61111, 0, 0],
        "91": [0.08333, 0.69444, 0, 0],
        "92": [0.08333, 0.69444, 0, 0],
        "93": [0.08333, 0.69444, 0, 0],
        "94": [0, 0.61111, 0, 0],
        "95": [0.09514, 0, 0, 0],
        "96": [0, 0.61111, 0, 0],
        "97": [0, 0.43056, 0, 0],
        "98": [0, 0.61111, 0, 0],
        "99": [0, 0.43056, 0, 0],
        "100": [0, 0.61111, 0, 0],
        "101": [0, 0.43056, 0, 0],
        "102": [0, 0.61111, 0, 0],
        "103": [0.22222, 0.43056, 0, 0],
        "104": [0, 0.61111, 0, 0],
        "105": [0, 0.61111, 0, 0],
        "106": [0.22222, 0.61111, 0, 0],
        "107": [0, 0.61111, 0, 0],
        "108": [0, 0.61111, 0, 0],
        "109": [0, 0.43056, 0, 0],
        "110": [0, 0.43056, 0, 0],
        "111": [0, 0.43056, 0, 0],
        "112": [0.22222, 0.43056, 0, 0],
        "113": [0.22222, 0.43056, 0, 0],
        "114": [0, 0.43056, 0, 0],
        "115": [0, 0.43056, 0, 0],
        "116": [0, 0.55358, 0, 0],
        "117": [0, 0.43056, 0, 0],
        "118": [0, 0.43056, 0, 0],
        "119": [0, 0.43056, 0, 0],
        "120": [0, 0.43056, 0, 0],
        "121": [0.22222, 0.43056, 0, 0],
        "122": [0, 0.43056, 0, 0],
        "123": [0.08333, 0.69444, 0, 0],
        "124": [0.08333, 0.69444, 0, 0],
        "125": [0.08333, 0.69444, 0, 0],
        "126": [0, 0.61111, 0, 0],
        "127": [0, 0.61111, 0, 0],
        "305": [0, 0.43056, 0, 0],
        "567": [0.22222, 0.43056, 0, 0],
        "768": [0, 0.61111, 0, 0],
        "769": [0, 0.61111, 0, 0],
        "770": [0, 0.61111, 0, 0],
        "771": [0, 0.61111, 0, 0],
        "772": [0, 0.56555, 0, 0],
        "774": [0, 0.61111, 0, 0],
        "776": [0, 0.61111, 0, 0],
        "778": [0, 0.61111, 0, 0],
        "780": [0, 0.56597, 0, 0],
        "915": [0, 0.61111, 0, 0],
        "916": [0, 0.61111, 0, 0],
        "920": [0, 0.61111, 0, 0],
        "923": [0, 0.61111, 0, 0],
        "926": [0, 0.61111, 0, 0],
        "928": [0, 0.61111, 0, 0],
        "931": [0, 0.61111, 0, 0],
        "933": [0, 0.61111, 0, 0],
        "934": [0, 0.61111, 0, 0],
        "936": [0, 0.61111, 0, 0],
        "937": [0, 0.61111, 0, 0],
        "2018": [0, 0.61111, 0, 0],
        "2019": [0, 0.61111, 0, 0],
        "8242": [0, 0.61111, 0, 0]
    }
};


/***/ }),

/***/ "./node_modules/katex/src/functions.js":
/*!*********************************************!*\
  !*** ./node_modules/katex/src/functions.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/katex/src/utils.js");
var ParseError = __webpack_require__(/*! ./ParseError */ "./node_modules/katex/src/ParseError.js");
var parseData = __webpack_require__(/*! ./parseData */ "./node_modules/katex/src/parseData.js");
var ParseNode = parseData.ParseNode;

/* This file contains a list of functions that we parse, identified by
 * the calls to defineFunction.
 *
 * The first argument to defineFunction is a single name or a list of names.
 * All functions named in such a list will share a single implementation.
 *
 * Each declared function can have associated properties, which
 * include the following:
 *
 *  - numArgs: The number of arguments the function takes.
 *             If this is the only property, it can be passed as a number
 *             instead of an element of a properties object.
 *  - argTypes: (optional) An array corresponding to each argument of the
 *              function, giving the type of argument that should be parsed. Its
 *              length should be equal to `numArgs + numOptionalArgs`. Valid
 *              types:
 *               - "size": A size-like thing, such as "1em" or "5ex"
 *               - "color": An html color, like "#abc" or "blue"
 *               - "original": The same type as the environment that the
 *                             function being parsed is in (e.g. used for the
 *                             bodies of functions like \color where the first
 *                             argument is special and the second argument is
 *                             parsed normally)
 *              Other possible types (probably shouldn't be used)
 *               - "text": Text-like (e.g. \text)
 *               - "math": Normal math
 *              If undefined, this will be treated as an appropriate length
 *              array of "original" strings
 *  - greediness: (optional) The greediness of the function to use ungrouped
 *                arguments.
 *
 *                E.g. if you have an expression
 *                  \sqrt \frac 1 2
 *                since \frac has greediness=2 vs \sqrt's greediness=1, \frac
 *                will use the two arguments '1' and '2' as its two arguments,
 *                then that whole function will be used as the argument to
 *                \sqrt. On the other hand, the expressions
 *                  \frac \frac 1 2 3
 *                and
 *                  \frac \sqrt 1 2
 *                will fail because \frac and \frac have equal greediness
 *                and \sqrt has a lower greediness than \frac respectively. To
 *                make these parse, we would have to change them to:
 *                  \frac {\frac 1 2} 3
 *                and
 *                  \frac {\sqrt 1} 2
 *
 *                The default value is `1`
 *  - allowedInText: (optional) Whether or not the function is allowed inside
 *                   text mode (default false)
 *  - numOptionalArgs: (optional) The number of optional arguments the function
 *                     should parse. If the optional arguments aren't found,
 *                     `null` will be passed to the handler in their place.
 *                     (default 0)
 *  - infix: (optional) Must be true if the function is an infix operator.
 *
 * The last argument is that implementation, the handler for the function(s).
 * It is called to handle these functions and their arguments.
 * It receives two arguments:
 *  - context contains information and references provided by the parser
 *  - args is an array of arguments obtained from TeX input
 * The context contains the following properties:
 *  - funcName: the text (i.e. name) of the function, including \
 *  - parser: the parser object
 *  - lexer: the lexer object
 *  - positions: the positions in the overall string of the function
 *               and the arguments.
 * The latter three should only be used to produce error messages.
 *
 * The function should return an object with the following keys:
 *  - type: The type of element that this is. This is then used in
 *          buildHTML/buildMathML to determine which function
 *          should be called to build this node into a DOM node
 * Any other data can be added to the object, which will be passed
 * in to the function in buildHTML/buildMathML as `group.value`.
 */

function defineFunction(names, props, handler) {
    if (typeof names === "string") {
        names = [names];
    }
    if (typeof props === "number") {
        props = { numArgs: props };
    }
    // Set default values of functions
    var data = {
        numArgs: props.numArgs,
        argTypes: props.argTypes,
        greediness: (props.greediness === undefined) ? 1 : props.greediness,
        allowedInText: !!props.allowedInText,
        numOptionalArgs: props.numOptionalArgs || 0,
        infix: !!props.infix,
        handler: handler
    };
    for (var i = 0; i < names.length; ++i) {
        module.exports[names[i]] = data;
    }
}

// Since the corresponding buildHTML/buildMathML function expects a
// list of elements, we normalize for different kinds of arguments
var ordargument = function(arg) {
    if (arg.type === "ordgroup") {
        return arg.value;
    } else {
        return [arg];
    }
};

// A normal square root
defineFunction("\\sqrt", {
    numArgs: 1,
    numOptionalArgs: 1
}, function(context, args) {
    var index = args[0];
    var body = args[1];
    return {
        type: "sqrt",
        body: body,
        index: index
    };
});

// Non-mathy text, possibly in a font
var textFunctionStyles = {
    "\\text": undefined, "\\textrm": "mathrm", "\\textsf": "mathsf",
    "\\texttt": "mathtt", "\\textnormal": "mathrm", "\\textbf": "mathbf",
    "\\textit": "textit"
};

defineFunction([
    "\\text", "\\textrm", "\\textsf", "\\texttt", "\\textnormal",
    "\\textbf", "\\textit"
], {
    numArgs: 1,
    argTypes: ["text"],
    greediness: 2,
    allowedInText: true
}, function(context, args) {
    var body = args[0];
    return {
        type: "text",
        body: ordargument(body),
        style: textFunctionStyles[context.funcName]
    };
});

// A two-argument custom color
defineFunction("\\color", {
    numArgs: 2,
    allowedInText: true,
    greediness: 3,
    argTypes: ["color", "original"]
}, function(context, args) {
    var color = args[0];
    var body = args[1];
    return {
        type: "color",
        color: color.value,
        value: ordargument(body)
    };
});

// An overline
defineFunction("\\overline", {
    numArgs: 1
}, function(context, args) {
    var body = args[0];
    return {
        type: "overline",
        body: body
    };
});

// An underline
defineFunction("\\underline", {
    numArgs: 1
}, function(context, args) {
    var body = args[0];
    return {
        type: "underline",
        body: body
    };
});

// A box of the width and height
defineFunction("\\rule", {
    numArgs: 2,
    numOptionalArgs: 1,
    argTypes: ["size", "size", "size"]
}, function(context, args) {
    var shift = args[0];
    var width = args[1];
    var height = args[2];
    return {
        type: "rule",
        shift: shift && shift.value,
        width: width.value,
        height: height.value
    };
});

// TODO: In TeX, \mkern only accepts mu-units, and \kern does not accept
// mu-units. In current KaTeX we relax this; both commands accept any unit.
defineFunction(["\\kern", "\\mkern"], {
    numArgs: 1,
    argTypes: ["size"]
}, function(context, args) {
    return {
        type: "kern",
        dimension: args[0].value
    };
});

// A KaTeX logo
defineFunction("\\KaTeX", {
    numArgs: 0
}, function(context) {
    return {
        type: "katex"
    };
});

defineFunction("\\phantom", {
    numArgs: 1
}, function(context, args) {
    var body = args[0];
    return {
        type: "phantom",
        value: ordargument(body)
    };
});

// Math class commands except \mathop
defineFunction([
    "\\mathord", "\\mathbin", "\\mathrel", "\\mathopen",
    "\\mathclose", "\\mathpunct", "\\mathinner"
], {
    numArgs: 1
}, function(context, args) {
    var body = args[0];
    return {
        type: "mclass",
        mclass: "m" + context.funcName.substr(5),
        value: ordargument(body)
    };
});

// Build a relation by placing one symbol on top of another
defineFunction("\\stackrel", {
    numArgs: 2
}, function(context, args) {
    var top = args[0];
    var bottom = args[1];

    var bottomop = new ParseNode("op", {
        type: "op",
        limits: true,
        alwaysHandleSupSub: true,
        symbol: false,
        value: ordargument(bottom)
    }, bottom.mode);

    var supsub = new ParseNode("supsub", {
        base: bottomop,
        sup: top,
        sub: null
    }, top.mode);

    return {
        type: "mclass",
        mclass: "mrel",
        value: [supsub]
    };
});

// \mod-type functions
defineFunction("\\bmod", {
    numArgs: 0
}, function(context, args) {
    return {
        type: "mod",
        modType: "bmod",
        value: null
    };
});

defineFunction(["\\pod", "\\pmod", "\\mod"], {
    numArgs: 1
}, function(context, args) {
    var body = args[0];
    return {
        type: "mod",
        modType: context.funcName.substr(1),
        value: ordargument(body)
    };
});

// Extra data needed for the delimiter handler down below
var delimiterSizes = {
    "\\bigl" : {mclass: "mopen",    size: 1},
    "\\Bigl" : {mclass: "mopen",    size: 2},
    "\\biggl": {mclass: "mopen",    size: 3},
    "\\Biggl": {mclass: "mopen",    size: 4},
    "\\bigr" : {mclass: "mclose",   size: 1},
    "\\Bigr" : {mclass: "mclose",   size: 2},
    "\\biggr": {mclass: "mclose",   size: 3},
    "\\Biggr": {mclass: "mclose",   size: 4},
    "\\bigm" : {mclass: "mrel",     size: 1},
    "\\Bigm" : {mclass: "mrel",     size: 2},
    "\\biggm": {mclass: "mrel",     size: 3},
    "\\Biggm": {mclass: "mrel",     size: 4},
    "\\big"  : {mclass: "mord",     size: 1},
    "\\Big"  : {mclass: "mord",     size: 2},
    "\\bigg" : {mclass: "mord",     size: 3},
    "\\Bigg" : {mclass: "mord",     size: 4}
};

var delimiters = [
    "(", ")", "[", "\\lbrack", "]", "\\rbrack",
    "\\{", "\\lbrace", "\\}", "\\rbrace",
    "\\lfloor", "\\rfloor", "\\lceil", "\\rceil",
    "<", ">", "\\langle", "\\rangle", "\\lt", "\\gt",
    "\\lvert", "\\rvert", "\\lVert", "\\rVert",
    "\\lgroup", "\\rgroup", "\\lmoustache", "\\rmoustache",
    "/", "\\backslash",
    "|", "\\vert", "\\|", "\\Vert",
    "\\uparrow", "\\Uparrow",
    "\\downarrow", "\\Downarrow",
    "\\updownarrow", "\\Updownarrow",
    "."
];

var fontAliases = {
    "\\Bbb": "\\mathbb",
    "\\bold": "\\mathbf",
    "\\frak": "\\mathfrak"
};

// Single-argument color functions
defineFunction([
    "\\blue", "\\orange", "\\pink", "\\red",
    "\\green", "\\gray", "\\purple",
    "\\blueA", "\\blueB", "\\blueC", "\\blueD", "\\blueE",
    "\\tealA", "\\tealB", "\\tealC", "\\tealD", "\\tealE",
    "\\greenA", "\\greenB", "\\greenC", "\\greenD", "\\greenE",
    "\\goldA", "\\goldB", "\\goldC", "\\goldD", "\\goldE",
    "\\redA", "\\redB", "\\redC", "\\redD", "\\redE",
    "\\maroonA", "\\maroonB", "\\maroonC", "\\maroonD", "\\maroonE",
    "\\purpleA", "\\purpleB", "\\purpleC", "\\purpleD", "\\purpleE",
    "\\mintA", "\\mintB", "\\mintC",
    "\\grayA", "\\grayB", "\\grayC", "\\grayD", "\\grayE",
    "\\grayF", "\\grayG", "\\grayH", "\\grayI",
    "\\kaBlue", "\\kaGreen"
], {
    numArgs: 1,
    allowedInText: true,
    greediness: 3
}, function(context, args) {
    var body = args[0];
    return {
        type: "color",
        color: "katex-" + context.funcName.slice(1),
        value: ordargument(body)
    };
});

// There are 2 flags for operators; whether they produce limits in
// displaystyle, and whether they are symbols and should grow in
// displaystyle. These four groups cover the four possible choices.

// No limits, not symbols
defineFunction([
    "\\arcsin", "\\arccos", "\\arctan", "\\arg", "\\cos", "\\cosh",
    "\\cot", "\\coth", "\\csc", "\\deg", "\\dim", "\\exp", "\\hom",
    "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh",
    "\\tan", "\\tanh"
], {
    numArgs: 0
}, function(context) {
    return {
        type: "op",
        limits: false,
        symbol: false,
        body: context.funcName
    };
});

// Limits, not symbols
defineFunction([
    "\\det", "\\gcd", "\\inf", "\\lim", "\\liminf", "\\limsup", "\\max",
    "\\min", "\\Pr", "\\sup"
], {
    numArgs: 0
}, function(context) {
    return {
        type: "op",
        limits: true,
        symbol: false,
        body: context.funcName
    };
});

// No limits, symbols
defineFunction([
    "\\int", "\\iint", "\\iiint", "\\oint"
], {
    numArgs: 0
}, function(context) {
    return {
        type: "op",
        limits: false,
        symbol: true,
        body: context.funcName
    };
});

// Limits, symbols
defineFunction([
    "\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap",
    "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes",
    "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint"
], {
    numArgs: 0
}, function(context) {
    return {
        type: "op",
        limits: true,
        symbol: true,
        body: context.funcName
    };
});

// \mathop class command
defineFunction("\\mathop", {
    numArgs: 1
}, function(context, args) {
    var body = args[0];
    return {
        type: "op",
        limits: false,
        symbol: false,
        value: ordargument(body)
    };
});

// Fractions
defineFunction([
    "\\dfrac", "\\frac", "\\tfrac",
    "\\dbinom", "\\binom", "\\tbinom",
    "\\\\atopfrac" // can’t be entered directly
], {
    numArgs: 2,
    greediness: 2
}, function(context, args) {
    var numer = args[0];
    var denom = args[1];
    var hasBarLine;
    var leftDelim = null;
    var rightDelim = null;
    var size = "auto";

    switch (context.funcName) {
        case "\\dfrac":
        case "\\frac":
        case "\\tfrac":
            hasBarLine = true;
            break;
        case "\\\\atopfrac":
            hasBarLine = false;
            break;
        case "\\dbinom":
        case "\\binom":
        case "\\tbinom":
            hasBarLine = false;
            leftDelim = "(";
            rightDelim = ")";
            break;
        default:
            throw new Error("Unrecognized genfrac command");
    }

    switch (context.funcName) {
        case "\\dfrac":
        case "\\dbinom":
            size = "display";
            break;
        case "\\tfrac":
        case "\\tbinom":
            size = "text";
            break;
    }

    return {
        type: "genfrac",
        numer: numer,
        denom: denom,
        hasBarLine: hasBarLine,
        leftDelim: leftDelim,
        rightDelim: rightDelim,
        size: size
    };
});

// Left and right overlap functions
defineFunction(["\\llap", "\\rlap"], {
    numArgs: 1,
    allowedInText: true
}, function(context, args) {
    var body = args[0];
    return {
        type: context.funcName.slice(1),
        body: body
    };
});

// Delimiter functions
var checkDelimiter = function(delim, context) {
    if (utils.contains(delimiters, delim.value)) {
        return delim;
    } else {
        throw new ParseError(
            "Invalid delimiter: '" + delim.value + "' after '" +
            context.funcName + "'", delim);
    }
};

defineFunction([
    "\\bigl", "\\Bigl", "\\biggl", "\\Biggl",
    "\\bigr", "\\Bigr", "\\biggr", "\\Biggr",
    "\\bigm", "\\Bigm", "\\biggm", "\\Biggm",
    "\\big",  "\\Big",  "\\bigg",  "\\Bigg"
], {
    numArgs: 1
}, function(context, args) {
    var delim = checkDelimiter(args[0], context);

    return {
        type: "delimsizing",
        size: delimiterSizes[context.funcName].size,
        mclass: delimiterSizes[context.funcName].mclass,
        value: delim.value
    };
});

defineFunction([
    "\\left", "\\right"
], {
    numArgs: 1
}, function(context, args) {
    var delim = checkDelimiter(args[0], context);

    // \left and \right are caught somewhere in Parser.js, which is
    // why this data doesn't match what is in buildHTML.
    return {
        type: "leftright",
        value: delim.value
    };
});

defineFunction("\\middle", {
    numArgs: 1
}, function(context, args) {
    var delim = checkDelimiter(args[0], context);
    if (!context.parser.leftrightDepth) {
        throw new ParseError("\\middle without preceding \\left", delim);
    }

    return {
        type: "middle",
        value: delim.value
    };
});

// Sizing functions (handled in Parser.js explicitly, hence no handler)
defineFunction([
    "\\tiny", "\\scriptsize", "\\footnotesize", "\\small",
    "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"
], 0, null);

// Style changing functions (handled in Parser.js explicitly, hence no
// handler)
defineFunction([
    "\\displaystyle", "\\textstyle", "\\scriptstyle",
    "\\scriptscriptstyle"
], 0, null);

defineFunction([
    // styles
    "\\mathrm", "\\mathit", "\\mathbf",

    // families
    "\\mathbb", "\\mathcal", "\\mathfrak", "\\mathscr", "\\mathsf",
    "\\mathtt",

    // aliases
    "\\Bbb", "\\bold", "\\frak"
], {
    numArgs: 1,
    greediness: 2
}, function(context, args) {
    var body = args[0];
    var func = context.funcName;
    if (func in fontAliases) {
        func = fontAliases[func];
    }
    return {
        type: "font",
        font: func.slice(1),
        body: body
    };
});

// Accents
defineFunction([
    "\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve",
    "\\check", "\\hat", "\\vec", "\\dot"
    // We don't support expanding accents yet
    // "\\widetilde", "\\widehat"
], {
    numArgs: 1
}, function(context, args) {
    var base = args[0];
    return {
        type: "accent",
        accent: context.funcName,
        base: base
    };
});

// Infix generalized fractions
defineFunction(["\\over", "\\choose", "\\atop"], {
    numArgs: 0,
    infix: true
}, function(context) {
    var replaceWith;
    switch (context.funcName) {
        case "\\over":
            replaceWith = "\\frac";
            break;
        case "\\choose":
            replaceWith = "\\binom";
            break;
        case "\\atop":
            replaceWith = "\\\\atopfrac";
            break;
        default:
            throw new Error("Unrecognized infix genfrac command");
    }
    return {
        type: "infix",
        replaceWith: replaceWith,
        token: context.token
    };
});

// Row breaks for aligned data
defineFunction(["\\\\", "\\cr"], {
    numArgs: 0,
    numOptionalArgs: 1,
    argTypes: ["size"]
}, function(context, args) {
    var size = args[0];
    return {
        type: "cr",
        size: size
    };
});

// Environment delimiters
defineFunction(["\\begin", "\\end"], {
    numArgs: 1,
    argTypes: ["text"]
}, function(context, args) {
    var nameGroup = args[0];
    if (nameGroup.type !== "ordgroup") {
        throw new ParseError("Invalid environment name", nameGroup);
    }
    var name = "";
    for (var i = 0; i < nameGroup.value.length; ++i) {
        name += nameGroup.value[i].value;
    }
    return {
        type: "environment",
        name: name,
        nameGroup: nameGroup
    };
});


/***/ }),

/***/ "./node_modules/katex/src/mathMLTree.js":
/*!**********************************************!*\
  !*** ./node_modules/katex/src/mathMLTree.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * These objects store data about MathML nodes. This is the MathML equivalent
 * of the types in domTree.js. Since MathML handles its own rendering, and
 * since we're mainly using MathML to improve accessibility, we don't manage
 * any of the styling state that the plain DOM nodes do.
 *
 * The `toNode` and `toMarkup` functions work simlarly to how they do in
 * domTree.js, creating namespaced DOM nodes and HTML text markup respectively.
 */

var utils = __webpack_require__(/*! ./utils */ "./node_modules/katex/src/utils.js");

/**
 * This node represents a general purpose MathML node of any type. The
 * constructor requires the type of node to create (for example, `"mo"` or
 * `"mspace"`, corresponding to `<mo>` and `<mspace>` tags).
 */
function MathNode(type, children) {
    this.type = type;
    this.attributes = {};
    this.children = children || [];
}

/**
 * Sets an attribute on a MathML node. MathML depends on attributes to convey a
 * semantic content, so this is used heavily.
 */
MathNode.prototype.setAttribute = function(name, value) {
    this.attributes[name] = value;
};

/**
 * Converts the math node into a MathML-namespaced DOM element.
 */
MathNode.prototype.toNode = function() {
    var node = document.createElementNS(
        "http://www.w3.org/1998/Math/MathML", this.type);

    for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            node.setAttribute(attr, this.attributes[attr]);
        }
    }

    for (var i = 0; i < this.children.length; i++) {
        node.appendChild(this.children[i].toNode());
    }

    return node;
};

/**
 * Converts the math node into an HTML markup string.
 */
MathNode.prototype.toMarkup = function() {
    var markup = "<" + this.type;

    // Add the attributes
    for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            markup += " " + attr + "=\"";
            markup += utils.escape(this.attributes[attr]);
            markup += "\"";
        }
    }

    markup += ">";

    for (var i = 0; i < this.children.length; i++) {
        markup += this.children[i].toMarkup();
    }

    markup += "</" + this.type + ">";

    return markup;
};

/**
 * This node represents a piece of text.
 */
function TextNode(text) {
    this.text = text;
}

/**
 * Converts the text node into a DOM text node.
 */
TextNode.prototype.toNode = function() {
    return document.createTextNode(this.text);
};

/**
 * Converts the text node into HTML markup (which is just the text itself).
 */
TextNode.prototype.toMarkup = function() {
    return utils.escape(this.text);
};

module.exports = {
    MathNode: MathNode,
    TextNode: TextNode
};


/***/ }),

/***/ "./node_modules/katex/src/parseData.js":
/*!*********************************************!*\
  !*** ./node_modules/katex/src/parseData.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * The resulting parse tree nodes of the parse tree.
 *
 * It is possible to provide position information, so that a ParseNode can
 * fulfil a role similar to a Token in error reporting.
 * For details on the corresponding properties see Token constructor.
 * Providing such information can lead to better error reporting.
 *
 * @param {string}  type       type of node, like e.g. "ordgroup"
 * @param {?object} value      type-specific representation of the node
 * @param {string}  mode       parse mode in action for this node,
 *                             "math" or "text"
 * @param {Token=} firstToken  first token of the input for this node,
 *                             will omit position information if unset
 * @param {Token=} lastToken   last token of the input for this node,
 *                             will default to firstToken if unset
 */
function ParseNode(type, value, mode, firstToken, lastToken) {
    this.type = type;
    this.value = value;
    this.mode = mode;
    if (firstToken && (!lastToken || lastToken.lexer === firstToken.lexer)) {
        this.lexer = firstToken.lexer;
        this.start = firstToken.start;
        this.end = (lastToken || firstToken).end;
    }
}

module.exports = {
    ParseNode: ParseNode
};



/***/ }),

/***/ "./node_modules/katex/src/parseTree.js":
/*!*********************************************!*\
  !*** ./node_modules/katex/src/parseTree.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Provides a single function for parsing an expression using a Parser
 * TODO(emily): Remove this
 */

var Parser = __webpack_require__(/*! ./Parser */ "./node_modules/katex/src/Parser.js");

/**
 * Parses an expression using a Parser, then returns the parsed result.
 */
var parseTree = function(toParse, settings) {
    if (!(typeof toParse === 'string' || toParse instanceof String)) {
        throw new TypeError('KaTeX can only parse string typed expression');
    }
    var parser = new Parser(toParse, settings);

    return parser.parse();
};

module.exports = parseTree;


/***/ }),

/***/ "./node_modules/katex/src/symbols.js":
/*!*******************************************!*\
  !*** ./node_modules/katex/src/symbols.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * This file holds a list of all no-argument functions and single-character
 * symbols (like 'a' or ';').
 *
 * For each of the symbols, there are three properties they can have:
 * - font (required): the font to be used for this symbol. Either "main" (the
     normal font), or "ams" (the ams fonts).
 * - group (required): the ParseNode group type the symbol should have (i.e.
     "textord", "mathord", etc).
     See https://github.com/Khan/KaTeX/wiki/Examining-TeX#group-types
 * - replace: the character that this symbol or function should be
 *   replaced with (i.e. "\phi" has a replace value of "\u03d5", the phi
 *   character in the main font).
 *
 * The outermost map in the table indicates what mode the symbols should be
 * accepted in (e.g. "math" or "text").
 */

module.exports = {
    math: {},
    text: {}
};

function defineSymbol(mode, font, group, replace, name) {
    module.exports[mode][name] = {
        font: font,
        group: group,
        replace: replace
    };
}

// Some abbreviations for commonly used strings.
// This helps minify the code, and also spotting typos using jshint.

// modes:
var math = "math";
var text = "text";

// fonts:
var main = "main";
var ams = "ams";

// groups:
var accent = "accent";
var bin = "bin";
var close = "close";
var inner = "inner";
var mathord = "mathord";
var op = "op";
var open = "open";
var punct = "punct";
var rel = "rel";
var spacing = "spacing";
var textord = "textord";

// Now comes the symbol table

// Relation Symbols
defineSymbol(math, main, rel, "\u2261", "\\equiv");
defineSymbol(math, main, rel, "\u227a", "\\prec");
defineSymbol(math, main, rel, "\u227b", "\\succ");
defineSymbol(math, main, rel, "\u223c", "\\sim");
defineSymbol(math, main, rel, "\u22a5", "\\perp");
defineSymbol(math, main, rel, "\u2aaf", "\\preceq");
defineSymbol(math, main, rel, "\u2ab0", "\\succeq");
defineSymbol(math, main, rel, "\u2243", "\\simeq");
defineSymbol(math, main, rel, "\u2223", "\\mid");
defineSymbol(math, main, rel, "\u226a", "\\ll");
defineSymbol(math, main, rel, "\u226b", "\\gg");
defineSymbol(math, main, rel, "\u224d", "\\asymp");
defineSymbol(math, main, rel, "\u2225", "\\parallel");
defineSymbol(math, main, rel, "\u22c8", "\\bowtie");
defineSymbol(math, main, rel, "\u2323", "\\smile");
defineSymbol(math, main, rel, "\u2291", "\\sqsubseteq");
defineSymbol(math, main, rel, "\u2292", "\\sqsupseteq");
defineSymbol(math, main, rel, "\u2250", "\\doteq");
defineSymbol(math, main, rel, "\u2322", "\\frown");
defineSymbol(math, main, rel, "\u220b", "\\ni");
defineSymbol(math, main, rel, "\u221d", "\\propto");
defineSymbol(math, main, rel, "\u22a2", "\\vdash");
defineSymbol(math, main, rel, "\u22a3", "\\dashv");
defineSymbol(math, main, rel, "\u220b", "\\owns");

// Punctuation
defineSymbol(math, main, punct, "\u002e", "\\ldotp");
defineSymbol(math, main, punct, "\u22c5", "\\cdotp");

// Misc Symbols
defineSymbol(math, main, textord, "\u0023", "\\#");
defineSymbol(text, main, textord, "\u0023", "\\#");
defineSymbol(math, main, textord, "\u0026", "\\&");
defineSymbol(text, main, textord, "\u0026", "\\&");
defineSymbol(math, main, textord, "\u2135", "\\aleph");
defineSymbol(math, main, textord, "\u2200", "\\forall");
defineSymbol(math, main, textord, "\u210f", "\\hbar");
defineSymbol(math, main, textord, "\u2203", "\\exists");
defineSymbol(math, main, textord, "\u2207", "\\nabla");
defineSymbol(math, main, textord, "\u266d", "\\flat");
defineSymbol(math, main, textord, "\u2113", "\\ell");
defineSymbol(math, main, textord, "\u266e", "\\natural");
defineSymbol(math, main, textord, "\u2663", "\\clubsuit");
defineSymbol(math, main, textord, "\u2118", "\\wp");
defineSymbol(math, main, textord, "\u266f", "\\sharp");
defineSymbol(math, main, textord, "\u2662", "\\diamondsuit");
defineSymbol(math, main, textord, "\u211c", "\\Re");
defineSymbol(math, main, textord, "\u2661", "\\heartsuit");
defineSymbol(math, main, textord, "\u2111", "\\Im");
defineSymbol(math, main, textord, "\u2660", "\\spadesuit");

// Math and Text
defineSymbol(math, main, textord, "\u2020", "\\dag");
defineSymbol(math, main, textord, "\u2021", "\\ddag");

// Large Delimiters
defineSymbol(math, main, close, "\u23b1", "\\rmoustache");
defineSymbol(math, main, open, "\u23b0", "\\lmoustache");
defineSymbol(math, main, close, "\u27ef", "\\rgroup");
defineSymbol(math, main, open, "\u27ee", "\\lgroup");

// Binary Operators
defineSymbol(math, main, bin, "\u2213", "\\mp");
defineSymbol(math, main, bin, "\u2296", "\\ominus");
defineSymbol(math, main, bin, "\u228e", "\\uplus");
defineSymbol(math, main, bin, "\u2293", "\\sqcap");
defineSymbol(math, main, bin, "\u2217", "\\ast");
defineSymbol(math, main, bin, "\u2294", "\\sqcup");
defineSymbol(math, main, bin, "\u25ef", "\\bigcirc");
defineSymbol(math, main, bin, "\u2219", "\\bullet");
defineSymbol(math, main, bin, "\u2021", "\\ddagger");
defineSymbol(math, main, bin, "\u2240", "\\wr");
defineSymbol(math, main, bin, "\u2a3f", "\\amalg");

// Arrow Symbols
defineSymbol(math, main, rel, "\u27f5", "\\longleftarrow");
defineSymbol(math, main, rel, "\u21d0", "\\Leftarrow");
defineSymbol(math, main, rel, "\u27f8", "\\Longleftarrow");
defineSymbol(math, main, rel, "\u27f6", "\\longrightarrow");
defineSymbol(math, main, rel, "\u21d2", "\\Rightarrow");
defineSymbol(math, main, rel, "\u27f9", "\\Longrightarrow");
defineSymbol(math, main, rel, "\u2194", "\\leftrightarrow");
defineSymbol(math, main, rel, "\u27f7", "\\longleftrightarrow");
defineSymbol(math, main, rel, "\u21d4", "\\Leftrightarrow");
defineSymbol(math, main, rel, "\u27fa", "\\Longleftrightarrow");
defineSymbol(math, main, rel, "\u21a6", "\\mapsto");
defineSymbol(math, main, rel, "\u27fc", "\\longmapsto");
defineSymbol(math, main, rel, "\u2197", "\\nearrow");
defineSymbol(math, main, rel, "\u21a9", "\\hookleftarrow");
defineSymbol(math, main, rel, "\u21aa", "\\hookrightarrow");
defineSymbol(math, main, rel, "\u2198", "\\searrow");
defineSymbol(math, main, rel, "\u21bc", "\\leftharpoonup");
defineSymbol(math, main, rel, "\u21c0", "\\rightharpoonup");
defineSymbol(math, main, rel, "\u2199", "\\swarrow");
defineSymbol(math, main, rel, "\u21bd", "\\leftharpoondown");
defineSymbol(math, main, rel, "\u21c1", "\\rightharpoondown");
defineSymbol(math, main, rel, "\u2196", "\\nwarrow");
defineSymbol(math, main, rel, "\u21cc", "\\rightleftharpoons");

// AMS Negated Binary Relations
defineSymbol(math, ams, rel, "\u226e", "\\nless");
defineSymbol(math, ams, rel, "\ue010", "\\nleqslant");
defineSymbol(math, ams, rel, "\ue011", "\\nleqq");
defineSymbol(math, ams, rel, "\u2a87", "\\lneq");
defineSymbol(math, ams, rel, "\u2268", "\\lneqq");
defineSymbol(math, ams, rel, "\ue00c", "\\lvertneqq");
defineSymbol(math, ams, rel, "\u22e6", "\\lnsim");
defineSymbol(math, ams, rel, "\u2a89", "\\lnapprox");
defineSymbol(math, ams, rel, "\u2280", "\\nprec");
defineSymbol(math, ams, rel, "\u22e0", "\\npreceq");
defineSymbol(math, ams, rel, "\u22e8", "\\precnsim");
defineSymbol(math, ams, rel, "\u2ab9", "\\precnapprox");
defineSymbol(math, ams, rel, "\u2241", "\\nsim");
defineSymbol(math, ams, rel, "\ue006", "\\nshortmid");
defineSymbol(math, ams, rel, "\u2224", "\\nmid");
defineSymbol(math, ams, rel, "\u22ac", "\\nvdash");
defineSymbol(math, ams, rel, "\u22ad", "\\nvDash");
defineSymbol(math, ams, rel, "\u22ea", "\\ntriangleleft");
defineSymbol(math, ams, rel, "\u22ec", "\\ntrianglelefteq");
defineSymbol(math, ams, rel, "\u228a", "\\subsetneq");
defineSymbol(math, ams, rel, "\ue01a", "\\varsubsetneq");
defineSymbol(math, ams, rel, "\u2acb", "\\subsetneqq");
defineSymbol(math, ams, rel, "\ue017", "\\varsubsetneqq");
defineSymbol(math, ams, rel, "\u226f", "\\ngtr");
defineSymbol(math, ams, rel, "\ue00f", "\\ngeqslant");
defineSymbol(math, ams, rel, "\ue00e", "\\ngeqq");
defineSymbol(math, ams, rel, "\u2a88", "\\gneq");
defineSymbol(math, ams, rel, "\u2269", "\\gneqq");
defineSymbol(math, ams, rel, "\ue00d", "\\gvertneqq");
defineSymbol(math, ams, rel, "\u22e7", "\\gnsim");
defineSymbol(math, ams, rel, "\u2a8a", "\\gnapprox");
defineSymbol(math, ams, rel, "\u2281", "\\nsucc");
defineSymbol(math, ams, rel, "\u22e1", "\\nsucceq");
defineSymbol(math, ams, rel, "\u22e9", "\\succnsim");
defineSymbol(math, ams, rel, "\u2aba", "\\succnapprox");
defineSymbol(math, ams, rel, "\u2246", "\\ncong");
defineSymbol(math, ams, rel, "\ue007", "\\nshortparallel");
defineSymbol(math, ams, rel, "\u2226", "\\nparallel");
defineSymbol(math, ams, rel, "\u22af", "\\nVDash");
defineSymbol(math, ams, rel, "\u22eb", "\\ntriangleright");
defineSymbol(math, ams, rel, "\u22ed", "\\ntrianglerighteq");
defineSymbol(math, ams, rel, "\ue018", "\\nsupseteqq");
defineSymbol(math, ams, rel, "\u228b", "\\supsetneq");
defineSymbol(math, ams, rel, "\ue01b", "\\varsupsetneq");
defineSymbol(math, ams, rel, "\u2acc", "\\supsetneqq");
defineSymbol(math, ams, rel, "\ue019", "\\varsupsetneqq");
defineSymbol(math, ams, rel, "\u22ae", "\\nVdash");
defineSymbol(math, ams, rel, "\u2ab5", "\\precneqq");
defineSymbol(math, ams, rel, "\u2ab6", "\\succneqq");
defineSymbol(math, ams, rel, "\ue016", "\\nsubseteqq");
defineSymbol(math, ams, bin, "\u22b4", "\\unlhd");
defineSymbol(math, ams, bin, "\u22b5", "\\unrhd");

// AMS Negated Arrows
defineSymbol(math, ams, rel, "\u219a", "\\nleftarrow");
defineSymbol(math, ams, rel, "\u219b", "\\nrightarrow");
defineSymbol(math, ams, rel, "\u21cd", "\\nLeftarrow");
defineSymbol(math, ams, rel, "\u21cf", "\\nRightarrow");
defineSymbol(math, ams, rel, "\u21ae", "\\nleftrightarrow");
defineSymbol(math, ams, rel, "\u21ce", "\\nLeftrightarrow");

// AMS Misc
defineSymbol(math, ams, rel, "\u25b3", "\\vartriangle");
defineSymbol(math, ams, textord, "\u210f", "\\hslash");
defineSymbol(math, ams, textord, "\u25bd", "\\triangledown");
defineSymbol(math, ams, textord, "\u25ca", "\\lozenge");
defineSymbol(math, ams, textord, "\u24c8", "\\circledS");
defineSymbol(math, ams, textord, "\u00ae", "\\circledR");
defineSymbol(math, ams, textord, "\u2221", "\\measuredangle");
defineSymbol(math, ams, textord, "\u2204", "\\nexists");
defineSymbol(math, ams, textord, "\u2127", "\\mho");
defineSymbol(math, ams, textord, "\u2132", "\\Finv");
defineSymbol(math, ams, textord, "\u2141", "\\Game");
defineSymbol(math, ams, textord, "\u006b", "\\Bbbk");
defineSymbol(math, ams, textord, "\u2035", "\\backprime");
defineSymbol(math, ams, textord, "\u25b2", "\\blacktriangle");
defineSymbol(math, ams, textord, "\u25bc", "\\blacktriangledown");
defineSymbol(math, ams, textord, "\u25a0", "\\blacksquare");
defineSymbol(math, ams, textord, "\u29eb", "\\blacklozenge");
defineSymbol(math, ams, textord, "\u2605", "\\bigstar");
defineSymbol(math, ams, textord, "\u2222", "\\sphericalangle");
defineSymbol(math, ams, textord, "\u2201", "\\complement");
defineSymbol(math, ams, textord, "\u00f0", "\\eth");
defineSymbol(math, ams, textord, "\u2571", "\\diagup");
defineSymbol(math, ams, textord, "\u2572", "\\diagdown");
defineSymbol(math, ams, textord, "\u25a1", "\\square");
defineSymbol(math, ams, textord, "\u25a1", "\\Box");
defineSymbol(math, ams, textord, "\u25ca", "\\Diamond");
defineSymbol(math, ams, textord, "\u00a5", "\\yen");
defineSymbol(math, ams, textord, "\u2713", "\\checkmark");

// AMS Hebrew
defineSymbol(math, ams, textord, "\u2136", "\\beth");
defineSymbol(math, ams, textord, "\u2138", "\\daleth");
defineSymbol(math, ams, textord, "\u2137", "\\gimel");

// AMS Greek
defineSymbol(math, ams, textord, "\u03dd", "\\digamma");
defineSymbol(math, ams, textord, "\u03f0", "\\varkappa");

// AMS Delimiters
defineSymbol(math, ams, open, "\u250c", "\\ulcorner");
defineSymbol(math, ams, close, "\u2510", "\\urcorner");
defineSymbol(math, ams, open, "\u2514", "\\llcorner");
defineSymbol(math, ams, close, "\u2518", "\\lrcorner");

// AMS Binary Relations
defineSymbol(math, ams, rel, "\u2266", "\\leqq");
defineSymbol(math, ams, rel, "\u2a7d", "\\leqslant");
defineSymbol(math, ams, rel, "\u2a95", "\\eqslantless");
defineSymbol(math, ams, rel, "\u2272", "\\lesssim");
defineSymbol(math, ams, rel, "\u2a85", "\\lessapprox");
defineSymbol(math, ams, rel, "\u224a", "\\approxeq");
defineSymbol(math, ams, bin, "\u22d6", "\\lessdot");
defineSymbol(math, ams, rel, "\u22d8", "\\lll");
defineSymbol(math, ams, rel, "\u2276", "\\lessgtr");
defineSymbol(math, ams, rel, "\u22da", "\\lesseqgtr");
defineSymbol(math, ams, rel, "\u2a8b", "\\lesseqqgtr");
defineSymbol(math, ams, rel, "\u2251", "\\doteqdot");
defineSymbol(math, ams, rel, "\u2253", "\\risingdotseq");
defineSymbol(math, ams, rel, "\u2252", "\\fallingdotseq");
defineSymbol(math, ams, rel, "\u223d", "\\backsim");
defineSymbol(math, ams, rel, "\u22cd", "\\backsimeq");
defineSymbol(math, ams, rel, "\u2ac5", "\\subseteqq");
defineSymbol(math, ams, rel, "\u22d0", "\\Subset");
defineSymbol(math, ams, rel, "\u228f", "\\sqsubset");
defineSymbol(math, ams, rel, "\u227c", "\\preccurlyeq");
defineSymbol(math, ams, rel, "\u22de", "\\curlyeqprec");
defineSymbol(math, ams, rel, "\u227e", "\\precsim");
defineSymbol(math, ams, rel, "\u2ab7", "\\precapprox");
defineSymbol(math, ams, rel, "\u22b2", "\\vartriangleleft");
defineSymbol(math, ams, rel, "\u22b4", "\\trianglelefteq");
defineSymbol(math, ams, rel, "\u22a8", "\\vDash");
defineSymbol(math, ams, rel, "\u22aa", "\\Vvdash");
defineSymbol(math, ams, rel, "\u2323", "\\smallsmile");
defineSymbol(math, ams, rel, "\u2322", "\\smallfrown");
defineSymbol(math, ams, rel, "\u224f", "\\bumpeq");
defineSymbol(math, ams, rel, "\u224e", "\\Bumpeq");
defineSymbol(math, ams, rel, "\u2267", "\\geqq");
defineSymbol(math, ams, rel, "\u2a7e", "\\geqslant");
defineSymbol(math, ams, rel, "\u2a96", "\\eqslantgtr");
defineSymbol(math, ams, rel, "\u2273", "\\gtrsim");
defineSymbol(math, ams, rel, "\u2a86", "\\gtrapprox");
defineSymbol(math, ams, bin, "\u22d7", "\\gtrdot");
defineSymbol(math, ams, rel, "\u22d9", "\\ggg");
defineSymbol(math, ams, rel, "\u2277", "\\gtrless");
defineSymbol(math, ams, rel, "\u22db", "\\gtreqless");
defineSymbol(math, ams, rel, "\u2a8c", "\\gtreqqless");
defineSymbol(math, ams, rel, "\u2256", "\\eqcirc");
defineSymbol(math, ams, rel, "\u2257", "\\circeq");
defineSymbol(math, ams, rel, "\u225c", "\\triangleq");
defineSymbol(math, ams, rel, "\u223c", "\\thicksim");
defineSymbol(math, ams, rel, "\u2248", "\\thickapprox");
defineSymbol(math, ams, rel, "\u2ac6", "\\supseteqq");
defineSymbol(math, ams, rel, "\u22d1", "\\Supset");
defineSymbol(math, ams, rel, "\u2290", "\\sqsupset");
defineSymbol(math, ams, rel, "\u227d", "\\succcurlyeq");
defineSymbol(math, ams, rel, "\u22df", "\\curlyeqsucc");
defineSymbol(math, ams, rel, "\u227f", "\\succsim");
defineSymbol(math, ams, rel, "\u2ab8", "\\succapprox");
defineSymbol(math, ams, rel, "\u22b3", "\\vartriangleright");
defineSymbol(math, ams, rel, "\u22b5", "\\trianglerighteq");
defineSymbol(math, ams, rel, "\u22a9", "\\Vdash");
defineSymbol(math, ams, rel, "\u2223", "\\shortmid");
defineSymbol(math, ams, rel, "\u2225", "\\shortparallel");
defineSymbol(math, ams, rel, "\u226c", "\\between");
defineSymbol(math, ams, rel, "\u22d4", "\\pitchfork");
defineSymbol(math, ams, rel, "\u221d", "\\varpropto");
defineSymbol(math, ams, rel, "\u25c0", "\\blacktriangleleft");
defineSymbol(math, ams, rel, "\u2234", "\\therefore");
defineSymbol(math, ams, rel, "\u220d", "\\backepsilon");
defineSymbol(math, ams, rel, "\u25b6", "\\blacktriangleright");
defineSymbol(math, ams, rel, "\u2235", "\\because");
defineSymbol(math, ams, rel, "\u22d8", "\\llless");
defineSymbol(math, ams, rel, "\u22d9", "\\gggtr");
defineSymbol(math, ams, bin, "\u22b2", "\\lhd");
defineSymbol(math, ams, bin, "\u22b3", "\\rhd");
defineSymbol(math, ams, rel, "\u2242", "\\eqsim");
defineSymbol(math, main, rel, "\u22c8", "\\Join");
defineSymbol(math, ams, rel, "\u2251", "\\Doteq");

// AMS Binary Operators
defineSymbol(math, ams, bin, "\u2214", "\\dotplus");
defineSymbol(math, ams, bin, "\u2216", "\\smallsetminus");
defineSymbol(math, ams, bin, "\u22d2", "\\Cap");
defineSymbol(math, ams, bin, "\u22d3", "\\Cup");
defineSymbol(math, ams, bin, "\u2a5e", "\\doublebarwedge");
defineSymbol(math, ams, bin, "\u229f", "\\boxminus");
defineSymbol(math, ams, bin, "\u229e", "\\boxplus");
defineSymbol(math, ams, bin, "\u22c7", "\\divideontimes");
defineSymbol(math, ams, bin, "\u22c9", "\\ltimes");
defineSymbol(math, ams, bin, "\u22ca", "\\rtimes");
defineSymbol(math, ams, bin, "\u22cb", "\\leftthreetimes");
defineSymbol(math, ams, bin, "\u22cc", "\\rightthreetimes");
defineSymbol(math, ams, bin, "\u22cf", "\\curlywedge");
defineSymbol(math, ams, bin, "\u22ce", "\\curlyvee");
defineSymbol(math, ams, bin, "\u229d", "\\circleddash");
defineSymbol(math, ams, bin, "\u229b", "\\circledast");
defineSymbol(math, ams, bin, "\u22c5", "\\centerdot");
defineSymbol(math, ams, bin, "\u22ba", "\\intercal");
defineSymbol(math, ams, bin, "\u22d2", "\\doublecap");
defineSymbol(math, ams, bin, "\u22d3", "\\doublecup");
defineSymbol(math, ams, bin, "\u22a0", "\\boxtimes");

// AMS Arrows
defineSymbol(math, ams, rel, "\u21e2", "\\dashrightarrow");
defineSymbol(math, ams, rel, "\u21e0", "\\dashleftarrow");
defineSymbol(math, ams, rel, "\u21c7", "\\leftleftarrows");
defineSymbol(math, ams, rel, "\u21c6", "\\leftrightarrows");
defineSymbol(math, ams, rel, "\u21da", "\\Lleftarrow");
defineSymbol(math, ams, rel, "\u219e", "\\twoheadleftarrow");
defineSymbol(math, ams, rel, "\u21a2", "\\leftarrowtail");
defineSymbol(math, ams, rel, "\u21ab", "\\looparrowleft");
defineSymbol(math, ams, rel, "\u21cb", "\\leftrightharpoons");
defineSymbol(math, ams, rel, "\u21b6", "\\curvearrowleft");
defineSymbol(math, ams, rel, "\u21ba", "\\circlearrowleft");
defineSymbol(math, ams, rel, "\u21b0", "\\Lsh");
defineSymbol(math, ams, rel, "\u21c8", "\\upuparrows");
defineSymbol(math, ams, rel, "\u21bf", "\\upharpoonleft");
defineSymbol(math, ams, rel, "\u21c3", "\\downharpoonleft");
defineSymbol(math, ams, rel, "\u22b8", "\\multimap");
defineSymbol(math, ams, rel, "\u21ad", "\\leftrightsquigarrow");
defineSymbol(math, ams, rel, "\u21c9", "\\rightrightarrows");
defineSymbol(math, ams, rel, "\u21c4", "\\rightleftarrows");
defineSymbol(math, ams, rel, "\u21a0", "\\twoheadrightarrow");
defineSymbol(math, ams, rel, "\u21a3", "\\rightarrowtail");
defineSymbol(math, ams, rel, "\u21ac", "\\looparrowright");
defineSymbol(math, ams, rel, "\u21b7", "\\curvearrowright");
defineSymbol(math, ams, rel, "\u21bb", "\\circlearrowright");
defineSymbol(math, ams, rel, "\u21b1", "\\Rsh");
defineSymbol(math, ams, rel, "\u21ca", "\\downdownarrows");
defineSymbol(math, ams, rel, "\u21be", "\\upharpoonright");
defineSymbol(math, ams, rel, "\u21c2", "\\downharpoonright");
defineSymbol(math, ams, rel, "\u21dd", "\\rightsquigarrow");
defineSymbol(math, ams, rel, "\u21dd", "\\leadsto");
defineSymbol(math, ams, rel, "\u21db", "\\Rrightarrow");
defineSymbol(math, ams, rel, "\u21be", "\\restriction");

defineSymbol(math, main, textord, "\u2018", "`");
defineSymbol(math, main, textord, "$", "\\$");
defineSymbol(text, main, textord, "$", "\\$");
defineSymbol(math, main, textord, "%", "\\%");
defineSymbol(text, main, textord, "%", "\\%");
defineSymbol(math, main, textord, "_", "\\_");
defineSymbol(text, main, textord, "_", "\\_");
defineSymbol(math, main, textord, "\u2220", "\\angle");
defineSymbol(math, main, textord, "\u221e", "\\infty");
defineSymbol(math, main, textord, "\u2032", "\\prime");
defineSymbol(math, main, textord, "\u25b3", "\\triangle");
defineSymbol(math, main, textord, "\u0393", "\\Gamma");
defineSymbol(math, main, textord, "\u0394", "\\Delta");
defineSymbol(math, main, textord, "\u0398", "\\Theta");
defineSymbol(math, main, textord, "\u039b", "\\Lambda");
defineSymbol(math, main, textord, "\u039e", "\\Xi");
defineSymbol(math, main, textord, "\u03a0", "\\Pi");
defineSymbol(math, main, textord, "\u03a3", "\\Sigma");
defineSymbol(math, main, textord, "\u03a5", "\\Upsilon");
defineSymbol(math, main, textord, "\u03a6", "\\Phi");
defineSymbol(math, main, textord, "\u03a8", "\\Psi");
defineSymbol(math, main, textord, "\u03a9", "\\Omega");
defineSymbol(math, main, textord, "\u00ac", "\\neg");
defineSymbol(math, main, textord, "\u00ac", "\\lnot");
defineSymbol(math, main, textord, "\u22a4", "\\top");
defineSymbol(math, main, textord, "\u22a5", "\\bot");
defineSymbol(math, main, textord, "\u2205", "\\emptyset");
defineSymbol(math, ams, textord, "\u2205", "\\varnothing");
defineSymbol(math, main, mathord, "\u03b1", "\\alpha");
defineSymbol(math, main, mathord, "\u03b2", "\\beta");
defineSymbol(math, main, mathord, "\u03b3", "\\gamma");
defineSymbol(math, main, mathord, "\u03b4", "\\delta");
defineSymbol(math, main, mathord, "\u03f5", "\\epsilon");
defineSymbol(math, main, mathord, "\u03b6", "\\zeta");
defineSymbol(math, main, mathord, "\u03b7", "\\eta");
defineSymbol(math, main, mathord, "\u03b8", "\\theta");
defineSymbol(math, main, mathord, "\u03b9", "\\iota");
defineSymbol(math, main, mathord, "\u03ba", "\\kappa");
defineSymbol(math, main, mathord, "\u03bb", "\\lambda");
defineSymbol(math, main, mathord, "\u03bc", "\\mu");
defineSymbol(math, main, mathord, "\u03bd", "\\nu");
defineSymbol(math, main, mathord, "\u03be", "\\xi");
defineSymbol(math, main, mathord, "o", "\\omicron");
defineSymbol(math, main, mathord, "\u03c0", "\\pi");
defineSymbol(math, main, mathord, "\u03c1", "\\rho");
defineSymbol(math, main, mathord, "\u03c3", "\\sigma");
defineSymbol(math, main, mathord, "\u03c4", "\\tau");
defineSymbol(math, main, mathord, "\u03c5", "\\upsilon");
defineSymbol(math, main, mathord, "\u03d5", "\\phi");
defineSymbol(math, main, mathord, "\u03c7", "\\chi");
defineSymbol(math, main, mathord, "\u03c8", "\\psi");
defineSymbol(math, main, mathord, "\u03c9", "\\omega");
defineSymbol(math, main, mathord, "\u03b5", "\\varepsilon");
defineSymbol(math, main, mathord, "\u03d1", "\\vartheta");
defineSymbol(math, main, mathord, "\u03d6", "\\varpi");
defineSymbol(math, main, mathord, "\u03f1", "\\varrho");
defineSymbol(math, main, mathord, "\u03c2", "\\varsigma");
defineSymbol(math, main, mathord, "\u03c6", "\\varphi");
defineSymbol(math, main, bin, "\u2217", "*");
defineSymbol(math, main, bin, "+", "+");
defineSymbol(math, main, bin, "\u2212", "-");
defineSymbol(math, main, bin, "\u22c5", "\\cdot");
defineSymbol(math, main, bin, "\u2218", "\\circ");
defineSymbol(math, main, bin, "\u00f7", "\\div");
defineSymbol(math, main, bin, "\u00b1", "\\pm");
defineSymbol(math, main, bin, "\u00d7", "\\times");
defineSymbol(math, main, bin, "\u2229", "\\cap");
defineSymbol(math, main, bin, "\u222a", "\\cup");
defineSymbol(math, main, bin, "\u2216", "\\setminus");
defineSymbol(math, main, bin, "\u2227", "\\land");
defineSymbol(math, main, bin, "\u2228", "\\lor");
defineSymbol(math, main, bin, "\u2227", "\\wedge");
defineSymbol(math, main, bin, "\u2228", "\\vee");
defineSymbol(math, main, textord, "\u221a", "\\surd");
defineSymbol(math, main, open, "(", "(");
defineSymbol(math, main, open, "[", "[");
defineSymbol(math, main, open, "\u27e8", "\\langle");
defineSymbol(math, main, open, "\u2223", "\\lvert");
defineSymbol(math, main, open, "\u2225", "\\lVert");
defineSymbol(math, main, close, ")", ")");
defineSymbol(math, main, close, "]", "]");
defineSymbol(math, main, close, "?", "?");
defineSymbol(math, main, close, "!", "!");
defineSymbol(math, main, close, "\u27e9", "\\rangle");
defineSymbol(math, main, close, "\u2223", "\\rvert");
defineSymbol(math, main, close, "\u2225", "\\rVert");
defineSymbol(math, main, rel, "=", "=");
defineSymbol(math, main, rel, "<", "<");
defineSymbol(math, main, rel, ">", ">");
defineSymbol(math, main, rel, ":", ":");
defineSymbol(math, main, rel, "\u2248", "\\approx");
defineSymbol(math, main, rel, "\u2245", "\\cong");
defineSymbol(math, main, rel, "\u2265", "\\ge");
defineSymbol(math, main, rel, "\u2265", "\\geq");
defineSymbol(math, main, rel, "\u2190", "\\gets");
defineSymbol(math, main, rel, ">", "\\gt");
defineSymbol(math, main, rel, "\u2208", "\\in");
defineSymbol(math, main, rel, "\u2209", "\\notin");
defineSymbol(math, main, rel, "\u2282", "\\subset");
defineSymbol(math, main, rel, "\u2283", "\\supset");
defineSymbol(math, main, rel, "\u2286", "\\subseteq");
defineSymbol(math, main, rel, "\u2287", "\\supseteq");
defineSymbol(math, ams, rel, "\u2288", "\\nsubseteq");
defineSymbol(math, ams, rel, "\u2289", "\\nsupseteq");
defineSymbol(math, main, rel, "\u22a8", "\\models");
defineSymbol(math, main, rel, "\u2190", "\\leftarrow");
defineSymbol(math, main, rel, "\u2264", "\\le");
defineSymbol(math, main, rel, "\u2264", "\\leq");
defineSymbol(math, main, rel, "<", "\\lt");
defineSymbol(math, main, rel, "\u2260", "\\ne");
defineSymbol(math, main, rel, "\u2260", "\\neq");
defineSymbol(math, main, rel, "\u2192", "\\rightarrow");
defineSymbol(math, main, rel, "\u2192", "\\to");
defineSymbol(math, ams, rel, "\u2271", "\\ngeq");
defineSymbol(math, ams, rel, "\u2270", "\\nleq");
defineSymbol(math, main, spacing, null, "\\!");
defineSymbol(math, main, spacing, "\u00a0", "\\ ");
defineSymbol(math, main, spacing, "\u00a0", "~");
defineSymbol(math, main, spacing, null, "\\,");
defineSymbol(math, main, spacing, null, "\\:");
defineSymbol(math, main, spacing, null, "\\;");
defineSymbol(math, main, spacing, null, "\\enspace");
defineSymbol(math, main, spacing, null, "\\qquad");
defineSymbol(math, main, spacing, null, "\\quad");
defineSymbol(math, main, spacing, "\u00a0", "\\space");
defineSymbol(math, main, punct, ",", ",");
defineSymbol(math, main, punct, ";", ";");
defineSymbol(math, main, punct, ":", "\\colon");
defineSymbol(math, ams, bin, "\u22bc", "\\barwedge");
defineSymbol(math, ams, bin, "\u22bb", "\\veebar");
defineSymbol(math, main, bin, "\u2299", "\\odot");
defineSymbol(math, main, bin, "\u2295", "\\oplus");
defineSymbol(math, main, bin, "\u2297", "\\otimes");
defineSymbol(math, main, textord, "\u2202", "\\partial");
defineSymbol(math, main, bin, "\u2298", "\\oslash");
defineSymbol(math, ams, bin, "\u229a", "\\circledcirc");
defineSymbol(math, ams, bin, "\u22a1", "\\boxdot");
defineSymbol(math, main, bin, "\u25b3", "\\bigtriangleup");
defineSymbol(math, main, bin, "\u25bd", "\\bigtriangledown");
defineSymbol(math, main, bin, "\u2020", "\\dagger");
defineSymbol(math, main, bin, "\u22c4", "\\diamond");
defineSymbol(math, main, bin, "\u22c6", "\\star");
defineSymbol(math, main, bin, "\u25c3", "\\triangleleft");
defineSymbol(math, main, bin, "\u25b9", "\\triangleright");
defineSymbol(math, main, open, "{", "\\{");
defineSymbol(text, main, textord, "{", "\\{");
defineSymbol(math, main, close, "}", "\\}");
defineSymbol(text, main, textord, "}", "\\}");
defineSymbol(math, main, open, "{", "\\lbrace");
defineSymbol(math, main, close, "}", "\\rbrace");
defineSymbol(math, main, open, "[", "\\lbrack");
defineSymbol(math, main, close, "]", "\\rbrack");
defineSymbol(math, main, open, "\u230a", "\\lfloor");
defineSymbol(math, main, close, "\u230b", "\\rfloor");
defineSymbol(math, main, open, "\u2308", "\\lceil");
defineSymbol(math, main, close, "\u2309", "\\rceil");
defineSymbol(math, main, textord, "\\", "\\backslash");
defineSymbol(math, main, textord, "\u2223", "|");
defineSymbol(math, main, textord, "\u2223", "\\vert");
defineSymbol(math, main, textord, "\u2225", "\\|");
defineSymbol(math, main, textord, "\u2225", "\\Vert");
defineSymbol(math, main, rel, "\u2191", "\\uparrow");
defineSymbol(math, main, rel, "\u21d1", "\\Uparrow");
defineSymbol(math, main, rel, "\u2193", "\\downarrow");
defineSymbol(math, main, rel, "\u21d3", "\\Downarrow");
defineSymbol(math, main, rel, "\u2195", "\\updownarrow");
defineSymbol(math, main, rel, "\u21d5", "\\Updownarrow");
defineSymbol(math, math, op, "\u2210", "\\coprod");
defineSymbol(math, math, op, "\u22c1", "\\bigvee");
defineSymbol(math, math, op, "\u22c0", "\\bigwedge");
defineSymbol(math, math, op, "\u2a04", "\\biguplus");
defineSymbol(math, math, op, "\u22c2", "\\bigcap");
defineSymbol(math, math, op, "\u22c3", "\\bigcup");
defineSymbol(math, math, op, "\u222b", "\\int");
defineSymbol(math, math, op, "\u222b", "\\intop");
defineSymbol(math, math, op, "\u222c", "\\iint");
defineSymbol(math, math, op, "\u222d", "\\iiint");
defineSymbol(math, math, op, "\u220f", "\\prod");
defineSymbol(math, math, op, "\u2211", "\\sum");
defineSymbol(math, math, op, "\u2a02", "\\bigotimes");
defineSymbol(math, math, op, "\u2a01", "\\bigoplus");
defineSymbol(math, math, op, "\u2a00", "\\bigodot");
defineSymbol(math, math, op, "\u222e", "\\oint");
defineSymbol(math, math, op, "\u2a06", "\\bigsqcup");
defineSymbol(math, math, op, "\u222b", "\\smallint");
defineSymbol(text, main, inner, "\u2026", "\\textellipsis");
defineSymbol(math, main, inner, "\u2026", "\\mathellipsis");
defineSymbol(text, main, inner, "\u2026", "\\ldots");
defineSymbol(math, main, inner, "\u2026", "\\ldots");
defineSymbol(math, main, inner, "\u22ef", "\\cdots");
defineSymbol(math, main, inner, "\u22f1", "\\ddots");
defineSymbol(math, main, textord, "\u22ee", "\\vdots");
defineSymbol(math, main, accent, "\u00b4", "\\acute");
defineSymbol(math, main, accent, "\u0060", "\\grave");
defineSymbol(math, main, accent, "\u00a8", "\\ddot");
defineSymbol(math, main, accent, "\u007e", "\\tilde");
defineSymbol(math, main, accent, "\u00af", "\\bar");
defineSymbol(math, main, accent, "\u02d8", "\\breve");
defineSymbol(math, main, accent, "\u02c7", "\\check");
defineSymbol(math, main, accent, "\u005e", "\\hat");
defineSymbol(math, main, accent, "\u20d7", "\\vec");
defineSymbol(math, main, accent, "\u02d9", "\\dot");
defineSymbol(math, main, mathord, "\u0131", "\\imath");
defineSymbol(math, main, mathord, "\u0237", "\\jmath");

defineSymbol(text, main, textord, "\u2013", "--");
defineSymbol(text, main, textord, "\u2014", "---");
defineSymbol(text, main, textord, "\u2018", "`");
defineSymbol(text, main, textord, "\u2019", "'");
defineSymbol(text, main, textord, "\u201c", "``");
defineSymbol(text, main, textord, "\u201d", "''");
defineSymbol(math, main, textord, "\u00b0", "\\degree");
defineSymbol(text, main, textord, "\u00b0", "\\degree");
defineSymbol(math, main, mathord, "\u00a3", "\\pounds");
defineSymbol(math, ams, textord, "\u2720", "\\maltese");
defineSymbol(text, ams, textord, "\u2720", "\\maltese");

defineSymbol(text, main, spacing, "\u00a0", "\\ ");
defineSymbol(text, main, spacing, "\u00a0", " ");
defineSymbol(text, main, spacing, "\u00a0", "~");

// There are lots of symbols which are the same, so we add them in afterwards.
var i;
var ch;

// All of these are textords in math mode
var mathTextSymbols = "0123456789/@.\"";
for (i = 0; i < mathTextSymbols.length; i++) {
    ch = mathTextSymbols.charAt(i);
    defineSymbol(math, main, textord, ch, ch);
}

// All of these are textords in text mode
var textSymbols = "0123456789!@*()-=+[]\";:?/.,";
for (i = 0; i < textSymbols.length; i++) {
    ch = textSymbols.charAt(i);
    defineSymbol(text, main, textord, ch, ch);
}

// All of these are textords in text mode, and mathords in math mode
var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (i = 0; i < letters.length; i++) {
    ch = letters.charAt(i);
    defineSymbol(math, main, mathord, ch, ch);
    defineSymbol(text, main, textord, ch, ch);
}

// Latin-1 letters
for (i = 0x00C0; i <= 0x00D6; i++) {
    ch = String.fromCharCode(i);
    defineSymbol(text, main, textord, ch, ch);
}

for (i = 0x00D8; i <= 0x00F6; i++) {
    ch = String.fromCharCode(i);
    defineSymbol(text, main, textord, ch, ch);
}

for (i = 0x00F8; i <= 0x00FF; i++) {
    ch = String.fromCharCode(i);
    defineSymbol(text, main, textord, ch, ch);
}

// Cyrillic
for (i = 0x0410; i <= 0x044F; i++) {
    ch = String.fromCharCode(i);
    defineSymbol(text, main, textord, ch, ch);
}

// Unicode versions of existing characters
defineSymbol(text, main, textord, "\u2013", "–");
defineSymbol(text, main, textord, "\u2014", "—");
defineSymbol(text, main, textord, "\u2018", "‘");
defineSymbol(text, main, textord, "\u2019", "’");
defineSymbol(text, main, textord, "\u201c", "“");
defineSymbol(text, main, textord, "\u201d", "”");


/***/ }),

/***/ "./node_modules/katex/src/unicodeRegexes.js":
/*!**************************************************!*\
  !*** ./node_modules/katex/src/unicodeRegexes.js ***!
  \**************************************************/
/***/ ((module) => {

var hangulRegex = /[\uAC00-\uD7AF]/;

// This regex combines
// - Hiragana: [\u3040-\u309F]
// - Katakana: [\u30A0-\u30FF]
// - CJK ideograms: [\u4E00-\u9FAF]
// - Hangul syllables: [\uAC00-\uD7AF]
// Notably missing are halfwidth Katakana and Romanji glyphs.
var cjkRegex =
    /[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FAF]|[\uAC00-\uD7AF]/;

module.exports = {
    cjkRegex: cjkRegex,
    hangulRegex: hangulRegex
};


/***/ }),

/***/ "./node_modules/katex/src/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/katex/src/utils.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * This file contains a list of utility functions which are useful in other
 * files.
 */

/**
 * Provide an `indexOf` function which works in IE8, but defers to native if
 * possible.
 */
var nativeIndexOf = Array.prototype.indexOf;
var indexOf = function(list, elem) {
    if (list == null) {
        return -1;
    }
    if (nativeIndexOf && list.indexOf === nativeIndexOf) {
        return list.indexOf(elem);
    }
    var i = 0;
    var l = list.length;
    for (; i < l; i++) {
        if (list[i] === elem) {
            return i;
        }
    }
    return -1;
};

/**
 * Return whether an element is contained in a list
 */
var contains = function(list, elem) {
    return indexOf(list, elem) !== -1;
};

/**
 * Provide a default value if a setting is undefined
 */
var deflt = function(setting, defaultIfUndefined) {
    return setting === undefined ? defaultIfUndefined : setting;
};

// hyphenate and escape adapted from Facebook's React under Apache 2 license

var uppercase = /([A-Z])/g;
var hyphenate = function(str) {
    return str.replace(uppercase, "-$1").toLowerCase();
};

var ESCAPE_LOOKUP = {
    "&": "&amp;",
    ">": "&gt;",
    "<": "&lt;",
    "\"": "&quot;",
    "'": "&#x27;"
};

var ESCAPE_REGEX = /[&><"']/g;

function escaper(match) {
    return ESCAPE_LOOKUP[match];
}

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
function escape(text) {
    return ("" + text).replace(ESCAPE_REGEX, escaper);
}

/**
 * A function to set the text content of a DOM element in all supported
 * browsers. Note that we don't define this if there is no document.
 */
var setTextContent;
if (typeof document !== "undefined") {
    var testNode = document.createElement("span");
    if ("textContent" in testNode) {
        setTextContent = function(node, text) {
            node.textContent = text;
        };
    } else {
        setTextContent = function(node, text) {
            node.innerText = text;
        };
    }
}

/**
 * A function to clear a node.
 */
function clearNode(node) {
    setTextContent(node, "");
}

module.exports = {
    contains: contains,
    deflt: deflt,
    escape: escape,
    hyphenate: hyphenate,
    indexOf: indexOf,
    setTextContent: setTextContent,
    clearNode: clearNode
};


/***/ }),

/***/ "./node_modules/linkify-it/index.js":
/*!******************************************!*\
  !*** ./node_modules/linkify-it/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



////////////////////////////////////////////////////////////////////////////////
// Helpers

// Merge objects
//
function assign(obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return; }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

function _class(obj) { return Object.prototype.toString.call(obj); }
function isString(obj) { return _class(obj) === '[object String]'; }
function isObject(obj) { return _class(obj) === '[object Object]'; }
function isRegExp(obj) { return _class(obj) === '[object RegExp]'; }
function isFunction(obj) { return _class(obj) === '[object Function]'; }


function escapeRE(str) { return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'); }

////////////////////////////////////////////////////////////////////////////////


var defaultOptions = {
  fuzzyLink: true,
  fuzzyEmail: true,
  fuzzyIP: false
};


function isOptionsObj(obj) {
  return Object.keys(obj || {}).reduce(function (acc, k) {
    return acc || defaultOptions.hasOwnProperty(k);
  }, false);
}


var defaultSchemas = {
  'http:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.http) {
        // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.http =  new RegExp(
          '^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i'
        );
      }
      if (self.re.http.test(tail)) {
        return tail.match(self.re.http)[0].length;
      }
      return 0;
    }
  },
  'https:':  'http:',
  'ftp:':    'http:',
  '//':      {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.no_http) {
      // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.no_http =  new RegExp(
          '^' +
          self.re.src_auth +
          // Don't allow single-level domains, because of false positives like '//test'
          // with code comments
          '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' +
          self.re.src_port +
          self.re.src_host_terminator +
          self.re.src_path,

          'i'
        );
      }

      if (self.re.no_http.test(tail)) {
        // should not be `://` & `///`, that protects from errors in protocol name
        if (pos >= 3 && text[pos - 3] === ':') { return 0; }
        if (pos >= 3 && text[pos - 3] === '/') { return 0; }
        return tail.match(self.re.no_http)[0].length;
      }
      return 0;
    }
  },
  'mailto:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.mailto) {
        self.re.mailto =  new RegExp(
          '^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i'
        );
      }
      if (self.re.mailto.test(tail)) {
        return tail.match(self.re.mailto)[0].length;
      }
      return 0;
    }
  }
};

/*eslint-disable max-len*/

// RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
var tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';

// DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
var tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');

/*eslint-enable max-len*/

////////////////////////////////////////////////////////////////////////////////

function resetScanCache(self) {
  self.__index__ = -1;
  self.__text_cache__   = '';
}

function createValidator(re) {
  return function (text, pos) {
    var tail = text.slice(pos);

    if (re.test(tail)) {
      return tail.match(re)[0].length;
    }
    return 0;
  };
}

function createNormalizer() {
  return function (match, self) {
    self.normalize(match);
  };
}

// Schemas compiler. Build regexps.
//
function compile(self) {

  // Load & clone RE patterns.
  var re = self.re = __webpack_require__(/*! ./lib/re */ "./node_modules/linkify-it/lib/re.js")(self.__opts__);

  // Define dynamic patterns
  var tlds = self.__tlds__.slice();

  self.onCompile();

  if (!self.__tlds_replaced__) {
    tlds.push(tlds_2ch_src_re);
  }
  tlds.push(re.src_xn);

  re.src_tlds = tlds.join('|');

  function untpl(tpl) { return tpl.replace('%TLDS%', re.src_tlds); }

  re.email_fuzzy      = RegExp(untpl(re.tpl_email_fuzzy), 'i');
  re.link_fuzzy       = RegExp(untpl(re.tpl_link_fuzzy), 'i');
  re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), 'i');
  re.host_fuzzy_test  = RegExp(untpl(re.tpl_host_fuzzy_test), 'i');

  //
  // Compile each schema
  //

  var aliases = [];

  self.__compiled__ = {}; // Reset compiled data

  function schemaError(name, val) {
    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
  }

  Object.keys(self.__schemas__).forEach(function (name) {
    var val = self.__schemas__[name];

    // skip disabled methods
    if (val === null) { return; }

    var compiled = { validate: null, link: null };

    self.__compiled__[name] = compiled;

    if (isObject(val)) {
      if (isRegExp(val.validate)) {
        compiled.validate = createValidator(val.validate);
      } else if (isFunction(val.validate)) {
        compiled.validate = val.validate;
      } else {
        schemaError(name, val);
      }

      if (isFunction(val.normalize)) {
        compiled.normalize = val.normalize;
      } else if (!val.normalize) {
        compiled.normalize = createNormalizer();
      } else {
        schemaError(name, val);
      }

      return;
    }

    if (isString(val)) {
      aliases.push(name);
      return;
    }

    schemaError(name, val);
  });

  //
  // Compile postponed aliases
  //

  aliases.forEach(function (alias) {
    if (!self.__compiled__[self.__schemas__[alias]]) {
      // Silently fail on missed schemas to avoid errons on disable.
      // schemaError(alias, self.__schemas__[alias]);
      return;
    }

    self.__compiled__[alias].validate =
      self.__compiled__[self.__schemas__[alias]].validate;
    self.__compiled__[alias].normalize =
      self.__compiled__[self.__schemas__[alias]].normalize;
  });

  //
  // Fake record for guessed links
  //
  self.__compiled__[''] = { validate: null, normalize: createNormalizer() };

  //
  // Build schema condition
  //
  var slist = Object.keys(self.__compiled__)
                      .filter(function (name) {
                        // Filter disabled & fake schemas
                        return name.length > 0 && self.__compiled__[name];
                      })
                      .map(escapeRE)
                      .join('|');
  // (?!_) cause 1.5x slowdown
  self.re.schema_test   = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'i');
  self.re.schema_search = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'ig');

  self.re.pretest = RegExp(
    '(' + self.re.schema_test.source + ')|(' + self.re.host_fuzzy_test.source + ')|@',
    'i'
  );

  //
  // Cleanup
  //

  resetScanCache(self);
}

/**
 * class Match
 *
 * Match result. Single element of array, returned by [[LinkifyIt#match]]
 **/
function Match(self, shift) {
  var start = self.__index__,
      end   = self.__last_index__,
      text  = self.__text_cache__.slice(start, end);

  /**
   * Match#schema -> String
   *
   * Prefix (protocol) for matched string.
   **/
  this.schema    = self.__schema__.toLowerCase();
  /**
   * Match#index -> Number
   *
   * First position of matched string.
   **/
  this.index     = start + shift;
  /**
   * Match#lastIndex -> Number
   *
   * Next position after matched string.
   **/
  this.lastIndex = end + shift;
  /**
   * Match#raw -> String
   *
   * Matched string.
   **/
  this.raw       = text;
  /**
   * Match#text -> String
   *
   * Notmalized text of matched string.
   **/
  this.text      = text;
  /**
   * Match#url -> String
   *
   * Normalized url of matched string.
   **/
  this.url       = text;
}

function createMatch(self, shift) {
  var match = new Match(self, shift);

  self.__compiled__[match.schema].normalize(match, self);

  return match;
}


/**
 * class LinkifyIt
 **/

/**
 * new LinkifyIt(schemas, options)
 * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Creates new linkifier instance with optional additional schemas.
 * Can be called without `new` keyword for convenience.
 *
 * By default understands:
 *
 * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
 * - "fuzzy" links and emails (example.com, foo@bar.com).
 *
 * `schemas` is an object, where each key/value describes protocol/rule:
 *
 * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
 *   for example). `linkify-it` makes shure that prefix is not preceeded with
 *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
 * - __value__ - rule to check tail after link prefix
 *   - _String_ - just alias to existing rule
 *   - _Object_
 *     - _validate_ - validator function (should return matched length on success),
 *       or `RegExp`.
 *     - _normalize_ - optional function to normalize text & url of matched result
 *       (for example, for @twitter mentions).
 *
 * `options`:
 *
 * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
 * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
 *   like version numbers. Default `false`.
 * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
 *
 **/
function LinkifyIt(schemas, options) {
  if (!(this instanceof LinkifyIt)) {
    return new LinkifyIt(schemas, options);
  }

  if (!options) {
    if (isOptionsObj(schemas)) {
      options = schemas;
      schemas = {};
    }
  }

  this.__opts__           = assign({}, defaultOptions, options);

  // Cache last tested result. Used to skip repeating steps on next `match` call.
  this.__index__          = -1;
  this.__last_index__     = -1; // Next scan position
  this.__schema__         = '';
  this.__text_cache__     = '';

  this.__schemas__        = assign({}, defaultSchemas, schemas);
  this.__compiled__       = {};

  this.__tlds__           = tlds_default;
  this.__tlds_replaced__  = false;

  this.re = {};

  compile(this);
}


/** chainable
 * LinkifyIt#add(schema, definition)
 * - schema (String): rule name (fixed pattern prefix)
 * - definition (String|RegExp|Object): schema definition
 *
 * Add new rule definition. See constructor description for details.
 **/
LinkifyIt.prototype.add = function add(schema, definition) {
  this.__schemas__[schema] = definition;
  compile(this);
  return this;
};


/** chainable
 * LinkifyIt#set(options)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Set recognition options for links without schema.
 **/
LinkifyIt.prototype.set = function set(options) {
  this.__opts__ = assign(this.__opts__, options);
  return this;
};


/**
 * LinkifyIt#test(text) -> Boolean
 *
 * Searches linkifiable pattern and returns `true` on success or `false` on fail.
 **/
LinkifyIt.prototype.test = function test(text) {
  // Reset scan cache
  this.__text_cache__ = text;
  this.__index__      = -1;

  if (!text.length) { return false; }

  var m, ml, me, len, shift, next, re, tld_pos, at_pos;

  // try to scan for link with schema - that's the most simple rule
  if (this.re.schema_test.test(text)) {
    re = this.re.schema_search;
    re.lastIndex = 0;
    while ((m = re.exec(text)) !== null) {
      len = this.testSchemaAt(text, m[2], re.lastIndex);
      if (len) {
        this.__schema__     = m[2];
        this.__index__      = m.index + m[1].length;
        this.__last_index__ = m.index + m[0].length + len;
        break;
      }
    }
  }

  if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
    // guess schemaless links
    tld_pos = text.search(this.re.host_fuzzy_test);
    if (tld_pos >= 0) {
      // if tld is located after found link - no need to check fuzzy pattern
      if (this.__index__ < 0 || tld_pos < this.__index__) {
        if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {

          shift = ml.index + ml[1].length;

          if (this.__index__ < 0 || shift < this.__index__) {
            this.__schema__     = '';
            this.__index__      = shift;
            this.__last_index__ = ml.index + ml[0].length;
          }
        }
      }
    }
  }

  if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
    // guess schemaless emails
    at_pos = text.indexOf('@');
    if (at_pos >= 0) {
      // We can't skip this check, because this cases are possible:
      // 192.168.1.1@gmail.com, my.in@example.com
      if ((me = text.match(this.re.email_fuzzy)) !== null) {

        shift = me.index + me[1].length;
        next  = me.index + me[0].length;

        if (this.__index__ < 0 || shift < this.__index__ ||
            (shift === this.__index__ && next > this.__last_index__)) {
          this.__schema__     = 'mailto:';
          this.__index__      = shift;
          this.__last_index__ = next;
        }
      }
    }
  }

  return this.__index__ >= 0;
};


/**
 * LinkifyIt#pretest(text) -> Boolean
 *
 * Very quick check, that can give false positives. Returns true if link MAY BE
 * can exists. Can be used for speed optimization, when you need to check that
 * link NOT exists.
 **/
LinkifyIt.prototype.pretest = function pretest(text) {
  return this.re.pretest.test(text);
};


/**
 * LinkifyIt#testSchemaAt(text, name, position) -> Number
 * - text (String): text to scan
 * - name (String): rule (schema) name
 * - position (Number): text offset to check from
 *
 * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
 * at given position. Returns length of found pattern (0 on fail).
 **/
LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
  // If not supported schema check requested - terminate
  if (!this.__compiled__[schema.toLowerCase()]) {
    return 0;
  }
  return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
};


/**
 * LinkifyIt#match(text) -> Array|null
 *
 * Returns array of found link descriptions or `null` on fail. We strongly
 * recommend to use [[LinkifyIt#test]] first, for best speed.
 *
 * ##### Result match description
 *
 * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
 *   protocol-neutral  links.
 * - __index__ - offset of matched text
 * - __lastIndex__ - index of next char after mathch end
 * - __raw__ - matched text
 * - __text__ - normalized text
 * - __url__ - link, generated from matched text
 **/
LinkifyIt.prototype.match = function match(text) {
  var shift = 0, result = [];

  // Try to take previous element from cache, if .test() called before
  if (this.__index__ >= 0 && this.__text_cache__ === text) {
    result.push(createMatch(this, shift));
    shift = this.__last_index__;
  }

  // Cut head if cache was used
  var tail = shift ? text.slice(shift) : text;

  // Scan string until end reached
  while (this.test(tail)) {
    result.push(createMatch(this, shift));

    tail = tail.slice(this.__last_index__);
    shift += this.__last_index__;
  }

  if (result.length) {
    return result;
  }

  return null;
};


/** chainable
 * LinkifyIt#tlds(list [, keepOld]) -> this
 * - list (Array): list of tlds
 * - keepOld (Boolean): merge with current list if `true` (`false` by default)
 *
 * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
 * to avoid false positives. By default this algorythm used:
 *
 * - hostname with any 2-letter root zones are ok.
 * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
 *   are ok.
 * - encoded (`xn--...`) root zones are ok.
 *
 * If list is replaced, then exact match for 2-chars root zones will be checked.
 **/
LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
  list = Array.isArray(list) ? list : [ list ];

  if (!keepOld) {
    this.__tlds__ = list.slice();
    this.__tlds_replaced__ = true;
    compile(this);
    return this;
  }

  this.__tlds__ = this.__tlds__.concat(list)
                                  .sort()
                                  .filter(function (el, idx, arr) {
                                    return el !== arr[idx - 1];
                                  })
                                  .reverse();

  compile(this);
  return this;
};

/**
 * LinkifyIt#normalize(match)
 *
 * Default normalizer (if schema does not define it's own).
 **/
LinkifyIt.prototype.normalize = function normalize(match) {

  // Do minimal possible changes by default. Need to collect feedback prior
  // to move forward https://github.com/markdown-it/linkify-it/issues/1

  if (!match.schema) { match.url = 'http://' + match.url; }

  if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
    match.url = 'mailto:' + match.url;
  }
};


/**
 * LinkifyIt#onCompile()
 *
 * Override to modify basic RegExp-s.
 **/
LinkifyIt.prototype.onCompile = function onCompile() {
};


module.exports = LinkifyIt;


/***/ }),

/***/ "./node_modules/linkify-it/lib/re.js":
/*!*******************************************!*\
  !*** ./node_modules/linkify-it/lib/re.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



module.exports = function (opts) {
  var re = {};

  // Use direct extract instead of `regenerate` to reduse browserified size
  re.src_Any = (__webpack_require__(/*! uc.micro/properties/Any/regex */ "./node_modules/uc.micro/properties/Any/regex.js").source);
  re.src_Cc  = (__webpack_require__(/*! uc.micro/categories/Cc/regex */ "./node_modules/uc.micro/categories/Cc/regex.js").source);
  re.src_Z   = (__webpack_require__(/*! uc.micro/categories/Z/regex */ "./node_modules/uc.micro/categories/Z/regex.js").source);
  re.src_P   = (__webpack_require__(/*! uc.micro/categories/P/regex */ "./node_modules/uc.micro/categories/P/regex.js").source);

  // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
  re.src_ZPCc = [ re.src_Z, re.src_P, re.src_Cc ].join('|');

  // \p{\Z\Cc} (white spaces + control)
  re.src_ZCc = [ re.src_Z, re.src_Cc ].join('|');

  // Experimental. List of chars, completely prohibited in links
  // because can separate it from other part of text
  var text_separators = '[><\uff5c]';

  // All possible word characters (everything without punctuation, spaces & controls)
  // Defined via punctuation & spaces to save space
  // Should be something like \p{\L\N\S\M} (\w but without `_`)
  re.src_pseudo_letter       = '(?:(?!' + text_separators + '|' + re.src_ZPCc + ')' + re.src_Any + ')';
  // The same as abothe but without [0-9]
  // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';

  ////////////////////////////////////////////////////////////////////////////////

  re.src_ip4 =

    '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

  // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.
  re.src_auth    = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';

  re.src_port =

    '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';

  re.src_host_terminator =

    '(?=$|' + text_separators + '|' + re.src_ZPCc + ')(?!-|_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';

  re.src_path =

    '(?:' +
      '[/?#]' +
        '(?:' +
          '(?!' + re.src_ZCc + '|' + text_separators + '|[()[\\]{}.,"\'?!\\-;]).|' +
          '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' +
          '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' +
          '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' +
          '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' +
          "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" +
          "\\'(?=" + re.src_pseudo_letter + '|[-]).|' +  // allow `I'm_king` if no pair found
          '\\.{2,}[a-zA-Z0-9%/&]|' + // google has many dots in "google search" links (#66, #81).
                                     // github has ... in commit range links,
                                     // Restrict to
                                     // - english
                                     // - percent-encoded
                                     // - parts of file path
                                     // - params separator
                                     // until more examples found.
          '\\.(?!' + re.src_ZCc + '|[.]).|' +
          (opts && opts['---'] ?
            '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
            :
            '\\-+|'
          ) +
          ',(?!' + re.src_ZCc + ').|' +       // allow `,,,` in paths
          ';(?!' + re.src_ZCc + ').|' +       // allow `;` if not followed by space-like char
          '\\!+(?!' + re.src_ZCc + '|[!]).|' +  // allow `!!!` in paths, but not at the end
          '\\?(?!' + re.src_ZCc + '|[?]).' +
        ')+' +
      '|\\/' +
    ')?';

  // Allow anything in markdown spec, forbid quote (") at the first position
  // because emails enclosed in quotes are far more common
  re.src_email_name =

    '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';

  re.src_xn =

    'xn--[a-z0-9\\-]{1,59}';

  // More to read about domain names
  // http://serverfault.com/questions/638260/

  re.src_domain_root =

    // Allow letters & digits (http://test1)
    '(?:' +
      re.src_xn +
      '|' +
      re.src_pseudo_letter + '{1,63}' +
    ')';

  re.src_domain =

    '(?:' +
      re.src_xn +
      '|' +
      '(?:' + re.src_pseudo_letter + ')' +
      '|' +
      '(?:' + re.src_pseudo_letter + '(?:-|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' +
    ')';

  re.src_host =

    '(?:' +
    // Don't need IP check, because digits are already allowed in normal domain names
    //   src_ip4 +
    // '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain/*_root*/ + ')' +
    ')';

  re.tpl_host_fuzzy =

    '(?:' +
      re.src_ip4 +
    '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' +
    ')';

  re.tpl_host_no_ip_fuzzy =

    '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';

  re.src_host_strict =

    re.src_host + re.src_host_terminator;

  re.tpl_host_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_host_terminator;

  re.src_host_port_strict =

    re.src_host + re.src_port + re.src_host_terminator;

  re.tpl_host_port_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;

  re.tpl_host_port_no_ip_fuzzy_strict =

    re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;


  ////////////////////////////////////////////////////////////////////////////////
  // Main rules

  // Rude test fuzzy links by host, for quick deny
  re.tpl_host_fuzzy_test =

    'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';

  re.tpl_email_fuzzy =

      '(^|' + text_separators + '|"|\\(|' + re.src_ZCc + ')' +
      '(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';

  re.tpl_link_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';

  re.tpl_link_no_ip_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';

  return re;
};


/***/ }),

/***/ "./node_modules/lodash.assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash.assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = assign;


/***/ }),

/***/ "./node_modules/markdown-it-asciimath/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/markdown-it-asciimath/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "");
};

var katex = __webpack_require__(/*! katex */ "./node_modules/katex/katex.js");
var assign = __webpack_require__(/*! lodash.assign */ "./node_modules/lodash.assign/index.js");
var defaults = {
  useKeyword: false
}

function setup(md, options) {
  if (typeof options === 'undefined') {
    options = defaults;
  }
  var useKeyword = options.useKeyword;
  console.log(useKeyword);


  //var options = assign({}, defaults, options);
  var defaultRender = md.renderer.rules.fence;

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    var token = tokens[idx];

    if(token.info === "math") {
      return render(token.content, true);
    }

    if(token.info === "latex") {
      return renderTeX(token.content, true);
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };

  md.renderer.rules.code_inline = function(tokens, idx, options, env, self) {
    var token = tokens[idx];

    console.log(useKeyword);

    if(!useKeyword) {
      console.log("1");
      return renderInline(token.content.trim(), false);
    } else {
      console.log("2");
      if(token.content.substr(0,4) === "math") {
        return renderInline(token.content.substr(4).trim(), false);
      } else if(token.content.substr(0,5) === "latex") {
        return renderElement(token.content.substr(5).trim(), false);
      }
    }

    return defaultRender(tokens, idx, options, env, self);
  }
}

function render(str, disp) {
  // split content
  var arr = str.trim().split("\n");
  var result = "";

  // render each line, skipping empty lines
  for(var i = 0; i < arr.length; i++) {
    if(arr[i]) {
      result += "<p>" + renderElement(preprocessMath(arr[i]), disp) + "<p>";
    }
  }

  return result;
}

function renderTeX(str, disp) {
  // split content
  var arr = str.trim().split("\n");
  var result = "";

  // render each line, skipping empty lines
  for(var i = 0; i < arr.length; i++) {
    if(arr[i]) {
      result += "<p>" + renderElement(arr[i], disp) + "<p>";
    }
  }

  return result;
}

function renderInline(str, disp) {
  return renderElement(preprocessMath(str), disp);
}

function renderElement(str, disp) {
  return katex.renderToString(str, { displayMode: disp });
}

function preprocessMath(str) {
  var newstr;

  // correct index-texts
  newstr = str.replace(/_(.*?)(\s|$|=|\(|\)|\*|\/|\^)/g, '_($1)$2');

  // parse to TeX
  newstr = AMTparseAMtoTeX(newstr);

  return newstr;
}

module.exports = setup;


/***/ }),

/***/ "./node_modules/markdown-it-container/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/markdown-it-container/index.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
// Process block-level custom containers
//



module.exports = function container_plugin(md, name, options) {

  function validateDefault(params) {
    return params.trim().split(' ', 2)[0] === name;
  }

  function renderDefault(tokens, idx, _options, env, self) {

    // add a class to the opening tag
    if (tokens[idx].nesting === 1) {
      tokens[idx].attrPush([ 'class', name ]);
    }

    return self.renderToken(tokens, idx, _options, env, self);
  }

  options = options || {};

  var min_markers = 3,
      marker_str  = options.marker || ':',
      marker_char = marker_str.charCodeAt(0),
      marker_len  = marker_str.length,
      validate    = options.validate || validateDefault,
      render      = options.render || renderDefault;

  function container(state, startLine, endLine, silent) {
    var pos, nextLine, marker_count, markup, params, token,
        old_parent, old_line_max,
        auto_closed = false,
        start = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    // Check out the first character quickly,
    // this should filter out most of non-containers
    //
    if (marker_char !== state.src.charCodeAt(start)) { return false; }

    // Check out the rest of the marker string
    //
    for (pos = start + 1; pos <= max; pos++) {
      if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
        break;
      }
    }

    marker_count = Math.floor((pos - start) / marker_len);
    if (marker_count < min_markers) { return false; }
    pos -= (pos - start) % marker_len;

    markup = state.src.slice(start, pos);
    params = state.src.slice(pos, max);
    if (!validate(params)) { return false; }

    // Since start is found, we can report success here in validation mode
    //
    if (silent) { return true; }

    // Search for the end of the block
    //
    nextLine = startLine;

    for (;;) {
      nextLine++;
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break;
      }

      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (start < max && state.sCount[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;
      }

      if (marker_char !== state.src.charCodeAt(start)) { continue; }

      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        // closing fence should be indented less than 4 spaces
        continue;
      }

      for (pos = start + 1; pos <= max; pos++) {
        if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
          break;
        }
      }

      // closing code fence must be at least as long as the opening one
      if (Math.floor((pos - start) / marker_len) < marker_count) { continue; }

      // make sure tail has spaces only
      pos -= (pos - start) % marker_len;
      pos = state.skipSpaces(pos);

      if (pos < max) { continue; }

      // found!
      auto_closed = true;
      break;
    }

    old_parent = state.parentType;
    old_line_max = state.lineMax;
    state.parentType = 'container';

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine;

    token        = state.push('container_' + name + '_open', 'div', 1);
    token.markup = markup;
    token.block  = true;
    token.info   = params;
    token.map    = [ startLine, nextLine ];

    state.md.block.tokenize(state, startLine + 1, nextLine);

    token        = state.push('container_' + name + '_close', 'div', -1);
    token.markup = state.src.slice(start, pos);
    token.block  = true;

    state.parentType = old_parent;
    state.lineMax = old_line_max;
    state.line = nextLine + (auto_closed ? 1 : 0);

    return true;
  }

  md.block.ruler.before('fence', 'container_' + name, container, {
    alt: [ 'paragraph', 'reference', 'blockquote', 'list' ]
  });
  md.renderer.rules['container_' + name + '_open'] = render;
  md.renderer.rules['container_' + name + '_close'] = render;
};


/***/ }),

/***/ "./node_modules/markdown-it/index.js":
/*!*******************************************!*\
  !*** ./node_modules/markdown-it/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



module.exports = __webpack_require__(/*! ./lib/ */ "./node_modules/markdown-it/lib/index.js");


/***/ }),

/***/ "./node_modules/markdown-it/lib/common/entities.js":
/*!*********************************************************!*\
  !*** ./node_modules/markdown-it/lib/common/entities.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// HTML5 entities map: { name -> utf16string }
//


/*eslint quotes:0*/
module.exports = __webpack_require__(/*! entities/lib/maps/entities.json */ "./node_modules/entities/lib/maps/entities.json");


/***/ }),

/***/ "./node_modules/markdown-it/lib/common/html_blocks.js":
/*!************************************************************!*\
  !*** ./node_modules/markdown-it/lib/common/html_blocks.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
// List of valid html blocks names, accorting to commonmark spec
// http://jgm.github.io/CommonMark/spec.html#html-blocks




module.exports = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'section',
  'source',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul'
];


/***/ }),

/***/ "./node_modules/markdown-it/lib/common/html_re.js":
/*!********************************************************!*\
  !*** ./node_modules/markdown-it/lib/common/html_re.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
// Regexps to match html elements



var attr_name     = '[a-zA-Z_:][a-zA-Z0-9:._-]*';

var unquoted      = '[^"\'=<>`\\x00-\\x20]+';
var single_quoted = "'[^']*'";
var double_quoted = '"[^"]*"';

var attr_value  = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';

var attribute   = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';

var open_tag    = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';

var close_tag   = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
var comment     = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
var processing  = '<[?][\\s\\S]*?[?]>';
var declaration = '<![A-Z]+\\s+[^>]*>';
var cdata       = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

var HTML_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + '|' + comment +
                        '|' + processing + '|' + declaration + '|' + cdata + ')');
var HTML_OPEN_CLOSE_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + ')');

module.exports.HTML_TAG_RE = HTML_TAG_RE;
module.exports.HTML_OPEN_CLOSE_TAG_RE = HTML_OPEN_CLOSE_TAG_RE;


/***/ }),

/***/ "./node_modules/markdown-it/lib/common/utils.js":
/*!******************************************************!*\
  !*** ./node_modules/markdown-it/lib/common/utils.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Utilities
//



function _class(obj) { return Object.prototype.toString.call(obj); }

function isString(obj) { return _class(obj) === '[object String]'; }

var _hasOwnProperty = Object.prototype.hasOwnProperty;

function has(object, key) {
  return _hasOwnProperty.call(object, key);
}

// Merge objects
//
function assign(obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be object');
    }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

// Remove element from array and put another array at those position.
// Useful for some operations with tokens
function arrayReplaceAt(src, pos, newElements) {
  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
}

////////////////////////////////////////////////////////////////////////////////

function isValidEntityCode(c) {
  /*eslint no-bitwise:0*/
  // broken sequence
  if (c >= 0xD800 && c <= 0xDFFF) { return false; }
  // never used
  if (c >= 0xFDD0 && c <= 0xFDEF) { return false; }
  if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) { return false; }
  // control codes
  if (c >= 0x00 && c <= 0x08) { return false; }
  if (c === 0x0B) { return false; }
  if (c >= 0x0E && c <= 0x1F) { return false; }
  if (c >= 0x7F && c <= 0x9F) { return false; }
  // out of range
  if (c > 0x10FFFF) { return false; }
  return true;
}

function fromCodePoint(c) {
  /*eslint no-bitwise:0*/
  if (c > 0xffff) {
    c -= 0x10000;
    var surrogate1 = 0xd800 + (c >> 10),
        surrogate2 = 0xdc00 + (c & 0x3ff);

    return String.fromCharCode(surrogate1, surrogate2);
  }
  return String.fromCharCode(c);
}


var UNESCAPE_MD_RE  = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g;
var ENTITY_RE       = /&([a-z#][a-z0-9]{1,31});/gi;
var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + '|' + ENTITY_RE.source, 'gi');

var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;

var entities = __webpack_require__(/*! ./entities */ "./node_modules/markdown-it/lib/common/entities.js");

function replaceEntityPattern(match, name) {
  var code = 0;

  if (has(entities, name)) {
    return entities[name];
  }

  if (name.charCodeAt(0) === 0x23/* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
    code = name[1].toLowerCase() === 'x' ?
      parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);

    if (isValidEntityCode(code)) {
      return fromCodePoint(code);
    }
  }

  return match;
}

/*function replaceEntities(str) {
  if (str.indexOf('&') < 0) { return str; }

  return str.replace(ENTITY_RE, replaceEntityPattern);
}*/

function unescapeMd(str) {
  if (str.indexOf('\\') < 0) { return str; }
  return str.replace(UNESCAPE_MD_RE, '$1');
}

function unescapeAll(str) {
  if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) { return str; }

  return str.replace(UNESCAPE_ALL_RE, function (match, escaped, entity) {
    if (escaped) { return escaped; }
    return replaceEntityPattern(match, entity);
  });
}

////////////////////////////////////////////////////////////////////////////////

var HTML_ESCAPE_TEST_RE = /[&<>"]/;
var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
var HTML_REPLACEMENTS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};

function replaceUnsafeChar(ch) {
  return HTML_REPLACEMENTS[ch];
}

function escapeHtml(str) {
  if (HTML_ESCAPE_TEST_RE.test(str)) {
    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
  }
  return str;
}

////////////////////////////////////////////////////////////////////////////////

var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;

function escapeRE(str) {
  return str.replace(REGEXP_ESCAPE_RE, '\\$&');
}

////////////////////////////////////////////////////////////////////////////////

function isSpace(code) {
  switch (code) {
    case 0x09:
    case 0x20:
      return true;
  }
  return false;
}

// Zs (unicode class) || [\t\f\v\r\n]
function isWhiteSpace(code) {
  if (code >= 0x2000 && code <= 0x200A) { return true; }
  switch (code) {
    case 0x09: // \t
    case 0x0A: // \n
    case 0x0B: // \v
    case 0x0C: // \f
    case 0x0D: // \r
    case 0x20:
    case 0xA0:
    case 0x1680:
    case 0x202F:
    case 0x205F:
    case 0x3000:
      return true;
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////////

/*eslint-disable max-len*/
var UNICODE_PUNCT_RE = __webpack_require__(/*! uc.micro/categories/P/regex */ "./node_modules/uc.micro/categories/P/regex.js");

// Currently without astral characters support.
function isPunctChar(ch) {
  return UNICODE_PUNCT_RE.test(ch);
}


// Markdown ASCII punctuation characters.
//
// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
//
// Don't confuse with unicode punctuation !!! It lacks some chars in ascii range.
//
function isMdAsciiPunct(ch) {
  switch (ch) {
    case 0x21/* ! */:
    case 0x22/* " */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x27/* ' */:
    case 0x28/* ( */:
    case 0x29/* ) */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2C/* , */:
    case 0x2D/* - */:
    case 0x2E/* . */:
    case 0x2F/* / */:
    case 0x3A/* : */:
    case 0x3B/* ; */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x3F/* ? */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7C/* | */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true;
    default:
      return false;
  }
}

// Hepler to unify [reference labels].
//
function normalizeReference(str) {
  // Trim and collapse whitespace
  //
  str = str.trim().replace(/\s+/g, ' ');

  // In node v10 'ẞ'.toLowerCase() === 'Ṿ', which is presumed to be a bug
  // fixed in v12 (couldn't find any details).
  //
  // So treat this one as a special case
  // (remove this when node v10 is no longer supported).
  //
  if ('ẞ'.toLowerCase() === 'Ṿ') {
    str = str.replace(/ẞ/g, 'ß');
  }

  // .toLowerCase().toUpperCase() should get rid of all differences
  // between letter variants.
  //
  // Simple .toLowerCase() doesn't normalize 125 code points correctly,
  // and .toUpperCase doesn't normalize 6 of them (list of exceptions:
  // İ, ϴ, ẞ, Ω, K, Å - those are already uppercased, but have differently
  // uppercased versions).
  //
  // Here's an example showing how it happens. Lets take greek letter omega:
  // uppercase U+0398 (Θ), U+03f4 (ϴ) and lowercase U+03b8 (θ), U+03d1 (ϑ)
  //
  // Unicode entries:
  // 0398;GREEK CAPITAL LETTER THETA;Lu;0;L;;;;;N;;;;03B8;
  // 03B8;GREEK SMALL LETTER THETA;Ll;0;L;;;;;N;;;0398;;0398
  // 03D1;GREEK THETA SYMBOL;Ll;0;L;<compat> 03B8;;;;N;GREEK SMALL LETTER SCRIPT THETA;;0398;;0398
  // 03F4;GREEK CAPITAL THETA SYMBOL;Lu;0;L;<compat> 0398;;;;N;;;;03B8;
  //
  // Case-insensitive comparison should treat all of them as equivalent.
  //
  // But .toLowerCase() doesn't change ϑ (it's already lowercase),
  // and .toUpperCase() doesn't change ϴ (already uppercase).
  //
  // Applying first lower then upper case normalizes any character:
  // '\u0398\u03f4\u03b8\u03d1'.toLowerCase().toUpperCase() === '\u0398\u0398\u0398\u0398'
  //
  // Note: this is equivalent to unicode case folding; unicode normalization
  // is a different step that is not required here.
  //
  // Final result should be uppercased, because it's later stored in an object
  // (this avoid a conflict with Object.prototype members,
  // most notably, `__proto__`)
  //
  return str.toLowerCase().toUpperCase();
}

////////////////////////////////////////////////////////////////////////////////

// Re-export libraries commonly used in both markdown-it and its plugins,
// so plugins won't have to depend on them explicitly, which reduces their
// bundled size (e.g. a browser build).
//
exports.lib                 = {};
exports.lib.mdurl = __webpack_require__(/*! mdurl */ "./node_modules/mdurl/index.js");
exports.lib.ucmicro = __webpack_require__(/*! uc.micro */ "./node_modules/uc.micro/index.js");

exports.assign              = assign;
exports.isString            = isString;
exports.has                 = has;
exports.unescapeMd          = unescapeMd;
exports.unescapeAll         = unescapeAll;
exports.isValidEntityCode   = isValidEntityCode;
exports.fromCodePoint       = fromCodePoint;
// exports.replaceEntities     = replaceEntities;
exports.escapeHtml          = escapeHtml;
exports.arrayReplaceAt      = arrayReplaceAt;
exports.isSpace             = isSpace;
exports.isWhiteSpace        = isWhiteSpace;
exports.isMdAsciiPunct      = isMdAsciiPunct;
exports.isPunctChar         = isPunctChar;
exports.escapeRE            = escapeRE;
exports.normalizeReference  = normalizeReference;


/***/ }),

/***/ "./node_modules/markdown-it/lib/helpers/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/markdown-it/lib/helpers/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Just a shortcut for bulk export



exports.parseLinkLabel = __webpack_require__(/*! ./parse_link_label */ "./node_modules/markdown-it/lib/helpers/parse_link_label.js");
exports.parseLinkDestination = __webpack_require__(/*! ./parse_link_destination */ "./node_modules/markdown-it/lib/helpers/parse_link_destination.js");
exports.parseLinkTitle = __webpack_require__(/*! ./parse_link_title */ "./node_modules/markdown-it/lib/helpers/parse_link_title.js");


/***/ }),

/***/ "./node_modules/markdown-it/lib/helpers/parse_link_destination.js":
/*!************************************************************************!*\
  !*** ./node_modules/markdown-it/lib/helpers/parse_link_destination.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Parse link destination
//



var unescapeAll = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").unescapeAll);


module.exports = function parseLinkDestination(str, pos, max) {
  var code, level,
      lines = 0,
      start = pos,
      result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ''
      };

  if (str.charCodeAt(pos) === 0x3C /* < */) {
    pos++;
    while (pos < max) {
      code = str.charCodeAt(pos);
      if (code === 0x0A /* \n */) { return result; }
      if (code === 0x3C /* < */) { return result; }
      if (code === 0x3E /* > */) {
        result.pos = pos + 1;
        result.str = unescapeAll(str.slice(start + 1, pos));
        result.ok = true;
        return result;
      }
      if (code === 0x5C /* \ */ && pos + 1 < max) {
        pos += 2;
        continue;
      }

      pos++;
    }

    // no closing '>'
    return result;
  }

  // this should be ... } else { ... branch

  level = 0;
  while (pos < max) {
    code = str.charCodeAt(pos);

    if (code === 0x20) { break; }

    // ascii control characters
    if (code < 0x20 || code === 0x7F) { break; }

    if (code === 0x5C /* \ */ && pos + 1 < max) {
      if (str.charCodeAt(pos + 1) === 0x20) { break; }
      pos += 2;
      continue;
    }

    if (code === 0x28 /* ( */) {
      level++;
      if (level > 32) { return result; }
    }

    if (code === 0x29 /* ) */) {
      if (level === 0) { break; }
      level--;
    }

    pos++;
  }

  if (start === pos) { return result; }
  if (level !== 0) { return result; }

  result.str = unescapeAll(str.slice(start, pos));
  result.lines = lines;
  result.pos = pos;
  result.ok = true;
  return result;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/helpers/parse_link_label.js":
/*!******************************************************************!*\
  !*** ./node_modules/markdown-it/lib/helpers/parse_link_label.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
// Parse link label
//
// this function assumes that first character ("[") already matches;
// returns the end of the label
//


module.exports = function parseLinkLabel(state, start, disableNested) {
  var level, found, marker, prevPos,
      labelEnd = -1,
      max = state.posMax,
      oldPos = state.pos;

  state.pos = start + 1;
  level = 1;

  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 0x5D /* ] */) {
      level--;
      if (level === 0) {
        found = true;
        break;
      }
    }

    prevPos = state.pos;
    state.md.inline.skipToken(state);
    if (marker === 0x5B /* [ */) {
      if (prevPos === state.pos - 1) {
        // increase level if we find text `[`, which is not a part of any token
        level++;
      } else if (disableNested) {
        state.pos = oldPos;
        return -1;
      }
    }
  }

  if (found) {
    labelEnd = state.pos;
  }

  // restore old state
  state.pos = oldPos;

  return labelEnd;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/helpers/parse_link_title.js":
/*!******************************************************************!*\
  !*** ./node_modules/markdown-it/lib/helpers/parse_link_title.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Parse link title
//



var unescapeAll = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").unescapeAll);


module.exports = function parseLinkTitle(str, pos, max) {
  var code,
      marker,
      lines = 0,
      start = pos,
      result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ''
      };

  if (pos >= max) { return result; }

  marker = str.charCodeAt(pos);

  if (marker !== 0x22 /* " */ && marker !== 0x27 /* ' */ && marker !== 0x28 /* ( */) { return result; }

  pos++;

  // if opening marker is "(", switch it to closing marker ")"
  if (marker === 0x28) { marker = 0x29; }

  while (pos < max) {
    code = str.charCodeAt(pos);
    if (code === marker) {
      result.pos = pos + 1;
      result.lines = lines;
      result.str = unescapeAll(str.slice(start + 1, pos));
      result.ok = true;
      return result;
    } else if (code === 0x28 /* ( */ && marker === 0x29 /* ) */) {
      return result;
    } else if (code === 0x0A) {
      lines++;
    } else if (code === 0x5C /* \ */ && pos + 1 < max) {
      pos++;
      if (str.charCodeAt(pos) === 0x0A) {
        lines++;
      }
    }

    pos++;
  }

  return result;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/index.js":
/*!***********************************************!*\
  !*** ./node_modules/markdown-it/lib/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Main parser class




var utils        = __webpack_require__(/*! ./common/utils */ "./node_modules/markdown-it/lib/common/utils.js");
var helpers      = __webpack_require__(/*! ./helpers */ "./node_modules/markdown-it/lib/helpers/index.js");
var Renderer     = __webpack_require__(/*! ./renderer */ "./node_modules/markdown-it/lib/renderer.js");
var ParserCore   = __webpack_require__(/*! ./parser_core */ "./node_modules/markdown-it/lib/parser_core.js");
var ParserBlock  = __webpack_require__(/*! ./parser_block */ "./node_modules/markdown-it/lib/parser_block.js");
var ParserInline = __webpack_require__(/*! ./parser_inline */ "./node_modules/markdown-it/lib/parser_inline.js");
var LinkifyIt    = __webpack_require__(/*! linkify-it */ "./node_modules/linkify-it/index.js");
var mdurl        = __webpack_require__(/*! mdurl */ "./node_modules/mdurl/index.js");
var punycode     = __webpack_require__(/*! punycode */ "./node_modules/punycode/punycode.es6.js");


var config = {
  default: __webpack_require__(/*! ./presets/default */ "./node_modules/markdown-it/lib/presets/default.js"),
  zero: __webpack_require__(/*! ./presets/zero */ "./node_modules/markdown-it/lib/presets/zero.js"),
  commonmark: __webpack_require__(/*! ./presets/commonmark */ "./node_modules/markdown-it/lib/presets/commonmark.js")
};

////////////////////////////////////////////////////////////////////////////////
//
// This validator can prohibit more than really needed to prevent XSS. It's a
// tradeoff to keep code simple and to be secure by default.
//
// If you need different setup - override validator method as you wish. Or
// replace it with dummy function and use external sanitizer.
//

var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

function validateLink(url) {
  // url should be normalized at this point, and existing entities are decoded
  var str = url.trim().toLowerCase();

  return BAD_PROTO_RE.test(str) ? (GOOD_DATA_RE.test(str) ? true : false) : true;
}

////////////////////////////////////////////////////////////////////////////////


var RECODE_HOSTNAME_FOR = [ 'http:', 'https:', 'mailto:' ];

function normalizeLink(url) {
  var parsed = mdurl.parse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toASCII(parsed.hostname);
      } catch (er) { /**/ }
    }
  }

  return mdurl.encode(mdurl.format(parsed));
}

function normalizeLinkText(url) {
  var parsed = mdurl.parse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toUnicode(parsed.hostname);
      } catch (er) { /**/ }
    }
  }

  // add '%' to exclude list because of https://github.com/markdown-it/markdown-it/issues/720
  return mdurl.decode(mdurl.format(parsed), mdurl.decode.defaultChars + '%');
}


/**
 * class MarkdownIt
 *
 * Main parser/renderer class.
 *
 * ##### Usage
 *
 * ```javascript
 * // node.js, "classic" way:
 * var MarkdownIt = require('markdown-it'),
 *     md = new MarkdownIt();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // node.js, the same, but with sugar:
 * var md = require('markdown-it')();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // browser without AMD, added to "window" on script load
 * // Note, there are no dash.
 * var md = window.markdownit();
 * var result = md.render('# markdown-it rulezz!');
 * ```
 *
 * Single line rendering, without paragraph wrap:
 *
 * ```javascript
 * var md = require('markdown-it')();
 * var result = md.renderInline('__markdown-it__ rulezz!');
 * ```
 **/

/**
 * new MarkdownIt([presetName, options])
 * - presetName (String): optional, `commonmark` / `zero`
 * - options (Object)
 *
 * Creates parser instanse with given config. Can be called without `new`.
 *
 * ##### presetName
 *
 * MarkdownIt provides named presets as a convenience to quickly
 * enable/disable active syntax rules and options for common use cases.
 *
 * - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.js) -
 *   configures parser to strict [CommonMark](http://commonmark.org/) mode.
 * - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.js) -
 *   similar to GFM, used when no preset name given. Enables all available rules,
 *   but still without html, typographer & autolinker.
 * - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.js) -
 *   all rules disabled. Useful to quickly setup your config via `.enable()`.
 *   For example, when you need only `bold` and `italic` markup and nothing else.
 *
 * ##### options:
 *
 * - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
 *   That's not safe! You may need external sanitizer to protect output from XSS.
 *   It's better to extend features via plugins, instead of enabling HTML.
 * - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
 *   (`<br />`). This is needed only for full CommonMark compatibility. In real
 *   world you will need HTML output.
 * - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
 * - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
 *   Can be useful for external highlighters.
 * - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
 * - __typographer__  - `false`. Set `true` to enable [some language-neutral
 *   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js) +
 *   quotes beautification (smartquotes).
 * - __quotes__ - `“”‘’`, String or Array. Double + single quotes replacement
 *   pairs, when typographer enabled and smartquotes on. For example, you can
 *   use `'«»„“'` for Russian, `'„“‚‘'` for German, and
 *   `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
 * - __highlight__ - `null`. Highlighter function for fenced code blocks.
 *   Highlighter `function (str, lang)` should return escaped HTML. It can also
 *   return empty string if the source was not changed and should be escaped
 *   externaly. If result starts with <pre... internal wrapper is skipped.
 *
 * ##### Example
 *
 * ```javascript
 * // commonmark mode
 * var md = require('markdown-it')('commonmark');
 *
 * // default mode
 * var md = require('markdown-it')();
 *
 * // enable everything
 * var md = require('markdown-it')({
 *   html: true,
 *   linkify: true,
 *   typographer: true
 * });
 * ```
 *
 * ##### Syntax highlighting
 *
 * ```js
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
 *       } catch (__) {}
 *     }
 *
 *     return ''; // use external default escaping
 *   }
 * });
 * ```
 *
 * Or with full wrapper override (if you need assign class to `<pre>`):
 *
 * ```javascript
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * // Actual default values
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return '<pre class="hljs"><code>' +
 *                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
 *                '</code></pre>';
 *       } catch (__) {}
 *     }
 *
 *     return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
 *   }
 * });
 * ```
 *
 **/
function MarkdownIt(presetName, options) {
  if (!(this instanceof MarkdownIt)) {
    return new MarkdownIt(presetName, options);
  }

  if (!options) {
    if (!utils.isString(presetName)) {
      options = presetName || {};
      presetName = 'default';
    }
  }

  /**
   * MarkdownIt#inline -> ParserInline
   *
   * Instance of [[ParserInline]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.inline = new ParserInline();

  /**
   * MarkdownIt#block -> ParserBlock
   *
   * Instance of [[ParserBlock]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.block = new ParserBlock();

  /**
   * MarkdownIt#core -> Core
   *
   * Instance of [[Core]] chain executor. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.core = new ParserCore();

  /**
   * MarkdownIt#renderer -> Renderer
   *
   * Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
   * rules for new token types, generated by plugins.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * function myToken(tokens, idx, options, env, self) {
   *   //...
   *   return result;
   * };
   *
   * md.renderer.rules['my_token'] = myToken
   * ```
   *
   * See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js).
   **/
  this.renderer = new Renderer();

  /**
   * MarkdownIt#linkify -> LinkifyIt
   *
   * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
   * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.js)
   * rule.
   **/
  this.linkify = new LinkifyIt();

  /**
   * MarkdownIt#validateLink(url) -> Boolean
   *
   * Link validation function. CommonMark allows too much in links. By default
   * we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
   * except some embedded image types.
   *
   * You can change this behaviour:
   *
   * ```javascript
   * var md = require('markdown-it')();
   * // enable everything
   * md.validateLink = function () { return true; }
   * ```
   **/
  this.validateLink = validateLink;

  /**
   * MarkdownIt#normalizeLink(url) -> String
   *
   * Function used to encode link url to a machine-readable format,
   * which includes url-encoding, punycode, etc.
   **/
  this.normalizeLink = normalizeLink;

  /**
   * MarkdownIt#normalizeLinkText(url) -> String
   *
   * Function used to decode link url to a human-readable format`
   **/
  this.normalizeLinkText = normalizeLinkText;


  // Expose utils & helpers for easy acces from plugins

  /**
   * MarkdownIt#utils -> utils
   *
   * Assorted utility functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.js).
   **/
  this.utils = utils;

  /**
   * MarkdownIt#helpers -> helpers
   *
   * Link components parser functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
   **/
  this.helpers = utils.assign({}, helpers);


  this.options = {};
  this.configure(presetName);

  if (options) { this.set(options); }
}


/** chainable
 * MarkdownIt.set(options)
 *
 * Set parser options (in the same format as in constructor). Probably, you
 * will never need it, but you can change options after constructor call.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .set({ html: true, breaks: true })
 *             .set({ typographer, true });
 * ```
 *
 * __Note:__ To achieve the best possible performance, don't modify a
 * `markdown-it` instance options on the fly. If you need multiple configurations
 * it's best to create multiple instances and initialize each with separate
 * config.
 **/
MarkdownIt.prototype.set = function (options) {
  utils.assign(this.options, options);
  return this;
};


/** chainable, internal
 * MarkdownIt.configure(presets)
 *
 * Batch load of all options and compenent settings. This is internal method,
 * and you probably will not need it. But if you will - see available presets
 * and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
 *
 * We strongly recommend to use presets instead of direct config loads. That
 * will give better compatibility with next versions.
 **/
MarkdownIt.prototype.configure = function (presets) {
  var self = this, presetName;

  if (utils.isString(presets)) {
    presetName = presets;
    presets = config[presetName];
    if (!presets) { throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name'); }
  }

  if (!presets) { throw new Error('Wrong `markdown-it` preset, can\'t be empty'); }

  if (presets.options) { self.set(presets.options); }

  if (presets.components) {
    Object.keys(presets.components).forEach(function (name) {
      if (presets.components[name].rules) {
        self[name].ruler.enableOnly(presets.components[name].rules);
      }
      if (presets.components[name].rules2) {
        self[name].ruler2.enableOnly(presets.components[name].rules2);
      }
    });
  }
  return this;
};


/** chainable
 * MarkdownIt.enable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to enable
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable list or rules. It will automatically find appropriate components,
 * containing rules with given names. If rule not found, and `ignoreInvalid`
 * not set - throws exception.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .enable(['sub', 'sup'])
 *             .disable('smartquotes');
 * ```
 **/
MarkdownIt.prototype.enable = function (list, ignoreInvalid) {
  var result = [];

  if (!Array.isArray(list)) { list = [ list ]; }

  [ 'core', 'block', 'inline' ].forEach(function (chain) {
    result = result.concat(this[chain].ruler.enable(list, true));
  }, this);

  result = result.concat(this.inline.ruler2.enable(list, true));

  var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to enable unknown rule(s): ' + missed);
  }

  return this;
};


/** chainable
 * MarkdownIt.disable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * The same as [[MarkdownIt.enable]], but turn specified rules off.
 **/
MarkdownIt.prototype.disable = function (list, ignoreInvalid) {
  var result = [];

  if (!Array.isArray(list)) { list = [ list ]; }

  [ 'core', 'block', 'inline' ].forEach(function (chain) {
    result = result.concat(this[chain].ruler.disable(list, true));
  }, this);

  result = result.concat(this.inline.ruler2.disable(list, true));

  var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to disable unknown rule(s): ' + missed);
  }
  return this;
};


/** chainable
 * MarkdownIt.use(plugin, params)
 *
 * Load specified plugin with given params into current parser instance.
 * It's just a sugar to call `plugin(md, params)` with curring.
 *
 * ##### Example
 *
 * ```javascript
 * var iterator = require('markdown-it-for-inline');
 * var md = require('markdown-it')()
 *             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
 *               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
 *             });
 * ```
 **/
MarkdownIt.prototype.use = function (plugin /*, params, ... */) {
  var args = [ this ].concat(Array.prototype.slice.call(arguments, 1));
  plugin.apply(plugin, args);
  return this;
};


/** internal
 * MarkdownIt.parse(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Parse input string and return list of block tokens (special token type
 * "inline" will contain list of inline tokens). You should not call this
 * method directly, until you write custom renderer (for example, to produce
 * AST).
 *
 * `env` is used to pass data between "distributed" rules and return additional
 * metadata like reference info, needed for the renderer. It also can be used to
 * inject data in specific cases. Usually, you will be ok to pass `{}`,
 * and then pass updated object to renderer.
 **/
MarkdownIt.prototype.parse = function (src, env) {
  if (typeof src !== 'string') {
    throw new Error('Input data should be a String');
  }

  var state = new this.core.State(src, this, env);

  this.core.process(state);

  return state.tokens;
};


/**
 * MarkdownIt.render(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Render markdown string into html. It does all magic for you :).
 *
 * `env` can be used to inject additional metadata (`{}` by default).
 * But you will not need it with high probability. See also comment
 * in [[MarkdownIt.parse]].
 **/
MarkdownIt.prototype.render = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parse(src, env), this.options, env);
};


/** internal
 * MarkdownIt.parseInline(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
 * block tokens list with the single `inline` element, containing parsed inline
 * tokens in `children` property. Also updates `env` object.
 **/
MarkdownIt.prototype.parseInline = function (src, env) {
  var state = new this.core.State(src, this, env);

  state.inlineMode = true;
  this.core.process(state);

  return state.tokens;
};


/**
 * MarkdownIt.renderInline(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Similar to [[MarkdownIt.render]] but for single paragraph content. Result
 * will NOT be wrapped into `<p>` tags.
 **/
MarkdownIt.prototype.renderInline = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parseInline(src, env), this.options, env);
};


module.exports = MarkdownIt;


/***/ }),

/***/ "./node_modules/markdown-it/lib/parser_block.js":
/*!******************************************************!*\
  !*** ./node_modules/markdown-it/lib/parser_block.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/** internal
 * class ParserBlock
 *
 * Block-level tokenizer.
 **/



var Ruler           = __webpack_require__(/*! ./ruler */ "./node_modules/markdown-it/lib/ruler.js");


var _rules = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  [ 'table',      __webpack_require__(/*! ./rules_block/table */ "./node_modules/markdown-it/lib/rules_block/table.js"),      [ 'paragraph', 'reference' ] ],
  [ 'code',       __webpack_require__(/*! ./rules_block/code */ "./node_modules/markdown-it/lib/rules_block/code.js") ],
  [ 'fence',      __webpack_require__(/*! ./rules_block/fence */ "./node_modules/markdown-it/lib/rules_block/fence.js"),      [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'blockquote', __webpack_require__(/*! ./rules_block/blockquote */ "./node_modules/markdown-it/lib/rules_block/blockquote.js"), [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'hr',         __webpack_require__(/*! ./rules_block/hr */ "./node_modules/markdown-it/lib/rules_block/hr.js"),         [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'list',       __webpack_require__(/*! ./rules_block/list */ "./node_modules/markdown-it/lib/rules_block/list.js"),       [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'reference',  __webpack_require__(/*! ./rules_block/reference */ "./node_modules/markdown-it/lib/rules_block/reference.js") ],
  [ 'html_block', __webpack_require__(/*! ./rules_block/html_block */ "./node_modules/markdown-it/lib/rules_block/html_block.js"), [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'heading',    __webpack_require__(/*! ./rules_block/heading */ "./node_modules/markdown-it/lib/rules_block/heading.js"),    [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'lheading',   __webpack_require__(/*! ./rules_block/lheading */ "./node_modules/markdown-it/lib/rules_block/lheading.js") ],
  [ 'paragraph',  __webpack_require__(/*! ./rules_block/paragraph */ "./node_modules/markdown-it/lib/rules_block/paragraph.js") ]
];


/**
 * new ParserBlock()
 **/
function ParserBlock() {
  /**
   * ParserBlock#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of block rules.
   **/
  this.ruler = new Ruler();

  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1], { alt: (_rules[i][2] || []).slice() });
  }
}


// Generate tokens for input range
//
ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
  var ok, i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      line = startLine,
      hasEmptyLines = false,
      maxNesting = state.md.options.maxNesting;

  while (line < endLine) {
    state.line = line = state.skipEmptyLines(line);
    if (line >= endLine) { break; }

    // Termination condition for nested calls.
    // Nested calls currently used for blockquotes & lists
    if (state.sCount[line] < state.blkIndent) { break; }

    // If nesting level exceeded - skip tail to the end. That's not ordinary
    // situation and we should not care about content.
    if (state.level >= maxNesting) {
      state.line = endLine;
      break;
    }

    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.line`
    // - update `state.tokens`
    // - return true

    for (i = 0; i < len; i++) {
      ok = rules[i](state, line, endLine, false);
      if (ok) { break; }
    }

    // set state.tight if we had an empty line before current tag
    // i.e. latest empty line should not count
    state.tight = !hasEmptyLines;

    // paragraph might "eat" one newline after it in nested lists
    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }

    line = state.line;

    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;
      state.line = line;
    }
  }
};


/**
 * ParserBlock.parse(str, md, env, outTokens)
 *
 * Process input string and push block tokens into `outTokens`
 **/
ParserBlock.prototype.parse = function (src, md, env, outTokens) {
  var state;

  if (!src) { return; }

  state = new this.State(src, md, env, outTokens);

  this.tokenize(state, state.line, state.lineMax);
};


ParserBlock.prototype.State = __webpack_require__(/*! ./rules_block/state_block */ "./node_modules/markdown-it/lib/rules_block/state_block.js");


module.exports = ParserBlock;


/***/ }),

/***/ "./node_modules/markdown-it/lib/parser_core.js":
/*!*****************************************************!*\
  !*** ./node_modules/markdown-it/lib/parser_core.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/** internal
 * class Core
 *
 * Top-level rules executor. Glues block/inline parsers and does intermediate
 * transformations.
 **/



var Ruler  = __webpack_require__(/*! ./ruler */ "./node_modules/markdown-it/lib/ruler.js");


var _rules = [
  [ 'normalize',      __webpack_require__(/*! ./rules_core/normalize */ "./node_modules/markdown-it/lib/rules_core/normalize.js")      ],
  [ 'block',          __webpack_require__(/*! ./rules_core/block */ "./node_modules/markdown-it/lib/rules_core/block.js")          ],
  [ 'inline',         __webpack_require__(/*! ./rules_core/inline */ "./node_modules/markdown-it/lib/rules_core/inline.js")         ],
  [ 'linkify',        __webpack_require__(/*! ./rules_core/linkify */ "./node_modules/markdown-it/lib/rules_core/linkify.js")        ],
  [ 'replacements',   __webpack_require__(/*! ./rules_core/replacements */ "./node_modules/markdown-it/lib/rules_core/replacements.js")   ],
  [ 'smartquotes',    __webpack_require__(/*! ./rules_core/smartquotes */ "./node_modules/markdown-it/lib/rules_core/smartquotes.js")    ]
];


/**
 * new Core()
 **/
function Core() {
  /**
   * Core#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of core rules.
   **/
  this.ruler = new Ruler();

  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }
}


/**
 * Core.process(state)
 *
 * Executes core chain rules.
 **/
Core.prototype.process = function (state) {
  var i, l, rules;

  rules = this.ruler.getRules('');

  for (i = 0, l = rules.length; i < l; i++) {
    rules[i](state);
  }
};

Core.prototype.State = __webpack_require__(/*! ./rules_core/state_core */ "./node_modules/markdown-it/lib/rules_core/state_core.js");


module.exports = Core;


/***/ }),

/***/ "./node_modules/markdown-it/lib/parser_inline.js":
/*!*******************************************************!*\
  !*** ./node_modules/markdown-it/lib/parser_inline.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/** internal
 * class ParserInline
 *
 * Tokenizes paragraph content.
 **/



var Ruler           = __webpack_require__(/*! ./ruler */ "./node_modules/markdown-it/lib/ruler.js");


////////////////////////////////////////////////////////////////////////////////
// Parser rules

var _rules = [
  [ 'text',            __webpack_require__(/*! ./rules_inline/text */ "./node_modules/markdown-it/lib/rules_inline/text.js") ],
  [ 'newline',         __webpack_require__(/*! ./rules_inline/newline */ "./node_modules/markdown-it/lib/rules_inline/newline.js") ],
  [ 'escape',          __webpack_require__(/*! ./rules_inline/escape */ "./node_modules/markdown-it/lib/rules_inline/escape.js") ],
  [ 'backticks',       __webpack_require__(/*! ./rules_inline/backticks */ "./node_modules/markdown-it/lib/rules_inline/backticks.js") ],
  [ 'strikethrough',   (__webpack_require__(/*! ./rules_inline/strikethrough */ "./node_modules/markdown-it/lib/rules_inline/strikethrough.js").tokenize) ],
  [ 'emphasis',        (__webpack_require__(/*! ./rules_inline/emphasis */ "./node_modules/markdown-it/lib/rules_inline/emphasis.js").tokenize) ],
  [ 'link',            __webpack_require__(/*! ./rules_inline/link */ "./node_modules/markdown-it/lib/rules_inline/link.js") ],
  [ 'image',           __webpack_require__(/*! ./rules_inline/image */ "./node_modules/markdown-it/lib/rules_inline/image.js") ],
  [ 'autolink',        __webpack_require__(/*! ./rules_inline/autolink */ "./node_modules/markdown-it/lib/rules_inline/autolink.js") ],
  [ 'html_inline',     __webpack_require__(/*! ./rules_inline/html_inline */ "./node_modules/markdown-it/lib/rules_inline/html_inline.js") ],
  [ 'entity',          __webpack_require__(/*! ./rules_inline/entity */ "./node_modules/markdown-it/lib/rules_inline/entity.js") ]
];

var _rules2 = [
  [ 'balance_pairs',   __webpack_require__(/*! ./rules_inline/balance_pairs */ "./node_modules/markdown-it/lib/rules_inline/balance_pairs.js") ],
  [ 'strikethrough',   (__webpack_require__(/*! ./rules_inline/strikethrough */ "./node_modules/markdown-it/lib/rules_inline/strikethrough.js").postProcess) ],
  [ 'emphasis',        (__webpack_require__(/*! ./rules_inline/emphasis */ "./node_modules/markdown-it/lib/rules_inline/emphasis.js").postProcess) ],
  [ 'text_collapse',   __webpack_require__(/*! ./rules_inline/text_collapse */ "./node_modules/markdown-it/lib/rules_inline/text_collapse.js") ]
];


/**
 * new ParserInline()
 **/
function ParserInline() {
  var i;

  /**
   * ParserInline#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of inline rules.
   **/
  this.ruler = new Ruler();

  for (i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }

  /**
   * ParserInline#ruler2 -> Ruler
   *
   * [[Ruler]] instance. Second ruler used for post-processing
   * (e.g. in emphasis-like rules).
   **/
  this.ruler2 = new Ruler();

  for (i = 0; i < _rules2.length; i++) {
    this.ruler2.push(_rules2[i][0], _rules2[i][1]);
  }
}


// Skip single token by running all rules in validation mode;
// returns `true` if any rule reported success
//
ParserInline.prototype.skipToken = function (state) {
  var ok, i, pos = state.pos,
      rules = this.ruler.getRules(''),
      len = rules.length,
      maxNesting = state.md.options.maxNesting,
      cache = state.cache;


  if (typeof cache[pos] !== 'undefined') {
    state.pos = cache[pos];
    return;
  }

  if (state.level < maxNesting) {
    for (i = 0; i < len; i++) {
      // Increment state.level and decrement it later to limit recursion.
      // It's harmless to do here, because no tokens are created. But ideally,
      // we'd need a separate private state variable for this purpose.
      //
      state.level++;
      ok = rules[i](state, true);
      state.level--;

      if (ok) { break; }
    }
  } else {
    // Too much nesting, just skip until the end of the paragraph.
    //
    // NOTE: this will cause links to behave incorrectly in the following case,
    //       when an amount of `[` is exactly equal to `maxNesting + 1`:
    //
    //       [[[[[[[[[[[[[[[[[[[[[foo]()
    //
    // TODO: remove this workaround when CM standard will allow nested links
    //       (we can replace it by preventing links from being parsed in
    //       validation mode)
    //
    state.pos = state.posMax;
  }

  if (!ok) { state.pos++; }
  cache[pos] = state.pos;
};


// Generate tokens for input range
//
ParserInline.prototype.tokenize = function (state) {
  var ok, i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      end = state.posMax,
      maxNesting = state.md.options.maxNesting;

  while (state.pos < end) {
    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.pos`
    // - update `state.tokens`
    // - return true

    if (state.level < maxNesting) {
      for (i = 0; i < len; i++) {
        ok = rules[i](state, false);
        if (ok) { break; }
      }
    }

    if (ok) {
      if (state.pos >= end) { break; }
      continue;
    }

    state.pending += state.src[state.pos++];
  }

  if (state.pending) {
    state.pushPending();
  }
};


/**
 * ParserInline.parse(str, md, env, outTokens)
 *
 * Process input string and push inline tokens into `outTokens`
 **/
ParserInline.prototype.parse = function (str, md, env, outTokens) {
  var i, rules, len;
  var state = new this.State(str, md, env, outTokens);

  this.tokenize(state);

  rules = this.ruler2.getRules('');
  len = rules.length;

  for (i = 0; i < len; i++) {
    rules[i](state);
  }
};


ParserInline.prototype.State = __webpack_require__(/*! ./rules_inline/state_inline */ "./node_modules/markdown-it/lib/rules_inline/state_inline.js");


module.exports = ParserInline;


/***/ }),

/***/ "./node_modules/markdown-it/lib/presets/commonmark.js":
/*!************************************************************!*\
  !*** ./node_modules/markdown-it/lib/presets/commonmark.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
// Commonmark default options




module.exports = {
  options: {
    html:         true,         // Enable HTML tags in source
    xhtmlOut:     true,         // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   20            // Internal protection, recursion limit
  },

  components: {

    core: {
      rules: [
        'normalize',
        'block',
        'inline'
      ]
    },

    block: {
      rules: [
        'blockquote',
        'code',
        'fence',
        'heading',
        'hr',
        'html_block',
        'lheading',
        'list',
        'reference',
        'paragraph'
      ]
    },

    inline: {
      rules: [
        'autolink',
        'backticks',
        'emphasis',
        'entity',
        'escape',
        'html_inline',
        'image',
        'link',
        'newline',
        'text'
      ],
      rules2: [
        'balance_pairs',
        'emphasis',
        'text_collapse'
      ]
    }
  }
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/presets/default.js":
/*!*********************************************************!*\
  !*** ./node_modules/markdown-it/lib/presets/default.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
// markdown-it default options




module.exports = {
  options: {
    html:         false,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   100            // Internal protection, recursion limit
  },

  components: {

    core: {},
    block: {},
    inline: {}
  }
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/presets/zero.js":
/*!******************************************************!*\
  !*** ./node_modules/markdown-it/lib/presets/zero.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
// "Zero" preset, with nothing enabled. Useful for manual configuring of simple
// modes. For example, to parse bold/italic only.




module.exports = {
  options: {
    html:         false,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   20            // Internal protection, recursion limit
  },

  components: {

    core: {
      rules: [
        'normalize',
        'block',
        'inline'
      ]
    },

    block: {
      rules: [
        'paragraph'
      ]
    },

    inline: {
      rules: [
        'text'
      ],
      rules2: [
        'balance_pairs',
        'text_collapse'
      ]
    }
  }
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/renderer.js":
/*!**************************************************!*\
  !*** ./node_modules/markdown-it/lib/renderer.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * class Renderer
 *
 * Generates HTML from parsed token stream. Each instance has independent
 * copy of rules. Those can be rewritten with ease. Also, you can add new
 * rules if you create plugin and adds new token types.
 **/



var assign          = (__webpack_require__(/*! ./common/utils */ "./node_modules/markdown-it/lib/common/utils.js").assign);
var unescapeAll     = (__webpack_require__(/*! ./common/utils */ "./node_modules/markdown-it/lib/common/utils.js").unescapeAll);
var escapeHtml      = (__webpack_require__(/*! ./common/utils */ "./node_modules/markdown-it/lib/common/utils.js").escapeHtml);


////////////////////////////////////////////////////////////////////////////////

var default_rules = {};


default_rules.code_inline = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];

  return  '<code' + slf.renderAttrs(token) + '>' +
          escapeHtml(tokens[idx].content) +
          '</code>';
};


default_rules.code_block = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];

  return  '<pre' + slf.renderAttrs(token) + '><code>' +
          escapeHtml(tokens[idx].content) +
          '</code></pre>\n';
};


default_rules.fence = function (tokens, idx, options, env, slf) {
  var token = tokens[idx],
      info = token.info ? unescapeAll(token.info).trim() : '',
      langName = '',
      langAttrs = '',
      highlighted, i, arr, tmpAttrs, tmpToken;

  if (info) {
    arr = info.split(/(\s+)/g);
    langName = arr[0];
    langAttrs = arr.slice(2).join('');
  }

  if (options.highlight) {
    highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
  } else {
    highlighted = escapeHtml(token.content);
  }

  if (highlighted.indexOf('<pre') === 0) {
    return highlighted + '\n';
  }

  // If language exists, inject class gently, without modifying original token.
  // May be, one day we will add .deepClone() for token and simplify this part, but
  // now we prefer to keep things local.
  if (info) {
    i        = token.attrIndex('class');
    tmpAttrs = token.attrs ? token.attrs.slice() : [];

    if (i < 0) {
      tmpAttrs.push([ 'class', options.langPrefix + langName ]);
    } else {
      tmpAttrs[i] = tmpAttrs[i].slice();
      tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
    }

    // Fake token just to render attributes
    tmpToken = {
      attrs: tmpAttrs
    };

    return  '<pre><code' + slf.renderAttrs(tmpToken) + '>'
          + highlighted
          + '</code></pre>\n';
  }


  return  '<pre><code' + slf.renderAttrs(token) + '>'
        + highlighted
        + '</code></pre>\n';
};


default_rules.image = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];

  // "alt" attr MUST be set, even if empty. Because it's mandatory and
  // should be placed on proper position for tests.
  //
  // Replace content with actual value

  token.attrs[token.attrIndex('alt')][1] =
    slf.renderInlineAsText(token.children, options, env);

  return slf.renderToken(tokens, idx, options);
};


default_rules.hardbreak = function (tokens, idx, options /*, env */) {
  return options.xhtmlOut ? '<br />\n' : '<br>\n';
};
default_rules.softbreak = function (tokens, idx, options /*, env */) {
  return options.breaks ? (options.xhtmlOut ? '<br />\n' : '<br>\n') : '\n';
};


default_rules.text = function (tokens, idx /*, options, env */) {
  return escapeHtml(tokens[idx].content);
};


default_rules.html_block = function (tokens, idx /*, options, env */) {
  return tokens[idx].content;
};
default_rules.html_inline = function (tokens, idx /*, options, env */) {
  return tokens[idx].content;
};


/**
 * new Renderer()
 *
 * Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
 **/
function Renderer() {

  /**
   * Renderer#rules -> Object
   *
   * Contains render rules for tokens. Can be updated and extended.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * md.renderer.rules.strong_open  = function () { return '<b>'; };
   * md.renderer.rules.strong_close = function () { return '</b>'; };
   *
   * var result = md.renderInline(...);
   * ```
   *
   * Each rule is called as independent static function with fixed signature:
   *
   * ```javascript
   * function my_token_render(tokens, idx, options, env, renderer) {
   *   // ...
   *   return renderedHTML;
   * }
   * ```
   *
   * See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js)
   * for more details and examples.
   **/
  this.rules = assign({}, default_rules);
}


/**
 * Renderer.renderAttrs(token) -> String
 *
 * Render token attributes to string.
 **/
Renderer.prototype.renderAttrs = function renderAttrs(token) {
  var i, l, result;

  if (!token.attrs) { return ''; }

  result = '';

  for (i = 0, l = token.attrs.length; i < l; i++) {
    result += ' ' + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
  }

  return result;
};


/**
 * Renderer.renderToken(tokens, idx, options) -> String
 * - tokens (Array): list of tokens
 * - idx (Numbed): token index to render
 * - options (Object): params of parser instance
 *
 * Default token renderer. Can be overriden by custom function
 * in [[Renderer#rules]].
 **/
Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
  var nextToken,
      result = '',
      needLf = false,
      token = tokens[idx];

  // Tight list paragraphs
  if (token.hidden) {
    return '';
  }

  // Insert a newline between hidden paragraph and subsequent opening
  // block-level tag.
  //
  // For example, here we should insert a newline before blockquote:
  //  - a
  //    >
  //
  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
    result += '\n';
  }

  // Add token name, e.g. `<img`
  result += (token.nesting === -1 ? '</' : '<') + token.tag;

  // Encode attributes, e.g. `<img src="foo"`
  result += this.renderAttrs(token);

  // Add a slash for self-closing tags, e.g. `<img src="foo" /`
  if (token.nesting === 0 && options.xhtmlOut) {
    result += ' /';
  }

  // Check if we need to add a newline after this tag
  if (token.block) {
    needLf = true;

    if (token.nesting === 1) {
      if (idx + 1 < tokens.length) {
        nextToken = tokens[idx + 1];

        if (nextToken.type === 'inline' || nextToken.hidden) {
          // Block-level tag containing an inline tag.
          //
          needLf = false;

        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
          // Opening tag + closing tag of the same type. E.g. `<li></li>`.
          //
          needLf = false;
        }
      }
    }
  }

  result += needLf ? '>\n' : '>';

  return result;
};


/**
 * Renderer.renderInline(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to render
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * The same as [[Renderer.render]], but for single token of `inline` type.
 **/
Renderer.prototype.renderInline = function (tokens, options, env) {
  var type,
      result = '',
      rules = this.rules;

  for (var i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (typeof rules[type] !== 'undefined') {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options);
    }
  }

  return result;
};


/** internal
 * Renderer.renderInlineAsText(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to render
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Special kludge for image `alt` attributes to conform CommonMark spec.
 * Don't try to use it! Spec requires to show `alt` content with stripped markup,
 * instead of simple escaping.
 **/
Renderer.prototype.renderInlineAsText = function (tokens, options, env) {
  var result = '';

  for (var i = 0, len = tokens.length; i < len; i++) {
    if (tokens[i].type === 'text') {
      result += tokens[i].content;
    } else if (tokens[i].type === 'image') {
      result += this.renderInlineAsText(tokens[i].children, options, env);
    } else if (tokens[i].type === 'softbreak') {
      result += '\n';
    }
  }

  return result;
};


/**
 * Renderer.render(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to render
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Takes token stream and generates HTML. Probably, you will never need to call
 * this method directly.
 **/
Renderer.prototype.render = function (tokens, options, env) {
  var i, len, type,
      result = '',
      rules = this.rules;

  for (i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (type === 'inline') {
      result += this.renderInline(tokens[i].children, options, env);
    } else if (typeof rules[type] !== 'undefined') {
      result += rules[tokens[i].type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options, env);
    }
  }

  return result;
};

module.exports = Renderer;


/***/ }),

/***/ "./node_modules/markdown-it/lib/ruler.js":
/*!***********************************************!*\
  !*** ./node_modules/markdown-it/lib/ruler.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
/**
 * class Ruler
 *
 * Helper class, used by [[MarkdownIt#core]], [[MarkdownIt#block]] and
 * [[MarkdownIt#inline]] to manage sequences of functions (rules):
 *
 * - keep rules in defined order
 * - assign the name to each rule
 * - enable/disable rules
 * - add/replace rules
 * - allow assign rules to additional named chains (in the same)
 * - cacheing lists of active rules
 *
 * You will not need use this class directly until write plugins. For simple
 * rules control use [[MarkdownIt.disable]], [[MarkdownIt.enable]] and
 * [[MarkdownIt.use]].
 **/



/**
 * new Ruler()
 **/
function Ruler() {
  // List of added rules. Each element is:
  //
  // {
  //   name: XXX,
  //   enabled: Boolean,
  //   fn: Function(),
  //   alt: [ name2, name3 ]
  // }
  //
  this.__rules__ = [];

  // Cached rule chains.
  //
  // First level - chain name, '' for default.
  // Second level - diginal anchor for fast filtering by charcodes.
  //
  this.__cache__ = null;
}

////////////////////////////////////////////////////////////////////////////////
// Helper methods, should not be used directly


// Find rule index by name
//
Ruler.prototype.__find__ = function (name) {
  for (var i = 0; i < this.__rules__.length; i++) {
    if (this.__rules__[i].name === name) {
      return i;
    }
  }
  return -1;
};


// Build rules lookup cache
//
Ruler.prototype.__compile__ = function () {
  var self = this;
  var chains = [ '' ];

  // collect unique names
  self.__rules__.forEach(function (rule) {
    if (!rule.enabled) { return; }

    rule.alt.forEach(function (altName) {
      if (chains.indexOf(altName) < 0) {
        chains.push(altName);
      }
    });
  });

  self.__cache__ = {};

  chains.forEach(function (chain) {
    self.__cache__[chain] = [];
    self.__rules__.forEach(function (rule) {
      if (!rule.enabled) { return; }

      if (chain && rule.alt.indexOf(chain) < 0) { return; }

      self.__cache__[chain].push(rule.fn);
    });
  });
};


/**
 * Ruler.at(name, fn [, options])
 * - name (String): rule name to replace.
 * - fn (Function): new rule function.
 * - options (Object): new rule options (not mandatory).
 *
 * Replace rule by name with new function & options. Throws error if name not
 * found.
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * Replace existing typographer replacement rule with new one:
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.at('replacements', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.at = function (name, fn, options) {
  var index = this.__find__(name);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + name); }

  this.__rules__[index].fn = fn;
  this.__rules__[index].alt = opt.alt || [];
  this.__cache__ = null;
};


/**
 * Ruler.before(beforeName, ruleName, fn [, options])
 * - beforeName (String): new rule will be added before this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain before one with given name. See also
 * [[Ruler.after]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.before = function (beforeName, ruleName, fn, options) {
  var index = this.__find__(beforeName);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + beforeName); }

  this.__rules__.splice(index, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};


/**
 * Ruler.after(afterName, ruleName, fn [, options])
 * - afterName (String): new rule will be added after this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain after one with given name. See also
 * [[Ruler.before]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.inline.ruler.after('text', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.after = function (afterName, ruleName, fn, options) {
  var index = this.__find__(afterName);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + afterName); }

  this.__rules__.splice(index + 1, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};

/**
 * Ruler.push(ruleName, fn [, options])
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Push new rule to the end of chain. See also
 * [[Ruler.before]], [[Ruler.after]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.push('my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.push = function (ruleName, fn, options) {
  var opt = options || {};

  this.__rules__.push({
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};


/**
 * Ruler.enable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to enable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.disable]], [[Ruler.enableOnly]].
 **/
Ruler.prototype.enable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  var result = [];

  // Search by name and enable
  list.forEach(function (name) {
    var idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return; }
      throw new Error('Rules manager: invalid rule name ' + name);
    }
    this.__rules__[idx].enabled = true;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result;
};


/**
 * Ruler.enableOnly(list [, ignoreInvalid])
 * - list (String|Array): list of rule names to enable (whitelist).
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names, and disable everything else. If any rule name
 * not found - throw Error. Errors can be disabled by second param.
 *
 * See also [[Ruler.disable]], [[Ruler.enable]].
 **/
Ruler.prototype.enableOnly = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  this.__rules__.forEach(function (rule) { rule.enabled = false; });

  this.enable(list, ignoreInvalid);
};


/**
 * Ruler.disable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Disable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.enable]], [[Ruler.enableOnly]].
 **/
Ruler.prototype.disable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  var result = [];

  // Search by name and disable
  list.forEach(function (name) {
    var idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return; }
      throw new Error('Rules manager: invalid rule name ' + name);
    }
    this.__rules__[idx].enabled = false;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result;
};


/**
 * Ruler.getRules(chainName) -> Array
 *
 * Return array of active functions (rules) for given chain name. It analyzes
 * rules configuration, compiles caches if not exists and returns result.
 *
 * Default chain name is `''` (empty string). It can't be skipped. That's
 * done intentionally, to keep signature monomorphic for high speed.
 **/
Ruler.prototype.getRules = function (chainName) {
  if (this.__cache__ === null) {
    this.__compile__();
  }

  // Chain can be empty, if rules disabled. But we still have to return Array.
  return this.__cache__[chainName] || [];
};

module.exports = Ruler;


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_block/blockquote.js":
/*!****************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_block/blockquote.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Block quotes



var isSpace = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isSpace);


module.exports = function blockquote(state, startLine, endLine, silent) {
  var adjustTab,
      ch,
      i,
      initial,
      l,
      lastLineEmpty,
      lines,
      nextLine,
      offset,
      oldBMarks,
      oldBSCount,
      oldIndent,
      oldParentType,
      oldSCount,
      oldTShift,
      spaceAfterMarker,
      terminate,
      terminatorRules,
      token,
      isOutdented,
      oldLineMax = state.lineMax,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  // check the block quote marker
  if (state.src.charCodeAt(pos++) !== 0x3E/* > */) { return false; }

  // we know that it's going to be a valid blockquote,
  // so no point trying to find the end of it in silent mode
  if (silent) { return true; }

  // set offset past spaces and ">"
  initial = offset = state.sCount[startLine] + 1;

  // skip one optional space after '>'
  if (state.src.charCodeAt(pos) === 0x20 /* space */) {
    // ' >   test '
    //     ^ -- position start of line here:
    pos++;
    initial++;
    offset++;
    adjustTab = false;
    spaceAfterMarker = true;
  } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
    spaceAfterMarker = true;

    if ((state.bsCount[startLine] + offset) % 4 === 3) {
      // '  >\t  test '
      //       ^ -- position start of line here (tab has width===1)
      pos++;
      initial++;
      offset++;
      adjustTab = false;
    } else {
      // ' >\t  test '
      //    ^ -- position start of line here + shift bsCount slightly
      //         to make extra space appear
      adjustTab = true;
    }
  } else {
    spaceAfterMarker = false;
  }

  oldBMarks = [ state.bMarks[startLine] ];
  state.bMarks[startLine] = pos;

  while (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (isSpace(ch)) {
      if (ch === 0x09) {
        offset += 4 - (offset + state.bsCount[startLine] + (adjustTab ? 1 : 0)) % 4;
      } else {
        offset++;
      }
    } else {
      break;
    }

    pos++;
  }

  oldBSCount = [ state.bsCount[startLine] ];
  state.bsCount[startLine] = state.sCount[startLine] + 1 + (spaceAfterMarker ? 1 : 0);

  lastLineEmpty = pos >= max;

  oldSCount = [ state.sCount[startLine] ];
  state.sCount[startLine] = offset - initial;

  oldTShift = [ state.tShift[startLine] ];
  state.tShift[startLine] = pos - state.bMarks[startLine];

  terminatorRules = state.md.block.ruler.getRules('blockquote');

  oldParentType = state.parentType;
  state.parentType = 'blockquote';

  // Search the end of the block
  //
  // Block ends with either:
  //  1. an empty line outside:
  //     ```
  //     > test
  //
  //     ```
  //  2. an empty line inside:
  //     ```
  //     >
  //     test
  //     ```
  //  3. another tag:
  //     ```
  //     > test
  //      - - -
  //     ```
  for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
    // check if it's outdented, i.e. it's inside list item and indented
    // less than said list item:
    //
    // ```
    // 1. anything
    //    > current blockquote
    // 2. checking this line
    // ```
    isOutdented = state.sCount[nextLine] < state.blkIndent;

    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos >= max) {
      // Case 1: line is not inside the blockquote, and this line is empty.
      break;
    }

    if (state.src.charCodeAt(pos++) === 0x3E/* > */ && !isOutdented) {
      // This line is inside the blockquote.

      // set offset past spaces and ">"
      initial = offset = state.sCount[nextLine] + 1;

      // skip one optional space after '>'
      if (state.src.charCodeAt(pos) === 0x20 /* space */) {
        // ' >   test '
        //     ^ -- position start of line here:
        pos++;
        initial++;
        offset++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
        spaceAfterMarker = true;

        if ((state.bsCount[nextLine] + offset) % 4 === 3) {
          // '  >\t  test '
          //       ^ -- position start of line here (tab has width===1)
          pos++;
          initial++;
          offset++;
          adjustTab = false;
        } else {
          // ' >\t  test '
          //    ^ -- position start of line here + shift bsCount slightly
          //         to make extra space appear
          adjustTab = true;
        }
      } else {
        spaceAfterMarker = false;
      }

      oldBMarks.push(state.bMarks[nextLine]);
      state.bMarks[nextLine] = pos;

      while (pos < max) {
        ch = state.src.charCodeAt(pos);

        if (isSpace(ch)) {
          if (ch === 0x09) {
            offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
          } else {
            offset++;
          }
        } else {
          break;
        }

        pos++;
      }

      lastLineEmpty = pos >= max;

      oldBSCount.push(state.bsCount[nextLine]);
      state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);

      oldSCount.push(state.sCount[nextLine]);
      state.sCount[nextLine] = offset - initial;

      oldTShift.push(state.tShift[nextLine]);
      state.tShift[nextLine] = pos - state.bMarks[nextLine];
      continue;
    }

    // Case 2: line is not inside the blockquote, and the last line was empty.
    if (lastLineEmpty) { break; }

    // Case 3: another tag found.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }

    if (terminate) {
      // Quirk to enforce "hard termination mode" for paragraphs;
      // normally if you call `tokenize(state, startLine, nextLine)`,
      // paragraphs will look below nextLine for paragraph continuation,
      // but if blockquote is terminated by another tag, they shouldn't
      state.lineMax = nextLine;

      if (state.blkIndent !== 0) {
        // state.blkIndent was non-zero, we now set it to zero,
        // so we need to re-calculate all offsets to appear as
        // if indent wasn't changed
        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] -= state.blkIndent;
      }

      break;
    }

    oldBMarks.push(state.bMarks[nextLine]);
    oldBSCount.push(state.bsCount[nextLine]);
    oldTShift.push(state.tShift[nextLine]);
    oldSCount.push(state.sCount[nextLine]);

    // A negative indentation means that this is a paragraph continuation
    //
    state.sCount[nextLine] = -1;
  }

  oldIndent = state.blkIndent;
  state.blkIndent = 0;

  token        = state.push('blockquote_open', 'blockquote', 1);
  token.markup = '>';
  token.map    = lines = [ startLine, 0 ];

  state.md.block.tokenize(state, startLine, nextLine);

  token        = state.push('blockquote_close', 'blockquote', -1);
  token.markup = '>';

  state.lineMax = oldLineMax;
  state.parentType = oldParentType;
  lines[1] = state.line;

  // Restore original tShift; this might not be necessary since the parser
  // has already been here, but just to make sure we can do that.
  for (i = 0; i < oldTShift.length; i++) {
    state.bMarks[i + startLine] = oldBMarks[i];
    state.tShift[i + startLine] = oldTShift[i];
    state.sCount[i + startLine] = oldSCount[i];
    state.bsCount[i + startLine] = oldBSCount[i];
  }
  state.blkIndent = oldIndent;

  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_block/code.js":
/*!**********************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_block/code.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
// Code block (4 spaces padded)




module.exports = function code(state, startLine, endLine/*, silent*/) {
  var nextLine, last, token;

  if (state.sCount[startLine] - state.blkIndent < 4) { return false; }

  last = nextLine = startLine + 1;

  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
      continue;
    }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      nextLine++;
      last = nextLine;
      continue;
    }
    break;
  }

  state.line = last;

  token         = state.push('code_block', 'code', 0);
  token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + '\n';
  token.map     = [ startLine, state.line ];

  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_block/fence.js":
/*!***********************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_block/fence.js ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
// fences (``` lang, ~~~ lang)




module.exports = function fence(state, startLine, endLine, silent) {
  var marker, len, params, nextLine, mem, token, markup,
      haveEndMarker = false,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  if (pos + 3 > max) { return false; }

  marker = state.src.charCodeAt(pos);

  if (marker !== 0x7E/* ~ */ && marker !== 0x60 /* ` */) {
    return false;
  }

  // scan marker length
  mem = pos;
  pos = state.skipChars(pos, marker);

  len = pos - mem;

  if (len < 3) { return false; }

  markup = state.src.slice(mem, pos);
  params = state.src.slice(pos, max);

  if (marker === 0x60 /* ` */) {
    if (params.indexOf(String.fromCharCode(marker)) >= 0) {
      return false;
    }
  }

  // Since start is found, we can report success here in validation mode
  if (silent) { return true; }

  // search end of block
  nextLine = startLine;

  for (;;) {
    nextLine++;
    if (nextLine >= endLine) {
      // unclosed block should be autoclosed by end of document.
      // also block seems to be autoclosed by end of parent
      break;
    }

    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
      // non-empty line with negative indent should stop the list:
      // - ```
      //  test
      break;
    }

    if (state.src.charCodeAt(pos) !== marker) { continue; }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      // closing fence should be indented less than 4 spaces
      continue;
    }

    pos = state.skipChars(pos, marker);

    // closing code fence must be at least as long as the opening one
    if (pos - mem < len) { continue; }

    // make sure tail has spaces only
    pos = state.skipSpaces(pos);

    if (pos < max) { continue; }

    haveEndMarker = true;
    // found!
    break;
  }

  // If a fence has heading spaces, they should be removed from its inner block
  len = state.sCount[startLine];

  state.line = nextLine + (haveEndMarker ? 1 : 0);

  token         = state.push('fence', 'code', 0);
  token.info    = params;
  token.content = state.getLines(startLine + 1, nextLine, len, true);
  token.markup  = markup;
  token.map     = [ startLine, state.line ];

  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_block/heading.js":
/*!*************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_block/heading.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// heading (#, ##, ...)



var isSpace = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isSpace);


module.exports = function heading(state, startLine, endLine, silent) {
  var ch, level, tmp, token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  ch  = state.src.charCodeAt(pos);

  if (ch !== 0x23/* # */ || pos >= max) { return false; }

  // count heading level
  level = 1;
  ch = state.src.charCodeAt(++pos);
  while (ch === 0x23/* # */ && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }

  if (level > 6 || (pos < max && !isSpace(ch))) { return false; }

  if (silent) { return true; }

  // Let's cut tails like '    ###  ' from the end of string

  max = state.skipSpacesBack(max, pos);
  tmp = state.skipCharsBack(max, 0x23, pos); // #
  if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
    max = tmp;
  }

  state.line = startLine + 1;

  token        = state.push('heading_open', 'h' + String(level), 1);
  token.markup = '########'.slice(0, level);
  token.map    = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = state.src.slice(pos, max).trim();
  token.map      = [ startLine, state.line ];
  token.children = [];

  token        = state.push('heading_close', 'h' + String(level), -1);
  token.markup = '########'.slice(0, level);

  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_block/hr.js":
/*!********************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_block/hr.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Horizontal rule



var isSpace = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isSpace);


module.exports = function hr(state, startLine, endLine, silent) {
  var marker, cnt, ch, token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  marker = state.src.charCodeAt(pos++);

  // Check hr marker
  if (marker !== 0x2A/* * */ &&
      marker !== 0x2D/* - */ &&
      marker !== 0x5F/* _ */) {
    return false;
  }

  // markers can be mixed with spaces, but there should be at least 3 of them

  cnt = 1;
  while (pos < max) {
    ch = state.src.charCodeAt(pos++);
    if (ch !== marker && !isSpace(ch)) { return false; }
    if (ch === marker) { cnt++; }
  }

  if (cnt < 3) { return false; }

  if (silent) { return true; }

  state.line = startLine + 1;

  token        = state.push('hr', 'hr', 0);
  token.map    = [ startLine, state.line ];
  token.markup = Array(cnt + 1).join(String.fromCharCode(marker));

  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_block/html_block.js":
/*!****************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_block/html_block.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// HTML block




var block_names = __webpack_require__(/*! ../common/html_blocks */ "./node_modules/markdown-it/lib/common/html_blocks.js");
var HTML_OPEN_CLOSE_TAG_RE = (__webpack_require__(/*! ../common/html_re */ "./node_modules/markdown-it/lib/common/html_re.js").HTML_OPEN_CLOSE_TAG_RE);

// An array of opening and corresponding closing sequences for html tags,
// last argument defines whether it can terminate a paragraph or not
//
var HTML_SEQUENCES = [
  [ /^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true ],
  [ /^<!--/,        /-->/,   true ],
  [ /^<\?/,         /\?>/,   true ],
  [ /^<![A-Z]/,     />/,     true ],
  [ /^<!\[CDATA\[/, /\]\]>/, true ],
  [ new RegExp('^</?(' + block_names.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true ],
  [ new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + '\\s*$'),  /^$/, false ]
];


module.exports = function html_block(state, startLine, endLine, silent) {
  var i, nextLine, token, lineText,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  if (!state.md.options.html) { return false; }

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

  lineText = state.src.slice(pos, max);

  for (i = 0; i < HTML_SEQUENCES.length; i++) {
    if (HTML_SEQUENCES[i][0].test(lineText)) { break; }
  }

  if (i === HTML_SEQUENCES.length) { return false; }

  if (silent) {
    // true if this sequence can be a terminator, false otherwise
    return HTML_SEQUENCES[i][2];
  }

  nextLine = startLine + 1;

  // If we are here - we detected HTML block.
  // Let's roll down till block end.
  if (!HTML_SEQUENCES[i][1].test(lineText)) {
    for (; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) { break; }

      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      lineText = state.src.slice(pos, max);

      if (HTML_SEQUENCES[i][1].test(lineText)) {
        if (lineText.length !== 0) { nextLine++; }
        break;
      }
    }
  }

  state.line = nextLine;

  token         = state.push('html_block', '', 0);
  token.map     = [ startLine, nextLine ];
  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);

  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_block/lheading.js":
/*!**************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_block/lheading.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
// lheading (---, ===)




module.exports = function lheading(state, startLine, endLine/*, silent*/) {
  var content, terminate, i, l, token, pos, max, level, marker,
      nextLine = startLine + 1, oldParentType,
      terminatorRules = state.md.block.ruler.getRules('paragraph');

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  oldParentType = state.parentType;
  state.parentType = 'paragraph'; // use paragraph to match terminatorRules

  // jump line-by-line until empty one or EOF
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

    //
    // Check for underline in setext header
    //
    if (state.sCount[nextLine] >= state.blkIndent) {
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (pos < max) {
        marker = state.src.charCodeAt(pos);

        if (marker === 0x2D/* - */ || marker === 0x3D/* = */) {
          pos = state.skipChars(pos, marker);
          pos = state.skipSpaces(pos);

          if (pos >= max) {
            level = (marker === 0x3D/* = */ ? 1 : 2);
            break;
          }
        }
      }
    }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue; }

    // Some tags can terminate paragraph without empty line.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }
  }

  if (!level) {
    // Didn't find valid underline
    return false;
  }

  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

  state.line = nextLine + 1;

  token          = state.push('heading_open', 'h' + String(level), 1);
  token.markup   = String.fromCharCode(marker);
  token.map      = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = content;
  token.map      = [ startLine, state.line - 1 ];
  token.children = [];

  token          = state.push('heading_close', 'h' + String(level), -1);
  token.markup   = String.fromCharCode(marker);

  state.parentType = oldParentType;

  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_block/list.js":
/*!**********************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_block/list.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Lists



var isSpace = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isSpace);


// Search `[-+*][\n ]`, returns next pos after marker on success
// or -1 on fail.
function skipBulletListMarker(state, startLine) {
  var marker, pos, max, ch;

  pos = state.bMarks[startLine] + state.tShift[startLine];
  max = state.eMarks[startLine];

  marker = state.src.charCodeAt(pos++);
  // Check bullet
  if (marker !== 0x2A/* * */ &&
      marker !== 0x2D/* - */ &&
      marker !== 0x2B/* + */) {
    return -1;
  }

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (!isSpace(ch)) {
      // " -test " - is not a list item
      return -1;
    }
  }

  return pos;
}

// Search `\d+[.)][\n ]`, returns next pos after marker on success
// or -1 on fail.
function skipOrderedListMarker(state, startLine) {
  var ch,
      start = state.bMarks[startLine] + state.tShift[startLine],
      pos = start,
      max = state.eMarks[startLine];

  // List marker should have at least 2 chars (digit + dot)
  if (pos + 1 >= max) { return -1; }

  ch = state.src.charCodeAt(pos++);

  if (ch < 0x30/* 0 */ || ch > 0x39/* 9 */) { return -1; }

  for (;;) {
    // EOL -> fail
    if (pos >= max) { return -1; }

    ch = state.src.charCodeAt(pos++);

    if (ch >= 0x30/* 0 */ && ch <= 0x39/* 9 */) {

      // List marker should have no more than 9 digits
      // (prevents integer overflow in browsers)
      if (pos - start >= 10) { return -1; }

      continue;
    }

    // found valid marker
    if (ch === 0x29/* ) */ || ch === 0x2e/* . */) {
      break;
    }

    return -1;
  }


  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (!isSpace(ch)) {
      // " 1.test " - is not a list item
      return -1;
    }
  }
  return pos;
}

function markTightParagraphs(state, idx) {
  var i, l,
      level = state.level + 2;

  for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
      state.tokens[i + 2].hidden = true;
      state.tokens[i].hidden = true;
      i += 2;
    }
  }
}


module.exports = function list(state, startLine, endLine, silent) {
  var ch,
      contentStart,
      i,
      indent,
      indentAfterMarker,
      initial,
      isOrdered,
      itemLines,
      l,
      listLines,
      listTokIdx,
      markerCharCode,
      markerValue,
      max,
      nextLine,
      offset,
      oldListIndent,
      oldParentType,
      oldSCount,
      oldTShift,
      oldTight,
      pos,
      posAfterMarker,
      prevEmptyEnd,
      start,
      terminate,
      terminatorRules,
      token,
      isTerminatingParagraph = false,
      tight = true;

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  // Special case:
  //  - item 1
  //   - item 2
  //    - item 3
  //     - item 4
  //      - this one is a paragraph continuation
  if (state.listIndent >= 0 &&
      state.sCount[startLine] - state.listIndent >= 4 &&
      state.sCount[startLine] < state.blkIndent) {
    return false;
  }

  // limit conditions when list can interrupt
  // a paragraph (validation mode only)
  if (silent && state.parentType === 'paragraph') {
    // Next list item should still terminate previous list item;
    //
    // This code can fail if plugins use blkIndent as well as lists,
    // but I hope the spec gets fixed long before that happens.
    //
    if (state.sCount[startLine] >= state.blkIndent) {
      isTerminatingParagraph = true;
    }
  }

  // Detect list type and position after marker
  if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
    isOrdered = true;
    start = state.bMarks[startLine] + state.tShift[startLine];
    markerValue = Number(state.src.slice(start, posAfterMarker - 1));

    // If we're starting a new ordered list right after
    // a paragraph, it should start with 1.
    if (isTerminatingParagraph && markerValue !== 1) return false;

  } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
    isOrdered = false;

  } else {
    return false;
  }

  // If we're starting a new unordered list right after
  // a paragraph, first line should not be empty.
  if (isTerminatingParagraph) {
    if (state.skipSpaces(posAfterMarker) >= state.eMarks[startLine]) return false;
  }

  // We should terminate list on style change. Remember first one to compare.
  markerCharCode = state.src.charCodeAt(posAfterMarker - 1);

  // For validation mode we can terminate immediately
  if (silent) { return true; }

  // Start list
  listTokIdx = state.tokens.length;

  if (isOrdered) {
    token       = state.push('ordered_list_open', 'ol', 1);
    if (markerValue !== 1) {
      token.attrs = [ [ 'start', markerValue ] ];
    }

  } else {
    token       = state.push('bullet_list_open', 'ul', 1);
  }

  token.map    = listLines = [ startLine, 0 ];
  token.markup = String.fromCharCode(markerCharCode);

  //
  // Iterate list items
  //

  nextLine = startLine;
  prevEmptyEnd = false;
  terminatorRules = state.md.block.ruler.getRules('list');

  oldParentType = state.parentType;
  state.parentType = 'list';

  while (nextLine < endLine) {
    pos = posAfterMarker;
    max = state.eMarks[nextLine];

    initial = offset = state.sCount[nextLine] + posAfterMarker - (state.bMarks[startLine] + state.tShift[startLine]);

    while (pos < max) {
      ch = state.src.charCodeAt(pos);

      if (ch === 0x09) {
        offset += 4 - (offset + state.bsCount[nextLine]) % 4;
      } else if (ch === 0x20) {
        offset++;
      } else {
        break;
      }

      pos++;
    }

    contentStart = pos;

    if (contentStart >= max) {
      // trimming space in "-    \n  3" case, indent is 1 here
      indentAfterMarker = 1;
    } else {
      indentAfterMarker = offset - initial;
    }

    // If we have more than 4 spaces, the indent is 1
    // (the rest is just indented code block)
    if (indentAfterMarker > 4) { indentAfterMarker = 1; }

    // "  -  test"
    //  ^^^^^ - calculating total length of this thing
    indent = initial + indentAfterMarker;

    // Run subparser & write tokens
    token        = state.push('list_item_open', 'li', 1);
    token.markup = String.fromCharCode(markerCharCode);
    token.map    = itemLines = [ startLine, 0 ];
    if (isOrdered) {
      token.info = state.src.slice(start, posAfterMarker - 1);
    }

    // change current state, then restore it after parser subcall
    oldTight = state.tight;
    oldTShift = state.tShift[startLine];
    oldSCount = state.sCount[startLine];

    //  - example list
    // ^ listIndent position will be here
    //   ^ blkIndent position will be here
    //
    oldListIndent = state.listIndent;
    state.listIndent = state.blkIndent;
    state.blkIndent = indent;

    state.tight = true;
    state.tShift[startLine] = contentStart - state.bMarks[startLine];
    state.sCount[startLine] = offset;

    if (contentStart >= max && state.isEmpty(startLine + 1)) {
      // workaround for this case
      // (list item is empty, list terminates before "foo"):
      // ~~~~~~~~
      //   -
      //
      //     foo
      // ~~~~~~~~
      state.line = Math.min(state.line + 2, endLine);
    } else {
      state.md.block.tokenize(state, startLine, endLine, true);
    }

    // If any of list item is tight, mark list as tight
    if (!state.tight || prevEmptyEnd) {
      tight = false;
    }
    // Item become loose if finish with empty line,
    // but we should filter last element, because it means list finish
    prevEmptyEnd = (state.line - startLine) > 1 && state.isEmpty(state.line - 1);

    state.blkIndent = state.listIndent;
    state.listIndent = oldListIndent;
    state.tShift[startLine] = oldTShift;
    state.sCount[startLine] = oldSCount;
    state.tight = oldTight;

    token        = state.push('list_item_close', 'li', -1);
    token.markup = String.fromCharCode(markerCharCode);

    nextLine = startLine = state.line;
    itemLines[1] = nextLine;
    contentStart = state.bMarks[startLine];

    if (nextLine >= endLine) { break; }

    //
    // Try to check if list is terminated or continued.
    //
    if (state.sCount[nextLine] < state.blkIndent) { break; }

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { break; }

    // fail if terminating block found
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }

    // fail if list has another type
    if (isOrdered) {
      posAfterMarker = skipOrderedListMarker(state, nextLine);
      if (posAfterMarker < 0) { break; }
      start = state.bMarks[nextLine] + state.tShift[nextLine];
    } else {
      posAfterMarker = skipBulletListMarker(state, nextLine);
      if (posAfterMarker < 0) { break; }
    }

    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) { break; }
  }

  // Finalize list
  if (isOrdered) {
    token = state.push('ordered_list_close', 'ol', -1);
  } else {
    token = state.push('bullet_list_close', 'ul', -1);
  }
  token.markup = String.fromCharCode(markerCharCode);

  listLines[1] = nextLine;
  state.line = nextLine;

  state.parentType = oldParentType;

  // mark paragraphs tight if needed
  if (tight) {
    markTightParagraphs(state, listTokIdx);
  }

  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_block/paragraph.js":
/*!***************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_block/paragraph.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
// Paragraph




module.exports = function paragraph(state, startLine/*, endLine*/) {
  var content, terminate, i, l, token, oldParentType,
      nextLine = startLine + 1,
      terminatorRules = state.md.block.ruler.getRules('paragraph'),
      endLine = state.lineMax;

  oldParentType = state.parentType;
  state.parentType = 'paragraph';

  // jump line-by-line until empty one or EOF
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue; }

    // Some tags can terminate paragraph without empty line.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }
  }

  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

  state.line = nextLine;

  token          = state.push('paragraph_open', 'p', 1);
  token.map      = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = content;
  token.map      = [ startLine, state.line ];
  token.children = [];

  token          = state.push('paragraph_close', 'p', -1);

  state.parentType = oldParentType;

  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_block/reference.js":
/*!***************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_block/reference.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



var normalizeReference   = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").normalizeReference);
var isSpace              = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isSpace);


module.exports = function reference(state, startLine, _endLine, silent) {
  var ch,
      destEndPos,
      destEndLineNo,
      endLine,
      href,
      i,
      l,
      label,
      labelEnd,
      oldParentType,
      res,
      start,
      str,
      terminate,
      terminatorRules,
      title,
      lines = 0,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine],
      nextLine = startLine + 1;

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  if (state.src.charCodeAt(pos) !== 0x5B/* [ */) { return false; }

  // Simple check to quickly interrupt scan on [link](url) at the start of line.
  // Can be useful on practice: https://github.com/markdown-it/markdown-it/issues/54
  while (++pos < max) {
    if (state.src.charCodeAt(pos) === 0x5D /* ] */ &&
        state.src.charCodeAt(pos - 1) !== 0x5C/* \ */) {
      if (pos + 1 === max) { return false; }
      if (state.src.charCodeAt(pos + 1) !== 0x3A/* : */) { return false; }
      break;
    }
  }

  endLine = state.lineMax;

  // jump line-by-line until empty one or EOF
  terminatorRules = state.md.block.ruler.getRules('reference');

  oldParentType = state.parentType;
  state.parentType = 'reference';

  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue; }

    // Some tags can terminate paragraph without empty line.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }
  }

  str = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  max = str.length;

  for (pos = 1; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x5B /* [ */) {
      return false;
    } else if (ch === 0x5D /* ] */) {
      labelEnd = pos;
      break;
    } else if (ch === 0x0A /* \n */) {
      lines++;
    } else if (ch === 0x5C /* \ */) {
      pos++;
      if (pos < max && str.charCodeAt(pos) === 0x0A) {
        lines++;
      }
    }
  }

  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A/* : */) { return false; }

  // [label]:   destination   'title'
  //         ^^^ skip optional whitespace here
  for (pos = labelEnd + 2; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x0A) {
      lines++;
    } else if (isSpace(ch)) {
      /*eslint no-empty:0*/
    } else {
      break;
    }
  }

  // [label]:   destination   'title'
  //            ^^^^^^^^^^^ parse this
  res = state.md.helpers.parseLinkDestination(str, pos, max);
  if (!res.ok) { return false; }

  href = state.md.normalizeLink(res.str);
  if (!state.md.validateLink(href)) { return false; }

  pos = res.pos;
  lines += res.lines;

  // save cursor state, we could require to rollback later
  destEndPos = pos;
  destEndLineNo = lines;

  // [label]:   destination   'title'
  //                       ^^^ skipping those spaces
  start = pos;
  for (; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x0A) {
      lines++;
    } else if (isSpace(ch)) {
      /*eslint no-empty:0*/
    } else {
      break;
    }
  }

  // [label]:   destination   'title'
  //                          ^^^^^^^ parse this
  res = state.md.helpers.parseLinkTitle(str, pos, max);
  if (pos < max && start !== pos && res.ok) {
    title = res.str;
    pos = res.pos;
    lines += res.lines;
  } else {
    title = '';
    pos = destEndPos;
    lines = destEndLineNo;
  }

  // skip trailing spaces until the rest of the line
  while (pos < max) {
    ch = str.charCodeAt(pos);
    if (!isSpace(ch)) { break; }
    pos++;
  }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    if (title) {
      // garbage at the end of the line after title,
      // but it could still be a valid reference if we roll back
      title = '';
      pos = destEndPos;
      lines = destEndLineNo;
      while (pos < max) {
        ch = str.charCodeAt(pos);
        if (!isSpace(ch)) { break; }
        pos++;
      }
    }
  }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    // garbage at the end of the line
    return false;
  }

  label = normalizeReference(str.slice(1, labelEnd));
  if (!label) {
    // CommonMark 0.20 disallows empty labels
    return false;
  }

  // Reference can not terminate anything. This check is for safety only.
  /*istanbul ignore if*/
  if (silent) { return true; }

  if (typeof state.env.references === 'undefined') {
    state.env.references = {};
  }
  if (typeof state.env.references[label] === 'undefined') {
    state.env.references[label] = { title: title, href: href };
  }

  state.parentType = oldParentType;

  state.line = startLine + lines + 1;
  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_block/state_block.js":
/*!*****************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_block/state_block.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Parser state class



var Token = __webpack_require__(/*! ../token */ "./node_modules/markdown-it/lib/token.js");
var isSpace = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isSpace);


function StateBlock(src, md, env, tokens) {
  var ch, s, start, pos, len, indent, offset, indent_found;

  this.src = src;

  // link to parser instance
  this.md     = md;

  this.env = env;

  //
  // Internal state vartiables
  //

  this.tokens = tokens;

  this.bMarks = [];  // line begin offsets for fast jumps
  this.eMarks = [];  // line end offsets for fast jumps
  this.tShift = [];  // offsets of the first non-space characters (tabs not expanded)
  this.sCount = [];  // indents for each line (tabs expanded)

  // An amount of virtual spaces (tabs expanded) between beginning
  // of each line (bMarks) and real beginning of that line.
  //
  // It exists only as a hack because blockquotes override bMarks
  // losing information in the process.
  //
  // It's used only when expanding tabs, you can think about it as
  // an initial tab length, e.g. bsCount=21 applied to string `\t123`
  // means first tab should be expanded to 4-21%4 === 3 spaces.
  //
  this.bsCount = [];

  // block parser variables
  this.blkIndent  = 0; // required block content indent (for example, if we are
                       // inside a list, it would be positioned after list marker)
  this.line       = 0; // line index in src
  this.lineMax    = 0; // lines count
  this.tight      = false;  // loose/tight mode for lists
  this.ddIndent   = -1; // indent of the current dd block (-1 if there isn't any)
  this.listIndent = -1; // indent of the current list block (-1 if there isn't any)

  // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
  // used in lists to determine if they interrupt a paragraph
  this.parentType = 'root';

  this.level = 0;

  // renderer
  this.result = '';

  // Create caches
  // Generate markers.
  s = this.src;
  indent_found = false;

  for (start = pos = indent = offset = 0, len = s.length; pos < len; pos++) {
    ch = s.charCodeAt(pos);

    if (!indent_found) {
      if (isSpace(ch)) {
        indent++;

        if (ch === 0x09) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }
        continue;
      } else {
        indent_found = true;
      }
    }

    if (ch === 0x0A || pos === len - 1) {
      if (ch !== 0x0A) { pos++; }
      this.bMarks.push(start);
      this.eMarks.push(pos);
      this.tShift.push(indent);
      this.sCount.push(offset);
      this.bsCount.push(0);

      indent_found = false;
      indent = 0;
      offset = 0;
      start = pos + 1;
    }
  }

  // Push fake entry to simplify cache bounds checks
  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);
  this.sCount.push(0);
  this.bsCount.push(0);

  this.lineMax = this.bMarks.length - 1; // don't count last fake line
}

// Push new token to "stream".
//
StateBlock.prototype.push = function (type, tag, nesting) {
  var token = new Token(type, tag, nesting);
  token.block = true;

  if (nesting < 0) this.level--; // closing tag
  token.level = this.level;
  if (nesting > 0) this.level++; // opening tag

  this.tokens.push(token);
  return token;
};

StateBlock.prototype.isEmpty = function isEmpty(line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
};

StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
  for (var max = this.lineMax; from < max; from++) {
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break;
    }
  }
  return from;
};

// Skip spaces from given position.
StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
  var ch;

  for (var max = this.src.length; pos < max; pos++) {
    ch = this.src.charCodeAt(pos);
    if (!isSpace(ch)) { break; }
  }
  return pos;
};

// Skip spaces from given position in reverse.
StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
  if (pos <= min) { return pos; }

  while (pos > min) {
    if (!isSpace(this.src.charCodeAt(--pos))) { return pos + 1; }
  }
  return pos;
};

// Skip char codes from given position
StateBlock.prototype.skipChars = function skipChars(pos, code) {
  for (var max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== code) { break; }
  }
  return pos;
};

// Skip char codes reverse from given position - 1
StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
  if (pos <= min) { return pos; }

  while (pos > min) {
    if (code !== this.src.charCodeAt(--pos)) { return pos + 1; }
  }
  return pos;
};

// cut lines range from source.
StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
  var i, lineIndent, ch, first, last, queue, lineStart,
      line = begin;

  if (begin >= end) {
    return '';
  }

  queue = new Array(end - begin);

  for (i = 0; line < end; line++, i++) {
    lineIndent = 0;
    lineStart = first = this.bMarks[line];

    if (line + 1 < end || keepLastLF) {
      // No need for bounds check because we have fake entry on tail.
      last = this.eMarks[line] + 1;
    } else {
      last = this.eMarks[line];
    }

    while (first < last && lineIndent < indent) {
      ch = this.src.charCodeAt(first);

      if (isSpace(ch)) {
        if (ch === 0x09) {
          lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
        } else {
          lineIndent++;
        }
      } else if (first - lineStart < this.tShift[line]) {
        // patched tShift masked characters to look like spaces (blockquotes, list markers)
        lineIndent++;
      } else {
        break;
      }

      first++;
    }

    if (lineIndent > indent) {
      // partially expanding tabs in code blocks, e.g '\t\tfoobar'
      // with indent=2 becomes '  \tfoobar'
      queue[i] = new Array(lineIndent - indent + 1).join(' ') + this.src.slice(first, last);
    } else {
      queue[i] = this.src.slice(first, last);
    }
  }

  return queue.join('');
};

// re-export Token class to use in block rules
StateBlock.prototype.Token = Token;


module.exports = StateBlock;


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_block/table.js":
/*!***********************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_block/table.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// GFM table, https://github.github.com/gfm/#tables-extension-



var isSpace = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isSpace);


function getLine(state, line) {
  var pos = state.bMarks[line] + state.tShift[line],
      max = state.eMarks[line];

  return state.src.substr(pos, max - pos);
}

function escapedSplit(str) {
  var result = [],
      pos = 0,
      max = str.length,
      ch,
      isEscaped = false,
      lastPos = 0,
      current = '';

  ch  = str.charCodeAt(pos);

  while (pos < max) {
    if (ch === 0x7c/* | */) {
      if (!isEscaped) {
        // pipe separating cells, '|'
        result.push(current + str.substring(lastPos, pos));
        current = '';
        lastPos = pos + 1;
      } else {
        // escaped pipe, '\|'
        current += str.substring(lastPos, pos - 1);
        lastPos = pos;
      }
    }

    isEscaped = (ch === 0x5c/* \ */);
    pos++;

    ch = str.charCodeAt(pos);
  }

  result.push(current + str.substring(lastPos));

  return result;
}


module.exports = function table(state, startLine, endLine, silent) {
  var ch, lineText, pos, i, l, nextLine, columns, columnCount, token,
      aligns, t, tableLines, tbodyLines, oldParentType, terminate,
      terminatorRules, firstCh, secondCh;

  // should have at least two lines
  if (startLine + 2 > endLine) { return false; }

  nextLine = startLine + 1;

  if (state.sCount[nextLine] < state.blkIndent) { return false; }

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[nextLine] - state.blkIndent >= 4) { return false; }

  // first character of the second line should be '|', '-', ':',
  // and no other characters are allowed but spaces;
  // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp

  pos = state.bMarks[nextLine] + state.tShift[nextLine];
  if (pos >= state.eMarks[nextLine]) { return false; }

  firstCh = state.src.charCodeAt(pos++);
  if (firstCh !== 0x7C/* | */ && firstCh !== 0x2D/* - */ && firstCh !== 0x3A/* : */) { return false; }

  if (pos >= state.eMarks[nextLine]) { return false; }

  secondCh = state.src.charCodeAt(pos++);
  if (secondCh !== 0x7C/* | */ && secondCh !== 0x2D/* - */ && secondCh !== 0x3A/* : */ && !isSpace(secondCh)) {
    return false;
  }

  // if first character is '-', then second character must not be a space
  // (due to parsing ambiguity with list)
  if (firstCh === 0x2D/* - */ && isSpace(secondCh)) { return false; }

  while (pos < state.eMarks[nextLine]) {
    ch = state.src.charCodeAt(pos);

    if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */ && !isSpace(ch)) { return false; }

    pos++;
  }

  lineText = getLine(state, startLine + 1);

  columns = lineText.split('|');
  aligns = [];
  for (i = 0; i < columns.length; i++) {
    t = columns[i].trim();
    if (!t) {
      // allow empty columns before and after table, but not in between columns;
      // e.g. allow ` |---| `, disallow ` ---||--- `
      if (i === 0 || i === columns.length - 1) {
        continue;
      } else {
        return false;
      }
    }

    if (!/^:?-+:?$/.test(t)) { return false; }
    if (t.charCodeAt(t.length - 1) === 0x3A/* : */) {
      aligns.push(t.charCodeAt(0) === 0x3A/* : */ ? 'center' : 'right');
    } else if (t.charCodeAt(0) === 0x3A/* : */) {
      aligns.push('left');
    } else {
      aligns.push('');
    }
  }

  lineText = getLine(state, startLine).trim();
  if (lineText.indexOf('|') === -1) { return false; }
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }
  columns = escapedSplit(lineText);
  if (columns.length && columns[0] === '') columns.shift();
  if (columns.length && columns[columns.length - 1] === '') columns.pop();

  // header row will define an amount of columns in the entire table,
  // and align row should be exactly the same (the rest of the rows can differ)
  columnCount = columns.length;
  if (columnCount === 0 || columnCount !== aligns.length) { return false; }

  if (silent) { return true; }

  oldParentType = state.parentType;
  state.parentType = 'table';

  // use 'blockquote' lists for termination because it's
  // the most similar to tables
  terminatorRules = state.md.block.ruler.getRules('blockquote');

  token     = state.push('table_open', 'table', 1);
  token.map = tableLines = [ startLine, 0 ];

  token     = state.push('thead_open', 'thead', 1);
  token.map = [ startLine, startLine + 1 ];

  token     = state.push('tr_open', 'tr', 1);
  token.map = [ startLine, startLine + 1 ];

  for (i = 0; i < columns.length; i++) {
    token          = state.push('th_open', 'th', 1);
    if (aligns[i]) {
      token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
    }

    token          = state.push('inline', '', 0);
    token.content  = columns[i].trim();
    token.children = [];

    token          = state.push('th_close', 'th', -1);
  }

  token     = state.push('tr_close', 'tr', -1);
  token     = state.push('thead_close', 'thead', -1);

  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < state.blkIndent) { break; }

    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }

    if (terminate) { break; }
    lineText = getLine(state, nextLine).trim();
    if (!lineText) { break; }
    if (state.sCount[nextLine] - state.blkIndent >= 4) { break; }
    columns = escapedSplit(lineText);
    if (columns.length && columns[0] === '') columns.shift();
    if (columns.length && columns[columns.length - 1] === '') columns.pop();

    if (nextLine === startLine + 2) {
      token     = state.push('tbody_open', 'tbody', 1);
      token.map = tbodyLines = [ startLine + 2, 0 ];
    }

    token     = state.push('tr_open', 'tr', 1);
    token.map = [ nextLine, nextLine + 1 ];

    for (i = 0; i < columnCount; i++) {
      token          = state.push('td_open', 'td', 1);
      if (aligns[i]) {
        token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
      }

      token          = state.push('inline', '', 0);
      token.content  = columns[i] ? columns[i].trim() : '';
      token.children = [];

      token          = state.push('td_close', 'td', -1);
    }
    token = state.push('tr_close', 'tr', -1);
  }

  if (tbodyLines) {
    token = state.push('tbody_close', 'tbody', -1);
    tbodyLines[1] = nextLine;
  }

  token = state.push('table_close', 'table', -1);
  tableLines[1] = nextLine;

  state.parentType = oldParentType;
  state.line = nextLine;
  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_core/block.js":
/*!**********************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_core/block.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";



module.exports = function block(state) {
  var token;

  if (state.inlineMode) {
    token          = new state.Token('inline', '', 0);
    token.content  = state.src;
    token.map      = [ 0, 1 ];
    token.children = [];
    state.tokens.push(token);
  } else {
    state.md.block.parse(state.src, state.md, state.env, state.tokens);
  }
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_core/inline.js":
/*!***********************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_core/inline.js ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function inline(state) {
  var tokens = state.tokens, tok, i, l;

  // Parse inlines
  for (i = 0, l = tokens.length; i < l; i++) {
    tok = tokens[i];
    if (tok.type === 'inline') {
      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
    }
  }
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_core/linkify.js":
/*!************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_core/linkify.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Replace link-like texts with link nodes.
//
// Currently restricted by `md.validateLink()` to http/https/ftp
//



var arrayReplaceAt = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").arrayReplaceAt);


function isLinkOpen(str) {
  return /^<a[>\s]/i.test(str);
}
function isLinkClose(str) {
  return /^<\/a\s*>/i.test(str);
}


module.exports = function linkify(state) {
  var i, j, l, tokens, token, currentToken, nodes, ln, text, pos, lastPos,
      level, htmlLinkLevel, url, fullUrl, urlText,
      blockTokens = state.tokens,
      links;

  if (!state.md.options.linkify) { return; }

  for (j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== 'inline' ||
        !state.md.linkify.pretest(blockTokens[j].content)) {
      continue;
    }

    tokens = blockTokens[j].children;

    htmlLinkLevel = 0;

    // We scan from the end, to keep position when new tags added.
    // Use reversed logic in links start/end match
    for (i = tokens.length - 1; i >= 0; i--) {
      currentToken = tokens[i];

      // Skip content of markdown links
      if (currentToken.type === 'link_close') {
        i--;
        while (tokens[i].level !== currentToken.level && tokens[i].type !== 'link_open') {
          i--;
        }
        continue;
      }

      // Skip content of html tag links
      if (currentToken.type === 'html_inline') {
        if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
          htmlLinkLevel--;
        }
        if (isLinkClose(currentToken.content)) {
          htmlLinkLevel++;
        }
      }
      if (htmlLinkLevel > 0) { continue; }

      if (currentToken.type === 'text' && state.md.linkify.test(currentToken.content)) {

        text = currentToken.content;
        links = state.md.linkify.match(text);

        // Now split string to nodes
        nodes = [];
        level = currentToken.level;
        lastPos = 0;

        for (ln = 0; ln < links.length; ln++) {

          url = links[ln].url;
          fullUrl = state.md.normalizeLink(url);
          if (!state.md.validateLink(fullUrl)) { continue; }

          urlText = links[ln].text;

          // Linkifier might send raw hostnames like "example.com", where url
          // starts with domain name. So we prepend http:// in those cases,
          // and remove it afterwards.
          //
          if (!links[ln].schema) {
            urlText = state.md.normalizeLinkText('http://' + urlText).replace(/^http:\/\//, '');
          } else if (links[ln].schema === 'mailto:' && !/^mailto:/i.test(urlText)) {
            urlText = state.md.normalizeLinkText('mailto:' + urlText).replace(/^mailto:/, '');
          } else {
            urlText = state.md.normalizeLinkText(urlText);
          }

          pos = links[ln].index;

          if (pos > lastPos) {
            token         = new state.Token('text', '', 0);
            token.content = text.slice(lastPos, pos);
            token.level   = level;
            nodes.push(token);
          }

          token         = new state.Token('link_open', 'a', 1);
          token.attrs   = [ [ 'href', fullUrl ] ];
          token.level   = level++;
          token.markup  = 'linkify';
          token.info    = 'auto';
          nodes.push(token);

          token         = new state.Token('text', '', 0);
          token.content = urlText;
          token.level   = level;
          nodes.push(token);

          token         = new state.Token('link_close', 'a', -1);
          token.level   = --level;
          token.markup  = 'linkify';
          token.info    = 'auto';
          nodes.push(token);

          lastPos = links[ln].lastIndex;
        }
        if (lastPos < text.length) {
          token         = new state.Token('text', '', 0);
          token.content = text.slice(lastPos);
          token.level   = level;
          nodes.push(token);
        }

        // replace current node
        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
      }
    }
  }
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_core/normalize.js":
/*!**************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_core/normalize.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
// Normalize input string




// https://spec.commonmark.org/0.29/#line-ending
var NEWLINES_RE  = /\r\n?|\n/g;
var NULL_RE      = /\0/g;


module.exports = function normalize(state) {
  var str;

  // Normalize newlines
  str = state.src.replace(NEWLINES_RE, '\n');

  // Replace NULL characters
  str = str.replace(NULL_RE, '\uFFFD');

  state.src = str;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_core/replacements.js":
/*!*****************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_core/replacements.js ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
// Simple typographic replacements
//
// (c) (C) → ©
// (tm) (TM) → ™
// (r) (R) → ®
// +- → ±
// (p) (P) -> §
// ... → … (also ?.... → ?.., !.... → !..)
// ???????? → ???, !!!!! → !!!, `,,` → `,`
// -- → &ndash;, --- → &mdash;
//


// TODO:
// - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
// - miltiplication 2 x 4 -> 2 × 4

var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;

// Workaround for phantomjs - need regex without /g flag,
// or root check will fail every second time
var SCOPED_ABBR_TEST_RE = /\((c|tm|r|p)\)/i;

var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
var SCOPED_ABBR = {
  c: '©',
  r: '®',
  p: '§',
  tm: '™'
};

function replaceFn(match, name) {
  return SCOPED_ABBR[name.toLowerCase()];
}

function replace_scoped(inlineTokens) {
  var i, token, inside_autolink = 0;

  for (i = inlineTokens.length - 1; i >= 0; i--) {
    token = inlineTokens[i];

    if (token.type === 'text' && !inside_autolink) {
      token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
    }

    if (token.type === 'link_open' && token.info === 'auto') {
      inside_autolink--;
    }

    if (token.type === 'link_close' && token.info === 'auto') {
      inside_autolink++;
    }
  }
}

function replace_rare(inlineTokens) {
  var i, token, inside_autolink = 0;

  for (i = inlineTokens.length - 1; i >= 0; i--) {
    token = inlineTokens[i];

    if (token.type === 'text' && !inside_autolink) {
      if (RARE_RE.test(token.content)) {
        token.content = token.content
          .replace(/\+-/g, '±')
          // .., ..., ....... -> …
          // but ?..... & !..... -> ?.. & !..
          .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..')
          .replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')
          // em-dash
          .replace(/(^|[^-])---(?=[^-]|$)/mg, '$1\u2014')
          // en-dash
          .replace(/(^|\s)--(?=\s|$)/mg, '$1\u2013')
          .replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, '$1\u2013');
      }
    }

    if (token.type === 'link_open' && token.info === 'auto') {
      inside_autolink--;
    }

    if (token.type === 'link_close' && token.info === 'auto') {
      inside_autolink++;
    }
  }
}


module.exports = function replace(state) {
  var blkIdx;

  if (!state.md.options.typographer) { return; }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

    if (state.tokens[blkIdx].type !== 'inline') { continue; }

    if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
      replace_scoped(state.tokens[blkIdx].children);
    }

    if (RARE_RE.test(state.tokens[blkIdx].content)) {
      replace_rare(state.tokens[blkIdx].children);
    }

  }
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_core/smartquotes.js":
/*!****************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_core/smartquotes.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Convert straight quotation marks to typographic ones
//



var isWhiteSpace   = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isWhiteSpace);
var isPunctChar    = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isPunctChar);
var isMdAsciiPunct = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isMdAsciiPunct);

var QUOTE_TEST_RE = /['"]/;
var QUOTE_RE = /['"]/g;
var APOSTROPHE = '\u2019'; /* ’ */


function replaceAt(str, index, ch) {
  return str.substr(0, index) + ch + str.substr(index + 1);
}

function process_inlines(tokens, state) {
  var i, token, text, t, pos, max, thisLevel, item, lastChar, nextChar,
      isLastPunctChar, isNextPunctChar, isLastWhiteSpace, isNextWhiteSpace,
      canOpen, canClose, j, isSingle, stack, openQuote, closeQuote;

  stack = [];

  for (i = 0; i < tokens.length; i++) {
    token = tokens[i];

    thisLevel = tokens[i].level;

    for (j = stack.length - 1; j >= 0; j--) {
      if (stack[j].level <= thisLevel) { break; }
    }
    stack.length = j + 1;

    if (token.type !== 'text') { continue; }

    text = token.content;
    pos = 0;
    max = text.length;

    /*eslint no-labels:0,block-scoped-var:0*/
    OUTER:
    while (pos < max) {
      QUOTE_RE.lastIndex = pos;
      t = QUOTE_RE.exec(text);
      if (!t) { break; }

      canOpen = canClose = true;
      pos = t.index + 1;
      isSingle = (t[0] === "'");

      // Find previous character,
      // default to space if it's the beginning of the line
      //
      lastChar = 0x20;

      if (t.index - 1 >= 0) {
        lastChar = text.charCodeAt(t.index - 1);
      } else {
        for (j = i - 1; j >= 0; j--) {
          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // lastChar defaults to 0x20
          if (!tokens[j].content) continue; // should skip all tokens except 'text', 'html_inline' or 'code_inline'

          lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
          break;
        }
      }

      // Find next character,
      // default to space if it's the end of the line
      //
      nextChar = 0x20;

      if (pos < max) {
        nextChar = text.charCodeAt(pos);
      } else {
        for (j = i + 1; j < tokens.length; j++) {
          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // nextChar defaults to 0x20
          if (!tokens[j].content) continue; // should skip all tokens except 'text', 'html_inline' or 'code_inline'

          nextChar = tokens[j].content.charCodeAt(0);
          break;
        }
      }

      isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
      isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

      isLastWhiteSpace = isWhiteSpace(lastChar);
      isNextWhiteSpace = isWhiteSpace(nextChar);

      if (isNextWhiteSpace) {
        canOpen = false;
      } else if (isNextPunctChar) {
        if (!(isLastWhiteSpace || isLastPunctChar)) {
          canOpen = false;
        }
      }

      if (isLastWhiteSpace) {
        canClose = false;
      } else if (isLastPunctChar) {
        if (!(isNextWhiteSpace || isNextPunctChar)) {
          canClose = false;
        }
      }

      if (nextChar === 0x22 /* " */ && t[0] === '"') {
        if (lastChar >= 0x30 /* 0 */ && lastChar <= 0x39 /* 9 */) {
          // special case: 1"" - count first quote as an inch
          canClose = canOpen = false;
        }
      }

      if (canOpen && canClose) {
        // Replace quotes in the middle of punctuation sequence, but not
        // in the middle of the words, i.e.:
        //
        // 1. foo " bar " baz - not replaced
        // 2. foo-"-bar-"-baz - replaced
        // 3. foo"bar"baz     - not replaced
        //
        canOpen = isLastPunctChar;
        canClose = isNextPunctChar;
      }

      if (!canOpen && !canClose) {
        // middle of word
        if (isSingle) {
          token.content = replaceAt(token.content, t.index, APOSTROPHE);
        }
        continue;
      }

      if (canClose) {
        // this could be a closing quote, rewind the stack to get a match
        for (j = stack.length - 1; j >= 0; j--) {
          item = stack[j];
          if (stack[j].level < thisLevel) { break; }
          if (item.single === isSingle && stack[j].level === thisLevel) {
            item = stack[j];

            if (isSingle) {
              openQuote = state.md.options.quotes[2];
              closeQuote = state.md.options.quotes[3];
            } else {
              openQuote = state.md.options.quotes[0];
              closeQuote = state.md.options.quotes[1];
            }

            // replace token.content *before* tokens[item.token].content,
            // because, if they are pointing at the same token, replaceAt
            // could mess up indices when quote length != 1
            token.content = replaceAt(token.content, t.index, closeQuote);
            tokens[item.token].content = replaceAt(
              tokens[item.token].content, item.pos, openQuote);

            pos += closeQuote.length - 1;
            if (item.token === i) { pos += openQuote.length - 1; }

            text = token.content;
            max = text.length;

            stack.length = j;
            continue OUTER;
          }
        }
      }

      if (canOpen) {
        stack.push({
          token: i,
          pos: t.index,
          single: isSingle,
          level: thisLevel
        });
      } else if (canClose && isSingle) {
        token.content = replaceAt(token.content, t.index, APOSTROPHE);
      }
    }
  }
}


module.exports = function smartquotes(state) {
  /*eslint max-depth:0*/
  var blkIdx;

  if (!state.md.options.typographer) { return; }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

    if (state.tokens[blkIdx].type !== 'inline' ||
        !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
      continue;
    }

    process_inlines(state.tokens[blkIdx].children, state);
  }
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_core/state_core.js":
/*!***************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_core/state_core.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Core state object
//


var Token = __webpack_require__(/*! ../token */ "./node_modules/markdown-it/lib/token.js");


function StateCore(src, md, env) {
  this.src = src;
  this.env = env;
  this.tokens = [];
  this.inlineMode = false;
  this.md = md; // link to parser instance
}

// re-export Token class to use in core rules
StateCore.prototype.Token = Token;


module.exports = StateCore;


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_inline/autolink.js":
/*!***************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_inline/autolink.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
// Process autolinks '<protocol:...>'




/*eslint max-len:0*/
var EMAIL_RE    = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
var AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/;


module.exports = function autolink(state, silent) {
  var url, fullUrl, token, ch, start, max,
      pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

  start = state.pos;
  max = state.posMax;

  for (;;) {
    if (++pos >= max) return false;

    ch = state.src.charCodeAt(pos);

    if (ch === 0x3C /* < */) return false;
    if (ch === 0x3E /* > */) break;
  }

  url = state.src.slice(start + 1, pos);

  if (AUTOLINK_RE.test(url)) {
    fullUrl = state.md.normalizeLink(url);
    if (!state.md.validateLink(fullUrl)) { return false; }

    if (!silent) {
      token         = state.push('link_open', 'a', 1);
      token.attrs   = [ [ 'href', fullUrl ] ];
      token.markup  = 'autolink';
      token.info    = 'auto';

      token         = state.push('text', '', 0);
      token.content = state.md.normalizeLinkText(url);

      token         = state.push('link_close', 'a', -1);
      token.markup  = 'autolink';
      token.info    = 'auto';
    }

    state.pos += url.length + 2;
    return true;
  }

  if (EMAIL_RE.test(url)) {
    fullUrl = state.md.normalizeLink('mailto:' + url);
    if (!state.md.validateLink(fullUrl)) { return false; }

    if (!silent) {
      token         = state.push('link_open', 'a', 1);
      token.attrs   = [ [ 'href', fullUrl ] ];
      token.markup  = 'autolink';
      token.info    = 'auto';

      token         = state.push('text', '', 0);
      token.content = state.md.normalizeLinkText(url);

      token         = state.push('link_close', 'a', -1);
      token.markup  = 'autolink';
      token.info    = 'auto';
    }

    state.pos += url.length + 2;
    return true;
  }

  return false;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_inline/backticks.js":
/*!****************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_inline/backticks.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
// Parse backticks




module.exports = function backtick(state, silent) {
  var start, max, marker, token, matchStart, matchEnd, openerLength, closerLength,
      pos = state.pos,
      ch = state.src.charCodeAt(pos);

  if (ch !== 0x60/* ` */) { return false; }

  start = pos;
  pos++;
  max = state.posMax;

  // scan marker length
  while (pos < max && state.src.charCodeAt(pos) === 0x60/* ` */) { pos++; }

  marker = state.src.slice(start, pos);
  openerLength = marker.length;

  if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
    if (!silent) state.pending += marker;
    state.pos += openerLength;
    return true;
  }

  matchStart = matchEnd = pos;

  // Nothing found in the cache, scan until the end of the line (or until marker is found)
  while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
    matchEnd = matchStart + 1;

    // scan marker length
    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60/* ` */) { matchEnd++; }

    closerLength = matchEnd - matchStart;

    if (closerLength === openerLength) {
      // Found matching closer length.
      if (!silent) {
        token     = state.push('code_inline', 'code', 0);
        token.markup  = marker;
        token.content = state.src.slice(pos, matchStart)
          .replace(/\n/g, ' ')
          .replace(/^ (.+) $/, '$1');
      }
      state.pos = matchEnd;
      return true;
    }

    // Some different length found, put it in cache as upper limit of where closer can be found
    state.backticks[closerLength] = matchStart;
  }

  // Scanned through the end, didn't find anything
  state.backticksScanned = true;

  if (!silent) state.pending += marker;
  state.pos += openerLength;
  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_inline/balance_pairs.js":
/*!********************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_inline/balance_pairs.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
// For each opening emphasis-like marker find a matching closing one
//



function processDelimiters(state, delimiters) {
  var closerIdx, openerIdx, closer, opener, minOpenerIdx, newMinOpenerIdx,
      isOddMatch, lastJump,
      openersBottom = {},
      max = delimiters.length;

  if (!max) return;

  // headerIdx is the first delimiter of the current (where closer is) delimiter run
  var headerIdx = 0;
  var lastTokenIdx = -2; // needs any value lower than -1
  var jumps = [];

  for (closerIdx = 0; closerIdx < max; closerIdx++) {
    closer = delimiters[closerIdx];

    jumps.push(0);

    // markers belong to same delimiter run if:
    //  - they have adjacent tokens
    //  - AND markers are the same
    //
    if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) {
      headerIdx = closerIdx;
    }

    lastTokenIdx = closer.token;

    // Length is only used for emphasis-specific "rule of 3",
    // if it's not defined (in strikethrough or 3rd party plugins),
    // we can default it to 0 to disable those checks.
    //
    closer.length = closer.length || 0;

    if (!closer.close) continue;

    // Previously calculated lower bounds (previous fails)
    // for each marker, each delimiter length modulo 3,
    // and for whether this closer can be an opener;
    // https://github.com/commonmark/cmark/commit/34250e12ccebdc6372b8b49c44fab57c72443460
    if (!openersBottom.hasOwnProperty(closer.marker)) {
      openersBottom[closer.marker] = [ -1, -1, -1, -1, -1, -1 ];
    }

    minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length % 3)];

    openerIdx = headerIdx - jumps[headerIdx] - 1;

    newMinOpenerIdx = openerIdx;

    for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
      opener = delimiters[openerIdx];

      if (opener.marker !== closer.marker) continue;

      if (opener.open && opener.end < 0) {

        isOddMatch = false;

        // from spec:
        //
        // If one of the delimiters can both open and close emphasis, then the
        // sum of the lengths of the delimiter runs containing the opening and
        // closing delimiters must not be a multiple of 3 unless both lengths
        // are multiples of 3.
        //
        if (opener.close || closer.open) {
          if ((opener.length + closer.length) % 3 === 0) {
            if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
              isOddMatch = true;
            }
          }
        }

        if (!isOddMatch) {
          // If previous delimiter cannot be an opener, we can safely skip
          // the entire sequence in future checks. This is required to make
          // sure algorithm has linear complexity (see *_*_*_*_*_... case).
          //
          lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ?
            jumps[openerIdx - 1] + 1 :
            0;

          jumps[closerIdx] = closerIdx - openerIdx + lastJump;
          jumps[openerIdx] = lastJump;

          closer.open  = false;
          opener.end   = closerIdx;
          opener.close = false;
          newMinOpenerIdx = -1;
          // treat next token as start of run,
          // it optimizes skips in **<...>**a**<...>** pathological case
          lastTokenIdx = -2;
          break;
        }
      }
    }

    if (newMinOpenerIdx !== -1) {
      // If match for this delimiter run failed, we want to set lower bound for
      // future lookups. This is required to make sure algorithm has linear
      // complexity.
      //
      // See details here:
      // https://github.com/commonmark/cmark/issues/178#issuecomment-270417442
      //
      openersBottom[closer.marker][(closer.open ? 3 : 0) + ((closer.length || 0) % 3)] = newMinOpenerIdx;
    }
  }
}


module.exports = function link_pairs(state) {
  var curr,
      tokens_meta = state.tokens_meta,
      max = state.tokens_meta.length;

  processDelimiters(state, state.delimiters);

  for (curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      processDelimiters(state, tokens_meta[curr].delimiters);
    }
  }
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_inline/emphasis.js":
/*!***************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_inline/emphasis.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
// Process *this* and _that_
//



// Insert each marker as a separate text token, and add it to delimiter list
//
module.exports.tokenize = function emphasis(state, silent) {
  var i, scanned, token,
      start = state.pos,
      marker = state.src.charCodeAt(start);

  if (silent) { return false; }

  if (marker !== 0x5F /* _ */ && marker !== 0x2A /* * */) { return false; }

  scanned = state.scanDelims(state.pos, marker === 0x2A);

  for (i = 0; i < scanned.length; i++) {
    token         = state.push('text', '', 0);
    token.content = String.fromCharCode(marker);

    state.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: marker,

      // Total length of these series of delimiters.
      //
      length: scanned.length,

      // A position of the token this delimiter corresponds to.
      //
      token:  state.tokens.length - 1,

      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end:    -1,

      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open:   scanned.can_open,
      close:  scanned.can_close
    });
  }

  state.pos += scanned.length;

  return true;
};


function postProcess(state, delimiters) {
  var i,
      startDelim,
      endDelim,
      token,
      ch,
      isStrong,
      max = delimiters.length;

  for (i = max - 1; i >= 0; i--) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x5F/* _ */ && startDelim.marker !== 0x2A/* * */) {
      continue;
    }

    // Process only opening markers
    if (startDelim.end === -1) {
      continue;
    }

    endDelim = delimiters[startDelim.end];

    // If the previous delimiter has the same marker and is adjacent to this one,
    // merge those into one strong delimiter.
    //
    // `<em><em>whatever</em></em>` -> `<strong>whatever</strong>`
    //
    isStrong = i > 0 &&
               delimiters[i - 1].end === startDelim.end + 1 &&
               // check that first two markers match and adjacent
               delimiters[i - 1].marker === startDelim.marker &&
               delimiters[i - 1].token === startDelim.token - 1 &&
               // check that last two markers are adjacent (we can safely assume they match)
               delimiters[startDelim.end + 1].token === endDelim.token + 1;

    ch = String.fromCharCode(startDelim.marker);

    token         = state.tokens[startDelim.token];
    token.type    = isStrong ? 'strong_open' : 'em_open';
    token.tag     = isStrong ? 'strong' : 'em';
    token.nesting = 1;
    token.markup  = isStrong ? ch + ch : ch;
    token.content = '';

    token         = state.tokens[endDelim.token];
    token.type    = isStrong ? 'strong_close' : 'em_close';
    token.tag     = isStrong ? 'strong' : 'em';
    token.nesting = -1;
    token.markup  = isStrong ? ch + ch : ch;
    token.content = '';

    if (isStrong) {
      state.tokens[delimiters[i - 1].token].content = '';
      state.tokens[delimiters[startDelim.end + 1].token].content = '';
      i--;
    }
  }
}


// Walk through delimiter list and replace text tokens with tags
//
module.exports.postProcess = function emphasis(state) {
  var curr,
      tokens_meta = state.tokens_meta,
      max = state.tokens_meta.length;

  postProcess(state, state.delimiters);

  for (curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess(state, tokens_meta[curr].delimiters);
    }
  }
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_inline/entity.js":
/*!*************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_inline/entity.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Process html entity - &#123;, &#xAF;, &quot;, ...



var entities          = __webpack_require__(/*! ../common/entities */ "./node_modules/markdown-it/lib/common/entities.js");
var has               = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").has);
var isValidEntityCode = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isValidEntityCode);
var fromCodePoint     = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").fromCodePoint);


var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
var NAMED_RE   = /^&([a-z][a-z0-9]{1,31});/i;


module.exports = function entity(state, silent) {
  var ch, code, match, pos = state.pos, max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x26/* & */) { return false; }

  if (pos + 1 < max) {
    ch = state.src.charCodeAt(pos + 1);

    if (ch === 0x23 /* # */) {
      match = state.src.slice(pos).match(DIGITAL_RE);
      if (match) {
        if (!silent) {
          code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
          state.pending += isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
        }
        state.pos += match[0].length;
        return true;
      }
    } else {
      match = state.src.slice(pos).match(NAMED_RE);
      if (match) {
        if (has(entities, match[1])) {
          if (!silent) { state.pending += entities[match[1]]; }
          state.pos += match[0].length;
          return true;
        }
      }
    }
  }

  if (!silent) { state.pending += '&'; }
  state.pos++;
  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_inline/escape.js":
/*!*************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_inline/escape.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Process escaped chars and hardbreaks



var isSpace = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isSpace);

var ESCAPED = [];

for (var i = 0; i < 256; i++) { ESCAPED.push(0); }

'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'
  .split('').forEach(function (ch) { ESCAPED[ch.charCodeAt(0)] = 1; });


module.exports = function escape(state, silent) {
  var ch, pos = state.pos, max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x5C/* \ */) { return false; }

  pos++;

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (ch < 256 && ESCAPED[ch] !== 0) {
      if (!silent) { state.pending += state.src[pos]; }
      state.pos += 2;
      return true;
    }

    if (ch === 0x0A) {
      if (!silent) {
        state.push('hardbreak', 'br', 0);
      }

      pos++;
      // skip leading whitespaces from next line
      while (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (!isSpace(ch)) { break; }
        pos++;
      }

      state.pos = pos;
      return true;
    }
  }

  if (!silent) { state.pending += '\\'; }
  state.pos++;
  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_inline/html_inline.js":
/*!******************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_inline/html_inline.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Process html tags




var HTML_TAG_RE = (__webpack_require__(/*! ../common/html_re */ "./node_modules/markdown-it/lib/common/html_re.js").HTML_TAG_RE);


function isLetter(ch) {
  /*eslint no-bitwise:0*/
  var lc = ch | 0x20; // to lower case
  return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */);
}


module.exports = function html_inline(state, silent) {
  var ch, match, max, token,
      pos = state.pos;

  if (!state.md.options.html) { return false; }

  // Check start
  max = state.posMax;
  if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
      pos + 2 >= max) {
    return false;
  }

  // Quick fail on second char
  ch = state.src.charCodeAt(pos + 1);
  if (ch !== 0x21/* ! */ &&
      ch !== 0x3F/* ? */ &&
      ch !== 0x2F/* / */ &&
      !isLetter(ch)) {
    return false;
  }

  match = state.src.slice(pos).match(HTML_TAG_RE);
  if (!match) { return false; }

  if (!silent) {
    token         = state.push('html_inline', '', 0);
    token.content = state.src.slice(pos, pos + match[0].length);
  }
  state.pos += match[0].length;
  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_inline/image.js":
/*!************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_inline/image.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Process ![image](<src> "title")



var normalizeReference   = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").normalizeReference);
var isSpace              = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isSpace);


module.exports = function image(state, silent) {
  var attrs,
      code,
      content,
      label,
      labelEnd,
      labelStart,
      pos,
      ref,
      res,
      title,
      token,
      tokens,
      start,
      href = '',
      oldPos = state.pos,
      max = state.posMax;

  if (state.src.charCodeAt(state.pos) !== 0x21/* ! */) { return false; }
  if (state.src.charCodeAt(state.pos + 1) !== 0x5B/* [ */) { return false; }

  labelStart = state.pos + 2;
  labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) { return false; }

  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
    //
    // Inline link
    //

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break; }
    }
    if (pos >= max) { return false; }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }
    }

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    start = pos;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break; }
    }

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0A) { break; }
      }
    } else {
      title = '';
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      state.pos = oldPos;
      return false;
    }
    pos++;
  } else {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') { return false; }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) { label = state.src.slice(labelStart, labelEnd); }

    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    content = state.src.slice(labelStart, labelEnd);

    state.md.inline.parse(
      content,
      state.md,
      state.env,
      tokens = []
    );

    token          = state.push('image', 'img', 0);
    token.attrs    = attrs = [ [ 'src', href ], [ 'alt', '' ] ];
    token.children = tokens;
    token.content  = content;

    if (title) {
      attrs.push([ 'title', title ]);
    }
  }

  state.pos = pos;
  state.posMax = max;
  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_inline/link.js":
/*!***********************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_inline/link.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Process [link](<to> "stuff")



var normalizeReference   = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").normalizeReference);
var isSpace              = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isSpace);


module.exports = function link(state, silent) {
  var attrs,
      code,
      label,
      labelEnd,
      labelStart,
      pos,
      res,
      ref,
      token,
      href = '',
      title = '',
      oldPos = state.pos,
      max = state.posMax,
      start = state.pos,
      parseReference = true;

  if (state.src.charCodeAt(state.pos) !== 0x5B/* [ */) { return false; }

  labelStart = state.pos + 1;
  labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) { return false; }

  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
    //
    // Inline link
    //

    // might have found a valid shortcut link, disable reference parsing
    parseReference = false;

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break; }
    }
    if (pos >= max) { return false; }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }

      // [link](  <href>  "title"  )
      //                ^^ skipping these spaces
      start = pos;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0A) { break; }
      }

      // [link](  <href>  "title"  )
      //                  ^^^^^^^ parsing link title
      res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;

        // [link](  <href>  "title"  )
        //                         ^^ skipping these spaces
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 0x0A) { break; }
        }
      }
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      // parsing a valid shortcut link failed, fallback to reference
      parseReference = true;
    }
    pos++;
  }

  if (parseReference) {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') { return false; }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) { label = state.src.slice(labelStart, labelEnd); }

    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;

    token        = state.push('link_open', 'a', 1);
    token.attrs  = attrs = [ [ 'href', href ] ];
    if (title) {
      attrs.push([ 'title', title ]);
    }

    state.md.inline.tokenize(state);

    token        = state.push('link_close', 'a', -1);
  }

  state.pos = pos;
  state.posMax = max;
  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_inline/newline.js":
/*!**************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_inline/newline.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Proceess '\n'



var isSpace = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isSpace);


module.exports = function newline(state, silent) {
  var pmax, max, ws, pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x0A/* \n */) { return false; }

  pmax = state.pending.length - 1;
  max = state.posMax;

  // '  \n' -> hardbreak
  // Lookup in pending chars is bad practice! Don't copy to other rules!
  // Pending string is stored in concat mode, indexed lookups will cause
  // convertion to flat mode.
  if (!silent) {
    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
        // Find whitespaces tail of pending chars.
        ws = pmax - 1;
        while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 0x20) ws--;

        state.pending = state.pending.slice(0, ws);
        state.push('hardbreak', 'br', 0);
      } else {
        state.pending = state.pending.slice(0, -1);
        state.push('softbreak', 'br', 0);
      }

    } else {
      state.push('softbreak', 'br', 0);
    }
  }

  pos++;

  // skip heading spaces for next line
  while (pos < max && isSpace(state.src.charCodeAt(pos))) { pos++; }

  state.pos = pos;
  return true;
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_inline/state_inline.js":
/*!*******************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_inline/state_inline.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Inline parser state




var Token          = __webpack_require__(/*! ../token */ "./node_modules/markdown-it/lib/token.js");
var isWhiteSpace   = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isWhiteSpace);
var isPunctChar    = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isPunctChar);
var isMdAsciiPunct = (__webpack_require__(/*! ../common/utils */ "./node_modules/markdown-it/lib/common/utils.js").isMdAsciiPunct);


function StateInline(src, md, env, outTokens) {
  this.src = src;
  this.env = env;
  this.md = md;
  this.tokens = outTokens;
  this.tokens_meta = Array(outTokens.length);

  this.pos = 0;
  this.posMax = this.src.length;
  this.level = 0;
  this.pending = '';
  this.pendingLevel = 0;

  // Stores { start: end } pairs. Useful for backtrack
  // optimization of pairs parse (emphasis, strikes).
  this.cache = {};

  // List of emphasis-like delimiters for current tag
  this.delimiters = [];

  // Stack of delimiter lists for upper level tags
  this._prev_delimiters = [];

  // backtick length => last seen position
  this.backticks = {};
  this.backticksScanned = false;
}


// Flush pending text
//
StateInline.prototype.pushPending = function () {
  var token = new Token('text', '', 0);
  token.content = this.pending;
  token.level = this.pendingLevel;
  this.tokens.push(token);
  this.pending = '';
  return token;
};


// Push new token to "stream".
// If pending text exists - flush it as text token
//
StateInline.prototype.push = function (type, tag, nesting) {
  if (this.pending) {
    this.pushPending();
  }

  var token = new Token(type, tag, nesting);
  var token_meta = null;

  if (nesting < 0) {
    // closing tag
    this.level--;
    this.delimiters = this._prev_delimiters.pop();
  }

  token.level = this.level;

  if (nesting > 0) {
    // opening tag
    this.level++;
    this._prev_delimiters.push(this.delimiters);
    this.delimiters = [];
    token_meta = { delimiters: this.delimiters };
  }

  this.pendingLevel = this.level;
  this.tokens.push(token);
  this.tokens_meta.push(token_meta);
  return token;
};


// Scan a sequence of emphasis-like markers, and determine whether
// it can start an emphasis sequence or end an emphasis sequence.
//
//  - start - position to scan from (it should point at a valid marker);
//  - canSplitWord - determine if these markers can be found inside a word
//
StateInline.prototype.scanDelims = function (start, canSplitWord) {
  var pos = start, lastChar, nextChar, count, can_open, can_close,
      isLastWhiteSpace, isLastPunctChar,
      isNextWhiteSpace, isNextPunctChar,
      left_flanking = true,
      right_flanking = true,
      max = this.posMax,
      marker = this.src.charCodeAt(start);

  // treat beginning of the line as a whitespace
  lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 0x20;

  while (pos < max && this.src.charCodeAt(pos) === marker) { pos++; }

  count = pos - start;

  // treat end of the line as a whitespace
  nextChar = pos < max ? this.src.charCodeAt(pos) : 0x20;

  isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
  isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

  isLastWhiteSpace = isWhiteSpace(lastChar);
  isNextWhiteSpace = isWhiteSpace(nextChar);

  if (isNextWhiteSpace) {
    left_flanking = false;
  } else if (isNextPunctChar) {
    if (!(isLastWhiteSpace || isLastPunctChar)) {
      left_flanking = false;
    }
  }

  if (isLastWhiteSpace) {
    right_flanking = false;
  } else if (isLastPunctChar) {
    if (!(isNextWhiteSpace || isNextPunctChar)) {
      right_flanking = false;
    }
  }

  if (!canSplitWord) {
    can_open  = left_flanking  && (!right_flanking || isLastPunctChar);
    can_close = right_flanking && (!left_flanking  || isNextPunctChar);
  } else {
    can_open  = left_flanking;
    can_close = right_flanking;
  }

  return {
    can_open:  can_open,
    can_close: can_close,
    length:    count
  };
};


// re-export Token class to use in block rules
StateInline.prototype.Token = Token;


module.exports = StateInline;


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_inline/strikethrough.js":
/*!********************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_inline/strikethrough.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
// ~~strike through~~
//



// Insert each marker as a separate text token, and add it to delimiter list
//
module.exports.tokenize = function strikethrough(state, silent) {
  var i, scanned, token, len, ch,
      start = state.pos,
      marker = state.src.charCodeAt(start);

  if (silent) { return false; }

  if (marker !== 0x7E/* ~ */) { return false; }

  scanned = state.scanDelims(state.pos, true);
  len = scanned.length;
  ch = String.fromCharCode(marker);

  if (len < 2) { return false; }

  if (len % 2) {
    token         = state.push('text', '', 0);
    token.content = ch;
    len--;
  }

  for (i = 0; i < len; i += 2) {
    token         = state.push('text', '', 0);
    token.content = ch + ch;

    state.delimiters.push({
      marker: marker,
      length: 0,     // disable "rule of 3" length checks meant for emphasis
      token:  state.tokens.length - 1,
      end:    -1,
      open:   scanned.can_open,
      close:  scanned.can_close
    });
  }

  state.pos += scanned.length;

  return true;
};


function postProcess(state, delimiters) {
  var i, j,
      startDelim,
      endDelim,
      token,
      loneMarkers = [],
      max = delimiters.length;

  for (i = 0; i < max; i++) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x7E/* ~ */) {
      continue;
    }

    if (startDelim.end === -1) {
      continue;
    }

    endDelim = delimiters[startDelim.end];

    token         = state.tokens[startDelim.token];
    token.type    = 's_open';
    token.tag     = 's';
    token.nesting = 1;
    token.markup  = '~~';
    token.content = '';

    token         = state.tokens[endDelim.token];
    token.type    = 's_close';
    token.tag     = 's';
    token.nesting = -1;
    token.markup  = '~~';
    token.content = '';

    if (state.tokens[endDelim.token - 1].type === 'text' &&
        state.tokens[endDelim.token - 1].content === '~') {

      loneMarkers.push(endDelim.token - 1);
    }
  }

  // If a marker sequence has an odd number of characters, it's splitted
  // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
  // start of the sequence.
  //
  // So, we have to move all those markers after subsequent s_close tags.
  //
  while (loneMarkers.length) {
    i = loneMarkers.pop();
    j = i + 1;

    while (j < state.tokens.length && state.tokens[j].type === 's_close') {
      j++;
    }

    j--;

    if (i !== j) {
      token = state.tokens[j];
      state.tokens[j] = state.tokens[i];
      state.tokens[i] = token;
    }
  }
}


// Walk through delimiter list and replace text tokens with tags
//
module.exports.postProcess = function strikethrough(state) {
  var curr,
      tokens_meta = state.tokens_meta,
      max = state.tokens_meta.length;

  postProcess(state, state.delimiters);

  for (curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess(state, tokens_meta[curr].delimiters);
    }
  }
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_inline/text.js":
/*!***********************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_inline/text.js ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
// Skip text characters for text token, place those to pending buffer
// and increment current pos




// Rule to skip pure text
// '{}$%@~+=:' reserved for extentions

// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~

// !!!! Don't confuse with "Markdown ASCII Punctuation" chars
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
function isTerminatorChar(ch) {
  switch (ch) {
    case 0x0A/* \n */:
    case 0x21/* ! */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2D/* - */:
    case 0x3A/* : */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true;
    default:
      return false;
  }
}

module.exports = function text(state, silent) {
  var pos = state.pos;

  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
    pos++;
  }

  if (pos === state.pos) { return false; }

  if (!silent) { state.pending += state.src.slice(state.pos, pos); }

  state.pos = pos;

  return true;
};

// Alternative implementation, for memory.
//
// It costs 10% of performance, but allows extend terminators list, if place it
// to `ParcerInline` property. Probably, will switch to it sometime, such
// flexibility required.

/*
var TERMINATOR_RE = /[\n!#$%&*+\-:<=>@[\\\]^_`{}~]/;

module.exports = function text(state, silent) {
  var pos = state.pos,
      idx = state.src.slice(pos).search(TERMINATOR_RE);

  // first char is terminator -> empty text
  if (idx === 0) { return false; }

  // no terminator -> text till end of string
  if (idx < 0) {
    if (!silent) { state.pending += state.src.slice(pos); }
    state.pos = state.src.length;
    return true;
  }

  if (!silent) { state.pending += state.src.slice(pos, pos + idx); }

  state.pos += idx;

  return true;
};*/


/***/ }),

/***/ "./node_modules/markdown-it/lib/rules_inline/text_collapse.js":
/*!********************************************************************!*\
  !*** ./node_modules/markdown-it/lib/rules_inline/text_collapse.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
// Clean up tokens after emphasis and strikethrough postprocessing:
// merge adjacent text nodes into one and re-calculate all token levels
//
// This is necessary because initially emphasis delimiter markers (*, _, ~)
// are treated as their own separate text tokens. Then emphasis rule either
// leaves them as text (needed to merge with adjacent text) or turns them
// into opening/closing tags (which messes up levels inside).
//



module.exports = function text_collapse(state) {
  var curr, last,
      level = 0,
      tokens = state.tokens,
      max = state.tokens.length;

  for (curr = last = 0; curr < max; curr++) {
    // re-calculate levels after emphasis/strikethrough turns some text nodes
    // into opening/closing tags
    if (tokens[curr].nesting < 0) level--; // closing tag
    tokens[curr].level = level;
    if (tokens[curr].nesting > 0) level++; // opening tag

    if (tokens[curr].type === 'text' &&
        curr + 1 < max &&
        tokens[curr + 1].type === 'text') {

      // collapse two adjacent text nodes
      tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
    } else {
      if (curr !== last) { tokens[last] = tokens[curr]; }

      last++;
    }
  }

  if (curr !== last) {
    tokens.length = last;
  }
};


/***/ }),

/***/ "./node_modules/markdown-it/lib/token.js":
/*!***********************************************!*\
  !*** ./node_modules/markdown-it/lib/token.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
// Token class




/**
 * class Token
 **/

/**
 * new Token(type, tag, nesting)
 *
 * Create new token and fill passed properties.
 **/
function Token(type, tag, nesting) {
  /**
   * Token#type -> String
   *
   * Type of the token (string, e.g. "paragraph_open")
   **/
  this.type     = type;

  /**
   * Token#tag -> String
   *
   * html tag name, e.g. "p"
   **/
  this.tag      = tag;

  /**
   * Token#attrs -> Array
   *
   * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
   **/
  this.attrs    = null;

  /**
   * Token#map -> Array
   *
   * Source map info. Format: `[ line_begin, line_end ]`
   **/
  this.map      = null;

  /**
   * Token#nesting -> Number
   *
   * Level change (number in {-1, 0, 1} set), where:
   *
   * -  `1` means the tag is opening
   * -  `0` means the tag is self-closing
   * - `-1` means the tag is closing
   **/
  this.nesting  = nesting;

  /**
   * Token#level -> Number
   *
   * nesting level, the same as `state.level`
   **/
  this.level    = 0;

  /**
   * Token#children -> Array
   *
   * An array of child nodes (inline and img tokens)
   **/
  this.children = null;

  /**
   * Token#content -> String
   *
   * In a case of self-closing tag (code, html, fence, etc.),
   * it has contents of this tag.
   **/
  this.content  = '';

  /**
   * Token#markup -> String
   *
   * '*' or '_' for emphasis, fence string for fence, etc.
   **/
  this.markup   = '';

  /**
   * Token#info -> String
   *
   * Additional information:
   *
   * - Info string for "fence" tokens
   * - The value "auto" for autolink "link_open" and "link_close" tokens
   * - The string value of the item marker for ordered-list "list_item_open" tokens
   **/
  this.info     = '';

  /**
   * Token#meta -> Object
   *
   * A place for plugins to store an arbitrary data
   **/
  this.meta     = null;

  /**
   * Token#block -> Boolean
   *
   * True for block-level tokens, false for inline tokens.
   * Used in renderer to calculate line breaks
   **/
  this.block    = false;

  /**
   * Token#hidden -> Boolean
   *
   * If it's true, ignore this element when rendering. Used for tight lists
   * to hide paragraphs.
   **/
  this.hidden   = false;
}


/**
 * Token.attrIndex(name) -> Number
 *
 * Search attribute index by name.
 **/
Token.prototype.attrIndex = function attrIndex(name) {
  var attrs, i, len;

  if (!this.attrs) { return -1; }

  attrs = this.attrs;

  for (i = 0, len = attrs.length; i < len; i++) {
    if (attrs[i][0] === name) { return i; }
  }
  return -1;
};


/**
 * Token.attrPush(attrData)
 *
 * Add `[ name, value ]` attribute to list. Init attrs if necessary
 **/
Token.prototype.attrPush = function attrPush(attrData) {
  if (this.attrs) {
    this.attrs.push(attrData);
  } else {
    this.attrs = [ attrData ];
  }
};


/**
 * Token.attrSet(name, value)
 *
 * Set `name` attribute to `value`. Override old value if exists.
 **/
Token.prototype.attrSet = function attrSet(name, value) {
  var idx = this.attrIndex(name),
      attrData = [ name, value ];

  if (idx < 0) {
    this.attrPush(attrData);
  } else {
    this.attrs[idx] = attrData;
  }
};


/**
 * Token.attrGet(name)
 *
 * Get the value of attribute `name`, or null if it does not exist.
 **/
Token.prototype.attrGet = function attrGet(name) {
  var idx = this.attrIndex(name), value = null;
  if (idx >= 0) {
    value = this.attrs[idx][1];
  }
  return value;
};


/**
 * Token.attrJoin(name, value)
 *
 * Join value to existing attribute via space. Or create new attribute if not
 * exists. Useful to operate with token classes.
 **/
Token.prototype.attrJoin = function attrJoin(name, value) {
  var idx = this.attrIndex(name);

  if (idx < 0) {
    this.attrPush([ name, value ]);
  } else {
    this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
  }
};


module.exports = Token;


/***/ }),

/***/ "./node_modules/match-at/lib/matchAt.js":
/*!**********************************************!*\
  !*** ./node_modules/match-at/lib/matchAt.js ***!
  \**********************************************/
/***/ ((module) => {

function getRelocatable(re) {
  // In the future, this could use a WeakMap instead of an expando.
  if (!re.__matchAtRelocatable) {
    // Disjunctions are the lowest-precedence operator, so we can make any
    // pattern match the empty string by appending `|()` to it:
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-patterns
    var source = re.source + '|()';

    // We always make the new regex global.
    var flags = 'g' + (re.ignoreCase ? 'i' : '') + (re.multiline ? 'm' : '') + (re.unicode ? 'u' : '')
    // sticky (/.../y) doesn't make sense in conjunction with our relocation
    // logic, so we ignore it here.
    ;

    re.__matchAtRelocatable = new RegExp(source, flags);
  }
  return re.__matchAtRelocatable;
}

function matchAt(re, str, pos) {
  if (re.global || re.sticky) {
    throw new Error('matchAt(...): Only non-global regexes are supported');
  }
  var reloc = getRelocatable(re);
  reloc.lastIndex = pos;
  var match = reloc.exec(str);
  // Last capturing group is our sentinel that indicates whether the regex
  // matched at the given location.
  if (match[match.length - 1] == null) {
    // Original regex matched.
    match.length = match.length - 1;
    return match;
  } else {
    return null;
  }
}

module.exports = matchAt;

/***/ }),

/***/ "./node_modules/mdurl/decode.js":
/*!**************************************!*\
  !*** ./node_modules/mdurl/decode.js ***!
  \**************************************/
/***/ ((module) => {

"use strict";




/* eslint-disable no-bitwise */

var decodeCache = {};

function getDecodeCache(exclude) {
  var i, ch, cache = decodeCache[exclude];
  if (cache) { return cache; }

  cache = decodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);
    cache.push(ch);
  }

  for (i = 0; i < exclude.length; i++) {
    ch = exclude.charCodeAt(i);
    cache[ch] = '%' + ('0' + ch.toString(16).toUpperCase()).slice(-2);
  }

  return cache;
}


// Decode percent-encoded string.
//
function decode(string, exclude) {
  var cache;

  if (typeof exclude !== 'string') {
    exclude = decode.defaultChars;
  }

  cache = getDecodeCache(exclude);

  return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
    var i, l, b1, b2, b3, b4, chr,
        result = '';

    for (i = 0, l = seq.length; i < l; i += 3) {
      b1 = parseInt(seq.slice(i + 1, i + 3), 16);

      if (b1 < 0x80) {
        result += cache[b1];
        continue;
      }

      if ((b1 & 0xE0) === 0xC0 && (i + 3 < l)) {
        // 110xxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);

        if ((b2 & 0xC0) === 0x80) {
          chr = ((b1 << 6) & 0x7C0) | (b2 & 0x3F);

          if (chr < 0x80) {
            result += '\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 3;
          continue;
        }
      }

      if ((b1 & 0xF0) === 0xE0 && (i + 6 < l)) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
          chr = ((b1 << 12) & 0xF000) | ((b2 << 6) & 0xFC0) | (b3 & 0x3F);

          if (chr < 0x800 || (chr >= 0xD800 && chr <= 0xDFFF)) {
            result += '\ufffd\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 6;
          continue;
        }
      }

      if ((b1 & 0xF8) === 0xF0 && (i + 9 < l)) {
        // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);
        b4 = parseInt(seq.slice(i + 10, i + 12), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
          chr = ((b1 << 18) & 0x1C0000) | ((b2 << 12) & 0x3F000) | ((b3 << 6) & 0xFC0) | (b4 & 0x3F);

          if (chr < 0x10000 || chr > 0x10FFFF) {
            result += '\ufffd\ufffd\ufffd\ufffd';
          } else {
            chr -= 0x10000;
            result += String.fromCharCode(0xD800 + (chr >> 10), 0xDC00 + (chr & 0x3FF));
          }

          i += 9;
          continue;
        }
      }

      result += '\ufffd';
    }

    return result;
  });
}


decode.defaultChars   = ';/?:@&=+$,#';
decode.componentChars = '';


module.exports = decode;


/***/ }),

/***/ "./node_modules/mdurl/encode.js":
/*!**************************************!*\
  !*** ./node_modules/mdurl/encode.js ***!
  \**************************************/
/***/ ((module) => {

"use strict";




var encodeCache = {};


// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) { return cache; }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
}


// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
function encode(string, exclude, keepEscaped) {
  var i, l, code, nextCode, cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped  = exclude;
    exclude = encode.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }
      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";


module.exports = encode;


/***/ }),

/***/ "./node_modules/mdurl/format.js":
/*!**************************************!*\
  !*** ./node_modules/mdurl/format.js ***!
  \**************************************/
/***/ ((module) => {

"use strict";




module.exports = function format(url) {
  var result = '';

  result += url.protocol || '';
  result += url.slashes ? '//' : '';
  result += url.auth ? url.auth + '@' : '';

  if (url.hostname && url.hostname.indexOf(':') !== -1) {
    // ipv6 address
    result += '[' + url.hostname + ']';
  } else {
    result += url.hostname || '';
  }

  result += url.port ? ':' + url.port : '';
  result += url.pathname || '';
  result += url.search || '';
  result += url.hash || '';

  return result;
};


/***/ }),

/***/ "./node_modules/mdurl/index.js":
/*!*************************************!*\
  !*** ./node_modules/mdurl/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



module.exports.encode = __webpack_require__(/*! ./encode */ "./node_modules/mdurl/encode.js");
module.exports.decode = __webpack_require__(/*! ./decode */ "./node_modules/mdurl/decode.js");
module.exports.format = __webpack_require__(/*! ./format */ "./node_modules/mdurl/format.js");
module.exports.parse = __webpack_require__(/*! ./parse */ "./node_modules/mdurl/parse.js");


/***/ }),

/***/ "./node_modules/mdurl/parse.js":
/*!*************************************!*\
  !*** ./node_modules/mdurl/parse.js ***!
  \*************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



//
// Changes from joyent/node:
//
// 1. No leading slash in paths,
//    e.g. in `url.parse('http://foo?bar')` pathname is ``, not `/`
//
// 2. Backslashes are not replaced with slashes,
//    so `http:\\example.org\` is treated like a relative path
//
// 3. Trailing colon is treated like a part of the path,
//    i.e. in `http://example.org:foo` pathname is `:foo`
//
// 4. Nothing is URL-encoded in the resulting object,
//    (in joyent/node some chars in auth and paths are encoded)
//
// 5. `url.parse()` does not have `parseQueryString` argument
//
// 6. Removed extraneous result properties: `host`, `path`, `query`, etc.,
//    which can be constructed using other parts of the url.
//


function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.pathname = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = [ '<', '>', '"', '`', ' ', '\r', '\n', '\t' ],

    // RFC 2396: characters not allowed for various reasons.
    unwise = [ '{', '}', '|', '\\', '^', '`' ].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = [ '\'' ].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = [ '%', '/', '?', ';', '#' ].concat(autoEscape),
    hostEndingChars = [ '/', '?', '#' ],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    /* eslint-disable no-script-url */
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    };
    /* eslint-enable no-script-url */

function urlParse(url, slashesDenoteHost) {
  if (url && url instanceof Url) { return url; }

  var u = new Url();
  u.parse(url, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, slashesDenoteHost) {
  var i, l, lowerProto, hec, slashes,
      rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    lowerProto = proto.toLowerCase();
    this.protocol = proto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (i = 0; i < hostEndingChars.length; i++) {
      hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = auth;
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (i = 0; i < nonHostChars.length; i++) {
      hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1) {
      hostEnd = rest.length;
    }

    if (rest[hostEnd - 1] === ':') { hostEnd--; }
    var host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost(host);

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) { continue; }
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    }

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
    }
  }

  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    rest = rest.slice(0, qm);
  }
  if (rest) { this.pathname = rest; }
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '';
  }

  return this;
};

Url.prototype.parseHost = function(host) {
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) { this.hostname = host; }
};

module.exports = urlParse;


/***/ }),

/***/ "./node_modules/punycode/punycode.es6.js":
/*!***********************************************!*\
  !*** ./node_modules/punycode/punycode.es6.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "encode": () => (/* binding */ encode),
/* harmony export */   "toASCII": () => (/* binding */ toASCII),
/* harmony export */   "toUnicode": () => (/* binding */ toUnicode),
/* harmony export */   "ucs2decode": () => (/* binding */ ucs2decode),
/* harmony export */   "ucs2encode": () => (/* binding */ ucs2encode)
/* harmony export */ });


/** Highest positive signed 32-bit float value */
const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
const base = 36;
const tMin = 1;
const tMax = 26;
const skew = 38;
const damp = 700;
const initialBias = 72;
const initialN = 128; // 0x80
const delimiter = '-'; // '\x2D'

/** Regular expressions */
const regexPunycode = /^xn--/;
const regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
const errors = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
const baseMinusTMin = base - tMin;
const floor = Math.floor;
const stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error(type) {
	throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, fn) {
	const result = [];
	let length = array.length;
	while (length--) {
		result[length] = fn(array[length]);
	}
	return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {Array} A new string of characters returned by the callback
 * function.
 */
function mapDomain(string, fn) {
	const parts = string.split('@');
	let result = '';
	if (parts.length > 1) {
		// In email addresses, only the domain name should be punycoded. Leave
		// the local part (i.e. everything up to `@`) intact.
		result = parts[0] + '@';
		string = parts[1];
	}
	// Avoid `split(regex)` for IE8 compatibility. See #17.
	string = string.replace(regexSeparators, '\x2E');
	const labels = string.split('.');
	const encoded = map(labels, fn).join('.');
	return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
	const output = [];
	let counter = 0;
	const length = string.length;
	while (counter < length) {
		const value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// It's a high surrogate, and there is a next character.
			const extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// It's an unmatched surrogate; only append this code unit, in case the
				// next code unit is the high surrogate of a surrogate pair.
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
const ucs2encode = array => String.fromCodePoint(...array);

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
const basicToDigit = function(codePoint) {
	if (codePoint - 0x30 < 0x0A) {
		return codePoint - 0x16;
	}
	if (codePoint - 0x41 < 0x1A) {
		return codePoint - 0x41;
	}
	if (codePoint - 0x61 < 0x1A) {
		return codePoint - 0x61;
	}
	return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
const digitToBasic = function(digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
const adapt = function(delta, numPoints, firstTime) {
	let k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
const decode = function(input) {
	// Don't use UCS-2.
	const output = [];
	const inputLength = input.length;
	let i = 0;
	let n = initialN;
	let bias = initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	let basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (let j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		let oldi = i;
		for (let w = 1, k = base; /* no condition */; k += base) {

			if (index >= inputLength) {
				error('invalid-input');
			}

			const digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base || digit > floor((maxInt - i) / w)) {
				error('overflow');
			}

			i += digit * w;
			const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

			if (digit < t) {
				break;
			}

			const baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error('overflow');
			}

			w *= baseMinusT;

		}

		const out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);

	}

	return String.fromCodePoint(...output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
const encode = function(input) {
	const output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	input = ucs2decode(input);

	// Cache the length.
	let inputLength = input.length;

	// Initialize the state.
	let n = initialN;
	let delta = 0;
	let bias = initialBias;

	// Handle the basic code points.
	for (const currentValue of input) {
		if (currentValue < 0x80) {
			output.push(stringFromCharCode(currentValue));
		}
	}

	let basicLength = output.length;
	let handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		let m = maxInt;
		for (const currentValue of input) {
			if (currentValue >= n && currentValue < m) {
				m = currentValue;
			}
		}

		// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
		// but guard against overflow.
		const handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			error('overflow');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		for (const currentValue of input) {
			if (currentValue < n && ++delta > maxInt) {
				error('overflow');
			}
			if (currentValue == n) {
				// Represent delta as a generalized variable-length integer.
				let q = delta;
				for (let k = base; /* no condition */; k += base) {
					const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
					if (q < t) {
						break;
					}
					const qMinusT = q - t;
					const baseMinusT = base - t;
					output.push(
						stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
					);
					q = floor(qMinusT / baseMinusT);
				}

				output.push(stringFromCharCode(digitToBasic(q, 0)));
				bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
				delta = 0;
				++handledCPCount;
			}
		}

		++delta;
		++n;

	}
	return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
const toUnicode = function(input) {
	return mapDomain(input, function(string) {
		return regexPunycode.test(string)
			? decode(string.slice(4).toLowerCase())
			: string;
	});
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
const toASCII = function(input) {
	return mapDomain(input, function(string) {
		return regexNonASCII.test(string)
			? 'xn--' + encode(string)
			: string;
	});
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
const punycode = {
	/**
	 * A string representing the current Punycode.js version number.
	 * @memberOf punycode
	 * @type String
	 */
	'version': '2.1.0',
	/**
	 * An object of methods to convert from JavaScript's internal character
	 * representation (UCS-2) to Unicode code points, and back.
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode
	 * @type Object
	 */
	'ucs2': {
		'decode': ucs2decode,
		'encode': ucs2encode
	},
	'decode': decode,
	'encode': encode,
	'toASCII': toASCII,
	'toUnicode': toUnicode
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (punycode);


/***/ }),

/***/ "./node_modules/font-awesome/css/font-awesome.css":
/*!********************************************************!*\
  !*** ./node_modules/font-awesome/css/font-awesome.css ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_font_awesome_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js!./font-awesome.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/font-awesome/css/font-awesome.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_font_awesome_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_font_awesome_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_font_awesome_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_font_awesome_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./public/less/index-page.less":
/*!*************************************!*\
  !*** ./public/less/index-page.less ***!
  \*************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_page_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/less-loader/dist/cjs.js!./index-page.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./public/less/index-page.less");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_page_less__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_page_less__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_page_less__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_page_less__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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

/***/ "./node_modules/uc.micro/categories/Cc/regex.js":
/*!******************************************************!*\
  !*** ./node_modules/uc.micro/categories/Cc/regex.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports=/[\0-\x1F\x7F-\x9F]/

/***/ }),

/***/ "./node_modules/uc.micro/categories/Cf/regex.js":
/*!******************************************************!*\
  !*** ./node_modules/uc.micro/categories/Cf/regex.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/

/***/ }),

/***/ "./node_modules/uc.micro/categories/P/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uc.micro/categories/P/regex.js ***!
  \*****************************************************/
/***/ ((module) => {

module.exports=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/

/***/ }),

/***/ "./node_modules/uc.micro/categories/Z/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uc.micro/categories/Z/regex.js ***!
  \*****************************************************/
/***/ ((module) => {

module.exports=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/

/***/ }),

/***/ "./node_modules/uc.micro/index.js":
/*!****************************************!*\
  !*** ./node_modules/uc.micro/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.Any = __webpack_require__(/*! ./properties/Any/regex */ "./node_modules/uc.micro/properties/Any/regex.js");
exports.Cc = __webpack_require__(/*! ./categories/Cc/regex */ "./node_modules/uc.micro/categories/Cc/regex.js");
exports.Cf = __webpack_require__(/*! ./categories/Cf/regex */ "./node_modules/uc.micro/categories/Cf/regex.js");
exports.P = __webpack_require__(/*! ./categories/P/regex */ "./node_modules/uc.micro/categories/P/regex.js");
exports.Z = __webpack_require__(/*! ./categories/Z/regex */ "./node_modules/uc.micro/categories/Z/regex.js");


/***/ }),

/***/ "./node_modules/uc.micro/properties/Any/regex.js":
/*!*******************************************************!*\
  !*** ./node_modules/uc.micro/properties/Any/regex.js ***!
  \*******************************************************/
/***/ ((module) => {

module.exports=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.eot":
/*!*****************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.eot ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "8b43027f47b20503057d.eot";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0":
/*!*************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "8b43027f47b20503057d.eot?v=4.7.0";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0":
/*!*************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "1e59d2330b4c6deb84b3.ttf?v=4.7.0";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0":
/*!***************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0 ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "20fd1704ea223900efa9.woff2?v=4.7.0";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0":
/*!**************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0 ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f691f37e57f04c152e23.woff?v=4.7.0";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0":
/*!*************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "eb9284c27dc29ec94da0.svg?v=4.7.0";

/***/ }),

/***/ "./node_modules/entities/lib/maps/entities.json":
/*!******************************************************!*\
  !*** ./node_modules/entities/lib/maps/entities.json ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Aacute":"Á","aacute":"á","Abreve":"Ă","abreve":"ă","ac":"∾","acd":"∿","acE":"∾̳","Acirc":"Â","acirc":"â","acute":"´","Acy":"А","acy":"а","AElig":"Æ","aelig":"æ","af":"⁡","Afr":"𝔄","afr":"𝔞","Agrave":"À","agrave":"à","alefsym":"ℵ","aleph":"ℵ","Alpha":"Α","alpha":"α","Amacr":"Ā","amacr":"ā","amalg":"⨿","amp":"&","AMP":"&","andand":"⩕","And":"⩓","and":"∧","andd":"⩜","andslope":"⩘","andv":"⩚","ang":"∠","ange":"⦤","angle":"∠","angmsdaa":"⦨","angmsdab":"⦩","angmsdac":"⦪","angmsdad":"⦫","angmsdae":"⦬","angmsdaf":"⦭","angmsdag":"⦮","angmsdah":"⦯","angmsd":"∡","angrt":"∟","angrtvb":"⊾","angrtvbd":"⦝","angsph":"∢","angst":"Å","angzarr":"⍼","Aogon":"Ą","aogon":"ą","Aopf":"𝔸","aopf":"𝕒","apacir":"⩯","ap":"≈","apE":"⩰","ape":"≊","apid":"≋","apos":"\'","ApplyFunction":"⁡","approx":"≈","approxeq":"≊","Aring":"Å","aring":"å","Ascr":"𝒜","ascr":"𝒶","Assign":"≔","ast":"*","asymp":"≈","asympeq":"≍","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","awconint":"∳","awint":"⨑","backcong":"≌","backepsilon":"϶","backprime":"‵","backsim":"∽","backsimeq":"⋍","Backslash":"∖","Barv":"⫧","barvee":"⊽","barwed":"⌅","Barwed":"⌆","barwedge":"⌅","bbrk":"⎵","bbrktbrk":"⎶","bcong":"≌","Bcy":"Б","bcy":"б","bdquo":"„","becaus":"∵","because":"∵","Because":"∵","bemptyv":"⦰","bepsi":"϶","bernou":"ℬ","Bernoullis":"ℬ","Beta":"Β","beta":"β","beth":"ℶ","between":"≬","Bfr":"𝔅","bfr":"𝔟","bigcap":"⋂","bigcirc":"◯","bigcup":"⋃","bigodot":"⨀","bigoplus":"⨁","bigotimes":"⨂","bigsqcup":"⨆","bigstar":"★","bigtriangledown":"▽","bigtriangleup":"△","biguplus":"⨄","bigvee":"⋁","bigwedge":"⋀","bkarow":"⤍","blacklozenge":"⧫","blacksquare":"▪","blacktriangle":"▴","blacktriangledown":"▾","blacktriangleleft":"◂","blacktriangleright":"▸","blank":"␣","blk12":"▒","blk14":"░","blk34":"▓","block":"█","bne":"=⃥","bnequiv":"≡⃥","bNot":"⫭","bnot":"⌐","Bopf":"𝔹","bopf":"𝕓","bot":"⊥","bottom":"⊥","bowtie":"⋈","boxbox":"⧉","boxdl":"┐","boxdL":"╕","boxDl":"╖","boxDL":"╗","boxdr":"┌","boxdR":"╒","boxDr":"╓","boxDR":"╔","boxh":"─","boxH":"═","boxhd":"┬","boxHd":"╤","boxhD":"╥","boxHD":"╦","boxhu":"┴","boxHu":"╧","boxhU":"╨","boxHU":"╩","boxminus":"⊟","boxplus":"⊞","boxtimes":"⊠","boxul":"┘","boxuL":"╛","boxUl":"╜","boxUL":"╝","boxur":"└","boxuR":"╘","boxUr":"╙","boxUR":"╚","boxv":"│","boxV":"║","boxvh":"┼","boxvH":"╪","boxVh":"╫","boxVH":"╬","boxvl":"┤","boxvL":"╡","boxVl":"╢","boxVL":"╣","boxvr":"├","boxvR":"╞","boxVr":"╟","boxVR":"╠","bprime":"‵","breve":"˘","Breve":"˘","brvbar":"¦","bscr":"𝒷","Bscr":"ℬ","bsemi":"⁏","bsim":"∽","bsime":"⋍","bsolb":"⧅","bsol":"\\\\","bsolhsub":"⟈","bull":"•","bullet":"•","bump":"≎","bumpE":"⪮","bumpe":"≏","Bumpeq":"≎","bumpeq":"≏","Cacute":"Ć","cacute":"ć","capand":"⩄","capbrcup":"⩉","capcap":"⩋","cap":"∩","Cap":"⋒","capcup":"⩇","capdot":"⩀","CapitalDifferentialD":"ⅅ","caps":"∩︀","caret":"⁁","caron":"ˇ","Cayleys":"ℭ","ccaps":"⩍","Ccaron":"Č","ccaron":"č","Ccedil":"Ç","ccedil":"ç","Ccirc":"Ĉ","ccirc":"ĉ","Cconint":"∰","ccups":"⩌","ccupssm":"⩐","Cdot":"Ċ","cdot":"ċ","cedil":"¸","Cedilla":"¸","cemptyv":"⦲","cent":"¢","centerdot":"·","CenterDot":"·","cfr":"𝔠","Cfr":"ℭ","CHcy":"Ч","chcy":"ч","check":"✓","checkmark":"✓","Chi":"Χ","chi":"χ","circ":"ˆ","circeq":"≗","circlearrowleft":"↺","circlearrowright":"↻","circledast":"⊛","circledcirc":"⊚","circleddash":"⊝","CircleDot":"⊙","circledR":"®","circledS":"Ⓢ","CircleMinus":"⊖","CirclePlus":"⊕","CircleTimes":"⊗","cir":"○","cirE":"⧃","cire":"≗","cirfnint":"⨐","cirmid":"⫯","cirscir":"⧂","ClockwiseContourIntegral":"∲","CloseCurlyDoubleQuote":"”","CloseCurlyQuote":"’","clubs":"♣","clubsuit":"♣","colon":":","Colon":"∷","Colone":"⩴","colone":"≔","coloneq":"≔","comma":",","commat":"@","comp":"∁","compfn":"∘","complement":"∁","complexes":"ℂ","cong":"≅","congdot":"⩭","Congruent":"≡","conint":"∮","Conint":"∯","ContourIntegral":"∮","copf":"𝕔","Copf":"ℂ","coprod":"∐","Coproduct":"∐","copy":"©","COPY":"©","copysr":"℗","CounterClockwiseContourIntegral":"∳","crarr":"↵","cross":"✗","Cross":"⨯","Cscr":"𝒞","cscr":"𝒸","csub":"⫏","csube":"⫑","csup":"⫐","csupe":"⫒","ctdot":"⋯","cudarrl":"⤸","cudarrr":"⤵","cuepr":"⋞","cuesc":"⋟","cularr":"↶","cularrp":"⤽","cupbrcap":"⩈","cupcap":"⩆","CupCap":"≍","cup":"∪","Cup":"⋓","cupcup":"⩊","cupdot":"⊍","cupor":"⩅","cups":"∪︀","curarr":"↷","curarrm":"⤼","curlyeqprec":"⋞","curlyeqsucc":"⋟","curlyvee":"⋎","curlywedge":"⋏","curren":"¤","curvearrowleft":"↶","curvearrowright":"↷","cuvee":"⋎","cuwed":"⋏","cwconint":"∲","cwint":"∱","cylcty":"⌭","dagger":"†","Dagger":"‡","daleth":"ℸ","darr":"↓","Darr":"↡","dArr":"⇓","dash":"‐","Dashv":"⫤","dashv":"⊣","dbkarow":"⤏","dblac":"˝","Dcaron":"Ď","dcaron":"ď","Dcy":"Д","dcy":"д","ddagger":"‡","ddarr":"⇊","DD":"ⅅ","dd":"ⅆ","DDotrahd":"⤑","ddotseq":"⩷","deg":"°","Del":"∇","Delta":"Δ","delta":"δ","demptyv":"⦱","dfisht":"⥿","Dfr":"𝔇","dfr":"𝔡","dHar":"⥥","dharl":"⇃","dharr":"⇂","DiacriticalAcute":"´","DiacriticalDot":"˙","DiacriticalDoubleAcute":"˝","DiacriticalGrave":"`","DiacriticalTilde":"˜","diam":"⋄","diamond":"⋄","Diamond":"⋄","diamondsuit":"♦","diams":"♦","die":"¨","DifferentialD":"ⅆ","digamma":"ϝ","disin":"⋲","div":"÷","divide":"÷","divideontimes":"⋇","divonx":"⋇","DJcy":"Ђ","djcy":"ђ","dlcorn":"⌞","dlcrop":"⌍","dollar":"$","Dopf":"𝔻","dopf":"𝕕","Dot":"¨","dot":"˙","DotDot":"⃜","doteq":"≐","doteqdot":"≑","DotEqual":"≐","dotminus":"∸","dotplus":"∔","dotsquare":"⊡","doublebarwedge":"⌆","DoubleContourIntegral":"∯","DoubleDot":"¨","DoubleDownArrow":"⇓","DoubleLeftArrow":"⇐","DoubleLeftRightArrow":"⇔","DoubleLeftTee":"⫤","DoubleLongLeftArrow":"⟸","DoubleLongLeftRightArrow":"⟺","DoubleLongRightArrow":"⟹","DoubleRightArrow":"⇒","DoubleRightTee":"⊨","DoubleUpArrow":"⇑","DoubleUpDownArrow":"⇕","DoubleVerticalBar":"∥","DownArrowBar":"⤓","downarrow":"↓","DownArrow":"↓","Downarrow":"⇓","DownArrowUpArrow":"⇵","DownBreve":"̑","downdownarrows":"⇊","downharpoonleft":"⇃","downharpoonright":"⇂","DownLeftRightVector":"⥐","DownLeftTeeVector":"⥞","DownLeftVectorBar":"⥖","DownLeftVector":"↽","DownRightTeeVector":"⥟","DownRightVectorBar":"⥗","DownRightVector":"⇁","DownTeeArrow":"↧","DownTee":"⊤","drbkarow":"⤐","drcorn":"⌟","drcrop":"⌌","Dscr":"𝒟","dscr":"𝒹","DScy":"Ѕ","dscy":"ѕ","dsol":"⧶","Dstrok":"Đ","dstrok":"đ","dtdot":"⋱","dtri":"▿","dtrif":"▾","duarr":"⇵","duhar":"⥯","dwangle":"⦦","DZcy":"Џ","dzcy":"џ","dzigrarr":"⟿","Eacute":"É","eacute":"é","easter":"⩮","Ecaron":"Ě","ecaron":"ě","Ecirc":"Ê","ecirc":"ê","ecir":"≖","ecolon":"≕","Ecy":"Э","ecy":"э","eDDot":"⩷","Edot":"Ė","edot":"ė","eDot":"≑","ee":"ⅇ","efDot":"≒","Efr":"𝔈","efr":"𝔢","eg":"⪚","Egrave":"È","egrave":"è","egs":"⪖","egsdot":"⪘","el":"⪙","Element":"∈","elinters":"⏧","ell":"ℓ","els":"⪕","elsdot":"⪗","Emacr":"Ē","emacr":"ē","empty":"∅","emptyset":"∅","EmptySmallSquare":"◻","emptyv":"∅","EmptyVerySmallSquare":"▫","emsp13":" ","emsp14":" ","emsp":" ","ENG":"Ŋ","eng":"ŋ","ensp":" ","Eogon":"Ę","eogon":"ę","Eopf":"𝔼","eopf":"𝕖","epar":"⋕","eparsl":"⧣","eplus":"⩱","epsi":"ε","Epsilon":"Ε","epsilon":"ε","epsiv":"ϵ","eqcirc":"≖","eqcolon":"≕","eqsim":"≂","eqslantgtr":"⪖","eqslantless":"⪕","Equal":"⩵","equals":"=","EqualTilde":"≂","equest":"≟","Equilibrium":"⇌","equiv":"≡","equivDD":"⩸","eqvparsl":"⧥","erarr":"⥱","erDot":"≓","escr":"ℯ","Escr":"ℰ","esdot":"≐","Esim":"⩳","esim":"≂","Eta":"Η","eta":"η","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","euro":"€","excl":"!","exist":"∃","Exists":"∃","expectation":"ℰ","exponentiale":"ⅇ","ExponentialE":"ⅇ","fallingdotseq":"≒","Fcy":"Ф","fcy":"ф","female":"♀","ffilig":"ﬃ","fflig":"ﬀ","ffllig":"ﬄ","Ffr":"𝔉","ffr":"𝔣","filig":"ﬁ","FilledSmallSquare":"◼","FilledVerySmallSquare":"▪","fjlig":"fj","flat":"♭","fllig":"ﬂ","fltns":"▱","fnof":"ƒ","Fopf":"𝔽","fopf":"𝕗","forall":"∀","ForAll":"∀","fork":"⋔","forkv":"⫙","Fouriertrf":"ℱ","fpartint":"⨍","frac12":"½","frac13":"⅓","frac14":"¼","frac15":"⅕","frac16":"⅙","frac18":"⅛","frac23":"⅔","frac25":"⅖","frac34":"¾","frac35":"⅗","frac38":"⅜","frac45":"⅘","frac56":"⅚","frac58":"⅝","frac78":"⅞","frasl":"⁄","frown":"⌢","fscr":"𝒻","Fscr":"ℱ","gacute":"ǵ","Gamma":"Γ","gamma":"γ","Gammad":"Ϝ","gammad":"ϝ","gap":"⪆","Gbreve":"Ğ","gbreve":"ğ","Gcedil":"Ģ","Gcirc":"Ĝ","gcirc":"ĝ","Gcy":"Г","gcy":"г","Gdot":"Ġ","gdot":"ġ","ge":"≥","gE":"≧","gEl":"⪌","gel":"⋛","geq":"≥","geqq":"≧","geqslant":"⩾","gescc":"⪩","ges":"⩾","gesdot":"⪀","gesdoto":"⪂","gesdotol":"⪄","gesl":"⋛︀","gesles":"⪔","Gfr":"𝔊","gfr":"𝔤","gg":"≫","Gg":"⋙","ggg":"⋙","gimel":"ℷ","GJcy":"Ѓ","gjcy":"ѓ","gla":"⪥","gl":"≷","glE":"⪒","glj":"⪤","gnap":"⪊","gnapprox":"⪊","gne":"⪈","gnE":"≩","gneq":"⪈","gneqq":"≩","gnsim":"⋧","Gopf":"𝔾","gopf":"𝕘","grave":"`","GreaterEqual":"≥","GreaterEqualLess":"⋛","GreaterFullEqual":"≧","GreaterGreater":"⪢","GreaterLess":"≷","GreaterSlantEqual":"⩾","GreaterTilde":"≳","Gscr":"𝒢","gscr":"ℊ","gsim":"≳","gsime":"⪎","gsiml":"⪐","gtcc":"⪧","gtcir":"⩺","gt":">","GT":">","Gt":"≫","gtdot":"⋗","gtlPar":"⦕","gtquest":"⩼","gtrapprox":"⪆","gtrarr":"⥸","gtrdot":"⋗","gtreqless":"⋛","gtreqqless":"⪌","gtrless":"≷","gtrsim":"≳","gvertneqq":"≩︀","gvnE":"≩︀","Hacek":"ˇ","hairsp":" ","half":"½","hamilt":"ℋ","HARDcy":"Ъ","hardcy":"ъ","harrcir":"⥈","harr":"↔","hArr":"⇔","harrw":"↭","Hat":"^","hbar":"ℏ","Hcirc":"Ĥ","hcirc":"ĥ","hearts":"♥","heartsuit":"♥","hellip":"…","hercon":"⊹","hfr":"𝔥","Hfr":"ℌ","HilbertSpace":"ℋ","hksearow":"⤥","hkswarow":"⤦","hoarr":"⇿","homtht":"∻","hookleftarrow":"↩","hookrightarrow":"↪","hopf":"𝕙","Hopf":"ℍ","horbar":"―","HorizontalLine":"─","hscr":"𝒽","Hscr":"ℋ","hslash":"ℏ","Hstrok":"Ħ","hstrok":"ħ","HumpDownHump":"≎","HumpEqual":"≏","hybull":"⁃","hyphen":"‐","Iacute":"Í","iacute":"í","ic":"⁣","Icirc":"Î","icirc":"î","Icy":"И","icy":"и","Idot":"İ","IEcy":"Е","iecy":"е","iexcl":"¡","iff":"⇔","ifr":"𝔦","Ifr":"ℑ","Igrave":"Ì","igrave":"ì","ii":"ⅈ","iiiint":"⨌","iiint":"∭","iinfin":"⧜","iiota":"℩","IJlig":"Ĳ","ijlig":"ĳ","Imacr":"Ī","imacr":"ī","image":"ℑ","ImaginaryI":"ⅈ","imagline":"ℐ","imagpart":"ℑ","imath":"ı","Im":"ℑ","imof":"⊷","imped":"Ƶ","Implies":"⇒","incare":"℅","in":"∈","infin":"∞","infintie":"⧝","inodot":"ı","intcal":"⊺","int":"∫","Int":"∬","integers":"ℤ","Integral":"∫","intercal":"⊺","Intersection":"⋂","intlarhk":"⨗","intprod":"⨼","InvisibleComma":"⁣","InvisibleTimes":"⁢","IOcy":"Ё","iocy":"ё","Iogon":"Į","iogon":"į","Iopf":"𝕀","iopf":"𝕚","Iota":"Ι","iota":"ι","iprod":"⨼","iquest":"¿","iscr":"𝒾","Iscr":"ℐ","isin":"∈","isindot":"⋵","isinE":"⋹","isins":"⋴","isinsv":"⋳","isinv":"∈","it":"⁢","Itilde":"Ĩ","itilde":"ĩ","Iukcy":"І","iukcy":"і","Iuml":"Ï","iuml":"ï","Jcirc":"Ĵ","jcirc":"ĵ","Jcy":"Й","jcy":"й","Jfr":"𝔍","jfr":"𝔧","jmath":"ȷ","Jopf":"𝕁","jopf":"𝕛","Jscr":"𝒥","jscr":"𝒿","Jsercy":"Ј","jsercy":"ј","Jukcy":"Є","jukcy":"є","Kappa":"Κ","kappa":"κ","kappav":"ϰ","Kcedil":"Ķ","kcedil":"ķ","Kcy":"К","kcy":"к","Kfr":"𝔎","kfr":"𝔨","kgreen":"ĸ","KHcy":"Х","khcy":"х","KJcy":"Ќ","kjcy":"ќ","Kopf":"𝕂","kopf":"𝕜","Kscr":"𝒦","kscr":"𝓀","lAarr":"⇚","Lacute":"Ĺ","lacute":"ĺ","laemptyv":"⦴","lagran":"ℒ","Lambda":"Λ","lambda":"λ","lang":"⟨","Lang":"⟪","langd":"⦑","langle":"⟨","lap":"⪅","Laplacetrf":"ℒ","laquo":"«","larrb":"⇤","larrbfs":"⤟","larr":"←","Larr":"↞","lArr":"⇐","larrfs":"⤝","larrhk":"↩","larrlp":"↫","larrpl":"⤹","larrsim":"⥳","larrtl":"↢","latail":"⤙","lAtail":"⤛","lat":"⪫","late":"⪭","lates":"⪭︀","lbarr":"⤌","lBarr":"⤎","lbbrk":"❲","lbrace":"{","lbrack":"[","lbrke":"⦋","lbrksld":"⦏","lbrkslu":"⦍","Lcaron":"Ľ","lcaron":"ľ","Lcedil":"Ļ","lcedil":"ļ","lceil":"⌈","lcub":"{","Lcy":"Л","lcy":"л","ldca":"⤶","ldquo":"“","ldquor":"„","ldrdhar":"⥧","ldrushar":"⥋","ldsh":"↲","le":"≤","lE":"≦","LeftAngleBracket":"⟨","LeftArrowBar":"⇤","leftarrow":"←","LeftArrow":"←","Leftarrow":"⇐","LeftArrowRightArrow":"⇆","leftarrowtail":"↢","LeftCeiling":"⌈","LeftDoubleBracket":"⟦","LeftDownTeeVector":"⥡","LeftDownVectorBar":"⥙","LeftDownVector":"⇃","LeftFloor":"⌊","leftharpoondown":"↽","leftharpoonup":"↼","leftleftarrows":"⇇","leftrightarrow":"↔","LeftRightArrow":"↔","Leftrightarrow":"⇔","leftrightarrows":"⇆","leftrightharpoons":"⇋","leftrightsquigarrow":"↭","LeftRightVector":"⥎","LeftTeeArrow":"↤","LeftTee":"⊣","LeftTeeVector":"⥚","leftthreetimes":"⋋","LeftTriangleBar":"⧏","LeftTriangle":"⊲","LeftTriangleEqual":"⊴","LeftUpDownVector":"⥑","LeftUpTeeVector":"⥠","LeftUpVectorBar":"⥘","LeftUpVector":"↿","LeftVectorBar":"⥒","LeftVector":"↼","lEg":"⪋","leg":"⋚","leq":"≤","leqq":"≦","leqslant":"⩽","lescc":"⪨","les":"⩽","lesdot":"⩿","lesdoto":"⪁","lesdotor":"⪃","lesg":"⋚︀","lesges":"⪓","lessapprox":"⪅","lessdot":"⋖","lesseqgtr":"⋚","lesseqqgtr":"⪋","LessEqualGreater":"⋚","LessFullEqual":"≦","LessGreater":"≶","lessgtr":"≶","LessLess":"⪡","lesssim":"≲","LessSlantEqual":"⩽","LessTilde":"≲","lfisht":"⥼","lfloor":"⌊","Lfr":"𝔏","lfr":"𝔩","lg":"≶","lgE":"⪑","lHar":"⥢","lhard":"↽","lharu":"↼","lharul":"⥪","lhblk":"▄","LJcy":"Љ","ljcy":"љ","llarr":"⇇","ll":"≪","Ll":"⋘","llcorner":"⌞","Lleftarrow":"⇚","llhard":"⥫","lltri":"◺","Lmidot":"Ŀ","lmidot":"ŀ","lmoustache":"⎰","lmoust":"⎰","lnap":"⪉","lnapprox":"⪉","lne":"⪇","lnE":"≨","lneq":"⪇","lneqq":"≨","lnsim":"⋦","loang":"⟬","loarr":"⇽","lobrk":"⟦","longleftarrow":"⟵","LongLeftArrow":"⟵","Longleftarrow":"⟸","longleftrightarrow":"⟷","LongLeftRightArrow":"⟷","Longleftrightarrow":"⟺","longmapsto":"⟼","longrightarrow":"⟶","LongRightArrow":"⟶","Longrightarrow":"⟹","looparrowleft":"↫","looparrowright":"↬","lopar":"⦅","Lopf":"𝕃","lopf":"𝕝","loplus":"⨭","lotimes":"⨴","lowast":"∗","lowbar":"_","LowerLeftArrow":"↙","LowerRightArrow":"↘","loz":"◊","lozenge":"◊","lozf":"⧫","lpar":"(","lparlt":"⦓","lrarr":"⇆","lrcorner":"⌟","lrhar":"⇋","lrhard":"⥭","lrm":"‎","lrtri":"⊿","lsaquo":"‹","lscr":"𝓁","Lscr":"ℒ","lsh":"↰","Lsh":"↰","lsim":"≲","lsime":"⪍","lsimg":"⪏","lsqb":"[","lsquo":"‘","lsquor":"‚","Lstrok":"Ł","lstrok":"ł","ltcc":"⪦","ltcir":"⩹","lt":"<","LT":"<","Lt":"≪","ltdot":"⋖","lthree":"⋋","ltimes":"⋉","ltlarr":"⥶","ltquest":"⩻","ltri":"◃","ltrie":"⊴","ltrif":"◂","ltrPar":"⦖","lurdshar":"⥊","luruhar":"⥦","lvertneqq":"≨︀","lvnE":"≨︀","macr":"¯","male":"♂","malt":"✠","maltese":"✠","Map":"⤅","map":"↦","mapsto":"↦","mapstodown":"↧","mapstoleft":"↤","mapstoup":"↥","marker":"▮","mcomma":"⨩","Mcy":"М","mcy":"м","mdash":"—","mDDot":"∺","measuredangle":"∡","MediumSpace":" ","Mellintrf":"ℳ","Mfr":"𝔐","mfr":"𝔪","mho":"℧","micro":"µ","midast":"*","midcir":"⫰","mid":"∣","middot":"·","minusb":"⊟","minus":"−","minusd":"∸","minusdu":"⨪","MinusPlus":"∓","mlcp":"⫛","mldr":"…","mnplus":"∓","models":"⊧","Mopf":"𝕄","mopf":"𝕞","mp":"∓","mscr":"𝓂","Mscr":"ℳ","mstpos":"∾","Mu":"Μ","mu":"μ","multimap":"⊸","mumap":"⊸","nabla":"∇","Nacute":"Ń","nacute":"ń","nang":"∠⃒","nap":"≉","napE":"⩰̸","napid":"≋̸","napos":"ŉ","napprox":"≉","natural":"♮","naturals":"ℕ","natur":"♮","nbsp":" ","nbump":"≎̸","nbumpe":"≏̸","ncap":"⩃","Ncaron":"Ň","ncaron":"ň","Ncedil":"Ņ","ncedil":"ņ","ncong":"≇","ncongdot":"⩭̸","ncup":"⩂","Ncy":"Н","ncy":"н","ndash":"–","nearhk":"⤤","nearr":"↗","neArr":"⇗","nearrow":"↗","ne":"≠","nedot":"≐̸","NegativeMediumSpace":"​","NegativeThickSpace":"​","NegativeThinSpace":"​","NegativeVeryThinSpace":"​","nequiv":"≢","nesear":"⤨","nesim":"≂̸","NestedGreaterGreater":"≫","NestedLessLess":"≪","NewLine":"\\n","nexist":"∄","nexists":"∄","Nfr":"𝔑","nfr":"𝔫","ngE":"≧̸","nge":"≱","ngeq":"≱","ngeqq":"≧̸","ngeqslant":"⩾̸","nges":"⩾̸","nGg":"⋙̸","ngsim":"≵","nGt":"≫⃒","ngt":"≯","ngtr":"≯","nGtv":"≫̸","nharr":"↮","nhArr":"⇎","nhpar":"⫲","ni":"∋","nis":"⋼","nisd":"⋺","niv":"∋","NJcy":"Њ","njcy":"њ","nlarr":"↚","nlArr":"⇍","nldr":"‥","nlE":"≦̸","nle":"≰","nleftarrow":"↚","nLeftarrow":"⇍","nleftrightarrow":"↮","nLeftrightarrow":"⇎","nleq":"≰","nleqq":"≦̸","nleqslant":"⩽̸","nles":"⩽̸","nless":"≮","nLl":"⋘̸","nlsim":"≴","nLt":"≪⃒","nlt":"≮","nltri":"⋪","nltrie":"⋬","nLtv":"≪̸","nmid":"∤","NoBreak":"⁠","NonBreakingSpace":" ","nopf":"𝕟","Nopf":"ℕ","Not":"⫬","not":"¬","NotCongruent":"≢","NotCupCap":"≭","NotDoubleVerticalBar":"∦","NotElement":"∉","NotEqual":"≠","NotEqualTilde":"≂̸","NotExists":"∄","NotGreater":"≯","NotGreaterEqual":"≱","NotGreaterFullEqual":"≧̸","NotGreaterGreater":"≫̸","NotGreaterLess":"≹","NotGreaterSlantEqual":"⩾̸","NotGreaterTilde":"≵","NotHumpDownHump":"≎̸","NotHumpEqual":"≏̸","notin":"∉","notindot":"⋵̸","notinE":"⋹̸","notinva":"∉","notinvb":"⋷","notinvc":"⋶","NotLeftTriangleBar":"⧏̸","NotLeftTriangle":"⋪","NotLeftTriangleEqual":"⋬","NotLess":"≮","NotLessEqual":"≰","NotLessGreater":"≸","NotLessLess":"≪̸","NotLessSlantEqual":"⩽̸","NotLessTilde":"≴","NotNestedGreaterGreater":"⪢̸","NotNestedLessLess":"⪡̸","notni":"∌","notniva":"∌","notnivb":"⋾","notnivc":"⋽","NotPrecedes":"⊀","NotPrecedesEqual":"⪯̸","NotPrecedesSlantEqual":"⋠","NotReverseElement":"∌","NotRightTriangleBar":"⧐̸","NotRightTriangle":"⋫","NotRightTriangleEqual":"⋭","NotSquareSubset":"⊏̸","NotSquareSubsetEqual":"⋢","NotSquareSuperset":"⊐̸","NotSquareSupersetEqual":"⋣","NotSubset":"⊂⃒","NotSubsetEqual":"⊈","NotSucceeds":"⊁","NotSucceedsEqual":"⪰̸","NotSucceedsSlantEqual":"⋡","NotSucceedsTilde":"≿̸","NotSuperset":"⊃⃒","NotSupersetEqual":"⊉","NotTilde":"≁","NotTildeEqual":"≄","NotTildeFullEqual":"≇","NotTildeTilde":"≉","NotVerticalBar":"∤","nparallel":"∦","npar":"∦","nparsl":"⫽⃥","npart":"∂̸","npolint":"⨔","npr":"⊀","nprcue":"⋠","nprec":"⊀","npreceq":"⪯̸","npre":"⪯̸","nrarrc":"⤳̸","nrarr":"↛","nrArr":"⇏","nrarrw":"↝̸","nrightarrow":"↛","nRightarrow":"⇏","nrtri":"⋫","nrtrie":"⋭","nsc":"⊁","nsccue":"⋡","nsce":"⪰̸","Nscr":"𝒩","nscr":"𝓃","nshortmid":"∤","nshortparallel":"∦","nsim":"≁","nsime":"≄","nsimeq":"≄","nsmid":"∤","nspar":"∦","nsqsube":"⋢","nsqsupe":"⋣","nsub":"⊄","nsubE":"⫅̸","nsube":"⊈","nsubset":"⊂⃒","nsubseteq":"⊈","nsubseteqq":"⫅̸","nsucc":"⊁","nsucceq":"⪰̸","nsup":"⊅","nsupE":"⫆̸","nsupe":"⊉","nsupset":"⊃⃒","nsupseteq":"⊉","nsupseteqq":"⫆̸","ntgl":"≹","Ntilde":"Ñ","ntilde":"ñ","ntlg":"≸","ntriangleleft":"⋪","ntrianglelefteq":"⋬","ntriangleright":"⋫","ntrianglerighteq":"⋭","Nu":"Ν","nu":"ν","num":"#","numero":"№","numsp":" ","nvap":"≍⃒","nvdash":"⊬","nvDash":"⊭","nVdash":"⊮","nVDash":"⊯","nvge":"≥⃒","nvgt":">⃒","nvHarr":"⤄","nvinfin":"⧞","nvlArr":"⤂","nvle":"≤⃒","nvlt":"<⃒","nvltrie":"⊴⃒","nvrArr":"⤃","nvrtrie":"⊵⃒","nvsim":"∼⃒","nwarhk":"⤣","nwarr":"↖","nwArr":"⇖","nwarrow":"↖","nwnear":"⤧","Oacute":"Ó","oacute":"ó","oast":"⊛","Ocirc":"Ô","ocirc":"ô","ocir":"⊚","Ocy":"О","ocy":"о","odash":"⊝","Odblac":"Ő","odblac":"ő","odiv":"⨸","odot":"⊙","odsold":"⦼","OElig":"Œ","oelig":"œ","ofcir":"⦿","Ofr":"𝔒","ofr":"𝔬","ogon":"˛","Ograve":"Ò","ograve":"ò","ogt":"⧁","ohbar":"⦵","ohm":"Ω","oint":"∮","olarr":"↺","olcir":"⦾","olcross":"⦻","oline":"‾","olt":"⧀","Omacr":"Ō","omacr":"ō","Omega":"Ω","omega":"ω","Omicron":"Ο","omicron":"ο","omid":"⦶","ominus":"⊖","Oopf":"𝕆","oopf":"𝕠","opar":"⦷","OpenCurlyDoubleQuote":"“","OpenCurlyQuote":"‘","operp":"⦹","oplus":"⊕","orarr":"↻","Or":"⩔","or":"∨","ord":"⩝","order":"ℴ","orderof":"ℴ","ordf":"ª","ordm":"º","origof":"⊶","oror":"⩖","orslope":"⩗","orv":"⩛","oS":"Ⓢ","Oscr":"𝒪","oscr":"ℴ","Oslash":"Ø","oslash":"ø","osol":"⊘","Otilde":"Õ","otilde":"õ","otimesas":"⨶","Otimes":"⨷","otimes":"⊗","Ouml":"Ö","ouml":"ö","ovbar":"⌽","OverBar":"‾","OverBrace":"⏞","OverBracket":"⎴","OverParenthesis":"⏜","para":"¶","parallel":"∥","par":"∥","parsim":"⫳","parsl":"⫽","part":"∂","PartialD":"∂","Pcy":"П","pcy":"п","percnt":"%","period":".","permil":"‰","perp":"⊥","pertenk":"‱","Pfr":"𝔓","pfr":"𝔭","Phi":"Φ","phi":"φ","phiv":"ϕ","phmmat":"ℳ","phone":"☎","Pi":"Π","pi":"π","pitchfork":"⋔","piv":"ϖ","planck":"ℏ","planckh":"ℎ","plankv":"ℏ","plusacir":"⨣","plusb":"⊞","pluscir":"⨢","plus":"+","plusdo":"∔","plusdu":"⨥","pluse":"⩲","PlusMinus":"±","plusmn":"±","plussim":"⨦","plustwo":"⨧","pm":"±","Poincareplane":"ℌ","pointint":"⨕","popf":"𝕡","Popf":"ℙ","pound":"£","prap":"⪷","Pr":"⪻","pr":"≺","prcue":"≼","precapprox":"⪷","prec":"≺","preccurlyeq":"≼","Precedes":"≺","PrecedesEqual":"⪯","PrecedesSlantEqual":"≼","PrecedesTilde":"≾","preceq":"⪯","precnapprox":"⪹","precneqq":"⪵","precnsim":"⋨","pre":"⪯","prE":"⪳","precsim":"≾","prime":"′","Prime":"″","primes":"ℙ","prnap":"⪹","prnE":"⪵","prnsim":"⋨","prod":"∏","Product":"∏","profalar":"⌮","profline":"⌒","profsurf":"⌓","prop":"∝","Proportional":"∝","Proportion":"∷","propto":"∝","prsim":"≾","prurel":"⊰","Pscr":"𝒫","pscr":"𝓅","Psi":"Ψ","psi":"ψ","puncsp":" ","Qfr":"𝔔","qfr":"𝔮","qint":"⨌","qopf":"𝕢","Qopf":"ℚ","qprime":"⁗","Qscr":"𝒬","qscr":"𝓆","quaternions":"ℍ","quatint":"⨖","quest":"?","questeq":"≟","quot":"\\"","QUOT":"\\"","rAarr":"⇛","race":"∽̱","Racute":"Ŕ","racute":"ŕ","radic":"√","raemptyv":"⦳","rang":"⟩","Rang":"⟫","rangd":"⦒","range":"⦥","rangle":"⟩","raquo":"»","rarrap":"⥵","rarrb":"⇥","rarrbfs":"⤠","rarrc":"⤳","rarr":"→","Rarr":"↠","rArr":"⇒","rarrfs":"⤞","rarrhk":"↪","rarrlp":"↬","rarrpl":"⥅","rarrsim":"⥴","Rarrtl":"⤖","rarrtl":"↣","rarrw":"↝","ratail":"⤚","rAtail":"⤜","ratio":"∶","rationals":"ℚ","rbarr":"⤍","rBarr":"⤏","RBarr":"⤐","rbbrk":"❳","rbrace":"}","rbrack":"]","rbrke":"⦌","rbrksld":"⦎","rbrkslu":"⦐","Rcaron":"Ř","rcaron":"ř","Rcedil":"Ŗ","rcedil":"ŗ","rceil":"⌉","rcub":"}","Rcy":"Р","rcy":"р","rdca":"⤷","rdldhar":"⥩","rdquo":"”","rdquor":"”","rdsh":"↳","real":"ℜ","realine":"ℛ","realpart":"ℜ","reals":"ℝ","Re":"ℜ","rect":"▭","reg":"®","REG":"®","ReverseElement":"∋","ReverseEquilibrium":"⇋","ReverseUpEquilibrium":"⥯","rfisht":"⥽","rfloor":"⌋","rfr":"𝔯","Rfr":"ℜ","rHar":"⥤","rhard":"⇁","rharu":"⇀","rharul":"⥬","Rho":"Ρ","rho":"ρ","rhov":"ϱ","RightAngleBracket":"⟩","RightArrowBar":"⇥","rightarrow":"→","RightArrow":"→","Rightarrow":"⇒","RightArrowLeftArrow":"⇄","rightarrowtail":"↣","RightCeiling":"⌉","RightDoubleBracket":"⟧","RightDownTeeVector":"⥝","RightDownVectorBar":"⥕","RightDownVector":"⇂","RightFloor":"⌋","rightharpoondown":"⇁","rightharpoonup":"⇀","rightleftarrows":"⇄","rightleftharpoons":"⇌","rightrightarrows":"⇉","rightsquigarrow":"↝","RightTeeArrow":"↦","RightTee":"⊢","RightTeeVector":"⥛","rightthreetimes":"⋌","RightTriangleBar":"⧐","RightTriangle":"⊳","RightTriangleEqual":"⊵","RightUpDownVector":"⥏","RightUpTeeVector":"⥜","RightUpVectorBar":"⥔","RightUpVector":"↾","RightVectorBar":"⥓","RightVector":"⇀","ring":"˚","risingdotseq":"≓","rlarr":"⇄","rlhar":"⇌","rlm":"‏","rmoustache":"⎱","rmoust":"⎱","rnmid":"⫮","roang":"⟭","roarr":"⇾","robrk":"⟧","ropar":"⦆","ropf":"𝕣","Ropf":"ℝ","roplus":"⨮","rotimes":"⨵","RoundImplies":"⥰","rpar":")","rpargt":"⦔","rppolint":"⨒","rrarr":"⇉","Rrightarrow":"⇛","rsaquo":"›","rscr":"𝓇","Rscr":"ℛ","rsh":"↱","Rsh":"↱","rsqb":"]","rsquo":"’","rsquor":"’","rthree":"⋌","rtimes":"⋊","rtri":"▹","rtrie":"⊵","rtrif":"▸","rtriltri":"⧎","RuleDelayed":"⧴","ruluhar":"⥨","rx":"℞","Sacute":"Ś","sacute":"ś","sbquo":"‚","scap":"⪸","Scaron":"Š","scaron":"š","Sc":"⪼","sc":"≻","sccue":"≽","sce":"⪰","scE":"⪴","Scedil":"Ş","scedil":"ş","Scirc":"Ŝ","scirc":"ŝ","scnap":"⪺","scnE":"⪶","scnsim":"⋩","scpolint":"⨓","scsim":"≿","Scy":"С","scy":"с","sdotb":"⊡","sdot":"⋅","sdote":"⩦","searhk":"⤥","searr":"↘","seArr":"⇘","searrow":"↘","sect":"§","semi":";","seswar":"⤩","setminus":"∖","setmn":"∖","sext":"✶","Sfr":"𝔖","sfr":"𝔰","sfrown":"⌢","sharp":"♯","SHCHcy":"Щ","shchcy":"щ","SHcy":"Ш","shcy":"ш","ShortDownArrow":"↓","ShortLeftArrow":"←","shortmid":"∣","shortparallel":"∥","ShortRightArrow":"→","ShortUpArrow":"↑","shy":"­","Sigma":"Σ","sigma":"σ","sigmaf":"ς","sigmav":"ς","sim":"∼","simdot":"⩪","sime":"≃","simeq":"≃","simg":"⪞","simgE":"⪠","siml":"⪝","simlE":"⪟","simne":"≆","simplus":"⨤","simrarr":"⥲","slarr":"←","SmallCircle":"∘","smallsetminus":"∖","smashp":"⨳","smeparsl":"⧤","smid":"∣","smile":"⌣","smt":"⪪","smte":"⪬","smtes":"⪬︀","SOFTcy":"Ь","softcy":"ь","solbar":"⌿","solb":"⧄","sol":"/","Sopf":"𝕊","sopf":"𝕤","spades":"♠","spadesuit":"♠","spar":"∥","sqcap":"⊓","sqcaps":"⊓︀","sqcup":"⊔","sqcups":"⊔︀","Sqrt":"√","sqsub":"⊏","sqsube":"⊑","sqsubset":"⊏","sqsubseteq":"⊑","sqsup":"⊐","sqsupe":"⊒","sqsupset":"⊐","sqsupseteq":"⊒","square":"□","Square":"□","SquareIntersection":"⊓","SquareSubset":"⊏","SquareSubsetEqual":"⊑","SquareSuperset":"⊐","SquareSupersetEqual":"⊒","SquareUnion":"⊔","squarf":"▪","squ":"□","squf":"▪","srarr":"→","Sscr":"𝒮","sscr":"𝓈","ssetmn":"∖","ssmile":"⌣","sstarf":"⋆","Star":"⋆","star":"☆","starf":"★","straightepsilon":"ϵ","straightphi":"ϕ","strns":"¯","sub":"⊂","Sub":"⋐","subdot":"⪽","subE":"⫅","sube":"⊆","subedot":"⫃","submult":"⫁","subnE":"⫋","subne":"⊊","subplus":"⪿","subrarr":"⥹","subset":"⊂","Subset":"⋐","subseteq":"⊆","subseteqq":"⫅","SubsetEqual":"⊆","subsetneq":"⊊","subsetneqq":"⫋","subsim":"⫇","subsub":"⫕","subsup":"⫓","succapprox":"⪸","succ":"≻","succcurlyeq":"≽","Succeeds":"≻","SucceedsEqual":"⪰","SucceedsSlantEqual":"≽","SucceedsTilde":"≿","succeq":"⪰","succnapprox":"⪺","succneqq":"⪶","succnsim":"⋩","succsim":"≿","SuchThat":"∋","sum":"∑","Sum":"∑","sung":"♪","sup1":"¹","sup2":"²","sup3":"³","sup":"⊃","Sup":"⋑","supdot":"⪾","supdsub":"⫘","supE":"⫆","supe":"⊇","supedot":"⫄","Superset":"⊃","SupersetEqual":"⊇","suphsol":"⟉","suphsub":"⫗","suplarr":"⥻","supmult":"⫂","supnE":"⫌","supne":"⊋","supplus":"⫀","supset":"⊃","Supset":"⋑","supseteq":"⊇","supseteqq":"⫆","supsetneq":"⊋","supsetneqq":"⫌","supsim":"⫈","supsub":"⫔","supsup":"⫖","swarhk":"⤦","swarr":"↙","swArr":"⇙","swarrow":"↙","swnwar":"⤪","szlig":"ß","Tab":"\\t","target":"⌖","Tau":"Τ","tau":"τ","tbrk":"⎴","Tcaron":"Ť","tcaron":"ť","Tcedil":"Ţ","tcedil":"ţ","Tcy":"Т","tcy":"т","tdot":"⃛","telrec":"⌕","Tfr":"𝔗","tfr":"𝔱","there4":"∴","therefore":"∴","Therefore":"∴","Theta":"Θ","theta":"θ","thetasym":"ϑ","thetav":"ϑ","thickapprox":"≈","thicksim":"∼","ThickSpace":"  ","ThinSpace":" ","thinsp":" ","thkap":"≈","thksim":"∼","THORN":"Þ","thorn":"þ","tilde":"˜","Tilde":"∼","TildeEqual":"≃","TildeFullEqual":"≅","TildeTilde":"≈","timesbar":"⨱","timesb":"⊠","times":"×","timesd":"⨰","tint":"∭","toea":"⤨","topbot":"⌶","topcir":"⫱","top":"⊤","Topf":"𝕋","topf":"𝕥","topfork":"⫚","tosa":"⤩","tprime":"‴","trade":"™","TRADE":"™","triangle":"▵","triangledown":"▿","triangleleft":"◃","trianglelefteq":"⊴","triangleq":"≜","triangleright":"▹","trianglerighteq":"⊵","tridot":"◬","trie":"≜","triminus":"⨺","TripleDot":"⃛","triplus":"⨹","trisb":"⧍","tritime":"⨻","trpezium":"⏢","Tscr":"𝒯","tscr":"𝓉","TScy":"Ц","tscy":"ц","TSHcy":"Ћ","tshcy":"ћ","Tstrok":"Ŧ","tstrok":"ŧ","twixt":"≬","twoheadleftarrow":"↞","twoheadrightarrow":"↠","Uacute":"Ú","uacute":"ú","uarr":"↑","Uarr":"↟","uArr":"⇑","Uarrocir":"⥉","Ubrcy":"Ў","ubrcy":"ў","Ubreve":"Ŭ","ubreve":"ŭ","Ucirc":"Û","ucirc":"û","Ucy":"У","ucy":"у","udarr":"⇅","Udblac":"Ű","udblac":"ű","udhar":"⥮","ufisht":"⥾","Ufr":"𝔘","ufr":"𝔲","Ugrave":"Ù","ugrave":"ù","uHar":"⥣","uharl":"↿","uharr":"↾","uhblk":"▀","ulcorn":"⌜","ulcorner":"⌜","ulcrop":"⌏","ultri":"◸","Umacr":"Ū","umacr":"ū","uml":"¨","UnderBar":"_","UnderBrace":"⏟","UnderBracket":"⎵","UnderParenthesis":"⏝","Union":"⋃","UnionPlus":"⊎","Uogon":"Ų","uogon":"ų","Uopf":"𝕌","uopf":"𝕦","UpArrowBar":"⤒","uparrow":"↑","UpArrow":"↑","Uparrow":"⇑","UpArrowDownArrow":"⇅","updownarrow":"↕","UpDownArrow":"↕","Updownarrow":"⇕","UpEquilibrium":"⥮","upharpoonleft":"↿","upharpoonright":"↾","uplus":"⊎","UpperLeftArrow":"↖","UpperRightArrow":"↗","upsi":"υ","Upsi":"ϒ","upsih":"ϒ","Upsilon":"Υ","upsilon":"υ","UpTeeArrow":"↥","UpTee":"⊥","upuparrows":"⇈","urcorn":"⌝","urcorner":"⌝","urcrop":"⌎","Uring":"Ů","uring":"ů","urtri":"◹","Uscr":"𝒰","uscr":"𝓊","utdot":"⋰","Utilde":"Ũ","utilde":"ũ","utri":"▵","utrif":"▴","uuarr":"⇈","Uuml":"Ü","uuml":"ü","uwangle":"⦧","vangrt":"⦜","varepsilon":"ϵ","varkappa":"ϰ","varnothing":"∅","varphi":"ϕ","varpi":"ϖ","varpropto":"∝","varr":"↕","vArr":"⇕","varrho":"ϱ","varsigma":"ς","varsubsetneq":"⊊︀","varsubsetneqq":"⫋︀","varsupsetneq":"⊋︀","varsupsetneqq":"⫌︀","vartheta":"ϑ","vartriangleleft":"⊲","vartriangleright":"⊳","vBar":"⫨","Vbar":"⫫","vBarv":"⫩","Vcy":"В","vcy":"в","vdash":"⊢","vDash":"⊨","Vdash":"⊩","VDash":"⊫","Vdashl":"⫦","veebar":"⊻","vee":"∨","Vee":"⋁","veeeq":"≚","vellip":"⋮","verbar":"|","Verbar":"‖","vert":"|","Vert":"‖","VerticalBar":"∣","VerticalLine":"|","VerticalSeparator":"❘","VerticalTilde":"≀","VeryThinSpace":" ","Vfr":"𝔙","vfr":"𝔳","vltri":"⊲","vnsub":"⊂⃒","vnsup":"⊃⃒","Vopf":"𝕍","vopf":"𝕧","vprop":"∝","vrtri":"⊳","Vscr":"𝒱","vscr":"𝓋","vsubnE":"⫋︀","vsubne":"⊊︀","vsupnE":"⫌︀","vsupne":"⊋︀","Vvdash":"⊪","vzigzag":"⦚","Wcirc":"Ŵ","wcirc":"ŵ","wedbar":"⩟","wedge":"∧","Wedge":"⋀","wedgeq":"≙","weierp":"℘","Wfr":"𝔚","wfr":"𝔴","Wopf":"𝕎","wopf":"𝕨","wp":"℘","wr":"≀","wreath":"≀","Wscr":"𝒲","wscr":"𝓌","xcap":"⋂","xcirc":"◯","xcup":"⋃","xdtri":"▽","Xfr":"𝔛","xfr":"𝔵","xharr":"⟷","xhArr":"⟺","Xi":"Ξ","xi":"ξ","xlarr":"⟵","xlArr":"⟸","xmap":"⟼","xnis":"⋻","xodot":"⨀","Xopf":"𝕏","xopf":"𝕩","xoplus":"⨁","xotime":"⨂","xrarr":"⟶","xrArr":"⟹","Xscr":"𝒳","xscr":"𝓍","xsqcup":"⨆","xuplus":"⨄","xutri":"△","xvee":"⋁","xwedge":"⋀","Yacute":"Ý","yacute":"ý","YAcy":"Я","yacy":"я","Ycirc":"Ŷ","ycirc":"ŷ","Ycy":"Ы","ycy":"ы","yen":"¥","Yfr":"𝔜","yfr":"𝔶","YIcy":"Ї","yicy":"ї","Yopf":"𝕐","yopf":"𝕪","Yscr":"𝒴","yscr":"𝓎","YUcy":"Ю","yucy":"ю","yuml":"ÿ","Yuml":"Ÿ","Zacute":"Ź","zacute":"ź","Zcaron":"Ž","zcaron":"ž","Zcy":"З","zcy":"з","Zdot":"Ż","zdot":"ż","zeetrf":"ℨ","ZeroWidthSpace":"​","Zeta":"Ζ","zeta":"ζ","zfr":"𝔷","Zfr":"ℨ","ZHcy":"Ж","zhcy":"ж","zigrarr":"⇝","zopf":"𝕫","Zopf":"ℤ","Zscr":"𝒵","zscr":"𝓏","zwj":"‍","zwnj":"‌"}');

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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************************!*\
  !*** ./public/js/index-page.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var font_awesome_css_font_awesome_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! font-awesome/css/font-awesome.css */ "./node_modules/font-awesome/css/font-awesome.css");
/* harmony import */ var _less_index_page_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../less/index-page.less */ "./public/less/index-page.less");



var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var md = __webpack_require__(/*! markdown-it */ "./node_modules/markdown-it/index.js")();

md.use(__webpack_require__(/*! markdown-it-asciimath */ "./node_modules/markdown-it-asciimath/index.js"));
md.use(__webpack_require__(/*! markdown-it-container */ "./node_modules/markdown-it-container/index.js"), "info");

function getParam(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href); // the param isn't part of the normal URL pattern...
  //

  if (results === null) {
    // maybe it is part in the hash.
    //
    regexS = "[\\#]" + name + "=([^&#]*)";
    regex = new RegExp(regexS);
    results = regex.exec(window.location.hash);

    if (results === null) {
      return null;
    }
  }

  return results[1];
}

function renderMarkdown(container, section) {
  var markdown = md.render(section.content);
  container.append("<div class=\"markdownRendering\">".concat(markdown, "</div>"));
}

function renderBrain(container, section) {
  container.append("<div class=\"imageRendering\"><img src=\"".concat(section.content.image, "\"></div>"));
}

function renderImage(container, section) {
  container.append("<div class=\"imageRendering\"><img src=\"".concat(section.content, "\"></div>"));
}

$(window).load(function () {
  var containerId = "#authorContent";
  var sha = getParam("sha");
  var url = "../sheets/shared/get?sha=".concat(sha);
  axios.get(url).then(function (response) {
    $(containerId).html("");
    var pages = response.data.pages;
    pages.forEach(function (page, index) {
      var container = $("<div class='authorPage'></div>");
      $(containerId).append(container);
      var sections = page.sections;
      sections.forEach(function (section) {
        switch (section.type) {
          case "brain":
            renderBrain(container, section);
            break;

          case "markdown":
            renderMarkdown(container, section);
            break;

          case "image":
            renderImage(container, section);
            break;

          default:
            break;
        }
      });
      if (index < pages.length - 1) container.append("<div style='page-break-before:always;'></div>");
    });
  });
  setTimeout(function () {
    mathMLdone = true;
  }, 2000);
});
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=page-bundle.js.map