
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        status: statusCode,
        message: err.msg
    });
};

module.exports = errorHandler;