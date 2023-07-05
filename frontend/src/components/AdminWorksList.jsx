import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AccountBreadcrumb from "./AccountBreadcrumb";
import Admin403 from "./Admin403";

import CurrentUserContext from "../contexts/CurrentUser";

export default function AdminWorksList() {
  const { currentUser } = useContext(CurrentUserContext);
  const [works, setWorks] = useState([]);
  const host = import.meta.env.VITE_BACKEND_URL;
  const breadcrumb = [
    {
      id: 1,
      title: "Mon compte",
      link: "/account",
    },
    {
      id: 2,
      title: "Gérer les œuvres",
      link: null,
    },
  ];
  useEffect(() => {
    if (!works.length) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/works`)
        .then((response) => setWorks(response.data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser.isAdmin ? (
        <>
          <AccountBreadcrumb breadcrumb={breadcrumb} />
          <section className="account works">
            <h2>Gérer les œuvres</h2>
            <p>
              <Link to="/account/works/add">Ajouter une œuvre</Link>
            </p>
            {works.length ? (
              <ul>
                {works.map((work) => {
                  const { id, title, src } = work;
                  return (
                    <li key={`works-${id}`}>
                      <img
                        src={`${host}/assets/media/${src}`}
                        alt=""
                        onContextMenu={(e) => e.preventDefault()}
                      />
                      {title}
                      <Link to={`/account/works/${id}`} className="edit">
                        Modifier
                      </Link>
                      <Link
                        to={`/account/works/delete/${id}`}
                        className="delete"
                      >
                        Supprimer
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>Aucune œuvre enregistrée.</p>
            )}
          </section>
        </>
      ) : (
        <Admin403 />
      )}
    </>
  );
}
