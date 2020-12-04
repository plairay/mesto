// Функции открытия и закрытия попапа
function openPopup(popup) {
    popup.classList.add('popup__opened');
    document.addEventListener('keydown', closePopupByEscape);
};

function closePopup(popup) {
    popup.classList.remove('popup__opened');
    document.removeEventListener('keydown', closePopupByEscape);
};

function closePopupByEscape(event) {
    if(event.key === 'Escape') {
        closePopup(document.querySelector('.popup__opened'));
    }
} 

// Класс карточки
export default class Cards {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector =  document.querySelector('.template-card').content.querySelector('.card');
    }

    _removeCard = () => {
        this._template.remove();
    }
    _likeCard = () => {
        this._template.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _openImage = () => {
            openPopup(document.querySelector('.popup_type_view-image'));
           
            document.querySelector('.popup__card-image').src = this._template.querySelector('.card__image').src;
            document.querySelector('.popup__figure').textContent = this._template.querySelector('.card__title').textContent;
        
    }

    _setEventListeners() {
        // Открытие карточки
        this._template.querySelector('.card__image').addEventListener('click', this._openImage)
        // Удаление карточки
        this._template.querySelector('.card__delete-button').addEventListener('click', this._removeCard);
        // Лайк карточки
        this._template.querySelector('.card__like').addEventListener('click', this._likeCard);
    } 
    
    getTemplate() {
        // Клонирование темплейта
        this._template = this._cardSelector.cloneNode(true);
        // изображение темплейта
        const popupImage =  this._template.querySelector('.card__image');
        // Навешивание обработчиков
        this._setEventListeners(); 

        
        this._template.querySelector('.card__title').textContent = this._name;
        popupImage.src = this._link;
        popupImage.alt = this._name;

        return this._template;
    }
}
 
