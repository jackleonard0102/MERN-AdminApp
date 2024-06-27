const path = require('path');

exports.uploadLogo = (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  const logoUrl = `${req.protocol}://${req.get('host')}/logos/${req.file.filename}`;
  res.status(200).send({ logoUrl });
};


exports.serveLogo = (req, res) => {
  const logoPath = path.join(__dirname, '../../uploads/logos', req.params.filename);
  res.sendFile(logoPath);
};
