import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';

// Define a function to handle the
// submission of the LoginForm
function handleLogin(
    username: string,
    password: string
) {
  console.log(username, password);
}

function App() {
  return (
      // Render a div that contains the
      // LoginForm component
      <div>
        {/* Render an H1 element with
           the text "Login Form" */}
        <h1 style={{textAlign: 'center'}}>
          Login Form
        </h1>
        {/* Render the LoginForm component */}
        <LoginForm onSubmit={handleLogin}/>

        <div className="App">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>

        </div>
      </div>

  );
}

export default App;
