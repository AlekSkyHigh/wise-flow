const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const authController = require('./controllers/authController');
const entryController = require('./controllers/entryController');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');
const ccController = require('./controllers/ccController');
const pcController = require('./controllers/pcController');


// const connectionString = 'mongodb://localhost:27017/wise-flow';
const connectionString = 'mongodb+srv://alekskyhigh:MgVhuBeTtdk847n@cluster0.m0wvu5i.mongodb.net/?retryWrites=true&w=majority'

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
    app.use('/calchistories', pcController)
    app.use('*', (req, res) => {
        res.json(404)
    })

    app.listen(3030, () => console.log('REST service started'));
}