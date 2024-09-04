import React, { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
        isLoading: false
      };
    case "LOGOUT":
      return {
        user: null,
        isLoading: false
      };
    default:
      return {
        ...state,
        isLoading: false
      };
  }
};

export const AuthContextProvider = ({ children }) => {
  const [auth, dispatch] = useReducer( AuthReducer, {
    user: null,
    isLoading: true
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({type: "LOGIN", payload: user})
    } else {
      dispatch({})
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}