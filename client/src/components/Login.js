import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useHistory } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <head>
        <title>roomies | login</title>
      </head>
      <body>
      <div className="App">
        <div className="login">
          <h1>roomies</h1>
          <form action="/login" method="POST" className="loginInput">
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit" className="btn">Login</button>
          </form>
          <p>Don't have an account? <a href="/signup">Sign up!</a></p>
        </div>
        </div>
      </body>
    </>
  );
}

export default Login;

// function Login() {
//   const [username, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [state, setState] = useState({ login: true });
//   const [redirect, setRedirect] = useState(false);
//   const history = useHistory();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('UN:' + username + password);
//     const userObject = {
//       username: username,
//       password: password
//     }

//     async function callBackendAPI() {
//       const requestOptions = {
//         method: 'POST', 
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userObject),
//       }
//       const response = await fetch('/login', requestOptions);
//       if (response.status === 200) {
//         console.log('all okay')
//         setRedirect(true)
//         return {login: true}
//       }
//       console.log(response)
//       const body = await response.json();
//       console.log(body);
//       return body;
//     }
//     callBackendAPI().then(res => setState({ login: res.login })).catch(err => console.log(err));
//   }

//   return (
//     <>
//     <head>
//       <title>roomies | login</title>
//     </head>
//     <div className="App">
//       <body>
//         <div className="login">
//           <h1>roomies</h1>
//           <form onSubmit={handleSubmit} >
//             <input type="text" name="username" value={username} onChange={e => setUserName(e.target.value)} 
//               placeholder="Username" required />
//             <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} 
//               placeholder="Password" required />
//             {!state.login && <p style={{color: "red", fontSize: "10px"}}>invalid username/password</p>}
//             <button type="submit" className="btn">Login</button>
//           </form>
//           <p>Don't have an account? <a href="/signup">Sign up!</a></p>
//         </div>
//       </body>
//     </div>
//     </>
//   );
// }