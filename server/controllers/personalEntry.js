// controllers/personalEntryController.js

const PersonalEntry = require('../models/Entry/personalEntry');

const createPersonalEntry = async (req, res) => {
  try {
    const {
      member,
      jointMember,
      beneficiary,
      landDetails,
      endorsements,
    } = req.body;

    const idCopiesPath = req.files['idCopies'] ? req.files['idCopies'][0].path : null;
    const authorityLetterPath = req.files['authorityLetter'] ? req.files['authorityLetter'][0].path : null;

    const newEntry = new PersonalEntry({
      member: JSON.parse(member),
      jointMember: JSON.parse(jointMember),
      beneficiary: JSON.parse(beneficiary),
      landDetails: JSON.parse(landDetails),
      endorsements,
      idCopiesPath,
      authorityLetterPath,
    });

    await newEntry.save();
    res.status(201).send(newEntry);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPersonalEntries = async (req, res) => {
  try {
    const entries = await PersonalEntry.find();
    res.status(200).send(entries);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { createPersonalEntry, getPersonalEntries };
