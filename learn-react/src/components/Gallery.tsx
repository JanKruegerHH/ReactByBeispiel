import React from 'react';
import Profile from "./Profile";

const Gallery: React.FC = () => {
    return (
        <section>
            <h1>Amazing Scientists</h1>
            <Profile/>
            <Profile/>
            <Profile/>
        </section>
    )
}

export default Gallery;