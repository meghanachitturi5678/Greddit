import React, { useState } from "react";
import { useSubgreddiitsContext } from "../hooks/useSubgreddiitsContext";
import { useAuthContext } from "../hooks/useAuthContext";

function SubgForm() {
  const { dispatch } = useSubgreddiitsContext();
  const { user } = useAuthContext();
  
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState([])
  const [bannedKeywords, setBannedKeywords] = useState([])
  const [error, setError] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("not logged in")
      return
    }

    const subgreddiit = { title, content, tags, bannedKeywords, followers: [user.userName] }
    console.log(JSON.stringify(subgreddiit))

    const response = await fetch("/api/mysubgreddiit", {
      method: "POST",
      body: JSON.stringify(subgreddiit),
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
      console.log("added new subgreddiit", data)
      dispatch({ type: "ADD_SUBGREDDIIT", payload: data })
    }

    setError("")
    setTitle("")
    setContent("")
    setTags([])
    setBannedKeywords([])
  }

  function handleSlice(e) {
    const wordsArr = e.target.value.split(",").map((value) => value.trim())
    if (e.target.name === "tags") {
      setTags(wordsArr)
    } else {
      setBannedKeywords(wordsArr)
    }
  }

  return (
    <>
      <button id="createSubg" data-toggle="modal" data-target="#createSgModal" style={{marginLeft: "4%", background: "transparent", border: "none", color: "lightgray", paddingLeft: "4px" }}><h5>Create Subgreddiit</h5></button>
      <div className="modal fade" id="createSgModal" tabindex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
          <div className="modal-content" style={{padding: "10px 0"}}>
            <div className="modal-header">
              <h4 className="modal-title" style={{Align: "center"}}>Create Subgreddiit</h4>
            </div>
            <div className="modal-body" style={{padding:"4% 6%"}}>
              <form onSubmit={submitHandler} style={{paddingBottom: "8%"}}>
                <div className="form-floating">
                  <input name="title" type="text" className="form-control" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title}></input>
                  <label for="floatingInput">Title</label>
                </div>
                <br />
                <div className="form-floating">
                  <input name="content" type="text" className="form-control" placeholder="Content" onChange={(e) => setContent(e.target.value)} value={content}></input>
                  <label for="floatingInput">Content</label>
                </div>
                <br />
                <div className="form-floating">
                  <input name="tags" type="text" className="form-control" placeholder="Tags" onChange={handleSlice} value={tags}></input>
                  <label for="floatingInput">Tags</label>
                </div>
                <br />
                <div className="form-floating">
                  <input name="bannedKeywords" type="text" className="form-control" placeholder="Banned Keywords" onChange={handleSlice} value={bannedKeywords}></input>
                  <label for="floatingInput">Banned Keywords</label>
                </div>
                <br />
                <button className="btn card-btn col-12" type="submit" dismiss="modal">Create</button>
                {error && <div className="error">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubgForm;