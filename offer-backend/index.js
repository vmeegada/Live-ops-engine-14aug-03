const express =require("express");
const mongoose=require("mongoose");
const bodyparse =require("body-parser")
const SERVER_PORT=process.env.PORT || 8080
const app =express();
app.use(bodyparse.json())
const userRoutes =require("./routes/user");
const offerRoutes=require("./routes/offer")
//database -1.mongoose atlas  2.localmongoo install
mongoose.connect("mongodb+srv://vasavianu98:database@cluster0.i855w9s.mongodb.net/?retryWrites=true&w=majority").then(()=>{
console.log("db is connected")
}).catch(()=>
{console.log("db is not conneted")})

app.listen(SERVER_PORT,()=>{console.log("server started at" +" "+SERVER_PORT)})
app.use("/user",userRoutes)
app.use("/offer",offerRoutes)