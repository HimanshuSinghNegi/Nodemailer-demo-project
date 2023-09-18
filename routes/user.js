const express = require('express');
const router = express.Router();

const ajvValidatorDto = require('../middlewares/ajvValidatorDto.js');
const auth = require('../middlewares/authentication.js');
const customerError = require('../helper/customeError.js');
const errorHandler = require('../middlewares/errorHandler.js');
const tokenSchema = require('../validators/authValidator/autoLogInSchema.js');
const user = require('../controllers/userController.js');


//routes
router.get('/', user.home);
router.get('/getUserDetail/:id', ajvValidatorDto.ajvHeaderValidatorDto(tokenSchema), auth(), user.getUserDetail);
router.put('/updateUserDetail/:id', ajvValidatorDto.ajvHeaderValidatorDto(tokenSchema), auth(), user.updateUserDetail);

//invalid route handler
router.all('*', (req, res, next) => {
    const err = new customerError(400, `Requested URL ${req.url} not found !!`);
    next(err);
});

//middleware to handle invalid endpoints
router.use(errorHandler);

module.exports = router;