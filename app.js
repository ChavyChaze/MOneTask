'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const qraphqlHttp = require('express-graphql');

require('dotenv').config();

const mongooseOptions = {
  useNewUrlParser: true
};
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, mongooseOptions);

mongoose.connection.on('connected', () => {
  console.warn('MongoDB connection established!');
});
mongoose.connection.on('error', () => {
  console.error('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'session secret key' }));

// Routes
app.use('/projects', qraphqlHttp({
  schema: require('./src/graphql/schema'),
  rootValue: require('./src/routes/projects'),
  graphiql: true
}))
// app.use('/projects', require('./src/routes/projects'));
app.use('/tasks', require('./src/routes/tasks'));

module.exports = app;