import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";
import { CurrentUserEmailContext } from "../context/CurrentUserEmailContext.js";

function App() {
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleLogIn = () => {
    setIsLoggedIn(true);
  };
  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signin");
  };
  const handleMenuButtonClick = () => {
    console.log("Menu Mobile Funciona");
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    getUserInfo();
    getCards();
  }, []);

  async function getCards() {
    const response = await api.getInitialCards();

    setCards(response);
  }
  async function getUserInfo() {
    const response = await api.getUserInfo();
    setCurrentUser(response);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }
  function handleUpdateUser(userData) {
    api.editProfile(userData).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    });
  }
  function handleUpdateAvatar(link) {
    api.editAvatarProfile(link).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    });
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }
  function handleAddPlace(data) {
    api.addCard(data).then((card) => {
      setCards([card, ...cards]);
      closeAllPopups();
    });
  }
  function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");

      auth.checkToken(token).then((res) => {
        if (res) {
          handleLogIn();
          navigate("/");
          setCurrentEmail(res);
          console.log(currentEmail);
        }
      });
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#000",
      }}
    >
      <div className="page">
        <CurrentUserEmailContext.Provider value={currentEmail}>
          <CurrentUserContext.Provider value={currentUser}>
            <Routes>
              <Route path="/signup" element={<Register />} />

              <Route
                path="/signin"
                element={
                  <Login
                    setCurrentEmail={setCurrentEmail}
                    handleLogIn={handleLogIn}
                  />
                }
              />

              <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                <Route
                  path="/*"
                  element={
                    <>
                      <Header
                        onMenuClick={handleMenuButtonClick}
                        isOpen={isMenuOpen}
                        handleLogOut={handleLogOut}
                      />
                      <Main
                        onEditProfileClick={handleEditProfileClick}
                        onAddPlaceClick={handleAddPlaceClick}
                        onEditAvatarClick={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                      />
                      <Footer />
                      <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                      />
                      <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                      />
                      <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlace}
                      />
                      <ImagePopup
                        isOpen={isImagePopupOpen}
                        link={selectedCard.link}
                        name={selectedCard.name}
                        onClose={closeAllPopups}
                      />
                    </>
                  }
                />
              </Route>
            </Routes>
          </CurrentUserContext.Provider>
        </CurrentUserEmailContext.Provider>
      </div>
    </div>
  );
}

export default App;
