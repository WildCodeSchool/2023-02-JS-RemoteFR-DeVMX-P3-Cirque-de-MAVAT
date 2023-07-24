import { Link } from "react-router-dom";
import logoAfac974 from "../assets/logo-afac.svg";
import logoIhoi from "../assets/logo-ihoi.svg";
import logoObjetTemoin from "../assets/logo-objet-temoin.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-afac-main">
        <div className="footer-afac">
          <div className="logo-afac974">
            <a href="https://capeline974.re/CAPELINE/CARTOTHEQUE/capeline-accueil.html">
              <img src={logoAfac974} alt="logo AFAC 974" />
            </a>
          </div>
          <div className="afac-infos">
            <p>Association des Familles et Amis de CAPELINE</p>
            <p>Rue Albert Frejaville, Le Tampon 97430</p>
            <p>La Réunion</p>
            <p>Tel : +262 692 85 18 42</p>
            <div className="footer-links">
              <p>
                <Link className="link-color" to="/mention">
                  Mentions légales
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="footer-partners">
          <h1>Nos Partenaires</h1>
          <div className="logo-ihoi">
            <a
              href="https://ihoi.org/app/photopro.sk/ihoi_icono/?"
              target="_blank"
              rel="noreferrer"
            >
              <img src={logoIhoi} alt="logo IHOI" />
            </a>
          </div>
          <div className="logo-objet-temoin">
            <a
              href="https://museo.vandanjon.com/index.php/en/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={logoObjetTemoin} alt="logo Objet Témoin" />
            </a>
          </div>
        </div>
      </div>
      <div className="lien-dev">
        <p>©2023 AFAC974 - Tous droits réservés</p>
        <p>
          <span className="developped">Développé avec ♥ par </span>

          <a
            href="https://www.linkedin.com/in/anne-louis-3326b826b/"
            className="linkedin"
          >
            Anne.L,
          </a>
          <a
            href="https://www.linkedin.com/in/anthony-lasternas-208379269/"
            className="linkedin"
          >
            Anthony.L,
          </a>
          <a
            href="https://www.linkedin.com/in/marine-deveza-959b48279/"
            className="linkedin"
          >
            Marine.D,
          </a>
          <a
            href="https://www.linkedin.com/in/trung-nguyen-4a5229268/"
            className="linkedin"
          >
            Trung.N,
          </a>
          <a
            href="https://www.linkedin.com/in/victor-brito-69040a191/"
            className="linkedin"
          >
            Victor.B
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
