import React, { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";

const ReportCard = (props) => {
  const { user } = useAuthContext();
  const [ignore, setIgnore] = useState(props.post.status)

  const handleIgnore = async () => {
    alert("ignoring "+props.post._id+props.post.concern+props.post.reportedBy)
    const response = await fetch("/api/mysubgreddiit/ignore/report/" + props.post.subgreddiitTitle, {
      method: "PATCH",
      body: JSON.stringify({ postId: props.post._id, reportedBy: props.post.reportedBy }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (response.ok) {
      alert("ignored")
      console.log(data)
      setIgnore(true)
    } else {
      console.log(data.error)
    }
  }

  const deletePostinSubg = async (postId) => {
    console.log(postId)
    const response = await fetch("/api/subgreddiit/post/leave/" + props.post.subgreddiitTitle, {
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

  const deleteReport = async () => {
    const response = await fetch("/api/mysubgreddiit/delete/report/" + props.post.subgreddiitTitle, {
      method: "PATCH",
      body: JSON.stringify({ 
        postId: props.post._id,
        reportedBy: props.post.reportedBy
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      console.log(data.error)
    } else {
      console.log(data)
    }
  }

  const handleDelete = async () => {
    deleteReport()
    deletePostinSubg(props.post._id)
    deletePost(props.post._id)

    alert("deleted")
  }

  const handleBlock = async () => {
    const response = await fetch("/api/mysubgreddiit/block/report/" + props.post.subgreddiitTitle, {
      method: "PATCH",
      body: JSON.stringify({ 
        blockusername: props.post.userName
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      console.log(data.error)
    } else {
      console.log(data)
    }
  }

  return (
    <>
      <div className="card subg-card">
        <div className="card-body">
          <div className="card-title subg-title">
            <h4 className="" style={{ marginTop: "1%", color: "lightgray" }}>{props.post.content}</h4>
            <p className="inline">posted by {props.post.userName},</p>
            <p className="inline">reported by {props.post.reportedBy}</p>
            <p style={{ color: "red" }}><em>concern:</em> {props.post.concern}</p>
          </div>
        </div>
        <div className="card-footer text-muted">
          <button style={{ background: "transparent", border: "none", color: "lightblue", paddingLeft: "0em" }} onClick={handleIgnore}>ignore</button>
          <button style={{ background: "transparent", border: "none", marginLeft: "1em", color: "orange" }} disabled={ignore} onClick={handleBlock}>block user</button>
          <button style={{ background: "transparent", border: "none", marginLeft: "1em", color: "red" }} disabled={ignore} onClick={handleDelete}>delete post</button>
        </div>
      </div>
    </>
  )
}

export default ReportCard;