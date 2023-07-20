import React, { useCallback } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./../Register/Register.css";
import logo from "../../images/logo.svg";

const Login = (props) => {
  const { onSubmit } = props;
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formdata = { email, password };
      onSubmit(formdata);
    },
    [email, password, onSubmit]
  );

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
      setIsButtonDisabled(false);
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
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="register">
      <Link to="/" className="register__logo">
        <img src={logo} alt="Логотип"></img>
      </Link>
      <h2 className="register__title">Рады видеть!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__inputs-block">
          <label className="register__label">
            <span className="register__text-lable">E-mail</span>
            <input
              className="register__input"
              type="email"
              name="email"
              placeholder="Введите почту"
              required
              value={email}
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
          Войти
        </button>
      </form>
      <div className="register__text-block">
        <p className="register__text">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="register__link">
          Регистрация
        </Link>{" "}
      </div>
    </div>
  );
};

export default Login;
