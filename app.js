require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const connectDb = require('./helper/connectDb');
const cors = require('cors');
const CustomerError = require('./helper/customeError');
const errorHandler = require('./middlewares/errorHandler');
const PORT = process.env.PORT;
const router = require('./routes/index');

// to configure the body coming with Http Request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use(cors({ origin: '*' }));
app.use('/', router);

//handler for invalid enpoints
app.all('*', (req, res, next) => {
    const err = new CustomerError(400, `Requested URL ${req.url} not found`);
    next(err);
});

//middleware to handle error
app.use(errorHandler);

//starting server and database
const start = async () => {
    app.listen(PORT, async () => {
        console.log(`Server has been started on port ${PORT}`);
        await connectDb().then(() => console.log('Database Connected Successfully!!'))
            .catch(err => console.log(`Something went wrong with Databases ${err}`));
    });
};
start();

module.exports = { app };




