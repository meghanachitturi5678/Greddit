import React, { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";
import Upvote from "./Upvote"
import Downvote from "./Downvote"

const PostCard = (props) => {
  const { user } = useAuthContext();

  const [comments, setComments] = useState(props.post.comments)
  const [comment, setComment] = useState("")
  const [concern, setConcern] = useState("")

  const [upvote, setUpvote] = useState(props.post.upvotes.length)
  const [downvote, setDownvote] = useState(props.post.downvotes.length)

  async function handleUpvote(e) {
    e.preventDefault()
    if (!user) {
      return
    }

    const response = await fetch("/api/post/add/upvote/" + props.post._id, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      console.log(data.error)
    } else {
      setUpvote(data.upvotes.length)
      setDownvote(data.downvotes.length)
      console.log(data)
    }
  }

  async function handleDownvote(e) {
    e.preventDefault()
    if (!user) {
      return
    }

    const response = await fetch("/api/post/add/downvote/" + props.post._id, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      console.log(data.error)
    } else {
      setUpvote(data.upvotes.length)
      setDownvote(data.downvotes.length)
      console.log(data)
    }
  }

  async function handleSave(e) {
    e.preventDefault()
    if (!user) {
      return
    }

    const response = await fetch("/api/user/save/" + props.post._id, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      console.log(data.error)
    } else {
      alert("saved post")
    }
  }

  async function handleRemove() {
    if (!user) {
      return
    }

    const response = await fetch("/api/user/remove/" + props.post._id, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      console.log(data.error)
    } else {
      alert("removed saved post")
    }
  }

  async function handleFollow(e) {
    e.preventDefault()
    if (!user) {
      return
    }

    if (props.post.userName === user.userName) {
      alert("vacuously true")
      return
    }

    const response = await fetch("/api/user/follow", {
      method: "PATCH",
      body: JSON.stringify({ followUserName: props.post.userName }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      console.log(data.error)
    } else {
      alert("following " + props.post.userName)
    }
  }

  async function handleReport() {
    if (!concern) {
      return
    }

    const response = await fetch("/api/subgreddiit/report/" + props.post.subgreddiitTitle, {
      method: "PATCH",
      body: JSON.stringify({ postId: props.post._id, concern: concern, status: false, postUser: props.post.userName }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (response.ok) {
      console.log(data)
    } else {
      alert(data.error)
    }
  }

  async function handleComment() {
    if (!comment) {
      return
    }

    const response = await fetch("/api/post/comment/" + props.post._id, {
      method: "PATCH",
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      console.log(data.error)
    } else {
      setComments((pv) => ([
        ...pv,
        comment
      ]))
      setComment("")
    }
  }

  return (
    <>
      <div className="card subg-card">
        <div className="card-body">
          <div className="card-title subg-title">
            <h4 className="" style={{ marginTop: "1%", color: "lightgray" }}>{props.post.content}</h4>
            <p>posted by {props.post.userName}</p>
          </div>
        </div>
        <div className="card-footer text-muted">
          <div onClick={handleUpvote} style={{ display: "inline-block" }}><Upvote value={upvote} /></div>
          <div onClick={handleDownvote} style={{ display: "inline-block" }}><Downvote value={downvote} /></div>
          <button style={{ background: "transparent", border: "none", marginLeft: "1em", color: "lightblue" }} onClick={props.isSaved ? handleRemove : handleSave}>{props.isSaved ? "remove" : "save"}</button>
          <button style={{ background: "transparent", border: "none", marginLeft: "1em", color: "green" }} onClick={handleFollow}>follow</button>
          <button type="button" className="btn" data-toggle="collapse" data-target={"#concernForm" + props.post._id} style={{ background: "transparent", border: "none", marginLeft: "1em", color: "red", display: "inline-block" }} disabled={props.post.userName === user.userName}>report</button>
          <button type="button" className="btn" data-toggle="collapse" data-target={"#commentForm" + props.post._id} style={{ background: "transparent", border: "none", marginLeft: "1em", color: "gray" }}>comment</button>
          <div id={"concernForm" + props.post._id} className="collapse in" style={{ marginTop: "1em" }}>
            <input className="" style={{ display: "inline-block", borderRadius: "0.25em" }} type="text" name="report" onChange={(e) => setConcern(e.target.value)} placeholder="concern" value={concern}></input>
            <button className="" style={{ display: "inline-block", background: "transparent", border: "none", color: "green", paddingLeft: "1em" }} onClick={handleReport} data-toggle="collapse" data-target={"#concernForm" + props.post._id}><i className="fa-solid fa-check"></i></button>
            <button className="" style={{ display: "inline-block", background: "transparent", border: "none", color: "red" }} onClick={() => setConcern("")} data-toggle="collapse" data-target={"#concernForm" + props.post._id}><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div id={"commentForm" + props.post._id} className="collapse in" style={{ marginTop: "1em" }}>
            <input className="" style={{ display: "inline-block", borderRadius: "0.25em" }} type="text" name="comment" onChange={(e) => setComment(e.target.value)} placeholder="comment" value={comment}></input>
            <button className="" style={{ display: "inline-block", background: "transparent", border: "none", color: "green", paddingLeft: "1em" }} onClick={handleComment} data-toggle="collapse" data-target={"#commentForm" + props.post._id}><i className="fa-solid fa-check"></i></button>
            <button className="" style={{ display: "inline-block", background: "transparent", border: "none", color: "red" }} onClick={() => setComment("")} data-toggle="collapse" data-target={"#commentForm" + props.post._id}><i className="fa-solid fa-xmark"></i></button>
          </div>
          <br />
          <button type="button" className="btn" data-toggle="collapse" data-target={"#demo" + props.post._id} style={{ color: "gray", paddingLeft: "0" }}>comments: {comments.length}</button>
          <div id={"demo" + props.post._id} className="collapse in">
            <ul className="list-group">
              {comments.map(comment => (
                <li className="list-group-item" style={{ backgroundColor: "rgb(0, 0, 0)", color: "grey", width: "20em", padding: "0.25em 1em" }}>{comment}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostCard;