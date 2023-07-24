import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import NavReister from "../NavRegister/NavRegister";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

const Header = (props) => {
  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname !== "/" ? "" : "header_movies"}`}>
        <Link to="/" className="header__logo">
          <img src={logo} alt="Логотип"></img>
        </Link>
        {props.loggedIn ? <Navigation /> : <NavReister />}
    </header>
  );
};

export default Header;
