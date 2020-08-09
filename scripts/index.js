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
const cardTemplate = document.querySelector('.template-card').content.querySelector('.card');
const list = document.querySelector('.cards');
const cardImageSrc = popupViewImage.querySelector('.popup__card-image');
const cardFigureText = popupViewImage.querySelector('.popup__figure');

// Кнопки
const openEditPopupButton = document.querySelector('.profile__edit-button');
const openAddPopupButton = document.querySelector('.profile__add-button');
const closeEditPopupButton = popupEditProfile.querySelector('.popup__close-button');
const closeAddPopupButton = popupAddImage.querySelector('.popup__close-button');
const closeViewImagePopupButton = popupViewImage.querySelector('.popup__close-button');

// Массив с карточками
const initialCards = [
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

// Создаем карточку
function createCard(data) {
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
});

// Сохрание значений из форм
function formEditSubmitHandler(evt) {
    evt.preventDefault();

    textName.textContent = inputEditName.value;
    textProfession.textContent = inputEditProfession.value;

    closePopup(popupEditProfile);
};

function formAddCardSubmitHandler(evt) {
    evt.preventDefault();

    renderCard({name: inputAddPlace.value, link: inputAddUrl.value});
    inputAddPlace.value = '';
    inputAddUrl.value = '';

    closePopup(popupAddImage);    
};

formEdit.addEventListener('submit', formEditSubmitHandler);
formAddCard.addEventListener('submit', formAddCardSubmitHandler);

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


closeViewImagePopupButton.addEventListener('click', () => {
    closePopup(popupViewImage);
});

popupEditProfile.addEventListener('click', closePopupByOverlay);
popupAddImage.addEventListener('click', closePopupByOverlay);
popupViewImage.addEventListener('click', closePopupByOverlay);




