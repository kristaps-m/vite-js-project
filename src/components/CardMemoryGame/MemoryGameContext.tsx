import React, { createContext, useContext, useState } from "react";

// Define the type of the context value
interface MemoryGameContextType {
  testMode: boolean;
  setTestMode: (value: boolean) => void;
}

// Create Context with default value
const MemoryGameContext = createContext<MemoryGameContextType | undefined>(
  undefined
);

// Create a provider component
export const MemoryGameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [testMode, setTestMode] = useState(false);

  return (
    <MemoryGameContext.Provider value={{ testMode, setTestMode }}>
      {children}
    </MemoryGameContext.Provider>
  );
};

// Custom hook to use the context
export const useMemoryGame = () => {
  const context = useContext(MemoryGameContext);
  if (!context) {
    throw new Error("useMemoryGame must be used within a MemoryGameProvider");
  }
  return context;
};
