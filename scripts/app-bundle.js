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
define('components/logout',["exports", "aurelia-framework", "aurelia-router"], function (exports, _aureliaFramework, _aureliaRouter) {
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
define('components/notification-box',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NotificationBox = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var NotificationBox = exports.NotificationBox = function NotificationBox() {
    _classCallCheck(this, NotificationBox);

    this.notificationMessage = "Success! You can view created table";
  };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
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
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <router-view></router-view>\n</template>\n"; });
define('text!components/logout.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <button class=\"button\" click.trigger=\"logOut()\">Logout</button>\r\n\r\n</template>\r\n"; });
define('text!components/nav-menu.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\r\n\r\n  <ul>\r\n    <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\r\n      <a href.bind=\"row.href\">${row.title}</a>\r\n    </li>\r\n  </ul>\r\n\r\n</template>\r\n"; });
define('text!components/notification-box.html', ['module'], function(module) { module.exports = "<template bindable>\r\n\r\n<div class=\"small-3 column\">\r\n  <p>${notificationMessage}</p>\r\n</div>\r\n\r\n</template>\r\n"; });
define('text!views/data-table/data-table.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"components/nav-menu.html\"></require>\n  <require from=\"components/logout\"></require>\n\n  <nav-menu router.bind=\"router\"></nav-menu>\n  <logout></logout>\n\n  <table>\n    <thead>\n      <tr>\n        <th repeat.for=\"header of headers\" name.bind=\"header\">${header}</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <th repeat.for=\"data of data\" name.bind=\"data\">${data}</th>\n      </tr>\n    </tbody>\n  </table>\n\n</template>\n"; });
define('text!views/login/login.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <form role=\"form\" submit.trigger=\"validate()\" novalidate>\r\n    <input id=\"email\" type=\"email\" value.bind=\"email\" autocomplete=\"off\">\r\n    <label for=\"email\">Please login with your e-mail address</label>\r\n    <p class=\"${hideError ? 'hide' : 'error'}\" ref=\"errorHolder\">${errorMessage}</p>\r\n    <button class=\"button\">Log me in</button>\r\n  </form>\r\n\r\n</template>\r\n"; });
define('text!views/hash-input/hash-input.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <require from=\"components/nav-menu.html\"></require>\r\n  <require from=\"components/logout\"></require>\r\n  <require from=\"components/notification-box\"></require>\r\n\r\n  <nav-menu router.bind=\"router\"></nav-menu>\r\n  <logout></logout>\r\n\r\n  <form role=\"form\" submit.trigger=\"collectData()\" novalidate>\r\n    <input id=\"text\" maxlength=\"255\" type=\"text\" ref=\"hashInput\" value.bind=\"hashValue\" autocomplete=\"off\">\r\n    <label for=\"text\">${instruction} <p>Characters left: ${hashInput.maxLength - hashInput.value.length}</p></label>\r\n    <button class=\"button\">Create hash</button>\r\n  </form>\r\n\r\n  <notification-box></notification-box>\r\n\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map