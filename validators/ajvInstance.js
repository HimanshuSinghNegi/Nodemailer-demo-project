const Ajv = require('ajv');
const ajvFormats = require('ajv-formats');
const ajv = new Ajv({ allErrors: true });
ajvFormats(ajv);
module.exports = ajv;