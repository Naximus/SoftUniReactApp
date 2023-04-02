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
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/">My profile</Link>
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
                    <li>
                      <a href="/clients">clients</a>
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
              {
                userType === "trainer"
                ? 
                  <>
                    <li>
                      <a href="/trainer">Manager Dashboard</a>
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
              {/* <li>
                <a href="/client">My profile</a>
              </li> */}
              <li>
                <a href="/trainers-for-clients">trainers</a>
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
