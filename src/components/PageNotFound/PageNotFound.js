import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";


const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="not-found">
      <div className="not-found__block">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <p className="not-found__link" onClick={handleGoBack}>
        Назад
      </p>
    </div>
  );
};

export default PageNotFound;
