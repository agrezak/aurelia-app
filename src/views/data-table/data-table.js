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
