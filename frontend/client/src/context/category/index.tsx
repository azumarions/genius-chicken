import React, { createContext, Dispatch, useState } from "react";
import { CATEGORY } from "../../types"

type CategoryContextType = {
    category: CATEGORY
    setCategory: Dispatch<React.SetStateAction<CATEGORY>>
    categorys: CATEGORY[]
    setCategorys: Dispatch<React.SetStateAction<CATEGORY[]>>
  }
  
  interface CategoryContextProviderProps {
    children: React.ReactNode
  }
  
  export const CategoryContext = createContext<CategoryContextType>(
    {} as {
        category: CATEGORY
        setCategory: Dispatch<React.SetStateAction<CATEGORY>>
        categorys: CATEGORY[]
        setCategorys: Dispatch<React.SetStateAction<CATEGORY[]>>
    }
  );

export default function CategoryContextProvider({ children }: CategoryContextProviderProps) {
  const [category, setCategory] = useState({id: 0, item: "",});
  const [categorys, setCategorys] = useState([{ id: 0, item: "", }]);
  return (
    <CategoryContext.Provider
      value={{
        category,
        setCategory,
        categorys,
        setCategorys
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}