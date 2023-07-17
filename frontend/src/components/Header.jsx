/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUser";

import logo from "../assets/logo-afac.svg";
import account from "../assets/icon-account.svg";
import disconnect from "../assets/icon-disconnect.svg";

import diamant from "../assets/bouton1.svg";

export default function Header() {
  const location = useLocation();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const hasCurrentUser = !!Object.keys(currentUser).length;
  const logout = () => {
    setCurrentUser({});
  };
  const [showNavbar, setShowNavbar] = useState(false);

  const closeNavbar = () => {
    setShowNavbar(false);
  };

  return (
    <header className={`header ${showNavbar ? "show" : ""}`}>
      <div className="top-header">
        {hasCurrentUser && currentUser.username && (
          <p className="hello">Bonjour, {currentUser.username}</p>
        )}
      </div>
      <div className="bottom-header">
        <NavLink to="/" className="logo-container" onClick={closeNavbar}>
          <img src={logo} alt="logo AFAC 974" className="img-logo" />
        </NavLink>

        <nav className="bottom-container">
          <ul>
            <li>
              <NavLink
                to="/gallery"
                className={
                  location === "/gallery" ? "navlink active" : "navlink"
                }
                onClick={closeNavbar}
              >
                <img
                  src={diamant}
                  alt="diamant"
                  className="diamant"
                  style={{ pointerEvents: "none" }}
                />
                Galerie
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/author"
                className={
                  location === "/author" ? "navlink active" : "navlink"
                }
                onClick={closeNavbar}
              >
                <img
                  src={diamant}
                  alt="diamant"
                  className="diamant"
                  style={{ pointerEvents: "none" }}
                />
                Auteur
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={location === "/about" ? "navlink active" : "navlink"}
                onClick={closeNavbar}
              >
                <img
                  src={diamant}
                  alt="diamant"
                  className="diamant"
                  style={{ pointerEvents: "none" }}
                />
                À propos
              </NavLink>
            </li>
            {showNavbar && (
              <>
                <li>
                  <NavLink
                    to="/account"
                    className={
                      location === "/account" ? "navlink active" : "navlink"
                    }
                    onClick={closeNavbar}
                  >
                    Mon compte
                  </NavLink>
                </li>
                <li>
                  {hasCurrentUser && (
                    <button type="button" onClick={logout}>
                      Déconnexion
                    </button>
                  )}
                </li>
              </>
            )}
          </ul>
        </nav>
        <nav className="icon-nav">
          <div className="icon-container">
            <Link to="/account">
              <figure>
                <img
                  src={account}
                  alt="account icon"
                  className="icon-account"
                />
                <figcaption>Compte</figcaption>
              </figure>
            </Link>
            {hasCurrentUser && (
              <button type="button" onClick={logout}>
                <figure>
                  <img
                    src={disconnect}
                    alt="disconnect icon"
                    className="icon-disconnect"
                  />
                  <figcaption>Déconnexion</figcaption>
                </figure>
              </button>
            )}
          </div>
          <div className="burger" onClick={() => setShowNavbar(!showNavbar)}>
            <div className={`line ${showNavbar ? "line1" : ""}`} />
            <div className={`line ${showNavbar ? "line2" : ""}`} />
            <div className={`line ${showNavbar ? "line3" : ""}`} />
          </div>
        </nav>
      </div>
    </header>
  );
}
