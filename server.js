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

const clients = [];

app.get('/api/current-value', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  res.write(`data: ${JSON.stringify({
    value: currentValue,
    trend:
      currentValue > previousValue
        ? 'up'
        : currentValue < previousValue
        ? 'down'
        : 'same',
  })}\n\n`);

  clients.push(res);

  req.on('close', () => {
    clients.splice(clients.indexOf(res), 1);
  });
});

function broadcast(data) {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
}

setInterval(() => {
  previousValue = currentValue;
  currentValue = Math.floor(Math.random() * 201) - 100;
  const timestamp = new Date();

  insertValue({ value: currentValue, timestamp });

  if (currentValue > 0) {
    if (positiveStreak === 0) {
      streakStartTime = timestamp;
    }
    positiveStreak++;
  } else if (positiveStreak > 0) {
    const streakData = {
      startTime: streakStartTime,
      endTime: timestamp,
      durationSeconds: Math.floor((timestamp - streakStartTime) / 1000),
      count: positiveStreak,
    };
    insertStreak(streakData);
    positiveStreak = 0;
    streakStartTime = null;
  }

  console.log(`[${timestamp.toISOString()}] Value: ${currentValue}`);

  broadcast({
    value: currentValue,
    trend:
      currentValue > previousValue
        ? 'up'
        : currentValue < previousValue
        ? 'down'
        : 'same',
  });
}, 1000);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`); 
});