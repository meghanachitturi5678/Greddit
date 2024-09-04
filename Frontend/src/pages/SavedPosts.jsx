import React, { useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import Navbar from "../components/NavbarHome";
import PostCard from "../components/PostCard";

function SavedPosts() {
  const { user } = useAuthContext()
  const [savedPosts, setSavedPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      })

      const data = await response.json()
      console.log(data)
      console.log(data.savedposts)

      if (response.ok) {
        data.savedposts.map(async (postId) => {
          const responseposts = await fetch("/api/post/id/" + postId, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.token}`
            }
          })

          const dataposts = await responseposts.json()
          console.log(dataposts)

          if (responseposts.ok) {
            console.log([dataposts.comments])
            setSavedPosts((pv) => {
              return ([
                ...pv,
                dataposts
              ])
            })
          }
        })
      }
      setIsLoading(false)
    }

    fetchSavedPosts()
  }, [])

  return (
    isLoading ? <h1>Loading...</h1>
      :
      <>
        <Navbar />
        <h3 style={{ color: "red", marginLeft: "4%", paddingLeft: "1em" }}>Saved Posts</h3>
        <div className="subgreddiits">
          {savedPosts && savedPosts.map((e) => 
            <PostCard post={e} isSaved={true}/>
          )}
        </div>
      </>
  )
}

export default SavedPosts;