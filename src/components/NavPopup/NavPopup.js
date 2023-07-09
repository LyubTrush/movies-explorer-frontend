import { Link, useNavigate } from "react-router-dom";

import "./NavPopup.css";

const NavPopup = (props) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    props.onClose(); // Закрываем попап при клике на ссылку
    navigate('/profile', { replace: true });
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
          <li>
            <Link className="nav-popup__link" to="/" onClick={handleLinkClick}>
              Главная
            </Link>
          </li>
          <li>
            <Link
              className="nav-popup__link"
              to="/movies"
              onClick={handleLinkClick}
            >
              Фильмы
            </Link>
          </li>
          <li>
            <Link
              className="nav-popup__link"
              to="/saved-movies"
              onClick={handleLinkClick}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <div className="nav-popup__account-link">
          <button className="nav-popup__account-btn"  onClick={handleLinkClick}>
            <span className="nav-popup__account-text">Аккаунт</span>
            <span className="nav-popup__account-icon" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavPopup;
