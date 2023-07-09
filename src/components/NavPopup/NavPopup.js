import { Link } from "react-router-dom";

import "./NavPopup.css";

const NavPopup = (props) => {
  const handleLinkClick = () => {
    props.onClose(); // Закрываем попап при клике на ссылку
  };
  return (
    <nav className={`nav-popup${props.isOpen ? " nav-popup_opened" : ""}`}>
      <button
        type="button"
        className="nav-popup__btn-close"
        onClick={props.onClose}
      ></button>
      <div className="nav-popup__block">
        <ul className="nav-popup__list">
          <li className="nav-popup__link">
            <Link className="nav-popup__link" to="/" onClick={handleLinkClick}>
              Главная
            </Link>
          </li>
          <li className="nav-popup__link">
            <Link
              className="nav-popup__link"
              to="/movies"
              onClick={handleLinkClick}
            >
              Фильмы
            </Link>
          </li>
          <li className="nav-popup__link">
            <Link
              className="nav-popup__link"
              to="/saved-movies"
              onClick={handleLinkClick}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link
          className="nav-popup__account-link"
          to="/profile"
          onClick={handleLinkClick}
        >
          <button className="nav-popup__account-btn">
            <p className="navigation__account-text">Аккаунт</p>
            <div className="navigation__account-icon" />
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavPopup;
