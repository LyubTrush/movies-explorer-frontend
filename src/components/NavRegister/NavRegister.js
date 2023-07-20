import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./NavRegister.css";


const NavReister = (props) => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin', { replace: true });
  };
  return (
    <nav className="nav-register">
      <ul className="nav-register__list">
        <li>
          <Link to="/signup" className="nav-register__link">
            Регистрация
          </Link>
        </li>

        <li>
          <div className="nav-register__link">
            <button className="nav-register__button" onClick={handleSignInClick}>Войти</button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavReister;
