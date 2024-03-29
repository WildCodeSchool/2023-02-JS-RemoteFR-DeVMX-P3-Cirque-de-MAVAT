import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

import CurrentUserContext from "../contexts/CurrentUser";

export default function Login() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
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
      email: {
        type: "email",
        format: /^[-_.a-z0-9]+@[-_a-z0-9]+(\.[a-z]{2,4})?\.[a-z]{2,6}$/i,
      },
      password: {
        type: "string",
      },
    };
    const fields = new FormData(e.target);
    const errors = new Set();

    for (const [field, value] of fields.entries()) {
      if (validationFilters[field]) {
        let isInvalid = false;
        switch (validationFilters[field].type) {
          case "email":
            if (!value || !value.match(validationFilters[field].format)) {
              isInvalid = true;
            }
            break;
          default:
            if (!value.trim()) {
              isInvalid = true;
            }
            break;
        }
        if (isInvalid) {
          errors.add(field);
        } else {
          errors.delete(field);
        }
      }
    }
    setInvalidFields([...errors]);

    if (errors.size === 0) {
      const data = {};
      fields.delete("confirmPassword");
      for (const [key, value] of fields.entries()) {
        data[key] = value;
      }
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/login`, data)
        .then((response) => {
          const {
            data: { user, token },
          } = response;
          let username = null;
          if (user.firstname) {
            if (user.lastname) username = `${user.firstname} ${user.lastname}`;
            else username = user.firstname;
          } else if (user.lastname) username = user.lastname;
          setCurrentUser({
            id: user.id,
            username,
            isAdmin: user.role === 1,
            token,
          });
        })
        .catch((err) => {
          setInvalidLogin(err.response.data);
        });
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {Object.keys(currentUser).length ? (
        <Navigate to="/account" />
      ) : (
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
          </p>
          <p>
            <input type="submit" value="Se connecter" />
          </p>
          <p>
            Vous n’avez pas de compte&nbsp;?{" "}
            <Link to="/signup">Créer un compte</Link>
          </p>
        </form>
      )}
    </>
  );
}
