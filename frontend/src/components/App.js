import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";

function App() {
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = React.useState(""); //""
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem("jwt") || "");
  const navigate = useNavigate();

  //use effect

  useEffect(() => {
    const HandleTokenCheck = () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        console.log("Renderizando profile");

        auth.checkToken(jwt).then((res) => {
          if (res) {
            setToken(jwt);
            setIsLoggedIn(true);
            fetchData();
            navigate("/profile");
          }
        });
      }
    };

    HandleTokenCheck();
    const fetchData = async () => {
      try {
        const userData = await api.getUserInfoFronServer();
        setCurrentUser(userData.data ? userData.data : userData);

        const cardInfo = await api.getInitialCards();
        setCards(cardInfo);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signin");
  };
  const handleMenuButtonClick = () => {
    console.log("Menu Mobile Funciona");
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
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

  function navigateToProfile() {
    navigate("/profile");
  }

  const handleUpdateUser = async (userData) => {
    try {
      const updataUser = await api.saveDataToServer(
        userData.name,
        userData.about
      );
      setCurrentUser(updataUser);
      closeAllPopups();
    } catch (err) {
      console.error("Error updating user data:", err);
    }
  };

  function handleUpdateAvatar(link) {
    api.updateImageProfile(link).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    });
  }
  const handleCardLike = async (cardId, isLiked) => {
    try {
      const newCard = isLiked
        ? await api.deleteLikeFromCard(cardId)
        : await api.showLikeFromCard(cardId);
      setCards((cards) =>
        cards.map((card) =>
          card._id === cardId ? (newCard.data ? newCard.data : newCard) : card
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCard = async (card) => {
    try {
      const addCard = await api.addNewCardToServer(card);
      console.log("Respuesta del servidor:", addCard);
      if (addCard && addCard._id) {
        setCards([addCard, ...cards]);
        closeAllPopups();
        navigateToProfile();
      } else {
        console.error("La respuesta no contiene _id.");
      }
    } catch (err) {
      console.error("Error updating new card:", err);
    }
  };

  function handleCardDelete(card) {
    api.deleteCardFromServer(card._id).then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  const handleLogIn = () => {
    setIsLoggedIn(true);
    navigate("/profile");
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#000",
      }}
    >
      <div className="page">
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
                      onAddPlace={handleAddCard}
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
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/profile" />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
          </Routes>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
