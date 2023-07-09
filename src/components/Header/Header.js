import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import NavReister from "../NavRegister/NavRegister";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname !== "/" ? "" : "header_movies"}`}>
      <div className="header__logo">
        <Link to="/" className="header__logo">
          <img src={logo} alt="Логотип"></img>
        </Link>
      </div>
      {pathname !== "/" ? <Navigation /> : <NavReister />}
    </header>
  );
};

export default Header;
