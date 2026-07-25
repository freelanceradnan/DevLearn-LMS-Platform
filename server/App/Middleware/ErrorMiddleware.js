import ErrorHandler from "../Utils/ErrorHandler.js";

const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    
    // 1. Wrong MongoDB ID
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // 2. Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // 3. JWT Error
    if (err.name === 'JsonWebTokenError') {
        const message = 'Json web token is invalid, try again';
        err = new ErrorHandler(message, 400);
    }

    // 4. Token Expired Error
    if (err.name === 'TokenExpiredError') {
        const message = 'Json web token is expired, try again';
        err = new ErrorHandler(message, 400);
    }

    // Client Response
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

export default ErrorMiddleware;