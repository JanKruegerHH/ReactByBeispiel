import React from 'react';
import {Outlet} from "react-router";

const PostsHeader: React.FC = () => {
    return (
        <section>
            <div style={{ padding: 20 }}>
                <h2>Blog</h2>
                <Outlet />
            </div>
        </section>
    )
}

export default PostsHeader;
