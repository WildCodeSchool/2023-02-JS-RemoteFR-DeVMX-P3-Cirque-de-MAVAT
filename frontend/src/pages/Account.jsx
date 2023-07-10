import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUser";

export default function Account() {
  const { currentUser } = useContext(CurrentUserContext);
  const isRedirectionRequired = !Object.keys(currentUser).length;

  return (
    <>
      {isRedirectionRequired && <Navigate to="/login" />}
      <Outlet />
    </>
  );
}
