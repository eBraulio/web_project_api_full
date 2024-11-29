import React from "react";
import headerLogo from "../images/vector/header__logo.svg";
import MenuImage from "../images/Menu.png";
import closeButton from "../images/vector/close-icon.svg";
import { CurrentUserEmailContext } from "../context/CurrentUserEmailContext.js";

export default function Header({ onMenuClick, isOpen, handleLogOut }) {
  const currentUserEmail = React.useContext(CurrentUserEmailContext);
  return (
    <header className="header">
      {isOpen ? (
        <div className="header__mobile-login">
          <p className="header__mobile-email">
            {typeof currentUserEmail === "string"
              ? currentUserEmail
              : `email@mail.com`}
          </p>
          <p className="header__mobile-signout" onClick={handleLogOut}>
            Cerrar sesión
          </p>
        </div>
      ) : (
        ""
      )}

      <div className="header__container">
        <img src={headerLogo} alt="Logo" className="header__logo" />

        {isOpen ? (
          <img
            className="header__menu-close"
            alt="close button"
            onClick={onMenuClick}
            src={closeButton}
          />
        ) : (
          <img
            className="header__menu"
            alt="menu button"
            onClick={onMenuClick}
            src={MenuImage}
          />
        )}

        <div className="header__login">
          <p className="header__email">
            {typeof currentUserEmail === "string"
              ? currentUserEmail
              : `email@mail.com`}
          </p>
          <p className="header__signout" onClick={handleLogOut}>
            Cerrar sesión
          </p>
        </div>
      </div>
    </header>
  );
}
