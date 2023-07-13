import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import AccountBreadcrumb from "./AccountBreadcrumb";
import Admin403 from "./Admin403";

import CurrentUserContext from "../contexts/CurrentUser";

export default function AdminUsersUpdate() {
  const { currentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const [userToModify, setUserToModify] = useState(new FormData());
  const [invalidFields, setInvalidFields] = useState([]);
  const [invalidUserUpdate, setInvalidUserUpdate] = useState("");
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
      title: "Gérer les utilisateurs",
      link: "/account/users",
    },
    {
      id: 3,
      title: userToModify.has("email")
        ? userToModify.get("email")
        : "Modifier un utilisateur",
      link: null,
    },
  ];

  useEffect(() => {
    axios
      .get(`${host}/users/${id}`)
      .then((response) => {
        const { data } = response;
        const fields = new FormData();
        for (const key in data) {
          if (data[key] !== null) {
            const camelCasedKey = key
              .split("_")
              .map((e, i) => (i === 0 ? e : e[0].toUpperCase() + e.slice(1)))
              .join("");
            fields.append(camelCasedKey, data[key]);
          }
        }
        setUserToModify(fields);
      })
      .catch((err) => console.error(err));
  }, [isUpdated]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const validationFilters = {
      email: {
        type: "email",
        format: /^[-_.a-z0-9]+@[-_a-z0-9]+(\.[a-z]{2,4})?\.[a-z]{2,6}$/i,
      },
      role: {
        type: "int",
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
            if (
              !value.trim() ||
              !value.match(validationFilters[field].format)
            ) {
              isInvalid = true;
            }
            break;
          case "int":
            if (!value) {
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
        else {
          confirmedNewPassword = value;
        }
      }
    }
    if (newPassword !== confirmedNewPassword) errors.add("confirmPassword");
    else errors.delete("confirmPassword");
    setInvalidFields([...errors]);
    if (errors.size === 0) {
      const data = {};
      const emptyFields = [...fields.keys()].filter(
        (key) => fields.get(key) !== null && !fields.get(key)
      );
      for (const field of emptyFields) {
        fields.delete(field);
      }
      fields.delete("confirmPassword");

      for (const [key, value] of fields.entries()) {
        if (value) data[key] = value;
        else if (key !== "password") data[key] = null;
      }
      axios
        .put(`${host}/users/${id}`, data)
        .then((response) => {
          if (response.status === 204) setIsUpdated(true);
        })
        .catch((err) => setInvalidUserUpdate(err.response.data.error));
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser.isAdmin ? (
        <>
          <AccountBreadcrumb breadcrumb={breadcrumb} />
          <section className="account users update">
            <h2>
              {userToModify.has("title")
                ? userToModify.get("title")
                : "Modifier un utilisateur"}
            </h2>
            {isUpdated ? (
              <>
                <p>L’utilisateur a été mis à jour avec succès.</p>
                <p>
                  <Link to="/account/users" className="back">
                    Retourner à la liste des utilisateurs
                  </Link>
                </p>
              </>
            ) : (
              <>
                <p>
                  Les champs accompagnés d’un * sont obligatoires
                  {invalidUserUpdate && (
                    <span className="error">{invalidUserUpdate}</span>
                  )}
                </p>
                <form onSubmit={handleUpdate} noValidate>
                  <fieldset>
                    <p>
                      <label htmlFor="update-firstname">Prénom</label>
                      <input
                        id="update-firstname"
                        name="firstname"
                        type="text"
                        defaultValue={userToModify.get("firstname")}
                      />
                    </p>
                    <p>
                      <label htmlFor="update-lastname">Nom</label>
                      <input
                        id="update-lastname"
                        name="lastname"
                        type="text"
                        defaultValue={userToModify.get("lastname")}
                      />
                    </p>
                    <p>
                      <label htmlFor="update-email">
                        Adresse Email
                        <span aria-label=" obligatoire"> *</span>
                        {invalidFields.includes("email") && (
                          <span className="error">
                            (un email doit être saisi)
                          </span>
                        )}
                      </label>
                      <input
                        id="update-email"
                        name="email"
                        type="email"
                        maxLength="255"
                        defaultValue={userToModify.get("email")}
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
                            (le nouveau mot de passe doit être resaisi à
                            l’identique)
                          </span>
                        )}
                      </label>
                      <input
                        id="update-password-confirm"
                        name="confirmPassword"
                        type="password"
                      />
                    </p>
                  </fieldset>
                  <fieldset>
                    <legend>Administrateur&nbsp;?</legend>
                    <ul>
                      {userToModify.get("role") === "1" ? (
                        <>
                          <li>
                            <input
                              id="update-role-yes"
                              name="role"
                              type="radio"
                              value="1"
                              defaultChecked
                            />
                            <label htmlFor="update-role-yes">Oui</label>
                          </li>
                          <li>
                            <input
                              id="update-role-no"
                              name="role"
                              type="radio"
                              value="0"
                            />
                            <label htmlFor="update-role-no">Non</label>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <input
                              id="update-role-yes"
                              name="role"
                              type="radio"
                              value="1"
                            />
                            <label htmlFor="update-role-yes">Oui</label>
                          </li>
                          <li>
                            <input
                              id="update-role-no"
                              name="role"
                              type="radio"
                              value="0"
                              defaultChecked
                            />
                            <label htmlFor="update-role-no">Non</label>
                          </li>
                        </>
                      )}
                    </ul>
                  </fieldset>
                  <p>
                    <input type="submit" value="Mettre à jour" />
                  </p>
                </form>
              </>
            )}
          </section>
        </>
      ) : (
        <Admin403 />
      )}
    </>
  );
}
