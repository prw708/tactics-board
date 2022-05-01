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

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/App2.vue?vue&type=template&id=5b4a9787&lang=pug

var _hoisted_1 = {
  key: 0,
  class: "h-100 d-flex align-items-center justify-content-center"
};

var _hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  class: "spinner-border",
  role: "status"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "visually-hidden"
}, "Loading...")], -1);

var _hoisted_3 = [_hoisted_2];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Preview = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Preview");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, [this.loading ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_1, _hoisted_3)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Preview, {
    selectedField: $data.selectedField,
    selectedMode: $data.selectedMode,
    "onUpdate:selectedMode": _cache[0] || (_cache[0] = function ($event) {
      return $data.selectedMode = $event;
    }),
    selectedPlayer: $data.selectedPlayer,
    "onUpdate:selectedPlayer": _cache[1] || (_cache[1] = function ($event) {
      return $data.selectedPlayer = $event;
    }),
    players: $data.players,
    "onUpdate:players": _cache[2] || (_cache[2] = function ($event) {
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
    "onUpdate:forcePlayerUpdate": _cache[3] || (_cache[3] = function ($event) {
      return $data.forcePlayerUpdate = $event;
    }),
    loading: $props.loading
  }, null, 8, ["selectedField", "selectedMode", "selectedPlayer", "players", "onCreatePlayer", "onDeletePlayer", "onEditPlayerPath", "onResetPlayerPath", "onSetPositions", "onResetPositions", "onUpdateDimensions", "forcePlayerUpdate", "loading"])], 64);
}
// CONCATENATED MODULE: ./src/App2.vue?vue&type=template&id=5b4a9787&lang=pug

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Preview.vue?vue&type=template&id=3a4c2053&lang=pug

var Previewvue_type_template_id_3a4c2053_lang_pug_hoisted_1 = {
  class: "col-12"
};
var Previewvue_type_template_id_3a4c2053_lang_pug_hoisted_2 = {
  ref: "canvasElement"
};
function Previewvue_type_template_id_3a4c2053_lang_pug_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Previewvue_type_template_id_3a4c2053_lang_pug_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("canvas", Previewvue_type_template_id_3a4c2053_lang_pug_hoisted_2, null, 512)], 512)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !this.loading]]);
}
// CONCATENATED MODULE: ./src/components/Preview.vue?vue&type=template&id=3a4c2053&lang=pug

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.fill.js
var es_array_fill = __webpack_require__("cb29");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Preview.vue?vue&type=script&lang=js




/* harmony default export */ var Previewvue_type_script_lang_js = ({
  props: ['selectedField', 'selectedMode', 'selectedPlayer', 'players', 'forcePlayerUpdate', 'loading'],
  emits: ['update:selectedMode', 'update:selectedPlayer', 'update:players', 'createPlayer', 'deletePlayer', 'editPlayerPath', 'resetPlayerPath', 'setPositions', 'resetPositions', 'update:forcePlayerUpdate', 'updateDimensions'],
  mounted: function mounted() {
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
      return 'h';
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
    loading: function loading(val) {
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
          });
          return selectedPlayerCopy;
        }
      }

      if (this.selectedMode === 'Path') {
        this.mostRecentSelectedPlayerId = this.players[this.players.length - 1].id;
      } else {
        this.mostRecentSelectedPlayerId = 0;
        this.$emit('update:selectedPlayer', -1);
      }
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

      if (this.selectedField === 'Soccer') {
        this.drawSoccerField();
      } else if (this.selectedField === 'Basketball') {
        this.drawBasketballCourt();
      } else if (this.selectedField === 'American Football') {
        this.drawAmericanFootballField();
      }

      if (this.selectedPlayer !== -1 && (this.selectedMode === 'Path' || this.selectedMode === 'Insert' || this.selectedMode === '')) {
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
// CONCATENATED MODULE: ./src/components/Preview.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/components/Preview.vue





const __exports__ = /*#__PURE__*/exportHelper_default()(Previewvue_type_script_lang_js, [['render',Previewvue_type_template_id_3a4c2053_lang_pug_render]])

/* harmony default export */ var Preview = (__exports__);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/App2.vue?vue&type=script&lang=js




/* harmony default export */ var App2vue_type_script_lang_js = ({
  name: 'App',
  components: {
    Preview: Preview
  },
  emits: [],
  props: ['loadedData', 'viewOnly', 'loading'],
  data: function data() {
    return {
      selectedField: 'Soccer',
      selectedMode: '',
      selectedPlayer: -1,
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
// CONCATENATED MODULE: ./src/App2.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/App2.vue





const App2_exports_ = /*#__PURE__*/exportHelper_default()(App2vue_type_script_lang_js, [['render',render]])

/* harmony default export */ var App2 = (App2_exports_);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (App2);



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

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ })

/******/ })["default"];
//# sourceMappingURL=Preview.common.js.map