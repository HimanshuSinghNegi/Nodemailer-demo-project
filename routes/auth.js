const express = require('express');
const router = express.Router();

const ajvValidatorDto = require('../middlewares/ajvValidatorDto.js');
const auth = require('../controllers/authController.js');
const authentication = require('../middlewares/authentication.js');
const customerError = require('../helper/customeError.js');
const errorHandler = require('../middlewares/errorHandler.js');
const signInSchema = require('../validators/authValidator/signInSchema.js');
const tokenSchema = require('../validators/authValidator/autoLogInSchema.js');


//routes
router.get('/autoLogIn', ajvValidatorDto.ajvHeaderValidatorDto(tokenSchema), authentication(), auth.autoLogIn);
router.post('/createAccessToken', ajvValidatorDto.ajvBodyValidatorDto(tokenSchema), auth.createAccessToken);
router.post('/logIn', ajvValidatorDto.ajvBodyValidatorDto(signInSchema), auth.userSignIn);


//invalid route handler
router.all('*', (req, res, next) => {
    const err = new customerError(400, `Requested URL ${req.url} not found !!`);
    next(err);
});

//middleware to handle invalid endpoints
router.use(errorHandler);

module.exports = router;