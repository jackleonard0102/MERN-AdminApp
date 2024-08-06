// controllers/personalEntryController.js

const PersonalEntry = require('../models/Entry/personalEntry');

const createPersonalEntry = async (req, res) => {
  try {
    const {
      gender,
      disabilities,
      firstName,
      secondName,
      surname,
      idNumber,
      latLong,
      wardNumber,
      town,
      suburb,
      region,
      municipal,
      areaSize,
      vdNumber,
      note,
    } = req.body;

    const idCopiesPath = req.files['idCopies'] ? req.files['idCopies'][0].path : null;
    const authorityLetterPath = req.files['authorityLetter'] ? req.files['authorityLetter'][0].path : null;

    const newEntry = new PersonalEntry({
      gender,
      disabilities,
      firstName,
      secondName,
      surname,
      idNumber,
      latLong,
      wardNumber,
      town,
      suburb,
      region,
      municipal,
      areaSize,
      vdNumber,
      note,
      idCopiesPath,
      authorityLetterPath,
    });

    await newEntry.save();
    res.status(201).send(newEntry);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { createPersonalEntry };
