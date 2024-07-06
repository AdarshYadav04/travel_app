const express=require("express")
const router=express.Router()

const Hotel=require("../model/hotel.model")
const hotels=require("../data/hotels")

router.route("/")
.post(async(req,res)=>{

    try {
        const hotelsInDB=await Hotel.insertMany(hotels.data)
        res.json(hotelsInDB)
    } catch (error) {
        console.log(error)
        res.json({message:"could not add data to DB"})        
    }

})
module.exports=router