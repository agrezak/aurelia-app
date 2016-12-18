define('app',["exports", "aurelia-router"], function (exports, _aureliaRouter) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {

      config.title = "Login App";
      config.addPipelineStep("authorize", AuthorizeStep);
      config.fallbackRoute("login");
      config.map([{ route: "", moduleId: "app", redirect: "login" }, { route: "login", moduleId: "./views/login/login", title: "Login", name: "login", nav: false }, { route: "input", moduleId: "./views/hash-input/hash-input", title: "Input", name: "input", nav: true, auth: true }, { route: "table", moduleId: "./views/data-table/data-table", title: "Table", name: "table", nav: true, auth: true }]);

      this.router = router;
    };

    return App;
  }();

  var AuthorizeStep = function () {
    function AuthorizeStep() {
      _classCallCheck(this, AuthorizeStep);
    }

    AuthorizeStep.prototype.run = function run(navigationInstruction, next) {
      if (navigationInstruction.getAllInstructions().some(function (i) {
        return i.config.auth;
      })) {
        var isLoggedIn = Object.values(localStorage).length;
        if (!isLoggedIn) {
          return next.cancel(new _aureliaRouter.Redirect("login"));
        }
      }

      return next();
    };

    return AuthorizeStep;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('components/logout/logout',["exports", "aurelia-framework", "aurelia-router"], function (exports, _aureliaFramework, _aureliaRouter) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Logout = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Logout = exports.Logout = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
    function Logout(router) {
      _classCallCheck(this, Logout);

      this.router = router;
    }

    Logout.prototype.logOut = function logOut() {
      localStorage.clear();
      this.router.navigateToRoute("login");
    };

    return Logout;
  }()) || _class);
});
define('components/notification/notification-box',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NotificationBox = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _descriptor2;

  var NotificationBox = exports.NotificationBox = (_class = function () {
    function NotificationBox() {
      _classCallCheck(this, NotificationBox);

      _initDefineProp(this, "notifyUser", _descriptor, this);

      _initDefineProp(this, "notificationHref", _descriptor2, this);

      this.notificationMessage = "Success! You can view created table";
      this.notificationTitle = "Click here.";
    }

    NotificationBox.prototype.closeButton = function closeButton() {
      this.notifyUser = false;
    };

    return NotificationBox;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "notifyUser", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "notificationHref", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('views/data-table/data-table',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TableClass = exports.TableClass = function () {
    function TableClass() {
      _classCallCheck(this, TableClass);

      this.headers = [];
      this.data = [];

      this.collectData();
    }

    TableClass.prototype.collectData = function collectData() {

      this.data = Object.values(localStorage);

      for (var key in localStorage) {
        this.headers.push(key);
      }
    };

    return TableClass;
  }();
});
define('views/hash-input/hash-input',["exports", "aurelia-router", "aurelia-framework", "../../node_modules/blueimp-md5/js/md5.js"], function (exports, _aureliaRouter, _aureliaFramework, _md) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.InputClass = undefined;

  var _md2 = _interopRequireDefault(_md);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var InputClass = exports.InputClass = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
    function InputClass(router) {
      _classCallCheck(this, InputClass);

      this.router = router;
      this.hashValue = "";
      this.hash = "";
      this.creationDate = "";
      this.instruction = "Enter text here. Maximum length : 255 characters";
      this.notifyUser = false;
      this.redirectHref = "#/table";
    }

    InputClass.prototype.collectData = function collectData() {
      this.createHash();
      this.currentDate();
    };

    InputClass.prototype.createHash = function createHash() {

      var hash = this.hashValue;
      var value = (0, _md2.default)(hash);

      value = value.substring(0, 8);

      this.hash = value;
      this.notifyUser = true;

      localStorage.setItem("hash", this.hash);
      localStorage.setItem("input", this.hashValue);
    };

    InputClass.prototype.currentDate = function currentDate() {

      var d = new Date().toUTCString();

      this.creationDate = d;
      localStorage.setItem("creationDate", this.creationDate);
    };

    return InputClass;
  }()) || _class);
});
define('views/login/login',["exports", "aurelia-router", "aurelia-framework"], function (exports, _aureliaRouter, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
    function Login(router) {
      _classCallCheck(this, Login);

      this.router = router;
      this.errorMessage = "Please enter correct e-mail address, for example: johndoe@gmail.com";
      this.hideError = true;
    }

    Login.prototype.validate = function validate(email) {

      email = this.email;
      var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var bool = reg.test(email);

      if (bool) {
        this.success(email);
        return;
      }

      this.failure();
    };

    Login.prototype.success = function success(args) {
      this.cacheUser(args);
      this.router.navigateToRoute("input");
    };

    Login.prototype.failure = function failure() {
      this.hideError = false;
    };

    Login.prototype.cacheUser = function cacheUser(data) {
      localStorage.setItem("userEmail", data);
    };

    return Login;
  }()) || _class);
});
/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/* global define */

;(function ($) {
  'use strict'

  /*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
  function safeAdd (x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xFFFF)
  }

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
  function bitRotateLeft (num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  function md5cmn (q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
  }
  function md5ff (a, b, c, d, x, s, t) {
    return md5cmn((b & c) | ((~b) & d), a, b, x, s, t)
  }
  function md5gg (a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & (~d)), a, b, x, s, t)
  }
  function md5hh (a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t)
  }
  function md5ii (a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | (~d)), a, b, x, s, t)
  }

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
  function binlMD5 (x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32)
    x[(((len + 64) >>> 9) << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = md5ff(a, b, c, d, x[i], 7, -680876936)
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5gg(b, c, d, a, x[i], 20, -373897302)
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

      a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5hh(d, a, b, c, x[i], 11, -358537222)
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

      a = md5ii(a, b, c, d, x[i], 6, -198630844)
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

      a = safeAdd(a, olda)
      b = safeAdd(b, oldb)
      c = safeAdd(c, oldc)
      d = safeAdd(d, oldd)
    }
    return [a, b, c, d]
  }

  /*
  * Convert an array of little-endian words to a string
  */
  function binl2rstr (input) {
    var i
    var output = ''
    var length32 = input.length * 32
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF)
    }
    return output
  }

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
  function rstr2binl (input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    var length8 = input.length * 8
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32)
    }
    return output
  }

  /*
  * Calculate the MD5 of a raw string
  */
  function rstrMD5 (s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
  }

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
  function rstrHMACMD5 (key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binlMD5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5C5C5C5C
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
  }

  /*
  * Convert a raw string to a hex string
  */
  function rstr2hex (input) {
    var hexTab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hexTab.charAt((x >>> 4) & 0x0F) +
      hexTab.charAt(x & 0x0F)
    }
    return output
  }

  /*
  * Encode a string as utf-8
  */
  function str2rstrUTF8 (input) {
    return unescape(encodeURIComponent(input))
  }

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
  function rawMD5 (s) {
    return rstrMD5(str2rstrUTF8(s))
  }
  function hexMD5 (s) {
    return rstr2hex(rawMD5(s))
  }
  function rawHMACMD5 (k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
  }
  function hexHMACMD5 (k, d) {
    return rstr2hex(rawHMACMD5(k, d))
  }

  function md5 (string, key, raw) {
    if (!key) {
      if (!raw) {
        return hexMD5(string)
      }
      return rawMD5(string)
    }
    if (!raw) {
      return hexHMACMD5(key, string)
    }
    return rawHMACMD5(key, string)
  }

  if (typeof define === 'function' && define.amd) {
    define('node_modules/blueimp-md5/js/md5.js',[],function () {
      return md5
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = md5
  } else {
    $.md5 = md5
  }
}(this))

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"styles/main.css\"></require>\n  <router-view class=\"full-height css-override\"></router-view>\n\n</template>\n"; });
define('text!styles/alignment.css', ['module'], function(module) { module.exports = ".custom-center {\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n"; });
define('text!components/logout/logout.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <ul class=\"button-group block\">\r\n    <li class=\"button large\">\r\n      <a href=\"#\" click.trigger=\"logOut()\">Logout</a>\r\n    </li>\r\n  </ul>\r\n\r\n</template>\r\n"; });
define('text!styles/animations.css', ['module'], function(module) { module.exports = ".animation-long {\n  transition: 1s; }\n\n.animation {\n  transition: 0.5s; }\n\n.animation-slide-down {\n  transform: translateY(1000px); }\n\n.animation-slide-up {\n  transform: translateY(-1000px); }\n\n.animation-flip {\n  animation: flip 1s; }\n\n@keyframes flip {\n  0% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -90deg);\n    -webkit-transition-timing-function: ease-in;\n    transition-timing-function: ease-in; }\n  100% {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n"; });
define('text!components/nav/nav-menu.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\r\n\r\n  <ul class=\"button-group\">\r\n    <li repeat.for=\"row of router.navigation\" class=\"button large ${row.isActive ? 'active' : ''}\">\r\n      <a href.bind=\"row.href\">${row.title}</a>\r\n    </li>\r\n  </ul>\r\n\r\n</template>\r\n"; });
define('text!styles/fonts.css', ['module'], function(module) { module.exports = ".text-large {\n  font-size: 1.5rem; }\n\n.text-medium {\n  font-size: 1.25rem; }\n\n.bold {\n  font-weight: 700; }\n"; });
define('text!components/notification/notification-box.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n<div ref=\"notifBox\" class=\"notification-box box-bottom box-success text-center animation-long ${notifyUser ? 'animation-flip' : 'animation-slide-down'}\">\r\n  <p class=\"no-margin\">${notificationMessage}</p>\r\n  <a class=\"block\" href=\"${notificationHref}\">${notificationTitle}</a>\r\n  <button click.trigger=\"closeButton()\" class=\"button button-close large\">Close</button>\r\n</div>\r\n\r\n</template>\r\n"; });
define('text!views/data-table/data-table.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"components/nav/nav-menu.html\"></require>\n  <require from=\"components/logout/logout\"></require>\n\n  <div class=\"full-height custom-center\">\n\n    <header>\n      <div class=\"row\">\n        <div class=\"small-6 column\">\n          <nav-menu router.bind=\"router\"></nav-menu>\n        </div>\n        <div class=\"small-6 column text-right\">\n          <logout></logout>\n        </div>\n      </div>\n    </header>\n\n    <main>\n      <div class=\"row overflow-x\">\n        <table>\n          <thead>\n            <tr>\n              <th class=\"text-center\" repeat.for=\"header of headers\" name.bind=\"header\">${header}</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <th class=\"text-center\" repeat.for=\"data of data\" name.bind=\"data\">${data}</th>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </main>\n\n  </div>\n\n</template>\n"; });
define('text!styles/header.css', ['module'], function(module) { module.exports = "header {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  background-color: #2980b9; }\n  header .button-group {\n    margin-top: 1rem; }\n    header .button-group .button {\n      font-size: 1.25rem;\n      padding: 0; }\n      header .button-group .button a {\n        padding: 1rem;\n        display: inline-block; }\n        @media (min-width: 1024px) {\n          header .button-group .button a {\n            padding: 1rem 2rem; } }\n  header .button {\n    margin-top: 1rem;\n    font-size: 1.25rem; }\n    header .button:only-child {\n      background-color: #2ecc71;\n      transition: 0.25s; }\n      header .button:only-child:hover {\n        transform: scale(1.05); }\n  header .active {\n    border: 2px solid #e74c3c; }\n  header a {\n    color: #fff; }\n    header a:hover {\n      color: #ecf0f1; }\n"; });
define('text!views/hash-input/hash-input.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <require from=\"components/nav/nav-menu.html\"></require>\n  <require from=\"components/logout/logout\"></require>\r\n  <require from=\"components/notification/notification-box\"></require>\r\n\r\n  <div class=\"full-height custom-center\">\r\n\r\n    <header>\r\n      <div class=\"row\">\r\n        <div class=\"small-6 column\">\r\n          <nav-menu router.bind=\"router\"></nav-menu>\r\n        </div>\r\n        <div class=\"small-6 column text-right\">\r\n          <logout></logout>\r\n        </div>\r\n      </div>\r\n    </header>\r\n\r\n    <main>\r\n      <div class=\"row align-center\">\r\n        <div class=\"small-10 text-center\">\r\n          <form role=\"form\" submit.trigger=\"collectData()\" novalidate>\r\n            <input id=\"text\" maxlength=\"255\" type=\"text\" ref=\"hashInput\" value.bind=\"hashValue\" autocomplete=\"off\">\r\n            <label class=\"text-large\" for=\"text\">${instruction} <p>Characters left: ${hashInput.maxLength - hashInput.value.length}</p></label>\r\n            <button class=\"button large\">Create hash</button>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </main>\r\n\r\n    <notification-box notify-user.bind=\"notifyUser\" notification-href.bind=\"redirectHref\"></notification-box>\r\n\r\n  </div>\r\n\r\n\r\n</template>\r\n"; });
define('text!styles/layout.css', ['module'], function(module) { module.exports = ".css-override body {\n  background: #ecf0f1;\n  font-family: \"Roboto\", sans-serif;\n  overflow-x: hidden; }\n\n.css-override main {\n  width: 100%; }\n\n.css-override input:focus {\n  box-shadow: 0 0 5px #51cbee; }\n\n.css-override table tbody, .css-override table thead {\n  border: 0; }\n\n.css-override table thead th {\n  background: #2c3e50;\n  color: #fff; }\n\n.css-override table tbody th {\n  background: #7f8c8d; }\n\n.full-height {\n  height: 100vh;\n  width: 100%; }\n"; });
define('text!views/login/login.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <div class=\"custom-center full-height\">\r\n    <div class=\"row align-center\">\r\n      <div class=\"small-10 text-center\">\r\n\r\n        <form role=\"form\" submit.trigger=\"validate()\" novalidate>\r\n          <input id=\"email\" type=\"email\" value.bind=\"email\" autocomplete=\"off\">\r\n          <label class=\"text-large\" for=\"email\">Please login with your e-mail address</label>\r\n          <p class=\"animation text-medium bold ${hideError ? 'not-visible' : 'error'}\" ref=\"errorHolder\">${errorMessage}</p>\r\n          <button class=\"button large\">Log me in</button>\r\n        </form>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</template>\r\n"; });
define('text!styles/main.css', ['module'], function(module) { module.exports = ".css-override body {\n  background: #ecf0f1;\n  font-family: \"Roboto\", sans-serif;\n  overflow-x: hidden; }\n\n.css-override main {\n  width: 100%; }\n\n.css-override input:focus {\n  box-shadow: 0 0 5px #51cbee; }\n\n.css-override table tbody, .css-override table thead {\n  border: 0; }\n\n.css-override table thead th {\n  background: #2c3e50;\n  color: #fff; }\n\n.css-override table tbody th {\n  background: #7f8c8d; }\n\n.full-height {\n  height: 100vh;\n  width: 100%; }\n\n.block {\n  display: block; }\n\n.no-margin {\n  margin: 0; }\n\n.overflow-x {\n  overflow-x: auto; }\n\n.custom-center {\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\n.text-large {\n  font-size: 1.5rem; }\n\n.text-medium {\n  font-size: 1.25rem; }\n\n.bold {\n  font-weight: 700; }\n\n.not-visible {\n  opacity: 0; }\n\n.animation-long {\n  transition: 1s; }\n\n.animation {\n  transition: 0.5s; }\n\n.animation-slide-down {\n  transform: translateY(1000px); }\n\n.animation-slide-up {\n  transform: translateY(-1000px); }\n\n.animation-flip {\n  animation: flip 1s; }\n\n@keyframes flip {\n  0% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -90deg);\n    -webkit-transition-timing-function: ease-in;\n    transition-timing-function: ease-in; }\n  100% {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n\n.notification-box {\n  position: fixed;\n  height: 10rem;\n  font-size: 1.15rem;\n  padding: 1.5rem;\n  border-style: solid;\n  border-width: 1.5px;\n  color: #fff; }\n  @media (max-width: 640px) {\n    .notification-box {\n      width: 100%; } }\n  .notification-box.box-bottom {\n    bottom: 0;\n    right: 0; }\n  .notification-box.box-success {\n    background-color: #3a945b;\n    border-color: #43AC6A; }\n  .notification-box .button-close {\n    margin-top: 10px;\n    width: 100%;\n    background: #e67e22; }\n  .notification-box a {\n    color: #fff; }\n\n.error {\n  color: #e74c3c;\n  font-weight: 700;\n  opacity: 1; }\n\nheader {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  background-color: #2980b9; }\n  header .button-group {\n    margin-top: 1rem; }\n    header .button-group .button {\n      font-size: 1.25rem;\n      padding: 0; }\n      header .button-group .button a {\n        padding: 1rem;\n        display: inline-block; }\n        @media (min-width: 1024px) {\n          header .button-group .button a {\n            padding: 1rem 2rem; } }\n  header .button {\n    margin-top: 1rem;\n    font-size: 1.25rem; }\n    header .button:only-child {\n      background-color: #2ecc71;\n      transition: 0.25s; }\n      header .button:only-child:hover {\n        transform: scale(1.05); }\n  header .active {\n    border: 2px solid #e74c3c; }\n  header a {\n    color: #fff; }\n    header a:hover {\n      color: #ecf0f1; }\n"; });
define('text!styles/media.css', ['module'], function(module) { module.exports = ""; });
define('text!styles/notifications.css', ['module'], function(module) { module.exports = ".notification-box {\n  position: fixed;\n  height: 10rem;\n  font-size: 1.15rem;\n  padding: 1.5rem;\n  border-style: solid;\n  border-width: 1.5px;\n  color: #fff; }\n  @media (max-width: 640px) {\n    .notification-box {\n      width: 100%; } }\n  .notification-box.box-bottom {\n    bottom: 0;\n    right: 0; }\n  .notification-box.box-success {\n    background-color: #3a945b;\n    border-color: #43AC6A; }\n  .notification-box .button-close {\n    margin-top: 10px;\n    width: 100%;\n    background: #e67e22; }\n  .notification-box a {\n    color: #fff; }\n\n.error {\n  color: #e74c3c;\n  font-weight: 700;\n  opacity: 1; }\n"; });
define('text!styles/utilities.css', ['module'], function(module) { module.exports = ".block {\n  display: block; }\n\n.no-margin {\n  margin: 0; }\n\n.overflow-x {\n  overflow-x: auto; }\n"; });
define('text!styles/variables.css', ['module'], function(module) { module.exports = ""; });
define('text!styles/visibility.css', ['module'], function(module) { module.exports = ".not-visible {\n  opacity: 0; }\n"; });
//# sourceMappingURL=app-bundle.js.map