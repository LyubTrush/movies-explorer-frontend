import { Link } from "react-router-dom";
import React, { useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ToolTip from "../ToolTip/ToolTip";
import yes from "../../images/yes.png";

import "./Profile.css";

const Profile = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameErrors, setNameErrors] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [registerMessage, setRegisterMessage] = useState(null);
  const [popupImage, setPopupImage] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [originalName, setOriginalName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");

  const { currentUser } = React.useContext(CurrentUserContext);

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(localStorage.getItem("name") || currentUser.name);
    setEmail(localStorage.getItem("email") || currentUser.email);
    setOriginalName(currentUser.name);
    setOriginalEmail(currentUser.email);
  }, [currentUser]);

  const handleEdit = () => {
    setEditMode(true);
    setIsButtonDisabled(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // здесь будет логика сохранения данных пользователя
    if (isDataChanged) {
      // Выполняем отправку запроса на сохранение только если данные изменены
      props.onUpdateUser({ name, email });
      setEditMode(false);
      setPopupImage(yes);
      setRegisterMessage("Данные изменены!");
      handleInfoTooltip();
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const handleChangeName = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);

    // Check if data is changed
    const isNameChanged = nameValue !== (localStorage.getItem("name") || originalName);
    setIsDataChanged(isNameChanged);

    // Name validation (example: minimum 2 characters and maximum 30 characters)
    if (nameValue.length < 2 || nameValue.length > 30) {
      setNameErrors("Имя должно содержать от 2 до 30 символов");
      setIsButtonDisabled(true);
    } else {
      setNameErrors("");
      setIsButtonDisabled(!isNameChanged);
    }
  };

  const handleChangeEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Check if data is changed
    const isEmailChanged = emailValue !== (localStorage.getItem("email") || originalEmail);
    setIsDataChanged(isEmailChanged);

    // Валидация email
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(emailValue)) {
      setEmailErrors("Некорректный формат email");
      setIsButtonDisabled(true);
    } else {
      setEmailErrors("");
      setIsButtonDisabled(!isEmailChanged);
    }
  };
  return (
    <>
      <div className="profile">
        <h2 className="profile__title">Привет, {name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__inputs-block">
            <div className="profile__input-block">
              <p className="profile__text-lable">Имя</p>
              <lable className="profile__input">
                <input
                  className="profile__input"
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Введите имя"
                  onChange={handleChangeName}
                  disabled={!editMode} // Делаем инпут неактивным, если editMode: false
                ></input>
                <span className="profile__error-lable">{nameErrors}</span>
              </lable>
            </div>

            <div className="profile__input-block profile__input-email">
              <p className="profile__text-lable">E-mail</p>
              <label>
                <input
                  className="profile__input"
                  type="email"
                  name="email"
                  value={email || setEmail}
                  placeholder="Введите почту"
                  onChange={handleChangeEmail}
                  disabled={!editMode} // Делаем инпут неактивным, если editMode: false
                ></input>
                <span className="profile__error-lable">{emailErrors}</span>
              </label>
            </div>
          </div>
          {editMode && (
            <button
              className={`profile__button ${
                isButtonDisabled ? "profile__button_disabled" : ""
              }`}
              type="submit"
            >
              Сохранить
            </button>
          )}
        </form>
        <div className="profile__text-block">
          {!editMode && (
            <p className="profile__text" onClick={handleEdit}>
              Редактировать
            </p>
          )}
          <Link to="/" className="profile__link" onClick={props.logOut}>
            Выйти из аккаунта
          </Link>{" "}
        </div>
      </div>
      <ToolTip
        image={popupImage}
        title={registerMessage}
        isOpen={infoTooltip}
        onClose={() => {
          setInfoTooltip(false);
        }}
      />
    </>
  );
};

export default Profile;
