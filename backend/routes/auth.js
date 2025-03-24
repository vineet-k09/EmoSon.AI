import express from "express";
const router = express.Router();

// Example route for authentication
router.get("/", (req, res) => {
    res.send("Auth Route Working!");
});

export default router;
