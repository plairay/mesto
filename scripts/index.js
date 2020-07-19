const openPopup = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close-button');
const form = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__edit-name');
const inputProfession = document.querySelector('.popup__edit-profession');
const saveButton = document.querySelector('.popup__save-button');
const textName = document.querySelector('.profile__title');
const textProfession = document.querySelector('.profile__subtitle');

function togglePopup() {
    popup.classList.toggle('popup__opened');

    inputName.value = textName.textContent;
    inputProfession.value = textProfession.textContent;
}

form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    textName.textContent = inputName.value;
    textProfession.textContent = inputProfession.value;

    togglePopup();
})

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);


