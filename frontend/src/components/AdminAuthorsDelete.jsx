/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import BreadcrumbAuthors from "./BreadcrumbAuthors";
import Admin403 from "./Admin403";
import CurrentUserContext from "../contexts/CurrentUser";

export default function AdminAuthorsDelete() {
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [invalidWorkDeletion, setInvalidWorkDeletion] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const { id } = useParams();
  const host = import.meta.env.VITE_BACKEND_URL;

  const breadcrumb = [
    {
      id: 1,
      title: "Mon compte",
      link: "/account",
    },
    {
      id: 2,
      title: "Gérer les auteurs",
      link: "/account/authors",
    },
    {
      id: 3,
      title: "Supprimer un auteur",
      link: null,
    },
  ];

  function DeleteAuthorById(e) {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/authors/${id}`, config)
      .then((res) => res.data)
      .then(() => setIsDeleted(!isDeleted))
      .catch((err) => setInvalidWorkDeletion(err.response.data.error));
  }

  const cancelDelete = (e) => {
    e.preventDefault();
    navigate("/account/authors");
  };

  useEffect(() => {
    axios
      .get(`${host}/authors/${id}`)
      .then((response) => {
        const { firstname, lastname, artistname } = response.data;
        let retrievedUsername = "";
        if (firstname === null && lastname === null) {
          retrievedUsername = artistname;
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

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser.isAdmin ? (
        <>
          <BreadcrumbAuthors breadcrumb={breadcrumb} />
          <section className="account works delete">
            <h2>Supprimer un auteur</h2>
            {isDeleted ? (
              <>
                <p>L’auteur {username} a été supprimé avec succès.</p>
                <p>
                  <Link to="/account/authors" className="back">
                    Retourner à la liste des auteurs
                  </Link>
                </p>
              </>
            ) : (
              <form
                onSubmit={DeleteAuthorById}
                onReset={cancelDelete}
                noValidate
              >
                <p>
                  Êtes-vous sûr de supprimer l’auteur {username}&nbsp;?
                  {invalidWorkDeletion && (
                    <span className="error">{invalidWorkDeletion}</span>
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
