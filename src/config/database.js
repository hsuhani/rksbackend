const mongoose=require("mongoose");
const env = require("./env");


// Monitor MongoDB connection events
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
});

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB connection lost");
});

mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
});

//establishing connection

const connectDatabase= async()=>{
    try{
       await mongoose.connect(env.MONGO_URI,{
        serverSelectionTimeoutMS:10000,
        maxPoolSize:10,
        autoIndex:env.NODE_ENV !== "production"
       })
       return mongoose.connection;

    }
    catch(error){
        console.error("Initial MongoDB connection failed:", error.message);
        throw error;


    }
}
module.exports=connectDatabase;