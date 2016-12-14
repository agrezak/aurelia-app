/**
 * TableClass that:
 * collects data from localStorage so framework can render the view based on
 *  localStorage values (keys as headers and values as table body)
 */

export class TableClass {

  headers = [];
  data = [];

  constructor() {
    this.collectData();
  }

  collectData() {

    this.data = Object.values(localStorage);

    for(let key in localStorage) {
      this.headers.push(key);
    }

  }

}
