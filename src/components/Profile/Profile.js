import { Link } from "react-router-dom";
import React, { useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

import "./Profile.css";

const Profile = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { currentUser } = React.useContext(CurrentUserContext);
  console.log(currentUser);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);


  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // здесь будет логика сохранения данных пользователя
    props.onUpdateUser({ name, email});
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
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
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
          <Link to="/signin" className="profile__link" onClick={props.logOut}>
            Выйти из аккаунта
          </Link>{" "}
        </div>
      </div>
    </>
  );
};

export default Profile;
