const sigInSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}.+$' },
        password: { type: 'string' }
    },
    required: ['email', 'password']
};

module.exports = sigInSchema;