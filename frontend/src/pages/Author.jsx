import AutoPortrait from "../assets/HCNMT_autoportrait.jpg";

export default function Author() {
  return (
    <div className="author">
      <img
        src={AutoPortrait}
        alt="Auto-portait-author"
        className="img-author "
      />
      <div className="author-paint">
        <h2>Hippolyte Charles Napoléon MORTIER Duc de Trévise</h2>
        <p>
          Hippolyte Charles Napoléon Mortier de Trévise, 3eme duc de Trévise,
          est né le 4 mai 1835 et mort le 13 février 1892. Son grand-père a
          obtenu le titre de Duc en 1808, sous Napoléon 1er, pour hauts faits
          d'armes. <br />
          Fils de Napoléon Mortier de Trévise et de la duchesse née Anne-Marie
          Lecomte-Stuart, il a épousé, le 23 octobre 1860, Marie Angèle Emma Le
          Coat de Kerveguen, fille de Gabriel Le Coat de Kerveguen, un riche
          colon réunionnais. Il n'a pas eu d'enfant. Secrétaire d'ambassade sous
          Napoléon III, il fut pair de France et sénateur.
        </p>
      </div>
    </div>
  );
}
