import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const useStateWithLocalStorage = (localStorageKey) => {
    const [value, setValue] = useState(
      JSON.parse(localStorage.getItem(localStorageKey) || "{}")
    );

    React.useEffect(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(value || {}));
    }, [value]);

    return [value, setValue];
  };

  const [user, setUser] = useStateWithLocalStorage("userAuthData");

  const setUserData = (userData) => {
    setUser({ ...user, ...userData });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUserData,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
