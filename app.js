'use strict'

const express = require('express');
const graphqlHTTP = require('express-graphql');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const schema = require('./src/schema/schema');
const db = require('./config/database');

require('dotenv').config();

db.authenticate()
  .then(() => console.log('MySQL connection established!'))
  .catch(err => console.log('MySQL connection error. Please make sure MySQL is running.\n' + err))

const app = express();

app.use(cors());

app.use(cookieParser());

// Routes
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));
app.use('/projects', require('./src/routes/projects'));
app.use('/tasks', require('./src/routes/tasks'));

module.exports = app;