import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

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
//   const navigate = useNavigate();

  const inputUsernameOrEmailOnChangeHandler = (e) => {
    setUsernameOrEmail(e.target.value);
    setIsValid(true); // TODO add validation
  };

  const inputPasswordOnChangeHandler = (e) => {
    setPassword(e.target.value);
    setIsValid(true); // TODO add validation
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
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then((result) => {
          localStorage.setItem(localStorageTokenName, result);
          console.log("result : ", result);
          const decodedToken = jwt_decode(result);
          onLogin(result, decodedToken);
        })
        .catch((error) => {
            console.log('error: ' + error);
          setError("User could not be authenticated");
        });
    }
  };

  return (
    <main className="login mobile-pages">
      {error ? <div className="error">{error}</div> : null}
      <div className="login-form main-box">
        <img className="login-form-alfa-logo" src={alfaLogo} />
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
