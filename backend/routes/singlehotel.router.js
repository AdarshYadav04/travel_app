const express=require("express")

const router=express.Router()

const Hotel=require("../model/hotel.model")

router.route("/:id").get(async(req,res)=>{
    // localhost:3500/api/hotels/1234
    try {
        const { id }=req.params 
        const hotel=await Hotel.findById(id)

        res.json(hotel)
        
    } catch (error) {
        res.status(404).json({message:"No product found"})
        
    }
})

module.exports=router