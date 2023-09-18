const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendSuccessMessage, sendErrorMessage } = require('../middlewares/responseHandler.js');
const userModel = require('../models/user');


//authentication
const autoLogIn = async (req, res) => {
    try {
        const token = req.headers.token;
        if (token && token != undefined) {
            const accessToken = token.split(' ')[1];
            console.log(accessToken);
            const user = await verifyToken(accessToken, process.env.ACCESS_SECRET_KEY);
            return sendSuccessMessage(res, 200, 'Logged in by token', null, await createToken(user, process.env.ACCESS_SECRET_KEY, process.env.ACCESS_TOKEN_EXPIRY_TIME));
        } else {
            return sendErrorMessage(res, 400, 'please provide token in headers');
        }
    } catch (err) {
        return sendErrorMessage(res, 401, err.message);
    }
};


//create access token by refresh token
const createAccessToken = async (req, res) => {
    try {
        const token = req.body.token;
        if (token && token !== undefined) {
            const refreshToken = token.split(' ')[1];
            const user = await verifyToken(refreshToken, process.env.REFRESH_SECRET_KEY);
            return sendSuccessMessage(res, 200, 'Access Token Generated', null, await createToken(user, process.env.ACCESS_SECRET_KEY, process.env.ACCESS_TOKEN_EXPIRY_TIME));
        } else {
            return sendErrorMessage(res, 400, 'Please provide token in headers');
        }
    } catch (err) {
        return sendErrorMessage(res, 500, err.message);
    }
};

//create Token
const createToken = async (userData, secretKey, expireIn) => {
    const token = await jwt.sign({
        roleId: userData.roleId, id: userData.id, firstName: userData.firstName,
        lastName: userData.lastName, email: userData.email
    }, secretKey, { expiresIn: expireIn });
    return token;
};

//signin
const userSignIn = async (req, res) => {
    try {
        const userData = req.body;
        if (Object.keys(userData).length === 0) return sendErrorMessage(res, 400, 'request body empty');
        const userExists = await userModel.findOne({ email: userData.email });
        if (!userExists) return sendErrorMessage(res, 404, 'User does not exists');
        const isPasswordMatched = await bcrypt.compare(userData.password, userExists.password);
        if (!isPasswordMatched) return sendErrorMessage(res, 401, 'Credentials are wrong !!!');
        //creating  access token
        const accessToken = await createToken(userExists, process.env.ACCESS_SECRET_KEY, process.env.ACCESS_TOKEN_EXPIRY_TIME);
        //creating refersh token
        const refreshToken = await createToken(userExists, process.env.REFRESH_SECRET_KEY, process.env.REFRESH_TOKEN_EXPIRY_TIME);
        return sendSuccessMessage(res, 200, 'logged in successfully', null, accessToken, refreshToken);
    } catch (err) {
        return sendErrorMessage(res, 500, err.message);
    }
};

//verify token
const verifyToken = async (token, secretKey) => {
    let customer = await jwt.verify(token, secretKey);
    return customer;
};


module.exports = { userSignIn, createToken, verifyToken, autoLogIn, createAccessToken };
