import { useState } from "react";
import Filter from "../components/Filter";
import EmblaCarousel from "../components/EmblaCarousel";

export default function Gallery() {
  const OPTIONS = {};
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTechniques, setSelectedTechniques] = useState([]);

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };
  const handleTechniqueChange = (techniques) => {
    setSelectedTechniques(techniques);
  };

  return (
    <div className="gallery_page">
      <Filter
        onCategoryChange={handleCategoryChange}
        onTechniqueChange={handleTechniqueChange}
      />
      <EmblaCarousel
        options={OPTIONS}
        selectedCategories={selectedCategories}
        selectedTechniques={selectedTechniques}
      />
    </div>
  );
}
