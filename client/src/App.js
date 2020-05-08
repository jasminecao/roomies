import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>ASDFASDF</p>
      <p>{state.data}</p>
    </div>
  );
}

export default App;
