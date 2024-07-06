const express=require("express")
const User=require("../model/user.model")
const CryptoJS=require("crypto-js")
const jwt=require("jsonwebtoken")

const router=express.Router()

router.route("/register")
    .post(async(req,res)=>{
        try {
            const {username,number,email,password}=req.body
            const userExists1=await User.findOne({number})
            const userExists2=await User.findOne({email})
            if(!username || !number || !email || !password){
                res.status(400).json({message:"Please Enter all the Fields"})
            }
            if(userExists1 ||userExists2){
                res.status(400).json({message:"User already exists"})
            }
            else{
                const newUser=new User({
                    username:username,
                    number:number,
                    email:email,
                    password:CryptoJS.AES.encrypt(req.body.password,process.env.PASSWORD_SECRET_KEY).toString(),
                })
                
                const savedUser=await newUser.save()
                const accessToken=jwt.sign({id:savedUser._id},process.env.ACCESS_TOKEN,{expiresIn:"1d"})
                res.status(201).json({savedUser,accessToken})
                
            }
        
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Error in Creating a User"})
        
        }

    })

    router.route("/login")
        .post(async(req,res)=>{
            try {
                const {number,password,confirmPassword}=req.body
                const user=await User.findOne({number:req.body.number})
                if(user){
                    const decodePassword=CryptoJS.AES.decrypt(user.password,process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8)
                    decodePassword!==req.body.password && res.status(401).json({message:"Incorrect Password"})
                    const{password,confirmPassword, ...rest}=user._doc
                    const accessToken=jwt.sign({id:user._id},process.env.ACCESS_TOKEN)
                    res.json({...rest,accessToken})

                }
                else{
                    res.status(401).json({message:"Invalid Mobile Number"})
                }

            } catch (error) {
                console.log(error)   
            }

        })

    module.exports=router

