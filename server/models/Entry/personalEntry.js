// models/PersonalEntry.js

const mongoose = require('mongoose');

const PersonalEntrySchema = new mongoose.Schema({
  member: {
    gender: { type: String, required: true },
    disabilities: { type: String, required: true },
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    surname: { type: String, required: true },
    idNumber: { type: String, required: true },
  },
  jointMember: {
    gender: { type: String },
    disabilities: { type: String },
    firstName: { type: String },
    secondName: { type: String },
    surname: { type: String },
    idNumber: { type: String },
  },
  beneficiary: {
    gender: { type: String },
    disabilities: { type: String },
    firstName: { type: String },
    secondName: { type: String },
    surname: { type: String },
    idNumber: { type: String },
  },
  landDetails: {
    latLong: { type: String, required: true },
    wardNumber: { type: String, required: true },
    town: { type: String, required: true },
    suburb: { type: String, required: true },
    region: { type: String, required: true },
    municipal: { type: String, required: true },
    areaSize: { type: String, required: true },
    vdNumber: { type: String, required: true },
  },
  endorsements: { type: String },
  idCopiesPath: { type: String },
  authorityLetterPath: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('PersonalEntry', PersonalEntrySchema);
