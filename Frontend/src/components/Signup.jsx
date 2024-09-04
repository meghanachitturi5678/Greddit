import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup"

function Signup() {
  const [state, setState] = useState({
    fname: "",
    lname: "",
    uname: "",
    pword: "",
    cpword: "",
    age: "",
    phno: ""
  });

  const {signup, error} = useSignup()

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

  function submitHandler(e) {
    e.preventDefault();
    signup(state.fname, state.lname, state.uname, state.cpword, state.age, state.phno)
  }

  return (
    <div class="card center">
      <div class="card-body">
        <h3 class="card-title">Sign Up</h3>
        <form onSubmit={submitHandler}>
          <div class="sidewise">
            <div className="form-floating" style={{ width: "48%" }}>
              <input onChange={handleChange} className="form-control side-button" placeholder="first name" name="fname" type="text" value={state.fname}></input>
              <label for="floatingInput">FirstName</label>
            </div>
            <div className="form-floating" style={{ marginLeft: "4%", width: "48%" }}>
              <input onChange={handleChange} className="form-control" placeholder="last name" name="lname" type="text" value={state.lname}></input>
              <label for="floatingInput">LastName</label>
            </div>
          </div>
          <br />
          <div className="form-floating">
            <input onChange={handleChange} className="form-control" placeholder="username" name="uname" type="text" value={state.uname}></input>
            <label for="floatingInput">UserName</label>
          </div>
          <br />
          <div className="form-floating">
            <input onChange={handleChange} className="form-control" placeholder="password" name="pword" type="password" value={state.pword}></input>
            <label for="floatingInput">Password</label>
          </div>
          <br />
          <div className="form-floating">
            <input onChange={handleChange} className="form-control" placeholder="confirm password" name="cpword" type="password" value={state.cpword}></input>
            <label for="floatingInput">ConfirmPassword</label>
          </div>
          <br />
          <div class="sidewise">
            <div className="form-floating" style={{ width: "20%" }}>
              <input onChange={handleChange} className="form-control" placeholder="age" name="age" type="number" value={state.age}></input>
              <label for="floatingInput">Age</label>
            </div>
            <div className="form-floating" style={{ marginLeft: "4%", width: "76%" }}>
              <input onChange={handleChange} className="form-control" placeholder="phone number" name="phno" type="text" value={state.phno}></input>
              <label for="floatingInput">PhoneNumber</label>
            </div>
          </div>
          <br />
          <button class="btn card-btn col-12" style={{ backgroundColor: "#E50914" }} type="submit" disabled={!(state.fname && state.lname && state.uname && state.pword && state.cpword && state.age && state.phno && (state.pword === state.cpword))}>Sign Up</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Signup;