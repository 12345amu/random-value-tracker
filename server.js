const express = require('express');
const path = require('path');
const { insertValue , insertStreak } = require('./db');
const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'public'))); 

let currentValue = 0;
let previousValue = 0;
let positiveStreak = 0;
let streakStartTime = null;



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`); 
});