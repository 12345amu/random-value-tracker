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

const Value = mongoose.model('Value', valueSchema);


async function insertValue(data) {
  try {
    const val = new Value(data);
    await val.save();
  } catch (err) {
    console.error('Insert Value Error:', err);
  }
}

module.exports = { insertValue};
