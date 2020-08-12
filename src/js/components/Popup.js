export default class Popup {
    constructor(popupElement) {
      const popup = document.querySelector('.popup-called');
      this.popup = popup;
      this.popupElement = popupElement;
      this.close = this.close.bind(this);
      this.open = this.open.bind(this);
      this.clearContent = this.clearContent.bind(this);
    }

    setContent() {
      this.popup.appendChild(this.popupElement);
    }

    clearContent() {
      this.popup.innerHTML = '';
    }

    open() {
      this.popup.classList.add('popup-called_is-opened');
    };

    close() {
      this.popup.classList.remove('popup-called_is-opened');
    }

}