module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "00b4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var Error = global.Error;
var un$Test = uncurryThis(/./.test);

// `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test
$({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (str) {
    var exec = this.exec;
    if (!isCallable(exec)) return un$Test(this, str);
    var result = call(exec, this, str);
    if (result !== null && !isObject(result)) {
      throw new Error('RegExp exec method returned something other than an Object or null');
    }
    return !!result;
  }
});


/***/ }),

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "04d1":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

var firefox = userAgent.match(/firefox\/(\d+)/i);

module.exports = !!firefox && +firefox[1];


/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var call = __webpack_require__("c65b");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPropertyKey = __webpack_require__("a04b");
var hasOwn = __webpack_require__("1a2d");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "07fa":
/***/ (function(module, exports, __webpack_require__) {

var toLength = __webpack_require__("50c4");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "0b42":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isArray = __webpack_require__("e8b5");
var isConstructor = __webpack_require__("68ee");
var isObject = __webpack_require__("861d");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "0d51":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "107c":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ "1148":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var toIntegerOrInfinity = __webpack_require__("5926");
var toString = __webpack_require__("577e");
var requireObjectCoercible = __webpack_require__("1d80");

var RangeError = global.RangeError;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
module.exports = function repeat(count) {
  var str = toString(requireObjectCoercible(this));
  var result = '';
  var n = toIntegerOrInfinity(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ "1626":
/***/ (function(module, exports) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "1a2d":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var toObject = __webpack_require__("7b0b");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1d80":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "1dde":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__("5926");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "25f0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__("e330");
var PROPER_FUNCTION_NAME = __webpack_require__("5e77").PROPER;
var redefine = __webpack_require__("6eeb");
var anObject = __webpack_require__("825a");
var isPrototypeOf = __webpack_require__("3a9b");
var $toString = __webpack_require__("577e");
var fails = __webpack_require__("d039");
var regExpFlags = __webpack_require__("ad6d");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var n$ToString = RegExpPrototype[TO_STRING];
var getFlags = uncurryThis(regExpFlags);

var NOT_GENERIC = fails(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = $toString(R.source);
    var rf = R.flags;
    var f = $toString(rf === undefined && isPrototypeOf(RegExpPrototype, R) && !('flags' in RegExpPrototype) ? getFlags(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var toIndexedObject = __webpack_require__("fc6a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ "3a9b":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "408a":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44d2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var create = __webpack_require__("7c73");
var definePropertyModule = __webpack_require__("9bf2");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "485a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__("2d00");
var fails = __webpack_require__("d039");

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "4e82":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var aCallable = __webpack_require__("59ed");
var toObject = __webpack_require__("7b0b");
var lengthOfArrayLike = __webpack_require__("07fa");
var toString = __webpack_require__("577e");
var fails = __webpack_require__("d039");
var internalSort = __webpack_require__("addb");
var arrayMethodIsStrict = __webpack_require__("a640");
var FF = __webpack_require__("04d1");
var IE_OR_EDGE = __webpack_require__("d998");
var V8 = __webpack_require__("2d00");
var WEBKIT = __webpack_require__("512c");

var test = [];
var un$Sort = uncurryThis(test.sort);
var push = uncurryThis(test.push);

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT = !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString(x) > toString(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);

    var array = toObject(this);

    if (STABLE_SORT) return comparefn === undefined ? un$Sort(array) : un$Sort(array, comparefn);

    var items = [];
    var arrayLength = lengthOfArrayLike(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push(items, array[index]);
    }

    internalSort(items, getSortCompare(comparefn));

    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) delete array[index++];

    return array;
  }
});


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__("5926");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "512c":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

module.exports = !!webkit && +webkit[1];


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.19.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var uncurryThis = __webpack_require__("e330");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "577e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var classof = __webpack_require__("f5df");

var String = global.String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ "5926":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),

/***/ "59ed":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var tryToString = __webpack_require__("0d51");

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "5e77":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var hasOwn = __webpack_require__("1a2d");

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ "65f0":
/***/ (function(module, exports, __webpack_require__) {

var arraySpeciesConstructor = __webpack_require__("0b42");

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ "68ee":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");
var classof = __webpack_require__("f5df");
var getBuiltIn = __webpack_require__("d066");
var inspectSource = __webpack_require__("8925");

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function (argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function (argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
    // we can't check .prototype since constructors produced by .bind haven't it
  } return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
};

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var hasOwn = __webpack_require__("1a2d");
var shared = __webpack_require__("c6cd");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6b0d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.default = (sfc, props) => {
    for (const [key, val] of props) {
        sfc[key] = val;
    }
    return sfc;
};


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var hasOwn = __webpack_require__("1a2d");
var createNonEnumerableProperty = __webpack_require__("9112");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");
var CONFIGURABLE_FUNCTION_NAME = __webpack_require__("5e77").CONFIGURABLE;

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var requireObjectCoercible = __webpack_require__("1d80");

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__("825a");
var defineProperties = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "81d5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__("7b0b");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = lengthOfArrayLike(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPropertyKey = __webpack_require__("a04b");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "861d":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var isCallable = __webpack_require__("1626");
var store = __webpack_require__("c6cd");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "90e3":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9263":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var toString = __webpack_require__("577e");
var regexpFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");
var shared = __webpack_require__("5692");
var create = __webpack_require__("7c73");
var getInternalState = __webpack_require__("69f3").get;
var UNSUPPORTED_DOT_ALL = __webpack_require__("fce3");
var UNSUPPORTED_NCG = __webpack_require__("107c");

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPropertyKey = __webpack_require__("a04b");

var TypeError = global.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9f7f":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

exports.UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "a04b":
/***/ (function(module, exports, __webpack_require__) {

var toPrimitive = __webpack_require__("c04e");
var isSymbol = __webpack_require__("d9b5");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "a15b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var IndexedObject = __webpack_require__("44ad");
var toIndexedObject = __webpack_require__("fc6a");
var arrayMethodIsStrict = __webpack_require__("a640");

var un$Join = uncurryThis([].join);

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return un$Join(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "a434":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var toAbsoluteIndex = __webpack_require__("23cb");
var toIntegerOrInfinity = __webpack_require__("5926");
var lengthOfArrayLike = __webpack_require__("07fa");
var toObject = __webpack_require__("7b0b");
var arraySpeciesCreate = __webpack_require__("65f0");
var createProperty = __webpack_require__("8418");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var TypeError = global.TypeError;
var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ "a640":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "ac1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var exec = __webpack_require__("9263");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "addb":
/***/ (function(module, exports, __webpack_require__) {

var arraySlice = __webpack_require__("f36a");

var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice(array, 0, middle), comparefn),
    mergeSort(arraySlice(array, middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
      : lindex < llength ? left[lindex++] : right[rindex++];
  } return array;
};

module.exports = mergeSort;


/***/ }),

/***/ "b041":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classof = __webpack_require__("f5df");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "b0c0":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var FUNCTION_NAME_EXISTS = __webpack_require__("5e77").EXISTS;
var uncurryThis = __webpack_require__("e330");
var defineProperty = __webpack_require__("9bf2").f;

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis(FunctionPrototype.toString);
var nameRE = /^\s*function ([^ (]*)/;
var regExpExec = uncurryThis(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var hasOwn = __webpack_require__("1a2d");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "b64b":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var nativeKeys = __webpack_require__("df75");
var fails = __webpack_require__("d039");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "b680":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var toIntegerOrInfinity = __webpack_require__("5926");
var thisNumberValue = __webpack_require__("408a");
var $repeat = __webpack_require__("1148");
var fails = __webpack_require__("d039");

var RangeError = global.RangeError;
var String = global.String;
var floor = Math.floor;
var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var un$ToFixed = uncurryThis(1.0.toFixed);

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;
  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;
  while (--index >= 0) {
    c += data[index];
    data[index] = floor(c / n);
    c = (c % n) * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';
  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = String(data[index]);
      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
    }
  } return s;
};

var FORCED = fails(function () {
  return un$ToFixed(0.00008, 3) !== '0.000' ||
    un$ToFixed(0.9, 0) !== '1' ||
    un$ToFixed(1.255, 2) !== '1.25' ||
    un$ToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  un$ToFixed({});
});

// `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toIntegerOrInfinity(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }
        multiply(data, pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }
        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat('0', fractDigits - k) + result
        : stringSlice(result, 0, k - fractDigits) + '.' + stringSlice(result, k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});


/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var isObject = __webpack_require__("861d");
var isSymbol = __webpack_require__("d9b5");
var getMethod = __webpack_require__("dc4a");
var ordinaryToPrimitive = __webpack_require__("485a");
var wellKnownSymbol = __webpack_require__("b622");

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c65b":
/***/ (function(module, exports) {

var call = Function.prototype.call;

module.exports = call.bind ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var hasOwn = __webpack_require__("1a2d");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ "cb29":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fill = __webpack_require__("81d5");
var addToUnscopables = __webpack_require__("44d2");

// `Array.prototype.fill` method
// https://tc39.es/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "d3b7":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var redefine = __webpack_require__("6eeb");
var toString = __webpack_require__("b041");

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "d998":
/***/ (function(module, exports, __webpack_require__) {

var UA = __webpack_require__("342f");

module.exports = /MSIE|Trident/.test(UA);


/***/ }),

/***/ "d9b5":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var isCallable = __webpack_require__("1626");
var isPrototypeOf = __webpack_require__("3a9b");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "dc4a":
/***/ (function(module, exports, __webpack_require__) {

var aCallable = __webpack_require__("59ed");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "e330":
/***/ (function(module, exports) {

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var callBind = bind && bind.bind(call);

module.exports = bind ? function (fn) {
  return fn && callBind(call, fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var hasOwn = __webpack_require__("1a2d");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ "f36a":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

module.exports = uncurryThis([].slice);


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var isCallable = __webpack_require__("1626");
var classofRaw = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/App.vue?vue&type=template&id=d9884e3e&lang=pug

var _hoisted_1 = {
  key: 0,
  class: "text-center mb-4"
};

var _hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  class: "spinner-border",
  role: "status"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "visually-hidden"
}, "Loading...")], -1);

var _hoisted_3 = [_hoisted_2];
var _hoisted_4 = {
  class: "row g-0"
};
var _hoisted_5 = {
  class: "row g-0"
};
var _hoisted_6 = {
  key: 0,
  class: "col-lg-3 bg-light"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TitleForm = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TitleForm");

  var _component_PlayerForm = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("PlayerForm");

  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  var _component_PathForm = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("PathForm");

  var _component_TeamList = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TeamList");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, [this.loadLoading ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_1, _hoisted_3)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TitleForm, {
    selectedMode: $data.selectedMode,
    "onUpdate:selectedMode": _cache[0] || (_cache[0] = function ($event) {
      return $data.selectedMode = $event;
    }),
    selectedPlayer: $data.selectedPlayer,
    "onUpdate:selectedPlayer": _cache[1] || (_cache[1] = function ($event) {
      return $data.selectedPlayer = $event;
    }),
    TitleFormValues: $data.TitleFormValues,
    onTitleFormValues: $options.getTitleFormValueUpdates,
    onSaveBoard: $options.SaveBoard,
    validate: $data.validate,
    onValidTitle: $options.validTitle,
    viewOnly: $props.viewOnly,
    loadLoading: $props.loadLoading,
    saveLoading: $props.saveLoading
  }, null, 8, ["selectedMode", "selectedPlayer", "TitleFormValues", "onTitleFormValues", "onSaveBoard", "validate", "onValidTitle", "viewOnly", "loadLoading", "saveLoading"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_5, [!this.viewOnly ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_PlayerForm, {
    selectedField: $data.selectedField,
    "onUpdate:selectedField": _cache[2] || (_cache[2] = function ($event) {
      return $data.selectedField = $event;
    }),
    selectedMode: $data.selectedMode,
    "onUpdate:selectedMode": _cache[3] || (_cache[3] = function ($event) {
      return $data.selectedMode = $event;
    }),
    PlayerFormValues: $data.PlayerFormValues,
    onPlayerFormValues: $options.getPlayerFormValueUpdates,
    playerError: $data.playerError,
    "onUpdate:playerError": _cache[4] || (_cache[4] = function ($event) {
      return $data.playerError = $event;
    }),
    validate: $data.validate,
    onValidPlayers: $options.validPlayers,
    loadLoading: $props.loadLoading
  }, null, 8, ["selectedField", "selectedMode", "PlayerFormValues", "onPlayerFormValues", "playerError", "validate", "onValidPlayers", "loadLoading"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(!this.viewOnly ? 'col-lg-9' : '')
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
    selectedField: $data.selectedField,
    selectedMode: $data.selectedMode,
    "onUpdate:selectedMode": _cache[5] || (_cache[5] = function ($event) {
      return $data.selectedMode = $event;
    }),
    selectedPlayer: $data.selectedPlayer,
    "onUpdate:selectedPlayer": _cache[6] || (_cache[6] = function ($event) {
      return $data.selectedPlayer = $event;
    }),
    prevSelectedPlayer: $data.prevSelectedPlayer,
    "onUpdate:prevSelectedPlayer": _cache[7] || (_cache[7] = function ($event) {
      return $data.prevSelectedPlayer = $event;
    }),
    players: $data.players,
    "onUpdate:players": _cache[8] || (_cache[8] = function ($event) {
      return $data.players = $event;
    }),
    onCreatePlayer: $options.createPlayer,
    onDeletePlayer: $options.deletePlayer,
    onEditPlayerPath: $options.editPlayerPath,
    onResetPlayerPath: $options.resetPlayerPath,
    onSetPositions: $options.setPositions,
    onResetPositions: $options.resetPositions,
    onUpdateDimensions: $options.updateDimensions,
    forcePlayerUpdate: $data.forcePlayerUpdate,
    "onUpdate:forcePlayerUpdate": _cache[9] || (_cache[9] = function ($event) {
      return $data.forcePlayerUpdate = $event;
    }),
    loadLoading: $props.loadLoading
  }, null, 8, ["selectedField", "selectedMode", "selectedPlayer", "prevSelectedPlayer", "players", "onCreatePlayer", "onDeletePlayer", "onEditPlayerPath", "onResetPlayerPath", "onSetPositions", "onResetPositions", "onUpdateDimensions", "forcePlayerUpdate", "loadLoading"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_PathForm, {
    selectedPlayer: $data.selectedPlayer,
    players: $data.players,
    dimensions: $data.dimensions,
    PathFormValues: $data.PathFormValues,
    onPathFormValues: $options.getPathFormValueUpdates,
    forcePlayerUpdate: $data.forcePlayerUpdate,
    validate: $data.validate,
    onValidPaths: $options.validPaths,
    viewOnly: $props.viewOnly,
    loadLoading: $props.loadLoading
  }, null, 8, ["selectedPlayer", "players", "dimensions", "PathFormValues", "onPathFormValues", "forcePlayerUpdate", "validate", "onValidPaths", "viewOnly", "loadLoading"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TeamList, {
    selectedPlayer: $data.selectedPlayer,
    "onUpdate:selectedPlayer": _cache[10] || (_cache[10] = function ($event) {
      return $data.selectedPlayer = $event;
    }),
    players: $data.players,
    "onUpdate:players": _cache[11] || (_cache[11] = function ($event) {
      return $data.players = $event;
    }),
    forcePlayerUpdate: $data.forcePlayerUpdate,
    "onUpdate:forcePlayerUpdate": _cache[12] || (_cache[12] = function ($event) {
      return $data.forcePlayerUpdate = $event;
    }),
    loadLoading: $props.loadLoading
  }, null, 8, ["selectedPlayer", "players", "forcePlayerUpdate", "loadLoading"])], 2)])], 64);
}
// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=d9884e3e&lang=pug

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/TitleForm.vue?vue&type=template&id=eedd7286&lang=pug

var TitleFormvue_type_template_id_eedd7286_lang_pug_hoisted_1 = {
  key: 0,
  class: "p-4"
};
var TitleFormvue_type_template_id_eedd7286_lang_pug_hoisted_2 = {
  class: "row"
};
var TitleFormvue_type_template_id_eedd7286_lang_pug_hoisted_3 = {
  class: "col-sm-7 col-md-6 mb-4 mb-sm-0"
};
var TitleFormvue_type_template_id_eedd7286_lang_pug_hoisted_4 = {
  class: "row"
};

var TitleFormvue_type_template_id_eedd7286_lang_pug_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "col-4 col-sm-3 col-md-2 col-form-label",
  for: "tfTitle"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h5", {
  class: "mb-0"
}, "Title")], -1);

var TitleFormvue_type_template_id_eedd7286_lang_pug_hoisted_6 = {
  class: "col-8 col-sm-9 col-md-10"
};
var _hoisted_7 = ["value", "disabled"];
var _hoisted_8 = {
  key: 0,
  class: "invalid-feedback"
};
var _hoisted_9 = {
  class: "col-sm-5 col-md-6 mb-4 text-sm-end"
};
var _hoisted_10 = {
  class: "row"
};

var _hoisted_11 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "col-4 col-form-label d-sm-none"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h5", {
  class: "mb-0"
}, "Actions")], -1);

var _hoisted_12 = {
  class: "col-8 col-sm-12"
};
var _hoisted_13 = ["disabled"];
var _hoisted_14 = ["disabled"];
var _hoisted_15 = ["disabled"];

var _hoisted_16 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "spinner-border spinner-border-sm",
  role: "status"
}, null, -1);

var _hoisted_17 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "visually-hidden"
}, "Saving...", -1);

var _hoisted_18 = {
  key: 0,
  class: "input-group"
};

var _hoisted_19 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "is-invalid"
}, null, -1);

var _hoisted_20 = {
  class: "invalid-feedback"
};
var _hoisted_21 = {
  class: "row"
};
var _hoisted_22 = {
  class: "col-sm-7 col-md-6 mb-sm-0"
};
var _hoisted_23 = {
  class: "row g-0"
};
var _hoisted_24 = {
  class: "form-check col-8 col-sm-9 col-md-10"
};
var _hoisted_25 = ["checked", "disabled"];

var _hoisted_26 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-check-label",
  for: "tfPublic"
}, "Make public", -1);

var _hoisted_27 = {
  key: 0,
  class: "invalid-feedback"
};
function TitleFormvue_type_template_id_eedd7286_lang_pug_render(_ctx, _cache, $props, $setup, $data, $options) {
  return !this.loadLoading ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("form", TitleFormvue_type_template_id_eedd7286_lang_pug_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TitleFormvue_type_template_id_eedd7286_lang_pug_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TitleFormvue_type_template_id_eedd7286_lang_pug_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TitleFormvue_type_template_id_eedd7286_lang_pug_hoisted_4, [TitleFormvue_type_template_id_eedd7286_lang_pug_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TitleFormvue_type_template_id_eedd7286_lang_pug_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    type: "text",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.titleError ? 'form-control is-invalid' : 'form-control'),
    name: "tfTitle",
    id: "tfTitle",
    value: this.TitleFormValues ? this.TitleFormValues.title : '',
    onInput: _cache[0] || (_cache[0] = function () {
      return $options.handleTitleField && $options.handleTitleField.apply($options, arguments);
    }),
    autocomplete: "off",
    maxlength: "50",
    disabled: this.viewOnly ? 'disabled' : null
  }, null, 42, _hoisted_7), $data.titleError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_8, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.titleError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_10, [_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(!this.play ? 'btn btn-outline-success play-icon me-2' : 'btn btn-success play-icon-active me-2'),
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.handlePlayButton && $options.handlePlayButton.apply($options, arguments);
    }),
    value: "Play",
    "data-bs-toggle": "tooltip",
    "data-bs-placement": "bottom",
    title: "Play",
    disabled: this.saveLoading ? 'disabled' : null
  }, null, 10, _hoisted_13), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(!this.play ? 'btn btn-danger stop-icon-active me-2' : 'btn btn-outline-danger stop-icon me-2'),
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.handleStopButton && $options.handleStopButton.apply($options, arguments);
    }),
    value: "Stop",
    "data-bs-toggle": "tooltip",
    "data-bs-placement": "bottom",
    title: "Stop",
    disabled: this.saveLoading ? 'disabled' : null
  }, null, 10, _hoisted_14), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(!this.saveLoading ? 'btn btn-outline-secondary save-icon' : 'btn btn-secondary'),
    onClick: _cache[3] || (_cache[3] = function () {
      return $options.handleSaveButton && $options.handleSaveButton.apply($options, arguments);
    }),
    value: "Save",
    "data-bs-toggle": "tooltip",
    "data-bs-placement": "bottom",
    title: "Save",
    disabled: this.viewOnly || this.saveLoading ? 'disabled' : null
  }, [this.saveLoading ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [_hoisted_16, _hoisted_17], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 10, _hoisted_15), $data.actionsError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_18, [_hoisted_19, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_20, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.actionsError), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_21, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_22, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_23, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_24, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    type: "checkbox",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.publicError ? 'form-check-input is-invalid' : 'form-check-input'),
    name: "tfPublic",
    id: "tfPublic",
    checked: this.TitleFormValues ? this.TitleFormValues.public : false,
    onInput: _cache[4] || (_cache[4] = function () {
      return $options.handlePublicField && $options.handlePublicField.apply($options, arguments);
    }),
    disabled: this.viewOnly ? 'disabled' : null
  }, null, 42, _hoisted_25), _hoisted_26, $data.publicError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_27, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.publicError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])])])])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true);
}
// CONCATENATED MODULE: ./src/components/TitleForm.vue?vue&type=template&id=eedd7286&lang=pug

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.test.js
var es_regexp_test = __webpack_require__("00b4");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/TitleForm.vue?vue&type=script&lang=js



/* harmony default export */ var TitleFormvue_type_script_lang_js = ({
  props: ['selectedMode', 'selectedPlayer', 'TitleFormValues', 'validate', 'viewOnly', 'loadLoading', 'saveLoading'],
  emits: ['update:selectedMode', 'update:selectedPlayer', 'TitleFormValues', 'SaveBoard', 'validTitle'],
  data: function data() {
    return {
      actions: ['play', 'stop', 'save'],
      play: false,
      titleError: null,
      actionsError: null,
      publicError: null
    };
  },
  watch: {
    selectedMode: function selectedMode(val) {
      if (val !== 'Play') {
        this.play = false;
      }
    },
    validate: function validate(val) {
      if (val) {
        this.play = false;

        if (this.TitleFormValues && this.validateTitle(this.TitleFormValues.title) && (this.TitleFormValues.public === true || this.TitleFormValues.public === false)) {
          this.titleError = null;
          this.publicError = null;
          this.$emit('validTitle', true);
        } else if (this.validateTitle(this.TitleFormValues.title) && (this.TitleFormValues.public !== true || this.TitleFormValues.public !== false)) {
          this.publicError = "Must be checked or unchecked.";
          this.$emit('validTitle', false);
        } else {
          this.titleError = "Must be 1 to 50 characters. Can contain A-Z, a-z, 0-9, spaces, and _.,?!-\"'.";
          this.$emit('validTitle', false);
        }
      } else {
        this.$emit('validTitle', false);
      }
    }
  },
  methods: {
    validateAction: function validateAction(action) {
      var actions = this.actions;

      for (var i = 0; i < actions.length; i++) {
        if (action.toLowerCase() === actions[i]) {
          return true;
        }
      }

      return false;
    },
    handlePlayButton: function handlePlayButton(event) {
      var action;

      if (!event.target.value) {
        action = event.target.parentNode.value;
      } else {
        action = event.target.value;
      }

      if (this.validateAction(action)) {
        if (!this.play) {
          this.actionsError = null;
          this.$emit('update:selectedMode', '');
          this.$nextTick(function () {
            this.play = true;
            this.$emit('update:selectedMode', 'Play');
            this.$emit('update:selectedPlayer', -1);
          });
        }
      } else {
        this.actionsError = 'Must be among ' + this.actions.join(', ');
        this.$emit('update:selectedMode', '');
      }
    },
    handleStopButton: function handleStopButton(event) {
      var action;

      if (!event.target.value) {
        action = event.target.parentNode.value;
      } else {
        action = event.target.value;
      }

      if (this.validateAction(action)) {
        if (this.play) {
          this.actionsError = null;
          this.play = false;
          this.$emit('update:selectedMode', '');
        }
      } else {
        this.actionsError = 'Must be among ' + this.actions.join(', ');
        this.$emit('update:selectedMode', '');
      }
    },
    handleSaveButton: function handleSaveButton(event) {
      var action;

      if (!event.target.value) {
        action = event.target.parentNode.value;
      } else {
        action = event.target.value;
      }

      if (this.validateAction(action)) {
        this.actionsError = null;
        this.play = false;
        this.$emit('update:selectedMode', '');
        this.$nextTick(function () {
          this.$emit('SaveBoard');
        });
      } else {
        this.actionsError = 'Must be among ' + this.actions.join(', ');
      }
    },
    validateTitle: function validateTitle(title) {
      if (/^[A-Za-z0-9 _,!.?"'-]{1,50}$/.test(title)) {
        return true;
      }

      return false;
    },
    handleTitleField: function handleTitleField(event) {
      if (this.validateTitle(event.target.value)) {
        this.titleError = null;
        this.$emit('TitleFormValues', {
          titleError: false,
          title: event.target.value,
          publicError: false,
          public: this.TitleFormValues.public
        });
      } else {
        this.titleError = "Must be 1 to 50 characters. Can contain A-Z, a-z, 0-9, spaces, and _.,?!-\"'.";
        this.$emit('TitleFormValues', {
          titleError: true,
          title: event.target.value,
          publicError: false,
          public: this.TitleFormValues.public
        });
      }
    },
    handlePublicField: function handlePublicField(event) {
      if (this.TitleFormValues.public === true || this.TitleFormValues.public === false) {
        this.publicError = null;
        this.$emit('TitleFormValues', {
          titleError: false,
          title: this.TitleFormValues.title,
          publicError: false,
          public: event.target.checked
        });
      } else {
        this.publicError = "Must be checked or unchecked.";
        this.$emit('TitleFormValues', {
          titleError: false,
          title: this.TitleFormValues.title,
          publicError: true,
          public: event.target.checked
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/TitleForm.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/components/TitleForm.vue





const __exports__ = /*#__PURE__*/exportHelper_default()(TitleFormvue_type_script_lang_js, [['render',TitleFormvue_type_template_id_eedd7286_lang_pug_render]])

/* harmony default export */ var TitleForm = (__exports__);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Field.vue?vue&type=template&id=fe55493c&lang=pug

var Fieldvue_type_template_id_fe55493c_lang_pug_hoisted_1 = {
  class: "col-12"
};
function Fieldvue_type_template_id_fe55493c_lang_pug_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Fieldvue_type_template_id_fe55493c_lang_pug_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("canvas", {
    ref: "canvasElement",
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.handleFieldClick && $options.handleFieldClick.apply($options, arguments);
    }),
    onPointerdown: _cache[1] || (_cache[1] = function () {
      return $options.handleFieldMouseDown && $options.handleFieldMouseDown.apply($options, arguments);
    }),
    onPointermove: _cache[2] || (_cache[2] = function () {
      return $options.handleFieldMouseMove && $options.handleFieldMouseMove.apply($options, arguments);
    }),
    onPointerup: _cache[3] || (_cache[3] = function () {
      return $options.handleFieldMouseUp && $options.handleFieldMouseUp.apply($options, arguments);
    })
  }, null, 544)], 512)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !this.loadLoading]]);
}
// CONCATENATED MODULE: ./src/components/Field.vue?vue&type=template&id=fe55493c&lang=pug

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.fill.js
var es_array_fill = __webpack_require__("cb29");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Field.vue?vue&type=script&lang=js




/* harmony default export */ var Fieldvue_type_script_lang_js = ({
  props: ['selectedField', 'selectedMode', 'selectedPlayer', 'prevSelectedPlayer', 'players', 'forcePlayerUpdate', 'loadLoading'],
  emits: ['update:selectedMode', 'update:selectedPlayer', 'update:prevSelectedPlayer', 'update:players', 'createPlayer', 'deletePlayer', 'editPlayerPath', 'resetPlayerPath', 'setPositions', 'resetPositions', 'update:forcePlayerUpdate', 'updateDimensions'],
  mounted: function mounted() {
    this.$refs.canvasElement.parentNode.style.width = '100%';
    this.setupCanvas();
    this.$emit('updateDimensions', {
      width: this.width,
      height: this.height,
      orientation: this.orientation
    });
    this.setupCanvas();
    window.addEventListener('resize', this.resize, false);
  },
  beforeUnmount: function beforeUnmount() {
    window.removeEventListener('resize', this.resize, false);
  },
  data: function data() {
    return {
      width: 0,
      isDragging: false,
      mostRecentSelectedPlayerId: 0,
      prevTime: 0,
      currentFrame: null,
      frameDuration: 1 / 60,
      resetCurrTime: false
    };
  },
  computed: {
    height: function height() {
      if (this.selectedField === 'Soccer') {
        if (this.orientation === 'v') {
          return this.width * 105 / 67.5;
        } else {
          return this.width * 67.5 / 105;
        }
      } else if (this.selectedField === 'Basketball') {
        if (this.orientation === 'v') {
          return this.width * 28.7 / 15.2;
        } else {
          return this.width * 15.2 / 28.7;
        }
      } else if (this.selectedField === 'American Football') {
        if (this.orientation === 'v') {
          return this.width * 109.728 / 48.8;
        } else {
          return this.width * 48.8 / 109.728;
        }
      }

      return 0;
    },
    orientation: function orientation() {
      if (this.width < 576) {
        return 'v';
      } else {
        return 'h';
      }
    },
    widthConversion: function widthConversion() {
      if (this.selectedField === 'Soccer') {
        if (this.orientation === 'h') {
          return this.width / 105;
        } else {
          return this.height / 105;
        }
      } else if (this.selectedField === 'Basketball') {
        if (this.orientation === 'h') {
          return this.width / 28.7;
        } else {
          return this.height / 28.7;
        }
      } else if (this.selectedField === 'American Football') {
        if (this.orientation === 'h') {
          return this.width / 109.728;
        } else {
          return this.height / 109.728;
        }
      }

      return 1;
    },
    heightConversion: function heightConversion() {
      if (this.selectedField === 'Soccer') {
        if (this.orientation === 'h') {
          return this.height / 67.5;
        } else {
          return this.width / 67.5;
        }
      } else if (this.selectedField === 'Basketball') {
        if (this.orientation === 'h') {
          return this.height / 15.2;
        } else {
          return this.width / 15.2;
        }
      } else if (this.selectedField === 'American Football') {
        if (this.orientation === 'h') {
          return this.height / 48.8;
        } else {
          return this.width / 48.8;
        }
      }

      return 1;
    },
    ballRadius: function ballRadius() {
      return this.playerRadius / 2;
    },
    playerRadius: function playerRadius() {
      if (this.selectedField === 'Soccer') {
        return this.widthConversion * 1.5;
      } else if (this.selectedField === 'Basketball') {
        return this.widthConversion * 0.5;
      } else if (this.selectedField === 'American Football') {
        return this.widthConversion * 1.25;
      }

      return 1;
    },
    playerFontSize: function playerFontSize() {
      if (this.selectedField === 'Soccer') {
        return this.widthConversion * 1.5;
      } else if (this.selectedField === 'Basketball') {
        return this.widthConversion * 0.5;
      } else if (this.selectedField === 'American Football') {
        return this.widthConversion * 1.25;
      }

      return 1;
    }
  },
  watch: {
    selectedField: function selectedField() {
      window.cancelAnimationFrame(this.currentFrame);
      this.prevTime = 0;
      this.$emit('resetPositions');
      this.$emit('update:selectedMode', '');
      this.$nextTick(function () {
        this.setupCanvas();
      });
    },
    selectedMode: function selectedMode(val) {
      if (val === 'Play') {
        this.animateCanvas();
      } else {
        window.cancelAnimationFrame(this.currentFrame);
        this.prevTime = 0;
        this.$emit('resetPositions');
        this.$nextTick(function () {
          this.setupCanvas();
        });
      }
    },
    forcePlayerUpdate: function forcePlayerUpdate(val) {
      if (val) {
        this.setupCanvas();
        this.$emit('update:forcePlayerUpdate', false);
      }
    },
    loadLoading: function loadLoading(val) {
      if (!val) {
        this.$nextTick(function () {
          this.$refs.canvasElement.parentNode.style.width = '100%';
          this.setupCanvas();
          this.$emit('updateDimensions', {
            width: this.width,
            height: this.height,
            orientation: this.orientation
          });
        });
      }
    }
  },
  methods: {
    distance: function distance(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    },
    getSelectedPlayer: function getSelectedPlayer(coords) {
      for (var i = this.players.length - 1; i >= 0; i--) {
        var distance;

        if (this.orientation === 'v') {
          distance = this.distance(this.players[i].path[0].x * this.width, -1 * (this.players[i].path[0].y - 1) * this.height, coords.x * this.width, -1 * (coords.y - 1) * this.height);
        } else {
          distance = this.distance(this.players[i].path[0].x * this.width, this.players[i].path[0].y * this.height, coords.x * this.width, coords.y * this.height);
        }

        var radius;

        if (this.players[i].team === 'Ball') {
          radius = this.ballRadius;
        } else {
          radius = this.playerRadius;
        }

        if (distance <= radius) {
          var playersCopy = this.players;
          var selectedPlayerCopy = this.players[i];
          playersCopy.splice(i, 1);
          playersCopy.push(selectedPlayerCopy);
          this.$emit('update:selectedPlayer', i);
          this.$emit('update:players', playersCopy);
          this.$emit('update:forcePlayerUpdate', true);

          if (this.selectedMode === 'Path') {
            this.mostRecentSelectedPlayerId = 0;
          }

          this.$nextTick(function () {
            this.$emit('update:selectedPlayer', this.players.length - 1);
            this.$emit('update:prevSelectedPlayer', this.players.length - 1);
          });
          return selectedPlayerCopy;
        }
      }

      if (this.selectedMode === 'Path') {
        this.mostRecentSelectedPlayerId = this.players[this.players.length - 1].id;
        this.$emit('update:prevSelectedPlayer', this.players.length - 1);
      } else {
        this.mostRecentSelectedPlayerId = 0;
      }

      this.$emit('update:selectedPlayer', -1);
    },
    handleFieldClick: function handleFieldClick(event) {
      var canvasRect = event.target.getBoundingClientRect();
      var rawX = event.clientX - canvasRect.left;
      var rawY = event.clientY - canvasRect.top;
      var x, y;

      if (this.orientation === 'v') {
        x = 1 - rawY / this.height;
        y = rawX / this.width;
      } else {
        x = rawX / this.width;
        y = rawY / this.height;
      }

      var coords = {
        x: x,
        y: y
      };

      if (this.selectedMode !== 'Play') {
        this.getSelectedPlayer(coords);
      }

      this.$nextTick(function () {
        if (this.selectedPlayer === -1 && this.selectedMode === 'Insert') {
          this.$emit('createPlayer', coords);
          this.$emit('update:forcePlayerUpdate', true);
        } else if (this.selectedPlayer !== -1 && this.selectedMode === 'Delete') {
          this.$emit('deletePlayer');
          this.$emit('update:forcePlayerUpdate', true);
        } else if (this.selectedPlayer === -1 && this.prevSelectedPlayer !== -1 && this.selectedMode === 'Path') {
          if (this.mostRecentSelectedPlayerId === this.players[this.players.length - 1].id) {
            this.$emit('editPlayerPath', coords);
            this.$emit('update:forcePlayerUpdate', true);
          }
        } else if (this.selectedPlayer !== -1 && this.selectedMode === 'Reset') {
          this.$emit('resetPlayerPath');
          this.$emit('update:forcePlayerUpdate', true);
        } else if (this.selectedPlayer === -1 && this.prevSelectedPlayer !== -1) {
          var prevSelectedPlayerCopy = this.players[this.players.length - 1];
          prevSelectedPlayerCopy.path[0] = coords;
          prevSelectedPlayerCopy.current.position = coords;
          this.$emit('update:selectedPlayer', prevSelectedPlayerCopy);
          this.$emit('update:forcePlayerUpdate', true);
        }
      });
    },
    handleFieldMouseDown: function handleFieldMouseDown() {
      var canvasRect = event.target.getBoundingClientRect();
      var rawX = event.clientX - canvasRect.left;
      var rawY = event.clientY - canvasRect.top;
      var x, y;

      if (this.orientation === 'v') {
        x = 1 - rawY / this.height;
        y = rawX / this.width;
      } else {
        x = rawX / this.width;
        y = rawY / this.height;
      }

      var coords = {
        x: x,
        y: y
      };

      if (this.selectedMode !== 'Play') {
        this.getSelectedPlayer(coords);
        this.isDragging = true;
      }
    },
    handleFieldMouseMove: function handleFieldMouseMove(event) {
      if (this.isDragging && this.selectedPlayer !== -1) {
        var canvasRect = event.target.getBoundingClientRect();
        var rawX = event.clientX - canvasRect.left;
        var rawY = event.clientY - canvasRect.top;
        var x, y;

        if (this.orientation === 'v') {
          x = 1 - rawY / this.height;
          y = rawX / this.width;
        } else {
          x = rawX / this.width;
          y = rawY / this.height;
        }

        var coords = {
          x: x,
          y: y
        };
        var selectedPlayerCopy = this.players[this.players.length - 1];
        selectedPlayerCopy.path[0] = coords;
        selectedPlayerCopy.current.position = coords;
        this.$emit('update:selectedPlayer', selectedPlayerCopy);
        this.$emit('update:forcePlayerUpdate', true);
      }
    },
    handleFieldMouseUp: function handleFieldMouseUp() {
      this.isDragging = false;
    },
    resize: function resize() {
      if (Math.floor(this.$refs.canvasElement.parentNode.getBoundingClientRect().width) !== this.width) {
        this.$emit('updateDimensions', {
          width: this.width,
          height: this.height,
          orientation: this.orientation
        });

        if (this.selectedMode === 'Play') {
          this.$emit('update:selectedMode', '');
        }

        this.$emit('update:forcePlayerUpdate', true);
      }
    },
    setupCanvas: function setupCanvas() {
      this.width = Math.floor(this.$refs.canvasElement.parentNode.getBoundingClientRect().width);
      this.$refs.canvasElement.parentNode.style.height = this.height + 'px';

      if (this.width > document.documentElement.clientWidth) {
        this.width = Math.floor(document.documentElement.clientWidth);
        this.$refs.canvasElement.parentNode.style.height = this.height + 'px';
      }

      if (this.selectedField === 'Soccer') {
        this.drawSoccerField();
      } else if (this.selectedField === 'Basketball') {
        this.drawBasketballCourt();
      } else if (this.selectedField === 'American Football') {
        this.drawAmericanFootballField();
      }

      if ((this.selectedPlayer !== -1 || this.prevSelectedPlayer !== -1) && (this.selectedMode === 'Path' || this.selectedMode === 'Insert' || this.selectedMode === '')) {
        this.drawPlayerPaths(this.players[this.players.length - 1]);
      } else if (this.selectedMode === 'Reset') {
        for (var i = 0; i < this.players.length; i++) {
          this.drawPlayerPaths(this.players[i]);
        }
      }

      this.drawPlayers();
    },
    animateCanvas: function animateCanvas(currTime) {
      if (!currTime) {
        currTime = this.frameDuration * 1000;
      }

      var elapsed = currTime - this.prevTime;

      if (elapsed >= this.frameDuration * 1000) {
        if (this.resetCurrTime) {
          elapsed = this.frameDuration * 1000;
          this.resetCurrTime = false;
        }

        for (var i = 0; i < this.players.length; i++) {
          var current = this.movePlayer(this.players[i], elapsed);
          this.$emit('setPositions', i, current);
        }

        if (this.prevTime === 0) {
          this.resetCurrTime = true;
        }

        this.$nextTick(function () {
          this.setupCanvas();
          this.prevTime = currTime;
        });
      }

      this.currentFrame = window.requestAnimationFrame(this.animateCanvas);
    },
    movePlayer: function movePlayer(player, elapsedTime) {
      if (this.selectedMode !== 'Play') {
        return {
          step: 0,
          position: player.path[0],
          wait: 0
        };
      }

      if (player.current.step < player.path.length - 1) {
        var pathDistance, pathDistanceX, pathDistanceY, angle;
        var duration, pxPositionChange;

        if (this.orientation === 'v') {
          pathDistance = this.distance(player.path[player.current.step].y * this.width, -1 * (player.path[player.current.step].x - 1) * this.height, player.path[player.current.step + 1].y * this.width, -1 * (player.path[player.current.step + 1].x - 1) * this.height);
          pathDistanceX = -1 * (player.path[player.current.step + 1].x - 1) * this.height - -1 * (player.path[player.current.step].x - 1) * this.height;
          pathDistanceY = player.path[player.current.step + 1].y * this.width - player.path[player.current.step].y * this.width;
          angle = Math.atan2(-pathDistanceX, pathDistanceY);
        } else {
          pathDistance = this.distance(player.path[player.current.step].x * this.width, player.path[player.current.step].y * this.height, player.path[player.current.step + 1].x * this.width, player.path[player.current.step + 1].y * this.height);
          pathDistanceX = player.path[player.current.step + 1].x * this.width - player.path[player.current.step].x * this.width;
          pathDistanceY = player.path[player.current.step + 1].y * this.height - player.path[player.current.step].y * this.height;
          angle = Math.atan2(pathDistanceY, pathDistanceX);
        }

        if (!player.speed[player.current.step] || player.speed[player.current.step].val === 0) {
          pxPositionChange = 0;
        } else {
          duration = 1 / player.speed[player.current.step].val * (1 / this.widthConversion) * pathDistance;
          pxPositionChange = pathDistance * (elapsedTime / 1000 / duration);
        }

        var totalDistanceMoved;

        if (this.orientation === 'v') {
          totalDistanceMoved = this.distance(player.path[player.current.step].y * this.width, -1 * (player.path[player.current.step].x - 1) * this.height, player.current.position.y * this.width, -1 * (player.current.position.x - 1) * this.height);
        } else {
          totalDistanceMoved = this.distance(player.path[player.current.step].x * this.width, player.path[player.current.step].y * this.height, player.current.position.x * this.width, player.current.position.y * this.height);
        }

        if (totalDistanceMoved >= pathDistance || player.speed[player.current.step].val === 0 && player.current.wait >= player.speed[player.current.step].wait) {
          if (player.current.step < player.path.length - 1) {
            return {
              step: player.current.step + 1,
              position: player.path[player.current.step + 1],
              wait: 0
            };
          } else {
            return {
              step: 0,
              position: player.path[0],
              wait: 0
            };
          }
        } else {
          var pxPositionChangeX, pxPositionChangeY;
          var rawX, rawY, x, y;

          if (this.orientation === 'v') {
            pxPositionChangeX = pxPositionChange * Math.sin(angle);
            pxPositionChangeY = pxPositionChange * Math.cos(angle);
            rawX = player.current.position.x * this.height + pxPositionChangeX;
            rawY = player.current.position.y * this.width + pxPositionChangeY;
            x = rawX / this.height;
            y = rawY / this.width;
            return {
              step: player.current.step,
              position: {
                x: x,
                y: y
              },
              wait: player.current.wait + elapsedTime
            };
          } else {
            pxPositionChangeX = pxPositionChange * Math.cos(angle);
            pxPositionChangeY = pxPositionChange * Math.sin(angle);
            rawX = player.current.position.x * this.width + pxPositionChangeX;
            rawY = player.current.position.y * this.height + pxPositionChangeY;
            x = rawX / this.width;
            y = rawY / this.height;
            return {
              step: player.current.step,
              position: {
                x: x,
                y: y
              },
              wait: player.current.wait + elapsedTime
            };
          }
        }
      } else {
        return {
          step: 0,
          position: player.path[0],
          wait: 0
        };
      }
    },
    drawPlayers: function drawPlayers() {
      for (var i = 0; i < this.players.length; i++) {
        var canvasElement = this.$refs.canvasElement;

        if (canvasElement.getContext) {
          var context = canvasElement.getContext("2d"); // Draw player circle

          context.beginPath();
          context.fillStyle = this.players[i].color;
          var radius;

          if (this.players[i].team === 'Ball') {
            radius = this.ballRadius;
          } else {
            radius = this.playerRadius;
          }

          if (this.orientation === 'v') {
            context.arc(this.players[i].current.position.x * this.height, this.players[i].current.position.y * this.width, radius, 0, 2 * Math.PI);
          } else {
            context.arc(this.players[i].current.position.x * this.width, this.players[i].current.position.y * this.height, radius, 0, 2 * Math.PI);
          }

          context.fill();
          context.closePath(); // Draw player number

          var textColor = this.contrastingColor(this.players[i].color);
          var playerNumberFont = this.playerFontSize.toString(10) + "px sans-serif";
          context.font = playerNumberFont;
          context.fillStyle = textColor;

          if (this.players[i].number.toString(10).length > 1) {
            if (this.orientation === 'v') {
              context.translate(this.players[i].current.position.x * this.height, this.players[i].current.position.y * this.width);
              context.rotate(Math.PI * 0.5);
              context.fillText(this.players[i].number, 0 - this.playerFontSize * 0.575, 0 + this.playerFontSize * 0.375);
              context.rotate(-1 * Math.PI * 0.5);
              context.translate(-1 * this.players[i].current.position.x * this.height, -1 * this.players[i].current.position.y * this.width);
            } else {
              context.fillText(this.players[i].number, this.players[i].current.position.x * this.width - this.playerFontSize * 0.575, this.players[i].current.position.y * this.height + this.playerFontSize * 0.375);
            }
          } else {
            if (this.orientation === 'v') {
              context.translate(this.players[i].current.position.x * this.height, this.players[i].current.position.y * this.width);
              context.rotate(Math.PI * 0.5);
              context.fillText(this.players[i].number, 0 - this.playerFontSize * 0.3, 0 + this.playerFontSize * 0.375);
              context.rotate(-1 * Math.PI * 0.5);
              context.translate(-1 * this.players[i].current.position.x * this.height, -1 * this.players[i].current.position.y * this.width);
            } else {
              context.fillText(this.players[i].number, this.players[i].current.position.x * this.width - this.playerFontSize * 0.3, this.players[i].current.position.y * this.height + this.playerFontSize * 0.375);
            }
          }
        }
      }
    },
    drawPlayerPaths: function drawPlayerPaths(player) {
      var canvasElement = this.$refs.canvasElement;

      if (canvasElement.getContext) {
        var context = canvasElement.getContext("2d");
        var lineColor = "rgb(0, 0, 0)";
        var lineWidth = 1;
        var lineStyle = "round";
        context.fillStyle = lineColor;
        context.strokeStyle = lineColor;
        context.lineWidth = lineWidth;
        context.lineCap = lineStyle;

        for (var j = 1; j < player.path.length; j++) {
          // Path line
          context.beginPath();
          context.setLineDash([5, 10]);

          if (this.orientation === 'v') {
            context.moveTo(player.path[j - 1].x * this.height, player.path[j - 1].y * this.width);
            context.lineTo(player.path[j].x * this.height, player.path[j].y * this.width);
          } else {
            context.moveTo(player.path[j - 1].x * this.width, player.path[j - 1].y * this.height);
            context.lineTo(player.path[j].x * this.width, player.path[j].y * this.height);
          }

          context.stroke();
          context.closePath(); // Arrow head

          context.setLineDash([]);
          var angle, distance;

          if (this.orientation === 'v') {
            angle = Math.atan2((player.path[j].y - player.path[j - 1].y) * this.width, (player.path[j].x - player.path[j - 1].x) * this.height);
            context.translate(player.path[j].x * this.height, player.path[j].y * this.width);
            distance = this.distance(player.path[j].y * this.width, -1 * (player.path[j].x - 1) * this.height, player.path[j - 1].y * this.width, -1 * (player.path[j - 1].x - 1) * this.height);
          } else {
            angle = Math.atan2((player.path[j].y - player.path[j - 1].y) * this.height, (player.path[j].x - player.path[j - 1].x) * this.width);
            context.translate(player.path[j].x * this.width, player.path[j].y * this.height);
            distance = this.distance(player.path[j].x * this.width, player.path[j].y * this.height, player.path[j - 1].x * this.width, player.path[j - 1].y * this.height);
          }

          var radius = 2;

          if (distance <= 2 * radius) {
            context.beginPath();
            context.arc(0, 0, radius, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
          } else {
            context.rotate(angle + 10);
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(5, 0);
            context.stroke();
            context.closePath();
            context.rotate(-20);
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(5, 0);
            context.stroke();
            context.closePath();
            context.rotate(-1 * (angle - 10));
          }

          if (this.orientation === 'v') {
            context.translate(-1 * player.path[j].x * this.height, -1 * player.path[j].y * this.width);
          } else {
            context.translate(-1 * player.path[j].x * this.width, -1 * player.path[j].y * this.height);
          }
        }
      }
    },
    contrastingColor: function contrastingColor(hexColor) {
      var r = hexColor.substring(1, 3);
      var g = hexColor.substring(3, 5);
      var b = hexColor.substring(5, 7);
      var decR = parseInt(r, 16);
      var decG = parseInt(g, 16);
      var decB = parseInt(b, 16);

      if (decR + decG + decB > 382) {
        return '#000000';
      } else {
        return '#ffffff';
      }
    },
    drawSoccerField: function drawSoccerField() {
      var width, height;

      if (this.orientation === 'v') {
        width = this.height;
        height = this.width;
        this.$refs.canvasElement.width = height;
        this.$refs.canvasElement.height = width;
      } else {
        width = this.width;
        height = this.height;
        this.$refs.canvasElement.width = width;
        this.$refs.canvasElement.height = height;
      }

      if (this.$refs.canvasElement.getContext) {
        var context = this.$refs.canvasElement.getContext("2d"); // Orientation

        if (this.orientation === 'v') {
          context.translate(0, width);
          context.rotate(-1 * Math.PI * 0.5);
        } // Constants


        var border = this.widthConversion * 2;
        var surfaceColor = "rgb(75, 140, 20)";
        var lineWidth = 1;
        var lineColor = "rgb(255, 255, 255)";
        var lineStyle = "square";
        var cornerCircleRadius = this.widthConversion * 1;
        var centerCircleRadius = this.widthConversion * 9.15;
        var penaltyDistance = this.widthConversion * 11;
        var penaltyBoxDistance = this.widthConversion * 16.5;
        var halfPenaltyBoxHeight = this.heightConversion * 20.16;
        var sixYardBoxDistance = this.widthConversion * 5.5;
        var halfSixYardBoxHeight = this.heightConversion * 9.16;
        var goalDistance = border * 0.75;
        var halfGoalHeight = this.heightConversion * 3.66; // Surface

        context.save();
        context.fillStyle = surfaceColor;
        context.fillRect(0, 0, width, height);
        context.restore();
        context.strokeStyle = lineColor;
        context.lineWidth = lineWidth;
        context.lineCap = lineStyle;
        context.fillStyle = lineColor;
        context.save(); // Goal lines and touch lines

        context.strokeRect(border, border, width - 2 * border, height - 2 * border); // Halfway line

        context.beginPath();
        context.moveTo(width / 2, border);
        context.lineTo(width / 2, height - border);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(width / 2, height / 2, lineWidth + 1, 0, Math.PI * 2);
        context.fill();
        context.closePath(); // Center circle

        context.beginPath();
        context.arc(width / 2, height / 2, centerCircleRadius, 0, Math.PI * 2);
        context.stroke();
        context.closePath(); // Corner circles

        context.beginPath();
        context.arc(border, border, cornerCircleRadius, 0, Math.PI * 0.5);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(width - border, border, cornerCircleRadius, Math.PI * 0.5, Math.PI);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(width - border, height - border, cornerCircleRadius, Math.PI, Math.PI * 1.5);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(border, height - border, cornerCircleRadius, Math.PI * 1.5, Math.PI * 2);
        context.stroke();
        context.closePath(); // Left penalty area

        context.beginPath();
        context.arc(border + penaltyDistance, height / 2, centerCircleRadius, 0, Math.PI * 2);
        context.stroke();
        context.closePath();
        context.fillStyle = surfaceColor;
        context.fillRect(border, height / 2 - halfPenaltyBoxHeight, penaltyBoxDistance, 2 * halfPenaltyBoxHeight);
        context.strokeRect(border, height / 2 - halfPenaltyBoxHeight, penaltyBoxDistance, 2 * halfPenaltyBoxHeight);
        context.strokeRect(border, height / 2 - halfSixYardBoxHeight, sixYardBoxDistance, 2 * halfSixYardBoxHeight); // Right penalty area

        context.beginPath();
        context.arc(width - border - penaltyDistance, height / 2, centerCircleRadius, 0, Math.PI * 2);
        context.stroke();
        context.closePath();
        context.fillStyle = surfaceColor;
        context.fillRect(width - border - penaltyBoxDistance, height / 2 - halfPenaltyBoxHeight, penaltyBoxDistance, 2 * halfPenaltyBoxHeight);
        context.strokeRect(width - border - penaltyBoxDistance, height / 2 - halfPenaltyBoxHeight, penaltyBoxDistance, 2 * halfPenaltyBoxHeight);
        context.strokeRect(width - border - sixYardBoxDistance, height / 2 - halfSixYardBoxHeight, sixYardBoxDistance, 2 * halfSixYardBoxHeight); // Left penalty spot

        context.fillStyle = lineColor;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(border + penaltyDistance, height / 2);
        context.arc(border + penaltyDistance, height / 2, lineWidth + 1, 0, Math.PI * 2);
        context.fill();
        context.closePath();
        context.strokeRect(border - goalDistance, height / 2 - halfGoalHeight, goalDistance, 2 * halfGoalHeight); // Right penalty spot

        context.beginPath();
        context.moveTo(width - border - penaltyDistance, height / 2);
        context.arc(width - border - penaltyDistance, height / 2, lineWidth + 1, 0, Math.PI * 2);
        context.fill();
        context.closePath();
        context.strokeRect(width - border, height / 2 - halfGoalHeight, goalDistance, 2 * halfGoalHeight);
      }
    },
    drawBasketballCourt: function drawBasketballCourt() {
      var width, height;

      if (this.orientation === 'v') {
        width = this.height;
        height = this.width;
        this.$refs.canvasElement.width = height;
        this.$refs.canvasElement.height = width;
      } else {
        width = this.width;
        height = this.height;
        this.$refs.canvasElement.width = width;
        this.$refs.canvasElement.height = height;
      }

      if (this.$refs.canvasElement.getContext) {
        var context = this.$refs.canvasElement.getContext("2d"); // Orientation

        if (this.orientation === 'v') {
          context.translate(0, width);
          context.rotate(-1 * Math.PI * 0.5);
        } // Constants


        var border = this.widthConversion * 0.1;
        var surfaceColor = "rgb(240, 200, 75)";
        var paintColor = "rgb(240, 65, 20)";
        var keyColor = "rgb(20, 85, 240)";
        var lineWidth = 1;
        var lineColor = "rgb(255, 255, 255)";
        var lineStyle = "square";
        var outerHalfCourtCircleRadius = this.widthConversion * 1.8;
        var innerHalfCourtCircleRadius = this.widthConversion * 0.61;
        var threePointCircleRadius = this.widthConversion * 7.24;
        var threePointCornersDistance = this.widthConversion * 4.4;
        var threePointCornersWidth = this.widthConversion * 0.9;
        var paintHalfWidth = this.widthConversion * 2.45;
        var paintLineMarker = this.widthConversion * 0.91;
        var paintDistance = this.widthConversion * 5.8;
        var freeThrowCircleRadius = this.widthConversion * 1.8;
        var basketDistance = this.widthConversion * 1.6;
        var restrictedAreaRadius = this.widthConversion * 1.22;
        var basketRadius = this.widthConversion * 0.2286;
        var backboardDistance = this.widthConversion * 1.22;
        var backboardWidth = this.widthConversion * 1.83;
        var backboardSize = 3;
        var lineMarkerLength = this.widthConversion * 0.3;
        var threePointMarkerDistance = this.widthConversion * 8.53;
        var hashMarker1 = this.widthConversion * 2.13;
        var hashMarker2 = this.widthConversion * 2.43;
        var hashMarker3 = this.widthConversion * 3.34;
        var hashMarker4 = this.widthConversion * 4.25; // Surface

        context.save();
        context.fillStyle = surfaceColor;
        context.fillRect(0, 0, width, height);
        context.restore();
        context.strokeStyle = lineColor;
        context.lineWidth = lineWidth;
        context.lineCap = lineStyle;
        context.fillStyle = lineColor;
        context.save(); // Half-court

        context.beginPath();
        context.moveTo(width / 2, border);
        context.lineTo(width / 2, height - border);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(width / 2, height / 2, outerHalfCourtCircleRadius, 0, Math.PI * 2);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(width / 2, height / 2, innerHalfCourtCircleRadius, 0, Math.PI * 2);
        context.stroke();
        context.closePath(); // Left three point line

        context.beginPath();
        context.arc(basketDistance, height / 2, threePointCircleRadius, -1 * Math.PI * 0.5, Math.PI * 0.5);
        context.stroke();
        context.closePath();
        context.fillStyle = surfaceColor;
        context.fillRect(border + 1, border + 1, threePointCornersDistance, height - 2 * border - 2);
        context.beginPath();
        context.moveTo(border + 1, border - 1 + threePointCornersWidth);
        context.lineTo(border + 1 + threePointCornersDistance, border - 1 + threePointCornersWidth);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + 1, height - border + 1 - threePointCornersWidth);
        context.lineTo(border + 1 + threePointCornersDistance, height - border + 1 - threePointCornersWidth);
        context.stroke();
        context.closePath(); // Right three point line

        context.beginPath();
        context.arc(width - basketDistance, height / 2, threePointCircleRadius, Math.PI * 0.5, Math.PI * 1.5);
        context.stroke();
        context.closePath();
        context.fillStyle = surfaceColor;
        context.fillRect(width - border - 1 - threePointCornersDistance, border + 1, threePointCornersDistance, height - 2 * border - 2);
        context.beginPath();
        context.moveTo(width - border - 1 - threePointCornersDistance, border - 1 + threePointCornersWidth);
        context.lineTo(width - border - 1, border - 1 + threePointCornersWidth);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - border - 1 - threePointCornersDistance, height - border + 1 - threePointCornersWidth);
        context.lineTo(width - border - 1, height - border + 1 - threePointCornersWidth);
        context.stroke();
        context.closePath(); // Left paint

        context.fillStyle = paintColor;
        context.fillRect(border + 1, height / 2 - paintHalfWidth, paintDistance, 2 * paintHalfWidth);
        context.strokeRect(border, height / 2 - paintHalfWidth, paintDistance + 1, 2 * paintHalfWidth);
        context.fillStyle = keyColor;
        context.fillRect(border + 1, height / 2 - freeThrowCircleRadius, paintDistance, 2 * freeThrowCircleRadius);
        context.strokeRect(border, height / 2 - freeThrowCircleRadius, paintDistance + 1, 2 * freeThrowCircleRadius); // Left dashed circle

        context.beginPath();
        context.arc(border + 1 + paintDistance, height / 2, freeThrowCircleRadius, -1 * Math.PI * 0.5, Math.PI * 0.5);
        context.fill();
        context.stroke();
        context.closePath();
        context.setLineDash([5, 25]);
        context.beginPath();
        context.arc(border + 1 + paintDistance, height / 2, freeThrowCircleRadius, Math.PI * 0.5, -1 * Math.PI * 0.5);
        context.stroke();
        context.closePath();
        context.setLineDash([]); // Left paint line markers

        context.beginPath();
        context.moveTo(border, height / 2 - paintHalfWidth - paintLineMarker);
        context.lineTo(border + lineMarkerLength, height / 2 - paintHalfWidth - paintLineMarker);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border, height / 2 + paintHalfWidth + paintLineMarker);
        context.lineTo(border + lineMarkerLength, height / 2 + paintHalfWidth + paintLineMarker);
        context.stroke();
        context.closePath(); // Left three point markers

        context.beginPath();
        context.moveTo(border + threePointMarkerDistance, border);
        context.lineTo(border + threePointMarkerDistance, border + 2 * lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + threePointMarkerDistance, height - border);
        context.lineTo(border + threePointMarkerDistance, height - border - 2 * lineMarkerLength);
        context.stroke();
        context.closePath(); // Left hash markers

        context.beginPath();
        context.moveTo(border + hashMarker1, height / 2 - paintHalfWidth);
        context.lineTo(border + hashMarker1, height / 2 - paintHalfWidth - lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + hashMarker2, height / 2 - paintHalfWidth);
        context.lineTo(border + hashMarker2, height / 2 - paintHalfWidth - lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + hashMarker3, height / 2 - paintHalfWidth);
        context.lineTo(border + hashMarker3, height / 2 - paintHalfWidth - lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + hashMarker4, height / 2 - paintHalfWidth);
        context.lineTo(border + hashMarker4, height / 2 - paintHalfWidth - lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + hashMarker1, height / 2 + paintHalfWidth);
        context.lineTo(border + hashMarker1, height / 2 + paintHalfWidth + lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + hashMarker2, height / 2 + paintHalfWidth);
        context.lineTo(border + hashMarker2, height / 2 + paintHalfWidth + lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + hashMarker3, height / 2 + paintHalfWidth);
        context.lineTo(border + hashMarker3, height / 2 + paintHalfWidth + lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + hashMarker4, height / 2 + paintHalfWidth);
        context.lineTo(border + hashMarker4, height / 2 + paintHalfWidth + lineMarkerLength);
        context.stroke();
        context.closePath(); // Left basket

        context.beginPath();
        context.arc(border + 1 + basketDistance, height / 2, restrictedAreaRadius, -1 * Math.PI * 0.5, Math.PI * 0.5);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(border + 1 + basketDistance, height / 2, basketRadius, 0, Math.PI * 2);
        context.stroke();
        context.closePath();
        context.fillStyle = lineColor;
        context.fillRect(border + 1 + backboardDistance, height / 2 - backboardWidth / 2, backboardSize, backboardWidth); // Right paint

        context.fillStyle = paintColor;
        context.fillRect(width - border - 1 - paintDistance, height / 2 - paintHalfWidth, paintDistance, 2 * paintHalfWidth);
        context.strokeRect(width - border - 1 - paintDistance, height / 2 - paintHalfWidth, paintDistance + 1, 2 * paintHalfWidth);
        context.fillStyle = keyColor;
        context.fillRect(width - border - 1 - paintDistance, height / 2 - freeThrowCircleRadius, paintDistance, 2 * freeThrowCircleRadius);
        context.strokeRect(width - border - 1 - paintDistance, height / 2 - freeThrowCircleRadius, paintDistance + 1, 2 * freeThrowCircleRadius); // Right dashed circle

        context.beginPath();
        context.arc(width - border - 1 - paintDistance, height / 2, freeThrowCircleRadius, Math.PI * 0.5, -1 * Math.PI * 0.5);
        context.fill();
        context.stroke();
        context.closePath();
        context.setLineDash([5, 25]);
        context.beginPath();
        context.arc(width - border - 1 - paintDistance, height / 2, freeThrowCircleRadius, -1 * Math.PI * 0.5, Math.PI * 0.5);
        context.stroke();
        context.closePath();
        context.setLineDash([]); // Right paint line markers

        context.beginPath();
        context.moveTo(width - border - 1, height / 2 - paintHalfWidth - paintLineMarker);
        context.lineTo(width - border - 1 - lineMarkerLength, height / 2 - paintHalfWidth - paintLineMarker);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - border - 1, height / 2 + paintHalfWidth + paintLineMarker);
        context.lineTo(width - border - 1 - lineMarkerLength, height / 2 + paintHalfWidth + paintLineMarker);
        context.stroke();
        context.closePath(); // Right three point markers

        context.beginPath();
        context.moveTo(width - (border + threePointMarkerDistance), border);
        context.lineTo(width - (border + threePointMarkerDistance), border + 2 * lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + threePointMarkerDistance), height - border);
        context.lineTo(width - (border + threePointMarkerDistance), height - border - 2 * lineMarkerLength);
        context.stroke();
        context.closePath(); // Right hash markers

        context.beginPath();
        context.moveTo(width - (border + hashMarker1), height / 2 - paintHalfWidth);
        context.lineTo(width - (border + hashMarker1), height / 2 - paintHalfWidth - lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + hashMarker2), height / 2 - paintHalfWidth);
        context.lineTo(width - (border + hashMarker2), height / 2 - paintHalfWidth - lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + hashMarker3), height / 2 - paintHalfWidth);
        context.lineTo(width - (border + hashMarker3), height / 2 - paintHalfWidth - lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + hashMarker4), height / 2 - paintHalfWidth);
        context.lineTo(width - (border + hashMarker4), height / 2 - paintHalfWidth - lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + hashMarker1), height / 2 + paintHalfWidth);
        context.lineTo(width - (border + hashMarker1), height / 2 + paintHalfWidth + lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + hashMarker2), height / 2 + paintHalfWidth);
        context.lineTo(width - (border + hashMarker2), height / 2 + paintHalfWidth + lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + hashMarker3), height / 2 + paintHalfWidth);
        context.lineTo(width - (border + hashMarker3), height / 2 + paintHalfWidth + lineMarkerLength);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + hashMarker4), height / 2 + paintHalfWidth);
        context.lineTo(width - (border + hashMarker4), height / 2 + paintHalfWidth + lineMarkerLength);
        context.stroke();
        context.closePath(); // Right basket

        context.beginPath();
        context.arc(width - border - 1 - basketDistance, height / 2, restrictedAreaRadius, Math.PI * 0.5, -1 * Math.PI * 0.5);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(width - border - 1 - basketDistance, height / 2, basketRadius, 0, Math.PI * 2);
        context.stroke();
        context.closePath();
        context.fillStyle = lineColor;
        context.fillRect(width - border - 1 - backboardDistance - backboardSize, height / 2 - backboardWidth / 2, backboardSize, backboardWidth); // End lines and side lines 

        context.strokeRect(border, border, width - 2 * border, height - 2 * border);
      }
    },
    drawAmericanFootballField: function drawAmericanFootballField() {
      var width, height;

      if (this.orientation === 'v') {
        width = this.height;
        height = this.width;
        this.$refs.canvasElement.width = height;
        this.$refs.canvasElement.height = width;
      } else {
        width = this.width;
        height = this.height;
        this.$refs.canvasElement.width = width;
        this.$refs.canvasElement.height = height;
      }

      if (this.$refs.canvasElement.getContext) {
        var context = this.$refs.canvasElement.getContext("2d"); // Orientation

        if (this.orientation === 'v') {
          context.translate(0, width);
          context.rotate(-1 * Math.PI * 0.5);
        } // Constants


        var border = this.widthConversion * 0.25;
        var surfaceColor = "rgb(90, 170, 25)";
        var lineWidth = 1;
        var lineColor = "rgb(255, 255, 255)";
        var lineStyle = "square";
        var homeEndZoneColor = "rgb(120, 5, 0)";
        var awayEndZoneColor = "rgb(0, 40, 120)";
        var hashMarkLength = this.widthConversion * 0.6096;
        var hashMarkPadding = hashMarkLength / 2;
        var hashMarkDistance = this.widthConversion * 21.56;
        var halfExtraPointLineLength = this.widthConversion * 0.91;
        var kickoffXLength = this.widthConversion * 0.25;
        var yardNumbering = 0;
        var numberingDistance = this.widthConversion * 5;
        var yardFontSize = this.widthConversion * 3;
        var yardNumberingFont = "bold " + yardFontSize.toString(10) + "px serif";
        var yardDistance = this.widthConversion * 0.5;
        var halfGoalPostDistance = this.widthConversion * 2.82; // Surface

        context.fillStyle = surfaceColor;
        context.fillRect(0, 0, width, height); // Yard lines

        context.strokeStyle = lineColor;
        context.lineWidth = lineWidth;
        context.lineCap = lineStyle;
        context.fillStyle = lineColor;

        for (var i = 0; i <= 120; i++) {
          var x = (width - 2 * border) / 120 * i;
          context.beginPath();

          if (i > 10 && i < 110) {
            // 1 yard lines
            context.moveTo(border + x, border + hashMarkPadding);
            context.lineTo(border + x, border + hashMarkPadding + hashMarkLength);
            context.moveTo(border + x, height - border - hashMarkPadding - hashMarkLength);
            context.lineTo(border + x, height - border - hashMarkPadding); // Hash marks

            if (i % 5 !== 0) {
              context.moveTo(border + x, border + hashMarkDistance);
              context.lineTo(border + x, border + hashMarkDistance + hashMarkLength);
              context.moveTo(border + x, height - border - hashMarkDistance - hashMarkLength);
              context.lineTo(border + x, height - border - hashMarkDistance);
            } else if (i !== 10 && i % 5 === 0) {
              context.moveTo(border + x - hashMarkLength / 2, border + hashMarkDistance + hashMarkLength);
              context.lineTo(border + x + hashMarkLength / 2, border + hashMarkDistance + hashMarkLength);
              context.moveTo(border + x - hashMarkLength / 2, height - border - hashMarkDistance - hashMarkLength);
              context.lineTo(border + x + hashMarkLength / 2, height - border - hashMarkDistance - hashMarkLength);
            }

            context.stroke();
            context.closePath(); // 5 yard lines

            if (i % 5 === 0) {
              context.beginPath();
              context.moveTo(border + x, border);
              context.lineTo(border + x, height - border);
              context.stroke();
              context.closePath();
            } // Yard numberings


            if (i >= 20 && i % 10 === 0) {
              context.font = yardNumberingFont;

              if (i < 70) {
                yardNumbering += 10;
              } else if (i >= 70) {
                yardNumbering -= 10;
              }

              context.fillText((yardNumbering / 10).toString(10), x - yardFontSize / 2, height - border - numberingDistance);
              context.fillText("0", x + yardDistance, height - border - numberingDistance);
              context.save();
              context.translate(width, height / 2);
              context.rotate(Math.PI);
              context.fillText((yardNumbering / 10).toString(10), x - yardFontSize / 2, height / 2 - numberingDistance);
              context.fillText("0", x + yardDistance, height / 2 - numberingDistance);
              context.restore();
            }
          } // Extra point lines


          if (i === 12 || i === 108) {
            context.beginPath();
            context.moveTo(border + x, height / 2 - halfExtraPointLineLength);
            context.lineTo(border + x, height / 2 + halfExtraPointLineLength);
            context.stroke();
            context.closePath();
          } // Kickoff marks


          if (i === 45 || i === 75) {
            context.beginPath();
            context.moveTo(border + x - kickoffXLength, height / 2 - kickoffXLength);
            context.lineTo(border + x + kickoffXLength, height / 2 + kickoffXLength);
            context.moveTo(border + x + kickoffXLength, height / 2 - kickoffXLength);
            context.lineTo(border + x - kickoffXLength, height / 2 + kickoffXLength);
            context.stroke();
            context.closePath();
          }

          if (i === 10) {
            context.fillStyle = homeEndZoneColor;
            context.fillRect(border, border, x, height - 2 * border);
            context.strokeRect(border, border, x, height - 2 * border);
            context.fillStyle = lineColor;
          }

          if (i === 110) {
            context.fillStyle = awayEndZoneColor;
            context.fillRect(border + x, border, width - 2 * border - x, height - 2 * border);
            context.strokeRect(border + x, border, width - 2 * border - x, height - 2 * border);
            context.fillStyle = lineColor;
          }
        } // Goal lines and end lines 


        context.strokeRect(border, border, width - 2 * border, height - 2 * border); // Goal posts

        context.beginPath();
        context.arc(border, height / 2 - halfGoalPostDistance, lineWidth + 1, 0, Math.PI * 2);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(border, height / 2 + halfGoalPostDistance, lineWidth + 1, 0, Math.PI * 2);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(width - border, height / 2 - halfGoalPostDistance, lineWidth + 1, 0, Math.PI * 2);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(width - border, height / 2 + halfGoalPostDistance, lineWidth + 1, 0, Math.PI * 2);
        context.fill();
        context.closePath();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Field.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/Field.vue





const Field_exports_ = /*#__PURE__*/exportHelper_default()(Fieldvue_type_script_lang_js, [['render',Fieldvue_type_template_id_fe55493c_lang_pug_render]])

/* harmony default export */ var Field = (Field_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/PlayerForm.vue?vue&type=template&id=868343d8&lang=pug


var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_1 = {
  key: 0,
  class: "p-4"
};
var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_2 = {
  class: "row g-4"
};
var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_3 = {
  class: "col-sm-6 col-lg-12"
};

var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_4 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h5", {
  class: "mb-4"
}, "Sports Field", -1);

var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_5 = ["value", "selected"];
var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_6 = {
  key: 0,
  class: "invalid-feedback mb-0 mb-sm-4"
};
var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_7 = {
  class: "col-sm-6 col-lg-12 mb-3"
};

var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_8 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h5", {
  class: "mb-4"
}, "Editing Mode", -1);

var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_9 = {
  key: 0,
  class: "input-group"
};

var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_10 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "is-invalid"
}, null, -1);

var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_11 = {
  class: "invalid-feedback"
};
var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_12 = {
  class: "row gx-4 g-lg-4 mb-0"
};

var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_13 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h5", {
  class: "mb-4 mb-lg-0"
}, "Player Information", -1);

var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_14 = {
  key: 0,
  class: "col-12 mb-4 mb-lg-0"
};
var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_15 = {
  class: "alert alert-danger px-4 py-3 mb-0"
};
var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_16 = {
  class: "col-6 col-sm-2 col-lg-6 mb-4 mb-sm-0"
};

var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_17 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-label",
  for: "pfTeam"
}, "Team", -1);

var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_18 = ["value", "selected"];
var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_19 = {
  key: 0,
  class: "invalid-feedback"
};
var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_20 = {
  class: "col-6 col-sm-2 col-lg-6 mb-4 mb-sm-0"
};

var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_21 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-label",
  for: "pfColor"
}, "Color", -1);

var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_22 = ["value"];
var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_23 = {
  key: 0,
  class: "invalid-feedback"
};
var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_24 = {
  class: "col-sm-2 col-lg-12 mb-4 mb-sm-0"
};

var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_25 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-label",
  for: "pfNumber"
}, "Number", -1);

var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_26 = ["value"];
var PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_27 = {
  key: 0,
  class: "invalid-feedback"
};
var _hoisted_28 = {
  class: "col-sm-6 col-lg-12"
};

var _hoisted_29 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-label",
  for: "pfName"
}, "Name", -1);

var _hoisted_30 = ["value"];
var _hoisted_31 = {
  key: 0,
  class: "invalid-feedback"
};
function PlayerFormvue_type_template_id_868343d8_lang_pug_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

  return !this.loadLoading ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("form", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_3, [PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("select", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.fieldError ? 'form-select is-invalid' : 'form-select'),
    name: "pfField",
    id: "pfField",
    onChange: _cache[0] || (_cache[0] = function () {
      return $options.handleSelectField && $options.handleSelectField.apply($options, arguments);
    })
  }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($data.fields, function (field) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("option", {
      value: field,
      selected: field === $props.selectedField ? true : false
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(field), 9, PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_5);
  }), 256))], 34), $data.fieldError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_6, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.fieldError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_7, [PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_8, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.modes.insert ? $data.modesError ? 'btn btn-success person-plus-icon-active me-2' : 'btn btn-success person-plus-icon-active me-2 mb-2' : $data.modesError ? 'btn btn-outline-success person-plus-icon me-2' : 'btn btn-outline-success person-plus-icon me-2 mb-2'),
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.handleInsertButton && $options.handleInsertButton.apply($options, arguments);
    }),
    value: "Insert",
    "data-bs-toggle": "tooltip",
    "data-bs-placement": "bottom",
    title: "Insert Player"
  }, null, 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.modes.delete ? $data.modesError ? 'btn btn-danger person-minus-icon-active me-2' : 'btn btn-danger person-minus-icon-active me-2 mb-2' : $data.modesError ? 'btn btn-outline-danger person-minus-icon me-2' : 'btn btn-outline-danger person-minus-icon me-2 mb-2'),
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.handleDeleteButton && $options.handleDeleteButton.apply($options, arguments);
    }),
    value: "Delete",
    "data-bs-toggle": "tooltip",
    "data-bs-placement": "bottom",
    title: "Delete Player"
  }, null, 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.modes.path ? $data.modesError ? 'btn btn-info node-plus-icon-active me-2' : 'btn btn-info node-plus-icon-active me-2 mb-2' : $data.modesError ? 'btn btn-outline-info node-plus-icon me-2' : 'btn btn-outline-info node-plus-icon me-2 mb-2'),
    onClick: _cache[3] || (_cache[3] = function () {
      return $options.handlePathButton && $options.handlePathButton.apply($options, arguments);
    }),
    value: "Path",
    "data-bs-toggle": "tooltip",
    "data-bs-placement": "bottom",
    title: "Modify Player Path"
  }, null, 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.modes.reset ? $data.modesError ? 'btn btn-danger reset-icon-active me-2' : 'btn btn-danger reset-icon-active me-2 mb-2' : $data.modesError ? 'btn btn-outline-danger reset-icon me-2' : 'btn btn-outline-danger reset-icon me-2 mb-2'),
    onClick: _cache[4] || (_cache[4] = function () {
      return $options.handleResetButton && $options.handleResetButton.apply($options, arguments);
    }),
    value: "Reset",
    "data-bs-toggle": "tooltip",
    "data-bs-placement": "bottom",
    title: "Reset Player Path"
  }, null, 2), $data.modesError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_9, [PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.modesError), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_12, [PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_13, $data.genericError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_14, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_15, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.genericError), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_16, [PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_17, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("select", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.teamsError ? 'form-select is-invalid' : 'form-select'),
    name: "pfTeam",
    id: "pfTeam",
    onChange: _cache[5] || (_cache[5] = function () {
      return $options.handleTeamField && $options.handleTeamField.apply($options, arguments);
    })
  }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($data.teams, function (team) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("option", {
      value: team,
      selected: _this.PlayerFormValues && _this.PlayerFormValues.team === team ? true : false
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(team), 9, PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_18);
  }), 256))], 34), $data.teamsError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_19, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.teamsError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_20, [PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_21, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    type: "color",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.colorError ? 'form-control form-control-color is-invalid' : 'form-control form-control-color'),
    name: "pfColor",
    id: "pfColor",
    value: this.PlayerFormValues ? this.PlayerFormValues.color : '#ffffff',
    onInput: _cache[6] || (_cache[6] = function () {
      return $options.handleColorField && $options.handleColorField.apply($options, arguments);
    }),
    autocomplete: "off",
    maxlength: "7"
  }, null, 42, PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_22), $data.colorError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_23, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.colorError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_24, [PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_25, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    type: "text",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.numberError ? 'form-control is-invalid' : 'form-control'),
    name: "pfNumber",
    id: "pfNumber",
    value: this.PlayerFormValues ? this.PlayerFormValues.number : '',
    onInput: _cache[7] || (_cache[7] = function () {
      return $options.handleNumberField && $options.handleNumberField.apply($options, arguments);
    }),
    autocomplete: "off",
    maxlength: "2"
  }, null, 42, PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_26), $data.numberError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlayerFormvue_type_template_id_868343d8_lang_pug_hoisted_27, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.numberError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_28, [_hoisted_29, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    type: "text",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.nameError ? 'form-control is-invalid' : 'form-control'),
    name: "pfName",
    id: "pfName",
    value: this.PlayerFormValues ? this.PlayerFormValues.name : '',
    onInput: _cache[8] || (_cache[8] = function () {
      return $options.handleNameField && $options.handleNameField.apply($options, arguments);
    }),
    autocomplete: "off",
    maxlength: "50"
  }, null, 42, _hoisted_30), $data.nameError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_31, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.nameError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true);
}
// CONCATENATED MODULE: ./src/components/PlayerForm.vue?vue&type=template&id=868343d8&lang=pug

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/PlayerForm.vue?vue&type=script&lang=js





/* harmony default export */ var PlayerFormvue_type_script_lang_js = ({
  props: ['selectedField', 'selectedMode', 'PlayerFormValues', 'playerError', 'validate', 'loadLoading'],
  emits: ['update:selectedField', 'update:selectedMode', 'PlayerFormValues', 'update:playerError', 'validPlayers'],
  data: function data() {
    return {
      fields: ['Soccer', 'Basketball', 'American Football'],
      modes: {
        insert: false,
        delete: false,
        path: false,
        reset: false
      },
      teams: ['1', '2', 'Ball'],
      genericError: null,
      fieldError: null,
      modesError: null,
      teamsError: null,
      colorError: null,
      numberError: null,
      nameError: null
    };
  },
  watch: {
    playerError: function playerError(val) {
      if (val === '') {
        this.numberError = null;
        this.genericError = null;
      } else if (val === 'DUPLICATENUMBER') {
        this.numberError = 'Duplicate number in the same team';
      } else if (val === 'TEAMMAXPLAYERS') {
        this.genericError = 'Team has reached the max outfield players';
      }
    },
    selectedMode: function selectedMode(val) {
      if (val === '') {
        this.modes.insert = false;
        this.modes.delete = false;
        this.modes.path = false;
        this.modes.reset = false;
      }
    },
    validate: function validate(val) {
      if (val) {
        this.modes.insert = false;
        this.modes.delete = false;
        this.modes.path = false;
        this.modes.reset = false;

        if (this.PlayerFormValues && this.validateField(this.selectedField) && (this.validateMode(this.selectedMode) || !this.selectedMode) && this.validateTeam(this.PlayerFormValues.team) && this.validateColor(this.PlayerFormValues.color) && (this.validateNumber(this.PlayerFormValues.number) || !this.PlayerFormValues.number) && this.validateName(this.PlayerFormValues.name)) {
          this.genericError = null;
          this.$emit('validPlayers', true);
        } else {
          this.genericError = 'Player values not valid.';
          this.$emit('validPlayers', false);
        }
      } else {
        this.$emit('validPlayers', false);
      }
    }
  },
  methods: {
    validateField: function validateField(field) {
      for (var i = 0; i < this.fields.length; i++) {
        if (field === this.fields[i]) {
          return true;
        }
      }

      return false;
    },
    handleSelectField: function handleSelectField(event) {
      if (this.validateField(event.target.value)) {
        this.fieldError = null;
        this.$emit('update:playerError', '');
        this.$emit('update:selectedField', event.target.value);
      } else {
        this.fieldError = 'Must be among ' + this.fields.join(', ') + '.';
      }
    },
    validateMode: function validateMode(mode) {
      var modes = Object.keys(this.modes);

      for (var i = 0; i < modes.length; i++) {
        if (mode.toLowerCase() === modes[i]) {
          return true;
        }
      }

      return false;
    },
    handleInsertButton: function handleInsertButton(event) {
      var mode;

      if (!event.target.value) {
        mode = event.target.parentNode.value;
      } else {
        mode = event.target.value;
      }

      if (this.validateMode(mode)) {
        this.modesError = null;
        this.modes.insert = !this.modes.insert;
        this.modes.delete = false;
        this.modes.path = false;
        this.modes.reset = false;

        if (this.modes.insert) {
          this.$emit('update:playerError', '');
          this.$emit('update:selectedMode', mode);
        } else {
          this.$emit('update:selectedMode', '');
        }
      } else {
        this.modesError = 'Must be among ' + Object.keys(this.modes).join(', ') + '.';
      }
    },
    handleDeleteButton: function handleDeleteButton(event) {
      var mode;

      if (!event.target.value) {
        mode = event.target.parentNode.value;
      } else {
        mode = event.target.value;
      }

      if (this.validateMode(mode)) {
        this.modesError = null;
        this.modes.insert = false;
        this.modes.delete = !this.modes.delete;
        this.modes.path = false;
        this.modes.reset = false;

        if (this.modes.delete) {
          this.$emit('update:playerError', '');
          this.$emit('update:selectedMode', mode);
        } else {
          this.$emit('update:selectedMode', '');
        }
      } else {
        this.modesError = 'Must be among ' + Object.keys(this.modes).join(', ') + '.';
      }
    },
    handlePathButton: function handlePathButton(event) {
      var mode;

      if (!event.target.value) {
        mode = event.target.parentNode.value;
      } else {
        mode = event.target.value;
      }

      if (this.validateMode(mode)) {
        this.modesError = null;
        this.modes.insert = false;
        this.modes.delete = false;
        this.modes.path = !this.modes.path;
        this.modes.reset = false;

        if (this.modes.path) {
          this.$emit('update:playerError', '');
          this.$emit('update:selectedMode', mode);
        } else {
          this.$emit('update:selectedMode', '');
        }
      } else {
        this.modesError = 'Must be among ' + Object.keys(this.modes).join(', ') + '.';
      }
    },
    handleResetButton: function handleResetButton(event) {
      var mode;

      if (!event.target.value) {
        mode = event.target.parentNode.value;
      } else {
        mode = event.target.value;
      }

      if (this.validateMode(mode)) {
        this.modesError = null;
        this.modes.insert = false;
        this.modes.delete = false;
        this.modes.path = false;
        this.modes.reset = !this.modes.reset;

        if (this.modes.reset) {
          this.$emit('update:playerError', '');
          this.$emit('update:selectedMode', mode);
        } else {
          this.$emit('update:selectedMode', '');
        }
      } else {
        this.modesError = 'Must be among ' + Object.keys(this.modes).join(', ') + '.';
      }
    },
    validateTeam: function validateTeam(team) {
      for (var i = 0; i < this.teams.length; i++) {
        if (team === this.teams[i]) {
          return true;
        }
      }

      return false;
    },
    handleTeamField: function handleTeamField(event) {
      if (this.validateTeam(event.target.value)) {
        this.teamsError = null;
        this.$emit('update:playerError', '');
        this.$emit('PlayerFormValues', {
          teamChange: true,
          teamsError: false,
          team: event.target.value,
          color: this.PlayerFormValues.color,
          number: this.PlayerFormValues.number,
          name: this.PlayerFormValues.name
        });
      } else {
        this.teamsError = 'Must be among ' + this.teams.join(', ') + '.';
      }
    },
    validateColor: function validateColor(color) {
      if (/^#[A-Fa-f0-9]{6}$/.test(color)) {
        return true;
      }

      return false;
    },
    handleColorField: function handleColorField(event) {
      if (this.validateColor(event.target.value)) {
        this.colorError = null;
        this.$emit('update:playerError', '');
        this.$emit('PlayerFormValues', {
          teamChange: false,
          colorError: false,
          team: this.PlayerFormValues.team,
          color: event.target.value,
          number: this.PlayerFormValues.number,
          name: this.PlayerFormValues.name
        });
      } else {
        this.colorError = 'Must be #XXXXXX.';
      }
    },
    validateNumber: function validateNumber(number) {
      if (/^[0-9]{1,2}$/.test(number) && number >= 0 && number <= 99) {
        return true;
      }

      return false;
    },
    handleNumberField: function handleNumberField(event) {
      if (this.validateNumber(event.target.value)) {
        this.numberError = null;
        this.$emit('update:playerError', '');
        this.$emit('PlayerFormValues', {
          teamChange: false,
          numberError: false,
          team: this.PlayerFormValues.team,
          color: this.PlayerFormValues.color,
          number: event.target.value,
          name: this.PlayerFormValues.name
        });
      } else {
        this.numberError = 'Must be from 0 to 99.';
      }
    },
    validateName: function validateName(name) {
      if (/^[A-Za-z \-']{0,50}$/.test(name)) {
        return true;
      }

      return false;
    },
    handleNameField: function handleNameField(event) {
      if (this.validateName(event.target.value)) {
        this.nameError = null;
        this.$emit('update:playerError', '');
        this.$emit('PlayerFormValues', {
          teamChange: false,
          nameError: false,
          team: this.PlayerFormValues.team,
          color: this.PlayerFormValues.color,
          number: this.PlayerFormValues.number,
          name: event.target.value
        });
      } else {
        this.nameError = "Can contain A-Z, a-z, spaces, ', and -.";
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/PlayerForm.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/PlayerForm.vue





const PlayerForm_exports_ = /*#__PURE__*/exportHelper_default()(PlayerFormvue_type_script_lang_js, [['render',PlayerFormvue_type_template_id_868343d8_lang_pug_render]])

/* harmony default export */ var PlayerForm = (PlayerForm_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/PathForm.vue?vue&type=template&id=53369864&lang=pug

var PathFormvue_type_template_id_53369864_lang_pug_hoisted_1 = {
  key: 0,
  class: "pt-4 px-4"
};

var PathFormvue_type_template_id_53369864_lang_pug_hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createStaticVNode"])("<h5 class=\"mb-4\">Player Path</h5><div class=\"row gx-2\"><div class=\"col-3 col-sm-2\">From X</div><div class=\"col-3 col-sm-2\">From Y</div><div class=\"col-3 col-sm-2\">To X</div><div class=\"col-3 col-sm-2\">To Y</div><div class=\"d-none d-sm-block col-sm-2\">Speed (mph)</div><div class=\"d-none d-sm-block col-sm-2\">Wait (s)</div></div>", 2);

var PathFormvue_type_template_id_53369864_lang_pug_hoisted_4 = {
  key: 0,
  class: "row gx-2 mt-2"
};
var PathFormvue_type_template_id_53369864_lang_pug_hoisted_5 = {
  class: "col-3 col-sm-2"
};
var PathFormvue_type_template_id_53369864_lang_pug_hoisted_6 = ["placeholder"];
var PathFormvue_type_template_id_53369864_lang_pug_hoisted_7 = {
  class: "col-3 col-sm-2"
};
var PathFormvue_type_template_id_53369864_lang_pug_hoisted_8 = ["placeholder"];
var PathFormvue_type_template_id_53369864_lang_pug_hoisted_9 = {
  class: "col-3 col-sm-2"
};
var PathFormvue_type_template_id_53369864_lang_pug_hoisted_10 = ["placeholder"];
var PathFormvue_type_template_id_53369864_lang_pug_hoisted_11 = {
  class: "col-3 col-sm-2"
};
var PathFormvue_type_template_id_53369864_lang_pug_hoisted_12 = ["placeholder"];
var PathFormvue_type_template_id_53369864_lang_pug_hoisted_13 = {
  class: "col-12 col-sm-2 mt-2 mt-sm-0"
};
var PathFormvue_type_template_id_53369864_lang_pug_hoisted_14 = {
  class: "row gx-2"
};

var PathFormvue_type_template_id_53369864_lang_pug_hoisted_15 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "col-6 col-form-label d-block d-sm-none"
}, "Speed (mph)", -1);

var PathFormvue_type_template_id_53369864_lang_pug_hoisted_16 = {
  class: "col-6 col-sm-12"
};
var PathFormvue_type_template_id_53369864_lang_pug_hoisted_17 = ["name", "id", "value", "onInput"];
var PathFormvue_type_template_id_53369864_lang_pug_hoisted_18 = {
  class: "col-12 col-sm-2 mt-2 mt-sm-0"
};
var PathFormvue_type_template_id_53369864_lang_pug_hoisted_19 = {
  class: "row gx-2"
};

var PathFormvue_type_template_id_53369864_lang_pug_hoisted_20 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "col-6 col-form-label d-block d-sm-none"
}, "Wait (s)", -1);

var PathFormvue_type_template_id_53369864_lang_pug_hoisted_21 = {
  class: "col-6 col-sm-12"
};
var PathFormvue_type_template_id_53369864_lang_pug_hoisted_22 = ["name", "id", "value", "onInput", "disabled", "readonly"];
function PathFormvue_type_template_id_53369864_lang_pug_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

  return !this.loadLoading ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [!this.viewOnly && $data.playerPaths.length > 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("form", PathFormvue_type_template_id_53369864_lang_pug_hoisted_1, [PathFormvue_type_template_id_53369864_lang_pug_hoisted_2, (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($data.playerPaths, function (path, index) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, [index !== $data.playerPaths.length - 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PathFormvue_type_template_id_53369864_lang_pug_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PathFormvue_type_template_id_53369864_lang_pug_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
      class: "form-control form-control-sm",
      type: "text",
      placeholder: path.x,
      disabled: "",
      readonly: ""
    }, null, 8, PathFormvue_type_template_id_53369864_lang_pug_hoisted_6)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PathFormvue_type_template_id_53369864_lang_pug_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
      class: "form-control form-control-sm",
      type: "text",
      placeholder: path.y,
      disabled: "",
      readonly: ""
    }, null, 8, PathFormvue_type_template_id_53369864_lang_pug_hoisted_8)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PathFormvue_type_template_id_53369864_lang_pug_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
      class: "form-control form-control-sm",
      type: "text",
      placeholder: index + 1 < $data.playerPaths.length ? $data.playerPaths[index + 1].x : '',
      disabled: "",
      readonly: ""
    }, null, 8, PathFormvue_type_template_id_53369864_lang_pug_hoisted_10)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PathFormvue_type_template_id_53369864_lang_pug_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
      class: "form-control form-control-sm",
      type: "text",
      placeholder: index + 1 < $data.playerPaths.length ? $data.playerPaths[index + 1].y : '',
      disabled: "",
      readonly: ""
    }, null, 8, PathFormvue_type_template_id_53369864_lang_pug_hoisted_12)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PathFormvue_type_template_id_53369864_lang_pug_hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PathFormvue_type_template_id_53369864_lang_pug_hoisted_14, [PathFormvue_type_template_id_53369864_lang_pug_hoisted_15, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PathFormvue_type_template_id_53369864_lang_pug_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
      type: "text",
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.speedErrors[index] ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'),
      name: 'pfSpeed' + index,
      id: 'pfSpeed' + index,
      value: _this.PathFormValues ? _this.PathFormValues[index].speed : '',
      onInput: function onInput($event) {
        return $options.handleSpeedFields($event, index);
      },
      autocomplete: "off",
      maxlength: "4"
    }, null, 42, PathFormvue_type_template_id_53369864_lang_pug_hoisted_17)])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PathFormvue_type_template_id_53369864_lang_pug_hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PathFormvue_type_template_id_53369864_lang_pug_hoisted_19, [PathFormvue_type_template_id_53369864_lang_pug_hoisted_20, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PathFormvue_type_template_id_53369864_lang_pug_hoisted_21, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
      type: "text",
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.waitErrors[index] ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'),
      name: 'pfWait' + index,
      id: 'pfWait' + index,
      value: _this.PathFormValues ? _this.PathFormValues[index].wait : '',
      onInput: function onInput($event) {
        return $options.handleWaitFields($event, index);
      },
      autocomplete: "off",
      maxlength: "4",
      disabled: parseFloat(_this.PathFormValues[index].speed) === 0 ? false : true,
      readonly: parseFloat(_this.PathFormValues[index].speed) === 0 ? false : true
    }, null, 42, PathFormvue_type_template_id_53369864_lang_pug_hoisted_22)])])])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 64);
  }), 256))])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true);
}
// CONCATENATED MODULE: ./src/components/PathForm.vue?vue&type=template&id=53369864&lang=pug

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.to-fixed.js
var es_number_to_fixed = __webpack_require__("b680");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/PathForm.vue?vue&type=script&lang=js





/* harmony default export */ var PathFormvue_type_script_lang_js = ({
  props: ['selectedPlayer', 'players', 'PathFormValues', 'dimensions', 'forcePlayerUpdate', 'validate', 'viewOnly', 'loadLoading'],
  emits: ['PathFormValues', 'validPaths'],
  data: function data() {
    return {
      playerPaths: [],
      speedErrors: [],
      waitErrors: []
    };
  },
  watch: {
    forcePlayerUpdate: function forcePlayerUpdate() {
      if (this.selectedPlayer !== -1) {
        var newPaths = [];
        var paths = this.players[this.players.length - 1].path;
        var newSpeeds = [];
        var speeds = this.players[this.players.length - 1].speed;
        this.speedErrors = new Array(speeds.length);
        this.waitErrors = new Array(speeds.length);

        for (var i = 0; i < paths.length; i++) {
          if (this.dimensions.orientation === 'v') {
            newPaths.push({
              x: paths[i].y.toFixed(2),
              y: paths[i].x.toFixed(2)
            });
          } else {
            newPaths.push({
              x: paths[i].x.toFixed(2),
              y: paths[i].y.toFixed(2)
            });
          }

          if (i < speeds.length) {
            var mph, seconds;

            if (speeds[i].val === '') {
              mph = '';
            } else {
              mph = speeds[i].val * (1 / 1609.34) * 3600;

              if (mph.toString().length > 4) {
                mph = mph.toString().substring(0, 4);
              } else {
                mph = mph.toString();
              }
            }

            if (speeds[i].val !== 0) {
              seconds = '';
            } else {
              seconds = speeds[i].wait / 1000;

              if (seconds.toString().length > 4) {
                seconds = seconds.toString().substring(0, 4);
              } else {
                seconds = seconds.toString();
              }
            }

            if (this.validateNumber(mph)) {
              this.speedErrors[i] = false;
            } else {
              this.speedErrors[i] = true;
            }

            if (this.validateNumber(seconds)) {
              this.waitErrors[i] = false;
            } else {
              this.waitErrors[i] = true;
            }

            newSpeeds.push({
              speed: mph,
              wait: seconds
            });
          }
        }

        this.playerPaths = newPaths;
        this.$emit('PathFormValues', newSpeeds);
      } else {
        this.playerPaths = [];
        this.speedErrors = [];
        this.waitErrors = [];
      }
    },
    validate: function validate(val) {
      if (val) {
        var invalid = false;

        for (var i = 0; i < this.PathFormValues.length; i++) {
          if (!this.validateNumber(this.PathFormValues[i].speed)) {
            this.speedErrors[i] = true;
            invalid = true;
          } else {
            this.speedErrors[i] = false;
          }

          if (!this.validateNumber(this.PathFormValues[i].wait)) {
            this.waitErrors[i] = true;
            invalid = true;
          } else {
            this.waitErrors[i] = false;
          }
        }

        if (invalid) {
          this.$emit('validPaths', false);
        } else {
          this.$emit('validPaths', true);
        }
      } else {
        this.$emit('validPaths', false);
      }
    }
  },
  methods: {
    validateNumber: function validateNumber(number) {
      if (number === '' || /^(((([1-9][0-9])|([0-9]))(\.[0-9]{1,2})?)|(\.[0-9]{1,2}))$/.test(number)) {
        return true;
      }

      return false;
    },
    handleSpeedFields: function handleSpeedFields(event, index) {
      var vals = new Array(this.playerPaths.length - 1);

      for (var i = 0; i < this.playerPaths.length - 1; i++) {
        vals[i] = {};
        vals[i].speed = this.PathFormValues[i] ? this.PathFormValues[i].speed : null;
        vals[i].wait = this.PathFormValues[i] ? this.PathFormValues[i].wait : null;
        vals[i].speedError = false;
      }

      if (this.validateNumber(event.target.value)) {
        this.speedErrors[index] = false;
        vals[index].speedError = false;

        if (parseFloat(event.target.value) !== 0) {
          this.waitErrors[index] = false;
        }
      } else {
        this.speedErrors[index] = true;
        vals[index].speedError = true;
      }

      vals[index].speed = event.target.value;

      if (parseFloat(event.target.value) === 0) {
        vals[index].wait = this.PathFormValues[index].wait;
      } else {
        vals[index].wait = '';
      }

      this.$emit('PathFormValues', vals);
    },
    handleWaitFields: function handleWaitFields(event, index) {
      var vals = new Array(this.playerPaths.length - 1);

      for (var i = 0; i < this.playerPaths.length - 1; i++) {
        vals[i] = {};
        vals[i].speed = this.PathFormValues[i] ? this.PathFormValues[i].speed : null;
        vals[i].wait = this.PathFormValues[i] ? this.PathFormValues[i].wait : null;
        vals[i].waitError = false;
      }

      if (this.validateNumber(event.target.value)) {
        this.waitErrors[index] = false;
        vals[index].waitError = false;
      } else {
        this.waitErrors[index] = true;
        vals[index].waitError = true;
      }

      vals[index].speed = this.PathFormValues[index].speed;

      if (parseFloat(this.PathFormValues[index].speed) === 0) {
        vals[index].wait = event.target.value;
      } else {
        vals[index].wait = '';
      }

      this.$emit('PathFormValues', vals);
    }
  }
});
// CONCATENATED MODULE: ./src/components/PathForm.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/PathForm.vue





const PathForm_exports_ = /*#__PURE__*/exportHelper_default()(PathFormvue_type_script_lang_js, [['render',PathFormvue_type_template_id_53369864_lang_pug_render]])

/* harmony default export */ var PathForm = (PathForm_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/TeamList.vue?vue&type=template&id=61b98188&lang=pug


var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_1 = {
  key: 0,
  class: "col-12 p-4"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_2 = {
  class: "row g-4"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_3 = {
  class: "col-sm-6"
};

var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_4 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h5", {
  class: "mb-4"
}, "Team 1", -1);

var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_5 = {
  class: "list-group"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_6 = {
  key: 0,
  class: "list-unstyled"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_7 = ["onClick"];
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_8 = {
  class: "row"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_9 = {
  class: "col-2 col-xl-1"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_10 = {
  class: "badge text-dark bg-light"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_11 = {
  class: "col-2 col-xl-1"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_12 = {
  class: "col-8 col-xl-10"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_13 = {
  class: "col-sm-6"
};

var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_14 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h5", {
  class: "mb-4"
}, "Team 2", -1);

var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_15 = {
  class: "list-group"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_16 = {
  key: 0,
  class: "list-unstyled"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_17 = ["onClick"];
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_18 = {
  class: "row"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_19 = {
  class: "col-2 col-xl-1"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_20 = {
  class: "badge text-dark bg-light"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_21 = {
  class: "col-2 col-xl-1"
};
var TeamListvue_type_template_id_61b98188_lang_pug_hoisted_22 = {
  class: "col-8 col-xl-10"
};
function TeamListvue_type_template_id_61b98188_lang_pug_render(_ctx, _cache, $props, $setup, $data, $options) {
  return !this.loadLoading ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_3, [TeamListvue_type_template_id_61b98188_lang_pug_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_5, [$data.team1Players.length === 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_6, "No members")) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($data.team1Players, function (player) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.selectedPlayerId === player.id && $data.selectedPlayerTeam === player.team ? 'list-group-item border-0 px-0 fw-bold' : 'list-group-item border-0 px-0'),
      onClick: function onClick($event) {
        return $options.getSelectedPlayerFromList(player);
      }
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(player.number), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
      class: "border rounded fs-6 ps-4",
      style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
        backgroundColor: player.color
      })
    }, null, 4)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_12, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(player.name), 1)])], 10, TeamListvue_type_template_id_61b98188_lang_pug_hoisted_7);
  }), 256))])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_13, [TeamListvue_type_template_id_61b98188_lang_pug_hoisted_14, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_15, [$data.team2Players.length === 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_16, "No members")) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($data.team2Players, function (player) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.selectedPlayerId === player.id && $data.selectedPlayerTeam === player.team ? 'list-group-item border-0 px-0 fw-bold' : 'list-group-item border-0 px-0'),
      onClick: function onClick($event) {
        return $options.getSelectedPlayerFromList(player);
      }
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_20, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(player.number), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_21, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
      class: "border rounded fs-6 ps-4",
      style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
        backgroundColor: player.color
      })
    }, null, 4)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TeamListvue_type_template_id_61b98188_lang_pug_hoisted_22, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(player.name), 1)])], 10, TeamListvue_type_template_id_61b98188_lang_pug_hoisted_17);
  }), 256))])])])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true);
}
// CONCATENATED MODULE: ./src/components/TeamList.vue?vue&type=template&id=61b98188&lang=pug

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__("4e82");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/TeamList.vue?vue&type=script&lang=js


/* harmony default export */ var TeamListvue_type_script_lang_js = ({
  props: ['selectedPlayer', 'players', 'forcePlayerUpdate', 'loadLoading'],
  emits: ['update:selectedPlayer', 'update:players', 'update:forcePlayerUpdate'],
  data: function data() {
    return {
      team1Players: [],
      team2Players: [],
      selectedPlayerId: -1,
      selectedPlayerTeam: ''
    };
  },
  watch: {
    selectedPlayer: function selectedPlayer(val) {
      if (val !== -1) {
        this.selectedPlayerId = this.players[this.players.length - 1].id;
        this.selectedPlayerTeam = this.players[this.players.length - 1].team;
      } else {
        this.selectedPlayerId = -1;
        this.selectedPlayerTeam = '';
      }
    },
    forcePlayerUpdate: function forcePlayerUpdate(val) {
      if (val) {
        this.team1Players = [];
        this.team2Players = [];

        for (var i = 0; i < this.players.length; i++) {
          if (this.players[i].team === '1') {
            this.team1Players.push(this.players[i]);
          } else if (this.players[i].team === '2') {
            this.team2Players.push(this.players[i]);
          }
        }

        this.team1Players.sort(function (first, second) {
          if (parseInt(first.number, 10) > parseInt(second.number, 10)) {
            return 1;
          } else if (parseInt(first.number, 10) <= parseInt(second.number, 10)) {
            return -1;
          }
        });
        this.team2Players.sort(function (first, second) {
          if (parseInt(first.number, 10) > parseInt(second.number, 10)) {
            return 1;
          } else if (parseInt(first.number, 10) <= parseInt(second.number, 10)) {
            return -1;
          }
        });
      }
    }
  },
  methods: {
    getSelectedPlayerFromList: function getSelectedPlayerFromList(player) {
      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].id === player.id) {
          var playersCopy = this.players;
          playersCopy.splice(i, 1);
          playersCopy.push(player);
          this.$emit('update:selectedPlayer', i);
          this.$emit('update:players', playersCopy);
          this.$emit('update:forcePlayerUpdate', true);
          this.selectedPlayerId = player.id;
          this.$nextTick(function () {
            this.$emit('update:selectedPlayer', this.players.length - 1);
          });
          return player;
        }
      }

      this.$emit('update:selectedPlayer', -1);
    }
  }
});
// CONCATENATED MODULE: ./src/components/TeamList.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/TeamList.vue





const TeamList_exports_ = /*#__PURE__*/exportHelper_default()(TeamListvue_type_script_lang_js, [['render',TeamListvue_type_template_id_61b98188_lang_pug_render]])

/* harmony default export */ var TeamList = (TeamList_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/App.vue?vue&type=script&lang=js








/* harmony default export */ var Appvue_type_script_lang_js = ({
  name: 'App',
  components: {
    TitleForm: TitleForm,
    Field: Field,
    PlayerForm: PlayerForm,
    PathForm: PathForm,
    TeamList: TeamList
  },
  emits: ['SendData'],
  props: ['loadedData', 'viewOnly', 'loadLoading', 'saveLoading'],
  data: function data() {
    return {
      selectedField: 'Soccer',
      selectedMode: '',
      selectedPlayer: -1,
      prevSelectedPlayer: -1,
      players: [],
      PlayerFormValues: {
        team: '1',
        color: '#ffffff',
        number: '',
        name: ''
      },
      TitleFormValues: {
        title: '',
        public: false
      },
      PathFormValues: [],
      forcePlayerUpdate: false,
      playerError: '',
      uniqueIndex: 0,
      title: '',
      public: false,
      dimensions: {},
      validate: false,
      valid: {
        title: false,
        players: false,
        paths: false
      }
    };
  },
  computed: {
    maxPlayers: function maxPlayers() {
      if (this.selectedField === 'Soccer') {
        return 11;
      } else if (this.selectedField === 'Basketball') {
        return 5;
      } else if (this.selectedField === 'American Football') {
        return 11;
      }

      return 99;
    },
    ballColor: function ballColor() {
      if (this.selectedField === 'Soccer') {
        return '#ffffff';
      } else if (this.selectedField === 'Basketball') {
        return '#d96200';
      } else if (this.selectedField === 'American Football') {
        return '#a85d00';
      }

      return '#ffffff';
    }
  },
  watch: {
    loadedData: function loadedData(val) {
      this.title = val.title;
      this.public = val.public;
      this.players = val.players;
      this.selectedField = val.field;
      this.TitleFormValues.title = val.title;
      this.TitleFormValues.public = val.public;
      this.forcePlayerUpdate = true;
    },
    selectedField: function selectedField() {
      this.playerError = '';

      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].team === 'Ball') {
          this.players[i].color = this.ballColor;
          break;
        }
      }

      if (this.PlayerFormValues.team === 'Ball') {
        this.PlayerFormValues.color = this.ballColor;
      }

      if (this.getTeamMemberCount() > this.maxPlayers) {
        this.playerError = 'TEAMMAXPLAYERS';
      }
    },
    selectedMode: function selectedMode(val) {
      this.playerError = '';

      if (val === 'Insert') {
        this.PlayerFormValues.team = '1';
        this.PlayerFormValues.color = '#ffffff';
        this.PlayerFormValues.number = this.getSpareNumber('1');
        this.PlayerFormValues.name = 'Player';
      } else if (val === '' || val === 'Delete' || val === 'Reset') {
        this.PlayerFormValues.team = '1';
        this.PlayerFormValues.color = '#ffffff';
        this.PlayerFormValues.number = '';
        this.PlayerFormValues.name = '';
        this.selectedPlayer = -1;
        this.prevSelectedPlayer = -1;
      }

      this.forcePlayerUpdate = true;
    },
    selectedPlayer: function selectedPlayer(val) {
      this.playerError = '';

      if (val !== -1 && this.players.length > 0) {
        this.PlayerFormValues.team = this.players[this.players.length - 1].team;
        this.PlayerFormValues.color = this.players[this.players.length - 1].color;
        this.PlayerFormValues.number = this.players[this.players.length - 1].number;
        this.PlayerFormValues.name = this.players[this.players.length - 1].name;
      }
    }
  },
  methods: {
    validTitle: function validTitle(validity) {
      this.valid.title = validity;
    },
    validPlayers: function validPlayers(validity) {
      this.valid.players = validity;
    },
    validPaths: function validPaths(validity) {
      this.valid.paths = validity;
    },
    SaveBoard: function SaveBoard() {
      this.validate = true;
      this.$nextTick(function () {
        if (this.valid.title && this.valid.players && this.valid.paths) {
          var data = {
            title: this.title,
            public: this.public,
            field: this.selectedField,
            players: this.players
          };
          this.$emit('SendData', data);
        } else {
          this.$emit('SendData', null);
        }

        this.validate = false;
      });
    },
    getTitleFormValueUpdates: function getTitleFormValueUpdates(val) {
      if (!val.titleError) {
        this.title = val.title;
      }

      if (!val.publicError) {
        this.public = val.public;
      }

      this.TitleFormValues.title = val.title;
      this.TitleFormValues.public = val.public;
    },
    getPlayerFormValueUpdates: function getPlayerFormValueUpdates(val) {
      this.playerError = '';

      if (val.teamChange && val.team === 'Ball') {
        this.PlayerFormValues.team = val.team;
        this.PlayerFormValues.color = this.ballColor;
        this.PlayerFormValues.number = '';
        this.PlayerFormValues.name = '';

        if (this.selectedPlayer !== -1 && this.getTeamMemberCount() > 1 && this.players[this.players.length - 1].team !== val.team) {
          this.playerError = 'TEAMMAXPLAYERS';
        } else {
          if (this.selectedPlayer !== -1) {
            if (this.getTeamMemberCount() > 1) {
              this.playerError = 'TEAMMAXPLAYERS';
            } else {
              if (!val.teamsError) {
                this.players[this.players.length - 1].team = this.PlayerFormValues.team;
              }

              if (!val.colorError) {
                this.players[this.players.length - 1].color = this.PlayerFormValues.color;
              }

              if (!val.numberError) {
                this.players[this.players.length - 1].number = this.PlayerFormValues.number;
              }

              if (!val.nameError) {
                this.players[this.players.length - 1].name = this.PlayerFormValues.name;
              }

              this.forcePlayerUpdate = true;
            }
          }
        }
      } else if (val.teamChange && (val.team === '1' || val.team === '2')) {
        this.PlayerFormValues.team = val.team;
        this.PlayerFormValues.color = val.color;

        if (this.selectedPlayer !== -1 && val.number !== '') {
          this.PlayerFormValues.number = val.number;
        } else {
          this.PlayerFormValues.number = this.getSpareNumber(val.team);
        }

        if (val.name !== '') {
          this.PlayerFormValues.name = val.name;
        } else {
          this.PlayerFormValues.name = 'Player';
        }

        if (this.selectedPlayer !== -1 && this.getTeamMemberCount() + 1 > this.maxPlayers && this.players[this.players.length - 1].team !== val.team) {
          this.playerError = 'TEAMMAXPLAYERS';
        } else if (val.number !== '' && !this.checkIfSpareNumber(val.team, val.number)) {
          if (this.selectedPlayer !== -1 && this.players[this.players.length - 1].team !== val.team) {
            this.playerError = 'DUPLICATENUMBER';
          }
        } else {
          if (this.selectedPlayer !== -1) {
            if (this.getTeamMemberCount() + 1 > this.maxPlayers) {
              this.playerError = 'TEAMMAXPLAYERS';
            } else {
              if (!val.teamsError) {
                this.players[this.players.length - 1].team = this.PlayerFormValues.team;
              }

              if (!val.colorError) {
                this.players[this.players.length - 1].color = this.PlayerFormValues.color;
              }

              if (!val.numberError) {
                this.players[this.players.length - 1].number = this.PlayerFormValues.number;
              }

              if (!val.nameError) {
                this.players[this.players.length - 1].name = this.PlayerFormValues.name;
              }

              this.forcePlayerUpdate = true;
            }
          }
        }

        this.PlayerFormValues.teamChange = false;
      } else if (this.selectedPlayer !== -1) {
        this.PlayerFormValues.team = val.team;
        this.PlayerFormValues.color = val.color;
        this.PlayerFormValues.number = val.number;
        this.PlayerFormValues.name = val.name;

        if (val.team === 'Ball') {
          if (this.getTeamMemberCount() > 1) {
            this.playerError = 'TEAMMAXPLAYERS';
          } else {
            if (!val.teamsError) {
              this.players[this.players.length - 1].team = val.team;
            }

            if (!val.colorError) {
              this.players[this.players.length - 1].color = val.color;
            }

            this.forcePlayerUpdate = true;
          }
        } else if (this.getTeamMemberCount() + 1 > this.maxPlayers && this.players[this.players.length - 1].team !== val.team) {
          this.playerError = 'TEAMMAXPLAYERS';
        } else if (val.number !== '' && !this.checkIfSpareNumber(val.team, val.number) && this.players[this.players.length - 1].number !== val.number) {
          this.playerError = 'DUPLICATENUMBER';
        } else {
          if (!val.teamsError) {
            this.players[this.players.length - 1].team = val.team;
          }

          if (!val.colorError) {
            this.players[this.players.length - 1].color = val.color;
          }

          if (!val.numberError && this.checkIfSpareNumber(val.team, val.number)) {
            this.players[this.players.length - 1].number = val.number;
          }

          if (!val.nameError) {
            this.players[this.players.length - 1].name = val.name;
          }

          this.forcePlayerUpdate = true;
        }
      } else {
        this.PlayerFormValues = val;
      }
    },
    getPathFormValueUpdates: function getPathFormValueUpdates(val) {
      var speeds = new Array(val.length);

      for (var i = 0; i < val.length; i++) {
        var speed, wait;

        if (!val[i].speedError) {
          if (val[i].speed === '') {
            speed = 0;
          } else {
            speed = parseFloat(val[i].speed) * 1609.34 * (1 / 3600);
          }
        } else {
          speed = 0;
        }

        if (!val[i].waitError) {
          if (val[i].wait === '') {
            wait = 0;
          } else {
            wait = parseFloat(val[i].wait) * 1000;
          }
        } else {
          wait = 0;
        }

        speeds[i] = {
          val: speed,
          wait: wait
        };
        this.PathFormValues[i] = {
          speed: val[i].speed,
          wait: val[i].wait
        };
      }

      this.players[this.players.length - 1].speed = speeds;
    },
    createPlayer: function createPlayer(coords) {
      var number;

      if (this.checkIfSpareNumber(this.PlayerFormValues.team, this.PlayerFormValues.number)) {
        number = this.PlayerFormValues.number;
      } else {
        number = this.getSpareNumber(this.PlayerFormValues.team);
      }

      if (this.PlayerFormValues.team === 'Ball' && this.getTeamMemberCount() < 1) {
        var ball = this.getPlayer(this.PlayerFormValues.team, this.ballColor, '', '', [coords], null);
        this.players.push(ball);
      } else if (this.PlayerFormValues.team !== 'Ball' && this.getTeamMemberCount() + 1 <= this.maxPlayers) {
        var player = this.getPlayer(this.PlayerFormValues.team, this.PlayerFormValues.color, number, this.PlayerFormValues.name, [coords], null);
        this.players.push(player);
        this.PlayerFormValues.number = this.getSpareNumber(player.team);
      } else {
        this.playerError = 'TEAMMAXPLAYERS';
      }
    },
    deletePlayer: function deletePlayer() {
      this.players.pop();
      this.selectedPlayer = -1;
      this.prevSelectedPlayer = -1;
    },
    editPlayerPath: function editPlayerPath(coords) {
      this.players[this.players.length - 1].path.push(coords);
      this.players[this.players.length - 1].speed.push({
        val: 2.68224,
        wait: 0
      });
      this.PathFormValues.push({
        speed: '6',
        wait: ''
      });
    },
    resetPlayerPath: function resetPlayerPath() {
      this.players[this.players.length - 1].path = [this.players[this.players.length - 1].path[0]];
      this.players[this.players.length - 1].speed = [{
        val: 2.68224,
        wait: 0
      }];
      this.PathFormValues = [];
      this.selectedPlayer = -1;
      this.prevSelectedPlayer = -1;
    },
    setPositions: function setPositions(index, current) {
      if (index >= 0 && index < this.players.length && current) {
        this.players[index].current.step = current.step;
        this.players[index].current.position = current.position;
        this.players[index].current.wait = current.wait;
      }
    },
    resetPositions: function resetPositions() {
      for (var i = 0; i < this.players.length; i++) {
        this.players[i].current.step = 0;
        this.players[i].current.position = this.players[i].path[0];
        this.players[i].current.wait = 0;
      }
    },
    updateDimensions: function updateDimensions(data) {
      this.dimensions.width = data.width;
      this.dimensions.height = data.height;
      this.dimensions.orientation = data.orientation;
    },
    getTeamMemberCount: function getTeamMemberCount() {
      var teamMemberCount = 0;

      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].team === this.PlayerFormValues.team) {
          teamMemberCount++;
        }
      }

      return teamMemberCount;
    },
    checkIfSpareNumber: function checkIfSpareNumber(team, number) {
      if (number === '') {
        return false;
      }

      for (var i = 0; i < this.players.length; i++) {
        if (team === this.players[i].team && number === this.players[i].number) {
          return false;
        }
      }

      return true;
    },
    getSpareNumber: function getSpareNumber(team) {
      for (var i = 1; i <= 99; i++) {
        var selected = false;

        for (var j = 0; j < this.players.length; j++) {
          if (team === this.players[j].team && i.toString(10) === this.players[j].number) {
            selected = true;
          }
        }

        if (!selected) {
          return i.toString(10);
        }
      }

      return '1';
    },
    getPlayer: function getPlayer(team, color, number, name, path, speed) {
      var player = {};
      player.id = ++this.uniqueIndex;

      if (team) {
        player.team = team;
      } else {
        player.team = '1';
      }

      if (color) {
        player.color = color;
      } else {
        player.color = '#ffffff';
      }

      if (number || number === '') {
        player.number = number;
      } else {
        player.number = this.getSpareNumber(player.team);
      }

      if (name || name === '') {
        player.name = name;
      } else {
        player.name = 'Player';
      }

      if (path) {
        player.path = path;
        player.current = {
          step: 0,
          position: path[0],
          wait: 0
        };
      } else {
        player.path = [{
          x: 0,
          y: 0
        }];
        player.current = {
          step: 0,
          position: {
            x: 0,
            y: 0
          },
          wait: 0
        };
      }

      if (speed) {
        player.speed = speed;
      } else {
        player.speed = [{
          val: 2.68224,
          wait: 0
        }];
      }

      return player;
    }
  }
});
// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/App.vue





const App_exports_ = /*#__PURE__*/exportHelper_default()(Appvue_type_script_lang_js, [['render',render]])

/* harmony default export */ var App = (App_exports_);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (App);



/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fce3":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ })

/******/ })["default"];
//# sourceMappingURL=TacticsBoard.common.js.map