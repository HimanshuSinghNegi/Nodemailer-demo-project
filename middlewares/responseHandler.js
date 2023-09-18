
const sendErrorMessage = (res, statusCode, message, error) => {
    if (!res) {
        console.error('Response object is undefined');
        return;
    }
    return res.status(statusCode).json({
        code: statusCode,
        message,
        error,
    });
};

const sendSuccessMessage = (res, code, message, data, accessToken, refreshToken) => {
    return res.status(200).json({
        code: code,
        message,
        data: {
            ACCESS_TOKEN: accessToken,
            REFRESH_TOKEN: refreshToken,
            data: data
        }
    });
};



module.exports = { sendSuccessMessage, sendErrorMessage };