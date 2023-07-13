import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AccountBreadcrumb from "./AccountBreadcrumb";
import Admin403 from "./Admin403";

import CurrentUserContext from "../contexts/CurrentUser";

export default function AdminUsersList() {
  const { currentUser } = useContext(CurrentUserContext);
  const [users, setUsers] = useState([]);
  const breadcrumb = [
    {
      id: 1,
      title: "Mon compte",
      link: "/account",
    },
    {
      id: 2,
      title: "Gérer les utilisateurs",
      link: null,
    },
  ];
  useEffect(() => {
    if (!users.length) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
        .then((response) => setUsers(response.data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser.isAdmin ? (
        <>
          <AccountBreadcrumb breadcrumb={breadcrumb} />
          <section className="account users">
            <h2>Gérer les utilisateurs</h2>
            <p>
              <Link to="/account/users/add">Ajouter un utilisateur</Link>
            </p>
            {users.length && (
              <ul>
                {users.map((user) => {
                  const { id, firstname, lastname, email } = user;
                  let username = "";
                  if (firstname === null && lastname === null) {
                    username = email;
                  } else {
                    if (firstname !== null) {
                      username += firstname;
                    }
                    if (lastname !== null) {
                      username += ` ${lastname}`;
                    }
                  }
                  username = username.trim();
                  return (
                    <li key={`users-${id}`}>
                      <Link to={`/account/users/${id}`}>{username}</Link>
                      <Link to={`/account/users/${id}`} className="edit">
                        Modifier
                      </Link>
                      <Link
                        to={`/account/users/delete/${id}`}
                        className="delete"
                      >
                        Supprimer
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      ) : (
        <Admin403 />
      )}
    </>
  );
}
