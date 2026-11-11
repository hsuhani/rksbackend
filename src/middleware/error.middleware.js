const { success } = require('zod');
const env=require('../config/env')

const errorHandler=(req,res,next)=>{
     const statusCode = err.statusCode || 500;
     if(statusCode>=500){
        console.error(err)
     }
     res.status(statusCode).json({
        success:false,
        message:
        statusCode>=500 && env.NODE_ENV==="production" ? "internal server error" :
        err.message || "something went wrong"
     })
}