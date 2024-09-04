import { useState } from "react"
import { useNavigate } from "react-router-dom"
import blogFetch from "../axios/config"
import "./NewPost.css"

const NewPost = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState();
    const [body, setBody] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost();
    }

    const createPost = async () => {
        const post = { title, body, userId: 1 };
        await blogFetch.post("/posts", {
            body: post,
        });
        navigate("/");
    }

    return (
        <div className="post-container">
            <h2>Create a New Post:</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter a title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="body">Content:</label>
                    <textarea
                        name="body"
                        id="body"
                        placeholder="Enter a content"
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <input type="submit" value="Create Post" className="btn" />
            </form>
        </div>
    )
}

export default NewPost