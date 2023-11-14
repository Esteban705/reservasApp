import React, { createContext, useContext, useState, ReactNode } from "react";

// Define el tipo para el contexto
type LoadingContextType = {
  isLoading: boolean;
  toggleLoading: (status: boolean) => void;
};

// Crea el contexto
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Define el proveedor de contexto
export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleLoading = (status: boolean) => {
    setIsLoading(status);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, toggleLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Define un gancho personalizado para acceder al contexto
export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
};
