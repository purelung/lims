import React, { createContext, useState } from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const setUserData = (userData) => {
    setUser({ ...user, ...userData });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
