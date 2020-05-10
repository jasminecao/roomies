import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [user, setUser] = useState({ user: null })

  useEffect(() => {
    async function callBackendAPI() {
      const response = await fetch('/home');
      const body = await response.json();
      console.log(body.user);
      
      if (response.status !== 200) {
        throw Error(body.message)
      }
      return body;
    }
    callBackendAPI().then(res => setUser({ name: res.user.name })).catch(err => console.log(err));
  }, [])

  return (
    <>
    <head>
      <title>roomies</title>
    </head>
    <div className="header">
      <h1 className="home-header">🏡roomies</h1>
    </div>
    <body>
      <p>Hi {user.name}</p>
    </body>
    </>
  );
}

export default Home;