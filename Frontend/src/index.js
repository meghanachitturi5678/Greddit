import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SubgreddiitsContextProvider } from "./context/SubgreddiitsContext";
import { AuthContextProvider } from "./context/AuthContext";
import App from "./pages/App";

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <SubgreddiitsContextProvider>
        <App />
      </SubgreddiitsContextProvider>
    </AuthContextProvider>
  </BrowserRouter>, 
  document.getElementById("root"));