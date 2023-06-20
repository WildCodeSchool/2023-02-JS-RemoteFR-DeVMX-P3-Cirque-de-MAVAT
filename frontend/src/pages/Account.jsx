import { useContext } from "react";
import { Navigate } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUser";

export default function Account() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      {currentUser === null && <Navigate to="/login" />}
      <section className="account">
        <h2>Mon compte</h2>
        <p>Mes favoris</p>
        {currentUser && currentUser.isAdmin && (
          <p>Tout pour l’adminsitration du site</p>
        )}
      </section>
    </>
  );
}
