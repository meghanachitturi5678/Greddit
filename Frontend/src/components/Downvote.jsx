import React from "react"

function Downvote(props) {
  return (
    <button style={{ background: "transparent", border: "none", color: "lightgrey" }}><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="26" height="27">
      <line x1="10" y1="14.5" x2="10" y2="2.5" style={{ stroke: "red", strokeWidth: "3" }} />
      <line x1="4" y1="13" x2="11" y2="13" style={{ stroke: "red", strokeWidth: "3" }} />
      <line x1="20" y1="14.5" x2="20" y2="2.5" style={{ stroke: "red", strokeWidth: "3" }} />
      <line x1="19" y1="13" x2="26" y2="13" style={{ stroke: "red", strokeWidth: "3" }} />
      <line x1="5" y1="13.5" x2="16" y2="24.5" style={{ stroke: "red", strokeWidth: "3" }} />
      <line x1="25" y1="13.5" x2="14" y2="24.5" style={{ stroke: "red", strokeWidth: "3" }} />
    </svg>{props.value}</button>
  )
}

export default Downvote