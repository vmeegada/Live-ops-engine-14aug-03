const express=require("express")
const bcrypt=require("bcrypt")
const router=express.Router();
const jwt =require("jsonwebtoken")
const salt=10;
const SECRET_CODE="vasavianusha"
const {user}=require("../Schemas/user-schema");
//findone userExist
router.post("/signup" ,async (req,res) =>{
    //create a user in db
    //username password email mobile
    //encrypt then password

    bcrypt.genSalt(salt,(saltErr,saltValue)=>
    {
        if(saltErr)
        {
            res.status(401).send("unable to process")
        }
        else
        {   bcrypt.hash(req.body.password,saltValue,(hashErr,hashValue)=>
            {
                if(hashErr)
                {
                    res.status(401).send("unable to process2")
                } 
                else
                {
                   user.create({
                    username:req.body.username,
                    password: hashValue,
                    email:req.body.email | "",
                    mobile:req.body.mobile | ""
                }).then((user)=>{res.status(200).send(user.username+" "+"created successfully")

                }).catch((err)=>{res.status(400).send(err.message)})
                }
            })

        }
    })

});
router.post("/signin" ,async (req,res) =>
{
    //read a user from db
    //username password
    //user is exist or not
    //verify password and generate jwt
    user.findOne({username:req.body.username}).then((user)=>{
        if(!user)
        {
            res.status(401).send("user not exist!")
        } else {
          if(!bcrypt.compareSync(req.body.password, user.password))
          {
           res.status(401).send("Invalied password")
          }
          else{
            const token = jwt.sign({
                id:user._id,
                username:user.username
            },SECRET_CODE);
            res.status(200).send({
                message:"user login is succesfull ",
                token:token
            })
          }
        }
    }).catch(()=>{})
    
})
module.exports=router