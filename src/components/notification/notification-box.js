import { bindable } from "aurelia-framework";

export class NotificationBox {

  @bindable notifyUser;

  constructor() {
    this.notificationMessage = "Success! You can view created table";
  }

}
