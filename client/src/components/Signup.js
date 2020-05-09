import React from 'react';
import '../App.css';

function Signup() {
  return (
    <div className="App">
      <head>
        <title>roomies | signup</title>
      </head>
      <body>
        <div className="login">
          <h1>Sign Up</h1>
          <form action="/signup" method="POST">
            <input type="text" name="name" placeholder="Name" required />
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit" className="btn">Sign Up</button>
          </form>
          <p>Already have an account? <a href="/login">Log in!</a></p>
        </div>
      </body>
    </div>
  );
}

export default Signup;