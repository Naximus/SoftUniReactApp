import { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import hamburger  from '../../../assets/icons/menu_white.png'
// import { ReactComponent as Brand } from '../../../assets/icons/menu_white.png'

const Header = ({ userType }) => {
  console.log(userType);
  const isAuth = userType !== "guest";


  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  
  return (
    <header
      className={`app-header app-header--${userType}`}
    >
      <nav className="navbar">
      <div className="menu-icon" onClick={handleShowNavbar}>
          <img src={hamburger} />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
        <ul onClick={handleShowNavbar}>
          {userType === "guest" ? (
            <>
              <li>
                <Link to="/">Начало</Link>
              </li>
              <li>
                <Link to="/login">Вход</Link>
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
                      <Link to="/manager">Моя профил</Link>
                    </li>
                    <li>
                      <Link to="/create-trainer">Създай треньор</Link>
                    </li>
                    <li>
                      <Link to="/trainers">Треньори</Link>
                    </li>
                    <li>
                      <Link to="/create-client">Създай клиент</Link>
                    </li>
                    <li>
                      <Link to="/clients">Клиент</Link>
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
                      <Link to="/create-client">Създай клиент</Link>
                    </li>
                    <li>
                      <Link to="/clients">Клиент</Link>
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
                <Link to="/client">Моя профил</Link>
                </li>
                <li>
                <Link to="/trainers-for-clients">Треньори</Link>
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
        </div>
      </nav>


    </header>
  );
};

export default Header;
