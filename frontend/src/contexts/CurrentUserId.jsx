/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from "react";

const CurrentUserIdContext = createContext();

export default CurrentUserIdContext;

export function CurrentUserIdProvider({ children }) {
  const [id, setId] = useState(null);
  return (
    <CurrentUserIdContext.Provider value={{ id, setId }}>
      {children}
    </CurrentUserIdContext.Provider>
  );
}
