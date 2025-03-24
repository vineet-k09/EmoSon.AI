import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
    uid: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// ✅ Signup Route
app.post("/Signup", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "User Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 🔒 Hash password
        const newUser = new User({ uid: new mongoose.Types.ObjectId().toString(), username, password: hashedPassword });

        await newUser.save();
        return res.status(201).json({ message: "Exist" });
    } catch (e) {
        console.error("Signup Error:", e);
        return res.status(500).json({ message: "User creation failed" });
    }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

        return res.json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (e) {
        console.error("Login Error:", e);
        return res.status(500).json({ message: "Login failed" });
    }
});

// ✅ Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from "Bearer token"

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};


// ✅ Get User Data API
app.get("/api/user", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.json({ user });
    } catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


//post system
// ✅ Post Schema
const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    profilePic: { type: String, default: "./public/userpfp.jpg" }, // Default PFP
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

// ✅ Create a New Post
app.post("/posts", async (req, res) => {
    const { userId, username, profilePic, content } = req.body;
    console.log("Request Body:", req.body);
    if (!userId || !username || !content) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!userId || !username || !content) {
        console.log("Missing fields:", { userId, username, content });
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const newPost = new Post({ userId: userId, username, profilePic, content });
        await newPost.save();
        return res.status(201).json(newPost);
    } catch (error) {
        console.error("Post Creation Error:", error);
        return res.status(500).json({ message: "Failed to create post" });
    }
});

// ✅ Get All Posts
app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return res.json(posts);
    } catch (error) {
        console.error("Fetch Posts Error:", error);
        return res.status(500).json({ message: "Failed to fetch posts" });
    }
});

// ✅ Like a Post
app.post("/posts/:postId/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.likes += 1;
        await post.save();

        return res.json({ message: "Post liked", likes: post.likes });
    } catch (error) {
        console.error("Like Error:", error);
        return res.status(500).json({ message: "Failed to like post" });
    }
});



// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
