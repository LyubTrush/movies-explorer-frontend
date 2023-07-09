import "./NavTab.css";

const NavTab = () => {
  return (
    <section class="navtab">
      <ul className="navtab__list">
        <li >
          <a className="navtab__link" href="#project">
            О проекте
          </a>
        </li>
        <li>
          <a className="navtab__link" href="#techs">
            Технологии
          </a>
        </li>
        <li>
          <a className="navtab__link" href="#me">
            Студент
          </a>
        </li>
      </ul>
    </section>
  );
};
export default NavTab;
