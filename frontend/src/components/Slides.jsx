import Imagejourneepatrimoine from "../assets/imagejourneepatrimoine.png";
import Imagefleur from "../assets/imagefleur.png";
import Imagearbrefleur from "../assets/imagearbrevache.jpg";
import Imagearbredessin from "../assets/imagearbredessin.jpg";

function Slides() {
  return (
    <section id="slideshow">
      <div className="container">
        <div className="sliderprincipal" />
        <div className="slider">
          <figure>
            <img src={Imagejourneepatrimoine} alt="" width="640" height="310" />
            <figcaption>Journée du Patrimoine</figcaption>
          </figure>
          <figure>
            <img src={Imagefleur} alt="" width="640" height="310" />
            <figcaption>Oeuvre aquarelle</figcaption>
          </figure>
          <figure>
            <img src={Imagearbrefleur} alt="" width="640" height="310" />
            <figcaption>
              Oeuvre dessin<em>(Image arbre en fleur au crayon)</em> time
            </figcaption>
          </figure>
          <figure>
            <img src={Imagearbredessin} alt="" width="640" height="310" />
            <figcaption>Oeuvre Dessin</figcaption>
          </figure>
        </div>
      </div>
      <span id="timeline" />
    </section>
  );
}

export default Slides;
