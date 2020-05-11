import React, { useEffect, useState } from 'react';
import './Home.css';
import { Redirect } from "react-router-dom";
import Grocery from './Grocery';
import ChoreSchedule from './ChoreSchedule';
import MessageBoard from './MessageBoard.js';

const Home = () => {
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(true)

  useEffect(() => {
    async function callBackendAPI() {
      const response = await fetch('/home');
      console.log(response)
      const body = await response.json();
      if (body.user === undefined) {
        console.log('undefined user')
        setLoggedIn(false);
      }
      if (response.status !== 200) {
        throw Error(body.message)
      }
      return body;
    }
    callBackendAPI().then(res => setUser({ username: res.user.username, name: res.user.name, groupName: res.user.group })).catch(err => console.log(err));
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
      <div className="homeContainer">
        {user.name !== undefined && <p className="name">👋Hey {user.name.split(" ")[0]}</p>}
        {!loggedIn && <Redirect to={"/login"}/>}
        {console.log("render: "+ user.username)}
        <Grocery username={user.username} name={user.name} groupName={user.groupName}/>
        <ChoreSchedule username={user.username} name={user.name} groupName={user.groupName}/>
        <MessageBoard username={user.username} name={user.name} groupName={user.groupName}/>
      </div>
    </body>
    </>
  );
}

export default Home;