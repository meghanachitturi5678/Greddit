import React, { useEffect, useState } from "react";
import Navbar from "../components/NavbarHome";
import SubgForm from "../components/SubgForm";
import MySubgCard from "../components/MySubgCard"
import { useSubgreddiitsContext } from "../hooks/useSubgreddiitsContext";
import { useAuthContext } from "../hooks/useAuthContext";

function MySubgreddiits() {
  const { subgreddiits, dispatch } = useSubgreddiitsContext();
  const { user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch({ type: "SET_SUBGREDDIITS", payload: null });

    const fetchSubgreddiits = async () => {
      const response = await fetch("/api/mysubgreddiit", {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      const data = await response.json()

      if (response.ok) {
        console.log("lessgo")
        dispatch({ type: "SET_SUBGREDDIITS", payload: data });
      }
      setIsLoading(false)
    }

    if (user) {
      fetchSubgreddiits()
    }
    
  }, [dispatch, user]);

  return (
    isLoading ? <h1>Loading...</h1>
      :
      <>
        <Navbar />
        <SubgForm />
        <div className="subgreddiits">
          {subgreddiits && subgreddiits.map((e) => (
            <MySubgCard curr_sg={e} />
          ))}
        </div>
      </>
  );
}

export default MySubgreddiits;