import React, { useState } from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

function Enter() {
  const [click, setClick] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  function handleClick(event) {
    event.preventDefault();
    const {name} = event.target;
    if (name === "login") {
      setIsRegistered(true);
    } else if (name === "signup") {
      setIsRegistered(false);
    }
    setClick(true);
  }

  function homepage(event) {
    event.preventDefault();
    setClick(false);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand"><div onClick={homepage}><h1>Greddiit</h1></div></a>
        <ul className="navbar-nav red-nav ml-auto ms-auto">
          <li className="nav-item">
            <button className="btn auth-btn" style={{padding: "0.2em 0"}} onClick={handleClick} name="login">Sign In</button>
            <button className="btn auth-btn" style={{padding: "0.2em 0"}} onClick={handleClick} name="signup">Sign Up</button>
          </li>
        </ul>
      </nav>
      {click && ((isRegistered) ? <Signin/>: <Signup/>)}
    </div>
  );
}

export default Enter;