import React from "react";

import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import Project from "../Project/Project";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import "./Main.css";

const Main = () => {
  return (
    <>
      <main className="main">
        <Promo />
        <NavTab />
        <Project />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
    </>
  );
};

export default Main;
