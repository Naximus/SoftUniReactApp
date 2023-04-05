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
                      <Link to="/create-manager">Създай мениджър</Link>
                    </li>
                    <li>
                      <Link to="/create-trainer">Създай треньор</Link>
                    </li>
                    <li>
                      <Link to="/create-client">Създай клиент</Link>
                    </li>
                    <li>
                      <Link to="/managers">Мениджъри</Link>
                    </li>
                    <li>
                      <Link to="/trainers">Треньори</Link>
                    </li>
                    <li>
                      <Link to="/clients">Клиенти</Link>
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
                      <Link to="/trainer">Моя профил</Link>
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
                userType === "client" ?
                <>
                <li>
                  <Link to="/">Начало</Link>
                </li>
                <li>
                <Link to="/client">My profile</Link>
                </li>
                <li>
                <Link to="/trainers-for-clients">trainers</Link>
              </li>
                </>
                : null
              }
              <li>
                <Link to="/logout">Изход</Link>
              </li>
            </>
          )}
        </ul>
      </nav>


    </header>
  );
};

export default Header;
