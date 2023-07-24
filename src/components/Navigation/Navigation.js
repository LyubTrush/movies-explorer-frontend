import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";

import "./Navigation.css";
import NavPopup from "../NavPopup/NavPopup";

const Navigation = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBurgerClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleProfileClick = () => {
    navigate('/profile', { replace: true });
  };

  return (
    <>
      <nav className="navigation">
        <ul className="navigation__list">
          <li>
          <Link
              className={`navigation__link ${
                location.pathname === "/movies" ? "navigation__link-page" : ""
              } ${
                location.pathname === "/" ? "navigation__link-main" : ""
              }`}
              to="/movies"
            >
              Фильмы
            </Link>
          </li>
          <li>
          <Link
              className={`navigation__link ${
                location.pathname === "/saved-movies" ? "navigation__link-page" : ""
              }${
                location.pathname === "/" ? "navigation__link-main" : ""
              }`}
              to="/saved-movies"
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <div className="navigation__account-link" >
          <button className="navigation__account-btn" onClick={handleProfileClick}>
            <span className="navigation__account-text">Аккаунт</span>
            <span className="navigation__account-icon" />
          </button>
        </div>
      </nav>

      <NavPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      <button
        className="burger"
        onClick={handleBurgerClick}
      ></button>

    </>
  );
};

export default Navigation;
