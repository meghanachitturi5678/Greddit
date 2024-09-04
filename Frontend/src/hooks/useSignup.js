import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()
  
  const signup = async (firstName, lastName, userName, password, age, phoneNumber) => {
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({firstName, lastName, userName, password, age, phoneNumber}),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.error)
    } else {
      localStorage.setItem('user', JSON.stringify(data))
      dispatch({type: "LOGIN", payload: data})
    }
  }

  return {signup, error}
}