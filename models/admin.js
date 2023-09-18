const mongoose = require('mongoose');
const User = require('../models/user');


const adminSchema = mongoose.Schema({
    role: {
        type: String,
        enum: ['USER', 'ADMIN']
    },
    createdBy: {
        type: String,
        require: true
    }
    ,
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        require: true,

    },
    mobile: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true
    },
    addressLine1: {
        type: String,
        require: true
    },
    addressLine2: {
        type: String,
        require: true
    },
    pincode: {
        type: String,
        require: true

    }
});


module.exports = User.discriminator('admin', adminSchema);