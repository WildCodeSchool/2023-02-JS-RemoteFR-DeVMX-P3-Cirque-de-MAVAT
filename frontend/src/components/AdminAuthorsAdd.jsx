import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import BreadcrumbAuthors from "./BreadcrumbAuthors";
import CurrentUserContext from "../contexts/CurrentUser";

export default function AdminAuthorsAdd() {
  const { currentUser } = useContext(CurrentUserContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [artistname, setArtistname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [deathdate, setDeathdate] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [deathplace, setDeathplace] = useState("");
  const [biography, setBiography] = useState("");
  const [isAdded, setIsAdded] = useState(false);

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
      title: "Ajouter un auteur",
      link: null,
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/authors`,
        {
          firstname,
          lastname,
          artistname,
          birthdate,
          deathdate,
          birthplace,
          deathplace,
          biography,
        },
        config
      )
      .then((res) => {
        if (res.status === 201) setIsAdded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <BreadcrumbAuthors breadcrumb={breadcrumb} />
      <section className="account authors">
        <h2>Ajouter un auteur</h2>
        {isAdded ? (
          <>
            <p>L’auteur a été ajouté avec succès.</p>
            <p>
              <Link to="/account/authors" className="back">
                Retourner à la liste des auteurs
              </Link>
            </p>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="register-form">
            <label htmlFor="lastname">Nom :</label>
            <input
              className="register-input"
              type="text"
              id="Lastname"
              autoComplete="off"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              required
            />
            <label htmlFor="firstname">Prénom :</label>
            <input
              className="register-input"
              type="text"
              id="Firstname"
              autoComplete="off"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              required
            />
            <label htmlFor="artistname">Nom d'artiste :</label>
            <input
              className="register-input"
              type="text"
              id="Artistname"
              autoComplete="off"
              onChange={(e) => setArtistname(e.target.value)}
              value={artistname}
              required
            />
            <label htmlFor="birthdate">Date de naissance :</label>
            <input
              className="register-input"
              type="date"
              id="birthdate"
              autoComplete="off"
              onChange={(e) => setBirthdate(e.target.value)}
              value={birthdate}
              required
            />
            <label htmlFor="deathdate">Date de décès :</label>
            <input
              className="register-input"
              type="date"
              id="deathdate"
              autoComplete="off"
              onChange={(e) => setDeathdate(e.target.value)}
              value={deathdate}
              required
            />
            <label htmlFor="birthplace">Lieu de naissance :</label>
            <input
              className="register-input"
              type="text"
              id="birthplace"
              onChange={(e) => setBirthplace(e.target.value)}
              value={birthplace}
              required
            />
            <label htmlFor="deathplace">Lieu de décès :</label>
            <input
              className="register-input"
              type="text"
              id="deathplace"
              onChange={(e) => setDeathplace(e.target.value)}
              value={deathplace}
              required
            />
            <label htmlFor="biography">Biographie :</label>
            <input
              className="register-input"
              type="text"
              id="biography"
              onChange={(e) => setBiography(e.target.value)}
              value={biography}
              required
            />
            <button className="register-button" type="submit">
              Ajouter
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
