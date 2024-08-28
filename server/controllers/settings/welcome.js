// controllers/welcome.js

const Welcome = require("../../models/settings/welcome");
const { _log, _error } = require("../../utils/logging");

// Upload or update welcome logo
exports.uploadWelcomeLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const logoPath = 'upload/logo.png'; // Fixed path for logo

    // Update the welcome document with the new logo path
    let welcome = await Welcome.findOne();
    if (welcome) {
      welcome.Logopath = logoPath;
    } else {
      welcome = new Welcome({ Logopath: logoPath, siteCode: "DEFAULT_CODE", appVersion: "1.0" });
    }

    await welcome.save();
    return res.status(200).json({ success: true, message: "Logo uploaded successfully", logoPath });
  } catch (error) {
    _error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get current welcomes
exports.getWelcomes = async (req, res) => {
  try {
    const welcomes = await Welcome.findOne(); // Adjust the query as needed
    if (!welcomes) {
      return res.status(404).json({ message: 'Welcomes not found' });
    }
    res.status(200).json({ welcome: welcomes });
  } catch (error) {
    console.error('Error fetching welcomes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update site code and app version
exports.updateWelcomes = async (req, res) => {
  try {
    const { siteCode, appVersion } = req.body;
    
    let welcome = await Welcome.findOne();
    if (welcome) {
      welcome.siteCode = siteCode;
      welcome.appVersion = appVersion;
    } else {
      welcome = new Welcome({ siteCode, appVersion, Logopath: 'upload/logo.png' });
    }
    
    await welcome.save();
    return res.status(200).json({ success: true, message: "Welcomes updated successfully", welcome });
  } catch (error) {
    _error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

