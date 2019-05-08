const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const socketConfig = require('./socket-singletion');
const authRouter = require('../routes/auth');
const productsRouter = require('../routes/products');
const userRouter = require('../routes/user');
const forumRouter = require('../routes/forum');
const newsRouter = require('../routes/news');

const managerMongo = require('./managerDB');
const User = require('../models/user');

const app = express();

const server = require('http').createServer(app);

mongoose.connect('mongodb://localhost:27017/dogdb')
    .then(() => {
        console.log('DB connected.');

        /*
         * For config db from file
         */
        // const config = {
        //     file: 'js4.json',
        //     mongooseModel: User
        // };
        //
        // managerMongo.loadFromMongo(config);
        // managerMongo.watchLocalDbFiles(config);
    })
    .catch((e) => console.log(e));

app.use(morgan('dev'));

app.use(passport.initialize());
require('./../middleware/passport')(passport);

// create application/json parser
const jsonParser = bodyParser.json();
app.use(jsonParser);

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use((urlencodedParser));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

socketConfig.SocketSingleton.configure(server);
require('./sockets');

app.use('/api/', authRouter);
app.use('/api/', productsRouter);
app.use('/api/', userRouter);

app.use('/api/forum/', forumRouter);
app.use('/api/', forumRouter);

app.use('/api/', newsRouter);

module.exports = server;





