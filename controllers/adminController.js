
const { sendSuccessMessage, sendErrorMessage, } = require('../middlewares/responseHandler.js');
const adminModel = require('../models/user.js');

//addUser
const addUser = async (req, res) => {
    try {
        const userData = req.body;
        if (Object.keys(userData).length === 0)
            return sendErrorMessage(res, 400, 'request body empty');

        const user = await adminModel.create(userData);

        if (!user) return sendErrorMessage(res, 500, user.message);
        return sendSuccessMessage(res, 200, 'User added successfully !!', user);
    } catch (err) {
        return sendErrorMessage(res, 500, err.message);
    }
};

//getUserdetails
const getAdminDetail = async (req, res) => {
    try {
        const adminId = req.params.id;
        if (adminId === null || adminId === undefined)
            return sendErrorMessage(res, 400, 'Please provide user id in Params');
        const user = await adminModel.findById({ _id: adminId });
        if (user === null) return sendErrorMessage(res, 401, 'Invalid Id!!!');
        return sendSuccessMessage(res, 200, 'Data get successfully', user);
    } catch (err) {
        return sendErrorMessage(res, 500, err.message);
    }
};

//get number of users by a specific   admin
const getNumberOfUsersCreatedByAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        if (!adminId || adminId === undefined)
            return sendErrorMessage(res, 400, 'Please provide admin id');
        const numOfUsers = await adminModel.find({ createdBy: adminId });
        if (numOfUsers === null)
            return sendErrorMessage(res, 400, 'Invalid Id !!!');
        return sendSuccessMessage(res, 200, 'Users get Successfully', numOfUsers);
    } catch (err) {
        return sendErrorMessage(res, 500, err.message);
    }
};

//update details
const updateUserDetail = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        if (!userId || userId === undefined) return sendErrorMessage(res, 400, 'Please provide user id in params');
        const updatedUser = await adminModel.findByIdAndUpdate(userId, userData, { new: true });
        if (updatedUser === null) return sendErrorMessage(res, 400, 'User Id Invalid !!!');
        return sendSuccessMessage(res, 200, 'User Detail updated successfully', updatedUser);
    } catch (err) {
        return sendErrorMessage(res, 500, 'Internal server error', err.message);
    }
};

module.exports = { addUser, getAdminDetail, getNumberOfUsersCreatedByAdmin, updateUserDetail };
