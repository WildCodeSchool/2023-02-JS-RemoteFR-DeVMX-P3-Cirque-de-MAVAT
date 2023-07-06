/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useContext } from "react";
import axios from "axios";
import CurrentUserContext from "../contexts/CurrentUser";

function AuthorsDelete({ author }) {
  const { currentUser } = useContext(CurrentUserContext);
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
      {currentUser.isAdmin && author.id && (
        <button
          type="button"
          className="deleteauthors"
          onClick={DeleteAuthorById}
        >
          Supprimer
        </button>
      )}
    </div>
  );
}

export default AuthorsDelete;
