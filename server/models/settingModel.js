const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
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

const SettingModel = mongoose.model('Setting', SettingSchema);

module.exports = SettingModel;
