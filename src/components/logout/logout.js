import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";

@inject(Router)

/**
 * Logout component class, it redirects user to
 * the login view
 */

export class Logout {

  constructor(router) {
    this.router = router;
  }

  logOut() {
    this.router.navigateToRoute("login");
  }

}
