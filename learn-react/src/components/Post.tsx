import React from 'react';
import {useParams} from "react-router";
import {BlogPosts} from "../data/posts";

const Post: React.FC = () => {
    const {slug} = useParams();
    const post = slug ? BlogPosts[slug] : null;
    if (!post) {
        return <span>The blog post you've requested doesn't exist.</span>;
    }
    const {title, description} = post;
    return (
        <div style={{padding: 20}}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default Post;
