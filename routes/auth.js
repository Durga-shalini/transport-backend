
const router=require('express').Router();
const jwt=require('jsonwebtoken');
const User=require('../models/User');

router.post('/login', async(req,res)=>{
 let user=await User.findOne({mobile:req.body.mobile});
 if(!user) user=await User.create(req.body);

 const token=jwt.sign({id:user._id,role:user.role},'SECRET');
 res.send({token});
});

module.exports=router;
