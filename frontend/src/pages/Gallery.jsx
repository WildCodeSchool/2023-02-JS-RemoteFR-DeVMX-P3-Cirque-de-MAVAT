import Filter from "../components/Filter";
import EmblaCarousel from "../components/EmblaCarousel";

export default function Gallery() {
  const OPTIONS = {};
  const SLIDE_COUNT = 10;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div className="gallery_page">
      <Filter />
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
