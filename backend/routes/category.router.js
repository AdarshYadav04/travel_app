const express=require("express")
const router=express.Router()

const Category=require("../model/category.model")

router.route("/").get(async(req,res)=>{
    try {
        const categories=await Category.find({})
        res.json(categories)
    } catch (error) {
        res.status(401).json({message:"could not find categories"}) 
    }
})

module.exports=router