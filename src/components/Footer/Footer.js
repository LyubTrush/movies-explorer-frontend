import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__block">
        <p className="footer__date">&copy; 2023</p>
        <div className="footer__links">
          <ul className="footer__list">
            <li className="footer__item">
              <a className="footer__link" href="https://practicum.yandex.ru/">
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href="https://github.com/LyubTrush">
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
