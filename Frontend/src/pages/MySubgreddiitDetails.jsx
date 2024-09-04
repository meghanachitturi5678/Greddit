import React, { useEffect, useState } from "react"
import Navbar from "../components/NavbarHome"
import { useParams } from "react-router"
import { useAuthContext } from "../hooks/useAuthContext"
import ReportCard from "../components/ReportCard"

function SubgreddiitDetails() {
  const { title } = useParams()
  const { user } = useAuthContext()

  const [subgreddiit, setSubgreddiit] = useState()
  const [error, setError] = useState("")

  const [isLoading, setIsLoading] = useState(true)

  const [followers, setFollowers] = useState([])
  const [blockedfollowers, setBlockedfollowers] = useState([])
  const [requests, setRequests] = useState([])
  const [reports, setReports] = useState([])

  const [users, setUsers] = useState(false)
  const [followreq, setFollowreq] = useState(false)
  const [report, setReport] = useState(false)

  const getSubbgreddiit = async () => {
    if (!user) {
      return
    }

    const response = await fetch("/api/mysubgreddiit/" + title, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      console.log(data.error)
      setError(data.error)
    } else {
      setSubgreddiit(data)
      setFollowers(data.followers)
      setRequests(data.requests)
      setBlockedfollowers(data.blockedfollowers)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (user) {
      getSubbgreddiit()
    }
  }, [])

  function handleUsers() {
    getSubbgreddiit()
    setUsers(true)
    setFollowreq(false)
    setReport(false)
    console.log(followers, blockedfollowers)
  }

  function handleRequests() {
    setUsers(false)
    setFollowreq(true)
    setReport(false)
    console.log(requests)
  }

  async function handleAccept(userName) {
    if (!user) {
      return
    }

    console.log(userName)
    console.log(JSON.stringify({ userName }))

    const response = await fetch("/api/mysubgreddiit/accept/" + title, {
      method: "PATCH",
      body: JSON.stringify({ userName }),
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (!response.ok) {
      console.log(data.error)
    } else {
      setRequests(subgreddiit.requests.filter((value) => value !== userName))
      setFollowers((pv) => [
        ...pv,
        userName
      ])
      alert("accepted")
    }
  }

  async function handleReject(userName) {
    if (!user) {
      return
    }

    const response = await fetch("/api/mysubgreddiit/reject/" + title, {
      method: "PATCH",
      body: JSON.stringify({ userName }),
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error)
    }
  }

  async function handleReports() {
    setUsers(false)
    setFollowreq(false)
    setReport(true)

    if (!user) {
      return
    }

    getSubbgreddiit()
    console.log(subgreddiit.reportedPosts)
    setReports([])

    await subgreddiit.reportedPosts.map(async (value) => {
      console.log(value)
      const response = await fetch("/api/post/id/" + value.postId, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok) {
        setReports((pv) => ([
          ...pv,
          {
            ...data,
            reportedBy: value.reportedBy,
            concern: value.concern,
            status: value.status
          }
        ]))
      } else {
        console.log(data.error)
      }
    })
    console.log(reports)
  }

  return (
    isLoading ? <h1>Loading...</h1>
      :
      error ? <h1>No subgreddiit found</h1>
        :
        <>
          <Navbar />
          <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "none" }}>
            <>
              <ul className="navbar-nav" style={{ background: "rgb(0,0,0,0.5)", borderRadius: "0.5em", padding: "0.25em 1em", display: "inline-block" }}>
                <li className="nav-item" style={{ paddingRight: "2em", display: "inline-block" }}>
                  <a className="nav-link" style={{ cursor: "pointer" }} onClick={handleUsers}>Users</a>
                </li>
                <li className="nav-item" style={{ paddingRight: "2em", display: "inline-block" }}>
                  <a className="nav-link notification" style={{ cursor: "pointer" }} onClick={handleRequests}><span>Requests</span>{requests[0] && <span class="badge">{requests.length}</span>}</a>
                </li>
                <li className="nav-item" style={{ paddingRight: "2em", display: "inline-block" }}>
                  <a className="nav-link" style={{ cursor: "pointer" }}>Stats</a>
                </li>
                <li className="nav-item" style={{ paddingRight: "0em", display: "inline-block" }}>
                  <a className="nav-link" style={{ cursor: "pointer" }} onClick={handleReports}>Reports</a>
                </li>
              </ul>
            </>
          </nav>
          <>
            {users &&
              <div className="subgreddiits">
                <div className="followers">
                  {followers[0] &&
                    <>
                      <div className="card subg-card">
                        <div className="card-body" style={{ paddingBottom: "0.5em" }}>
                          <div className="card-title subg-title">
                            <h4 className="" style={{ marginTop: "1%", color: "red" }}>Users</h4>
                          </div>
                          {followers.map((e) => {
                            return (
                              <p style={{}}>{e}</p>
                            )
                          })}
                        </div>
                      </div>
                    </>
                  }
                </div>
                <div className="blocked">
                  {blockedfollowers[0] &&
                    <>
                      <div className="card subg-card">
                        <div className="card-body" style={{ paddingBottom: "0.5em" }}>
                          <div className="card-title subg-title">
                            <h4 className="" style={{ marginTop: "1%", color: "red" }}>Blocked Users</h4>
                          </div>
                          {blockedfollowers.map((e) => {
                            return (
                              <p style={{}}>{e}</p>
                            )
                          })}
                        </div>
                      </div>
                    </>
                  }
                </div>
              </div>
            }
            {followreq &&
              <div className="subgreddiits requests">
                {requests && requests.map((e) => {
                  return (e &&
                    <>
                      <p className="inline" style={{ color: "lightgray" }}>{e}</p>
                      <button className="" onClick={() => handleAccept(e)} style={{ background: "transparent", border: "none" }}><i className="fa-solid fa-check" style={{ color: "green" }}></i></button>
                      <button className="" onClick={() => handleReject(e)} style={{ background: "transparent", border: "none" }}><i className="fa-solid fa-xmark" style={{ color: "red" }}></i></button>
                    </>
                  )
                })
                }
              </div>
            }
            {report &&
              <div className="subgreddiits reports">
                {reports && reports.map((e) => {
                  return (e &&
                    <>
                      <ReportCard post={e} />
                    </>
                  )
                })
                }
              </div>
            }
          </>
        </>
  )
}

export default SubgreddiitDetails