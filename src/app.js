import { Redirect } from "aurelia-router";

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
