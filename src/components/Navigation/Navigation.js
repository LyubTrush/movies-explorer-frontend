import { Link } from "react-router-dom";
import React, { useState } from "react";

import "./Navigation.css";
import NavPopup from "../NavPopup/NavPopup";

const Navigation = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  return (
    <>
      <nav className="navigation">
        <ul className="navigation__list">
          <li className="navigation__link">
            <Link
              className="navigation__link navigation__link-film"
              to="/movies"
            >
              Фильмы
            </Link>
          </li>
          <li className="navigation__link">
            <Link className="navigation__link" to="/saved-movies">
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link className="navigation__account-link" to="/profile">
          <button className="navigation__account-btn">
            <p className="navigation__account-text">Аккаунт</p>
            <div className="navigation__account-icon" />
          </button>
        </Link>
      </nav>

      <NavPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      <button
        className="navigation__burger"
        onClick={handleBurgerClick}
      ></button>
    </>
  );
};

export default Navigation;
