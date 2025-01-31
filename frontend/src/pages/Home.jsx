import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [username, setUsername] = useState("")
  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const config = {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          };
          const response = await axios.get('http://127.0.0.1:8000/api/user/', config)
          setLoggedIn(true)
          setUsername(response.data.username)
        }
        else {
          setLoggedIn(false);
          setUsername("");
        }
      }
      catch (error) {
        setLoggedIn(false);
        setUsername("");
        console.log("Please Login first!!!");
      }
    };
    checkLoggedInUser()
  }, [])

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")

    console.log(accessToken);
    console.log("/n");
    console.log(refreshToken);
    try {
      const accessToken = localStorage.getItem("accessToken")
      const refreshToken = localStorage.getItem("refreshToken")

      if (accessToken && refreshToken) {
        const config = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        };
        await axios.post("http://127.0.0.1:8000/api/logout/", { 'refresh': refreshToken }, config)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLoggedIn(false);
        setUsername("");
        console.log("Logout successfully!");
      }
    }
    catch (error) {
      console.log("Failed to logout!", error);
    }
  }

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h2>Hi, {username}. Thanks for loggin in!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <h2>Please Login!</h2>
      )}
    </div>
  )
}