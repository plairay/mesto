// Массив с карточками
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Валидация формы
export const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};




// Попапы
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupAddImage = document.querySelector('.popup_type_add-image');

// Формы
export const formEdit = popupEditProfile.querySelector('.popup__form');
export const formAddCard = popupAddImage.querySelector('.popup__form');

// Инпуты
export const inputEditName = formEdit.querySelector('.popup__edit-name');
export const inputEditProfession = formEdit.querySelector('.popup__edit-profession');

// Другие DOM элементы
export const textName = document.querySelector('.profile__title');
export const textProfession = document.querySelector('.profile__subtitle');

// Кнопки открытия попапов
export const openEditPopupButton = document.querySelector('.profile__edit-button');
export const openAddPopupButton = document.querySelector('.profile__add-button');







