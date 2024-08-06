// routes/personalEntryRoutes.js

const express = require('express');
const router = express.Router();
const { createPersonalEntry } = require('../controllers/personalEntry');
const upload = require('../middlewares/uploadMiddleware');

router.post('/personal-entry', upload.fields([{ name: 'idCopies', maxCount: 1 }, { name: 'authorityLetter', maxCount: 1 }]), createPersonalEntry);

module.exports = router;
