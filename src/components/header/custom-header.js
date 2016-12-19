import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";

@inject(Router)

export class customHeader {

 constructor(router) {
   this.router = router;
 }

}
