import "./Project.css";

const Project = () => {
  return (
    <section className="project" id="project">
      <div className="project__block">
        <h2 className="project__title">О проекте</h2>
      </div>

      <div className="project__info">
        <div className="project__info-block">
          <h3 className="project__info-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="project__info-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="project__info-block">
          <h3 className="project__info-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__info-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="project__time">
        <div className="project__time-block">
          <div className="project__time-conteiner project__time-title-green">
            <h4 className="project__time-title">1 неделя</h4>
          </div>
          <div className="project__time-conteiner project__time-title-grey">
            <h4 className="project__time-title">4 неделя</h4>
          </div>
          <div className="project__time-conteiner">
            <p className="project__time-text">Back-end</p>
          </div>
          <div className="project__time-conteiner">
            <p className="project__time-text">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Project;
