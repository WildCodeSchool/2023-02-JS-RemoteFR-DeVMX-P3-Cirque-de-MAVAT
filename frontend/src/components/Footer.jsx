import logoAfac974 from "../assets/logo-afac.svg";
import logoIhoi from "../assets/logo-ihoi.svg";
import logoObjetTemoin from "../assets/logo-objet-temoin.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
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
            <p>Mentions légales</p>
            <p>Crédits</p>
            <p>Contact</p>
          </div>
        </div>
      </div>
      <div className="footer-right">
        <p>Nos Partenaires</p>
        <div className="logo-ihoi">
          <a href="https://ihoi.org/app/photopro.sk/ihoi_icono/?">
            <img src={logoIhoi} alt="logo IHOI" />
          </a>
        </div>
        <div className="logo-objet-temoin">
          <a href="https://museo.vandanjon.com/index.php/en/">
            <img src={logoObjetTemoin} alt="logo Objet Témoin" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
