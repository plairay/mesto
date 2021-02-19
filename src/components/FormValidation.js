
class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
        this._buttonElement = formElement.querySelector(settings.submitButtonSelector);
    }

    
    _showInputError = (inputElement) => {
        const errorElement =  this._formElement.querySelector(`#${ inputElement.name}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent =  inputElement.validationMessage;
        errorElement.classList.add(this._settings.errorClass);
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
    }

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
        
    }

    _checkButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add( this._settings.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove( this._settings.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    _setEventListeners = () => {
        this._checkButtonState();
    
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._checkButtonState();
            });
        });
    }

    enableValidation = () => {
        const forms = Array.from(document.querySelectorAll('.popup__form'));

        forms.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
      
            this._setEventListeners();
        });

    }
}

export default FormValidator;
