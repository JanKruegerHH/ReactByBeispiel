import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import ClickCounter from "./components/ClickCounter";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import NavigationIcon from '@mui/icons-material/Navigation';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
                <p/>
                ClickCounter
                <ClickCounter/>
            </div>

            <div className="App">
                <Fab color="primary" aria-label="add">
                    <AddIcon/>
                </Fab>
                <Fab color="secondary" aria-label="edit">
                    <EditIcon/>
                </Fab>
                <Fab variant="extended">
                    <NavigationIcon sx={{mr: 1}}/>
                    Navigate
                </Fab>
                <Fab disabled aria-label="like">
                    <FavoriteIcon/>
                </Fab>
            </div>

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
