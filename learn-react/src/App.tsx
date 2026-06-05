import React from 'react';
import './App.css';
import {BrowserRouter, NavLink, useRoutes} from 'react-router';
import Gallery from "./components/Gallery";
import About from "./components/About";
import NoMatch from "./components/NoMatch";
import PostsHeader from "./components/PostsHeader";
import PostList from "./components/PostList";
import Post from "./components/Post";
import MuiSample01 from "./components/mui/MuiSample01";

const App: React.FC = () => {

    function Routes() {
        return useRoutes([
            {path: "/", Component: Gallery},
            {
                path: "/posts",
                element: <PostsHeader/>,
                children: [
                    {index: true, element: <PostList/>},
                    {path: ":slug", element: <Post/>}
                ],
            },
            {path: "/about", Component: About},
            {path: "/muisample01", Component: MuiSample01},
            {path: "*", element: <NoMatch/>}
        ]);
    }

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
                    to='/posts'
                    style={({isActive}) => ({
                        padding: 5,
                        ...(isActive ? {color: "red"} : {}),
                    })}
                >
                    Posts
                </NavLink>
                <NavLink
                    to='/muisample01'
                    style={({isActive}) => ({
                        padding: 5,
                        ...(isActive ? {color: "red"} : {}),
                    })}
                >
                    MUI Sample 01
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
            <Routes/>
        </BrowserRouter>
    );
};

export default App;
