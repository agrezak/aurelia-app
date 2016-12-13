import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";

@inject(Router)

export class Logout {

  constructor(router) {
    this.router = router;
  }

  logOut() {
    localStorage.clear();
    this.router.navigateToRoute("login");
  }

}
