import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import CurrentUserLogContext from "../contexts/CurrentUserLog";
import CurrentUserStatusContext from "../contexts/CurrentUserStatus";
import CurrentUserIdContext from "../contexts/CurrentUserId";

export default function Login() {
  const { isUserLogged, setIsUserLogged } = useContext(CurrentUserLogContext);
  const { setIsUserAdmin } = useContext(CurrentUserStatusContext);
  const { setId } = useContext(CurrentUserIdContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);
  const [invalidLogin, setInvalidLogin] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const validationFilters = {
      email: /^[-_.a-z0-9]+@[-_a-z0-9]+(\.[a-z]{2,4})?\.[a-z]{2,6}$/i,
      password: /^\S+$/i,
    };
    const fields = {
      email,
      password,
    };
    const errors = new Set();

    setIsUserLogged(false);

    for (const field in fields) {
      if (!fields[field].match(validationFilters[field])) {
        errors.add(field);
      } else {
        errors.delete(field);
      }
    }
    setInvalidFields([...errors]);

    if (errors.size === 0) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/login`, fields)
        .then((response) => {
          const {
            data: { user },
          } = response;
          if (user.role === 1) setIsUserAdmin(true);
          setIsUserLogged(true);
          setId(user.id);
        })
        .catch((err) => {
          setInvalidLogin(err.response.data.error);
        });
    }
  };

  return (
    <>
      {isUserLogged && <Navigate to="/account" />}
      <form className="account login" onSubmit={handleLogin} noValidate>
        <h2>S’identifier</h2>
        <p>
          Tous les champs sont obligatoires
          {invalidLogin && <span className="error">{invalidLogin}</span>}
        </p>
        <p>
          <label htmlFor="login-email">
            Adresse email
            {invalidFields.includes("email") && (
              <span className="error">
                (une adresse email doit être saisie)
              </span>
            )}
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={email}
            required
            onChange={handleEmail}
          />
        </p>
        <p>
          <label htmlFor="login-password">
            Mot de passe
            {invalidFields.includes("password") && (
              <span className="error">(un mot de passe doit être saisi)</span>
            )}
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            value={password}
            required
            onChange={handlePassword}
          />
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
    </>
  );
}
