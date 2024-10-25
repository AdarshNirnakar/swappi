const { hashpassword, comparePassword } = require('../helper/authHelper')
const userModel = require('../module/User');
const requestModel =require('../module/Request');
const JWT = require('jsonwebtoken')

const registerController = async(req,res) => {
    try {
        const {name,email,password,phone} = req.body
        if(!name){
            return res.status(400).send({message:'Name is required'})
        }
        if(!email){
            return res.status(400).send({message:'email is required'})
        }
        if(!password){
            return res.status(400).send({message:'Password is required'})
        }
        if(!phone){
            return res.status(400).send({message:'Phone no is required'})
        }
        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.status(409).send({message:"Already registered plz login"})
        }
        const hashedpassword = await hashpassword(password);
        const user = await userModel.create({name,email,phone,password:hashedpassword})
        res.status(201).send({message:"User Registered Successfully", user})
    } catch (error) {
        console.error(error);
        if(error.name === 'ValidationError') {
            return res.status(400).send({message:"Validation Error", error})
        }
        res.status(500).send({message:"Internal Server Error", error})
    }

}

const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email||!password){
            return res.status(400).send({message:"invalid email or Password"})
        }
        const user= await userModel.findOne({email})
        if(!user ){
            return res.status(404).send({message:"Email is not registered"})
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(401).send({message:'invalid Password'})
        }
        const token= await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({message:'login successful',token,user:{name:user.name,email:user.email,phone:user.phone}})
    } catch (error) {
        console.error(error)
        res.status(500).send({message:"Internal Server Error", error})
    }
}

// const testController = async(req,res)=>{
//     res.send("hello middelware is working")
// }

// const requestController=async(req,res)=>{ 
//     try { 
//         const {request,offers}=req.body 
//         if(!request){ 
//             return res.send({message:"plz fill the discription "}) 
//         } 
//         if(!offers){ 
//             return res.send({message:"offer's cannot be kept empty"}) 
//         } 
        
//         // Assuming user details are available in req.user
//         const user = req.user; // Extract user details from the request

//         // Save the request and offers to the database
//         const newRequest = await requestModel.create({ request, offers, user: user._id });
//         res.status(201).send({ 
//             message: "Request created successfully", 
//             newRequest, 
//             user: { name: user.name, email: user.email } // Include user details in the response
//         });
        
//     } catch (error) { 
//         console.log(error) 
//         res.status(500).send({ message: "Internal Server Error", error }); 
//     } 
// }

module.exports=  {registerController,loginController} 