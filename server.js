const express = require('express');
const db = require('./db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRouter');
const cors = require('cors'); // Moved this import up for clarity

dotenv.config();
const app = express();
db();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);

// Uncomment this if you want a default route
// app.use('/', (req, res) => {
//     res.send("hello from server");
// });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});