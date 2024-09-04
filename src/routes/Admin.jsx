import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import blogFetch from "../axios/config"
import "./Admin.css"

const Admin = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = async() => {
        try {
            const response = await blogFetch.get("/posts");   
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    const deletePost = async (id) => {
        await blogFetch.delete(`/posts/${id}`);
        const currentPosts = posts.filter((post) => post.id !== id);
        setPosts(currentPosts);
    }

    return (
        <div className="admin">
            <h1>Manage Posts</h1>
            {posts.length === 0 ? (
                <p>Loading posts...</p>
            ) : (
                posts.map((post) => (
                    <div className="post" key={post.id}>
                        <h2>{post.title}</h2>
                        <div className="actions">
                            <Link to={`/posts/edit/${post.id}`} className="btn edit-btn">Edit</Link>
                            <button onClick={(e) => deletePost(post.id)} className="btn delete-btn">Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Admin