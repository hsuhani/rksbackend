const notFound= (req,res,next)=>{
    return res.status(404).json({
        message:`route not found ${req.method} ${req.originalUrl}`
    })
}
module.exports=notFound;