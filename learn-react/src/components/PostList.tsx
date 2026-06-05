import React from 'react';
import {Link} from "react-router";
import {BlogPosts} from "../data/posts";

const PostList: React.FC = () => {
    return (
        <section>
            <div style={{padding: 20}}>
                <ul>
                    {Object.entries(BlogPosts).map(([slug, {title}]) => (
                        <li key={slug}>
                            <Link to={`/posts/${slug}`}>
                                <h3>{title}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default PostList;
