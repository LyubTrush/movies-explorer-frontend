import React from "react";
import { Link } from "react-router-dom";

import "./Register.css";
import logo from "../../images/logo.svg";

const Register = () => {
  const handleSubmit = () => {
    console.log("нажата кнопка регистрации");
  };
  return (
    <body>
      <div className="register">
        <Link to="/" className="register__logo">
          <img src={logo} alt="Логотип"></img>
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__inputs-block">
            <label className="register__label">
              <p className="register__text-lable">Имя</p>
              <input
                className="register__input"
                type="text"
                name="name"
                placeholder="Введите имя"
              ></input>
            </label>
            <label className="register__label">
              <p className="register__text-lable">E-mail</p>
              <input
                className="register__input"
                type="email"
                name="email"
                placeholder="Введите почту"
              ></input>
            </label>
            <label className="register__label">
              <p className="register__text-lable">Пароль</p>
              <input
                className="register__input"
                type="password"
                name="password"
                placeholder="Введите пароль"
              ></input>
              <p className="register__text-lable register__error-lable">
                Что-то пошло не так
              </p>
            </label>
          </div>
          <button className="register__button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__text-block">
          <p className="register__text">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__link">
            Войти
          </Link>{" "}
        </div>
      </div>
    </body>
  );
};

export default Register;
