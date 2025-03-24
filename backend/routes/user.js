import express from "express";
const router = express.Router();

// Example route for user profile
router.get("/", (req, res) => {
    res.send("User Profile Route Working!");
});

export default router;
