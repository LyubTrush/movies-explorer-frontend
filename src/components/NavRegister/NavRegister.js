import React from "react";
import { Link } from "react-router-dom";

import "./NavRegister.css";

const NavReister = () => {
  return (
    <nav className="nav-register">
      <ul className="nav-register__list">
        <li>
          <Link to="/signup" className="nav-register__link">
            Регистрация
          </Link>
        </li>

        <li>
          <Link to="/signin" className="nav-register__link">
            <button className="nav-register__button">Войти</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavReister;
