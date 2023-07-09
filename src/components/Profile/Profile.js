import { Link } from "react-router-dom";
import React, { useState } from "react";

import "./Profile.css";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("Виталий");
  const [email, setEmail] = useState("pochta@yandex.ru");

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // здесь будет логика сохранения данных пользователя
    setEditMode(false);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div className="profile">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__inputs-block">
            <div className="profile__input-block">
              <p className="profile__text-lable">Имя</p>
              <input
                className="profile__input"
                type="text"
                name="name"
                value={name}
                placeholder="Введите имя"
                onChange={handleChangeName}
                disabled={!editMode} // Делаем инпут неактивным, если editMode: false
              ></input>
            </div>

            <div className="profile__input-block profile__input-email">
              <p className="profile__text-lable">E-mail</p>
              <input
                className="profile__input"
                type="email"
                name="email"
                value={email}
                placeholder="Введите почту"
                onChange={handleChangeEmail}
                disabled={!editMode} // Делаем инпут неактивным, если editMode: false
              ></input>
            </div>
          </div>
          {editMode && (
            <button className="profile__button" type="submit">
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
          <Link to="/signin" className="profile__link">
            Выйти из аккаунта
          </Link>{" "}
        </div>
      </div>
    </>
  );
};

export default Profile;
