import { useContext } from "react";
import { Link } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUser";

export default function AccountDashboard() {
  const { currentUser } = useContext(CurrentUserContext);
  const hasCurrentUser = !!Object.keys(currentUser).length;

  return (
    <section className="account">
      <h2>Mon compte</h2>
      <ul className="tools">
        <li>
          <Link to="/account/info">Mes informations</Link>
        </li>
        {hasCurrentUser && currentUser.isAdmin && (
          <>
            <li>
              <Link to="/account/works">Gérer les œuvres</Link>
            </li>
            <li>
              <Link to="/account/users">Gérer les utilisateurs</Link>
            </li>
          </>
        )}
        {hasCurrentUser && currentUser.isAdmin && (
          <li>
            <Link to="/account/authors">Gérer les auteurs</Link>
          </li>
        )}
      </ul>
    </section>
  );
}
