import React from 'react';
import '../App.css';

const Signup = () => {
  return (
    <>
      <head>
        <title>roomies | signup</title>
      </head>
    <div className="App">
      <body>
        <div className="login">
          <h1>sign up</h1>
          <form action="/signup" method="POST" className="loginInput">
            <input type="text" name="name" placeholder="Name" required />
            <input type="text" name="group" placeholder="Group Name" required />
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit" className="btn">Sign Up</button>
          </form>
          <p>Already have an account? <a href="/login">Log in!</a></p>
        </div>
      </body>
    </div>
    </>
  );
}

export default Signup;