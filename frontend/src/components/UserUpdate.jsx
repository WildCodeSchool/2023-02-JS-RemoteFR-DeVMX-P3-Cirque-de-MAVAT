import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AccountBreadcrumb from "./AccountBreadcrumb";

import CurrentUserContext from "../contexts/CurrentUser";

export default function UserUpdate() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { id } = currentUser;
  const [username, setUsername] = useState(null);
  const [currentFields, setCurrentFields] = useState({});
  const [invalidFields, setInvalidFields] = useState([]);
  const [invalidUpdate, setInvalidUpdate] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const host = import.meta.env.VITE_BACKEND_URL;
  const breadcrumb = [
    {
      id: 1,
      title: "Mon compte",
      link: "/account",
    },
    {
      id: 2,
      title: "Mes informations",
      link: null,
    },
  ];

  useEffect(() => {
    if (id) {
      axios
        .get(`${host}/users/${id}`)
        .then((response) => {
          const { data } = response;
          const { firstname, lastname } = data;

          // Password and role are sensitive data and are not intended to be displayed here
          delete data.password;
          delete data.role;
          setCurrentFields(data);

          if (firstname) {
            if (lastname) setUsername(`${firstname} ${lastname}`);
            else setUsername(firstname);
          } else if (lastname) setUsername(lastname);
          else setUsername(null);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const validationFilters = {
      email: {
        type: "email",
        format: /^[-_.a-z0-9]+@[-_a-z0-9]+(\.[a-z]{2,4})?\.[a-z]{2,6}$/i,
      },
    };
    const fields = new FormData(e.target);
    const errors = new Set();
    let newPassword;
    let confirmedNewPassword;

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
      } else if (["password", "confirmPassword"].includes(field)) {
        if (field === "password") newPassword = value;
        else confirmedNewPassword = value;
      }
    }
    if (newPassword !== confirmedNewPassword) errors.add("confirmPassword");
    else errors.delete("confirmPassword");
    setInvalidFields([...errors]);

    if (errors.size === 0) {
      const data = {};
      fields.delete("confirmPassword");
      for (const [key, value] of fields.entries()) {
        if (value) data[key] = value;
        else if (key !== "password") data[key] = null;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      axios
        .put(`${host}/users/${id}`, data, config)
        .then((response) => {
          if (response.status === 204) {
            const { firstname, lastname } = data;
            const newCurrentUser = currentUser;

            setIsUpdated(true);

            if (firstname) {
              if (lastname) setUsername(`${firstname} ${lastname}`);
              else setUsername(firstname);
            } else if (lastname) setUsername(lastname);
            else setUsername(null);

            newCurrentUser.username = username;
            setCurrentUser(newCurrentUser);
          }
        })
        .catch((err) => {
          setInvalidUpdate(err.message);
        });
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <AccountBreadcrumb breadcrumb={breadcrumb} />
      {id ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {isUpdated ? (
            <section className="account users update">
              <h2>Mes informations</h2>
              <p>Votre compte utilisateur a été mis à jour avec succès.</p>
              <p>
                <Link to="/account" className="back">
                  Retour à mon compte
                </Link>
              </p>
            </section>
          ) : (
            <form
              className="account users update"
              onSubmit={handleUpdate}
              noValidate
            >
              <h2>Mes informations</h2>
              <p>
                Les champs accompagnés d’un * sont obligatoires
                {invalidUpdate && (
                  <span className="error">{invalidUpdate}</span>
                )}
              </p>
              <p>
                <label htmlFor="update-firstname">Prénom</label>
                <input
                  id="update-firstname"
                  name="firstname"
                  type="text"
                  maxLength="255"
                  defaultValue={currentFields.firstname}
                />
              </p>
              <p>
                <label htmlFor="update-lastname">Nom</label>
                <input
                  id="update-lastname"
                  name="lastname"
                  type="text"
                  maxLength="255"
                  defaultValue={currentFields.lastname}
                />
              </p>
              <p>
                <label htmlFor="update-email">
                  Adresse email
                  <span aria-label=" obligatoire"> *</span>
                  {invalidFields.includes("email") && (
                    <span className="error">
                      (une adresse email doit être saisie)
                    </span>
                  )}
                </label>
                <input
                  id="update-email"
                  name="email"
                  type="email"
                  defaultValue={currentFields.email}
                  required
                />
              </p>
              <p>
                <label htmlFor="update-password">
                  Votre nouveau mot de passe
                </label>
                <input
                  id="update-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                />
              </p>
              <p>
                <label htmlFor="update-password-confirm">
                  Confirmez votre nouveau mot de passe
                  {invalidFields.includes("confirmPassword") && (
                    <span className="error">
                      (le nouveau mot de passe doit être resaisi à l’identique)
                    </span>
                  )}
                </label>
                <input
                  id="update-password-confirm"
                  name="confirmPassword"
                  type="password"
                />
              </p>
              <p>
                <input type="submit" value="Mettre à jour" />
              </p>
            </form>
          )}
        </>
      ) : (
        <section className="account users update">
          <h2>Mes informations</h2>
          <p>
            Les informations vous concernant n’ont pas pu être affichées.
            Veuillez réessayer plus tard.
          </p>
          <p>
            <Link to="/account" className="back">
              Retour à mon compte
            </Link>
          </p>
        </section>
      )}
    </>
  );
}
