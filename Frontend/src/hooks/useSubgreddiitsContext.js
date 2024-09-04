import { useContext } from "react";
import { SubgreddiitsContext } from "../context/SubgreddiitsContext";

export const useSubgreddiitsContext = () => {
  const context = useContext(SubgreddiitsContext);

  if (!context) {
    throw new Error("out of bound")
  }

  return context;
}