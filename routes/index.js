const express = require('express');
const router = express.Router();

const admin = require('./admin.js');
const auth = require('./auth.js');
const customerError = require('../helper/customeError.js');
const errorHandler = require('../middlewares/errorHandler.js');
const sadmin = require('./superAdmin.js');
const user = require('./user.js');

//routes
router.use('/admin', admin);
router.use('/auth', auth);
router.use('/sadmin', sadmin);
router.use('/user', user);

// to handle invalid endpoints
router.all('*', (req, res, next) => {
    const err = new customerError(400, `Requested URL ${req.url} not found !!`);
    next(err);
});

//middleware to handle error
router.use(errorHandler);

module.exports = router;