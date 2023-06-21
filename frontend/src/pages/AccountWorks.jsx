import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUser";

import Admin403 from "../components/Admin403";
import AdminWorksList from "../components/AdminWorksList";

export default function AccountWorks() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      {currentUser === null && <Navigate to="/login" />}
      <nav className="account-breadcrumb">
        <ul>
          <li>
            <Link to="/account">Mon compte</Link>
          </li>
          <li>{currentUser.isAdmin ? "Gérer les œuvres" : "Accès interdit"}</li>
        </ul>
      </nav>
      <section className="account">
        {currentUser.isAdmin ? <AdminWorksList /> : <Admin403 />}
      </section>
    </>
  );
}
