/**
 * Modal
 */

// TODO bind modal css class to open modal button

export class Modal {

  constructor() {
    this.hideModal = true;
  }

  openModal() {
    this.hideModal = false;
  }

  closeModal() {
    this.hideModal = true;
  }

}
