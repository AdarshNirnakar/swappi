const express=require ('express');
const db =require('./db');
const dotenv =require('dotenv')
const authRoutes = require('./routes/authRouter');

dotenv.config();
const app = express();
db();


//middleware
app.use(express.json());

//routes
app.use("/api/v1/auth",authRoutes)

// app.use('/',(req,res)=>{
//     res.send("hello from server");
// })

const PORT = process.env.PORT ||8000;

app.listen(8000,()=>{
    console.log("server started at local host 8000");
})