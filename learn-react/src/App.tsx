import React from 'react';
import './App.css';
import Gallery from "./components/Gallery";
import About from "./components/About";
import NoMatch from "./components/NoMatch";
import {BrowserRouter, Routes, Route, NavLink} from 'react-router';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <nav style={{margin: 10}}>
                <NavLink
                    to='/'
                    style={({isActive}) => ({
                        padding: 5,
                        ...(isActive ? {color: "red"} : {}),
                    })}
                >
                    Home
                </NavLink>
                <NavLink
                    to='/about'
                    style={({isActive}) => ({
                        padding: 5,
                        ...(isActive ? {color: "red"} : {}),
                    })}
                >
                    About
                </NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<Gallery/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="*" element={<NoMatch/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
