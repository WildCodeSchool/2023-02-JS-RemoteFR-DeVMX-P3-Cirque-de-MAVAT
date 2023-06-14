import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CurrentUserLogContext from "../contexts/CurrentUserLog";

export default function Logout() {
  const { isUserLogged, setIsUserLogged } = useContext(CurrentUserLogContext);
  if (isUserLogged) setIsUserLogged(false);

  return (
    <>
      {!isUserLogged && <Navigate to="/" />}
      null
    </>
  );
}
