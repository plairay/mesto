
// Класс карточки
export default class Cards {
    constructor( data,  cardSelector, handleCardClick , popupDelete, api) {
        this._name = data.name;
        this._link = data.link;
        this._likesId = data.likes;
        this._likes = data.likes.length;
        this._usersId = data.owner._id;
        this._cardId = data._id;
        this._myId = data.userId;
        this._handleCardClick = handleCardClick;
        this._cardSelector =  cardSelector;
        this._popupDelete = popupDelete;
        this._api = api;
        
    }

    _like(evt) {
        evt.target.classList.toggle('card__like_active');
    }

    _isLiked() {
        return Boolean(this._likesId.find(obj => obj._id == this._myId));
    }

    _likedCards(isLiked) {
        if (isLiked) {
            this._template.querySelector('.card__like').classList.add('card__like_active');
        }
    }


    _likeCard() {
        this._api.likeCard(this._cardId)
            .then((res) => {
                this._likes = res.likes.length;
                this._cardLikes.textContent = this._likes;
            })
            .catch(err => {
                console.log(err);
            })
    }

    _unlikeCard() {
        this._api.unLikeCard(this._cardId)
            .then((res) => {
                this._likes = res.likes.length;
                this._cardLikes.textContent = this._likes;
            })
            .catch(err => {
                console.log(err);
            })
    }

    _setEventListeners() {
        // Удаление карточки
        this._template.querySelector('.card__delete-button').addEventListener('click', () => {
            this._popupDelete({ cardId: this._cardId, card: this._template });
        });
        // Лайк карточки
        this._template.querySelector('.card__like').addEventListener('click', (evt) => {
            const activeLikeButton = this._template.querySelector('.card__like').classList.contains('card__like_active');
            activeLikeButton ? this._unlikeCard() : this._likeCard();
            this._like(evt);
        });
        //открытие карточки
        this._template.querySelector('.card__image').addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
        })
    } 
    
    _removeDeleteButton() {
        if (this._usersId !== this._myId) {
            this._template.querySelector('.card__delete-button').remove();
        }
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
        this._removeDeleteButton();

        this._template.querySelector('.card__title').textContent = this._name;
        popupImage.src = this._link;
        popupImage.alt = this._name;
        this._cardLikes = this._template.querySelector('.card__number-likes');
        this._cardLikes.textContent = this._likes;
        this._likedCards(this._isLiked());

        return this._template;
    }
}
 
