import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function Signin() {
  const {login, error} = useLogin();
  const [state, setState] = useState({
    uname: "",
    pword: ""
  });

  const buttonStyle = {
    backgroundColor: "#E50914"
  };

  function handleChange(e) {
    const {name, value} = e.target;
    setState(pv => {
      return {
        ...pv,
        [name]: value
      };
    });
    console.log(state);
  }

  async function submitHandler(e) {
    e.preventDefault();
    await login(state.uname, state.pword)
  }
  
  return (
    <div className="card center">
      <div className="card-body">
        <h3 className="card-title">Sign In</h3>
        <form onSubmit={submitHandler}>
          <div className="form-floating">
            <input onChange={handleChange} name="uname" type="text" className="form-control" placeholder="username" value={state.uname}></input>
            <label for="floatingInput">UserName</label>
          </div>
          <br/>
          <div className="form-floating">
            <input onChange={handleChange} name="pword" type="password" className="form-control" placeholder="Password" value={state.pword}></input>
            <label for="floatingInput">Password</label>
          </div>
          <br/>
          <button className="btn card-btn col-12" style={buttonStyle} type="submit" disabled={!(state.uname && state.pword)}>Sign In</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Signin;