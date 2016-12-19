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
define('components/header/custom-header',["exports", "aurelia-router", "aurelia-framework"], function (exports, _aureliaRouter, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.customHeader = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var customHeader = exports.customHeader = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function customHeader(router) {
    _classCallCheck(this, customHeader);

    this.router = router;
  }) || _class);
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
      this.router.navigateToRoute("login");
    };

    return Logout;
  }()) || _class);
});
define('components/modal/modal',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Modal = exports.Modal = function () {
    function Modal() {
      _classCallCheck(this, Modal);

      this.hideModal = true;
    }

    Modal.prototype.openModal = function openModal() {
      this.hideModal = false;
    };

    Modal.prototype.closeModal = function closeModal() {
      this.hideModal = true;
    };

    return Modal;
  }();
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
define('views/data-table/data-table',["exports", "aurelia-framework", "../../components/modal/modal"], function (exports, _aureliaFramework, _modal) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TableClass = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TableClass = exports.TableClass = (_dec = (0, _aureliaFramework.inject)(_modal.Modal), _dec(_class = function () {
    function TableClass(Modal) {
      _classCallCheck(this, TableClass);

      this.headers = [];
      this.data = [];

      this.collectData();
      this.modal = Modal;
    }

    TableClass.prototype.collectData = function collectData() {

      this.data = Object.values(localStorage);

      for (var key in localStorage) {
        this.headers.push(key);
      }
    };

    TableClass.prototype.clearData = function clearData() {
      localStorage.clear();
    };

    TableClass.prototype.openModal = function openModal() {
      this.modal.openModal();
    };

    return TableClass;
  }()) || _class);
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
      this.redirectHref = "#/table";
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
      this.i++;
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
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"styles/main.css\"></require>\n  <router-view class=\"full-height css-override\"></router-view>\n\n</template>\n"; });
define('text!styles/alignment.css', ['module'], function(module) { module.exports = ".custom-center {\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n"; });
define('text!components/header/custom-header.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n<require from=\"../nav/nav-menu.html\"></require>\r\n<require from=\"../logout/logout\"></require>\r\n\r\n<header>\r\n  <div class=\"row\">\r\n    <div class=\"small-6 column\">\r\n      <nav-menu router.bind=\"router\"></nav-menu>\r\n    </div>\r\n    <div class=\"small-6 column text-right\">\r\n      <logout></logout>\r\n    </div>\r\n  </div>\r\n</header>\r\n\r\n</template>\r\n"; });
define('text!styles/animations.css', ['module'], function(module) { module.exports = ".animation-long {\n  transition: 1s; }\n\n.animation {\n  transition: 0.5s; }\n\n.animation-slide-down {\n  transform: translateY(1000px); }\n\n.animation-slide-up {\n  transform: translateY(-1000px); }\n\n.animation-flip {\n  animation: flip 1s; }\n\n@keyframes flip {\n  0% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -90deg);\n    -webkit-transition-timing-function: ease-in;\n    transition-timing-function: ease-in; }\n  100% {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n"; });
define('text!components/logout/logout.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <ul class=\"button-group block\">\r\n    <li class=\"button large\">\r\n      <a href=\"#\" click.trigger=\"logOut()\">Logout</a>\r\n    </li>\r\n  </ul>\r\n\r\n</template>\r\n"; });
define('text!styles/fonts.css', ['module'], function(module) { module.exports = ".text-large {\n  font-size: 1.5rem; }\n\n.text-medium {\n  font-size: 1.25rem; }\n\n.bold {\n  font-weight: 700; }\n"; });
define('text!components/modal/modal.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <!-- Modal wrapper -->\r\n\r\n<div model.bind=\"hide-modal\" class=\"${hideModal ? 'hide' : 'test-class'}\">\r\n\r\n    <div class=\"modal-bg\"></div>\r\n\r\n    <div class=\"modal\">\r\n\r\n      <div class=\"row align-center\">\r\n\r\n        <p>Are you sure? Clicking \"yes\" will result in clearing all the data and logging you out. Clicking \"no\" will result in closing this window.</p>\r\n\r\n        <div class=\"small-6 text-center\">\r\n          <button class=\"button large\">Yes</button>\r\n          <button class=\"button large\" click.trigger=\"closeModal()\">No</button>\r\n        </div>\r\n\r\n      </div>\r\n\r\n    </div>\r\n\r\n  </div>\r\n\r\n</template>\r\n"; });
define('text!components/nav/nav-menu.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\r\n\r\n  <ul class=\"button-group\">\r\n    <li repeat.for=\"row of router.navigation\" class=\"button large ${row.isActive ? 'active' : ''}\">\r\n      <a href.bind=\"row.href\">${row.title}</a>\r\n    </li>\r\n  </ul>\r\n\r\n</template>\r\n"; });
define('text!styles/header.css', ['module'], function(module) { module.exports = "header {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  background-color: #2980b9; }\n  header .button-group {\n    margin-top: 1rem; }\n    header .button-group .button {\n      font-size: 1.25rem;\n      padding: 0; }\n      header .button-group .button a {\n        padding: 1rem;\n        display: inline-block; }\n        @media (min-width: 1024px) {\n          header .button-group .button a {\n            padding: 1rem 2rem; } }\n  header .button {\n    margin-top: 1rem;\n    font-size: 1.25rem; }\n    header .button:only-child {\n      background-color: #2ecc71;\n      transition: 0.25s; }\n      header .button:only-child:hover {\n        transform: scale(1.05); }\n  header .active {\n    border: 2px solid #e74c3c; }\n  header a {\n    color: #fff; }\n    header a:hover {\n      color: #ecf0f1; }\n"; });
define('text!components/notification/notification-box.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n<div ref=\"notifBox\" class=\"notification-box box-bottom box-success text-center animation-long ${notifyUser ? 'animation-flip' : 'animation-slide-down'}\">\r\n  <p class=\"no-margin\">${notificationMessage}</p>\r\n  <a class=\"block\" href=\"${notificationHref}\">${notificationTitle}</a>\r\n  <button click.trigger=\"closeButton()\" class=\"button button-close large\">Close</button>\r\n</div>\r\n\r\n</template>\r\n"; });
define('text!views/data-table/data-table.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"components/header/custom-header\"></require>\n  <require from=\"components/modal/modal\"></require>\n\n  <custom-header></custom-header>\n\n  <div class=\"full-height custom-center\">\n\n    <main>\n      <div class=\"row overflow-x\">\n        <table>\n          <thead>\n            <tr>\n              <th class=\"text-center\" repeat.for=\"header of headers\" name.bind=\"header\">${header}</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <th class=\"text-center\" repeat.for=\"data of data\" name.bind=\"data\">${data}</th>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n\n      <!-- TODO   -->\n      <!-- <div class=\"row align-right\">\n        <button class=\"button large\" click.trigger=\"openModal()\">Erase all the data</button>\n      </div> -->\n\n    </main>\n  </div>\n\n  <modal></modal>\n\n</template>\n"; });
define('text!styles/layout.css', ['module'], function(module) { module.exports = ".css-override body {\n  background: #ecf0f1;\n  font-family: \"Roboto\", sans-serif;\n  overflow-x: hidden; }\n\n.css-override main {\n  width: 100%; }\n\n.css-override input:focus {\n  box-shadow: 0 0 5px #51cbee; }\n\n.css-override table tbody, .css-override table thead {\n  border: 0; }\n\n.css-override table thead th {\n  background: #2c3e50;\n  color: #fff; }\n\n.css-override table tbody th {\n  background: #7f8c8d; }\n\n.full-height {\n  height: 100vh;\n  width: 100%; }\n"; });
define('text!views/hash-input/hash-input.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <require from=\"components/header/custom-header\"></require>\n  <require from=\"components/notification/notification-box\"></require>\r\n\r\n  <custom-header></custom-header>\r\n\r\n  <div class=\"full-height custom-center\">\r\n\r\n    <main>\r\n      <div class=\"row align-center\">\r\n        <div class=\"small-10 text-center\">\r\n          <form role=\"form\" submit.trigger=\"collectData()\" novalidate>\r\n            <input id=\"text\" maxlength=\"255\" type=\"text\" ref=\"hashInput\" value.bind=\"hashValue\" autocomplete=\"off\">\r\n            <label class=\"text-large\" for=\"text\">${instruction} <p>Characters left: ${hashInput.maxLength - hashInput.value.length}</p></label>\r\n            <button class=\"button large\">Create hash</button>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </main>\r\n\r\n    <notification-box notify-user.bind=\"notifyUser\" notification-href.bind=\"redirectHref\"></notification-box>\r\n\r\n  </div>\r\n\r\n\r\n</template>\r\n"; });
define('text!styles/main.css', ['module'], function(module) { module.exports = ".css-override body {\n  background: #ecf0f1;\n  font-family: \"Roboto\", sans-serif;\n  overflow-x: hidden; }\n\n.css-override main {\n  width: 100%; }\n\n.css-override input:focus {\n  box-shadow: 0 0 5px #51cbee; }\n\n.css-override table tbody, .css-override table thead {\n  border: 0; }\n\n.css-override table thead th {\n  background: #2c3e50;\n  color: #fff; }\n\n.css-override table tbody th {\n  background: #7f8c8d; }\n\n.full-height {\n  height: 100vh;\n  width: 100%; }\n\n.block {\n  display: block; }\n\n.no-margin {\n  margin: 0; }\n\n.overflow-x {\n  overflow-x: auto; }\n\n.custom-center {\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\n.text-large {\n  font-size: 1.5rem; }\n\n.text-medium {\n  font-size: 1.25rem; }\n\n.bold {\n  font-weight: 700; }\n\n.not-visible {\n  opacity: 0; }\n\n.animation-long {\n  transition: 1s; }\n\n.animation {\n  transition: 0.5s; }\n\n.animation-slide-down {\n  transform: translateY(1000px); }\n\n.animation-slide-up {\n  transform: translateY(-1000px); }\n\n.animation-flip {\n  animation: flip 1s; }\n\n@keyframes flip {\n  0% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -90deg);\n    -webkit-transition-timing-function: ease-in;\n    transition-timing-function: ease-in; }\n  100% {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n\n.notification-box {\n  position: fixed;\n  height: 10rem;\n  font-size: 1.15rem;\n  padding: 1.5rem;\n  border-style: solid;\n  border-width: 1.5px;\n  color: #fff; }\n  @media (max-width: 640px) {\n    .notification-box {\n      width: 100%; } }\n  .notification-box.box-bottom {\n    bottom: 0;\n    right: 0; }\n  .notification-box.box-success {\n    background-color: #3a945b;\n    border-color: #43AC6A; }\n  .notification-box .button-close {\n    margin-top: 10px;\n    width: 100%;\n    background: #e67e22; }\n  .notification-box a {\n    color: #fff; }\n\n.error {\n  color: #e74c3c;\n  font-weight: 700;\n  opacity: 1; }\n\nheader {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  background-color: #2980b9; }\n  header .button-group {\n    margin-top: 1rem; }\n    header .button-group .button {\n      font-size: 1.25rem;\n      padding: 0; }\n      header .button-group .button a {\n        padding: 1rem;\n        display: inline-block; }\n        @media (min-width: 1024px) {\n          header .button-group .button a {\n            padding: 1rem 2rem; } }\n  header .button {\n    margin-top: 1rem;\n    font-size: 1.25rem; }\n    header .button:only-child {\n      background-color: #2ecc71;\n      transition: 0.25s; }\n      header .button:only-child:hover {\n        transform: scale(1.05); }\n  header .active {\n    border: 2px solid #e74c3c; }\n  header a {\n    color: #fff; }\n    header a:hover {\n      color: #ecf0f1; }\n\n.modal {\n  display: block;\n  opacity: 1;\n  visibility: visible;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 1005;\n  background: #fff;\n  width: 60%;\n  padding: 5rem;\n  border: 1px solid #000; }\n\n.modal-bg {\n  display: block;\n  background: rgba(0, 0, 0, 0.25);\n  position: fixed;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 1000; }\n"; });
define('text!views/login/login.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <div class=\"custom-center full-height\">\r\n    <div class=\"row align-center\">\r\n      <div class=\"small-10 text-center\">\r\n\r\n        <form role=\"form\" submit.trigger=\"validate()\" novalidate>\r\n          <input id=\"email\" type=\"email\" value.bind=\"email\" autocomplete=\"off\">\r\n          <label class=\"text-large\" for=\"email\">Please login with your e-mail address</label>\r\n          <p class=\"animation text-medium bold ${hideError ? 'not-visible' : 'error'}\" ref=\"errorHolder\">${errorMessage}</p>\r\n          <button class=\"button large\">Log me in</button>\r\n        </form>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</template>\r\n"; });
define('text!styles/media.css', ['module'], function(module) { module.exports = ""; });
define('text!styles/notifications.css', ['module'], function(module) { module.exports = ".notification-box {\n  position: fixed;\n  height: 10rem;\n  font-size: 1.15rem;\n  padding: 1.5rem;\n  border-style: solid;\n  border-width: 1.5px;\n  color: #fff; }\n  @media (max-width: 640px) {\n    .notification-box {\n      width: 100%; } }\n  .notification-box.box-bottom {\n    bottom: 0;\n    right: 0; }\n  .notification-box.box-success {\n    background-color: #3a945b;\n    border-color: #43AC6A; }\n  .notification-box .button-close {\n    margin-top: 10px;\n    width: 100%;\n    background: #e67e22; }\n  .notification-box a {\n    color: #fff; }\n\n.error {\n  color: #e74c3c;\n  font-weight: 700;\n  opacity: 1; }\n"; });
define('text!styles/utilities.css', ['module'], function(module) { module.exports = ".block {\n  display: block; }\n\n.no-margin {\n  margin: 0; }\n\n.overflow-x {\n  overflow-x: auto; }\n"; });
define('text!styles/variables.css', ['module'], function(module) { module.exports = ""; });
define('text!styles/visibility.css', ['module'], function(module) { module.exports = ".not-visible {\n  opacity: 0; }\n"; });
define('text!styles/modal.css', ['module'], function(module) { module.exports = ".modal {\n  display: block;\n  opacity: 1;\n  visibility: visible;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 1005;\n  background: #fff;\n  width: 60%;\n  padding: 5rem;\n  border: 1px solid #000; }\n\n.modal-bg {\n  display: block;\n  background: rgba(0, 0, 0, 0.25);\n  position: fixed;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 1000; }\n"; });
//# sourceMappingURL=app-bundle.js.map