const Project = require('./projects.model');


const getAllProjects= async()=>{
    return await Project.find({isActive:true}).sort({displayOrder:1})
}

module.exports={getAllProjects}