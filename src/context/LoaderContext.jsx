import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext({
  isLoaderDone: false,
  setLoaderDone: () => {},
});

export const LoaderProvider = ({ children }) => {
  const [isLoaderDone, setIsLoaderDone] = useState(false);

  const setLoaderDone = () => setIsLoaderDone(true);

  return (
    <LoaderContext.Provider value={{ isLoaderDone, setLoaderDone }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
