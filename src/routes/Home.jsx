import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import blogFetch from "../axios/config"
import "./Home.css"

const Home = () => {
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

    return (
        <div className="home">
            <h1>Last Posts:</h1>
            {posts.length === 0 ? (
                <p>Loading posts...</p>
            ) : (
                posts.map((post) => (
                    <div className="post" key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <Link to={`/posts/${post.id}`} className="btn">Read more</Link>
                    </div>
                ))
            )}
        </div>
    )
}

export default Home