
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")


const connectDB=require("./config/dbconfig")
const hotelRouter=require("./routes/hotel.router")
const hotelDataAddedToDBRouter=require("./routes/dataimport.router")
const categoryDataAddedToDBRouter=require("./routes/categotyimport.router")
const categoryRouter=require("./routes/category.router")
const singleHotelRouter=require("./routes/singlehotel.router")
const authRouter=require("./routes/auth.router")
const wishlistRouter=require("./routes/wishlist.router")
const destinationDataAddedToDBRouter=require("./routes/destinationimport.router")
const destinationRouter=require("./routes/destination.router")
const searchRouter=require("./routes/search.router")


const app=express()

app.use(cors())
app.use(express.json())
connectDB()

const PORT=3500

app.get("/",(req,res)=>{
    res.send("ADARSH")

})
app.use("/api/hotels",hotelRouter)
app.use("/api/hoteldata",hotelDataAddedToDBRouter)
app.use("/api/categorydata",categoryDataAddedToDBRouter)
app.use("/api/categories",categoryRouter)
app.use("/api/hotels",singleHotelRouter)
app.use("/api/auth",authRouter)
app.use("/api/wishlist",wishlistRouter)
app.use("/api/destinationdata",destinationDataAddedToDBRouter)
app.use("/api/destinations",destinationRouter)
app.use("/api/results",searchRouter)

mongoose.connection.once("open",()=>{
    console.log("connected to database")
    app.listen(process.env.PORT || PORT,()=>{
        console.log("Server is UP and Running")
    })
})
