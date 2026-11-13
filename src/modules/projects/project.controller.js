const {getAllProjects}=require("./project.service")

//get all services

const getProjects= async(req,res,next)=>{
    
    try{
        const projects= await getAllProjects();
        return res.status(200).json({
            success: true,
            count: projects.length, //return  the total number of items
            data: projects
        })
    }
    catch(error){
        next(error)
    }


}
module.exports={getProjects}