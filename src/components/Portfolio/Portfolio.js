import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section class="portfolio">
      <p class="portfolio__text">Портфолио</p>
      <ul class="portfolio__list">
        <li class="portfolio__item">
          <a
            class="portfolio__link"
            href="https://github.com/LyubTrush/how-to-learn"
            target="blank"
          >
            Статичный сайт
          </a>
        </li>
        <li class="portfolio__item">
          <a
            class="portfolio__link"
            href="https://github.com/LyubTrush/russian-travel"
            target="blank"
          >
            Адаптивный сайт
          </a>
        </li>
        <li class="portfolio__item">
          <a
            class="portfolio__link"
            href="https://github.com/LyubTrush/react-mesto-auth"
            target="blank"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
