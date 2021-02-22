import Popup from './Popup.js';
 
export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit })  {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popupSelector.querySelectorAll('.popup__input');
        this._form = this._popupSelector.querySelector('.popup__form');
        this._submitButton = this._popupSelector.querySelector('.popup__button');
        this._submitOnLoadButton = this._submitButton.textContent;
    }

    _getInputValues() {

        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }
    
    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = this._submitOnLoadButton;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this._form.reset();
            this.close();
        });
    }

    close() {
        super.closePopup();
        this._form.reset();
    }
}
