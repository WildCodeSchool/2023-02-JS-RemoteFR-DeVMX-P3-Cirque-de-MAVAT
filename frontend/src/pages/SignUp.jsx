import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [invalidFields, setInvalidFields] = useState([]);
  const [invalidSignUp, setInvalidSignUp] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const handleSignUp = (e) => {
    e.preventDefault();
    const validationFilters = {
      email: {
        type: "email",
        format: /^[-_.a-z0-9]+@[-_a-z0-9]+(\.[a-z]{2,4})?\.[a-z]{2,6}$/i,
      },
      password: {
        type: "string",
      },
      confirmPassword: {
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
      if (field === "confirmPassword" && value !== fields.get("password")) {
        errors.add(field);
      }
    }
    setInvalidFields([...errors]);

    if (errors.size === 0) {
      const data = {};
      fields.delete("confirmPassword");
      for (const [key, value] of fields.entries()) {
        if (value) data[key] = value;
        else data[key] = null;
      }
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/users`, data)
        .then((response) => {
          if (response.data.id) setIsRegistered(true);
        })
        .catch((err) => {
          setInvalidSignUp(err.response.data);
        });
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isRegistered ? (
        <section className="account signup">
          <h2>Créer un compte</h2>
          <p>Votre compte utilisateur a été créé avec succès.</p>
          <p className="login">
            <Link to="/login">Se connecter</Link>
          </p>
        </section>
      ) : (
        <form className="account signup" onSubmit={handleSignUp} noValidate>
          <h2>Créer un compte</h2>
          <p>
            Les champs accompagnés d’un * sont obligatoires
            {invalidSignUp && <span className="error">{invalidSignUp}</span>}
          </p>
          <p>
            <label htmlFor="signup-firstname">Prénom</label>
            <input
              id="signup-firstname"
              name="firstname"
              type="text"
              maxLength="255"
            />
          </p>
          <p>
            <label htmlFor="signup-lastname">Nom</label>
            <input
              id="signup-lastname"
              name="lastname"
              type="text"
              maxLength="255"
            />
          </p>
          <p>
            <label htmlFor="signup-email">
              Adresse email
              <span aria-label=" obligatoire"> *</span>
              {invalidFields.includes("email") && (
                <span className="error">
                  (une adresse email doit être saisie)
                </span>
              )}
            </label>
            <input id="signup-email" name="email" type="email" required />
          </p>
          <p>
            <label htmlFor="signup-password">
              Votre mot de passe
              <span aria-label=" obligatoire"> *</span>
              {invalidFields.includes("password") && (
                <span className="error">(un mot de passe doit être saisi)</span>
              )}
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
          </p>
          <p>
            <label htmlFor="signup-password-confirm">
              Confirmez votre mot de passe
              <span aria-label=" obligatoire"> *</span>
              {invalidFields.includes("confirmPassword") && (
                <span className="error">
                  (le mot de passe doit être resaisi à l’identique)
                </span>
              )}
            </label>
            <input
              id="signup-password-confirm"
              name="confirmPassword"
              type="password"
              required
            />
          </p>
          <p>
            <input type="submit" value="S’inscrire" />
          </p>
        </form>
      )}
    </>
  );
}
