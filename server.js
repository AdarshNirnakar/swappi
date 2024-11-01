const express = require('express');
const db = require('./db'); 
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRouter'); 
const cors = require('cors'); 

dotenv.config();
const app = express();
db(); 


app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'], 
}));

// Middleware 
app.use(express.json()); // This is necessary for parsing JSON in requests

// Routes
app.use("/api/v1/auth", authRoutes); 



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});