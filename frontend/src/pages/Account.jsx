import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUser";

export default function Account() {
  const { currentUser } = useContext(CurrentUserContext);
  const isRedirectionRequired = !Object.keys(currentUser).length;

  return (
    <>
      {isRedirectionRequired && <Navigate to="/login" />}
      <section className="account">
        <h2>Mon compte</h2>
        <ul className="tools">
          <li>
            <Link to="/account/favourite">Mes favoris</Link>
          </li>
          {currentUser && currentUser.isAdmin && (
            <li>
              <Link to="/account/works">Gérer les œuvres</Link>
            </li>
          )}
        </ul>
      </section>
    </>
  );
}
