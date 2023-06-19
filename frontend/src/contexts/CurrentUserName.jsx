/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from "react";

const CurrentUserNameContext = createContext();

export default CurrentUserNameContext;

export function CurrentUserNameProvider({ children }) {
  const [userName, setUserName] = useState(null);
  return (
    <CurrentUserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </CurrentUserNameContext.Provider>
  );
}
