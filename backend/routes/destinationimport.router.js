const express=require("express")
const router=express.Router()

const Destination=require("../model/destination.model")
const destinations=require("../data/destinations")

router.route("/")
.post(async(req,res)=>{

    try {
        const destinationsInDB=await Destination.insertMany(destinations.data)
        res.json(destinationsInDB)
        
    } catch (error) {
        console.log(error)
        res.json({message:"could not add destinations to DB"})
        
    }
})
module.exports=router