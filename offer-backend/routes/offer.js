const express=require("express")
const router=express.Router();
const jwt =require("jsonwebtoken")
const SECRET_CODE="vasavianusha"
const {offer}=require("../Schemas/offer-schema");
const getUserByToken=(token)=>
{
   return new Promise((reslove,reject)=>{
       if(token)
            {
                let userData
                try{

                 userData =jwt.verify(token,SECRET_CODE);
                 reslove(userData);
                }catch(err)
                {
                    reject(" Invalied Token!")
                }
            } else{
                reject("Token not Found")
            }

        }
    )
}
router.post("/list" ,async(req,res) =>{
const validOffers=[]
 offer.find().then((offers)=>{
    console.log(offers,"offer list");
    offers.filter((offer)=>
        {
          const rules=offer.target.split("and");
          console.log(rules);
         rules.forEach((rule)=>
             {
                   let ruleKey={}
                   if(rule.includes(">"))
                    {
                        ruleKey={
                             key:rule.trim().split(">")[0],
                             value:parseInt(rule.trim().split(">")[1]),
                           
                                }
                                console.log(req.body[ruleKey.key])
                               if(req.body[ruleKey.key] >ruleKey.value)
                               {
                                validOffers.push(offer)
                               }
                        
                    }
                    else{
                        ruleKey={
                        key:rule.trim().split("<")[0],
                        value:parseInt(rule.trim().split("<")[1]),
                
                                 }
                                console.log(req.body[ruleKey.key])
                             if(req.body[ruleKey.key] <ruleKey.value)
                                {
                                     validOffers.push(offer)
                                }
                                 
                        }
               
      //["age>30","installed_days<5"]// if(rule[0].contains(">")){}else{} //const validAge=rule[0].split(">")//    const validInstalledDays=
      })
    })
         res.status(200).send(validOffers)
   }).catch(()=>{
                res.status(500).send("invalied server error") })
    })

router.post("/create" ,async (req,res) =>{
    //find the user
 getUserByToken(req.headers.authorization).then((user) => {
    //create a offer based on user
    offer.create({...req.body,
           username:user.username}).then((offer)=>
           {
            res.status(200).send(offer)

           }).catch((err)=>
           {
            res.status(400).send({message: err.message}) })
   }).catch((err) =>{
    
    res.status(400).send(err)
 
})
})
router.put("/update",async()=>{
    offer.updateOne("identifier data","newData")
})
router.put("/delete",async()=>{
    offer.deleteOne({_id:req.body.id})
});
module.exports=router;