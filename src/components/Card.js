
// Класс карточки
export default class Cards {
    constructor( {data, handleCardClick }, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector =  cardSelector;
    }

    _removeCard = () => {
        this._template.remove();
    }

    _likeCard = () => {
        this._template.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _setEventListeners() {
        // Удаление карточки
        this._template.querySelector('.card__delete-button').addEventListener('click', this._removeCard);
        // Лайк карточки
        this._template.querySelector('.card__like').addEventListener('click', this._likeCard);
        this._template.querySelector('.card__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    } 
    
    getTemplate() {
        // Клонирование темплейта
        this._template = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
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
 
