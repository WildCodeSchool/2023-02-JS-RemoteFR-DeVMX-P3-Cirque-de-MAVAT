import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CurrentUserLogContext from "../contexts/CurrentUserLog";
import CurrentUserStatusContext from "../contexts/CurrentUserStatus";

export default function Account() {
  const { isUserLogged } = useContext(CurrentUserLogContext);
  const { isUserAdmin } = useContext(CurrentUserStatusContext);

  return (
    <>
      {!isUserLogged && <Navigate to="/login" />}
      <section className="account">
        <h2>Mon compte</h2>
        <p>Mes favoris</p>
        {isUserAdmin && <p>Tout pour l’adminsitration du site</p>}
      </section>
    </>
  );
}
