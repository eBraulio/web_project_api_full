import React, { createRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const titleRef = createRef();
  const imageLinkRef = createRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: titleRef.current.value,
      link: imageLinkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Nuevo Lugar"
      name="place"
      buttonText="Guardar"
    >
      <input
        className="popup__input popup__add-name"
        type="text"
        ref={titleRef || ""}
        name="name"
        id="popup__add-name"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error" id="popup__add-name-error"></span>
      <input
        className="popup__input popup__add-adress"
        type="url"
        name="link"
        ref={imageLinkRef || ""}
        id="popup__add-adress"
        placeholder="Enlace a la imagen"
        required
      />
      <span className="popup__error" id="popup__add-adress-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
