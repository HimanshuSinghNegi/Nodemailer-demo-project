const { sendSuccessMessage, sendErrorMessage } = require('../middlewares/responseHandler');
const userModel = require('../models/user');

//home
const home = async (req, res) => {
    res.status(200).json({ msg: 'Welcome to Home Page' });
};

//getUserdetails
const getUserDetail = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId || userId === undefined) return sendErrorMessage(res, 400, 'Please provide user id in Params');
        const user = await userModel.findById({ _id: userId });
        if (user === null) return sendErrorMessage(res, 401, 'User Id Invalid !!!');
        return sendSuccessMessage(res, 200, 'Data get successfully', user);
    }
    catch (err) {
        return sendErrorMessage(res, 500, err.message);
    }
};

//update details
const updateUserDetail = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        if (!userId || userId === undefined) return sendErrorMessage(res, 400, 'Please provide user id in params');
        const updatedUser = await userModel.findByIdAndUpdate(userId, userData, { new: true });
        if (updatedUser === null) return sendErrorMessage(res, 400, 'User Id Invalid !!!');
        return sendSuccessMessage(res, 200, 'User Detail updated successfully', updatedUser);
    } catch (err) {
        return sendErrorMessage(res, 500, 'Internal server error', err.message);
    }
};




module.exports = { home, updateUserDetail, getUserDetail };
