import { escapeButton } from '../constants/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._closePopupByEscape = this._closePopupByEscape.bind(this);
    }

    openPopup() {
        this._popupSelector.classList.add('popup__opened');
        document.addEventListener('keydown', this._closePopupByEscape);
    }
    closePopup() {
        this._popupSelector.classList.remove('popup__opened');
        document.removeEventListener('keydown', this._closePopupByEscape);
    }
    _closePopupByEscape(event) {
        if(event.code === escapeButton) {
            this.closePopup();
        }
    }
    setEventListeners() {
        this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => {
            this.closePopup();
        } );
        this._popupSelector.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('popup')) {
                this.closePopup();
            }
        });
    }
}


   