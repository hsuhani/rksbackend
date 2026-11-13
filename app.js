const express= require("express");
const cookieParser=require("cookie-parser");
const helmet=require("helmet");
const cors=require("cors");
const rateLimit=require("express-rate-limit");

const env = require("./src/config/env");
const notFound=require("./src/middleware/not-found.middleware");
const errorFound=require("./src/middleware/error.middleware");
const mongoose=require("mongoose")
const serviceRoutes=require("./src/modules/services/service.routes")
const projectRoutes=require("./src/modules/projects/project.routes")
const quoteRoutes=require("./src/modules/quotes/quotes.routes")

const app=express();

//security
app.use(helmet());

//cors frontend communication credentials:Tells the browser that it is allowed to send sensitive data—like cookies, authorization headers, or TLS client certificates—along with cross-origin requests.

app.use(cors({
    origin:env.CLIENT_URL,
    credentials:true
}))

//ratelimiters

const globalRateLimiter=rateLimit({
    windowMs:15 * 60 * 1000, //Sets the time window to 15 minutes (900,000 milliseconds). After this time passes, the user's request count resets.
    limit:100,// Limit each IP to 100 requests per window
    standardHeaders: "draft-8", // new way to send limit
    legacyHeaders: false, // old way to send limit
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }

})

app.use(globalRateLimiter);


//parse incoming json

app.use(express.json({
    limit:"10kb"
}))

//parse form data 
app.use(express.urlencoded({

    extended:false,
    limit:"10kb"
}))

//cookie parser

app.use(cookieParser())

//service api
app.use('/api/v1/service',serviceRoutes)
//project api
app.use('/api/v1/project',projectRoutes)
//quotes api
app.use('/api/v1/quote',quoteRoutes)

//health checkup



app.get("/api/v1/health", (req, res) => {

    const databaseConnected =
        mongoose.connection.readyState === 1;

    if (!databaseConnected) {
        return res.status(503).json({
            success: false,
            message: "Database is unavailable"
        });
    }

    return res.status(200).json({
        success: true,
        message: "API is healthy"
    });
});
// Handle unknown routes
app.use(notFound);

app.use(errorFound);

module.exports = app;