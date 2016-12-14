import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";

@inject(Router)

/**
 * Logout component class, it clears localStorage and redirects user to
 * the login view
 */

export class Logout {

  constructor(router) {
    this.router = router;
  }

  logOut() {
    localStorage.clear();
    this.router.navigateToRoute("login");
  }

}
