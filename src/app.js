import { Redirect } from "aurelia-router";

/**
 * Root class App
 * config.map contains app views
 * the default fallback route is login screen
 */

export class App {

  configureRouter(config, router) {

    config.title = "Login App";
    config.addPipelineStep("authorize", AuthorizeStep);
    config.fallbackRoute("login");
    config.map([
      { route: "", moduleId: "app", redirect: "login"},
      { route: "login", moduleId: "./views/login/login", title: "Login", name: "login", nav: false},
      { route: "input", moduleId: "./views/hash-input/hash-input", title: "Input", name: "input", nav: true, auth: true},
      { route: "table", moduleId: "./views/data-table/data-table", title: "Table", name: "table", nav: true, auth: true},
    ]);

    this.router = router;

  }
}

/**
 * Class used to Authorize user when route is changed
 * If user is logged (in this case : local storage has stored data in it) then user can change the view
 * Otherwise : cancel redirect
 */

class AuthorizeStep {
  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
      let isLoggedIn = Object.values(localStorage).length;
      if (!isLoggedIn) {
        return next.cancel(new Redirect("login"));
      }
    }

    return next();
  }
}
