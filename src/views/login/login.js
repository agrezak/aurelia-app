import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";

@inject(Router)

/**
 * Login class with custom e-mail validation,
 * it also stores e-mail in localStorage
 */

export class Login {

  constructor(router) {
    this.router = router;
    this.errorMessage = "Please enter correct e-mail address, for example: johndoe@gmail.com";
    this.hideError = true;
  }

  validate(email) {

    email = this.email;
    let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let bool = reg.test(email);

    if (bool) {
      this.success(email);
      return;
    }

    this.failure();

  }
  success(args) {
    this.i++;
    this.cacheUser(args);
    this.router.navigateToRoute("input");
  }

  failure() {
    this.hideError = false;
  }

  cacheUser(data) {
    localStorage.setItem("userEmail", data);
  }

}
