const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const { uploadLogo, serveLogo } = require('../controllers/logoController');

router.post('/upload', upload.single('file'), uploadLogo);
router.get('/:filename', serveLogo);

module.exports = router;
