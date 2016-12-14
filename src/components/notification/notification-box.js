import { bindable } from "aurelia-framework";

export class NotificationBox {

  @bindable notifyUser;
  @bindable notificationHref;

  constructor() {
    this.notificationMessage = "Success! You can view created table";
    this.notificationTitle = "Click here.";
  }

  closeButton() {
    this.notifyUser = false;
  }

}
