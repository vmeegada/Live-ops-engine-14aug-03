const mongoose =require("mongoose");
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },

    password:{
        type:String,
        require:true
    },
    email:String,
    mobile:Number
});
const user=mongoose.model("user",userSchema)
module.exports={user};