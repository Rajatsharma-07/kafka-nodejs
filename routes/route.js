const express = require('express');
const router = express.Router();


router.get('/healthCheck',(rer,res,next)=>{
     res.send("Server is working Fine");
});

module.exports=router;