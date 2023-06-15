import SliderGallery from "../components/SliderGallery";
import Filter from "../components/Filter";

export default function Gallery() {
  return (
    <div className="gallery_page">
      <Filter />
      <SliderGallery />
    </div>
  );
}
