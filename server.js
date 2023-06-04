const express = require('express');
const api = require('./routes/api-routes')
const html =  require('./routes/html-routes')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static directory
app.use(express.static('public'));

// API Routes
app.use('/api', api);

// HTML Routes
app.use('/', html);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});