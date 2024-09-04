import React, { useState } from "react"
import { useNavigate } from "react-router"
import { useAuthContext } from "../hooks/useAuthContext"

const SubgCard = (props) => {
  const { user } = useAuthContext()

  const [owns, setOwns] = useState(props.owns)
  const [isrequested, setIsrequested] = useState(props.isrequested)

  const requestSubgreddiit = async (event) => {
    const response = await fetch("/api/subgreddiit/request/" + props.curr_sg.title, {
      method: "PATCH",
      body: JSON.stringify({ userName: user.userName }),
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (response.ok) {
      alert("request sent")
      setIsrequested(true)
    } else {
      alert(data.error)
    }
  }

  const deletePostinSubg = async (postId) => {
    console.log(postId)
    const response = await fetch("/api/subgreddiit/post/leave/" + props.curr_sg.title, {
      method: "PATCH",
      body: JSON.stringify({ _id: postId }),
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  const deletePost = async (_id) => {
    const response = await fetch("/api/post/" + _id, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  const handleLeave = async () => {
    const response = await fetch("/api/post/leave/" + props.curr_sg.title, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    console.log(data)

    data.forEach(value => {
      deletePost(value._id)
      deletePostinSubg(value._id)
    })
  }

  const leaveSubgreddiit = async () => {
    const response = await fetch("/api/subgreddiit/leave/" + props.curr_sg.title, {
      method: "PATCH",
      body: JSON.stringify({ userName: user.userName }),
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (response.ok) {
      handleLeave()
      setOwns(false)
    } else {
      alert(data.error)
    }
  }

  const cancelRequest = async () => {
    const response = await fetch("/api/subgreddiit/cancel/" + props.curr_sg.title, {
      method: "PATCH",
      body: JSON.stringify({ userName: user.userName }),
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (response.ok) {
      alert("cancelled request")
      setIsrequested(false)
    } else {
      alert(data.error)
    }
  }

  const navigate = useNavigate()

  function openSubgreddiit(e) {
    e.preventDefault()
    navigate("/subgreddiit/" + props.curr_sg.title)
  }

  return (
    <>
      <div className="card subg-card">
        <div className="card-body">
          <div className="card-title subg-title">
            <h2 className="" style={{ marginTop: "1%", color: "red" }}>{props.curr_sg.title}</h2>
          </div>
          <p style={{ fontSize: "large" }}>{props.curr_sg.content}</p>
          <ul style={{ color: "gray" }}>
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
              banned keywords: {props.curr_sg.bannedKeywords.map(e => <p className="inline" style={{ marginBottom: "0em" }}>{e}</p>)}
            </li>
          </ul>
        </div>
        <div class="card-footer text-muted">
          {!owns ?
            isrequested ?
              <button className="btn dlt-btn" style={{ borderRadius: "0.5em" }} onClick={cancelRequest}>Cancel Request</button>
              :
              <button className="btn dlt-btn" style={{ borderRadius: "0.5em" }} onClick={requestSubgreddiit}>Request Join</button>
            :
            <>
              <button className="btn dlt-btn" style={{ borderRadius: "0.5em", marginRight: "1em" }} onClick={openSubgreddiit}>Open</button>
              <button className="btn dlt-btn" style={{ borderRadius: "0.5em" }} onClick={leaveSubgreddiit} disabled={props.isdisabled}>Leave</button>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default SubgCard;