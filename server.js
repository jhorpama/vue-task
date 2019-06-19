const express = require('express');
const serverStatic = require('serve-static');
const path = require('path');

// Initialization
const app = express();

// Static Files
app.use(serverStatic(path.join(__dirname, 'dist')));

// Setting
const port = process.env.PORT || 3000;

// Run server
app.listen(port);