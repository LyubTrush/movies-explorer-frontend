import "./AboutMe.css";
import avatar from "../../images/avatar.png";

const AboutMe = () => {
  return (
    <section className="about-me" id="me">
      <div className="about-me__block">
        <h2 className="about-me__block-title">Студент</h2>
      </div>
      <div className="about-me__info">
        <div>
          <h3 className="about-me__info-title">Любовь</h3>
          <h4 className="about-me__info-subtitle">
            Фронтенд-разработчик, 30 лет
          </h4>
          <p className="about-me__info-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about-me__info-link"
            href="https://github.com/LyubTrush"
            target="blank"
          >
            Github
          </a>
        </div>
        <img className="about-me__image" src={avatar} alt="фото Любовь" />
      </div>
    </section>
  );
};

export default AboutMe;
