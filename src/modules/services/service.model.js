const mongoose=require('mongoose');
const { string, lowercase, number } = require('zod');

const serviceSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true

    },
    shortDescription:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        required:true
    },
    features:{
        type:[String],
        default:[]
    },
    category: {
    type: String,
    required: true,
    trim: true
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
    timestamps:true
})

const Service=mongoose.model("Service",serviceSchema)
module.exports=Service;