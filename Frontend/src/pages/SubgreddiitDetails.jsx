import React, { useState, useEffect } from "react"
import Navbar from "../components/NavbarHome";
import { useParams } from "react-router"
import { useAuthContext } from "../hooks/useAuthContext"
import Posts from "../components/Posts"

function SubgreddiitDetails() {
  const { title } = useParams()
  const { user } = useAuthContext()

  const [subgreddiit, setSubgreddiit] = useState()
  const [error, setError] = useState("")

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSubbgreddiit = async () => {
      if (!user) {
        return
      }

      const response = await fetch("/api/subgreddiit/" + title, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        console.log(data.error)
        setError(data.error)
      } else {
        console.log(data)
        setSubgreddiit(data)
      }
      setIsLoading(false)
    }

    if (user) {
      getSubbgreddiit()
    }
  }, [])

  return (
    isLoading ? <h1>Loading...</h1>
      :
      error ? <h1>No subgreddiit found</h1>
        :
        <>
          <Navbar />
          <div className="subgreddiits" style={{paddingBottom: "1.5em"}}>
            <div className="card subg-card">
              <div className="card-body">
                <div className="card-title subg-title">
                  <h2 className="" style={{ marginTop: "1%", color: "red" }}>{subgreddiit.title}</h2>
                </div>
                <p style={{ fontSize: "large" }}>{subgreddiit.content}</p>
                <ul style={{ color: "gray" }}>
                  <li>
                    posts: {subgreddiit.post.length}
                  </li>
                  <li>
                    users: {subgreddiit.followers.length}
                  </li>
                  <li>
                    banned keywords: {subgreddiit.bannedKeywords.map(e => <p className="inline">{e}</p>)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Posts subgtitle={subgreddiit.title} banned={subgreddiit.bannedKeywords}/>
        </>
  )
}

export default SubgreddiitDetails;