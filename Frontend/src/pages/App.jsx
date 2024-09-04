import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Enter from "./Enter";
import Home from "./Home";
import Profile from "./Profile";
import MySubgreddiits from "./MySubgreddiits";
import Subgreddiits from "./Subgreddiits";
import MySubgreddiitDetails from "./MySubgreddiitDetails";
import SubgreddiitDetails from "./SubgreddiitDetails";
import { useAuthContext } from "../hooks/useAuthContext";
import SavedPosts from "./SavedPosts";

function App() {
  const { user, isLoading } = useAuthContext();

  return (
    (isLoading) ? <h1>Loading...</h1>
      :
      <Routes>
        <Route path="/" element={!user ? <Enter /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
        <Route path="/mysubgreddiits" element={user ? <MySubgreddiits /> : <Navigate to="/" />} />
        <Route path="/subgreddiits" element={user ? <Subgreddiits /> : <Navigate to="/" />} />
        <Route path="/mysubgreddiit/:title" element={user ? <MySubgreddiitDetails /> : <Navigate to="/" />} />
        <Route path="/subgreddiit/:title" element={user ? <SubgreddiitDetails /> : <Navigate to="/" />} />
        <Route path="/savedposts" element={user ? <SavedPosts /> : <Navigate to="/" />} />
      </Routes>
  );
}

export default App;