const express=require("express")
const router=express.Router()

const Category=require("../model/category.model")
const categories=require("../data/categories")

router.route("/")
.post(async(req,res)=>{

    try {
        const categoriesInDB=await Category.insertMany(categories.data)
        res.json(categoriesInDB)
    } catch (error) {
        console.log(error)
        res.json({message:"could not add categories to DB"})        
    }

})
module.exports=router