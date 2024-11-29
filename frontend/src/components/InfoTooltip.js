import React from "react";
import SuccessImage from "../images/success.png";
import FailImage from "../images/fail.png";
import closeButton from "../images/vector/close-icon.svg";
function InfoTooltip({ isSuccess, isFail, onClose }) {
  return (
    <>
      {isSuccess && (
        <div className="infotooltip">
          <div className="infotooltip__background">
            <img
              className="infotooltip__close-button"
              onClick={onClose}
              src={closeButton}
            />
            <img className="infotooltip__success" src={SuccessImage} />
            <p className="infotooltip__text">¡Correcto! Ya estás registrado.</p>
          </div>
        </div>
      )}

      {isFail && (
        <div className="infotooltip">
          <div className="infotooltip__background">
            <img
              className="infotooltip__close-button"
              onClick={onClose}
              src={closeButton}
            />
            <img className="infotooltip__fail" src={FailImage} />
            <p className="infotooltip__text">
              Uy, algo salió mal. Por favor, inténtalo de nuevo.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default InfoTooltip;
