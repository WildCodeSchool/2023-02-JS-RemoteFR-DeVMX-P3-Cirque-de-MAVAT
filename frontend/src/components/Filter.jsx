import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect, useContext } from "react";

import CurrentUserContext from "../contexts/CurrentUser";

export default function Filter({
  onCategoryChange,
  onTechniqueChange,
  onFavouriteChange,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const hasCurrentUser = !!Object.keys(currentUser).length;

  const [categories, setCategories] = useState([]);
  const [techniques, setTechniques] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTechniques, setSelectedTechniques] = useState([]);
  const [selectedFavourites, setSelectedFavourites] = useState(false);

  const handleCategoryChange = (e, categoryId) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };
  const handleTechniqueChange = (e, techniqueId) => {
    if (e.target.checked) {
      setSelectedTechniques([...selectedTechniques, techniqueId]);
    } else {
      setSelectedTechniques(
        selectedTechniques.filter((id) => id !== techniqueId)
      );
    }
  };
  const handleFavouritesChange = () => {
    setSelectedFavourites(!selectedFavourites);
    onFavouriteChange();
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/techniques`)
      .then((res) => setTechniques(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    onCategoryChange(selectedCategories);
    onTechniqueChange(selectedTechniques);
  }, [
    selectedCategories,
    onCategoryChange,
    selectedTechniques,
    onTechniqueChange,
  ]);

  return (
    <aside className="filter">
      <div className="hexagon-part">
        <div className="hexagon-shape" />
      </div>

      <nav className="filter-menus-container">
        <details>
          {categories.length > 0 && (
            <>
              <summary>Catégories</summary>
              <div className="category">
                {categories.map((cat) => (
                  <div className="subcategory" key={cat.id}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={(e) => handleCategoryChange(e, cat.id)}
                    />
                    <span>{cat.category}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </details>
        <details>
          {categories.length > 0 && (
            <>
              <summary>Techniques</summary>
              <div className="technique">
                {techniques.map((tech) => (
                  <div className="subsubtechnique" key={tech.id}>
                    <input
                      type="checkbox"
                      checked={selectedTechniques.includes(tech.id)}
                      onChange={(e) => handleTechniqueChange(e, tech.id)}
                    />
                    <span>{tech.technique}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </details>
        {hasCurrentUser && (
          <button
            type="button"
            className={`favourite-button${selectedFavourites ? " active" : ""}`}
            onClick={handleFavouritesChange}
          >
            Favoris
          </button>
        )}
      </nav>
    </aside>
  );
}

Filter.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  onTechniqueChange: PropTypes.func.isRequired,
  onFavouriteChange: PropTypes.func.isRequired,
};
