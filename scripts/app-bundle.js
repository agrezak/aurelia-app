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

  var _desc, _value, _class, _descriptor;

  var NotificationBox = exports.NotificationBox = (_class = function NotificationBox() {
    _classCallCheck(this, NotificationBox);

    _initDefineProp(this, "notifyUser", _descriptor, this);

    this.notificationMessage = "Success! You can view created table";
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "notifyUser", [_aureliaFramework.bindable], {
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
define('views/hash-input/hash-input',["exports", "aurelia-router", "aurelia-framework"], function (exports, _aureliaRouter, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.InputClass = undefined;

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
    }

    InputClass.prototype.collectData = function collectData() {
      this.createHash();
      this.currentDate();
    };

    InputClass.prototype.createHash = function createHash() {

      var hash = this.hashValue;
      var value = md5(hash);

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
      this.errorMessage = "Please enter correct e-mail address, for example: johndoe@gmail.com.";
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
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"styles/main.css\"></require>\n  <router-view></router-view>\n\n</template>\n"; });
define('text!components/logout/logout.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <button class=\"button\" click.trigger=\"logOut()\">Logout</button>\r\n\r\n</template>\r\n"; });
define('text!styles/animations.css', ['module'], function(module) { module.exports = ".animation {\n  transition: 1.5s all linear; }\n\n.animation-slide-up {\n  transform: translateY(1000px); }\n\n.animation-slide-down {\n  transform: translateY(-1000px); }\n"; });
define('text!styles/layout.css', ['module'], function(module) { module.exports = "body {\n  background: #ecf0f1;\n  font-family: \"Roboto\", sans-serif; }\n\n.full-height {\n  height: 100vh; }\n"; });
define('text!components/nav/nav-menu.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\r\n\r\n  <ul>\r\n    <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\r\n      <a href.bind=\"row.href\">${row.title}</a>\r\n    </li>\r\n  </ul>\r\n\r\n</template>\r\n"; });
define('text!components/notification/notification-box.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n<div class=\"small-3 column align-center notification-box box-bottom box-success animation ${notifyUser ? '' : 'animation-slide-up'}\">\r\n  <p>${notificationMessage}</p>\r\n  <a href=\"\"></a>\r\n</div>\r\n\r\n</template>\r\n"; });
define('text!styles/main.css', ['module'], function(module) { module.exports = "body {\n  background: #ecf0f1;\n  font-family: \"Roboto\", sans-serif; }\n\n.full-height {\n  height: 100vh; }\n\n.custom-center {\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\n.text-large {\n  font-size: 1.5rem; }\n\n.text-medium {\n  font-size: 1.25rem; }\n\n.bold {\n  font-weight: 700; }\n\n.not-visible {\n  opacity: 0; }\n\n.animation {\n  transition: 1.5s all linear; }\n\n.animation-slide-up {\n  transform: translateY(1000px); }\n\n.animation-slide-down {\n  transform: translateY(-1000px); }\n\n.notification-box {\n  position: fixed;\n  height: 10rem;\n  border-style: solid;\n  border-width: 1px;\n  color: #fff; }\n  .notification-box.box-bottom {\n    bottom: 0;\n    right: 0; }\n  .notification-box.box-success {\n    background-color: #3a945b;\n    border-color: #43AC6A; }\n\n.error {\n  color: #e74c3c;\n  font-weight: 700;\n  opacity: 1; }\n"; });
define('text!views/data-table/data-table.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"components/nav/nav-menu.html\"></require>\n  <require from=\"components/logout/logout\"></require>\n\n  <nav-menu router.bind=\"router\"></nav-menu>\n  <logout></logout>\n\n  <table>\n    <thead>\n      <tr>\n        <th class=\"text-center\" repeat.for=\"header of headers\" name.bind=\"header\">${header}</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <th class=\"text-center\" repeat.for=\"data of data\" name.bind=\"data\">${data}</th>\n      </tr>\n    </tbody>\n  </table>\n\n</template>\n"; });
define('text!styles/variables.css', ['module'], function(module) { module.exports = ""; });
define('text!styles/notifications/notifications.css', ['module'], function(module) { module.exports = ".notification-box {\n  position: fixed;\n  height: 10rem;\n  border-style: solid;\n  border-width: 1px;\n  color: #fff; }\n  .notification-box.box-bottom {\n    bottom: 0;\n    right: 0; }\n  .notification-box.box-success {\n    background-color: #3a945b;\n    border-color: #43AC6A; }\n\n.error {\n  color: #e74c3c;\n  font-weight: 700;\n  opacity: 1; }\n"; });
define('text!views/hash-input/hash-input.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <require from=\"components/nav/nav-menu.html\"></require>\n  <require from=\"components/logout/logout\"></require>\r\n  <require from=\"components/notification/notification-box\"></require>\r\n\r\n  <nav-menu router.bind=\"router\"></nav-menu>\r\n  <logout></logout>\r\n\r\n  <form role=\"form\" submit.trigger=\"collectData()\" novalidate>\r\n    <input id=\"text\" maxlength=\"255\" type=\"text\" ref=\"hashInput\" value.bind=\"hashValue\" autocomplete=\"off\">\r\n    <label for=\"text\">${instruction} <p>Characters left: ${hashInput.maxLength - hashInput.value.length}</p></label>\r\n    <button class=\"button\">Create hash</button>\r\n  </form>\r\n\r\n  <notification-box notify-user.bind=\"notifyUser\"></notification-box>\r\n\r\n</template>\r\n"; });
define('text!views/login/login.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <div class=\"full-height custom-center\">\r\n    <div class=\"small-6 text-center\">\r\n      <form role=\"form\" submit.trigger=\"validate()\" novalidate>\r\n        <input id=\"email\" type=\"email\" value.bind=\"email\" autocomplete=\"off\">\r\n        <label class=\"text-large\" for=\"email\">Please login with your e-mail address</label>\r\n        <p class=\"animation text-medium bold ${hideError ? 'not-visible' : 'error'}\" ref=\"errorHolder\">${errorMessage}</p>\r\n        <button class=\"button large\">Log me in</button>\r\n      </form>\r\n    </div>\r\n  </div>\r\n\r\n</template>\r\n"; });
define('text!styles/alignment.css', ['module'], function(module) { module.exports = ".custom-center {\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n"; });
define('text!styles/visibility.css', ['module'], function(module) { module.exports = ".not-visible {\n  opacity: 0; }\n"; });
define('text!styles/fonts.css', ['module'], function(module) { module.exports = ".text-large {\n  font-size: 1.5rem; }\n\n.text-medium {\n  font-size: 1.25rem; }\n\n.bold {\n  font-weight: 700; }\n"; });
//# sourceMappingURL=app-bundle.js.map