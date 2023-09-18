const adminSchema = {
    type: 'object',
    properties: {
        role: { type: 'string' },
        createdBy: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}.+$' },
        password: {
            type: 'string', minLength: 6, maxLength: 15,
            pattern: '^(?=.*[a-z])(?=.*[A-Z])[a-zA-z\\d@$#!%*?&](?=.*\\d)(?=.*[@$#!%*?&]).+$'
        },
        mobile: { type: 'string', minLength: 10, maxLength: 10, pattern: '^[0-9].+$' },
        city: { type: 'string' },
        state: { type: 'string' },
        addressLine1: { type: 'string', minLength: 8 },
        addressLine2: { type: 'string', minLength: 8 },
        pincode: { type: 'string', maxLength: 6, minLength: 6, pattern: '^[0-9].+$' },

    },
    required: ['role', 'createdBy', 'firstName', 'email', 'password', 'mobile', 'city', 'state', 'addressLine1', 'pincode',
        'addressLine2'
    ]
};


module.exports = adminSchema;

