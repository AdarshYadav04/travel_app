const express=require("express")

const router=express.Router()

const Hotel=require("../model/hotel.model")


router.route("/")
.get(async(req,res)=>{
    const resultCategory=req.query.destination
    let destinations

    try {
        destinations=await Hotel.find({address:resultCategory})
        res.json(destinations)
        
    } catch (error) {
        console.log(error)
        res.status(401).json({message:"could not find cdestinations"})
        
    }
})

module.exports=router