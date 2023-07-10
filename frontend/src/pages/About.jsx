import logoAfac from "../assets/logo-afac.svg";
import logoObjetTemoin from "../assets/logo-objet-temoin.svg";
import logoIHOI from "../assets/logo-ihoi.svg";

import "../styles.scss";

export default function About() {
  return (
    <div className="about">
      <h1>Qui sommes-nous?</h1>
      <div className="about-afac-974">
        <img src={logoAfac} alt="logo AFAC 974" className="img-logo-afac" />
        <div className="about-info-afac">
          <h2>AFAC 974</h2>
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
          <img
            src={logoObjetTemoin}
            alt="logo Objet Témoin"
            className="img-logo-objet-temoin"
          />
          <div className="about-info-objet-temoin">
            <h2>Objet Témoin ASBL</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              nihil atque officiis, facilis maxime ab laborum assumenda facere
              quia quo, repellat voluptas dicta temporibus nemo aperiam libero
              totam tempora!
            </p>
          </div>
        </div>
        <div className="about-ihoi">
          <div className="about-info-ihoi">
            <h2>IHOI</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis,
              rerum. Nemo illo debitis numquam voluptatem recusandae officia, et
              nostrum ratione tenetur doloribus animi, unde quibusdam aperiam!
              laboriosam tenetur.
            </p>
          </div>
          <div className="background-logo">
            <img src={logoIHOI} alt="logo IHOI" className="img-logo-ihoi" />
          </div>
        </div>
      </div>
    </div>
  );
}
