import { Link } from "react-router-dom";

export default function Login() {
  return (
    <form className="login">
      <h2>S’identifier</h2>
      <p>Tous les champs sont obligatoires</p>
      <p>
        <label htmlFor="login-email">Adresse email</label>
        <input id="login-email" name="email" type="email" />
      </p>
      <p>
        <label htmlFor="login-password">Mot de passe</label>
        <input id="login-password" name="password" type="password" />
        <Link
          to="/login/forgotten-password"
          className="forgotten-password-link"
        >
          Mot de passe oublié&nbsp;?
        </Link>
      </p>
      <p>
        <input type="submit" value="Se connecter" />
      </p>
      <p>
        Vous n’avez pas de compte&nbsp;?{" "}
        <Link to="/create-account">Créer un compte</Link>
      </p>
    </form>
  );
}
