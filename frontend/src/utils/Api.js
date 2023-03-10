
class Api {
  #onResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject({ message: "Ошибка", res });
  }

  constructor(options) {
    this._url = options.url;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    }).then(
      (res) => {
        return this.#onResponce(res);
      }
    );
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {      headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }}).then(
      (res) => {
        return this.#onResponce(res);
      }
    );
  }

  getEditUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.fullname,
        about: data.profession,
      }),
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  getAddCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  removeCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar `, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar: data.avatar }),
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  toggleLike(id, isLike) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: isLike ? "DELETE" : "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      return this.#onResponce(res);
    });
  }
}

const api = new Api({
  url: "https://project.christinochka.nomoredomainsclub.ru",
});


export default api;
