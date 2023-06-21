import PropTypes from "prop-types";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Thumb from "./EmblaCarouselThumbsButton";
import imageByIndex from "./ImageByIndex";

// import EmblaCarouselWork from "./EmblaCarouselWork";

export default function EmblaCarousel(props) {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [work, setWork] = useState([]);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/works`)
      .then((res) => setWork(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="embla">
      {work.length && (
        <>
          <div className="embla__viewport" ref={emblaMainRef}>
            <div className="embla__container">
              {slides.slice(0, work.length).map((index) => (
                <div className="embla__slide" key={index}>
                  <img
                    className="embla__slide__img"
                    src={imageByIndex(index)}
                    alt="Your alt text"
                  />
                  <div className="embla__slide__text">
                    <h1>{work[index].title}</h1>
                    <h2>{work[index].author_id}</h2>
                    <p>{work[index].story}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="embla-thumbs">
            <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
              <div className="embla-thumbs__container">
                {slides.slice(0, work.length).map((index) => (
                  <Thumb
                    onClick={() => onThumbClick(index)}
                    selected={index === selectedIndex}
                    index={index}
                    imgSrc={imageByIndex(index)}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

EmblaCarousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.number).isRequired,
  options: PropTypes.objectOf(PropTypes.string).isRequired,
};
