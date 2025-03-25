import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommunityPage.css";
import BubbleEffect from "../components/bubbleEffect";

const CommunityPage = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch user from localStorage
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem("user");
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/posts");
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    // Handle posting
    const handlePost = async () => {
        if (!content.trim()) return;
        if (!user && !user._id) return alert("You need to be logged in to post!");

        try {
            const { data } = await axios.post("http://localhost:5000/posts", {
                userId: user.id, // ✅ Ensure this is included
                username: user.username,
                profilePic: user.profilePic || "https://cdnblog.picsart.com/2022/06/DiscordProfile_1200x800_Idea2-780x520.png",
                content,
            });

            setPosts((prevPosts) => [data, ...prevPosts]);
            setContent("");
        } catch (error) {
            console.error("Error posting:", error);
        }
    };

    // Handle liking a post
    const handleLike = async (postId) => {
        try {
            const { data } = await axios.post(`http://localhost:5000/posts/${postId}/like`);
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? { ...post, likes: data.likes } : post
                )
            );
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    if (loading) return <h2>Loading...</h2>;
    if (!user) return <h2>Please log in to access the community.</h2>;

    return (
        <div className="community-container">
            <h1>Community</h1>

            {/* Post Form */}
            <div className="post-form">
                <textarea
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button onClick={handlePost} disabled={!content.trim()}>
                    Post
                </button>
            </div>

            {/* Posts */}
            <div className="posts">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className="post">
                            <div className="post-header">
                                <img src={post.profilePic} alt="Profile" className="pfp" />
                                <div>
                                    <h2>{post.username}</h2>
                                    <small>{new Date(post.createdAt).toLocaleString()}</small>
                                </div>
                            </div>
                            <hr />
                            <p> Says 👀 ~{post.content}</p>
                            <button onClick={() => handleLike(post._id)}>❤️ {post.likes}</button>
                        </div>
                    ))
                ) : (
                    <p>No posts yet. Be the first to share something!</p>
                )}
            </div>
            <BubbleEffect />
        </div>
    );
};

export default CommunityPage;
