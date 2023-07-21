class MainApi {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }
  _handleRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  //редактирование профиля
  setProfileData(userData) {
    console.log(userData)
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData), 
    } ).then(this._handleRes);
    
  }

  getUserInfo() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
    .then(this._handleRes);
  }

  getMovies() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._handleRes);
  }

  addMovies(data) {
    const token = localStorage.getItem("jwt");
    console.log(data)
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
      }),
    }).then(this._handleRes);
  }

  deleteMovies(movieId) {
    const token = localStorage.getItem("jwt");
    console.log(movieId)
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._handleRes);
  }
}

export const mainApi = new MainApi({
  baseUrl: "https://api.mymov.nomoredomains.rocks",
});
