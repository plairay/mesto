import Cards from './Card.js';
import FormValidator from './FormValidation.js';
import { initialCards} from '../constants/constants.js';
// Попапы
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddImage = document.querySelector('.popup_type_add-image');
const popupViewImage = document.querySelector('.popup_type_view-image');

// Формы
const formEdit = popupEditProfile.querySelector('.popup__form');
const formAddCard = popupAddImage.querySelector('.popup__form');

// Инпуты
const inputEditName = formEdit.querySelector('.popup__edit-name');
const inputEditProfession = formEdit.querySelector('.popup__edit-profession');
const inputAddPlace = formAddCard.querySelector('.popup__add-place');
const inputAddUrl = formAddCard.querySelector('.popup__add-url');

// Другие DOM элементы
const textName = document.querySelector('.profile__title');
const textProfession = document.querySelector('.profile__subtitle');

// Кнопки
const openEditPopupButton = document.querySelector('.profile__edit-button');
const openAddPopupButton = document.querySelector('.profile__add-button');
const closeEditPopupButton = popupEditProfile.querySelector('.popup__close-button');
const closeAddPopupButton = popupAddImage.querySelector('.popup__close-button');

// Создаем карточку
/* function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like');
    // Лайк карточки
    cardLikeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__like_active');
    });
    //Удаление
    cardDeleteButton.addEventListener('click', () => {
        const cardItem = cardDeleteButton.closest('.card');
        cardItem.remove();
    });
    // Открытие попапа с картинкой
    cardImage.addEventListener('click', () => {
        openPopup(popupViewImage);

        cardImageSrc.src = cardImage.src;
        cardFigureText.textContent = cardTitle.textContent;
    });

    cardTitle.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name;

    return cardElement;
}
// Рендер карточки
function renderCard(data) {
    list.prepend(createCard(data));
};

initialCards.forEach((data) => {
    renderCard(data);
}); */

// Сохрание значений из форм
function formEditSubmitHandler(evt) {
    evt.preventDefault();

    textName.textContent = inputEditName.value;
    textProfession.textContent = inputEditProfession.value;

    closePopup(popupEditProfile);
};

formEdit.addEventListener('submit', formEditSubmitHandler);

// Функции открытия и закрытия попапов
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

openEditPopupButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    
    inputEditName.value = textName.textContent;
    inputEditProfession.value = textProfession.textContent;
});

closeEditPopupButton.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

openAddPopupButton.addEventListener('click', () => {
    openPopup(popupAddImage);
});
closeAddPopupButton.addEventListener('click', () => {
    closePopup(popupAddImage);
});

popupEditProfile.addEventListener('click', closePopupByOverlay);
popupAddImage.addEventListener('click', closePopupByOverlay);


// Рендер карточки
initialCards.forEach((data) => {
    const item = new Cards(data);
    const cardElement = item.getTemplate();
    document.querySelector('.cards').append(cardElement);
}); 


// Валидация формы
const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const formsList = Array.from(document.querySelectorAll('.popup__form'));

formsList.forEach((item) =>{
    const formValidation = new FormValidator(settings, item);
    formValidation.enableValidation();
});

// Добавление карточки
function formAddCardSubmitHandler(evt) {
    evt.preventDefault();

    const newCard = new Cards({
        name: inputAddPlace.value,
        link: inputAddUrl.value
    })

    const card = newCard.getTemplate();

    document.querySelector('.cards').prepend(card);
    

    closePopup(popupAddImage);
}; 

formAddCard.addEventListener('submit', formAddCardSubmitHandler);