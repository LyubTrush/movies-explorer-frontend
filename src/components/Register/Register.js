import React, { useCallback } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./Register.css";
import logo from "../../images/logo.svg";

const Register = (props) => {
  const { onSubmit } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [nameErrors, setNameErrors] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const data = { name, email, password };
      onSubmit(data);
    },
    [name, email, password, onSubmit]
  );

  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);

    // Name validation (example: minimum 2 characters and maximum 30 characters)
    if (nameValue.length < 2 || nameValue.length > 30) {
      setNameErrors("Имя должно содержать от 2 до 30 символов");
      setIsButtonDisabled(true);
    } else {
      setNameErrors("");
      setIsButtonDisabled(
        nameValue.trim() === "" || email.trim() === "" || password.trim() === ""
      );
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Валидация email
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(emailValue)) {
      setEmailErrors("Некорректный формат email");
      setIsButtonDisabled(true);
    } else {
      setEmailErrors("");
      setIsButtonDisabled(
        emailValue.trim() === "" || password.trim() === "" || name.trim() === ""
      );
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setpassword(passwordValue);

    // Валидация пароля (пример: минимум 6 символов)
    if (passwordValue.length < 6) {
      setPasswordErrors("Пароль должен содержать минимум 6 символов");
      setIsButtonDisabled(true);
    } else {
      setPasswordErrors("");
      setIsButtonDisabled(
        email.trim() === "" || passwordValue.trim() === "" || name.trim() === ""
      );
    }
  };

  return (
    <div className="register">
      <Link to="/" className="register__logo">
        <img src={logo} alt="Логотип"></img>
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__inputs-block">
          <label className="register__label">
            <span className="register__text-lable">Имя</span>
            <input
              className="register__input"
              type="text"
              name="name"
              placeholder="Введите имя"
              value={name}
              required
              onChange={handleNameChange}
            ></input>
            <span className="register__text-lable register__error-lable">
              {nameErrors}
            </span>
          </label>
          <label className="register__label">
            <span className="register__text-lable">E-mail</span>
            <input
              className="register__input"
              type="email"
              name="email"
              placeholder="Введите почту"
              value={email}
              required
              onChange={handleEmailChange}
            ></input>
            <span className="register__text-lable register__error-lable">
              {emailErrors}
            </span>
          </label>
          <label className="register__label">
            <span className="register__text-lable">Пароль</span>
            <input
              className="register__input"
              type="password"
              name="password"
              placeholder="Введите пароль"
              required
              value={password}
              onChange={handlePasswordChange}
            ></input>
            <span className="register__text-lable register__error-lable">
              {passwordErrors}
            </span>
          </label>
        </div>
        <button
          className={`register__button ${
            isButtonDisabled ? "register__button_disabled" : ""
          }`}
          type="submit"
          disabled={isButtonDisabled}
        >
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
  );
};

export default Register;
