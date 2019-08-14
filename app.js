'use strict'

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const db = require('./config/database');

db.authenticate()
  .then(() => console.log('MySQL connection established!'))
  .catch(err => console.log('MySQL connection error. Please make sure MySQL is running.\n' + err))

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Routes
app.use('/projects', require('./src/routes/projects'));
app.use('/tasks', require('./src/routes/tasks'));

module.exports = app;