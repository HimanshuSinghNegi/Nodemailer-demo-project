const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const nodeMailer = require('nodemailer');

const combinedSchema = mongoose.Schema({
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        require: true
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


//pre hook to encrypt password
combinedSchema.pre('save', async function (next) {
    try {
        this.firstName = await this.firstName.charAt(0).toUpperCase() +
            this.firstName.slice(1);
        this.lastName = await this.lastName.charAt(0).toUpperCase() +
            this.lastName.slice(1);
        //encrypt password
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        console.log(err.message);
        next();
    }

});

//pre hook for encrypt password and convert name into Title case while updating
combinedSchema.pre('findOneAndUpdate', async function (next) {
    try {
        /*
        In the pre-update hook function, this refers to the Mongoose query object that 
        triggers the hook. this._update gives us access to the update object,
         which contains the fields and values that will be updated in the document. 
        */
        const update = this._update;
        update.firstName = await update.firstName.charAt(0).toUpperCase() +
            update.firstName.slice(1);
        update.lastName = await update.lastName.charAt(0).toUpperCase() +
            update.lastName.slice(1);
        update.password = await bcrypt.hash(update.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});




//post hook to send message
//post hook to send email to logined user
combinedSchema.post('save', async function () {
    try {
        //set up transporter
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.PASSWORD
            }
        });

        // send mail 
        let info = await transporter.sendMail({
            from: `Himanshu Singh Negi  ${process.env.SENDER_EMAIL}`,
            to: this.email,
            subject: 'Your Account Created Successfully',

            html: `<b> Hello ${this.firstName} ${this.lastName} <b> your account created !!
              <br> Your credentails are : <br>
              <b>email</b> : ${this.email} <br>
              <b>password</b> : ${this.password}`
        });
        console.log(info.messageId);

    } catch (err) {
        console.log(err);
    }
});

module.exports = mongoose.model('users', combinedSchema);