
const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
 const token=req.headers.authorization;
 if(!token) return res.status(401).send('No token');
 req.user=jwt.verify(token,'SECRET');
 next();
}
