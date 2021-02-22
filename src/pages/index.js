import './index.css';

import Api from '../components/Api.js';
import Cards from '../components/Card.js';
import FormValidator from '../components/FormValidation.js';
import { 
    settings,
    openEditPopupButton,
    openAddPopupButton,
    avatarPopupButton,
    textName,
    textProfession,
    imageAvatar,
    inputEditName,
    inputEditProfession,
    formEdit,
    formAddCard,
    formEditAvatar,
} from '../constants/constants.js';
import PopupDelete from '../components/PopupDelete.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Валидация
const addCardValidation = new FormValidator(settings, formAddCard);
const editProfileValidation = new FormValidator(settings, formEdit);
const editAvatarValidation = new FormValidator(settings, formEditAvatar);
addCardValidation.enableValidation();
editProfileValidation.enableValidation();
editAvatarValidation.enableValidation();


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
    headers: {
        authorization: 'dba9f667-0e97-4319-8dc7-4150f675d4be',
        'Content-Type': 'application/json'
    }
});

let userId = null;

api.getUserInfo()
    .then(userData => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
    })
    .catch((err) => {
        console.log(err);
    })


const userInfo = new UserInfo({
    userName: textName,
    userDescription: textProfession,
    avatar: imageAvatar
})

//эдит попап
const editPopup = new PopupWithForm({
    popupSelector: '.popup_type_edit-profile', 
    handleFormSubmit: (formData) => {
        editPopup.renderLoading(true);
        api.updateUserInfo(formData)
            .then(formData => {
                userInfo.setUserInfo(formData);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                editPopup.renderLoading(false);
            })
    }
});

editPopup.setEventListeners();

// открытие эдит попапа
openEditPopupButton.addEventListener('click', () => {
    inputEditName.value = userInfo.getUserInfo().userName;
    inputEditProfession.value = userInfo.getUserInfo().userDescription;
    editProfileValidation.checkButtonState();
    editPopup.openPopup();
    editProfileValidation.clearError();
    editProfileValidation.clearInputError();
})



// эдит аватара
const updateAvatar = new PopupWithForm({
    popupSelector: '.popup_type_edit-avatar',
    handleFormSubmit: (formData) => {
            updateAvatar.renderLoading(true)
            api.updateAvatar(formData)
                .then(formData => {
                    userInfo.setUserInfo(formData);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    updateAvatar.renderLoading(false);
                })
    }    
})

updateAvatar.setEventListeners();

// открытие эдит аватара 
avatarPopupButton.addEventListener('click', () => {
    editAvatarValidation.checkButtonState();
    updateAvatar.openPopup();
    editAvatarValidation.clearInputError();
    editAvatarValidation.clearError();
})



//Отрисовка дефолтных карточек при загрузке страницы
const cardList = new Section({
    renderer: (item) => {
        cardList.addItem(createCard(item));
    }
}, '.cards')

//создание карточки
function createCard(cardData) {
    const cardExample = new Cards(
        { ...cardData, userId },
        '.template-card',
        (formData) => {
            popupOpenViewImage.open(formData);
        },
        (cardData) => {
             popupDeleteCard.open(cardData);
        },
        api);
    const card = cardExample.getTemplate();
    return card;
}

// карточки полученные с сервера
api.getInitialCards()
    .then((cards) => {
        cardList.renderItems(cards);
    })
    .catch((err) => {
        console.log(err);
    });



// открытие картинки
const popupOpenViewImage = new PopupWithImage('.popup_type_view-image');
popupOpenViewImage.setEventListeners();



// попап добавления карточки
const popupAddCard = new PopupWithForm({ 
    popupSelector: '.popup_type_add-image', 
    handleFormSubmit: (formData) => {
    popupAddCard.renderLoading(true);
    api.createCard(formData)
        .then(formData => {
            cardList.addItem(createCard(formData));
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            popupAddCard.renderLoading(false);
        })
    }
});

popupAddCard.setEventListeners();

// открытие попапа добавления карточки
openAddPopupButton.addEventListener('click', () => {
    popupAddCard.openPopup();
    addCardValidation.checkButtonState();
    addCardValidation.clearError();
    addCardValidation.clearInputError();
});

// удаление карточки
const popupDeleteCard = new PopupDelete('.popup_type_card-delete', (cardData) => {
    api.removeCard(cardData.cardId)
        .then(() => {
            cardData.card.remove();
        })
        .catch(err => {
            console.log(err);
        })
});
popupDeleteCard.setEventListeners();




