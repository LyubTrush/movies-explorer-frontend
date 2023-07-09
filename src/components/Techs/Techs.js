import "./Techs.css";

const Techs = () => {
  return (
    <section className="techs" id="techs">
      <div className="techs__title-block">
        <h2 className="techs__title">Технологии</h2>
      </div>
      <div className="techs__info">
        <h3 className="techs__info-title">7 технологий</h3>
        <p className="techs__info-text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <ul className="techs__list">
        <li className="techs__item">HTML</li>
        <li className="techs__item">CSS</li>
        <li className="techs__item">JS</li>
        <li className="techs__item">React</li>
        <li className="techs__item">Git</li>
        <li className="techs__item">Express.js</li>
        <li className="techs__item">mongoDB</li>
      </ul>
    </section>
  );
};

export default Techs;
