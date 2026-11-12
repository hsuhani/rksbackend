const Service=require('./service.model')

const getAllServices=async()=>{
    return await Service.find({isActive:true}).sort({displayOrder:1})
}

const getServiceBySlug=async(slug)=>{
    return await Service.findOne({
        slug:slug,
        isActive:true
    })
}
module.exports={
    getAllServices,
    getServiceBySlug
}