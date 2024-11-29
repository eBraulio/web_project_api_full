import React from "react";
import { useNavigate } from "react-router-dom";
import headerLogo from "../images/vector/header__logo.svg";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.js";
function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");

  const [isSuccess, setIsSuccess] = React.useState(false);

  const [isFail, setIsFail] = React.useState(false);

  function handleInfoTooltipClose() {
    setIsFail(false);
    setIsSuccess(false);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth.register(password, email).then((res) => {
      if (!res || res.error) {
        setIsFail(true);
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/signin");
        }, 10000);
      }
    });
  }

  function handleFooterText() {
    navigate("/signin");
  }

  return (
    <div className="register">
      <header className="register__header">
        <div className="register__container-header">
          <img src={headerLogo} alt="Logo" className="register__logo" />
          <p className="register__login" onClick={handleFooterText}>
            Iniciar sesión
          </p>
        </div>
      </header>
      <div className="register__container">
        <form className="register__form" onSubmit={handleSubmit}>
          <h3 className="register__title">Regístrate</h3>

          <label className="register__label" htmlFor="email"></label>
          <input
            className="register__input-email"
            id="email"
            placeholder="Correo electrónico"
            required
            type="email"
            value={email}
            name="email"
            onChange={handleChangeEmail}
          />

          <label className="register__label" htmlFor="password"></label>
          <input
            className="register__input-password"
            id="password"
            placeholder="Contraseña"
            required
            minlength="8"
            type="password"
            value={password}
            name="password"
            onChange={handleChangePassword}
          />

          <button className="register__button" type="submit">
            Regístrate
          </button>

          <p className="register__footer">
            ¿Ya eres miembro?{" "}
            <span onClick={handleFooterText}>Inicia sesión aquí</span>
          </p>
        </form>
      </div>

      <InfoTooltip
        isFail={isFail}
        isSuccess={isSuccess}
        onClose={handleInfoTooltipClose}
      />
    </div>
  );
}

export default Register;
