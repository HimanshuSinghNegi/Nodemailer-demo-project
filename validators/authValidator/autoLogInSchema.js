
const autoLogInSchema = {
    type: 'object',
    properties: {
        token: { type: 'string' }
    },
    required: ['token']
};

module.exports = autoLogInSchema;