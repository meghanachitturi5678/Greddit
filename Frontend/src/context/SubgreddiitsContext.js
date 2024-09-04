import React, { createContext, useReducer } from "react";

export const SubgreddiitsContext = createContext();

export const SubgreddiitsReducer = (state, action) => {
  switch (action.type) {
    case "SET_SUBGREDDIITS":
      return {
        subgreddiits: action.payload
      };
    case "ADD_SUBGREDDIIT":
      return {
        subgreddiits: [action.payload, ...state.subgreddiits]
      };
    case "DEL_SUBGREDDIIT":
      return {
        subgreddiits: state.subgreddiits.filter(
          (subgreddiit) => (subgreddiit.title !== action.payload)
        )
      };
    default:
      return state;
  }
};

export const SubgreddiitsContextProvider = ({ children }) => {
  const [subgreddiits, dispatch] = useReducer(SubgreddiitsReducer, {
    subgreddiits: null
  });

  return (
    <SubgreddiitsContext.Provider value={{ ...subgreddiits, dispatch }}>
      {children}
    </SubgreddiitsContext.Provider>
  )
}