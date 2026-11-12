
const env = require("../config/env");

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    if (statusCode >= 500) {
        console.error(err);
    }

    res.status(statusCode).json({
        success: false,
        message:
            statusCode >= 500 && env.NODE_ENV === "production"
                ? "Internal server error"
                : err.message || "Something went wrong"
    });
};

module.exports = errorHandler;
