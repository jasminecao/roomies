import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import logo from './logo.svg';
import Signup from "./components/Signup"
import Login from "./components/Login"
import Home from "./components/Home"
import './App.css';

function App() {
  const [state, setState] = useState({ data: null });

  useEffect(() => {
    async function callBackendAPI() {
      console.log("in callbackend")
      const response = await fetch('/express_backend');
      console.log(response)
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    }
    callBackendAPI().then(res => setState({ data: res.express })).catch(err => console.log(err));
  })
  
  return (
    <>
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
    {/* <div className="App">
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
          <p>{state.data}</p>
        </div>
      </body>
    </div> */}
    </>
  );
}

export default App;