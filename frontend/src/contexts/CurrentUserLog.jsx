/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from "react";

const CurrentUserLogContext = createContext();

export default CurrentUserLogContext;

export function CurrentUserLogProvider({ children }) {
  const [isUserLogged, setIsUserLogged] = useState(false);
  return (
    <CurrentUserLogContext.Provider value={{ isUserLogged, setIsUserLogged }}>
      {children}
    </CurrentUserLogContext.Provider>
  );
}
