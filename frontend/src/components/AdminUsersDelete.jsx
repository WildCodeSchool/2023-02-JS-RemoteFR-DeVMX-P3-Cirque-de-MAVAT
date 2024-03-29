import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import AccountBreadcrumb from "./AccountBreadcrumb";
import Admin403 from "./Admin403";

import CurrentUserContext from "../contexts/CurrentUser";

export default function AdminUsersDelete() {
  const { currentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState([]);
  const [username, setUsername] = useState("");
  const [invalidUserDeletion, setInvalidUserDeletion] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
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
      title: "Supprimer un utilsateur",
      link: null,
    },
  ];

  useEffect(() => {
    axios
      .get(`${host}/users/${id}`)
      .then((response) => {
        setUserId(response.data);
        const { firstname, lastname, email } = response.data;
        let retrievedUsername = "";
        if (firstname === null && lastname === null) {
          retrievedUsername = email;
        } else {
          if (firstname !== null) {
            retrievedUsername += firstname;
          }
          if (lastname !== null) {
            retrievedUsername += ` ${lastname}`;
          }
        }
        retrievedUsername = retrievedUsername.trim();
        setUsername(retrievedUsername);
      })
      .catch((err) => console.error(err));
  }, []);

  const cancelDelete = (e) => {
    e.preventDefault();
    navigate("/account/users");
  };

  const handleDelete = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, config)
      .then((response) => {
        if (response.status === 204) setIsDeleted(true);
      })
      .catch((err) => setInvalidUserDeletion(err.response.data));
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser.isAdmin ? (
        <>
          <AccountBreadcrumb breadcrumb={breadcrumb} />
          <section className="account users delete">
            <h2>Supprimer un utilisateur</h2>
            {isDeleted ? (
              <>
                <p>L’utilisateur {username} a été supprimé avec succès.</p>
                <p>
                  <Link to="/account/users" className="back">
                    Retourner à la liste des utilisateurs
                  </Link>
                </p>
              </>
            ) : (
              <form onSubmit={handleDelete} onReset={cancelDelete} noValidate>
                <p>
                  Êtes-vous sûr de bien vouloir supprimer l’utilisateur{" "}
                  {username}&nbsp;?
                  {invalidUserDeletion && (
                    <span className="error">{invalidUserDeletion}</span>
                  )}
                </p>
                <p>
                  <input type="reset" value="Annuler" />
                  <input type="submit" value="Confirmer" />
                </p>
              </form>
            )}
          </section>
        </>
      ) : (
        <Admin403 />
      )}
    </>
  );
}
