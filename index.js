'use strict'

const app = require('./app');

// Start the server
const port = process.env.PORT || 8088;
app.listen(port);
console.log(`Server listening at ${port}`);