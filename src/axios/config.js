import axios from "Axios"

const blogFetch = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    header: {
        "Content-Type": "application/json",
    },
});

export default blogFetch;