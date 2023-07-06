import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import AccountBreadcrumb from "./AccountBreadcrumb";
import Admin403 from "./Admin403";

import CurrentUserContext from "../contexts/CurrentUser";

export default function AdminWorksDelete() {
  const { currentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageId, setImageId] = useState(0);
  const [file, setFile] = useState("");
  const [invalidWorkDeletion, setInvalidWorkDeletion] = useState("");
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
      title: "Gérer les œuvres",
      link: "/account/works",
    },
    {
      id: 3,
      title: "Supprimer une œuvre",
      link: null,
    },
  ];

  useEffect(() => {
    axios
      .get(`${host}/works/${id}`)
      .then((response) => setImageId(response.data.image_id))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    if (imageId) {
      axios
        .get(`${host}/images/${id}`)
        .then((response) => setFile(response.data[0].src))
        .catch((err) => console.error(err));
    }
  }, [imageId]);

  const cancelDelete = (e) => {
    e.preventDefault();
    navigate("/account/works");
  };

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/images/${imageId}/${file}`)
      .then((response) => {
        if (response.status === 204) setIsDeleted(true);
      })
      .catch((err) => setInvalidWorkDeletion(err.response.data.error));
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser.isAdmin ? (
        <>
          <AccountBreadcrumb breadcrumb={breadcrumb} />
          <section className="account works delete">
            <h2>Supprimer une œuvre</h2>
            {isDeleted ? (
              <>
                <p>L’œuvre a été supprimée avec succès.</p>
                <p>
                  <Link to="/account/works" className="back">
                    Retourner à la liste des œuvres
                  </Link>
                </p>
              </>
            ) : (
              <form onSubmit={handleDelete} onReset={cancelDelete} noValidate>
                <p>
                  Êtes-vous sûr de supprimer l’œuvre&nbsp;?
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
