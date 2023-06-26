/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
import PropTypes from "prop-types";
import axios from "axios";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import CurrentUserContext from "../contexts/CurrentUser";
import Thumb from "./EmblaCarouselThumbsButton";

export default function EmblaCarousel(props) {
  const { slides, options } = props;
  const { currentUser } = useContext(CurrentUserContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [works, setWorks] = useState([]);
  const [favourites, setFavourites] = useState(new Map());
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const handleClickLiked = (e) => {
    const liked = favourites;
    const workId = Number.parseInt(e.target.dataset.work, 10);
    if (liked.has(workId) && e.target.classList.contains("isLiked")) {
      axios
        .delete(
          `${import.meta.env.VITE_BACKEND_URL}/favourites/${
            currentUser.id
          }/${workId}`
        )
        .then((res) => {
          if (res.data.affectedRows) liked.delete(workId);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/favourites`, {
          userId: currentUser.id,
          workId,
        })
        .then((res) => {
          if (res.data.affectedRows) liked.set(workId, true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setFavourites(liked);
  };

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
      .then((res) => setWorks(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(currentUser).length && currentUser.id) {
      const liked = new Map();
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/favourites/${currentUser.id}`)
        .then((res) => {
          res.data.forEach((row) => {
            liked.set(row.work_id, true);
          });
          setFavourites(liked);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [favourites]);

  return (
    <div className="embla">
      {works.length && (
        <>
          <div className="embla__viewport" ref={emblaMainRef}>
            <div className="embla__container">
              {slides.slice(0, works.length).map((index) => (
                <div className="embla__slide" key={index}>
                  <img
                    className="embla__slide__img"
                    src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                      works[index].src
                    }`}
                    alt={works[index].description}
                  />
                  <div className="embla__slide__text">
                    <h1>{works[index].title}</h1>
                    {Object.keys(currentUser).length ? (
                      <div
                        className={
                          favourites.has(works[index].id)
                            ? "favourite isLiked"
                            : "favourite"
                        }
                        onClick={handleClickLiked}
                        data-work={works[index].id}
                      />
                    ) : null}

                    <h2>
                      <Link to="/author" className="embla_author">
                        {works[index].firstname} {works[index].lastname}
                      </Link>
                    </h2>
                    <h3>Référence image ADR : {works[index].reference}</h3>
                    <h3>Technique : {works[index].technique}</h3>
                    {works[index].sizes && (
                      <h3>Dimension : {works[index].sizes} cm</h3>
                    )}
                    <h3>Année de réalisation : {works[index].created}</h3>
                    <h3>Lieu de conservation : {works[index].location}</h3>
                    <p>{works[index].story}</p>
                    {works[index].external && (
                      <span>
                        Article lié :{" "}
                        <a href={works[index].external}>
                          {works[index].external}
                        </a>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="embla-thumbs">
            <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
              <div className="embla-thumbs__container">
                {slides.slice(0, works.length).map((index) => (
                  <Thumb
                    onClick={() => onThumbClick(index)}
                    selected={index === selectedIndex}
                    index={index}
                    imgSrc={`${
                      import.meta.env.VITE_BACKEND_URL
                    }/assets/images/${works[index].src}`}
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
