class Api {
  constructor(url) {
    this._url = url;
    this._token = localStorage.getItem("jwt");
  }

  setToken(token) {
    this._token = token;
    console.log(token);
  }

  // _makeRequest(endpoint, method = "GET", body = null) {
  //   const options = {
  //     method,
  //     headers: { ...this.headers },
  //   };

  //   if (body) {
  //     options.headers["Content-Type"] = "application/json";
  //     options.body = JSON.stringify(body);
  //   }

  //   return fetch(`${this._baseUrl}${endpoint}`, options).then((res) => {
  //     if (!res.ok) {
  //       return Promise.reject(`Error: ${res.status}`);
  //     }
  //     return res.json();
  //   });
  // }

  async getInitialCards() {
    const res = await fetch(`${this._url}cards`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
      },
    });
    return await res.json();
  }

  async getUserInfo() {
    const res = await fetch(`${this._url}users/me`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
      },
    });
    return await res.json();
  }

  async editProfile(name, about) {
    const res = await fetch(`${this._url}users/me`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
    return await res.json();
  } //name, about->data

  async editAvatarProfile(avatar) {
    const res = await fetch(`${this._url}users/me/avatar`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
    return await res.json();
  }

  async addCard(name, link) {
    const res = await fetch(`${this._url}cards`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
    return await res.json();
  } // name, link -> data

  async deleteCard(cardId) {
    const res = await fetch(`${this._url}cards/${cardId}`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    return await res.json();
  }

  async addLike(cardId) {
    const res = await fetch(`${this._url}cards/likes/${cardId}`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    return await res.json();
  }

  // changeLikeCardStatus(cardId, isLiked) {
  //   return isLiked ? this.removeLike(cardId) : this.addLike(cardId);
  // }

  async removeLike(cardId) {
    const res = await fetch(`${this._url}cards/likes/${cardId}`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    return await res.json();
  }
}
// const api = new Api({
//   baseUrl: "https://around.nomoreparties.co/v1/web_es_11",
//   headers: {
//     authorization: "6bb9691a-4f67-46d0-9c5a-49bb45cb7185",
//     "Content-Type": "application/json",
//   },
// });

// const api = new Api({
//   baseUrl: "https://api.ebraulio.chickenkiller.com",
//   headers: {
//     authorization: "6bb9691a-4f67-46d0-9c5a-49bb45cb7185",
//     "Content-Type": "application/json",
//   },
// });

// const api = new Api({
//   baseUrl: "http://localhost:3000",
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//     "Content-Type": "application/json",
//   },
// });

//const api = new Api("https://se-register-api.en.tripleten-services.com/v1/");
const api = new Api("http://localhost:3000/");

export default api;
