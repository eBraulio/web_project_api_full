class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  // constructor(options) {
  //   this.baseUrl = options.baseUrl;
  //   this.headers = {
  //     Authorization: localStorage.getItem("jwt")
  //       ? `Bearer ${localStorage.getItem("jwt")}`
  //       : "",
  //     "Content-Type": "application/json",
  //   };
  // }

  _makeRequest(endpoint, method = "GET", body = null) {
    const options = {
      method,
      headers: { ...this.headers },
    };

    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    return fetch(`${this.baseUrl}${endpoint}`, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => console.error("Error:", error));
  }

  getInitialCards() {
    return this._makeRequest("/cards");
  }

  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  editProfile(data) {
    return this._makeRequest("/users/me", "PATCH", data);
  }

  editAvatarProfile({ avatar }) {
    return this._makeRequest(`/users/me/avatar`, "PATCH", { avatar });
  }

  addCard(data) {
    return this._makeRequest("/cards", "POST", data);
  }

  deleteCard(cardId) {
    return this._makeRequest(`/cards/${cardId}`, "DELETE");
  }

  addLike(cardId) {
    return this._makeRequest(`/cards/likes/${cardId}`, "PUT");
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.removeLike(cardId) : this.addLike(cardId);
  }

  removeLike(cardId) {
    return this._makeRequest(`/cards/likes/${cardId}`, "DELETE");
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_11",
  headers: {
    authorization: "6bb9691a-4f67-46d0-9c5a-49bb45cb7185",
    "Content-Type": "application/json",
  },
});

// const api = new Api({
//   baseUrl: "https://api.ebraulio.chickenkiller.com",
//   headers: {
//     authorization: "6bb9691a-4f67-46d0-9c5a-49bb45cb7185",
//     "Content-Type": "application/json",
//   },
// });

export default api;
