import React from "react"

function Upvote(props) {
  return (
    <button style={{ background: "transparent", border: "none", color: "lightgrey", fill: "green", paddingLeft: "0em" }}><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="26" height="27">
      <line x1="10" y1="13.5" x2="10" y2="25.5" style={{ stroke: "green", strokeWidth: "3" }} />
      <line x1="4" y1="15" x2="11" y2="15" style={{ stroke: "green", strokeWidth: "3" }} />
      <line x1="20" y1="13.5" x2="20" y2="25.5" style={{ stroke: "green", strokeWidth: "3" }} />
      <line x1="19" y1="15" x2="26" y2="15" style={{ stroke: "green", strokeWidth: "3" }} />
      <line x1="5" y1="14.5" x2="16" y2="3.5" style={{ stroke: "green", strokeWidth: "3" }} />
      <line x1="25" y1="14.5" x2="14" y2="3.5" style={{ stroke: "green", strokeWidth: "3" }} />
    </svg>{props.value}</button>
  )
}

export default Upvote