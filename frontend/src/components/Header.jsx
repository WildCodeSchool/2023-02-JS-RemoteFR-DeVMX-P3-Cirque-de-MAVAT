import { NavLink, useLocation } from "react-router-dom";

import logo from "../assets/logo-afac.svg";
import account from "../assets/icon-account.svg";
import disconnect from "../assets/icon-disconnect.svg";
import favorite from "../assets/icon-favorite.svg";

import diamant from "../assets/bouton1.svg";

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="top-header" />
      <div className="bottom-header">
        <NavLink to="/" className="logo-container">
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
              >
                <img src={diamant} alt="diamant" className="diamant" />
                Galerie
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/author"
                className={
                  location === "/author" ? "navlink active" : "navlink"
                }
              >
                <img src={diamant} alt="diamant" className="diamant" />
                Auteur
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={location === "/about" ? "navlink active" : "navlink"}
              >
                <img src={diamant} alt="diamant" className="diamant" />À propos
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="triangle" />
        <nav className="icon-nav">
          <figure>
            <img src={favorite} alt="favorite icon" className="icon-fav" />
            <figcaption>Favoris</figcaption>
          </figure>
          <figure>
            <img src={account} alt="account icon" className="icon-account" />
            <figcaption>Compte</figcaption>
          </figure>
          <figure>
            <img
              src={disconnect}
              alt="disconnect icon"
              className="icon-disconnect"
            />
            <figcaption>Déconnexion</figcaption>
          </figure>
        </nav>
      </div>
    </header>
  );
}