import React, { createContext, useState } from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState("");
  return (
    <UserContext.Provider
      value={{
        authToken,
        setAuthToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
