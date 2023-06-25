/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from "react";

const CurrentUserContext = createContext();

export default CurrentUserContext;

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
