import logoAfac from "../assets/logo-afac.svg";
import logoObjetTemoin from "../assets/logo-objet-temoin.svg";
import logoIHOI from "../assets/logo-ihoi.svg";

import "../styles.scss";

export default function About() {
  return (
    <div className="about">
      <h1>Qui sommes-nous?</h1>
      <div className="about-afac-974">
        <div className="logo-afac-container">
          <h2>
            <img src={logoAfac} alt="AFAC 974" className="img-logo-afac" />
          </h2>
        </div>
        <div className="about-info-afac">
          <p>
            Nous sommes une équipe de personnes qui travaillent dans un
            environnement <b>créatif</b> autour de la <b>pédagogie</b>, et du
            <b> lien entre générations</b>.
          </p>
          <p>
            Nous faisons des interventions à la demande auprès des
            collectivités, des établissements scolaires, des entreprises ou des
            associations :
          </p>
          <ul>
            <li>
              <span>2021</span> : PRE Caisse des Ecoles du Tampon, Lycée
              Ambroise Vollard <br />
            </li>
            <li>
              <span>2022</span> : Service addictologie, CHU Nord, Lycée Pierre
              Lagourgue, Amis de l'Université, Fondation Favron ...
            </li>
          </ul>
        </div>
      </div>
      <div className="about-partners">
        <h1>Les Partenaires</h1>
        <div className="about-objet-temoin">
          <div className="logo-objet-temoin-container">
            <h2>
              <a
                href="https://museo.vandanjon.com/index.php/en/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={logoObjetTemoin}
                  alt="Objet Témoin"
                  className="img-logo-objet-temoin"
                />
              </a>
            </h2>
          </div>
          <div className="about-info-objet-temoin">
            <p>
              Objet Témoin est un laboratoire d'étude, de production et de
              transmission du patrimoine à l'ère du numérique.
            </p>
            <p>
              Depuis deux décennies, nous explorons les opportunités créatives
              numériques pour la transmission culturelle, la pédagogie et la
              muséographie.
            </p>
            <p>
              De La Réunion à Bruxelles, avec des associations locales, des
              musées, des producteurs, des conservateurs de monuments
              historiques et des écoles publiques, nous fouillons dans le
              patrimoine physique et immatériel et, humblement, contribuons à
              fournir des boîtes à outils simples mais précises pour la science,
              l'éducation et la préservation.
            </p>
          </div>
        </div>
        <div className="about-ihoi">
          <div className="logo-ihoi-container">
            <h2>
              <div className="background-logo-ihoi">
                <a
                  href="https://ihoi.org/app/photopro.sk/ihoi_icono/?"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={logoIHOI} alt="IHOI" className="img-logo-ihoi" />
                </a>
              </div>
            </h2>
          </div>
          <div className="about-info-ihoi">
            <p>
              L'IHOI est une institution dédiée à la préservation et à la
              diffusion du patrimoine iconographique de l'océan Indien.
            </p>
            <p>
              Elle propose une riche collection d'images historiques, de
              photographies et de cartes anciennes, offrant un voyage visuel à
              travers l'histoire et la diversité culturelle de la région.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
