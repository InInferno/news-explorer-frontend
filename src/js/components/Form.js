export default class Form {
  constructor(form) {
    this.form = form;
    this.inputs = form.querySelectorAll('.popup__input');
    this.button = form.querySelector('button');
    this.setServerError = this.setServerError.bind(this);
    this._validateInputElement = this._validateInputElement.bind(this);
    this.inputs.forEach((input) => {
      input.addEventListener('input', () => this._validateInputElement(input))
    })
    this.inputs.forEach((input) => {
      input.addEventListener('input', () => this._validateForm(this.inputs));
    })

    this.formInfo = {};
    this.button.addEventListener('click', () => this._getInfo(event));

  }

  setServerError(asnwerServer) {
    const errForm = this.button.previousElementSibling;
    console.log(errForm);
    if (asnwerServer) {
      errForm.classList.add('popup__form-error_active');
    } else {
      errForm.classList.remove('popup__form-error_active');
    }
  };

  _validateInputElement(input) {
    const err = input.nextElementSibling;
    if (!(input.checkValidity())) {
      err.classList.add('popup__form-error_active');
    } else {
      err.classList.remove('popup__form-error_active');
    }
  };

  _validateForm(inputs) {
    let isValidForm = false;
    isValidForm = Array.from(inputs).every(function(input) {
      return input.checkValidity() === true;
    })

    if (isValidForm) {
      this.form.querySelector('.button').classList.add('popup__button_active');
      this.form.querySelector('.button').removeAttribute("disabled", "disabled");
    } else {
      this.form.querySelector('.button').classList.remove('popup__button_active');
      this.form.querySelector('.button').setAttribute("disabled", "disabled");
    }
  };

  _clear(input) {
    input.value = '';
  };

  _getInfo(event) {
    event.preventDefault();
    this.inputs.forEach((input) => {
      this.formInfo[`${input.name}`] = input.value;
    })
    return this.formInfo;
  }
};