import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Filter({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [techniques, setTechniques] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (e, categoryId) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
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
  }, [selectedCategories, onCategoryChange]);

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
          {categories.length && (
            <>
              <summary>Techniques</summary>
              <div className="technique">
                {techniques.slice(0, techniques.length).map((tech) => (
                  <div className="subsubtechnique" key={tech.id}>
                    <input type="checkbox" />
                    <span>{tech.technique}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </details>
      </nav>
    </aside>
  );
}

Filter.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};
