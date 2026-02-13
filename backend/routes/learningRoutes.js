const express = require("express");
const router = express.Router();
const learningController = require("../controllers/learningController");

// POST /api/generate
router.post("/generate", learningController.generateContent);

// POST /api/verify
router.post("/verify", learningController.verifyQuiz);

module.exports = router;
