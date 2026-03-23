
const router=require('express').Router();
const Load=require('../models/Load');
const auth=require('../middleware/auth');
const role=require('../middleware/role');

// create
router.post('/',auth,role(['BUYSELL','TRANSPORTER']),async(req,res)=>{
 const load=await Load.create({...req.body,createdBy:req.user.id});
 res.send(load);
});

// admin all
router.get('/admin',auth,role(['ADMIN']),async(req,res)=>{
 res.send(await Load.find());
});

// buysell own
router.get('/my',auth,role(['BUYSELL']),async(req,res)=>{
 res.send(await Load.find({createdBy:req.user.id}));
});

// transporter
router.get('/available',auth,role(['TRANSPORTER']),async(req,res)=>{
 res.send(await Load.find());
});

// delete
router.delete('/:id',auth,role(['ADMIN']),async(req,res)=>{
 await Load.findByIdAndDelete(req.params.id);
 res.send('Deleted');
});

module.exports=router;
