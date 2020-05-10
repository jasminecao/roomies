import React, { useEffect, useState } from 'react';
import './Home.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(true)

  useEffect(() => {
    async function callBackendAPI() {
      const response = await fetch('/home');
      const body = await response.json();
      console.log(body);
      if (body.user === undefined) {
        setLoggedIn(false);
      }
      
      if (response.status !== 200) {
        throw Error(body.message)
      }
      return body;
    }
    callBackendAPI().then(res => setUser({ user: res, name: res.user.name })).catch(err => console.log(err));
  }, []);

  function logout() {
    const response = fetch('/logout');
  }

  return (
    <>
    <head>
      <title>roomies</title>
    </head>
    <body>
      <span className="logout"><a onClick={() => logout()} href="/login">Logout</a></span>
      <h1 className="homeHeader">🏡roomies</h1>
      {user.user !== undefined && <p className="name">Hey {user.name}</p>}
      {!loggedIn && <Redirect to={"/login"}/>}
    </body>
    </>
  );
}

export default Home;