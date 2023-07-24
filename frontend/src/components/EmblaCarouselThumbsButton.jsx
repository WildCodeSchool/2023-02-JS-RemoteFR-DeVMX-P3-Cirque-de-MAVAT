import React from "react";
import PropTypes from "prop-types";

export default function Thumb(props) {
  const { selected, imgSrc, onClick } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        className="embla-thumbs__slide__button"
        type="button"
      >
        <img
          className="embla-thumbs__slide__img"
          src={imgSrc}
          alt="Your alt text"
          onContextMenu={(e) => e.preventDefault()}
        />
      </button>
    </div>
  );
}

Thumb.propTypes = {
  selected: PropTypes.bool.isRequired,
  imgSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
