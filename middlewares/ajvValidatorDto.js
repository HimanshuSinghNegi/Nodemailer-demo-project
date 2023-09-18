const ajvInstance = require('../validators/ajvInstance');

const ajvBodyValidatorDto = (schema) => {
    return (req, res, next) => {
        try {
            const ajvValidate = ajvInstance.compile(schema);
            const valid = ajvValidate(req.body);
            if (!valid) {
                const errors = ajvValidate.errors;
                res.status(400).json(errors);
            } else next();
        } catch (err) {
            res.status(500).json({
                msg: err.message
            });
        }
    };
};

const ajvHeaderValidatorDto = (schema) => {
    return (req, res, next) => {
        try {
            const ajvValidate = ajvInstance.compile(schema);
            const valid = ajvValidate(req.headers);
            if (!valid) {
                const errors = ajvValidate.errors;
                res.status(400).json(errors);
            } else next();
        } catch (err) {
            res.status(500).json({
                msg: err.message
            });
        }
    };
};
const ajvParamsValidatorDto = (schema) => {
    return (req, res, next) => {
        try {
            const ajvValidate = ajvInstance.compile(schema);
            const valid = ajvValidate(req.params);
            if (!valid) {
                const errors = ajvValidate.errors;
                res.status(400).json(errors);
            } else next();
        } catch (err) {
            res.status(500).json({
                msg: err.message
            });
        }
    };
};



module.exports = { ajvBodyValidatorDto, ajvHeaderValidatorDto, ajvParamsValidatorDto };