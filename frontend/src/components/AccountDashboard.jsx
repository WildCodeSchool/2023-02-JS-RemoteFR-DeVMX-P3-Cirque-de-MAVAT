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
          <Link to="/account/favourite">Mes favoris</Link>
        </li>
        {hasCurrentUser && currentUser.isAdmin && (
          <li>
            <Link to="/account/works">Gérer les œuvres</Link>
          </li>
        )}
      </ul>
    </section>
  );
}
