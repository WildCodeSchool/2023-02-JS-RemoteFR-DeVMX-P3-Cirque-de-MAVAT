import { useState } from "react";

export default function Filter() {
  const [categories] = useState([
    { category: "Usine" },
    { category: "Travailleurs" },
    { category: "Lieux" },
    { category: "Animaux" },
  ]);
  const [techniques] = useState([
    { technique: "Aquarelle" },
    { technique: "Dessins" },
    { technique: "Dessins a la mine de plomb" },
  ]);

  return (
    <aside className="filter">
      <div className="hexagon-part">
        <div className="hexagon-shape" />
      </div>

      <nav className="filter-menus-container">
        <details>
          <summary>Catégories</summary>
          <p>
            <input type="checkbox" />
            {categories[0].category}
          </p>
          <p>
            <input type="checkbox" />
            {categories[1].category}
          </p>
          <p>
            <input type="checkbox" />
            {categories[2].category}
          </p>
          <p>
            <input type="checkbox" />
            {categories[3].category}
          </p>
        </details>
        <details>
          <summary>Techniques</summary>
          <p>
            <input type="checkbox" />
            {techniques[0].technique}
          </p>
          <p>
            <input type="checkbox" />
            {techniques[1].technique}
          </p>
          <p>
            <input type="checkbox" />
            {techniques[2].technique}
          </p>
        </details>
        <details>
          <summary>Favoris</summary>
        </details>
      </nav>
    </aside>
  );
}
