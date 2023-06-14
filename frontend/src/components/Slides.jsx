/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";
import Imagejourneepatrimoine from "../assets/imagejourneepatrimoine.png";
import Imagefleur from "../assets/imagefleur.png";
import Imagearbrefleur from "../assets/imagearbrevache.jpg";
import Imagearbredessin from "../assets/imagearbredessin.jpg";

function Slides() {
  const slidePictures = [
    {
      picture: (
        <figure>
          <img
            className="imgslide"
            src={Imagejourneepatrimoine}
            alt=""
            width="640"
            height="310"
          />
          <figcaption>Journée du Patrimoine</figcaption>
        </figure>
      ),
    },
    {
      picture: (
        <figure>
          <img
            className="imgslide"
            src={Imagefleur}
            alt=""
            width="640"
            height="310"
          />
          <figcaption>Oeuvre aquarelle</figcaption>
        </figure>
      ),
    },
    {
      picture: (
        <figure>
          <img
            className="imgslide"
            src={Imagearbrefleur}
            alt=""
            width="640"
            height="310"
          />
          <figcaption>
            Oeuvre dessin<em>(Image arbre en fleur au crayon)</em>
          </figcaption>
        </figure>
      ),
    },
    {
      picture: (
        <figure>
          <img
            className="imgslide"
            src={Imagearbredessin}
            alt=""
            width="640"
            height="310"
          />
          <figcaption>Oeuvre Dessin</figcaption>
        </figure>
      ),
    },
  ];

  const delay = 2500;

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slidePictures.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {slidePictures.map((data, index) => (
          <div className="slide" key={index}>
            {" "}
            {data.picture}{" "}
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {slidePictures.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Slides;
