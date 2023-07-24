/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";
import Imagejourneepatrimoine from "../assets/imagejourneepatrimoine.png";
import Artgallery from "../assets/artgallery.jpg";
import Imageauthor from "../assets/imageauthor.jpg";
import Projetafac from "../assets/projetafac.png";

function Slides() {
  const slidePictures = [
    {
      picture: (
        <figure>
          <img
            className="imgslide"
            src={Imagejourneepatrimoine}
            alt=""
            width="1000"
            height="310"
          />
          <figcaption>À découvrir</figcaption>
        </figure>
      ),
    },
    {
      picture: (
        <figure>
          <img
            className="imgslide"
            src={Artgallery}
            alt=""
            width="1000"
            height="310"
          />
          <figcaption>
            Galerie&nbsp;: Laissez-vous séduire par nos œuvres d’art
          </figcaption>
        </figure>
      ),
    },
    {
      picture: (
        <figure>
          <img
            className="imgslide"
            src={Imageauthor}
            alt=""
            width="1000"
            height="310"
          />
          <figcaption>
            Exposition&nbsp;: Hippolyte Charles Napoléon Mortier, duc de Trévise{" "}
            <em>(œuvres, aquarelles et dessins)</em>
          </figcaption>
        </figure>
      ),
    },
    {
      picture: (
        <figure>
          <img
            className="imgslide"
            src={Projetafac}
            alt=""
            width="1000"
            height="310"
          />
          <figcaption>Actualité&nbsp;: projets 2023</figcaption>
        </figure>
      ),
    },
  ];

  const delay = 5000;

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
          <div
            className="slide"
            key={index}
            onContextMenu={(e) => e.preventDefault()}
          >
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
