import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState({ login: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitting');
    const userObject = {
      "username": "test",
      "password": "t"
    }

    async function callBackendAPI() {
      const requestOptions = {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: {username: "test", password: "t"}
      }
      const response = await fetch('/api/login', requestOptions);
      const body = await response.json();
      console.log(body);
      if (response.status !== 200) {
        throw Error(body.message)
      }
      return body;
    }
    callBackendAPI().then(res => setState({ login: res.login })).catch(err => console.log(err));
  }

  return (
    <>
    <head>
      <title>roomies | login</title>
    </head>
    <div className="App">
      <body>
        <div className="login">
          <h1>roomies</h1>
          <form onSubmit={handleSubmit} >
            <input type="text" name="username" value={username} onChange={e => setUserName(e.target.value)} 
              placeholder="Username" required />
            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} 
              placeholder="Password" required />
            <button type="submit" className="btn">Login</button>
          </form>
          <p>Don't have an account? <a href="/signup">Sign up!</a></p>
        </div>
      </body>
    </div>
    </>
  );
}

export default Login;