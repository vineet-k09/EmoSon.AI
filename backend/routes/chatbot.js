import express from "express";
const router = express.Router();

// Example route for chatbot
router.get("/", (req, res) => {
    res.send("Chatbot Route Working!");
});

export default router;
