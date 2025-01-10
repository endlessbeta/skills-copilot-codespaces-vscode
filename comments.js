// Create web server
// Import express module
const express = require('express');
// Import body-parser module
const bodyParser = require('body-parser');
// Import fs module
const fs = require('fs');
// Create express application
const app = express();
// Set view engine
app.set('view engine', 'ejs');
// Use body-parser
app.use(bodyParser.urlencoded({extended: false}));
// Define port
const port = 3000;
// Define comments
let comments = [];
// Load comments from file
fs.readFile('comments.json', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  comments = JSON.parse(data);
});
// Define route
app.get('/', (req, res) => {
  res.render('index', {comments: comments});
});
app.get('/new', (req, res) => {
  res.render('new');
});
app.post('/new', (req, res) => {
  const comment = {
    name: req.body.name,
    message: req.body.message
  };
  comments.push(comment);
  fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    res.redirect('/');
  });
});
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});