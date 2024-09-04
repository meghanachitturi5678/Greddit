import React, { useEffect, useState } from "react";
import Navbar from "../components/NavbarHome";
import { useAuthContext } from "../hooks/useAuthContext";

function Profile() {
  const { user } = useAuthContext();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    phoneNumber: 0,
    followers: [],
    following: []
  });

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserDetails = async () => {
      console.log("lessgo")
      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      })

      const data = await response.json()

      if (response.ok) {
        console.log("lessgo")
        setState({
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          phoneNumber: data.phoneNumber,
          followers: data.followers,
          following: data.following
        })
      }
      setIsLoading(false)
    }

    fetchUserDetails()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target;
    setState(pv => {
      return {
        ...pv,
        [name]: value
      };
    });
    console.log(state);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(JSON.stringify(state))

    const response = await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    })

    const data = await response.json()
    console.log(data)

    if (!response.ok) {
      alert(data.error)
    } else {
      alert("details updated successfully")
    }
  }

  const removeFollower = async (userName) => {
    const response = await fetch("/api/user/remove", {
      method: "PATCH",
      body: JSON.stringify({removeUserName: userName}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    })

    const data = await response.json()
    console.log(data)

    if (!response.ok) {
      alert(data.error)
    } else {
      console.log("removed successfully")
      setState((pv) => ({
        ...pv,
        followers: state.followers.filter((value) => value !== userName)
      }))
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setState(pv => {
      return {
        ...pv,
        [name]: value
      };
    });
    console.log(state);
  }

  const handleUnfollow = async (userName) => {
    const response = await fetch("/api/user/unfollow", {
      method: "PATCH",
      body: JSON.stringify({unfollowUserName: userName}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    })

    const data = await response.json()
    console.log(data)

    if (!response.ok) {
      alert(data.error)
    } else {
      console.log("unfollowed successfully")
      setState((pv) => ({
        ...pv,
        following: state.following.filter((value) => value !== userName)
      }))
    }
  }

  return (
    isLoading ? <h1>Loading...</h1>
      :
      <>
        <Navbar />
        <div className="row parent-row">
          <div className="col-md-4 dp-div">
            <img src="https://images.infoseemedia.com/wp-content/uploads/2022/01/Sunset-nature-dp-image.jpg" id="dp" alt="profile-photo"></img>
          </div>
          <div className="col-md-8" style={{ paddingLeft: "15px" }}>
            <h3 style={{ display: "inline-block", marginRight: "1em" }}>{user.userName}</h3>
            <button id="editProfile" className="btn" data-toggle="modal" data-target="#editModal" style={{ display: "inline-block", width: "auto", border:"transparent", borderRadius: "50%", color: "darkgrey", paddingBottom: "0.85em" }}><i class="fa-solid fa-pen-to-square"></i></button>
            <div className="modal fade" id="editModal" tabindex="-1" role="dialog">
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" style={{ padding: "0 4%" }}>Profile</h5>
                    <button type="button" className="close" style={{ border: "none", background: "transparent" }} data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body" style={{ padding: "2em 6% 4em" }}>
                    <form onSubmit={handleSubmit}>
                      <div className="sidewise">
                        <div className="form-floating" style={{ width: "48%" }}>
                          <input className="form-control side-button" onChange={handleChange} placeholder="first name" name="firstName" type="text" value={state.firstName}></input>
                          <label for="floatingInput">FirstName</label>
                        </div>
                        <div className="form-floating" style={{ marginLeft: "4%", width: "52%" }}>
                          <input className="form-control" onChange={handleChange} placeholder="last name" name="lastName" type="text" value={state.lastName}></input>
                          <label for="floatingInput">LastName</label>
                        </div>
                      </div>
                      <br />
                      <div className="form-floating">
                        <input className="form-control" placeholder="username" name="uname" type="text" disabled="true" value={user.userName}></input>
                        <label for="floatingInput">UserName</label>
                      </div>
                      <br />
                      <div className="sidewise">
                        <div className="form-floating" style={{ width: "16%" }}>
                          <input className="form-control" onChange={handleChange} placeholder="age" name="age" type="number" value={state.age}></input>
                          <label for="floatingInput">Age</label>
                        </div>
                        <div className="form-floating" style={{ marginLeft: "4%", width: "84%" }}>
                          <input className="form-control" onChange={handleChange} placeholder="phone number" name="phoneNumber" type="text" value={state.phoneNumber}></input>
                          <label for="floatingInput">PhoneNumber</label>
                        </div>
                      </div>
                      <br />
                      <button class="btn card-btn col-12" style={{ backgroundColor: "#E50914" }} type="submit">Save</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row follow" style={{ margin: "1em 0" }}>
              <button id="followers" className="btn inline" data-toggle="modal" data-target="#followersModal" style={{ border: "none", color: "lightgray", paddingLeft: "0" }}><h5>{state.followers.length} followers</h5></button>
              <button id="following" className="btn inline" data-toggle="modal" data-target="#followingModal" style={{ marginRight: "0em", border: "none", color: "lightgray", paddingRight: "0" }}><h5>{state.following.length} following</h5></button>
            </div>
            <div className="row">
              <p style={{ color: "lightgray" }}>hello</p>
              <p style={{ color: "lightgray" }}>melophile</p>
            </div>
          </div>
        </div>
        <div className="modal fade" id="followersModal" tabindex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Followers</h5>
                <button type="button" className="close" style={{ border: "none", background: "transparent" }} data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {state.followers.map((e) => (
                  <>
                    <p style={{ marginLeft: "0.5em", display: "inline-block", marginTop: "0.5em" }}>{e}</p>
                    <button className="btn dlt-btn" style={{ borderRadius: "0.5em", float: "right", marginRight: "1em" }} onClick={() => removeFollower(e)}>remove</button>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="followingModal" tabindex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Following</h5>
                <button type="button" className="close" style={{ border: "none", background: "transparent" }} data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {state.following.map((e) => (
                  <>
                    <p style={{ marginLeft: "0.5em", display: "inline-block", marginTop: "0.5em" }}>{e}</p>
                    <button className="btn dlt-btn" style={{ borderRadius: "0.5em", float: "right", marginRight: "1em" }} onClick={() => handleUnfollow(e)}>unfollow</button>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default Profile;