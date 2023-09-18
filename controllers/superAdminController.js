const { sendSuccessMessage, sendErrorMessage } = require('../middlewares/responseHandler');
const adminModel = require('../models/admin.js');

const addAdmin = async (req, res) => {
    try {
        const adminData = req.body;
        if (adminData === null) return sendSuccessMessage(res, 400, 'Please pass valid body');
        const admin = await adminModel.create(adminData);
        if (!admin) return sendErrorMessage(res, 500, admin.message);
        return sendSuccessMessage(res, 200, 'Admin added successfully !!', admin);

    } catch (err) {
        return sendErrorMessage(res, 500, err.message);
    }
};

//update details
const updateAdminDetail = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        if (!userId || userId === undefined) return sendErrorMessage(res, 400, 'Please provide user id in params');
        const updatedUser = await adminModel.findByIdAndUpdate(userId, userData, { new: true });
        if (updatedUser === null) return sendErrorMessage(res, 400, 'User Id Invalid !!!');
        return sendSuccessMessage(res, 200, 'Admin Detail updated successfully', updatedUser);
    } catch (err) {
        return sendErrorMessage(res, 500, 'Internal server error', err.message);
    }
};

module.exports = { addAdmin, updateAdminDetail };