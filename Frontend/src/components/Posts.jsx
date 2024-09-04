import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router"
import PostCard from "./PostCard"

function Posts(props) {
  const { title } = useParams();
  const { user } = useAuthContext();

  const [posts, setPosts] = useState()
  const [content, setContent] = useState("")
  const [error, setError] = useState("")

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getPosts = async () => {
      if (!user) {
        return
      }

      const response = await fetch("/api/post/subgreddiit/" + title, {
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
        console.log("lessgo")
        console.log(data)
        setPosts(data)
      }
      setIsLoading(false)
    }

    if (user) {
      getPosts()
    }
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("not logged in")
      return
    }

    const wordInString = (sentence, word) => new RegExp('\\b' + word + '\\b', 'i').test(sentence);

    if (props.banned.some(value => wordInString(content, value))) {
      alert("post contains banned words")
    }

    const post = { content, userName: user.userName, subgreddiitTitle: props.subgtitle }
    console.log(JSON.stringify(post))

    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.error)
      return
    } else {
      console.log("added new post", data)
      setPosts([
        ...posts,
        data
      ])

      console.log(JSON.stringify({ _id: data._id }))

      const response1 = await fetch("/api/subgreddiit/post/" + props.subgtitle, {
        method: "PATCH",
        body: JSON.stringify({ _id: data._id }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

      const data1 = await response1.json()

      if (!response1.ok) {
        setError(data1.error)
        return
      } else {
        console.log("added post in subgreddiit")
      }
    }

    setError("")
    setContent("")
  }

  return (
    isLoading ? <h1>Loading...</h1>
      :
      <>
        <button id="createPost" data-toggle="modal" data-target="#createPostModal" style={{ margin: "0 0 1em 4%", background: "transparent", border: "none", color: "lightgray", paddingLeft: "1.75em", display: "block" }}><h5>Create Post</h5></button>
        <div className="modal fade" id="createPostModal" tabindex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div className="modal-content" style={{ padding: "10px 0" }}>
              <div className="modal-header">
                <h4 className="modal-title" style={{ Align: "center" }}>Create Post</h4>
              </div>
              <div className="modal-body" style={{ padding: "4% 6%" }}>
                <form onSubmit={submitHandler} style={{ paddingBottom: "8%" }}>
                  <div className="form-floating">
                    <input name="title" type="text" className="form-control" placeholder="Content" onChange={(e) => setContent(e.target.value)} value={content}></input>
                    <label for="floatingInput">Content</label>
                  </div>
                  <br />
                  <button className="btn card-btn col-12" type="submit" dismiss="modal">Create</button>
                  {error && <div className="error">{error}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
        {posts &&
          <>
            <h3 className="inline" style={{ marginLeft: "4%", paddingLeft: "1em", color: "red" }}>Posts</h3>
            <div className="subgreddiits">
              {posts.map(post => (<PostCard post={post} isSaved={false}/>))}
            </div>
          </>
        }
      </>
  )
}

export default Posts;