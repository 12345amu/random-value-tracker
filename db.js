const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/randomTracker';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
