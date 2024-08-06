// models/PersonalEntry.js

const mongoose = require('mongoose');

const PersonalEntrySchema = new mongoose.Schema({
  gender: String,
  disabilities: String,
  firstName: String,
  secondName: String,
  surname: String,
  idNumber: String,
  latLong: String,
  wardNumber: String,
  town: String,
  suburb: String,
  region: String,
  municipal: String,
  areaSize: String,
  vdNumber: String,
  note: String,
  idCopiesPath: String,
  authorityLetterPath: String,
}, { timestamps: true });

module.exports = mongoose.model('PersonalEntry', PersonalEntrySchema);
