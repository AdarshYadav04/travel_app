const express=require("express")
const router=express.Router()

const Destination=require("../model/destination.model")

router.route("/")
.get(async(req,res)=>{
    try {
        const destinations=await Destination.find({})
        res.json(destinations)

        
    } catch (error) {
        res.status(401).json({message:"could not find destinations"})
        
    }

})
module.exports=router
