import React from "react";
import "./Header.scss";

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
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/">dashboard</a>
              </li>
              {
                userType === "admin"
                ? 
                  <>
                    <li>
                      <a href="/create-manager">add manager</a>
                    </li>
                    <li>
                      <a href="/create-trainer">add trainer</a>
                    </li>
                    <li>
                      <a href="/managers">managers</a>
                    </li>
                    <li>
                      <a href="/trainers">trainers</a>
                    </li>
                  </>
                  : null
              }
              {
                userType === "manager"
                ? 
                  <>
                    <li>
                      <a href="/create-trainer">add trainer</a>
                    </li>
                    <li>
                      <a href="/trainers">trainers</a>
                    </li>
                    <li>
                      <a href="/manager">Manager Dashboard</a>
                    </li>
                    <li>
                      <a href="/create-client">add client</a>
                    </li>
                    <li>
                      <a href="/clients">clients</a>
                    </li>
                  </>
                  : null
              }
              <li>
                <a href="/create-client">add client</a>
              </li>
              <li>
                <a href="/clients">clients</a>
              </li>
              <li>
                <a href="/logout">logout</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
