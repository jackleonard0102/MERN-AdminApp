const mongoose = require('mongoose');

const WelcomeSchema = new mongoose.Schema({
  Logopath: {
    type: String,
  },
  siteCode: {
    type: String,
    required: true,
  },
  appVersion: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, 
});

const WelcomeModel = mongoose.model('Welcome', WelcomeSchema);

module.exports = WelcomeModel;
