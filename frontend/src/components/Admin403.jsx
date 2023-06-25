import { Link } from "react-router-dom";

export default function Admin403() {
  return (
    <section className="account works">
      <h2>Accès interdit</h2>
      <p>Vous n’êtes pas autorisé à consulter cette page.</p>
      <p>
        <Link to="/account">Retour à mon compte</Link>
      </p>
    </section>
  );
}
