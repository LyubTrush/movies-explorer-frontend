/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/Auth";
import ToolTip from "../ToolTip/ToolTip";
import yes from "../../images/yes.png";
import no from "../../images/no.png";
import { mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
// Компонент для защиты роутов

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerMessage, setRegisterMessage] = useState(null);
  const [popupImage, setPopupImage] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState("");
  const [error, setError] = React.useState(null);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  const clearLocalStorage = () => {
    localStorage.removeItem("likedMovies");
    localStorage.removeItem("searchResult");
    localStorage.removeItem("filmName");
    localStorage.removeItem("isShortFilms");
  };

  // проверка токена при инициализации
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkAuth(token)
        .then((response) => {
          setLoggedIn(true);
          navigate();
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  //эффект получения информации о пользователе
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then((userData) => {
          setIsLoading(false);
          setCurrentUser(userData);
        })
        .catch((err) => {
          setLoggedIn(false);
          setIsLoading(false);
          console.log(err);
        });
        console.log(savedMovies)
        mainApi
        .getMovies() // Запрос на сервер для получения сохраненных фильмов
        .then((data) => {
          // localStorage.setItem("likedMovies", JSON.stringify(data));
          setSavedMovies(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          setError(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
        });
    }
  }, [loggedIn]);

  // обработчик регистрации
  const handleSignup = React.useCallback(
    (data) => {
      auth
        .register(data)
        .then(() => {
          setPopupImage(yes);
          setRegisterMessage("Вы успешно зарегистрировались!");
          navigate("/movies");
          console.log(data);
          console.log(currentUser);
        })
        .catch(() => {
          setPopupImage(no);
          setRegisterMessage("Что-то пошло не так! Попробуйте ещё раз.");
        })
        .finally(handleInfoTooltip);
    },
    [navigate]
  );

  // обработчик авторизации
  const handleSignin = React.useCallback(
    (email, password) => {
      auth
        .signin(email, password)
        .then((response) => {
          if (response.token) {
            navigate("/movies");
            localStorage.setItem("jwt", response.token);
            setLoggedIn(true);
            navigate("/movies");
          }
        })
        .catch((err) => {
          console.log(err);
          setPopupImage(no);
          setRegisterMessage("Что-то пошло не так! Попробуйте ещё раз.");
          handleInfoTooltip();
        });
    },
    [navigate]
  );
  //обработчик редактирования профиля
  function handleUpdateUser(userData) {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .setProfileData(userData, jwt)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        console.log(newUserInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //обработчик кнопки выхода
  function handleLogOut() {
    localStorage.removeItem("jwt");
    navigate("/signin");
    setEmail("");
    setLoggedIn(false);
    clearLocalStorage();
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: currentUser,
        savedMovies: savedMovies,
        setSavedMovies: setSavedMovies,
      }}
    >
      <div className="app">
        {pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ||
        pathname === "/profile" ? (
          <Header loggedIn={loggedIn} />
        ) : (
          ""
        )}
        {isLoading && <Preloader />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/signup"
            element={
              <ProtectedRoute
                element={Register}
                onSubmit={handleSignup}
                loggedIn={!loggedIn}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute
                element={Login}
                onSubmit={handleSignin}
                loggedIn={!loggedIn}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                logOut={handleLogOut}
                onUpdateUser={handleUpdateUser}
              />
            }
          />{" "}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ? (
          <Footer loggedIn={loggedIn} />
        ) : (
          ""
        )}
        <ToolTip
          image={popupImage}
          title={registerMessage}
          isOpen={infoTooltip}
          onClose={() => {
            setInfoTooltip(false);
          }}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
