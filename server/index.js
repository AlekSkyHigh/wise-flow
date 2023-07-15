const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const authController = require('./controllers/authController');
const entryController = require('./controllers/entryController');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');
const ccController = require('./controllers/ccController');


const connectionString = 'mongodb://localhost:27017/wise-flow';

start();

async function start() {
    await mongoose.connect(connectionString);
    console.log('Database connected');

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session());

    app.get('/', (req, res) => {
        res.json({ message: 'REST service operational' });
    });

    app.use('/users', authController);
    app.use('/entries', entryController);
    app.use('/currency-converter', ccController)

    app.listen(3030, () => console.log('REST service started'));
}