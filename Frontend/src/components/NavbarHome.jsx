import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useLogout } from "../hooks/useLogout";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const [collapse, setCollapse] = useState(false)

  function handleCollapse() {
    setCollapse(!collapse)
  }

  function handleLogout(event) {
    event.preventDefault();
    logout();
  }

  function showProfile() {
    navigate("/profile");
  }

  function showHome() {
    navigate("/home");
  }

  function showMySubgreddiits() {
    navigate("/mysubgreddiits")
  }

  function showAllSubgreddiits() {
    navigate("/subgreddiits")
  }

  function showSavedPosts() {
    navigate("/savedposts")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand"><div onClick={showHome}><h1>Greddiit</h1></div></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" onClick={handleCollapse} data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" style={{ cursor: "pointer" }} onClick={showMySubgreddiits}><h5 style={{ color: "lightgray" }}>My Subgreddiits</h5></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{ cursor: "pointer" }} onClick={showAllSubgreddiits}><h5 style={{ color: "lightgray" }}>Subgreddiits</h5></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{ cursor: "pointer" }} onClick={showSavedPosts}><h5 style={{ color: "lightgray" }}>Saved Posts</h5></a>
            </li>
          </ul>
          {!collapse
            ?
            <>
              <ul class="navbar-nav ml-auto ms-auto">
                <li className="nav-item" style={{ paddingBottom: "8px", marginRight: "0.25em" }}>
                  <button className="btn btn1 profile-btn" style={{ borderRadius: "50%" }} onClick={showProfile} name="profile"><i className="fa-solid fa-user"></i></button>
                </li>
                <li className="nav-item">
                  <button className="btn auth-btn" onClick={handleLogout} style={{ width: "8em", wordSpacing: "0.5rem", padding: "0.3em 0" }} name="logout">Logout  <i className="fa-solid fa-arrow-right-from-bracket"></i>  </button>
                </li>
              </ul>
            </>
            :
            <>
              <ul class="navbar-nav ml-auto ms-auto">
                <li className="nav-item">
                  <a className="nav-link" style={{ cursor: "pointer" }} onClick={showProfile}><h5 style={{ color: "lightgray" }}>Profile</h5></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" style={{ cursor: "pointer" }} onClick={handleLogout}><h5 style={{ color: "lightgray" }}>Logout</h5></a>
                </li>
              </ul>
            </>
          }
        </div>
      </nav>
      <hr style={{ backgroundColor: "#fff", margin: "0 0 2em 0", height: "3px" }}></hr>
    </>
  )
}

export default Navbar;