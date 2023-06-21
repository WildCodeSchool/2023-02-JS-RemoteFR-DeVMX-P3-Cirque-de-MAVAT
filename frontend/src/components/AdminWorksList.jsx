import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminWorksList() {
  const [works, setWorks] = useState([]);
  useEffect(() => {
    if (!works.length) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/works`)
        .then((response) => setWorks(response.data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <>
      <h2>Gérer les œuvres</h2>
      <p>
        <Link to="/account/works/add">Ajouter une œuvre</Link>
      </p>
      {works.length && (
        <ul>
          {works.map((work) => {
            const { id, title } = work;
            return (
              <li key={id}>
                <Link to={`/account/works/${id}`}>{title}</Link>
                <Link to={`/account/works/delete/${id}`} className="delete">
                  Supprimer
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
