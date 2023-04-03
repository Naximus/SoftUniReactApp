import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = ({ userType }) => {
  console.log(userType);
  const isAuth = userType !== "guest";

  return (
    <header
      className={`app-header app-header--${userType}`}
    >
      <nav>
        <ul>
          {userType === "guest" ? (
            <>
              <li>
                <Link to="/">Начало</Link>
              </li>
              <li>
                <Link to="/login">Вход</Link>
              </li>
              <li>
                <Link to="/register">Регистрация</Link>
              </li>
            </>
          ) : (
            <>
              {
                userType === "admin"
                ? 
                  <>
                    <li>
                      <Link to="/create-manager">add manager</Link>
                    </li>
                    <li>
                      <Link to="/create-trainer">add trainer</Link>
                    </li>
                    <li>
                      <Link to="/create-client">add client</Link>
                    </li>
                    <li>
                      <Link to="/managers">managers</Link>
                    </li>
                    <li>
                      <Link to="/trainers">trainers</Link>
                    </li>
                    <li>
                      <Link to="/clients">clients</Link>
                    </li>
                  </>
                  : null
              }
              {
                userType === "manager"
                ? 
                  <>
                    <li>
                      <Link to="/create-trainer">add trainer</Link>
                    </li>
                    <li>
                      <Link to="/trainers">trainers</Link>
                    </li>
                    <li>
                      <Link to="/manager">Manager Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/create-client">add client</Link>
                    </li>
                    <li>
                      <Link to="/clients">clients</Link>
                    </li>
                  </>
                  : null
              }
              {
                userType === "trainer"
                ? 
                  <>
                    <li>
                      <Link to="/trainer">Manager Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/create-client">add client</Link>
                    </li>
                    <li>
                      <Link to="/clients">clients</Link>
                    </li>
                  </>
                  : null
              }
              <li>
                <Link to="/">Начало</Link>
              </li>
              <li>
                <Link to="/client">My profile</Link>
              </li>
              <li>
                <Link to="/trainers-for-clients">trainers</Link>
              </li>
              <li>
                <Link to="/logout">logout</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
