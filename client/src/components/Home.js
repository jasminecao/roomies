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

  function logout() {
    const response = fetch('/logout');
  }

  return (
    <>
    <head>
      <title>roomies</title>
    </head>
    {/* <div className='header'>
      <h1>🏡roomies</h1>
      <span className="logout"><a onclick={logout()} href="/login">Logout</a></span>
    </div> */}
      
    <body>
      <span className="logout"><a onclick={logout()} href="/login">Logout</a></span>
      <h1 className="homeHeader">🏡roomies</h1>
      <p className="name">Hi {user.name}</p>
    </body>
    </>
  );
}

export default Home;