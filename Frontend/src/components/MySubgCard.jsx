import React from "react"
import { useNavigate } from "react-router";
import { useSubgreddiitsContext } from "../hooks/useSubgreddiitsContext";
import { useAuthContext } from "../hooks/useAuthContext";


const MySubgCard = (props) => {
  const { dispatch } = useSubgreddiitsContext();
  const { user } = useAuthContext();

  const deleteSubgreddiits = async () => {
    if (!user) {
      return
    }

    const response = await fetch("/api/mysubgreddiit/" + props.curr_sg.title, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      console.log(data.error)
    } else {
      dispatch({ type: "DEL_SUBGREDDIIT", payload: data.title })
      console.log("deleted")
    }
  }

  const navigate = useNavigate()

  function handleOpen() {
    navigate("/mysubgreddiit/" + props.curr_sg.title)
  }

  return (
    <>
      <div className="card subg-card">
        <div className="card-body">
          <div className="card-title subg-title">
            <h2 className="" style={{ marginTop: "1%", color: "red" }}>{props.curr_sg.title}</h2>
          </div>
          <p style={{ fontSize: "large" }}>{props.curr_sg.content}</p>
          <ul style={{color:"gray"}}>
            <li>
              posts: {props.curr_sg.post.length}
            </li>
            <li>
              users: {props.curr_sg.followers.length}
            </li>
            <li>
              tags: {props.curr_sg.tags.map(e=><p className="inline" style={{ marginBottom: "0em" }}>{e}</p>)}
            </li>
            <li>
              banned keywords: {props.curr_sg.bannedKeywords.map(e=><p className="inline" style={{ marginBottom: "0em" }}>{e}</p>)}
            </li>
          </ul>
        </div>
        <div class="card-footer text-muted">
          <button className="btn dlt-btn" style={{ borderRadius: "0.5em" }} onClick={handleOpen}>Open</button>
          <button className="btn dlt-btn" style={{ marginLeft: "1em", borderRadius: "0.5em" }} onClick={deleteSubgreddiits}>Delete</button>
        </div>
      </div>
    </>
  )
}

export default MySubgCard;