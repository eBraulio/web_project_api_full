import { useContext } from "react";
import React from "react";
import trashIcon from "../images/vector/Trash-icon.svg";
import CurrentUserContext from "../context/CurrentUserContext";

export default function Card({
  card,
  onCardLike,
  onCardDelete,
  handleCardClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { name, link, _id, likes = [], owner } = card;

  function handleImageClick() {
    handleCardClick(card);
  }

  const isOwn = owner && currentUser ? owner._id === currentUser._id : false;

  const cardDeleteButtonClassName = ` ${
    isOwn ? "element__trash-icon" : "element__trash-icon-hidden"
  }`;
  const isLiked = likes.some((like) => like === currentUser._id);

  const cardLikeButtonClassName = ` ${
    isLiked ? "element__like-button-active" : "element__like-button"
  }`;

  const handleLikeClick = () => {
    onCardLike(_id, isLiked);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <div className="template__element" key={_id}>
      <img
        src={trashIcon}
        alt="Icono de Eliminar foto"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="element__image-container">
        <img
          src={link || ""}
          alt={name || ""}
          className="element__image"
          onClick={handleImageClick}
        />
      </div>
      <div className="element__button">
        <h2 className="element__text">{name}</h2>
        <div className="element__container">
          <div
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></div>
          <span className="element__like-number">{likes.length}</span>
        </div>
      </div>
    </div>
  );
}
