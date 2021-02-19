import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupViewImage = document.querySelector('.popup__card-image');
        this._popupViewFigure = document.querySelector('.popup__figure');
    }

    open(name, link) {
        super.openPopup();
        this._popupViewImage.src = link;
        this._popupViewImage.alt = name;
        this._popupViewFigure.textContent = name;
    }

    setEventListeners() {
        super.setEventListeners();
    }
}