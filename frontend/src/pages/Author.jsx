import TestSlider from "../components/EmblaCarousel";

export default function Author() {
  const OPTIONS = {};
  const SLIDE_COUNT = 10;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return <TestSlider slides={SLIDES} options={OPTIONS} />;
}
