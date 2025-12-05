const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bcrypt = require('bcrypt');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const personerRouter = require('./routes/personer');
const bilerRouter = require('./routes/biler');
const loginRouter = require('./routes/login');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/personer', personerRouter);
app.use('/biler', bilerRouter);
app.use('/login', loginRouter);

module.exports = app;
