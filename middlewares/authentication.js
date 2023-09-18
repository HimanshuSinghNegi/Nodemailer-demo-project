const jwt = require('jsonwebtoken');
const { sendErrorMessage } = require('../middlewares/responseHandler');

function auth() {
    return (req, res, next) => {
        try {
            let accessToken = req.headers.token;
            if (accessToken === undefined) { return sendErrorMessage(res, 400, 'provide token in headers'); }
            const token = accessToken.split(' ')[1];
            let customer = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
            if (customer) next();
        }
        catch (err) { sendErrorMessage(res, 401, err.message); }
    };
}

//exports module
module.exports = auth;