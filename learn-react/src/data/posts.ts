export interface Posts {
    [key: string]: {
        title: string;
        description: string;
    };
}

export const BlogPosts: Posts = {
    "first-blog-post": {
        title: "First Blog Post",
        description: "Lorem ipsum dolor sit amet, consectetur adip.",
    },
    "second-blog-post": {
        title: "Second Blog Post",
        description: "Hello React Router v6",
    },
};