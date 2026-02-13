const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const learningRoutes = require("./routes/learningRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", learningRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
