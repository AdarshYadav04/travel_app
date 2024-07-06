const mongoose=require("mongoose")
const Schema=mongoose.Schema

const wishlistSchema=new Schema({
    hotelId:{type:String,required:true}
})

const Wishlist=mongoose.model("wishlist",wishlistSchema)
module.exports=Wishlist