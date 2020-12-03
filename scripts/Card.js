// Функции открытия и закрытия попапа
function openPopup(popup) {
    popup.classList.add('popup__opened');
    document.addEventListener('keydown', closePopupByEscape);
};

function closePopup(popup) {
    popup.classList.remove('popup__opened');
    document.removeEventListener('keydown', closePopupByEscape);
};

function closePopupByOverlay(event) {
    if(event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
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
        // Закрытие по кнопке
        document.querySelector('.popup_type_view-image').querySelector('.popup__close-button').addEventListener('click', () => {
            closePopup(document.querySelector('.popup_type_view-image'));
        })
        // Закрытие по клику на оверлей
        document.querySelector('.popup_type_view-image').addEventListener('click', closePopupByOverlay);
        // Открытие карточки
        this._template.querySelector('.card__image').addEventListener('click', this._openImage)
        // Удаление карточки
        this._template.querySelector('.card__delete-button').addEventListener('click', this._removeCard);
        // Лайк карточки
        this._template.querySelector('.card__like').addEventListener('click', this._likeCard);
    } 
    
    /*  _addDataToCard() {
        this._addFormTemplate = document.querySelector('.popup_type_add-image')
        this._addFormTemplate.content.querySelector('.popup__button').addEventListener('click', () => {
            this._addFormTemplate.content.querySelector('.popup__add-place').value = document.querySelector('.card__title').textContent
            this._addFormTemplate.content.querySelector('.popup__add-url').value = this._template.querySelector('.card__image').src

            this._cardsContainer.prepend(this._template);
        })

        document.querySelector('.popup__add-place').textContent = document.querySelector('.card__title').textContent
        document.querySelector('.popup__add-url').src = this._template.querySelector('.card__image').src
        document.querySelector('.popup__add-place').alt = this._template.querySelector('.card__image').alt 

        
        
    } */

    getTemplate() {
        // Клонирование темплейта
        this._template = this._cardSelector.cloneNode(true);
        // Навешивание обработчиков
        this._setEventListeners(); 

        this._template.querySelector('.card__title').textContent = this._name;
        this._template.querySelector('.card__image').src = this._link;
        this._template.querySelector('.card__image').alt = this._name;

        return this._template;
    }
}
 
