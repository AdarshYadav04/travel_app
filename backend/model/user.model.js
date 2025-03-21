const mongoose=require("mongoose")

const Schema=mongoose.Schema

const userSchema=new Schema({
    username:{type:String ,required:true},
    number:{type:Number,required:true,uniquie:true},
    email:{type:String ,required:true,uniquie:true},
    password:{type:String,required:true}

})

const User=mongoose.model("User",userSchema)

module.exports=User