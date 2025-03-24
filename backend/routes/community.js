import express from "express";
const router = express.Router();

// Example route for community
router.get("/", (req, res) => {
    res.send("Community Route Working!");
});

export default router;
