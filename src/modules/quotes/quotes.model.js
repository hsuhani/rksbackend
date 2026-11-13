const mongoose=require("mongoose");

const quoteSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true 
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase: true
    },
    phone:{
        type:String,
        required:true,

    },
 
    serviceType:{
        type:String,
        required:true,
    },
    numberOfGuards:{
        type:Number,
        required:true,
        min:1
    },
    location:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    message: {
        type: String,
        trim: true,
        default: ""
},
    status: {
        type: String,
        enum: ["pending", "contacted", "in-progress", "completed", "cancelled"],
        default: "pending"
}

    
},{
    timestamps:true
})

const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;