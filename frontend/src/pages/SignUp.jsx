import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);
  const [invalidSignUp, setInvalidSignUp] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const handleFirstName = (e) => {
    setFirstname(e.target.value);
  };
  const handleLastName = (e) => {
    setLastname(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    const validationFilters = {
      email: /^[-_.a-z0-9]+@[-_a-z0-9]+(\.[a-z]{2,4})?\.[a-z]{2,6}$/i,
      password: /^\S+$/i,
      confirmPassword: /^\S+$/i,
    };
    const fields = {
      email,
      password,
      confirmPassword,
      firstname,
      lastname,
    };
    const errors = new Set();

    for (const field in fields) {
      if (!fields[field].match(validationFilters[field])) {
        errors.add(field);
      } else if (
        field === "confirmPassword" &&
        fields[field] !== fields.password
      ) {
        errors.add(field);
      } else {
        errors.delete(field);
      }
    }
    setInvalidFields([...errors]);

    if (errors.size === 0) {
      delete fields.confirmPassword;
      if (!fields.firstname) delete fields.firstname;
      if (!fields.lastname) delete fields.lastname;
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/users`, fields)
        .then((response) => {
          if (response.data.id) setIsRegistered(true);
        })
        .catch((err) => {
          setInvalidSignUp(err.response.data.error);
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
              value={firstname}
              onChange={handleFirstName}
            />
          </p>
          <p>
            <label htmlFor="signup-lastname">Nom</label>
            <input
              id="signup-lastname"
              name="lastname"
              type="text"
              maxLength="255"
              value={lastname}
              onChange={handleLastName}
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
            <input
              id="signup-email"
              name="email"
              type="email"
              value={email}
              required
              onChange={handleEmail}
            />
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
              value={password}
              autoComplete="new-password"
              required
              onChange={handlePassword}
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
              value={confirmPassword}
              required
              onChange={handleConfirmPassword}
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
