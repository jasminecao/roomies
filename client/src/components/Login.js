import React from 'react';
import '../App.css';

function Login() {
  return (
    <div className="App">
      <head>
        <title>roomies | login</title>
      </head>
      <body>
        <div className="login">
          <h1>roomies</h1>
          <form method="POST">
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit" className="btn">Login</button>
          </form>
          <p>Don't have an account? <a href="/signup">Sign up!</a></p>
        </div>
      </body>
    </div>
  );
}

export default Login;