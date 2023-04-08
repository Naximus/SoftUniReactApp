import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.scss";


import { BASE_URL } from "../../api/config";
import { localStorageTokenName } from "../../config";
import jwt_decode from "jwt-decode";

import iconUser from "../../assets/icons/icon_user.svg";
import iconLock from "../../assets/icons/icon_lock.svg";
import iconView from "../../assets/icons/icon_view.svg";
import alfaLogo from "../../assets/icons/alfa_logo.svg";

const Login = ({ user, onLogin }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(undefined);
  const [showError, setShowError] = useState(false);
//   const navigate = useNavigate();

  const inputUsernameOrEmailOnChangeHandler = (e) => {
    if (e.target.value === "") {
      setError("Email и паролата са задължителени полета");
      setIsValid(false);
      setTimeout(() => {
        setShowError(false);
        setError(undefined)
      }, 3000);
    } else {
      setUsernameOrEmail(e.target.value);
      setIsValid(true);
    }
  };

  const inputPasswordOnChangeHandler = (e) => {
    if (e.target.value === "") {
      setError("Email и паролата са задължителени полета");
      setIsValid(false);
      setTimeout(() => {
        setShowError(false);
        setError(undefined)
      }, 3000);
    } else {
      setPassword(e.target.value);
      setIsValid(true);
    }

   
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isValid) {
      // TODO make post request

      const result = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ usernameOrEmail, password }),
      })
        .then( async (response) => {
          const res = await response.json();
          if (!response.ok) {
            const err = res.error
            throw new Error(err);
          }
          else return res;
        })
        .then((result) => {
          localStorage.setItem(localStorageTokenName, result);
          const decodedToken = jwt_decode(result);
          onLogin(result, decodedToken);
        })
        .catch((error) => {
          setError(error.message);
          setShowError(true);

          setTimeout(() => {
            setShowError(false);
            setError(undefined)
          }, 3000);

        });
    } else {
      // Hide error after 3 seconds
      setTimeout(() => {
        setShowError(false);
        setError(undefined)
      }, 3000);
    }
  };

  return (
    <main className="login mobile-pages">
      <div className="login-form main-box">
        <img className="login-form-alfa-logo" src={alfaLogo} />
        {error ? <div className="error">{error}</div> : null}
        <div className="input-box">
          <label htmlFor="username-email" className="input-box-title">
            Име или имейл
          </label>
          <div className="input-holder">
            <img className="login-form-icons" src={iconUser} />
            <input
              type="text"
              name="username-email"
              placeholder="Username@gmail.com"
              onChange={inputUsernameOrEmailOnChangeHandler}
            />
          </div>
        </div>
        <div className="input-box">
          <label htmlFor="password" className="input-box-title">
            Парола
          </label>
          <div className="input-holder">
            <img className="login-form-icons" src={iconLock} />
            <input
              className="pas"
              type="password"
              name="password"
              placeholder="············"
              onChange={inputPasswordOnChangeHandler}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn-only-text-outline-small"
          onClick={onSubmitHandler}
        >
          Вход
        </button>
      </div>
    </main>
  );
};

export default Login;
