const express=require("express")

const router=express.Router()

const Hotel=require("../model/hotel.model")

router.route("/").get(async(req,res)=>{//localhost:3500/api/hotels
    const hotelCategory=req.query.category // http://localhost:3500/api/hotels?categoty=National+Parks
    try {
        let hotels
        if(hotelCategory){
            hotels=await Hotel.find({category:hotelCategory})
        }
        else{
            hotels=await Hotel.find({})
        }
        hotels?res.json(hotels):res.status(404).json({message:"No data found"})
        
    } catch (error) {
        console.log(error)
    }
})

module.exports=router

