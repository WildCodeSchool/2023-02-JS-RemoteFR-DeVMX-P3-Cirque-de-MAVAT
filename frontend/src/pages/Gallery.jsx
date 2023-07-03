import { useState } from "react";
import Filter from "../components/Filter";
import EmblaCarousel from "../components/EmblaCarousel";

export default function Gallery() {
  const OPTIONS = {};
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  return (
    <div className="gallery_page">
      <Filter onCategoryChange={handleCategoryChange} />
      <EmblaCarousel
        options={OPTIONS}
        selectedCategories={selectedCategories}
      />
    </div>
  );
}
