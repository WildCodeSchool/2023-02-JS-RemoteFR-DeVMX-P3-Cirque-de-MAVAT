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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit
            laboriosam eligendi atque nesciunt aliquam ad beatae reiciendis
            possimus iste! Ipsa ad eum ipsum dignissimos, similique esse aperiam
            saepe.
          </p>
        </div>
      </div>
      <div className="about-partners">
        <h1>Les Partenaires</h1>
        <div className="about-objet-temoin">
          <div className="logo-objet-temoin-container">
            <h2>
              <img
                src={logoObjetTemoin}
                alt="Objet Témoin"
                className="img-logo-objet-temoin"
              />
            </h2>
          </div>
          <div className="about-info-objet-temoin">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              nihil atque officiis, facilis maxime ab laborum assumenda facere
              quia quo, repellat voluptas dicta temporibus nemo aperiam libero
              totam tempora!
            </p>
          </div>
        </div>
        <div className="about-ihoi">
          <div className="logo-ihoi-container">
            <h2>
              <div className="background-logo-ihoi">
                <img src={logoIHOI} alt="IHOI" className="img-logo-ihoi" />
              </div>
            </h2>
          </div>
          <div className="about-info-ihoi">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis,
              rerum. Nemo illo debitis numquam voluptatem recusandae officia, et
              nostrum ratione tenetur doloribus animi, unde quibusdam aperiam!
              laboriosam tenetur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
