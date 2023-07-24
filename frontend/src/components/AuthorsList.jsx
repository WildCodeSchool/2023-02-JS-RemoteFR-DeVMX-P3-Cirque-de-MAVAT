import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Admin403 from "./Admin403";

import BreadcrumbAuthors from "./BreadcrumbAuthors";
import CurrentUserContext from "../contexts/CurrentUser";

export default function AuthorsList() {
  const { currentUser } = useContext(CurrentUserContext);
  const [authors, setAuthors] = useState([]);
  const breadcrumb = [
    {
      id: 1,
      title: "Mon compte",
      link: "/account",
    },
    {
      id: 2,
      title: "Gérer les auteurs",
      link: null,
    },
  ];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/authors`)
      .then((res) => setAuthors(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser.isAdmin ? (
        <>
          <BreadcrumbAuthors breadcrumb={breadcrumb} />
          <section className="account authors">
            <h2>Gérer les auteurs</h2>
            <p className="authorfont">
              <Link className="authortoadd" to="/account/authors/add">
                Ajouter un auteur
              </Link>
            </p>
            {authors.length ? (
              <ul className="listdecoration">
                {authors.map((author) => {
                  const { id, firstname, lastname } = author;
                  return (
                    <li className="listdecorationauthor" key={`authors-${id}`}>
                      {firstname}&nbsp;
                      {lastname}
                      {/* <AuthorsDelete author={author} /> */}
                      <Link
                        to={`/account/authors/delete/${id}`}
                        className="deleteauthors"
                      >
                        Supprimer
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>Aucun auteur enregistré.</p>
            )}
          </section>
        </>
      ) : (
        <Admin403 />
      )}
    </>
  );
}
