import './index.css';


import Cards from '../components/Card.js';
import FormValidator from '../components/FormValidation.js';
import { 
    initialCards,
    settings,
    openEditPopupButton,
    openAddPopupButton,
    textName,
    textProfession,
    inputEditName,
    inputEditProfession,
    popupEditProfile,
    popupAddImage,
    formEdit,
    formAddCard,
} from '../constants/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Валидация
const addCardValidation = new FormValidator(settings, formAddCard);
const editProfileValidation = new FormValidator(settings, formEdit)
addCardValidation.enableValidation();
editProfileValidation.enableValidation();


const userInfo = new UserInfo({
    userName: textName,
    userDescription: textProfession
});

// эдит профиля
const popupEdit = new PopupWithForm({
    popupSelector: '.popup_type_edit-profile',
    handleFormSubmit: (data) => {
      userInfo.setUserInfo(data)
    },
  });
popupEdit.setEventListeners();

openEditPopupButton.addEventListener('click', () => {
    inputEditName.value = userInfo.getUserInfo().userName;
    inputEditProfession.value = userInfo.getUserInfo().userDescription;
    popupEdit.openPopup();
})

// форма добавления карточки
const popupAddCard = new PopupWithForm({
    popupSelector: '.popup_type_add-image',
    handleFormSubmit: (item) => {
        cardList.addItem(createCard(item));
    }
});
popupAddCard.setEventListeners();

openAddPopupButton.addEventListener('click', () => {
    popupAddCard.openPopup();
    addCardValidation.enableValidation();
});

// открытие картинки
const popupOpenViewImage = new PopupWithImage('.popup_type_view-image', '.popup__card-image', '.popup__figure');
popupOpenViewImage.setEventListeners();



const createCard = (item) => {
    const card = new Cards({data: item, handleCardClick: () => {
        popupOpenViewImage.open(item.name, item.link);
        }
    }, '.template-card');
    return card.getTemplate();
};


//Отрисовка дефолтных карточек при загрузке страницы
const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        cardList.addItem(createCard(item));
    }
}, '.cards')
cardList.renderItems();


