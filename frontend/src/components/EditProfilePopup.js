import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Editar Perfil"
      name="profile"
      buttonText="Guardar"
    >
      <input
        className="popup__input popup__input-name"
        placeholder="Nombre"
        onChange={handleChangeName}
        value={name || ""}
        name="name"
        type="text"
        id="popup__input-name"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error" id="popup__input-name-error"></span>
      <input
        className="popup__input popup__input-description"
        placeholder="Descripción"
        onChange={handleChangeDescription}
        value={description || ""}
        name="about"
        type="text"
        id="popup__input-description"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error" id="popup__input-description-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
