import React, { useEffect, useState } from "react";
import Navbar from "../components/NavbarHome";
import SubgCard from "../components/SubgCard"
import { useSubgreddiitsContext } from "../hooks/useSubgreddiitsContext";
import { useAuthContext } from "../hooks/useAuthContext";

function Subgreddiits() {
  const { dispatch } = useSubgreddiitsContext();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true)
  const [subgreddiits, setSubgreddiits] = useState()
  const [joinedList, setJoinedList] = useState()
  const [restList, setRestList] = useState()
  const [search, setSearch] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [allTags, setAllTags] = useState([])

  useEffect(() => {
    dispatch({ type: "SET_SUBGREDDIITS", payload: null });

    const fetchSubgreddiits = async () => {
      const response = await fetch("/api/subgreddiit", {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      const data = await response.json()

      if (response.ok) {
        console.log("lessgo")
        setSubgreddiits(data.filter(value => value === value))
        data.forEach(value => {
          value.tags.forEach(tag => {
            setAllTags(pv => {
              return ([...pv, tag])
            })
          })
        })
        var tmpArr = data.filter(subg => subg.followers.some(value => value === user.userName))
        setJoinedList(tmpArr)
        tmpArr = (data.filter(({ title: title1 }) => !(tmpArr.some(({ title: title2 }) => title2 === title1))))
        setRestList(tmpArr)
        dispatch({ type: "SET_SUBGREDDIITS", payload: data });
      }
      setIsLoading(false)
    }

    if (user) {
      fetchSubgreddiits()
    }

  }, [dispatch, user]);

  const handleSortName = () => {
    var tmpArr = []
    joinedList.forEach(value => tmpArr.push(value))
    tmpArr.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    setJoinedList(tmpArr)
    tmpArr = []
    restList.forEach(value => tmpArr.push(value))
    tmpArr.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    setRestList(tmpArr)
  }

  const handleSortUsers = () => {
    var tmpArr = []
    joinedList.forEach(value => tmpArr.push(value))
    tmpArr.sort((a, b) => (a.followers.length > b.followers.length) ? 1 : ((b.followers.length > a.followers.length) ? -1 : 0))
    setJoinedList(tmpArr)
    tmpArr = []
    restList.forEach(value => tmpArr.push(value))
    tmpArr.sort((a, b) => (a.followers.length > b.followers.length) ? 1 : ((b.followers.length > a.followers.length) ? -1 : 0))
    setRestList(tmpArr)
  }

  const handleSortCreatedAt = () => {
    var tmpArr = []
    joinedList.forEach(value => tmpArr.push(value))
    tmpArr.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0))
    setJoinedList(tmpArr)
    tmpArr = []
    restList.forEach(value => tmpArr.push(value))
    tmpArr.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0))
    setRestList(tmpArr)
  }

  const handleSearch = () => {
    var data = []
    if (!search) {
      subgreddiits && subgreddiits.forEach((value) => data.push(value))
    } else {
      data = subgreddiits.filter((value) => value.title.toLowerCase().match(search.toLowerCase()))
      console.log(tmpArr)
    }
    var tmpArr = data.filter(subg => subg.followers.some(value => value === user.userName))
    setJoinedList(tmpArr)
    console.log(tmpArr)

    tmpArr = (data.filter(({ title: title1 }) => !(tmpArr.some(({ title: title2 }) => title2 === title1))))
    setRestList(tmpArr)
    console.log(tmpArr)
  }

  useEffect(() => {
    handleSearch()
  }, [search])

  const handleRemoveTag = (event) => {
    const tagname = event.target.name
    setSelectedTags(selectedTags.filter(value => value !== tagname))
    setAllTags((pv) => [...pv, tagname])
    var data = []
    subgreddiits.forEach((value) => value.tags.forEach(tag => {
      if (selectedTags.includes(tag)) {
        data.push(value)
      }
    }))
    console.log(data)
    var tmpArr = data.filter(subg => subg.followers.some(value => value === user.userName))
    setJoinedList(tmpArr)
    tmpArr = (data.filter(({ title: title1 }) => !(tmpArr.some(({ title: title2 }) => title2 === title1))))
    setRestList(tmpArr)
  }

  const handleSelectTag = (event) => {
    const tagname = event.target.name
    setSelectedTags((pv) => [...pv, tagname])
    setAllTags(allTags.filter(value => value !== tagname))
    var data = []
    subgreddiits.forEach((value) => value.tags.forEach(tag => {
      if (selectedTags.includes(tag)) {
        data.push(value)
      }
    }))
    console.log(data)
    var tmpArr = data.filter(subg => subg.followers.some(value => value === user.userName))
    setJoinedList(tmpArr)
    tmpArr = (data.filter(({ title: title1 }) => !(tmpArr.some(({ title: title2 }) => title2 === title1))))
    setRestList(tmpArr)
  }

  return (
    isLoading ? <h1>Loading...</h1>
      :
      <>
        <Navbar />
        <div className="input-group" style={{ marginLeft: "4%" }}>
          <div className="form-outline">
            <input type="search" id="form1" className="form-control" style={{ width: "20em" }} onChange={(e) => setSearch(e.target.value)} value={search} />
            <label className="form-label" for="form1"></label>
          </div>
          <button type="button" className="btn btn-danger" style={{ height: "39px" }}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <br />
        <div className="subgreddiits" style={{ paddingTop: "0em" }}>
          <div style={{ paddingBottom: "1em" }}>
            <h3>Tags: </h3>
            {allTags[0] && allTags.map(tag => {
              return <button className="tags" name={tag} onClick={handleSelectTag}>{tag}</button>
            })
            }
            <br />
            <h3>Selected Tags: </h3>
            {selectedTags[0] && selectedTags.map(tag => {
              return <button className="tags" name={tag} onClick={handleRemoveTag}>{tag}</button>
            })
            }
          </div>
          <div className="btn-group dropleft" style={{ float: "right", marginRight: "5%" }}>
            <button type="button" id="dropdownMenu" data-toggle="dropdown" className="btn btn-outline-light dropdown-toggle" style={{ marginLeft: "4%", marginBottom: "1em" }}>Sort</button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu" style={{ background: "#1F1C18", color: "lightgray" }}>
              <button className="dropdown-item" type="button" style={{ color: "lightgray" }} name="title" onClick={handleSortName}>name</button>
              <button className="dropdown-item" type="button" style={{ color: "lightgray" }} name="followers" onClick={handleSortUsers}>followers</button>
              <button className="dropdown-item" type="button" style={{ color: "lightgray" }} name="createdAt" onClick={handleSortCreatedAt}>created at</button>
            </div>
          </div>
          {joinedList[0] &&
            <>
              <h5 style={{ color: "lightgray", paddingBottom: "1em" }}>Joined List</h5>
              {joinedList.map((e) => {
                return <SubgCard curr_sg={e} owns={true} isdisabled={(e.userName === user.userName)} />
              })}
            </>
          }
          {restList[0] &&
            <>
              <h5 style={{ color: "lightgray", paddingBottom: "1em" }}>Rest List</h5>
              {restList.map((e) => {
                return <SubgCard curr_sg={e} owns={false} isrequested={e.requests.filter(value => value === user.userName)[0]} />
              })}
            </>
          }
        </div>
      </>
  );
}

export default Subgreddiits;