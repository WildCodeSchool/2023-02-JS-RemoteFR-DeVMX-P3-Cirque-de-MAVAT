import { useState } from "react";
import Filter from "../components/Filter";
import EmblaCarousel from "../components/EmblaCarousel";

export default function Gallery() {
  const OPTIONS = {};
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTechniques, setSelectedTechniques] = useState([]);
  const [selectedFavourites, setSelectedFavourites] = useState(false);

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };
  const handleTechniqueChange = (techniques) => {
    setSelectedTechniques(techniques);
  };
  const handleFavouritesChange = () => {
    setSelectedFavourites(!selectedFavourites);
  };

  return (
    <div className="gallery_page">
      <Filter
        onCategoryChange={handleCategoryChange}
        onTechniqueChange={handleTechniqueChange}
        onFavouriteChange={handleFavouritesChange}
      />
      <EmblaCarousel
        options={OPTIONS}
        selectedCategories={selectedCategories}
        selectedTechniques={selectedTechniques}
        selectedFavourites={selectedFavourites}
      />
    </div>
  );
}
