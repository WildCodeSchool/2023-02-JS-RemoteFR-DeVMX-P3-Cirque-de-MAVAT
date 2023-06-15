/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from "react";

const CurrentUserStatusContext = createContext();

export default CurrentUserStatusContext;

export function CurrentUserStatusProvider({ children }) {
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  return (
    <CurrentUserStatusContext.Provider value={{ isUserAdmin, setIsUserAdmin }}>
      {children}
    </CurrentUserStatusContext.Provider>
  );
}
