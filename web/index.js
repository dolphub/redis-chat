const express = require('express');
const path = require('path');
const app = express();


console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, (err, address) => {
  if (err) throw err
  console.info(`Server listening on ${HOST}:${PORT}`);    
});