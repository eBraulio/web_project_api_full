import { useContext } from "react";
import React from "react";
import trashIcon from "../images/vector/Trash-icon.svg";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Card({
  _id,
  likes,
  link,
  name,
  onCardClick,
  card,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  function handleClick() {
    onCardClick(card);
  }
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = ` ${
    isOwn ? "element__trash-icon" : "element__trash-icon-hidden"
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = ` ${
    isLiked ? "element__like-button-active" : "element__like-button"
  }`;

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card);
  }

  return (
    <div className="template__element" key={_id}>
      <img
        src={trashIcon}
        alt="Icono de Eliminar foto"
        className={cardDeleteButtonClassName}
        onClick={handleDelete}
      />
      <div className="element__image-container">
        <img
          src={link || ""}
          alt={name || ""}
          className="element__image"
          onClick={handleClick}
        />
      </div>
      <div className="element__button">
        <h2 className="element__text">{name}</h2>
        <div className="element__container">
          <div className={cardLikeButtonClassName} onClick={handleLike}></div>
          <span className="element__like-number">{likes.length}</span>
        </div>
      </div>
    </div>
  );
}
