class Api {
  constructor({ token, address, groupId }) {
    this._authorization = token;
    this._address = address;
    this._groupId = groupId;
  }

  async _useFetch(url, method, body) {
    const headers = {
      "content-type": "application/json",
    };

    const token = localStorage.getItem("jwt");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error ${res.status}`);
  }

  async getUserInfoFronServer() {
    try {
      const res = await this._useFetch(`${this._address}/users/me`, "GET");
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  //getCards
  async getInitialCards() {
    try {
      const res = await this._useFetch(`${this._address}/cards`, "GET");
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async saveDataToServer(name, description) {
    try {
      const res = await this._useFetch(`${this._address}/users/me`, "PATCH", {
        name,
        about: description,
      });
      return res.data ? res.data : res;
    } catch (err) {
      console.log("Error al actualizar los datos del usuario:", err);
    }
  }

  async addNewCardToServer({ name, link }) {
    try {
      const res = await this._useFetch(`${this._address}/cards`, "POST", {
        name: name,
        link: link,
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async showLikeFromCard(cardId) {
    try {
      const res = await this._useFetch(
        `${this._address}/cards/likes/${cardId}`,
        "PUT"
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteLikeFromCard(cardId) {
    try {
      const res = await this._useFetch(
        `${this._address}/cards/likes/${cardId}`,
        "DELETE"
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCardFromServer(cardId) {
    try {
      const res = await this._useFetch(
        `${this._address}/cards/${cardId}`,
        "DELETE"
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async updateImageProfile(avatarUrl) {
    try {
      const res = await this._useFetch(
        `${this._address}/users/me/avatar`,
        "PATCH",
        {
          avatar: avatarUrl,
        }
      );

      return res.data ? res.data : res;
    } catch (err) {
      console.log(err);
    }
  }
}

const api = new Api({
  address: "http://localhost:3000",
  token: localStorage.getItem("jwt") || process.env.TOKEN || "",
});

// const api = new Api({
//   baseUrl: "https://around.nomoreparties.co/v1/web_es_11/",
//   headers: {
//     authorization: "6bb9691a-4f67-46d0-9c5a-49bb45cb7185",
//     "Content-Type": "application/json",
//   },
//   // baseUrl: "http://localhost:3000",
//   // headers: {
//   //   "Content-Type": "application/json",
//   //   authorization: `Bearer ${token}`,
//   // },
// });

export default api;
