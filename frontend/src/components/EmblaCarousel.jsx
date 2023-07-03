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
  const {
    options,
    selectedCategories,
    selectedTechniques,
    selectedFavourites,
  } = props;
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

  const filteredWorks = works.filter((work) => {
    const categoryMatches =
      !selectedCategories.length ||
      selectedCategories.includes(work.category_id);
    const techniqueMatches =
      !selectedTechniques.length ||
      selectedTechniques.includes(work.technique_id);
    return (
      categoryMatches &&
      techniqueMatches &&
      (!selectedFavourites || favourites.has(work.id))
    );
  });

  return (
    <div className="embla">
      {filteredWorks.length > 0 && (
        <>
          <div className="embla__viewport" ref={emblaMainRef}>
            <div className="embla__container">
              {filteredWorks.map((work) => (
                <div className="embla__slide" key={work.id}>
                  <img
                    className="embla__slide__img"
                    src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                      work.src
                    }`}
                    alt={work.description}
                  />
                  <div className="embla__slide__text">
                    <h1>{work.title}</h1>
                    {Object.keys(currentUser).length ? (
                      <div
                        className={
                          favourites.has(work.id)
                            ? "favourite isLiked"
                            : "favourite"
                        }
                        onClick={handleClickLiked}
                        data-work={work.id}
                      />
                    ) : null}

                    <h2>
                      <Link to="/author" className="embla_author">
                        {work.firstname} {work.lastname}
                      </Link>
                    </h2>
                    <h3>Référence image ADR : {work.reference}</h3>
                    <h3>Technique : {work.technique}</h3>
                    {work.sizes && <h3>Dimension : {work.sizes} cm</h3>}
                    <h3>Année de réalisation : {work.created}</h3>
                    <h3>Lieu de conservation : {work.location}</h3>
                    <p>{work.story}</p>
                    {work.external && (
                      <span>
                        Article lié :{" "}
                        <a href={work.external}>{work.external}</a>
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
                {filteredWorks.map((work, index) => (
                  <Thumb
                    onClick={() => onThumbClick(index)}
                    selected={index === selectedIndex}
                    index={index}
                    imgSrc={`${
                      import.meta.env.VITE_BACKEND_URL
                    }/assets/images/${work.src}`}
                    key={work.id}
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
  options: PropTypes.objectOf(PropTypes.string).isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedTechniques: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedFavourites: PropTypes.bool.isRequired,
};
