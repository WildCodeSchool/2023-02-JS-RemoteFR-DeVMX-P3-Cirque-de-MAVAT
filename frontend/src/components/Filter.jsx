import axios from "axios";
import { useState, useEffect } from "react";

export default function Filter() {
  const [categories, setCategories] = useState([]);
  const [techniques, setTechniques] = useState([]);
  // const [favourites, setFavourites] = useState([]);

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

  return (
    <aside className="filter">
      <div className="hexagon-part">
        <div className="hexagon-shape" />
      </div>

      <nav className="filter-menus-container">
        <details>
          {categories.length && (
            <>
              <summary>Catégories</summary>
              <div className="category">
                {categories.slice(0, categories.length).map((cat) => (
                  <div className="subcategory" key={cat.id}>
                    <input type="checkbox" />
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
