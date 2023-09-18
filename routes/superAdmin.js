const express = require('express');
const router = express.Router();

const adminSchema = require('../validators/adminValidator/adminValidator');
const ajvValidatorDto = require('../middlewares/ajvValidatorDto');
const auth = require('../middlewares/authentication');
const sadmin = require('../controllers/superAdminController');
const tokenSchema = require('../validators/authValidator/autoLogInSchema.js');

router.post('/addAdmin', ajvValidatorDto.ajvBodyValidatorDto(adminSchema), sadmin.addAdmin);
router.put('/updateAdminDetail/:id', ajvValidatorDto.ajvHeaderValidatorDto(tokenSchema), auth(), sadmin.updateAdminDetail);

module.exports = router;