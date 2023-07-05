import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Admin403 from "./Admin403";

import CurrentUserContext from "../contexts/CurrentUser";
import AuthorsDelete from "./AuthorsDelete";

export default function AuthorsList() {
  const { currentUser } = useContext(CurrentUserContext);
  const [authors, setAuthors] = useState([]);

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
        <section className="account authors">
          <h2>Gérer les auteurs</h2>
          <p className="authorfont">
            <Link className="authortoadd" to="/account/authors/add">
              Ajouter un auteur
            </Link>
          </p>
          {authors.length && (
            <ul className="listdecoration">
              {authors.map((author) => {
                const { id, firstname, lastname } = author;
                return (
                  <li className="listdecorationauthor" key={`authors-${id}`}>
                    {firstname}&nbsp;
                    {lastname}
                    <AuthorsDelete author={author} />
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      ) : (
        <Admin403 />
      )}
    </>
  );
}
