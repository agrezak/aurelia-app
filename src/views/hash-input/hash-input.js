import { Router } from "aurelia-router";
import { inject, bindable } from "aurelia-framework";

@inject(Router)

export class InputClass {

  constructor(router) {
    this.router = router;
    this.hashValue = "";
    this.hash = "";
    this.creationDate = "";
    this.instruction = "Enter text here. Maximum length : 255 characters";
    this.notifyUser = false;
  }

  collectData() {
    this.createHash();
    this.currentDate();
  }

  createHash() {

    let hash = this.hashValue;
    let value = md5(hash);

    value = value.substring(0,8);

    this.hash = value;
    this.notifyUser = true;

    localStorage.setItem("hash", this.hash);
    localStorage.setItem("input", this.hashValue);

  }

  currentDate() {

    let d = new Date().toUTCString();

    this.creationDate = d;
    localStorage.setItem("creationDate", this.creationDate);

  }

}
