const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5500;

// Configure Express to look for EJS files in the current directory
app.set('view engine', 'ejs');
app.set('views', __dirname);

// Serve static files from the current directory (for app.js, style.css)
app.use(express.static(__dirname));

// Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'EduExcel Portal', port: PORT });
});

// Specific route for /index.ejs as requested
app.get('/index.ejs', (req, res) => {
  res.render('index', { title: 'EduExcel Portal', port: PORT });
});

// About page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Page', message: 'Welcome to EJS' });
});

// Principal workspace route
app.get('/principal', (req, res) => {
  res.render('principal', { title: 'Principal Dashboard', port: PORT, role: 'Principal' });
});

// Alias for principal as requested (prinshipate)
app.get('/prinshipate', (req, res) => {
  res.render('principal', { title: 'Principal Dashboard', port: PORT, role: 'Principal' });
});

// Teacher workspace route
app.get('/teacher', (req, res) => {
  res.render('teacher', { title: 'Teacher Dashboard', port: PORT, role: 'Teacher' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
