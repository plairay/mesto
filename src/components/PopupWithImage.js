import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupViewImage = document.querySelector('.popup__card-image');
        this._popupViewFigure = document.querySelector('.popup__figure');
    }

    open(data) {
        super.openPopup();
        this._popupViewImage.src = data.link;
        this._popupViewImage.alt = data.name;
        this._popupViewFigure.textContent = data.name;
    }
}