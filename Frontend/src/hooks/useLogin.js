import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()
  
  const login = async (userName, password) => {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({userName, password}),
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

  return {login, error}
}