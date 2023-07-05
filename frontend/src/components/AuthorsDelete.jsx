/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from "react";
import axios from "axios";

function AuthorsDelete({ author }) {
  function DeleteAuthorById() {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/authors/${author.id}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      {author.id && (
        <button type="button" onClick={DeleteAuthorById}>
          Supprimer
        </button>
      )}
    </div>
  );
}

export default AuthorsDelete;
