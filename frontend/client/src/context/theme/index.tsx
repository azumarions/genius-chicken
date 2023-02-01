import React, { createContext, Dispatch, useState } from "react";

type ColorContextType = {
    selectedColor: string
    setSelectedColor: Dispatch<React.SetStateAction<string>>
  }
  
  interface ColorContextProviderProps {
    children: React.ReactNode
  }
  
export const ColorContext = createContext<ColorContextType>(
  {} as {
    selectedColor: string
    setSelectedColor: Dispatch<React.SetStateAction<string>>
  }
);

export default function ColorContextProvider({ children }: ColorContextProviderProps) {
  const [selectedColor, setSelectedColor] = useState<string>("green");
  return (
    <ColorContext.Provider
      value={{
        selectedColor,
        setSelectedColor,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
}