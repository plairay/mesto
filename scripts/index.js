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
const closeViewImagePopupButton = popupViewImage.querySelector('.popup__close-button');
const submitAddPopupButton = popupAddImage.querySelector('.popup__button');

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

// открытие и закрытие окна редактирования имени и вида деятельности
openEditPopupButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    
    inputEditName.value = textName.textContent;
    inputEditProfession.value = textProfession.textContent;
});
closeEditPopupButton.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

// закрытие просмотра карточки по крестику
closeViewImagePopupButton.addEventListener('click', () => {
    closePopup(popupViewImage);
});

// открытие и закрытие окна добавления карточки
openAddPopupButton.addEventListener('click', () => {
    openPopup(popupAddImage);
});
closeAddPopupButton.addEventListener('click', () => {
    closePopup(popupAddImage);
});


// закрытие окна едита, просмотра карточки и добавления карточки по оверлею
popupEditProfile.addEventListener('click', closePopupByOverlay);
popupAddImage.addEventListener('click', closePopupByOverlay);
popupViewImage.addEventListener('click', closePopupByOverlay);

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
// проход по каждой форме
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
    // очищение инпутов
    inputAddPlace.value = '';
    inputAddUrl.value = '';
    // дизейбл кнопки
    submitAddPopupButton.disabled = true;
    submitAddPopupButton.classList.toggle('popup__button_disabled');
    
    closePopup(popupAddImage);
}; 

formAddCard.addEventListener('submit', formAddCardSubmitHandler);