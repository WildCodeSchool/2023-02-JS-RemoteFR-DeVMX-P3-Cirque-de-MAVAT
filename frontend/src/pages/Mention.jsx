import rgpd from "../assets/rgpd.svg";

export default function Mention() {
  return (
    <div className="main-legal">
      <div className="legal">
        <div className="title-rgpd">
          <img src={rgpd} alt="" />
          <h1>Mentions Légales</h1>
        </div>
        <p>Copyright : sur toutes les œuvres du site de l'AFAC 974.</p>
        <p>
          Propriété intellectuelle: Toutes copies, reproductions, captures
          d'écran ou partage des œuvres sont formellement interdites.
        </p>
        <p> Les œuvres sont soumises à des droits d'auteur.</p>
        <p>
          Il est interdit de réutiliser les images et le texte à caractère
          commercial ou personnel, les oeuvres et les textes qui sont affichés
          sur le site AFAC 974 sont la propriété de l'AFAC 974.
        </p>
        <p>
          Une personne utilisant l’image d’autrui sans son autorisation encourt
          des sanctions pénales et civiles.
        </p>
        <p>
          Les sanctions pénales sont différentes selon qu’il s’agit d’une
          publication ou d’une exploitation de votre image. La publication d’une
          photo ou d’une vidéo sans l’accord de la personne photographiée est
          punie d’un an d’emprisonnement et de 15 000 € d’amende, au regard de
          l’article 226-8 du code pénal.
        </p>
        <p>
          Alors que l’exploitation de l’image d’autrui contre son gré en portant
          volontairement atteinte à son intimité et à sa vie privée est punie
          d’un an d’emprisonnement et de 45 000 € d’amende, conformément à
          l’article 226-1 du Code pénal.
        </p>
      </div>
    </div>
  );
}
