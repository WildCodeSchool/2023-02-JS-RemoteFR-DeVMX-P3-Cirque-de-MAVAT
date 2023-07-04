import React, { useState } from "react";
import axios from "axios";

function AuthorsFormAdd() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [artistname, setArtistname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [deathdate, setDeathdate] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [deathplace, setDeathplace] = useState("");
  const [biography, setBiography] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/authors`, {
        firstname,
        lastname,
        artistname,
        birthdate,
        deathdate,
        birthplace,
        deathplace,
        biography,
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <section className="account">
        <h2>Gérer les auteurs</h2>
        <p className="authortoadd">Ajouter un auteur</p>
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
            ENREGISTRER
          </button>
        </form>
      </section>
    </div>
  );
}
export default AuthorsFormAdd;
