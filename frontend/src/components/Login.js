import React from "react";
import headerLogo from "../images/vector/header__logo.svg";
import * as auth from "../utils/auth.js";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
function Login({ setIsLoggedIn, handleLogIn, setCurrentEmail }) {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    if (!email || !password) {
      return;
    }
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          api.setToken(res.token);
          setIsLoggedIn(true);
          //history.push("/home");
        }
      })
      .catch(console.log);
  };

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   auth
  //     .login(password, email)
  //     .then((data) => {
  //       console.log(data);
  //       if (data.token) {
  //         setCurrentEmail(email);
  //         setEmail("");
  //         setPassword("");
  //         handleLogIn();
  //         navigate("/");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }

  function handleFooterText() {
    navigate("/signup");
  }

  return (
    <div className="login">
      <header className="login__header">
        <div className="login__container-header">
          <img src={headerLogo} alt="Logo" className="login__logo" />
          <p className="login__register" onClick={handleFooterText}>
            Regístrate
          </p>
        </div>
      </header>
      <div className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h3 className="login__title">Inicia sesión</h3>

          <label className="login__label" htmlFor="email"></label>
          <input
            className="login__input-email"
            id="email"
            placeholder="Correo electrónico"
            required
            type="email"
            value={email}
            name="email"
            onChange={handleChangeEmail}
          />

          <label className="login__label" htmlFor="password"></label>
          <input
            className="login__input-password"
            id="password"
            placeholder="Contraseña"
            required
            type="password"
            value={password}
            name="password"
            onChange={handleChangePassword}
          />

          <button className="login__button" type="submit">
            Inicia sesión
          </button>

          <p className="login__footer">
            ¿Aún no eres miembro?{" "}
            <span onClick={handleFooterText}>Regístrate aquí</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
