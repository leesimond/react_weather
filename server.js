const express = require('express');
const path = require('path');
const port = 8080;
const app = express();

app.use(express.static(__dirname));

app.get('*', function(req, res, next) {
  next();
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);
console.log('Server started at port ', port);
