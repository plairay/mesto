
export default class UserInfo {
    constructor({ userName, userDescription }) {
      this._userName = document.querySelector('.profile__title');
      this._userDescription = document.querySelector('.profile__subtitle');
    }
  
    getUserInfo() {
      return {
        userName: this._userName.textContent,
        userDescription: this._userDescription.textContent
      }
    }
  
    setUserInfo(data) {
      this._userName.textContent = data.title;
      this._userDescription.textContent = data.profession;
    }
  }