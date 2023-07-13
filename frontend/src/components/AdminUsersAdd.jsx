import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AccountBreadcrumb from "./AccountBreadcrumb";
import Admin403 from "./Admin403";

import CurrentUserContext from "../contexts/CurrentUser";

export default function AdminWorksAdd() {
  const { currentUser } = useContext(CurrentUserContext);
  const [invalidFields, setInvalidFields] = useState([]);
  const [invalidUserAddition, setInvalidUserAddition] = useState("");
  const [isAdded, setIsAdded] = useState(false);
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
      title: "Ajouter un utilisateur",
      link: null,
    },
  ];

  const handleAdd = (e) => {
    e.preventDefault();
    const validationFilters = {
      email: {
        type: "email",
        format: /^[-_.a-z0-9]+@[-_a-z0-9]+(\.[a-z]{2,4})?\.[a-z]{2,6}$/i,
      },
      password: {
        type: "string",
      },
      role: {
        type: "int",
      },
    };
    const fields = new FormData(e.target);
    const errors = new Set();
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
      }
    }
    setInvalidFields([...errors]);

    if (errors.size === 0) {
      const data = {};
      for (const [field, value] of fields.entries()) {
        if (value) data[field] = value;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/users`, data, config)
        .then((response) => {
          if (response.data.id) setIsAdded(true);
        })
        .catch((err) => setInvalidUserAddition(err.response.data));
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser.isAdmin ? (
        <>
          <AccountBreadcrumb breadcrumb={breadcrumb} />
          <section className="account users">
            <h2>Ajouter un utilisateur</h2>
            {isAdded ? (
              <>
                <p>L’utilisateur a été ajouté avec succès.</p>
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
                  {invalidUserAddition && (
                    <span className="error">{invalidUserAddition}</span>
                  )}
                </p>
                <form onSubmit={handleAdd} noValidate>
                  <fieldset>
                    <p>
                      <label htmlFor="add-firstname">Prénom</label>
                      <input id="add-firstname" name="firstname" type="text" />
                    </p>
                    <p>
                      <label htmlFor="add-lastname">Nom</label>
                      <input id="add-lastname" name="lastname" type="text" />
                    </p>
                    <p>
                      <label htmlFor="add-email">
                        Email
                        <span aria-label=" obligatoire"> *</span>
                        {invalidFields.includes("email") && (
                          <span className="error">
                            (un email doit être saisi)
                          </span>
                        )}
                      </label>
                      <input
                        id="add-email"
                        name="email"
                        type="email"
                        maxLength="255"
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="add-password">
                        Mot de passe
                        <span aria-label=" obligatoire"> *</span>
                        {invalidFields.includes("password") && (
                          <span className="error">
                            (un mot de passe doit être saisi)
                          </span>
                        )}
                      </label>
                      <input
                        id="add-password"
                        name="password"
                        type="password"
                        maxLength="255"
                        required
                      />
                    </p>
                  </fieldset>
                  <fieldset>
                    <legend>Administrateur&nbsp;?</legend>
                    <ul>
                      <li>
                        <input
                          id="add-role-yes"
                          name="role"
                          type="radio"
                          value="1"
                        />
                        <label htmlFor="add-role-yes">Oui</label>
                      </li>
                      <li>
                        <input
                          id="add-role-no"
                          name="role"
                          type="radio"
                          value="0"
                          defaultChecked
                        />
                        <label htmlFor="add-role-no">Non</label>
                      </li>
                    </ul>
                  </fieldset>
                  <p>
                    <input type="submit" value="Ajouter" />
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
