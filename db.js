const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/randomTracker';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('Connected to MongoDB with Mongoose'));

const valueSchema = new mongoose.Schema({
  value: Number,
  timestamp: Date,
});

const streakSchema = new mongoose.Schema({
  startTime: Date,
  endTime: Date,
  durationSeconds: Number,
  count: Number,
});


const Value = mongoose.model('Value', valueSchema);
const Streak = mongoose.model('Streak', streakSchema);

async function insertValue(data) {
  try {
    const val = new Value(data);
    await val.save();
  } catch (err) {
    console.error('Insert Value Error:', err);
  }
}

async function insertStreak(data) {
  try {
    const streak = new Streak(data);
    await streak.save();
  } catch (err) {
    console.error('Insert Streak Error:', err);
  }
}

module.exports = { insertValue };