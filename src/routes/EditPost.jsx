import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import blogFetch from "../axios/config"
import "./EditPost.css"

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const getPost = async () => {
        try {
            const response = await blogFetch.get(`/posts/${id}`);
            setTitle(response.data.title);
            setBody(response.data.body);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPost();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        editPost();
    }
    
    const editPost = async () => {
        const post = { title, body, userId: 1 };
        await blogFetch.put(`/posts/${id}`, {
            body: post,
        });
        navigate("/");
    }

    return (
        <div className="post-container">
            <h2>Editing: {title}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter a title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="body">Content:</label>
                    <textarea
                        name="body"
                        id="body"
                        placeholder="Enter a content"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    />
                </div>
                <input type="submit" value="Edit Post" className="btn" />
            </form>
        </div>
    )
}

export default EditPost