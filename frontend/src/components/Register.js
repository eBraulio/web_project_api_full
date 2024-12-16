import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import headerLogo from "../images/vector/header__logo.svg";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.js";
import escapeHTML from "escape-html";
function Register() {
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = React.useState(false);

  const [isFail, setIsFail] = React.useState(false);
  //

  const [error, setError] = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  //

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsFail(false);

    const sanitizedValues = {
      email: escapeHTML(values.email),
      password: escapeHTML(values.password),
    };

    auth
      .register(sanitizedValues)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
        if (err.includes("usuario ya está registrado")) {
          setError(
            "Este usuario ya está registrado. Por favor, intenta con otro correo."
          );
        } else if (err.includes("400")) {
          setError("Uno de los campos se rellenó de forma incorrecta.");
        } else {
          setError("Ha ocurrido un error. Por favor, inténtalo de nuevo.");
        }
        setIsFail(true);
        setIsSuccess(true);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  function handleFooterText() {
    navigate("/signin");
  }
  const handleCloseTooltip = () => {
    setIsSuccess(false);
  };

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
            value={values.email}
            name="email"
            onChange={handleChange}
          />

          <label className="register__label" htmlFor="password"></label>
          <input
            className="register__input-password"
            id="password"
            placeholder="Contraseña"
            required
            minlength="8"
            type="password"
            value={values.password}
            name="password"
            onChange={handleChange}
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
        // isFail={isFail}
        // isSuccess={isSuccess}
        // onClose={handleInfoTooltipClose}
        isOpen={isSuccess}
        onClose={handleCloseTooltip}
        isError={isFail}
        message={error}
      />
    </div>
  );
}

export default Register;
