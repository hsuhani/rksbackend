
const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const env = require("./src/config/env");
const connectDatabase = require("./src/config/database");

// Create the HTTP server
const server = http.createServer(app);

// Start the application

const startServer=async()=>{
    try{
        await connectDatabase();
        app.listen(env.PORT,()=>{
            console.log(`Server running on port ${env.PORT}`);
            console.log(`Environment: ${env.NODE_ENV}`);
        })
    }
    catch(error){
         console.error("Server startup failed:", error.message);

        await mongoose.disconnect().catch(()=>{});
        process.exitCode=1;


    }
}


const shutdown=async(signal)=>{
    console.log(`${signal}recieved.shutting down....`)

    server.close(async()=>{
        try{
            await mongoose.disconnect();
            console.log("MongoDB disconnected");
            console.log("Server shutdown complete");
        }
        catch(error){
            console.error("shutdown error",error.message);
            process.exitCode =1;

        }
    })
}
process.on("SIGTERM",()=>shutdown("SIGTERM"));
process.on("SIGINT",()=>shutdown("SIGINT"))

// Run the server
startServer();
