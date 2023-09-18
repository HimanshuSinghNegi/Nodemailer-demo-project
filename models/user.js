const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
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
    },
    highSchoolName: {
        type: String,
        require: true
    },
    highSchoolPercentage: {
        type: Number,
        require: true
    },
    intermediateSchoolName: {
        type: String,
        require: true
    },
    intermediateSchoolPercentage: {
        type: Number,
        require: true
    },
    collegeName: {
        type: String,
        require: true
    },
    collegePercentage: {
        type: String,
        require: true
    }
});


module.exports = mongoose.model('user', userSchema);