import { useState } from "react";
import test1 from "../assets/test1.jpg";
import test2 from "../assets/test2.jpg";
import test3 from "../assets/test3.jpg";

const works = [
  {
    id: 1,
    image: test1,
    title: "Effet de nuit sur la Cheminée usine du Tampon",
    author: "Hippolyte Charles Napoléon MORTIER Duc de Trévise ",
    ref: "40FI79",
    tech: "Aquarelle",
    sizes: "20 X 14",
    created: "1866",
    story:
      "Attribuée parfois à l'usine du Grand Tampon, mais c'est peu probable: l'usine du Grand Tampon ayant été une scierie. Or, ici, il s'agit sans doute de l'usine de Bel Air: on reconnaît les deux corps principaux du bâtiment industriel (purgerie et bâtiment abritant la machine à vapeur) en parallèle, comme sur les figures 2 et 3. La cheminée carrée est sur le côté Nord, construite en basalte, avec intercalation de poutres deux côtés par deux côtés. Devant, un gardien, dont l'ombre se projette sur la cheminée. En arrière-plan, une allée de palmiers, qui semble mener vers la maison de maître. La disposition des lieux correspond à celle qui existait à Bel Air. Scène d'apparence paisible ?",
    external: "https://view.genial.ly/5fb636d03636f40d7f883f24",
  },
  {
    id: 2,
    image: test2,
    title: "Lorem Ipsum is simply dummy text ",
    author: "Hippolyte Charles Napoléon MORTIER Duc de Trévise ",
    ref: "123FA456",
    tech: "Dessin",
    sizes: "30 X 20",
    created: "756",
    story:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    external: "https://www.lipsum.com/",
  },
  {
    id: 3,
    image: test3,
    title: "Where does it come from ?",
    author: "Hippolyte Charles Napoléon MORTIER Duc de Trévise ",
    ref: "123FA456",
    tech: "Dessin à la mine de plomb",
    sizes: "50 X 10",
    created: "2023",
    story:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    external: "https://www.lipsum123.com/",
  },
];

export default function SliderGallery() {
  const [worksIndex, setWorksIndex] = useState(0);
  const { image, title, author, ref, tech, sizes, created, story, external } =
    works[worksIndex];

  return (
    <div className="slider-gallery">
      {worksIndex > 0 && (
        <button
          type="button"
          aria-label="prevBtn"
          className="prevBtn"
          onClick={() => {
            setWorksIndex(worksIndex - 1);
          }}
        />
      )}
      <img src={image} alt={title} />
      <div className="work-text">
        <h1>{title}</h1>
        <h2>{author}</h2>
        <h3>Référence image ADR : {ref}</h3>
        <h3>Technique : {tech}</h3>
        <h3>Dimension : {sizes}</h3>
        <h3>Année de réalisation : {created}</h3>
        <p>{story}</p>
        <span>Article lié :</span>
        <a href={external}> {external}</a>
      </div>
      {worksIndex < works.length - 1 && (
        <button
          type="button"
          aria-label="nextBtn"
          className="nextBtn"
          onClick={() => {
            setWorksIndex(worksIndex + 1);
          }}
        />
      )}
    </div>
  );
}
