const {
    getAllServices,
    getServiceBySlug
}=require('./service.service')

//get all services

const getServices=async(req,res,next)=>{
    try{
        const services= await getAllServices();
        return res.status(200).json({
            success: true,
            count: services.length, //return  the total number of items
            data: services
        })
    }
    catch(error){
        next(error)
    }

}

const getServicedetail=async(req,res,next)=>{
    try{
        const{slug}=req.params;
        const service=await getServiceBySlug(slug);

        if(!service){
            return res.status(404).json({
                success: false,
                message: "Service not found"
            })
        }
        return res.status(200).json({
            success:true,
            
            data:service
        })
    }
    catch(error){
        next(error)

    }

}

module.exports={
    getServicedetail,
    getServices
}