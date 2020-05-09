import React from 'react';
import '../App.css';

const Home = () => {
  return (
    <>
    <head>
      <title>roomies</title>
    </head>
    <div className="App">
      <body>
        <div className="login">
          <h1>Roomies</h1>
          <p>Don't have an account? <a href="/signup">Sign up!</a></p>
        </div>
      </body>
    </div>
    </>
  );
}

export default Home;