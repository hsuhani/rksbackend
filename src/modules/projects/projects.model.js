const mongoose=require("mongoose");
const projectSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,

    },
    slug:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    image:{
        type:String,
        required:true,
        trim:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    displayOrder:{
        type:Number,
        default:0
    }
},{
     timestamps: true
})


const Project=mongoose.model("Project",projectSchema)
module.exports=Project