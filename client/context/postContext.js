import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

//Context 
const PostContext = createContext();


//Provider

//PROVIDER
const PostProvider = ({ children }) => {

    //Global state
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    //GetAllPost
    const getAllPost = async (req, res) => {
        setLoading(true);
        try {
            const { data } = await axios.get('/post/get-all-post');
            setLoading(false);
            setPosts(data?.posts)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    //initial Post
    useEffect(() => {
        getAllPost();
    }, [])

    return (

        <PostContext.Provider value={[posts, setPosts, getAllPost]}>
            {children}
        </PostContext.Provider>

    )
};

export { PostContext, PostProvider }
