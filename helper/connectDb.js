require('dotenv').config();
const mongoose = require('mongoose');

const connectDb = async () => {
    return await mongoose.connect(process.env.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};
module.exports = connectDb;